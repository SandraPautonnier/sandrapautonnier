import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { PRICING } from "../pricing";
import { clampInt } from "../calculations";

export default function Step1ProjectType({
  state,
  setState,
  showProjectType,
  setShowProjectType,
  projectTypeRef,
  onProjectTypeChange,
}) {
  return (
    <div>
      <h3 style={{ color: '#70588C', marginBottom: 20 }}>📦 Quel est le type de votre projet ?</h3>

      <div className="quote-estimator-project-dropdown">
        <button
          type="button"
          className="quote-estimator-project-toggle"
          onClick={() => setShowProjectType((v) => !v)}
          aria-label="Sélectionner le type de projet"
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
  );
}
