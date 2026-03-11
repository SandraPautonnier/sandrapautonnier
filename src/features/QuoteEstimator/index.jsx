import { useMemo, useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faArrowLeft, faArrowRight, faRotateRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { jsPDF } from "jspdf";

const PRICING = {
  bases: {
    onePage: { label: "Site One Page", min: 390, max: 390 },
    pages2to4: { label: "Site 2 à 4 pages", min: 690, max: 690 },
    pages5plus: { label: "Site 5 pages et plus", min: 890, max: 890 },

    ecommerceSimple: { label: "Boutique en ligne Essentielle (SumUp)", min: 790, max: 790 },
    ecommerceAdvanced: { label: "Boutique en ligne Évolutive (Shopify)", min: 990, max: 990 },

    refonte: { label: "Refonte de site", min: 590, max: 890 },
    auditVisibility: { label: "Audit de visibilité", min: 290, max: 290 },
  },

  included: {
    seoBasic: "SEO de base (structure + balises + indexabilité)",
    accessibility: "Accessibilité (respect des bonnes pratiques d’accessibilité pour une meilleure expérience pour tous)",
  },

  optionsBasic: {
    contactForm: { label: "Formulaire de contact", min: 50, max: 50 },
    booking: { label: "Réservation / Prise de RDV", min: 50, max: 50 },
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
      "21_50": { label: "21 à 50 produits", min: 250, max: 450 },
      "51_100": { label: "51 à 100 produits", min: 500, max: 900 },
      "101_plus": { label: "101+ produits (sur devis)", min: 0, max: 0 },
    },
    features: {
      shipping: { label: "Configuration livraison / click & collect", min: 90, max: 180 },
      variants: { label: "Variantes (taille/couleur) + organisation", min: 90, max: 220 },
      promos: { label: "Codes promo + règles de réduction", min: 60, max: 140 },
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
function formatRangeEUR(min, max) {
  return min === max ? formatEUR(min) : `${formatEUR(min)} – ${formatEUR(max)}`;
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
    contactForm: false,
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

  const estimateLinesForUI = useMemo(() => {
    return estimate.items.map((it) => ({
      label: it.label,
      price: formatRangeEUR(it.min, it.max),
    }));
  }, [estimate.items]);

  // ✅ résumé des prestations
  const prestationsSummary = useMemo(() => {
    const bullets = [];

    // Type / pages
    bullets.push(`Type : ${projectTypeLabel}`);
    if (state.projectType === "pages2to4") bullets.push(`Pages : ${Math.min(4, Math.max(2, state.pagesCount))}`);
    if (state.projectType === "pages5plus") bullets.push(`Pages : ${Math.max(5, state.pagesCount)} (5 incluses)`);

    // Options sélectionnées
    const selectedOptions = Object.entries(state.optionsBasic)
      .filter(([, enabled]) => enabled)
      .map(([key]) => PRICING.optionsBasic[key]?.label)
      .filter(Boolean);

    if (selectedOptions.length) bullets.push(`Options : ${selectedOptions.join(", ")}`);

    // Multilingue
    if (state.multilingualEnabled) {
      bullets.push(`Multilingue : ${Math.max(2, state.languageCount)} langues — ${formatEUR(calcMultilingualPrice(state.languageCount))}`);
    }

    // Back-office modules
    if (state.optionsBasic.backOffice) {
      const mods = Object.entries(state.backOfficeModules)
        .filter(([, enabled]) => enabled)
        .map(([key]) => PRICING.backOfficeModules[key]?.label)
        .filter(Boolean);
      bullets.push(mods.length ? `Modules back-office : ${mods.join(", ")}` : "Back-office : pages du site (inclus)");
    }

    // E-commerce
    if (isEcom) {
      const prodLabel = PRICING.ecommerce.products[state.productsRange]?.label;
      if (prodLabel) bullets.push(`Catalogue : ${prodLabel}`);
      const feats = Object.entries(state.ecommerceFeatures)
        .filter(([, enabled]) => enabled)
        .map(([key]) => PRICING.ecommerce.features[key]?.label)
        .filter(Boolean);
      if (feats.length) bullets.push(`E-commerce : ${feats.join(", ")}`);
    }

    // Étape 3 : domaine/hébergement
    const domainText =
      state.domainChoice === "need"
        ? "Nom de domaine : Non (aide incluse)"
        : "Nom de domaine : Oui";
    bullets.push(domainText);

    if (maintenanceAvailable) {
      const hostingText =
        state.hostingMaintenanceChoice === "noHosting_withMaintenance"
          ? `Hébergement : Non → Maintenance ${formatEUR(maintenanceMonthly)}/mois`
          : state.hostingMaintenanceChoice === "hasHosting_withMaintenance"
            ? "Hébergement : Oui → Maintenance (prix variable)"
            : "Hébergement : Oui → Pas de maintenance";
      bullets.push(hostingText);
    }

    // Étape 4 : services supplémentaires
    const designChoice = PRICING.partnerChoices.design[state.designChoice];
    const copyChoice = PRICING.partnerChoices.copy[state.copyChoice];
    const socialChoice = PRICING.partnerChoices.social[state.socialChoice];

    if (designChoice?.label) bullets.push(`Design : ${designChoice.partnerOnly ? `${designChoice.label} (sur devis)` : designChoice.label}`);
    if (copyChoice?.label) bullets.push(`Rédaction : ${copyChoice.partnerOnly ? `${copyChoice.label} (sur devis)` : copyChoice.label}`);
    if (socialChoice?.label) bullets.push(`Réseaux sociaux : ${socialChoice.partnerOnly ? `${socialChoice.label} (sur devis)` : socialChoice.label}`);

    return bullets;
  }, [
    projectTypeLabel,
    state.projectType,
    state.pagesCount,
    state.optionsBasic,
    state.multilingualEnabled,
    state.languageCount,
    state.backOfficeModules,
    isEcom,
    state.productsRange,
    state.ecommerceFeatures,
    state.domainChoice,
    maintenanceAvailable,
    maintenanceMonthly,
    state.hostingMaintenanceChoice,
    state.designChoice,
    state.copyChoice,
    state.socialChoice,
  ]);

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
    estimate.items.forEach((it) => lines.push(`- ${it.label} : ${formatRangeEUR(it.min, it.max)}`));
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
    estimate.items,
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
    const serviceID = "service_xxxx";
    const templateID = "template_xxxx";
    if (!serviceID || !templateID) throw new Error("Les identifiants EmailJS sont manquants.");

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

    await emailjs.send(serviceID, templateID, templateParams);
    setStatus("Email envoyé ✅");
    setClientName("");
    setClientEmail("");
    setShowEmail(false);
  } catch (error) {
    console.error("Erreur EmailJS :", error);
    setStatus(`Échec de l’envoi : ${error.text || error.message || "Vérifiez la configuration EmailJS."}`);
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

      // ✅ forcer 0-20 sur l’offre SumUp
      productsRange: value === "ecommerceSimple" ? "0_20" : s.productsRange,

      pagesCount:
        value === "pages5plus" ? Math.max(5, s.pagesCount) :
        value === "pages2to4" ? 2 :
        s.pagesCount,

      hostingMaintenanceChoice: "noHosting_withMaintenance",
      domainChoice: "already",
    }));
  };

  const stepLabel = isAudit ? (step === 5 ? 2 : 1) : step;

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
        for (const kw of keywords) {
          if (line.includes(kw)) {
            return line.replace(kw, `<strong>${kw}</strong>`);
          }
        }
        return line;
      })
      .join("<br />");
  };

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

  const ecommercePriceLabel = (opt) => {
  if (!opt) return "";
  if (opt.min === 0 && opt.max === 0) return " — inclus";
  return opt.min === opt.max
    ? ` — ${formatEUR(opt.min)}`
    : ` — ${formatEUR(opt.min)} à ${formatEUR(opt.max)}`;
  };

  // ✅ Bloc 2 colonnes réutilisable (étapes 2, 3, 4)
  const TwoColumnsSummary = () => (
    <div className="border-text two-columns-summary" style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 18,
          alignItems: "start",
        }}
      >
        {/* Col 1 : inclus */}
        <div>
          <strong style={{ display: "block", marginTop: 10, color: "#70588C" }}>✅ Déjà inclus :</strong>
          <ul className="bis-text">
            <li><FontAwesomeIcon icon={faCheck} /> {PRICING.included.seoBasic}</li>
            <li><FontAwesomeIcon icon={faCheck} /> {PRICING.included.accessibility}</li>
            {isEcom && (
            <>
              <li><FontAwesomeIcon icon={faCheck} /> Hébergement inclus via la plateforme (SumUp / Shopify)</li>
              <li><FontAwesomeIcon icon={faCheck} /> Paiements en ligne configurés</li>
              <li><FontAwesomeIcon icon={faCheck} /> Page contact simple (email / lien / formulaire standard)</li>
              <li><FontAwesomeIcon icon={faCheck} /> Sécurité et infrastructure gérées par la plateforme</li>
            </>
          )}
          </ul>

        </div>

        {/* Col 2 : résumé des prestations */}
        <div>
          <strong style={{ display: "block", marginTop: 10, color: "#70588C" }}>📌 Résumé des prestations :</strong>
          <ul style={{ marginTop: 10, marginBottom: 10 }}>
            {estimateLinesForUI.map((row, idx) => (
              <li key={`${row.label}-${idx}`} style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <span style={{ flex: 1 }}>{row.label}</span>
                <span style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{row.price}</span>
              </li>
            ))}
          </ul>

          <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontWeight: 800 }}>
              <span>Prix final (estimation)</span>
              <span style={{ whiteSpace: "nowrap", color: "#70588C" }}>{estimateTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

    // ✅ PDF : export du texte "detailsText" + titre + estimation
const downloadPdf = () => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - margin * 2;

  let y = 60;

  const ensureSpace = (needed = 14) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const clean = (str) => {
    if (!str) return "";
    return String(str)
      .replace(/\u00A0/g, " ")
      .replace(/[’‘]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/\s+/g, " ")
      .trim();
  };

  const writeText = (text, { bold = false, size = 11, gap = 14 } = {}) => {
    ensureSpace(gap + 2);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);

    const lines = doc.splitTextToSize(clean(text), maxWidth);
    lines.forEach((line) => {
      ensureSpace(gap);
      doc.text(line, margin, y);
      y += gap;
    });
  };

  const writeTitle = (text) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(clean(text), margin, y);
    y += 22;
  };

  const writeSection = (title) => {
    y += 6;
    writeText(title, { bold: true, size: 13, gap: 18 });
  };

  const bullet = (text) => writeText(`• ${text}`, { gap: 14 });

  // ====== SUMMARY (simple + phrases “de base”) ======
  const summaryLines = [];

  summaryLines.push(`Type : ${projectTypeLabel || "—"}`);

  if (state.projectType === "pages2to4") {
    summaryLines.push(`Pages : ${Math.min(4, Math.max(2, state.pagesCount))}`);
  } else if (state.projectType === "pages5plus") {
    summaryLines.push(`Pages : ${Math.max(5, state.pagesCount)} (5 incluses)`);
  }

  // Options cochées
  const selectedOptions = Object.entries(state.optionsBasic || {})
    .filter(([, enabled]) => enabled)
    .map(([key]) => PRICING.optionsBasic[key]?.label)
    .filter(Boolean);

  summaryLines.push(selectedOptions.length ? `Options : ${selectedOptions.join(", ")}` : "Options : Aucune");

  // Multilingue
  if (state.multilingualEnabled) {
    const langs = Math.max(2, state.languageCount || 2);
    summaryLines.push(`Multilingue : ${langs} langues`);
  }

  // Nom de domaine (phrase complète)
  const domainSentence =
    state.domainChoice === "need"
      ? "Nom de domaine : Non, je n’ai pas de nom de domaine (aide incluse — le nom de domaine est payant selon le nom et l’hébergeur)."
      : "Nom de domaine : Oui, j’ai déjà un nom de domaine.";
  summaryLines.push(domainSentence);

  // Maintenance : OUI/NON dans le résumé
  const maintenanceAvailable = Object.prototype.hasOwnProperty.call(PRICING.maintenanceMonthlyByProject, state.projectType);
  const maintenanceMonthly = maintenanceAvailable ? PRICING.maintenanceMonthlyByProject[state.projectType] : 0;

  const maintenanceYes =
    maintenanceAvailable &&
    (state.hostingMaintenanceChoice === "noHosting_withMaintenance" ||
      state.hostingMaintenanceChoice === "hasHosting_withMaintenance");

  const maintenanceLine = !maintenanceAvailable
    ? "Maintenance : Sur devis"
    : maintenanceYes
      ? (state.hostingMaintenanceChoice === "hasHosting_withMaintenance"
          ? "Maintenance : Oui (prix variable — hébergement existant)"
          : `Maintenance : Oui (${formatEUR(maintenanceMonthly)}/mois)`)
      : "Maintenance : Non";
  summaryLines.push(maintenanceLine);

  // Services supplémentaires (design/copy/social)
  const designChoice = PRICING.partnerChoices?.design?.[state.designChoice];
  const copyChoice = PRICING.partnerChoices?.copy?.[state.copyChoice];
  const socialChoice = PRICING.partnerChoices?.social?.[state.socialChoice];

  if (designChoice?.label)
    summaryLines.push(`Design : ${designChoice.partnerOnly ? `${designChoice.label} (sur devis)` : designChoice.label}`);
  if (copyChoice?.label)
    summaryLines.push(`Rédaction : ${copyChoice.partnerOnly ? `${copyChoice.label} (sur devis)` : copyChoice.label}`);
  if (socialChoice?.label)
    summaryLines.push(
      `Réseaux sociaux : ${socialChoice.partnerOnly ? `${socialChoice.label} (sur devis)` : socialChoice.label}`
    );

  // ====== PRICES LIST (maintenance at the END) ======
  const prices = [...(estimateLinesForUI || [])]; // [{label, price}]
  const maintenancePriceLine =
    !maintenanceAvailable
      ? null
      : maintenanceYes
        ? (state.hostingMaintenanceChoice === "hasHosting_withMaintenance"
            ? { label: "Maintenance", price: "Prix variable (hébergement existant)" }
            : { label: "Maintenance", price: `${formatEUR(maintenanceMonthly)}/mois` })
        : null;

  // ====== PDF RENDER ======
  writeTitle("Estimation de projet avec Sandra Pautonnier");

  writeSection("Résumé");
  summaryLines.forEach((l) => bullet(l));

  writeSection("Détail des prix");
  prices.forEach((row) => writeText(`${row.label} : ${row.price}`, { gap: 14 }));

  // 👉 maintenance ajoutée à la fin de la liste (si oui)
  if (maintenancePriceLine) {
    y += 2;
    writeText(`${maintenancePriceLine.label} : ${maintenancePriceLine.price}`, { gap: 14 });
  }

  y += 8;
  writeText(`Total (estimation) : ${estimateTotal}`, { bold: true, size: 13, gap: 18 });

  y += 10;
  writeText("Prêt(e) à vous lancer ? Contactez-moi :", { bold: true, size: 11, gap: 14 });
  writeText("contact@sandrapautonnier.com", { bold: false, size: 11, gap: 14 });
  writeText("07 56 84 50 15", { bold: false, size: 11, gap: 14 });

  y += 6;
  writeText("Cette estimation est indicative. Le devis final dépendra du besoin exact.", { size: 10, gap: 12 });

  doc.save("estimation-projet.pdf");
};

  return (
    <section className="quote-estimator">
      <h2>💰 Estimez votre projet</h2>

      {step === 1 && (
        <p className="border-text bis-text" >
          <strong style={{textAlign: "center"}}>En 2 min chrono !</strong>
          Sélectionnez les options les plus proches de votre projet et obtenez une estimation de prix indicative.(le devis final sera affiné selon vos besoins précis) : <br /> <br />
          1️⃣ Type de projet (vitrine, e-commerce, Audit visibilité)<br />
          2️⃣ Options à la carte (formulaires, réservation, paiement en ligne…) <br />
          3️⃣ Hébergement / maintenance / nom de domaine <br />
          4️⃣ Services supplémentaires (design, rédaction, réseaux sociaux) <br />
          5️⃣ Estimation & récapitulatif téléchargeable (votre fourchette de prix personnalisée) 🚀 <br />
          <br />
          <span> Un doute sur une étape ? <a href="/contact">
              💬 Contactez-moi
            </a> - Je vous guide pour un projet sur mesure et évolutif.</span>
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
              <label className="base-text">
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
              <label className="base-text">
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

          {state.projectType === "ecommerceSimple" && (
            <div style={{ marginTop: 15 }}>
              <p className="base-text">🛒 Catalogue : jusqu'à 20 produits <br /> Pour plus de 20 produits choisir l'offre : Boutique en ligne Évolutive (Shopify)</p>
            </div>
          )}

          {state.projectType === "ecommerceAdvanced" && (
            <div style={{ marginTop: 15 }}>
              <label className="base-text">
                🛒 Nombre de produits :{" "}
                <select
                  value={state.productsRange}
                  onChange={(e) => setState((s) => ({ ...s, productsRange: e.target.value }))}
                >
                  <option value="0_20">0 à 20</option>
                  <option value="21_50">21 à 50</option>
                  <option value="51_100">51 à 100</option>
                  <option value="101_plus">101+ (sur devis)</option>
                </select>
              </label>
            </div>
          )}
        </div>
      )}

      {/* ÉTAPE 2 */}
      {step === 2 && !isAudit && (
        <div>
          <TwoColumnsSummary />
          <h3 style={{ color: '#70588C', marginBottom: 20 }}>⚙️ De quoi avez-vous besoin pour votre site ?</h3>

          <fieldset>
            <legend>🔍 SEO & Analyse</legend>
            {renderBasicOption("seoAdvanced")}
            {renderBasicOption("analyticsBasic")}
          </fieldset>

          <fieldset style={{ marginTop: 12 }}>
            <legend>⭐ Fonctionnalités à la carte</legend>
            {!isEcom && renderBasicOption("contactForm")}
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
              Multilingue (2 langues) + {formatEUR(PRICING.multilingual.perExtra)} / langue supplémentaire
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

            {!isEcom && renderBasicOption("backOffice")}
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
              <legend>🛍️ Options e-commerce</legend>

              {Object.entries(PRICING.ecommerce.features).map(([key, feat]) => (
                <label key={key} style={{ display: "block", marginBottom: 6 }}>
                  <input
                    type="checkbox"
                    checked={!!state.ecommerceFeatures[key]}
                    onChange={() =>
                      setState((s) => ({
                        ...s,
                        ecommerceFeatures: {
                          ...s.ecommerceFeatures,
                          [key]: !s.ecommerceFeatures[key],
                        },
                      }))
                    }
                  />{" "}
                  {feat.label}
                  {feat.min === feat.max
                    ? ` — ${formatEUR(feat.min)}`
                    : ` — ${formatEUR(feat.min)} à ${formatEUR(feat.max)}`}
                </label>
              ))}
            </fieldset>
          )}
        </div>
      )}

      {/* ÉTAPE 3 */}
      {step === 3 && !isAudit && (
        <div>
          <TwoColumnsSummary />
          <h3 style={{ color: '#70588C', marginBottom: 20 }}>🌐 Avez-vous déjà un nom de domaine et un hébergement ?</h3>

          {isEcom && (
            <p>
              Pour une boutique SumUp/Shopify, l’hébergement et la sécurité sont inclus dans la plateforme.
              L’option mensuelle correspond à l’accompagnement (support + petits ajustements).
            </p>
          )}

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
                <p style={{ backgroundColor: '#fff9f0', padding: 10, borderLeft: '4px solid #70588C', borderRadius: 4, marginBottom: 15 }}>
                  L'option maintenance comprend 📤 la publication, 🔄 les mises à jour et 🔒 la sécurité.
                </p>

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
          <TwoColumnsSummary />
          <h3 style={{ color: '#70588C', marginBottom: 20 }}>🤝 Avez-vous besoin d'autre chose?</h3>

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

          {/* COMMENTÉ - Fonctionnalité d'envoi par email
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

                <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
                  <button type="submit" disabled={sending}>
                    {sending ? "Envoi..." : "Envoyer"}
                  </button>

                  {status && <p style={{ margin: 0 }}>{status}</p>}
                </div>
              </form>
            </div>
          </div>
          */}

          {/* COMMENTÉ - Information confidentialité
          <p className="bis-text" style={{textAlign: "center"}}>
            Les informations (nom, email) servent uniquement à répondre à votre demande et, si besoin, à une seule relance. Conservation : 1 an max. Vos droits : <a className="link" href="mailto:contact@sandrapautonnier.com">contact@sandrapautonnier.com</a> - <a href="/legalnotice" className="link" target="_blank" rel="noopener noreferrer">Mentions légales</a>.
          </p>
          */}

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

            <button type="button" onClick={downloadPdf}>
              📄 Télécharger au format pdf
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