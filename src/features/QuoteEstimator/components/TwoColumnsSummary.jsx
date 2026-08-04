import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { PRICING } from "../pricing";

export default function TwoColumnsSummary({ isEcom, estimateLinesForUI, estimateTotal }) {
  return (
    <div className="border-text two-columns-summary" style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 18,
          alignItems: "start",
        }}
      >
        <div>
          <strong className="two-columns-summary-title">✅ Déjà inclus :</strong>
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

        <div>
          <strong className="two-columns-summary-title">📌 Résumé des prestations :</strong>
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
              <span className="two-columns-summary-total">{estimateTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
