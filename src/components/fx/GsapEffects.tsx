"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Port of `initGSAPAnimations()` from js/animations.js.
 *
 * Wrapped in `gsap.context()` so every tween, ScrollTrigger and DOM mutation is
 * reverted on cleanup — required because App Router keeps this component mounted
 * across client-side navigations.
 */
export default function GsapEffects() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Text Reveal
      const heroLines = gsap.utils.toArray<HTMLElement>(".hero-title .line span");
      if (heroLines.length) {
        const heroTl = gsap.timeline({ delay: 0.5 });
        heroTl
          .to(heroLines, {
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
          })
          .to(
            ".hero-desc",
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.4",
          )
          .to(
            ".hero-actions",
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.4",
          );
      }

      // Parallax Effects
      document.querySelectorAll<HTMLElement>(".parallax-image").forEach((img) => {
        const wrapper = img.closest<HTMLElement>(".parallax-wrapper");
        if (!wrapper) return;
        gsap.to(img, {
          y: () => (img.offsetHeight - wrapper.offsetHeight) * 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Hero Parallax
      const heroBg = document.querySelector<HTMLElement>(".hero-bg, .page-hero-bg");
      if (heroBg) {
        gsap.to(heroBg, {
          y: "30%",
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: heroBg.parentElement ?? undefined,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Section Fade Ups with Stagger
      document.querySelectorAll<HTMLElement>(".service-card").forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Artist Cards Stagger
      document.querySelectorAll<HTMLElement>(".artist-card").forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Featured Artist - portrait slides in from the left, copy from the right
      document.querySelectorAll<HTMLElement>(".artist-feature-media").forEach((media) => {
        gsap.from(media, {
          x: -70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: media,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      document.querySelectorAll<HTMLElement>(".artist-feature-body").forEach((body) => {
        gsap.from(body, {
          x: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: body,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Portfolio Items Stagger
      document
        .querySelectorAll<HTMLElement>(".portfolio-item, .portfolio-page-item")
        .forEach((item, i) => {
          gsap.from(item, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });

      // Stats Counter Animation
      document.querySelectorAll<HTMLElement>(".counter-animate").forEach((counter) => {
        gsap.from(counter, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Horizontal Scroll Gallery
      const horizontalTrack = document.querySelector<HTMLElement>(
        ".horizontal-scroll-track",
      );
      if (horizontalTrack) {
        const items = horizontalTrack.querySelectorAll<HTMLElement>(
          ".horizontal-scroll-item",
        );

        gsap.to(horizontalTrack, {
          x: () => -(horizontalTrack.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".horizontal-scroll",
            start: "top top",
            end: () => "+=" + (horizontalTrack.scrollWidth - window.innerWidth),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Parallax inside horizontal items
        items.forEach((item) => {
          const img = item.querySelector<HTMLImageElement>("img");
          if (img) {
            gsap.to(img, {
              x: () =>
                img.naturalWidth ? -(img.naturalWidth - item.offsetWidth) * 0.2 : -100,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            });
          }
        });
      }

      // Mission Cards Stagger
      document.querySelectorAll<HTMLElement>(".mission-card").forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Certificate Items Stagger
      document.querySelectorAll<HTMLElement>(".cert-item").forEach((item, i) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Service Blocks (Alternating) on Services Page
      document.querySelectorAll<HTMLElement>(".service-block").forEach((block, i) => {
        const image = block.querySelector<HTMLElement>(".service-block-image");
        const content = block.querySelector<HTMLElement>(".service-block-content");

        if (image) {
          gsap.from(image, {
            x: i % 2 === 0 ? -80 : 80,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }

        if (content) {
          gsap.from(content, {
            x: i % 2 === 0 ? 80 : -80,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      // Pricing Cards Stagger
      document.querySelectorAll<HTMLElement>(".pricing-card").forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Contact Info Cards
      document.querySelectorAll<HTMLElement>(".contact-info-card").forEach((card, i) => {
        gsap.from(card, {
          x: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Compare Items
      document.querySelectorAll<HTMLElement>(".compare-item").forEach((item, i) => {
        gsap.from(item, {
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Studio Gallery Images Stagger
      document.querySelectorAll<HTMLImageElement>(".studio-gallery img").forEach((img, i) => {
        gsap.from(img, {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img.closest(".studio-gallery") ?? undefined,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Piercing Catalogue Cards — stagger repeats per row via modulo
      document.querySelectorAll<HTMLElement>(".piercing-card").forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          delay: (i % 3) * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Piercing Detail Rows — alternate slide-in
      document.querySelectorAll<HTMLElement>(".piercing-detail").forEach((row, i) => {
        gsap.from(row, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // CTA Section Parallax
      const ctaBg = document.querySelector<HTMLElement>(".cta-bg");
      if (ctaBg) {
        gsap.to(ctaBg, {
          y: "20%",
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: ctaBg.parentElement ?? undefined,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    // App Router never fires a full `load` on client navigation, so positions
    // have to be recomputed whenever the route swaps.
    ScrollTrigger.refresh();

    // Gallery rows carry no intrinsic height until their hot-linked images land,
    // so every pin and scrub above measures stale positions once they resize the
    // document. Recompute once the last one settles.
    const pendingImages = Array.from(document.images).filter((img) => !img.complete);
    if (pendingImages.length > 0) {
      let remaining = pendingImages.length;
      const onImageSettled = () => {
        remaining -= 1;
        if (remaining === 0) ScrollTrigger.refresh();
      };
      pendingImages.forEach((img) => {
        img.addEventListener("load", onImageSettled, { once: true });
        img.addEventListener("error", onImageSettled, { once: true });
      });
    }

    return () => {
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
