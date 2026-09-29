export type MissionItem = {
  icon: string;
  title: string;
  text: string;
};

/** Port of the `.mission-grid` block (about + custom-tattoos process steps). */
export default function MissionGrid({ items }: { items: MissionItem[] }) {
  return (
    <div className="mission-grid">
      {items.map((item) => (
        <div className="mission-card" key={item.title}>
          <div className="mission-icon">
            <i className={`fas ${item.icon}`} />
          </div>
          <h3 className="mission-title">{item.title}</h3>
          <p className="mission-text">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
