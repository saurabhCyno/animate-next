import { PHONE_HREF } from "@/lib/site";
import Button from "@/components/ui/Button";

export type PricingPlan = {
  name: string;
  amount: string;
  features: string[];
  featured?: boolean;
};

/** Port of the `.pricing-grid` block. Checkmarks come from CSS, not markup. */
export default function PricingGrid({ plans }: { plans: PricingPlan[] }) {
  return (
    <div className="pricing-grid">
      {plans.map((plan) => (
        <div
          className={`pricing-card${plan.featured ? " featured" : ""}`}
          key={plan.name}
        >
          <h3 className="pricing-name">{plan.name}</h3>
          <div className="pricing-amount">
            {plan.amount}
            <span>/hr</span>
          </div>
          <ul className="pricing-features">
            {plan.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button href={PHONE_HREF} variant={plan.featured ? "gold" : "secondary"}>
            Call Now
          </Button>
        </div>
      ))}
    </div>
  );
}
