"use client";

import { useEffect } from "react";
import { useLightbox } from "@/components/chrome/LightboxProvider";

export type GalleryImage = {
  src: string;
  alt: string;
};

/**
 * Port of the `.studio-gallery` block on about.html, plus the lightbox wiring
 * the source only ever gave `.portfolio-item` (js/main.js `Lightbox.init`).
 */
export default function StudioGallery({ images }: { images: GalleryImage[] }) {
  const { register, open } = useLightbox();

  useEffect(() => {
    register(images.map((image) => image.src));
  }, [images, register]);

  return (
    <div className="studio-gallery">
      {images.map((image, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          onClick={() => open(index)}
        />
      ))}
    </div>
  );
}
