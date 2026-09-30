import { inr, type Piercing } from "@/lib/services";

/**
 * The long-form half of the catalogue: every piercing with its full description,
 * healing window and jewellery options, anchored by slug so the card grid's
 * "Details" links scroll straight to the relevant row.
 */
export default function PiercingDetailList({ items }: { items: Piercing[] }) {
  return (
    <div className="piercing-details">
      {items.map((piercing) => (
        <div className="piercing-detail" id={piercing.slug} key={piercing.slug}>
          <div className="piercing-detail-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={piercing.image} alt={piercing.imageAlt} />
          </div>

          <div>
            <h3 className="piercing-detail-name">{piercing.name}</h3>
            <div className="piercing-detail-price">
              {inr(piercing.price)}
              <small>Includes jewellery</small>
            </div>

            <p className="piercing-detail-text">{piercing.detail}</p>

            <div className="piercing-detail-specs">
              <span className="piercing-detail-spec">
                <i className="fas fa-clock" />
                Heals in {piercing.healing}
              </span>
              <span className="piercing-detail-spec">
                <i className="fas fa-gem" />
                {piercing.jewelry}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
