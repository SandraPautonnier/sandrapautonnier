import { PRICING } from "../pricing";
import TwoColumnsSummary from "../components/TwoColumnsSummary";
import RadioGroup from "../components/RadioGroup";

export default function Step4Partners({ state, setState, isEcom, estimateLinesForUI, estimateTotal }) {
  return (
    <div>
      <TwoColumnsSummary isEcom={isEcom} estimateLinesForUI={estimateLinesForUI} estimateTotal={estimateTotal} />
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
  );
}
