import { formatEUR } from "../calculations";

export default function RadioGroup({ name, title, value, onChange, choices }) {
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
