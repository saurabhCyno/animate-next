export type FeaturedArtistData = {
  name: string;
  role: string;
  specialty: string;
  image: string;
  imageAlt: string;
  bio: string[];
  stats: { value: string; label: string }[];
  socials: (string | string[])[];
};

/**
 * Single-artist feature: portrait on the left, profile on the right.
 * Replaces the four-up `.artists-grid` on the homepage and /about.
 *
 * `reverse` swaps the sides and `compact` squares off the portrait, so a
 * stacked roster on /about alternates left/right without running too tall.
 */
export default function FeaturedArtist({
  artist,
  reverse = false,
  compact = false,
}: {
  artist: FeaturedArtistData;
  reverse?: boolean;
  compact?: boolean;
}) {
  const classes = [
    "artist-feature",
    reverse ? "artist-feature--reverse" : "",
    compact ? "artist-feature--compact" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="artist-feature-media">
        <div className="artist-feature-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={artist.image} alt={artist.imageAlt} />
        </div>
        <span className="artist-feature-badge">{artist.role}</span>
      </div>

      <div className="artist-feature-body">
        <span className="section-label">Master Artist</span>
        <h3 className="artist-feature-name">{artist.name}</h3>
        <p className="artist-feature-specialty">{artist.specialty}</p>

        {artist.bio.map((paragraph) => (
          <p className="artist-feature-bio" key={paragraph}>
            {paragraph}
          </p>
        ))}

        <div className="artist-feature-stats">
          {artist.stats.map((stat) => (
            <div className="artist-feature-stat" key={stat.label}>
              <span className="artist-feature-stat-value">{stat.value}</span>
              <span className="artist-feature-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="artist-feature-actions">
        <div className="artist-social artist-social--static">
          {artist.socials.map((social) => {
            const [icon, label, href] = Array.isArray(social)
              ? social.length === 3
                ? (social as [string, string, string])
                : (social as [string, string])
              : ([social, social]);
            return (
              <a href={href || "#"} aria-label={label} key={label} target={href ? "_blank" : undefined} rel={href ? "noopener noreferrer" : undefined}>
                <i className={`fab ${icon}`} />
              </a>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
}
