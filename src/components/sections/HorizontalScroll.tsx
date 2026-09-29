export type HorizontalItem = {
  image: string;
  title: string;
  text: string;
};

/** Port of the `.horizontal-scroll` block on our-work.html. */
export default function HorizontalScroll({ items }: { items: HorizontalItem[] }) {
  return (
    <section className="horizontal-scroll">
      <div className="horizontal-scroll-track">
        {items.map((item) => (
          <div className="horizontal-scroll-item" key={item.title}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt="Tattoo Gallery" />
            <div className="content">
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
