import React, { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";

/**
 * QuoteEstimatorOptionalEmail.jsx
 * - Affiche une estimation
 * - Bouton optionnel "Recevoir par email"
 * - Envoi EmailJS
 */

const PRICING = {
  bases: {
    onePage: { label: "Site One Page", min: 390, max: 390 },
    pages3to5: { label: "Site 3 à 5 pages", min: 690, max: 690 },
    ecommerceSimple: { label: "Boutique en ligne (simple)", min: 790, max: 790 },
    ecommerceEvolutive: { label: "Boutique en ligne (évolutive)", min: 990, max: 990 },
    refonte: { label: "Refonte de site", min: 590, max: 890 },
  },

  options: {
    contactForm: { label: "Formulaire de contact + anti-spam", min: 60, max: 120 },
    seoBasic: { label: "SEO de base", min: 120, max: 220 },
    seoAdvanced: { label: "SEO avancé", min: 250, max: 450 },
    analytics: { label: "Analytics (Matomo/GA)", min: 80, max: 150 },
    blog: { label: "Blog", min: 180, max: 350 },
    booking: { label: "Prise de RDV (Calendly)", min: 80, max: 180 },
    multilingual: { label: "Multilingue (2 langues)", min: 250, max: 450 },
    accessibility: { label: "Accessibilité (bonnes pratiques)", min: 120, max: 260 },
    designHelp: { label: "Aide design / maquettes", min: 180, max: 380 },
    copywriting: { label: "Rédaction (jusqu’à 5 sections)", min: 180, max: 420 },
  },

  pages: {
    extraPage: { label: "Page supplémentaire", min: 80, max: 140 },
  },

  ecommerce: {
    products: {
      "0_20": { label: "0 à 20 produits", min: 0, max: 0 },
      "21_50": { label: "21 à 50 produits", min: 200, max: 350 },
      "51_plus": { label: "51+ produits", min: 450, max: 800 },
    },
    features: {
      payment: { label: "Paiement en ligne", min: 120, max: 250 },
      shipping: { label: "Livraison / click & collect", min: 120, max: 260 },
      variants: { label: "Variantes (taille/couleur)", min: 120, max: 240 },
      promos: { label: "Codes promo", min: 80, max: 180 },
    },
  },

  urgencyMultiplier: {
    standard: { label: "Standard", min: 1, max: 1 },
    priority: { label: "Prioritaire", min: 1.1, max: 1.2 },
    urgent: { label: "Urgent", min: 1.2, max: 1.35 },
  },
};

function clampInt(value, fallback) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

function formatEUR(n) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
}

function calcEstimate(state) {
  const items = [];

  const base = PRICING.bases[state.projectType];
  if (!base) return { min: 0, max: 0, items: [], urgencyLabel: "Standard" };

  items.push({ label: base.label, min: base.min, max: base.max });

  const isVitrine =
    state.projectType === "onePage" ||
    state.projectType === "pages3to5" ||
    state.projectType === "refonte";

  if (isVitrine) {
    const included = state.projectType === "onePage" ? 1 : 5; // 3-5 => 5 inclus
    const extra = Math.max(0, state.pagesCount - included);
    if (extra > 0) {
      const per = PRICING.pages.extraPage;
      items.push({
        label: `${per.label} × ${extra}`,
        min: per.min * extra,
        max: per.max * extra,
      });
    }
  }

  Object.entries(state.options).forEach(([key, enabled]) => {
    if (!enabled) return;
    const opt = PRICING.options[key];
    if (!opt) return;
    items.push({ label: opt.label, min: opt.min, max: opt.max });
  });

  const isEcom =
    state.projectType === "ecommerceSimple" || state.projectType === "ecommerceEvolutive";

  if (isEcom) {
    const prod = PRICING.ecommerce.products[state.productsRange];
    if (prod) items.push({ label: `Catalogue : ${prod.label}`, min: prod.min, max: prod.max });

    Object.entries(state.ecommerceFeatures).forEach(([key, enabled]) => {
      if (!enabled) return;
      const feat = PRICING.ecommerce.features[key];
      if (!feat) return;
      items.push({ label: feat.label, min: feat.min, max: feat.max });
    });
  }

  let min = 0;
  let max = 0;
  for (const it of items) {
    min += it.min;
    max += it.max;
  }

  const mult = PRICING.urgencyMultiplier[state.urgency] || PRICING.urgencyMultiplier.standard;
  min = Math.round(min * mult.min);
  max = Math.round(max * mult.max);

  return { min, max, items, urgencyLabel: mult.label };
}

