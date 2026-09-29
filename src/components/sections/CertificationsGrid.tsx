export type CertItem = {
  icon: string;
  title: string;
  desc: string;
};

/** Port of the `.certifications-grid` block on about.html. */
export default function CertificationsGrid({ items }: { items: CertItem[] }) {
  return (
    <div className="certifications-grid">
      {items.map((item) => (
        <div className="cert-item" key={item.title}>
          <div className="cert-icon">
            <i className={`fas ${item.icon}`} />
          </div>
          <h3 className="cert-title">{item.title}</h3>
          <p className="cert-desc">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
