const MARQUEE_ITEMS = [
  "Permanent Tattoo",
  "Cover-Ups",
  "Standard Earlobe Piercing",
  "Tragus Piercing",
  "Conch Piercing",
  "Daith Piercing",
  "Flat Piercing",
  "Industrial Piercing",
  "Dimple Piercing",
  "Nose Piercing",
  "Septum Piercing",
  "Eyebrow Piercing",
  "Labret Piercing",
  "Smiley Piercing",
  "Web Piercing",
  "Belly Piercing",
  "Dermal Piercing",
  "Tongue Piercing",
  "Sternum Piercing",
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
