import { PRICING } from "./pricing";

export function clampInt(value, fallback) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

export function formatEUR(n) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
}

export function formatRangeEUR(min, max) {
  return min === max ? formatEUR(min) : `${formatEUR(min)} – ${formatEUR(max)}`;
}

export function priceLabel(opt) {
  if (!opt) return "";
  if (opt.min === 0 && opt.max === 0) return " — inclus";
  return opt.min === opt.max ? ` — ${formatEUR(opt.min)}` : ` — ${formatEUR(opt.min)} à ${formatEUR(opt.max)}`;
}

export function calcMultilingualPrice(languageCount) {
  const count = Math.max(2, languageCount || 2);
  return PRICING.multilingual.baseFor2 + (count - 2) * PRICING.multilingual.perExtra;
}

export function isEcomProject(projectType) {
  return projectType === "ecommerceSimple" || projectType === "ecommerceAdvanced";
}

export function isAuditProject(projectType) {
  return projectType === "auditVisibility";
}

export function maintenanceInfo(projectType) {
  const available = Object.prototype.hasOwnProperty.call(PRICING.maintenanceMonthlyByProject, projectType);
  return {
    available,
    monthly: available ? PRICING.maintenanceMonthlyByProject[projectType] : 0,
  };
}

export function calcEstimate(state) {
  const items = [];
  const base = PRICING.bases[state.projectType];
  if (!base) return { min: 0, max: 0, items: [] };
  items.push({ label: base.label, min: base.min, max: base.max });

  const isEcom = isEcomProject(state.projectType);
  const isAudit = isAuditProject(state.projectType);

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
