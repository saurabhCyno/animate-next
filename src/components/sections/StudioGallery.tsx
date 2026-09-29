export type GalleryImage = {
  src: string;
  alt: string;
};

/** Port of the `.studio-gallery` block on about.html. */
export default function StudioGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="studio-gallery">
      {images.map((image) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={image.src} src={image.src} alt={image.alt} />
      ))}
    </div>
  );
}
