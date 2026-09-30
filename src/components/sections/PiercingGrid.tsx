import Link from "next/link";
import { inr, type Piercing, type PiercingCategoryId } from "@/lib/services";

export type PiercingGroup = {
  id: PiercingCategoryId;
  label: string;
  blurb: string;
  items: Piercing[];
};

type PiercingGridProps = {
  groups: PiercingGroup[];
};

/**
 * The priced piercing catalogue, grouped by placement area.
 *
 * Server component — every price is in the prerendered HTML, so the list is
 * crawlable and readable without JavaScript. The reveal is driven by the
 * `.piercing-card` block in `GsapEffects`; hover motion is pure CSS.
 */
export default function PiercingGrid({ groups }: PiercingGridProps) {
  return (
    <div className="piercing-groups">
      {groups.map((group) => (
        <div className="piercing-group" key={group.id}>
          <div className="piercing-group-head reveal">
            <span className="section-label">{group.label}</span>
            <h3 className="piercing-group-title">
              {group.label} <span className="gradient-text">Piercings</span>
            </h3>
            <p className="piercing-group-blurb">{group.blurb}</p>
          </div>

          <div className="piercing-grid">
            {group.items.map((piercing) => (
              <article
                className={`piercing-card${piercing.featured ? " featured" : ""}`}
                key={piercing.slug}
              >
                <div className="piercing-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={piercing.image} alt={piercing.imageAlt} />
                  <span className="piercing-card-badge">
                    <i className={`fas ${piercing.icon}`} />
                  </span>
                </div>

                <div className="piercing-card-body">
                  <h4 className="piercing-card-name">{piercing.name}</h4>
                  <p className="piercing-card-desc">{piercing.desc}</p>

                  <div className="piercing-card-meta">
                    <span>
                      <i className="fas fa-clock" />
                      {piercing.healing}
                    </span>
                    <span>
                      <i className="fas fa-gem" />
                      Jewellery included
                    </span>
                  </div>
                </div>

                <div className="piercing-card-foot">
                  <div className="piercing-card-price">
                    {inr(piercing.price)}
                    <small>Incl. jewellery</small>
                  </div>
                  <Link href={`/services/piercing#${piercing.slug}`} className="piercing-card-cta">
                    Details <span className="arrow">→</span>
                  </Link>
                </div>

                <span className="piercing-card-sheen" />
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
