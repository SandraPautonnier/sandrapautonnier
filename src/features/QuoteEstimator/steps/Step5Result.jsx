export default function Step5Result({ estimateTotal, summary, detailsOpen, setDetailsOpen, onDownloadPdf }) {
  return (
    <div>
      <h3 style={{ color: "$main-color", marginBottom: 20 }}>✓ Votre estimation</h3>

      <div style={{ textAlign: "center", fontSize: "1.5em", fontWeight: 700, marginTop: 15, color: "#70588C", letterSpacing: "0.5px" }}>
        {estimateTotal}
      </div>

      <div style={{ marginTop: 15, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <a href="/contact" className="btn" aria-label="Prendre un rendez-vous">📅 Prendre un RDV</a>

        <a href="/contact" className="btn" aria-label="Me contacter">💬 Me contacter</a>
      </div>

      <hr />

      <div className="quote-details-wrapper">
        <button
          type="button"
          className="quote-details-trigger"
          onClick={() => setDetailsOpen(!detailsOpen)}
          aria-label="Afficher les détails du projet"
        >
          <span className={`quote-details-icon ${detailsOpen ? 'open' : ''}`}>▼</span>
          📋 Détails de votre projet
        </button>

        <button type="button" onClick={onDownloadPdf} aria-label="Télécharger l'estimation au format PDF">
          📄 Télécharger au format pdf
        </button>

        <div className={`quote-details-content ${detailsOpen ? 'open' : ''}`}>
          <div className="quote-details-text">
            {summary.blocks.map((block, i) => (
              <p key={i}>
                {block.heading && (
                  <>
                    <strong>{block.heading} :</strong>
                    <br />
                  </>
                )}
                {block.lines.map((line, j) => (
                  <span key={j}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            ))}

            <p>
              <strong>Détail du prix :</strong>
              <br />
              {summary.priceLines.map((row, i) => (
                <span key={i}>
                  - {row.label} : {row.price}
                  <br />
                </span>
              ))}
              {summary.maintenanceLine && (
                <span>
                  - {summary.maintenanceLine.label} : {summary.maintenanceLine.price}
                  <br />
                </span>
              )}
            </p>

            <p>
              <strong>Estimation :</strong> {summary.total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
