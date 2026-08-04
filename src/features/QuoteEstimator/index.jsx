import { useMemo, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faRotateRight } from '@fortawesome/free-solid-svg-icons';

import { PRICING, defaultState } from "./pricing";
import { calcEstimate, formatEUR, formatRangeEUR, isEcomProject, isAuditProject, maintenanceInfo } from "./calculations";
import { buildSummary } from "./summary";
import { exportSummaryToPdf } from "./pdf";

import Step1ProjectType from "./steps/Step1ProjectType";
import Step2Options from "./steps/Step2Options";
import Step3Hosting from "./steps/Step3Hosting";
import Step4Partners from "./steps/Step4Partners";
import Step5Result from "./steps/Step5Result";

export default function QuoteEstimatorStepperEmail() {
  const [state, setState] = useState(defaultState);
  const [step, setStep] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [showProjectType, setShowProjectType] = useState(false);
  const projectTypeRef = useRef(null);

  const isAudit = isAuditProject(state.projectType);
  const isEcom = isEcomProject(state.projectType);

  const totalSteps = isAudit ? 2 : 5;

  const estimate = useMemo(() => calcEstimate(state), [state]);

  const { available: maintenanceAvailable, monthly: maintenanceMonthly } = maintenanceInfo(state.projectType);

  const projectTypeLabel = PRICING.bases[state.projectType]?.label || "";

  const estimateTotal =
    estimate.min === estimate.max ? formatEUR(estimate.min) : `${formatEUR(estimate.min)} – ${formatEUR(estimate.max)}`;

  const estimateLinesForUI = useMemo(() => {
    return estimate.items.map((it) => ({
      label: it.label,
      price: formatRangeEUR(it.min, it.max),
    }));
  }, [estimate.items]);

  const summary = useMemo(
    () =>
      buildSummary({
        state,
        estimate,
        estimateTotal,
        projectTypeLabel,
        isEcom,
        isAudit,
        maintenanceAvailable,
        maintenanceMonthly,
      }),
    [state, estimate, estimateTotal, projectTypeLabel, isEcom, isAudit, maintenanceAvailable, maintenanceMonthly]
  );

  const next = () => {
    if (step === 1 && isAudit) {
      setStep(5);
      return;
    }
    setStep((s) => Math.min(5, s + 1));
  };

  const prev = () => {
    if (step === 5 && isAudit) {
      setStep(1);
      return;
    }
    setStep((s) => Math.max(1, s - 1));
  };

  const restart = () => {
    setState(defaultState);
    setStep(1);
  };

  const onProjectTypeChange = (value) => {
    setState((s) => ({
      ...s,
      projectType: value,

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

  return (
    <section className="quote-estimator">
      <h2>⚙️ Un outil métier en démonstration</h2>

      {step === 1 && (
        <p className="border-text bis-text" >
          <strong style={{textAlign: "center"}}>Ce que cette démonstration met en œuvre</strong>
          Parcourez les 5 étapes pour voir le fonctionnement : <br /> <br />
          1️⃣ Un moteur de calcul multi-critères : chaque option recombine le résultat en direct<br />
          2️⃣ Un formulaire en 5 étapes à état persistant : les choix sont conservés d'une étape à l'autre <br />
          3️⃣ Un parcours conditionnel : les étapes proposées s'adaptent au type de projet sélectionné <br />
          4️⃣ Un récapitulatif construit depuis une source unique, partagée par l'écran et le document <br />
          5️⃣ Une génération de PDF côté client, sans appel serveur 🚀 <br />
          <br />
          <span> Une question sur son fonctionnement ?
            <a href="/contact/" aria-label="Contacter Sandra Pautonnier">
              💬 Contactez-moi
            </a></span>
        </p>
      )}

      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <div className="quote-step-indicator">
          Étape {stepLabel}/{totalSteps}
        </div>
      </div>

      {step === 1 && (
        <Step1ProjectType
          state={state}
          setState={setState}
          showProjectType={showProjectType}
          setShowProjectType={setShowProjectType}
          projectTypeRef={projectTypeRef}
          onProjectTypeChange={onProjectTypeChange}
        />
      )}

      {step === 2 && !isAudit && (
        <Step2Options
          state={state}
          setState={setState}
          isEcom={isEcom}
          estimateLinesForUI={estimateLinesForUI}
          estimateTotal={estimateTotal}
        />
      )}

      {step === 3 && !isAudit && (
        <Step3Hosting
          state={state}
          setState={setState}
          isEcom={isEcom}
          estimateLinesForUI={estimateLinesForUI}
          estimateTotal={estimateTotal}
          maintenanceAvailable={maintenanceAvailable}
          maintenanceMonthly={maintenanceMonthly}
        />
      )}

      {step === 4 && !isAudit && (
        <Step4Partners
          state={state}
          setState={setState}
          isEcom={isEcom}
          estimateLinesForUI={estimateLinesForUI}
          estimateTotal={estimateTotal}
        />
      )}

      {step === 5 && (
        <Step5Result
          estimateTotal={estimateTotal}
          summary={summary}
          detailsOpen={detailsOpen}
          setDetailsOpen={setDetailsOpen}
          onDownloadPdf={() => exportSummaryToPdf(summary)}
        />
      )}

      <hr />

      <div>
        {step > 1 && (
          <button type="button" onClick={prev} aria-label="Retourner à l'étape précédente">
            <FontAwesomeIcon icon={faArrowLeft} /> Retour
          </button>
        )}

        {step < 5 && (
          <button type="button" onClick={next} aria-label="Passer à l'étape suivante">
            Suivant <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}

        {step === 5 && (
          <button type="button" onClick={restart} aria-label="Recommencer le formulaire">
            <FontAwesomeIcon icon={faRotateRight} /> Recommencer
          </button>
        )}
      </div>
    </section>
  );
}
