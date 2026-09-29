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
export default function ServiceCards({ services }: { services: ServiceCardData[] }) {
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
          subtitle="From intricate realism to bold traditional work, our artists master every style with precision and passion."
        />

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.title} data-bg={service.image}>
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
