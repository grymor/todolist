import "./style.scss";


interface StatCardProps {
  label: string;
  value: number;
  hint?: string;       // необов'язковий підпис знизу, наприклад "12 completed"
}

export default function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="stat-card">
      <span className="stat-card__label">{label}</span>
      <strong className="stat-card__value">{value.toLocaleString()}</strong>
      {hint && <span className="stat-card__hint">{hint}</span>}
    </div>
  );
}