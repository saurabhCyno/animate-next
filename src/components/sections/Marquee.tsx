const MARQUEE_ITEMS = [
  "Custom Tattoos",
  "Realism",
  "Black & Grey",
  "Japanese",
  "Fine Line",
  "Cover-Ups",
  "Piercings",
];

/**
 * Port of the `<section class="marquee">` block. The item list is duplicated
 * exactly as in the source so the `translateX(-50%)` loop stays seamless.
 */
export default function Marquee() {
  return (
    <section className="marquee">
      <div className="marquee-track">
        {MARQUEE_ITEMS.map((item) => (
          <span className="marquee-item" key={item}>
            {item}
          </span>
        ))}
        {MARQUEE_ITEMS.map((item) => (
          <span className="marquee-item" key={`${item}-dup`}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
