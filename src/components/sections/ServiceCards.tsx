import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

export type ServiceCardData = {
  icon: string;
  title: string;
  desc: string;
  href: string;
  image: string;
};

/** Port of the `.services-grid` block from index.html. */
export default function ServiceCards({
  services,
  gridClassName = "",
}: {
  services: ServiceCardData[];
  /** Extra classes on `.services-grid`, e.g. `services-grid--two`. */
  gridClassName?: string;
}) {
  return (
    <section className="section" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <SectionHeading
          className="reveal"
          label="What We Do"
          title={
            <>
              Premium <span className="gradient-text">Services</span>
            </>
          }
          subtitle="Two disciplines, one standard. Permanent tattoo and professional piercing, delivered with precision and care."
        />

        <div className={`services-grid ${gridClassName}`.trim()}>
          {services.map((service, i) => (
            <div className="service-card" key={service.title} data-bg={service.image}>
              <span className="service-card-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="service-card-icon">
                <i className={`fas ${service.icon}`} />
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.desc}</p>
              <Link href={service.href} className="service-card-link">
                Learn More <span className="arrow">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
