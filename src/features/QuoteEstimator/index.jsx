import React, { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";

/**
 * QuoteEstimatorStepperEmail.jsx
 * Multi-étapes + email optionnel (EmailJS)
 *
 * .env (Vite) :
 * VITE_EMAILJS_SERVICE_ID=service_xxx
 * VITE_EMAILJS_PUBLIC_KEY=xxxxx
 * VITE_EMAILJS_TEMPLATE_ESTIMATE_ID=template_yyy
 */

const PRICING = {
  bases: {
    onePage: { label: "Site One Page", min: 390, max: 390 },
    pages3to5: { label: "Site 3 à 5 pages", min: 690, max: 690 },
    pages5plus: { label: "Site 5 pages et plus", min: 890, max: 890 },

    ecommerceSimple: { label: "Boutique en ligne (simple)", min: 790, max: 790 },
    ecommerceAdvanced: { label: "Boutique en ligne (avancée)", min: 990, max: 990 },

    refonte: { label: "Refonte de site", min: 590, max: 890 },
    auditVisibility: { label: "Audit de visibilité", min: 190, max: 190 },
  },

  included: {
    seoBasic: "SEO de base (structure + balises + indexabilité)",
    accessibility: "Accessibilité (bonnes pratiques)",
  },

  optionsBasic: {
    contactForm: { label: "Formulaire de contact", min: 50, max: 50 },
    booking: { label: "Prise de RDV", min: 50, max: 50 },
    blog: { label: "Blog", min: 180, max: 350 },
    seoAdvanced: { label: "SEO avancé (optimisations)", min: 190, max: 190 },
    analyticsBasic: { label: "Google Analytics", min: 50, max: 50 },
    multilingual: { label: "Multilingue (2 langues)", min: 250, max: 250 },
  },

  partnerChoices: {
    design: {
      none: { label: "J'ai déjà un super logo et une magnifique charte graphique", min: 0, max: 0 },
      simple: { label: "Charte graphique simple (logo simple + éléments graphiques + template réseaux sociaux)", min: 90, max: 90 },
      partner: { label: "Je souhaite faire appel à un(e) graphiste partenaire", min: 0, max: 0, partnerOnly: true },
    },
    copy: {
      none: { label: "J'ai déjà un contenu prêt à l'emploi", min: 0, max: 0 },
      basic: { label: "Rédaction (jusqu’à 5 sections)", min: 180, max: 180 },
      partner: { label: "Je souhaite faire appel à un(e) rédacteur(trice) partenaire", min: 0, max: 0, partnerOnly: true },
    },
    social: {
      none: { label: "Je n'ai pas besoin d'aide pour les réseaux sociaux", min: 0, max: 0 },
      basic: { label: "Aide réseaux sociaux (mise en place + conseils)", min: 90, max: 90 },
      partner: { label: "Je souhaite faire appel à un(e) community manager partenaire", min: 0, max: 0, partnerOnly: true },
    },
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

  maintenanceMonthlyByProject: {
    onePage: 29,
    pages3to5: 39,
    pages5plus: 49,
    ecommerceSimple: 29,
    ecommerceAdvanced: 39,
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
  if (!base) return { min: 0, max: 0, items: [] };
  items.push({ label: base.label, min: base.min, max: base.max });

  // Pages seulement pour pages5plus
  if (state.projectType === "pages5plus") {
    const included = 5;
    const pagesCount = Math.max(included, state.pagesCount);
    const extra = Math.max(0, pagesCount - included);
    if (extra > 0) {
      const per = PRICING.pages.extraPage;
      items.push({
        label: `${per.label} × ${extra}`,
        min: per.min * extra,
        max: per.max * extra,
      });
    }
  }

  const isEcom = state.projectType === "ecommerceSimple" || state.projectType === "ecommerceAdvanced";
  const isAudit = state.projectType === "auditVisibility";

  // Audit visibilité => aucune option
  if (!isAudit) {
    // Options basiques (checkbox)
    Object.entries(state.optionsBasic).forEach(([key, enabled]) => {
      if (!enabled) return;
      const opt = PRICING.optionsBasic[key];
      if (!opt) return;
      items.push({ label: opt.label, min: opt.min, max: opt.max });
    });

    // Choix partenaires (radio)
    const designChoice = PRICING.partnerChoices.design[state.designChoice] || PRICING.partnerChoices.design.none;
    const copyChoice = PRICING.partnerChoices.copy[state.copyChoice] || PRICING.partnerChoices.copy.none;
    const socialChoice = PRICING.partnerChoices.social[state.socialChoice] || PRICING.partnerChoices.social.none;

    if (!designChoice.partnerOnly && (designChoice.min || designChoice.max)) {
      items.push({ label: designChoice.label, min: designChoice.min, max: designChoice.max });
    }
    if (!copyChoice.partnerOnly && (copyChoice.min || copyChoice.max)) {
      items.push({ label: copyChoice.label, min: copyChoice.min, max: copyChoice.max });
    }
    if (!socialChoice.partnerOnly && (socialChoice.min || socialChoice.max)) {
      items.push({ label: socialChoice.label, min: socialChoice.min, max: socialChoice.max });
    }

    // E-commerce extras
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
  }

  let min = 0;
  let max = 0;
  for (const it of items) {
    min += it.min;
    max += it.max;
  }
  return { min, max, items };
}

const defaultState = {
  projectType: "pages3to5",
  pagesCount: 5,

  // CHOIX maintenance: "yes" | "no"
  maintenanceChoice: "yes",

  optionsBasic: {
    contactForm: true,
    seoAdvanced: false,
    analyticsBasic: false,
    blog: false,
    booking: false,
    multilingual: false,
  },

  designChoice: "none",
  copyChoice: "none",
  socialChoice: "none",

  productsRange: "0_20",
  ecommerceFeatures: {
    payment: true,
    shipping: false,
    variants: false,
    promos: false,
  },
};

function RadioGroup({ name, title, value, onChange, choices }) {
  return (
    <fieldset>
      <legend>{title}</legend>
      {Object.entries(choices).map(([key, item]) => {
        const priceHint =
          item.partnerOnly
            ? " (sur devis)"
            : item.min === item.max && item.min > 0
              ? ` — ${formatEUR(item.min)}`
              : "";
        return (
          <label key={key} style={{ display: "block", marginBottom: 6 }}>
            <input type="radio" name={name} checked={value === key} onChange={() => onChange(key)} />{" "}
            {item.label}
            {priceHint}
          </label>
        );
      })}
    </fieldset>
  );
}

export default function QuoteEstimatorStepperEmail() {
  const [state, setState] = useState(defaultState);
  const [step, setStep] = useState(1);

  const isAudit = state.projectType === "auditVisibility";
  const isEcom = state.projectType === "ecommerceSimple" || state.projectType === "ecommerceAdvanced";

  const estimate = useMemo(() => calcEstimate(state), [state]);

  // Maintenance dispo uniquement si le projet est dans maintenanceMonthlyByProject
  const maintenanceAvailable = Object.prototype.hasOwnProperty.call(PRICING.maintenanceMonthlyByProject, state.projectType);
  const maintenanceMonthly = maintenanceAvailable ? PRICING.maintenanceMonthlyByProject[state.projectType] : 0;

  const maintenanceSelected = maintenanceAvailable && state.maintenanceChoice === "yes";

  const projectTypeLabel = PRICING.bases[state.projectType]?.label || "";

  const estimateTotal =
    estimate.min === estimate.max ? formatEUR(estimate.min) : `${formatEUR(estimate.min)} – ${formatEUR(estimate.max)}`;

  const pricedLines = useMemo(() => {
    return estimate.items.map((it) => {
      const price = it.min === it.max ? formatEUR(it.min) : `${formatEUR(it.min)} – ${formatEUR(it.max)}`;
      return `- ${it.label} : ${price}`;
    });
  }, [estimate.items]);

  const detailsText = useMemo(() => {
    const lines = [];
    lines.push(`Type : ${projectTypeLabel}`);

    if (state.projectType === "pages5plus") {
      lines.push(`Pages : ${Math.max(5, state.pagesCount)} (5 incluses)`);
    }

    if (isEcom && !isAudit) {
      const prodLabel = PRICING.ecommerce.products[state.productsRange]?.label || "";
      lines.push(`Produits : ${prodLabel}`);
      const selectedEcom = Object.entries(state.ecommerceFeatures)
        .filter(([, enabled]) => enabled)
        .map(([key]) => PRICING.ecommerce.features[key]?.label)
        .filter(Boolean);
      lines.push(selectedEcom.length ? `E-commerce : ${selectedEcom.join(", ")}` : "E-commerce : aucune option");
    }

    lines.push("");
    lines.push("Inclus :");
    lines.push(`- ${PRICING.included.seoBasic}`);
    lines.push(`- ${PRICING.included.accessibility}`);
    if (!isAudit && state.optionsBasic.seoAdvanced) lines.push("- (SEO de base inclus dans l’option SEO avancé)");

    if (!isAudit) {
      const selectedBasic = Object.entries(state.optionsBasic)
        .filter(([, enabled]) => enabled)
        .map(([key]) => PRICING.optionsBasic[key]?.label)
        .filter(Boolean);

      const designChoice = PRICING.partnerChoices.design[state.designChoice];
      const copyChoice = PRICING.partnerChoices.copy[state.copyChoice];
      const socialChoice = PRICING.partnerChoices.social[state.socialChoice];

      const partnerInfo = [
        designChoice?.partnerOnly ? `${designChoice.label} (sur devis)` : designChoice?.label,
        copyChoice?.partnerOnly ? `${copyChoice.label} (sur devis)` : copyChoice?.label,
        socialChoice?.partnerOnly ? `${socialChoice.label} (sur devis)` : socialChoice?.label,
      ].filter(Boolean);

      lines.push("");
      lines.push(selectedBasic.length ? `Options : ${selectedBasic.join(", ")}` : "Options : aucune");
      if (partnerInfo.length) lines.push(`Prestataires : ${partnerInfo.join(" | ")}`);
    } else {
      lines.push("");
      lines.push("Options : aucune (audit uniquement)");
    }

    // Maintenance choisie
    lines.push("");
    if (!maintenanceAvailable) {
      lines.push("Maintenance : non incluse (sur devis)");
    } else {
      lines.push(
        `Maintenance : ${maintenanceSelected ? "Oui" : "Non"}${
          maintenanceSelected ? ` — ${formatEUR(maintenanceMonthly)}/mois` : ""
        } (hébergement + mises à jour + sécurité)`
      );
    }

    lines.push("");
    lines.push("Détail du prix :");
    lines.push(...pricedLines);
    lines.push("");
    lines.push(`Estimation : ${estimateTotal}`);

    return lines.join("\n");
  }, [
    projectTypeLabel,
    state.projectType,
    state.pagesCount,
    isEcom,
    isAudit,
    state.productsRange,
    state.ecommerceFeatures,
    state.optionsBasic,
    state.designChoice,
    state.copyChoice,
    state.socialChoice,
    maintenanceAvailable,
    maintenanceSelected,
    maintenanceMonthly,
    pricedLines,
    estimateTotal,
  ]);

  // Email optionnel (uniquement step 4)
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
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) throw new Error("Missing EmailJS env vars");

      const templateParams = {
        from_name: clientName || "Client",
        reply_to: clientEmail,
        project_type: projectTypeLabel,
        estimate_total: estimateTotal,
        details: detailsText,
        maintenance_monthly: !maintenanceAvailable
          ? "Non incluse"
          : maintenanceSelected
            ? `${formatEUR(maintenanceMonthly)}/mois`
            : "Non",
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY });

      setStatus("Email envoyé ✅");
      setClientName("");
      setClientEmail("");
      setShowEmail(false);
    } catch {
      setStatus("Échec de l’envoi. Vérifie EmailJS + .env + Allowed origins.");
    } finally {
      setSending(false);
    }
  };

  const next = () => {
    if (step === 1 && state.projectType === "auditVisibility") {
      setStep(4);
      return;
    }
    setStep((s) => Math.min(4, s + 1));
    setShowEmail(false);
    setStatus("");
  };

  const prev = () => {
    if (step === 4 && state.projectType === "auditVisibility") {
      setStep(1);
      return;
    }
    setStep((s) => Math.max(1, s - 1));
    setShowEmail(false);
    setStatus("");
  };

  const restart = () => {
    setState(defaultState);
    setStep(1);
    setShowEmail(false);
    setStatus("");
    setClientName("");
    setClientEmail("");
  };

  // Quand le type change, on remet le choix maintenance par défaut sur "yes"
  const onProjectTypeChange = (value) => {
    setState((s) => ({
      ...s,
      projectType: value,
      pagesCount: value === "pages5plus" ? Math.max(5, s.pagesCount) : s.pagesCount,
      maintenanceChoice: "yes",
    }));
  };

  return (
    <section>
      <h2>Estimez votre projet</h2>
      {step === 1 && (
        <p>
        Sélectionnez les caractéristiques de votre projet <br />
        pour obtenir une estimation indicative (le devis final dépendra du besoin exact).
        </p>
      )}

      <div style={{ marginBottom: 10 }}>
        <strong>Étape {step}/4</strong>
      </div>

      {step === 1 && (
        <div>
          <h3>Quel est le type de votre projet ?</h3>

          <label>
            Projet :{" "}
            <select value={state.projectType} onChange={(e) => onProjectTypeChange(e.target.value)}>
              <option value="onePage">Site One Page</option>
              <option value="pages3to5">Site 3 à 5 pages</option>
              <option value="pages5plus">Site 5 pages et plus</option>
              <option value="ecommerceSimple">Boutique en ligne (simple)</option>
              <option value="ecommerceAdvanced">Boutique en ligne (avancée)</option>
              <option value="refonte">Refonte de site</option>
              <option value="auditVisibility">Audit de visibilité</option>
            </select>
          </label>

          {state.projectType === "pages5plus" && (
            <div style={{ marginTop: 10 }}>
              <label>
                Nombre de pages (5 incluses) :{" "}
                <input
                  type="number"
                  min={5}
                  value={Math.max(5, state.pagesCount)}
                  onChange={(e) => setState((s) => ({ ...s, pagesCount: clampInt(e.target.value, 5) }))}
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
        </div>
      )}

      {step === 2 && !isAudit && (
        <div>
          <h3>Qu'avez-vous besoin ?</h3>

              <div style={{ marginBottom: 12 }}>
                <strong>Déjà inclus :</strong>
                <ul>
                  <li>{PRICING.included.seoBasic}</li>
                  <li>{PRICING.included.accessibility}</li>
                </ul>
              </div>

          <fieldset>
            <legend>Options</legend>
            {Object.keys(PRICING.optionsBasic).map((key) => (
              <label key={key} style={{ display: "block", marginBottom: 6 }}>
                <input
                  type="checkbox"
                  checked={!!state.optionsBasic[key]}
                  onChange={() =>
                    setState((s) => ({
                      ...s,
                      optionsBasic: { ...s.optionsBasic, [key]: !s.optionsBasic[key] },
                    }))
                  }
                />{" "}
                {PRICING.optionsBasic[key].label}
              </label>
            ))}
          </fieldset>

          {/* Choix maintenance */}
          <fieldset style={{ marginTop: 12 }}>
            <legend>Maintenance</legend>

            {!maintenanceAvailable ? (
              <p>Non incluse pour cette offre (sur devis).</p>
            ) : (
              <>
                <label style={{ display: "block", marginBottom: 6 }}>
                  <input
                    type="radio"
                    name="maintenance"
                    checked={state.maintenanceChoice === "yes"}
                    onChange={() => setState((s) => ({ ...s, maintenanceChoice: "yes" }))}
                  />{" "}
                  Oui — {formatEUR(maintenanceMonthly)}/mois (hébergement + mises à jour + sécurité)
                </label>

                <label style={{ display: "block", marginBottom: 6 }}>
                  <input
                    type="radio"
                    name="maintenance"
                    checked={state.maintenanceChoice === "no"}
                    onChange={() => setState((s) => ({ ...s, maintenanceChoice: "no" }))}
                  />{" "}
                  Non - J'ai déjà un hébergement ou je préfère gérer ça de mon côté
                </label>
              </>
            )}
          </fieldset>

          {isEcom && (
            <fieldset style={{ marginTop: 12 }}>
              <legend>E-commerce</legend>
              {Object.keys(PRICING.ecommerce.features).map((key) => (
                <label key={key} style={{ display: "block", marginBottom: 6 }}>
                  <input
                    type="checkbox"
                    checked={!!state.ecommerceFeatures[key]}
                    onChange={() =>
                      setState((s) => ({
                        ...s,
                        ecommerceFeatures: { ...s.ecommerceFeatures, [key]: !s.ecommerceFeatures[key] },
                      }))
                    }
                  />{" "}
                  {PRICING.ecommerce.features[key].label}
                </label>
              ))}
            </fieldset>
          )}
        </div>
      )}

      {step === 3 && !isAudit && (
        <div>
          <h3>Avez-vous besoin de services supplémentaires ?</h3>

          <RadioGroup
            name="design"
            title="Design"
            value={state.designChoice}
            onChange={(v) => setState((s) => ({ ...s, designChoice: v }))}
            choices={PRICING.partnerChoices.design}
          />

          <RadioGroup
            name="copy"
            title="Rédaction"
            value={state.copyChoice}
            onChange={(v) => setState((s) => ({ ...s, copyChoice: v }))}
            choices={PRICING.partnerChoices.copy}
          />

          <RadioGroup
            name="social"
            title="Réseaux sociaux"
            value={state.socialChoice}
            onChange={(v) => setState((s) => ({ ...s, socialChoice: v }))}
            choices={PRICING.partnerChoices.social}
          />
        </div>
      )}

      {step === 4 && (
        <div>
          <h3>Récapitulatif</h3>

          <div>
            <strong>Votre estimation :</strong> {estimateTotal}
            {maintenanceAvailable && maintenanceSelected && (
              <span> (+ {formatEUR(maintenanceMonthly)}/mois maintenance)</span>
            )}
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
                  <input required type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
                </label>
              </div>

              <button type="submit" disabled={sending}>
                {sending ? "Envoi..." : "Envoyer"}
              </button>

              {status && <p>{status}</p>}
            </form>
          )}

          <hr />

          <details open>
            <summary>Récapitulatif</summary>
            <pre>{detailsText}</pre>
          </details>
        </div>
      )}

      <hr />

      <div>
        {step > 1 && (
          <button type="button" onClick={prev}>
            Retour
          </button>
        )}
        {step < 4 && (
          <button type="button" onClick={next}>
            Suivant
          </button>
        )}
        {step === 4 && (
          <button type="button" onClick={restart}>
            Recommencer
          </button>
        )}
      </div>
    </section>
  );
}