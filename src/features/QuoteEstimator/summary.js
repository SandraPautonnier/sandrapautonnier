import { PRICING } from "./pricing";
import { formatEUR, formatRangeEUR, calcMultilingualPrice } from "./calculations";

/**
 * Single source of truth for the "what did the client pick" summary.
 * Consumed both by the on-screen details panel (Step5Result) and by the
 * PDF export (pdf.js) so the two never drift apart again.
 */
export function buildSummary({
  state,
  estimate,
  estimateTotal,
  projectTypeLabel,
  isEcom,
  isAudit,
  maintenanceAvailable,
  maintenanceMonthly,
}) {
  const blocks = [];

  const typeLines = [`Type : ${projectTypeLabel || "—"}`];
  if (state.projectType === "pages2to4") {
    typeLines.push(`Pages : ${Math.min(4, Math.max(2, state.pagesCount))}`);
  } else if (state.projectType === "pages5plus") {
    typeLines.push(`Pages : ${Math.max(5, state.pagesCount)} (5 incluses)`);
  }
  if (isEcom && !isAudit) {
    const prodLabel = PRICING.ecommerce.products[state.productsRange]?.label || "";
    typeLines.push(`Produits : ${prodLabel}`);
    const selectedEcom = Object.entries(state.ecommerceFeatures)
      .filter(([, enabled]) => enabled)
      .map(([key]) => PRICING.ecommerce.features[key]?.label)
      .filter(Boolean);
    typeLines.push(selectedEcom.length ? `E-commerce : ${selectedEcom.join(", ")}` : "E-commerce : aucune option");
  }
  blocks.push({ heading: null, lines: typeLines });

  const includedLines = [PRICING.included.seoBasic, PRICING.included.accessibility];
  if (!isAudit && state.optionsBasic.seoAdvanced) {
    includedLines.push("(SEO de base inclus dans l’option SEO avancé)");
  }
  blocks.push({ heading: "Inclus", lines: includedLines });

  if (!isAudit) {
    const selectedBasic = Object.entries(state.optionsBasic)
      .filter(([, enabled]) => enabled)
      .map(([key]) => PRICING.optionsBasic[key]?.label)
      .filter(Boolean);
    blocks.push({ heading: "Options", lines: selectedBasic.length ? selectedBasic : ["Aucune"] });

    if (state.multilingualEnabled) {
      const langs = Math.max(2, state.languageCount);
      blocks.push({
        heading: "Multilingue",
        lines: [`${langs} langues — ${formatEUR(calcMultilingualPrice(state.languageCount))}`],
      });
    }

    if (state.optionsBasic.backOffice) {
      const modules = Object.entries(state.backOfficeModules)
        .filter(([, enabled]) => enabled)
        .map(([key]) => PRICING.backOfficeModules[key]?.label)
        .filter(Boolean);
      blocks.push({ heading: "Back-office", lines: modules.length ? modules : ["Pages du site (inclus)"] });
    }

    const designChoice = PRICING.partnerChoices.design[state.designChoice];
    const copyChoice = PRICING.partnerChoices.copy[state.copyChoice];
    const socialChoice = PRICING.partnerChoices.social[state.socialChoice];
    const partnerLines = [];
    if (designChoice?.label) {
      partnerLines.push(`Design : ${designChoice.partnerOnly ? `${designChoice.label} (sur devis)` : designChoice.label}`);
    }
    if (copyChoice?.label) {
      partnerLines.push(`Rédaction : ${copyChoice.partnerOnly ? `${copyChoice.label} (sur devis)` : copyChoice.label}`);
    }
    if (socialChoice?.label) {
      partnerLines.push(
        `Réseaux sociaux : ${socialChoice.partnerOnly ? `${socialChoice.label} (sur devis)` : socialChoice.label}`
      );
    }
    if (partnerLines.length) blocks.push({ heading: "Prestataires", lines: partnerLines });
  } else {
    blocks.push({ heading: "Options", lines: ["Aucune (audit uniquement)"] });
  }

  const hostingText = !maintenanceAvailable
    ? "Non incluse (sur devis)"
    : state.hostingMaintenanceChoice === "noHosting_withMaintenance"
      ? `Je n’ai pas d’hébergement → je prends l’option maintenance — ${formatEUR(maintenanceMonthly)}/mois`
      : state.hostingMaintenanceChoice === "hasHosting_withMaintenance"
        ? "J’ai déjà un hébergement → je veux la maintenance (prix variable) — je vous accompagne avec ce que vous avez déjà"
        : "J’ai déjà un hébergement → je ne veux pas de maintenance (je gère la publication / MAJ / sécurité)";

  const domainText =
    state.domainChoice === "need"
      ? "Je n’ai pas de nom de domaine (aide incluse, nom de domaine payant selon le nom et l’hébergeur)"
      : "J’ai déjà un nom de domaine";

  blocks.push({ heading: "Hébergement / maintenance", lines: [hostingText] });
  blocks.push({ heading: "Nom de domaine", lines: [domainText] });

  const priceLines = estimate.items.map((it) => ({ label: it.label, price: formatRangeEUR(it.min, it.max) }));

  const maintenanceSelected =
    maintenanceAvailable &&
    (state.hostingMaintenanceChoice === "noHosting_withMaintenance" ||
      state.hostingMaintenanceChoice === "hasHosting_withMaintenance");

  const maintenanceLine = maintenanceSelected
    ? {
        label: "Maintenance (mensuelle, hors estimation ci-dessus)",
        price:
          state.hostingMaintenanceChoice === "hasHosting_withMaintenance"
            ? "Prix variable (hébergement existant)"
            : `${formatEUR(maintenanceMonthly)}/mois`,
      }
    : null;

  return { blocks, priceLines, maintenanceLine, total: estimateTotal };
}
