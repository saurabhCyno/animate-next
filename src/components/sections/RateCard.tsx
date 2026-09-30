type RateCardProps = {
  label: string;
  amount: string;
  unit: string;
  note: string;
};

/**
 * The headline rate panel — used for the flat per-inch permanent tattoo price.
 * `.rate-card::before` runs the sweep, so the whole card animates on its own.
 */
export default function RateCard({ label, amount, unit, note }: RateCardProps) {
  return (
    <div className="rate-card reveal">
      <span className="rate-card-label">{label}</span>
      <div className="rate-card-amount">{amount}</div>
      <div className="rate-card-unit">{unit}</div>
      <p className="rate-card-note">{note}</p>
    </div>
  );
}
