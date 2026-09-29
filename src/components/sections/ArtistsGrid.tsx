import type { CSSProperties } from "react";

export type ArtistData = {
  name: string;
  specialty: string;
  image: string;
  socials: [string, string][];
};

/** Port of the `.artists-grid` block (identical markup on home and about). */
export default function ArtistsGrid({
  artists,
  className = "",
  style,
}: {
  artists: ArtistData[];
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`artists-grid ${className}`.trim()} style={style}>
      {artists.map((artist) => (
        <div className="artist-card" key={artist.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={artist.image} alt={artist.name} />
          <div className="artist-card-overlay">
            <h3 className="artist-name">{artist.name}</h3>
            <p className="artist-specialty">{artist.specialty}</p>
            <div className="artist-social">
              {artist.socials.map(([icon, label]) => (
                <a href="#" aria-label={label} key={label}>
                  <i className={`fab ${icon}`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
