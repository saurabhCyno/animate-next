import Button from "@/components/ui/Button";
import type { ButtonVariant } from "@/components/ui/Button";

export type ServiceBlockData = {
  number: string;
  title: string;
  desc: string;
  benefits: string[];
  price: string;
  ctaLabel: string;
  ctaHref: string;
  ctaVariant?: ButtonVariant;
  image: string;
  imageAlt: string;
  /** `true` renders content-then-image, matching the source's even blocks. */
  reversed?: boolean;
};

function BlockImage({ block }: { block: ServiceBlockData }) {
  return (
    <div className="service-block-image parallax-wrapper">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={block.image} alt={block.imageAlt} className="parallax-image" />
    </div>
  );
}

function BlockContent({ block }: { block: ServiceBlockData }) {
  return (
    <div className="service-block-content">
      <div className="service-block-number">{block.number}</div>
      <h2 className="service-block-title">{block.title}</h2>
      <p className="service-block-desc">{block.desc}</p>
      <ul className="service-block-benefits">
        {block.benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>
      <div className="service-block-price">{block.price}</div>
      <Button href={block.ctaHref} variant={block.ctaVariant}>
        {block.ctaLabel}
      </Button>
    </div>
  );
}

/** Port of the `.service-block` list on services.html. */
export default function ServiceBlocks({ blocks }: { blocks: ServiceBlockData[] }) {
  return (
    <div className="container">
      {blocks.map((block) => (
        <div className="service-block" key={block.number}>
          {block.reversed ? (
            <>
              <BlockContent block={block} />
              <BlockImage block={block} />
            </>
          ) : (
            <>
              <BlockImage block={block} />
              <BlockContent block={block} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
