import type { CSSProperties } from "react";

export type StatData = {
  target: number;
  suffix: string;
  label: string;
};

/**
 * Port of the `.stats-grid` block. `counter-animate` sits on the grid itself in
 * the source, and each `.stat-number` carries the `data-target` that
 * CounterAnimation reads.
 */
export default function StatsGrid({
  stats,
  className = "",
  style,
}: {
  stats: StatData[];
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`stats-grid counter-animate ${className}`.trim()} style={style}>
      {stats.map((stat) => (
        <div className="stat-item" key={stat.label}>
          <div className="stat-number" data-target={stat.target} data-suffix={stat.suffix}>
            0{stat.suffix}
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