const defaultState = {
  projectType: "pages3to5",
  pagesCount: 5,
  urgency: "standard",

  options: {
    contactForm: true,
    seoBasic: true,
    seoAdvanced: false,
    analytics: false,
    blog: false,
    booking: false,
    multilingual: false,
    accessibility: false,
    designHelp: false,
    copywriting: false,
  },

  productsRange: "0_20",
  ecommerceFeatures: {
    payment: true,
    shipping: false,
    variants: false,
    promos: false,
  },
};

export default function QuoteEstimatorOptionalEmail() {
  const [state, setState] = useState(defaultState);
  const estimate = useMemo(() => calcEstimate(state), [state]);

  const isEcom =
    state.projectType === "ecommerceSimple" || state.projectType === "ecommerceEvolutive";

  const isVitrine =
    state.projectType === "onePage" ||
    state.projectType === "pages3to5" ||
    state.projectType === "refonte";

  const toggleOption = (key) =>
    setState((s) => ({
      ...s,
      options: { ...s.options, [key]: !s.options[key] },
    }));

  const toggleEcom = (key) =>
    setState((s) => ({
      ...s,
      ecommerceFeatures: { ...s.ecommerceFeatures, [key]: !s.ecommerceFeatures[key] },
    }));

  const projectTypeLabel = PRICING.bases[state.projectType]?.label || "";
  const urgencyLabel = PRICING.urgencyMultiplier[state.urgency]?.label || "";

  const pricedLines = useMemo(() => {
    return estimate.items.map((it) => {
      const price =
        it.min === it.max ? formatEUR(it.min) : `${formatEUR(it.min)} – ${formatEUR(it.max)}`;
      return `- ${it.label} : ${price}`;
    });
  }, [estimate.items]);

  const extraChoices = useMemo(() => {
    const lines = [`Type : ${projectTypeLabel}`, `Délai : ${urgencyLabel}`];

    if (isVitrine) lines.push(`Pages : ${state.pagesCount}`);

    if (isEcom) {
      const prodLabel = PRICING.ecommerce.products[state.productsRange]?.label || "";
      lines.push(`Produits : ${prodLabel}`);
    }

    const selectedOptions = Object.entries(state.options)
      .filter(([, enabled]) => enabled)
      .map(([key]) => PRICING.options[key]?.label)
      .filter(Boolean);

    lines.push(selectedOptions.length ? `Options : ${selectedOptions.join(", ")}` : "Options : aucune");

    if (isEcom) {
      const selectedEcom = Object.entries(state.ecommerceFeatures)
        .filter(([, enabled]) => enabled)
        .map(([key]) => PRICING.ecommerce.features[key]?.label)
        .filter(Boolean);

      lines.push(
        selectedEcom.length ? `E-commerce : ${selectedEcom.join(", ")}` : "E-commerce : aucune option"
      );
    }

    return lines;
  }, [projectTypeLabel, urgencyLabel, isVitrine, isEcom, state.pagesCount, state.productsRange, state.options, state.ecommerceFeatures]);

  const detailsText = useMemo(() => {
    return [...extraChoices, "", "Détail du prix :", ...pricedLines].join("\n");
  }, [extraChoices, pricedLines]);

  const estimateTotal =
    estimate.min === estimate.max
      ? formatEUR(estimate.min)
      : `${formatEUR(estimate.min)} – ${formatEUR(estimate.max)}`;

  // Email optionnel
  const [showEmail, setShowEmail] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus("");
    setSending(true);

    try {
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ESTIMATE_ID;
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error("Missing EmailJS env vars");
      }

      const templateParams = {
        from_name: clientName || "Client",
        reply_to: clientEmail,
        project_type: projectTypeLabel,
        estimate_total: estimateTotal,
        details: detailsText,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY });

      setStatus("Email envoyé ✅");
      setClientName("");
      setClientEmail("");
      setShowEmail(false);
    } catch (err) {
      setStatus("Échec de l’envoi. Vérifie EmailJS + .env + Allowed origins.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section>
      <h2>Estimation du prix</h2>
      <p>Estimation indicative (le devis final dépendra du besoin exact).</p>

      <div>
        <strong>Votre estimation :</strong> {estimateTotal} <span>({estimate.urgencyLabel})</span>
      </div>

      <div style={{ marginTop: 10 }}>
        <button type="button" onClick={() => setShowEmail((v) => !v)}>
          {showEmail ? "Fermer" : "Recevoir l’estimation par email (optionnel)"}
        </button>
      </div>

      {showEmail && (
        <form onSubmit={sendEmail} style={{ marginTop: 10 }}>
          <div>
            <label>
              Nom :
              <input value={clientName} onChange={(e) => setClientName(e.target.value)} />
            </label>
          </div>

          <div>
            <label>
              Email * :
              <input
                required
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </label>
          </div>

          <button type="submit" disabled={sending}>
            {sending ? "Envoi..." : "Envoyer"}
          </button>

          {status && <p>{status}</p>}
        </form>
      )}

      <hr />

      <div>
        <label>
          Type de projet :{" "}
          <select
            value={state.projectType}
            onChange={(e) => setState((s) => ({ ...s, projectType: e.target.value }))}
          >
            <option value="onePage">Site One Page</option>
            <option value="pages3to5">Site 3 à 5 pages</option>
            <option value="ecommerceSimple">Boutique en ligne (simple)</option>
            <option value="ecommerceEvolutive">Boutique en ligne (évolutive)</option>
            <option value="refonte">Refonte de site</option>
          </select>
        </label>
      </div>

      <div style={{ marginTop: 10 }}>
        <label>
          Délai :{" "}
          <select
            value={state.urgency}
            onChange={(e) => setState((s) => ({ ...s, urgency: e.target.value }))}
          >
            <option value="standard">Standard</option>
            <option value="priority">Prioritaire</option>
            <option value="urgent">Urgent</option>
          </select>
        </label>
      </div>

      {isVitrine && (
        <div style={{ marginTop: 10 }}>
          <label>
            Nombre de pages :{" "}
            <input
              type="number"
              min={1}
              value={state.pagesCount}
              onChange={(e) =>
                setState((s) => ({ ...s, pagesCount: clampInt(e.target.value, 1) }))
              }
            />
          </label>
        </div>
      )}

      {isEcom && (
        <div style={{ marginTop: 10 }}>
          <label>
            Nombre de produits :{" "}
            <select
              value={state.productsRange}
              onChange={(e) => setState((s) => ({ ...s, productsRange: e.target.value }))}
            >
              <option value="0_20">0 à 20</option>
              <option value="21_50">21 à 50</option>
              <option value="51_plus">51+</option>
            </select>
          </label>
        </div>
      )}

      <hr />

      <fieldset>
        <legend>Options</legend>
        {Object.keys(PRICING.options).map((key) => (
          <label key={key} style={{ display: "block", marginBottom: 6 }}>
            <input
              type="checkbox"
              checked={!!state.options[key]}
              onChange={() => toggleOption(key)}
            />{" "}
            {PRICING.options[key].label}
          </label>
        ))}
      </fieldset>

      {isEcom && (
        <fieldset style={{ marginTop: 12 }}>
          <legend>E-commerce</legend>
          {Object.keys(PRICING.ecommerce.features).map((key) => (
            <label key={key} style={{ display: "block", marginBottom: 6 }}>
              <input
                type="checkbox"
                checked={!!state.ecommerceFeatures[key]}
                onChange={() => toggleEcom(key)}
              />{" "}
              {PRICING.ecommerce.features[key].label}
            </label>
          ))}
        </fieldset>
      )}

      <hr />

      <details>
        <summary>Voir le récap</summary>
        <pre>{detailsText}</pre>
      </details>
    </section>
  );
}