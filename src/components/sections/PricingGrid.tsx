import { PHONE_HREF } from "@/lib/site";
import Button from "@/components/ui/Button";

export type PricingPlan = {
  name: string;
  amount: string;
  features: string[];
  featured?: boolean;
  /** Suffix shown after the amount. Defaults to `/hr`. */
  unit?: string;
  /** Optional line under the plan name, e.g. a size bracket. */
  size?: string;
};

/** Port of the `.pricing-grid` block. Checkmarks come from CSS, not markup. */
export default function PricingGrid({
  plans,
  className,
}: {
  plans: PricingPlan[];
  className?: string;
}) {
  return (
    <div className={`pricing-grid${className ? ` ${className}` : ""}`}>
      {plans.map((plan) => (
        <div
          className={`pricing-card${plan.featured ? " featured" : ""}`}
          key={plan.name}
        >
          <h3 className="pricing-name">{plan.name}</h3>
          {plan.size ? <p className="pricing-size">{plan.size}</p> : null}
          <div className="pricing-amount">
            {plan.amount}
            <span>{plan.unit ?? "/hr"}</span>
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
