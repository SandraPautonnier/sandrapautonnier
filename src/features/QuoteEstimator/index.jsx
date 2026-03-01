import React, { useMemo, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faArrowLeft, faArrowRight, faRotateRight } from '@fortawesome/free-solid-svg-icons';

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
    pages2to4: { label: "Site 2 à 4 pages", min: 690, max: 690 },
    pages5plus: { label: "Site 5 pages et plus", min: 890, max: 890 },

    ecommerceSimple: { label: "Boutique en ligne (simple)", min: 790, max: 790 },
    ecommerceAdvanced: { label: "Boutique en ligne (avancée)", min: 990, max: 990 },

    refonte: { label: "Refonte de site", min: 590, max: 890 },
    auditVisibility: { label: "Audit de visibilité", min: 290, max: 290 },
  },

  included: {
    seoBasic: "SEO de base (structure + balises + indexabilité)",
    accessibility: "Accessibilité (respect des bonnes pratiques d’accessibilité pour une meilleure expérience pour tous)",
  },

  optionsBasic: {
    contactForm: { label: "Formulaire de contact", min: 50, max: 50 },
    booking: { label: "Prise de RDV", min: 50, max: 50 },
    backOffice: { label: "Back-office pour modifier vous-même vos contenus + formation", min: 250, max: 250 },

    // on les affichera dans un fieldset séparé
    seoAdvanced: { label: "SEO avancé (optimisations)", min: 90, max: 90 },
    analyticsBasic: { label: "Google Analytics", min: 50, max: 50 },

    mapSection: { label: "Section lieu avec carte interactive", min: 120, max: 220 },
    thirdPartyFeature: { label: "Fonctionnalité avec un service tiers", min: 50, max: 250 },
    customIdeaHelp: {
      label:
        "J'ai une idée de fonctionnalité mais je ne sais pas comment la définir - pas de panique je suis là pour vous aider",
      min: 190,
      max: 290,
    },
    // multilingue géré à part
  },

  multilingual: {
    baseFor2: 180,
    perExtra: 90,
  },

  backOfficeModules: {
    blog: { label: "Blog / actualités", min: 120, max: 120 },
    portfolio: { label: "Portfolio / réalisations", min: 120, max: 120 },
    faq: { label: "Témoignages / FAQ / partenaires", min: 80, max: 80 },
    seoFields: { label: "SEO de base (titre, description, image de partage)", min: 60, max: 60 },
  },

  partnerChoices: {
    design: {
      none: { label: "J'ai déjà un super logo et une magnifique charte graphique", min: 0, max: 0 },
      simple: {
        label: "Charte graphique simple (logo simple + éléments graphiques + template réseaux sociaux)",
        min: 90,
        max: 90,
      },
      partner: { label: "Je souhaite faire appel à un(e) graphiste partenaire", min: 0, max: 0, partnerOnly: true },
    },
    copy: {
      none: { label: "J'ai déjà un contenu prêt à l'emploi", min: 0, max: 0 },
      basic: { label: "Rédaction (jusqu’à 5 sections)", min: 180, max: 180 },
      partner: {
        label: "Je souhaite faire appel à un(e) rédacteur(trice) partenaire",
        min: 0,
        max: 0,
        partnerOnly: true,
      },
    },
    social: {
      none: { label: "Je n'ai pas besoin d'aide pour les réseaux sociaux", min: 0, max: 0 },
      basic: { label: "Aide réseaux sociaux (mise en place + conseils)", min: 90, max: 90 },
      partner: {
        label: "Je souhaite faire appel à un(e) community manager partenaire",
        min: 0,
        max: 0,
        partnerOnly: true,
      },
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
    pages2to4: 39,
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
function optionPriceLabel(opt) {
  if (!opt) return "";
  if (opt.min === 0 && opt.max === 0) return "";
  return opt.min === opt.max ? ` — ${formatEUR(opt.min)}` : ` — ${formatEUR(opt.min)} à ${formatEUR(opt.max)}`;
}
function calcMultilingualPrice(languageCount) {
  const count = Math.max(2, languageCount || 2);
  return PRICING.multilingual.baseFor2 + (count - 2) * PRICING.multilingual.perExtra;
}

function calcEstimate(state) {
  const items = [];
  const base = PRICING.bases[state.projectType];
  if (!base) return { min: 0, max: 0, items: [] };
  items.push({ label: base.label, min: base.min, max: base.max });

  const isEcom = state.projectType === "ecommerceSimple" || state.projectType === "ecommerceAdvanced";
  const isAudit = state.projectType === "auditVisibility";

  if (state.projectType === "pages5plus") {
    const included = 5;
    const pagesCount = Math.max(included, state.pagesCount);
    const extra = Math.max(0, pagesCount - included);
    if (extra > 0) {
      const per = PRICING.pages.extraPage;
      items.push({ label: `${per.label} × ${extra}`, min: per.min * extra, max: per.max * extra });
    }
  }

  if (!isAudit) {
    Object.entries(state.optionsBasic).forEach(([key, enabled]) => {
      if (!enabled) return;
      const opt = PRICING.optionsBasic[key];
      if (!opt) return;
      items.push({ label: opt.label, min: opt.min, max: opt.max });
    });

    if (state.multilingualEnabled) {
      const price = calcMultilingualPrice(state.languageCount);
      items.push({
        label: `Multilingue (${Math.max(2, state.languageCount)} langues)`,
        min: price,
        max: price,
      });
    }

    if (state.optionsBasic.backOffice) {
      Object.entries(state.backOfficeModules || {}).forEach(([key, enabled]) => {
        if (!enabled) return;
        const mod = PRICING.backOfficeModules[key];
        if (!mod) return;
        items.push({ label: `Back-office : ${mod.label}`, min: mod.min, max: mod.max });
      });
    }

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
  projectType: "pages2to4",
  pagesCount: 2,

  hostingMaintenanceChoice: "noHosting_withMaintenance",
  domainChoice: "already",

  optionsBasic: {
    contactForm: true,
    booking: false,
    backOffice: false,
    seoAdvanced: false,
    analyticsBasic: false,

    mapSection: false,
    thirdPartyFeature: false,
    customIdeaHelp: false,
  },

  multilingualEnabled: false,
  languageCount: 2,

  backOfficeModules: {
    blog: false,
    portfolio: false,
    faq: false,
    seoFields: false,
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
          item.partnerOnly ? " (sur devis)" : item.min === item.max && item.min > 0 ? ` — ${formatEUR(item.min)}` : "";
        return (
          <label key={key} style={{ display: "block", marginBottom: 6 }}>
            <input type="radio" name={name} checked={value === key} onChange={() => onChange(key)} /> {item.label}
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
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showProjectType, setShowProjectType] = useState(false);
  const emailFormRef = useRef(null);
  const projectTypeRef = useRef(null);

  const isAudit = state.projectType === "auditVisibility";
  const isEcom = state.projectType === "ecommerceSimple" || state.projectType === "ecommerceAdvanced";

  const totalSteps = isAudit ? 2 : 5;

  const estimate = useMemo(() => calcEstimate(state), [state]);

  const maintenanceAvailable = Object.prototype.hasOwnProperty.call(PRICING.maintenanceMonthlyByProject, state.projectType);
  const maintenanceMonthly = maintenanceAvailable ? PRICING.maintenanceMonthlyByProject[state.projectType] : 0;

  const maintenanceSelected =
    maintenanceAvailable &&
    (state.hostingMaintenanceChoice === "noHosting_withMaintenance" ||
      state.hostingMaintenanceChoice === "hasHosting_withMaintenance");

  const isMaintenanceVariable =
    maintenanceAvailable && state.hostingMaintenanceChoice === "hasHosting_withMaintenance";

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

    if (state.projectType === "pages2to4") {
      lines.push(`Pages : ${Math.min(4, Math.max(2, state.pagesCount))}`);
    }
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

      lines.push("");
      if (selectedBasic.length) {
        lines.push("Options :");
        selectedBasic.forEach((opt) => lines.push(`- ${opt}`));
      } else {
        lines.push("Options : aucune");
      }

      if (state.multilingualEnabled) {
        lines.push("");
        lines.push(`Multilingue : ${Math.max(2, state.languageCount)} langues`);
      }

      if (state.optionsBasic.backOffice) {
        lines.push("");
        const modules = Object.entries(state.backOfficeModules)
          .filter(([, enabled]) => enabled)
          .map(([key]) => PRICING.backOfficeModules[key]?.label)
          .filter(Boolean);
        lines.push(modules.length ? `Back-office : ${modules.join(", ")}` : "Back-office : pages du site (inclus)");
      }

      const designChoice = PRICING.partnerChoices.design[state.designChoice];
      const copyChoice = PRICING.partnerChoices.copy[state.copyChoice];
      const socialChoice = PRICING.partnerChoices.social[state.socialChoice];
      const partnerInfo = [
        designChoice?.partnerOnly ? `${designChoice.label} (sur devis)` : designChoice?.label,
        copyChoice?.partnerOnly ? `${copyChoice.label} (sur devis)` : copyChoice?.label,
        socialChoice?.partnerOnly ? `${socialChoice.label} (sur devis)` : socialChoice?.label,
      ].filter(Boolean);
      if (partnerInfo.length) {
        lines.push("");
        lines.push("Prestataires :");
        partnerInfo.forEach((info) => lines.push(`- ${info}`));
      }
    } else {
      lines.push("");
      lines.push("Options : aucune (audit uniquement)");
    }

    lines.push("");
    if (!maintenanceAvailable) {
      lines.push("Hébergement / maintenance : non incluse (sur devis)");
    } else {
      const hostingText =
        state.hostingMaintenanceChoice === "noHosting_withMaintenance"
          ? `Je n’ai pas d’hébergement → je prends l’option maintenance — ${formatEUR(maintenanceMonthly)}/mois`
          : state.hostingMaintenanceChoice === "hasHosting_withMaintenance"
            ? "J’ai déjà un hébergement → je veux la maintenance (prix variable) — je vous accompagne avec ce que vous avez déjà"
            : "J’ai déjà un hébergement → je ne veux pas de maintenance (je gère la publication / MAJ / sécurité)";

      const domainText =
        state.domainChoice === "need"
          ? "Je n’ai pas de nom de domaine (aide incluse, nom de domaine payant selon le nom et l’hébergeur)"
          : "J’ai déjà un nom de domaine";

      lines.push(`Hébergement / maintenance : ${hostingText}`);
      lines.push(`Nom de domaine : ${domainText}`);
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
    state.multilingualEnabled,
    state.languageCount,
    state.backOfficeModules,
    state.designChoice,
    state.copyChoice,
    state.socialChoice,
    maintenanceAvailable,
    maintenanceMonthly,
    state.hostingMaintenanceChoice,
    state.domainChoice,
    pricedLines,
    estimateTotal,
  ]);

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
          : state.hostingMaintenanceChoice === "noHosting_withMaintenance"
            ? `${formatEUR(maintenanceMonthly)}/mois`
            : state.hostingMaintenanceChoice === "hasHosting_withMaintenance"
              ? "Prix variable (hébergement existant) — accompagnement avec l’existant"
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
    if (step === 1 && isAudit) {
      setStep(5);
      setShowEmail(false);
      setStatus("");
      return;
    }
    setStep((s) => Math.min(5, s + 1));
    setShowEmail(false);
    setStatus("");
  };

  const prev = () => {
    if (step === 5 && isAudit) {
      setStep(1);
      setShowEmail(false);
      setStatus("");
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

  const onProjectTypeChange = (value) => {
    setState((s) => ({
      ...s,
      projectType: value,
      pagesCount: value === "pages5plus" ? Math.max(5, s.pagesCount) : value === "pages2to4" ? 2 : s.pagesCount,
      hostingMaintenanceChoice: "noHosting_withMaintenance",
      domainChoice: "already",
    }));
  };

  const stepLabel = isAudit ? (step === 5 ? 2 : 1) : step;

  // ✅ Formater le texte récapitulatif avec caractéristiques en gras (uniquement les labels)
  const formatDetailsWithBold = (text) => {
    return text
      .split("\n")
      .map((line) => {
        const keywords = [
          "Type :",
          "Pages :",
          "Produits :",
          "E-commerce :",
          "Inclus :",
          "Options :",
          "Multilingue :",
          "Back-office :",
          "Prestataires :",
          "Hébergement / maintenance :",
          "Nom de domaine :",
          "Détail du prix :",
          "Estimation :",
        ];
        // Mettre en gras uniquement le label avant le ':', pas la valeur
        for (const kw of keywords) {
          if (line.includes(kw)) {
            return line.replace(kw, `<strong>${kw}</strong>`);
          }
        }
        return line;
      })
      .join("<br />");
  };

  // ✅ helper pour rendre une checkbox d'option basique
  const renderBasicOption = (key) => {
    const opt = PRICING.optionsBasic[key];
    if (!opt) return null;
    return (
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
        {opt.label}
        {optionPriceLabel(opt)}
      </label>
    );
  };

  return (
    <section className="quote-estimator">
      <h2>💰 Estimez votre projet</h2>

      {step === 1 && (
        <p>
          Sélectionnez les caractéristiques de votre projet pour obtenir une estimation indicative (le devis final dépendra du besoin exact).
          Si vous ne savez pas exactement ce dont vous avez besoin, choisissez l’option qui s’en rapproche le plus ou n’hésitez pas à me contacter
          pour en discuter ! Gardez en tête que votre site pourra évoluer dans le temps, et que je serai là pour vous accompagner même après la livraison du projet.
        </p>
      )}

      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <div style={{ fontSize: '0.9em', color: '#70588C', fontWeight: 600 }}>
          Étape {stepLabel}/{totalSteps}
        </div>
      </div>

      {/* ÉTAPE 1 */}
      {step === 1 && (
        <div>
          <h3 style={{ color: '#70588C', marginBottom: 20 }}>📦 Quel est le type de votre projet ?</h3>

          <div className="quote-estimator-project-dropdown">
            <button
              type="button"
              className="quote-estimator-project-toggle"
              onClick={() => setShowProjectType((v) => !v)}
            >
              {PRICING.bases[state.projectType]?.label || "Sélectionner un type"}
              <FontAwesomeIcon
                icon={faChevronUp}
                style={{
                  transition: 'transform 0.2s ease-in-out',
                  transform: showProjectType ? 'rotate(-180deg)' : 'rotate(0deg)',
                }}
              />
            </button>

            <div
              className={`quote-estimator-project-content ${showProjectType ? 'open' : 'closed'}`}
              ref={projectTypeRef}
              style={{
                height: showProjectType ? `${projectTypeRef.current?.scrollHeight}px` : "0px",
                overflow: "hidden",
                transition: "height 0.2s ease-in-out",
              }}
            >
              <ul className="quote-estimator-project-options">
                {Object.entries(PRICING.bases).map(([key, item]) => (
                  <li
                    key={key}
                    className={`quote-estimator-project-option ${state.projectType === key ? 'active' : ''}`}
                    onClick={() => {
                      onProjectTypeChange(key);
                      setShowProjectType(false);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {state.projectType === "pages2to4" && (
            <div style={{ marginTop: 15 }}>
              <label style={{ fontWeight: 500 }}>
                📄 Nombre de pages (2 à 4) :{" "}
                <input
                  type="number"
                  min={2}
                  max={4}
                  value={Math.min(4, Math.max(2, state.pagesCount))}
                  onChange={(e) =>
                    setState((s) => ({ ...s, pagesCount: clampInt(Math.min(4, Math.max(2, e.target.value)), 2) }))
                  }
                />
              </label>
            </div>
          )}

          {state.projectType === "pages5plus" && (
            <div style={{ marginTop: 15 }}>
              <label style={{ fontWeight: 500 }}>
                📄 Nombre de pages (5 incluses) :{" "}
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
            <div style={{ marginTop: 15 }}>
              <label style={{ fontWeight: 500 }}>
                🛒 Nombre de produits :{" "}
                <select value={state.productsRange} onChange={(e) => setState((s) => ({ ...s, productsRange: e.target.value }))}>
                  <option value="0_20">0 à 20</option>
                  <option value="21_50">21 à 50</option>
                  <option value="51_plus">51+</option>
                </select>
              </label>
            </div>
          )}
        </div>
      )}

      {/* ÉTAPE 2 */}
      {step === 2 && !isAudit && (
        <div>
          <h3 style={{ color: '#70588C', marginBottom: 20 }}>⚙️ De quoi avez-vous besoin pour votre site ?</h3>

          <div style={{ backgroundColor: '#f0f0f0', padding: 15, borderRadius: 8, marginBottom: 20 }}>
            <strong style={{ fontSize: '1.05em', color: '#70588C' }}>✅ Déjà inclus :</strong>
            <ul style={{ marginTop: 10, marginBottom: 0 }}>
              <li>🔍 {PRICING.included.seoBasic}</li>
              <li>♿ {PRICING.included.accessibility}</li>
            </ul>
          </div>

          {/* ✅ Fieldset SEO / Analytics (au-dessus) */}
          <fieldset>
            <legend>🔍 SEO & Analyse</legend>
            {renderBasicOption("seoAdvanced")}
            {renderBasicOption("analyticsBasic")}


          </fieldset>

          {/* ✅ Fieldset Fonctionnalités (en dessous) */}
          <fieldset style={{ marginTop: 12 }}>
            <legend>⭐ Fonctionnalités à la carte</legend>
            {renderBasicOption("contactForm")}
            {renderBasicOption("booking")}
            {renderBasicOption("mapSection")}
            <label style={{ display: "block", marginBottom: 6, marginTop: 6 }}>
              <input
                type="checkbox"
                checked={!!state.multilingualEnabled}
                onChange={() =>
                  setState((s) => ({
                    ...s,
                    multilingualEnabled: !s.multilingualEnabled,
                    languageCount: Math.max(2, s.languageCount || 2),
                  }))
                }
              />{" "}
              🌍 Multilingue (2 langues) + {formatEUR(PRICING.multilingual.perExtra)} / langue supplémentaire
            </label>

            {state.multilingualEnabled && (
              <div style={{ marginTop: 6 }}>
                <label>
                  Nombre de langues :{" "}
                  <input
                    type="number"
                    min={2}
                    value={Math.max(2, state.languageCount)}
                    onChange={(e) => setState((s) => ({ ...s, languageCount: clampInt(e.target.value, 2) }))}
                  />
                </label>
                <div>Prix : {formatEUR(calcMultilingualPrice(state.languageCount))}</div>
              </div>
            )}
            {renderBasicOption("backOffice")}
            {renderBasicOption("thirdPartyFeature")}
            {renderBasicOption("customIdeaHelp")}
            
          </fieldset>

          {state.optionsBasic.backOffice && (
            <fieldset style={{ marginTop: 12 }}>
              <legend>🎛️ Back-office : que souhaitez-vous gérer ?</legend>

              <p>Pages du site (Accueil, À propos, Services, Contact…) : inclus</p>

              {Object.entries(PRICING.backOfficeModules).map(([key, mod]) => (
                <label key={key} style={{ display: "block", marginBottom: 6 }}>
                  <input
                    type="checkbox"
                    checked={!!state.backOfficeModules?.[key]}
                    onChange={() =>
                      setState((s) => ({
                        ...s,
                        backOfficeModules: { ...(s.backOfficeModules || {}), [key]: !s.backOfficeModules?.[key] },
                      }))
                    }
                  />{" "}
                  {mod.label} — {formatEUR(mod.min)}
                </label>
              ))}
            </fieldset>
          )}

          {isEcom && (
            <fieldset style={{ marginTop: 12 }}>
              <legend>🛍️ E-commerce</legend>
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

      {/* ÉTAPE 3 */}
      {step === 3 && !isAudit && (
        <div>
          <h3 style={{ color: '#70588C', marginBottom: 20 }}>🌐 Avez-vous déjà un nom de domaine et un hébergement ?</h3>

          <fieldset style={{ marginTop: 12 }}>
            <legend>🏠 Nom de domaine</legend>

            <label style={{ display: "block", marginBottom: 6 }}>
              <input
                type="radio"
                name="domain"
                checked={state.domainChoice === "already"}
                onChange={() => setState((s) => ({ ...s, domainChoice: "already" }))}
              />{" "}
              J’ai déjà un nom de domaine
            </label>

            <label style={{ display: "block", marginBottom: 6 }}>
              <input
                type="radio"
                name="domain"
                checked={state.domainChoice === "need"}
                onChange={() => setState((s) => ({ ...s, domainChoice: "need" }))}
              />{" "}
              Non, je n’ai pas de nom de domaine
            </label>

            {state.domainChoice === "need" && (
              <p>
                Je peux vous aider à choisir et configurer votre nom de domaine (service inclus).
                <br />
                Le nom de domaine n’est pas gratuit : le prix dépend du nom choisi et de l’hébergeur.
              </p>
            )}
          </fieldset>

          <fieldset style={{ marginTop: 12 }}>
            <legend>🔧 Maintenance & Hébergement</legend>

            {!maintenanceAvailable ? (
              <p style={{ fontStyle: 'italic', color: '#666' }}>📌 Non incluse pour cette offre (sur devis).</p>
            ) : (
              <>
                <p style={{ backgroundColor: '#fff9f0', padding: 10, borderLeft: '4px solid #70588C', borderRadius: 4, marginBottom: 15 }}>L'option maintenance comprend 📤 la publication, 🔄 les mises à jour et 🔒 la sécurité.</p>

                <label style={{ display: "block", marginBottom: 6 }}>
                  <input
                    type="radio"
                    name="hostingMaintenance"
                    checked={state.hostingMaintenanceChoice === "noHosting_withMaintenance"}
                    onChange={() => setState((s) => ({ ...s, hostingMaintenanceChoice: "noHosting_withMaintenance" }))}
                  />{" "}
                  Je n’ai pas d’hébergement et je prends l’option maintenance — {formatEUR(maintenanceMonthly)}/mois
                </label>

                <label style={{ display: "block", marginBottom: 6 }}>
                  <input
                    type="radio"
                    name="hostingMaintenance"
                    checked={state.hostingMaintenanceChoice === "hasHosting_withMaintenance"}
                    onChange={() => setState((s) => ({ ...s, hostingMaintenanceChoice: "hasHosting_withMaintenance" }))}
                  />{" "}
                  J’ai déjà un hébergement mais je souhaite l'option maintenance (prix variable) — je vous accompagne avec ce que vous avez déjà
                </label>

                <label style={{ display: "block", marginBottom: 6 }}>
                  <input
                    type="radio"
                    name="hostingMaintenance"
                    checked={state.hostingMaintenanceChoice === "hasHosting_noMaintenance"}
                    onChange={() => setState((s) => ({ ...s, hostingMaintenanceChoice: "hasHosting_noMaintenance" }))}
                  />{" "}
                  J’ai déjà un hébergement mais je ne veux pas de maintenance (je gère moi-même publication / mises à jour / sécurité)
                </label>
              </>
            )}
          </fieldset>
        </div>
      )}

      {/* ÉTAPE 4 */}
      {step === 4 && !isAudit && (
        <div>
          <h3 style={{ color: '#70588C', marginBottom: 20 }}>🤝 Avez-vous besoin de services supplémentaires ?</h3>

          <RadioGroup
            name="design"
            title="🎨 Design"
            value={state.designChoice}
            onChange={(v) => setState((s) => ({ ...s, designChoice: v }))}
            choices={PRICING.partnerChoices.design}
          />

          <RadioGroup
            name="copy"
            title="✍️ Rédaction"
            value={state.copyChoice}
            onChange={(v) => setState((s) => ({ ...s, copyChoice: v }))}
            choices={PRICING.partnerChoices.copy}
          />

          <RadioGroup
            name="social"
            title="📱 Réseaux sociaux"
            value={state.socialChoice}
            onChange={(v) => setState((s) => ({ ...s, socialChoice: v }))}
            choices={PRICING.partnerChoices.social}
          />
        </div>
      )}

      {/* ÉTAPE 5 */}
      {step === 5 && (
        <div>
          <h3 style={{ color: "$main-color", marginBottom: 20 }}>✓ Votre estimation</h3>

          <div style={{ textAlign: "center", fontSize: "1.5em", fontWeight: 700, marginTop: 15, color: "#70588C", letterSpacing: "0.5px" }}>
            {estimateTotal}
          </div>

          <div style={{ marginTop: 15, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="/contact">
              <button type="button">📅 Prendre un RDV</button>
            </a>

            <a href="/contact">
              <button type="button">💬 Me contacter</button>
            </a>
          </div>

          <div className="quote-estimator-email-dropdown">
            <button 
              type="button" 
              className="quote-estimator-email-toggle"
              onClick={() => setShowEmail((v) => !v)}
            >
              <span style={{
                display: 'inline-block',
                transition: 'transform 0.2s ease-in-out',
                transform: showEmail ? 'rotate(-180deg)' : 'rotate(0deg)',
              }}>▼</span>
              {showEmail ? "Fermer" : "📧 Recevoir l'estimation par email"}
            </button>

            <div
              className={`quote-estimator-email-content ${showEmail ? 'open' : 'closed'}`}
              ref={emailFormRef}
              style={{
                height: showEmail ? `${emailFormRef.current?.scrollHeight}px` : "0px",
                overflow: "hidden",
                transition: "height 0.2s ease-in-out",
              }}
            >
              <form onSubmit={sendEmail} className="quote-estimator-email-form">
                <div>
                  <label>
                    Nom :
                    <input value={clientName} onChange={(e) => setClientName(e.target.value)} />
                  </label>
                </div>

                <div>
                  <label>
                    Email :
                    <input required type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
                  </label>
                </div>

                <button type="submit" disabled={sending}>
                  {sending ? "Envoi..." : "Envoyer"}
                </button>

                {status && <p>{status}</p>}
              </form>
            </div>
          </div>

          <p style={{ fontSize: "0.9em", color: "#555", marginTop: 10, textAlign: "center", fontWeight: "500", lineHeight: "1.5" }}>
            Vos données <strong>ne sont pas collectées à des fins de prospection.</strong><br />
            Je collecte seulement les réponses <strong>à des fins d'amélioration de service.</strong>
          </p>

          <hr />

          <div className="quote-details-wrapper">
            <button 
              type="button" 
              className="quote-details-trigger"
              onClick={() => setDetailsOpen(!detailsOpen)}
            >
              <span className={`quote-details-icon ${detailsOpen ? 'open' : ''}`}>▼</span>
              📋 Détails de votre projet
            </button>
            
            <div className={`quote-details-content ${detailsOpen ? 'open' : ''}`}>
              <div 
                className="quote-details-text"
                dangerouslySetInnerHTML={{ __html: formatDetailsWithBold(detailsText) }}
              />
            </div>
          </div>
        </div>
      )}

      <hr />

      <div>
        {step > 1 && (
          <button type="button" onClick={prev}>
            <FontAwesomeIcon icon={faArrowLeft} /> Retour
          </button>
        )}

        {(isAudit ? step < 5 : step < 5) && (
          <button type="button" onClick={next}>
            Suivant <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}

        {step === 5 && (
          <button type="button" onClick={restart}>
            <FontAwesomeIcon icon={faRotateRight} /> Recommencer
          </button>
        )}
      </div>
    </section>
  );
}