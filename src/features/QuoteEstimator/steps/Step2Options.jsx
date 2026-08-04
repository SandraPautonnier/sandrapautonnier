import { PRICING } from "../pricing";
import { formatEUR, priceLabel, calcMultilingualPrice, clampInt } from "../calculations";
import TwoColumnsSummary from "../components/TwoColumnsSummary";

export default function Step2Options({ state, setState, isEcom, estimateLinesForUI, estimateTotal }) {
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
        {priceLabel(opt)}
      </label>
    );
  };

  return (
    <div>
      <TwoColumnsSummary isEcom={isEcom} estimateLinesForUI={estimateLinesForUI} estimateTotal={estimateTotal} />
      <h3>⚙️ De quoi avez-vous besoin pour votre site ?</h3>

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
          Multilingue - 2 langues : 180 € + {formatEUR(PRICING.multilingual.perExtra)} / langue supplémentaire
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
  );
}
