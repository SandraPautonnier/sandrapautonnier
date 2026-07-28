import { formatEUR } from "../calculations";
import TwoColumnsSummary from "../components/TwoColumnsSummary";

export default function Step3Hosting({
  state,
  setState,
  isEcom,
  estimateLinesForUI,
  estimateTotal,
  maintenanceAvailable,
  maintenanceMonthly,
}) {
  return (
    <div>
      <TwoColumnsSummary isEcom={isEcom} estimateLinesForUI={estimateLinesForUI} estimateTotal={estimateTotal} />
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
  );
}
