"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Port of the `CompareSlider` class (js/main.js). The after-image wrapper is
 * sized in inline styles so the CSS `clip-path` reveal tracks the pointer.
 */
export default function CompareSection() {
  const imagesRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const afterImgRef = useRef<HTMLImageElement>(null);
  const [dragging, setDragging] = useState(false);

  const setPos = useCallback((clientX: number) => {
    const images = imagesRef.current;
    const wrap = wrapRef.current;
    const handle = handleRef.current;
    if (!images || !wrap || !handle) return;

    const rect = images.getBoundingClientRect();
    if (rect.width === 0) return;

    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    wrap.style.width = `${pos * 100}%`;
    handle.style.left = `${pos * 100}%`;
  }, []);

  useEffect(() => {
    const images = imagesRef.current;
    const afterImg = afterImgRef.current;
    if (!images || !afterImg) return;

    const syncImgWidth = () => {
      afterImg.style.width = `${images.offsetWidth}px`;
    };
    syncImgWidth();
    window.addEventListener("resize", syncImgWidth);
    return () => window.removeEventListener("resize", syncImgWidth);
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: MouseEvent) => setPos(e.clientX);
    const onUp = () => setDragging(false);
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches[0]) setPos(e.touches[0].clientX);
    };
    const onTouchEnd = () => setDragging(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [dragging, setPos]);

  return (
    <section className="section compare-section">
      <div className="container">
        <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="section-label">Transformations</span>
          <h2 className="section-title">
            Before & <span className="gradient-text">After</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Witness the transformative power of expert cover-up and restoration work.
          </p>
        </div>
        <div className="compare-container">
          <div className="img-compare">
            <div
              className="img-compare-images"
              ref={imagesRef}
              style={{ cursor: dragging ? "grabbing" : "ew-resize" }}
              onMouseDown={(e) => {
                setPos(e.clientX);
                setDragging(true);
              }}
              onTouchStart={(e) => {
                if (e.touches[0]) setPos(e.touches[0].clientX);
                setDragging(true);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img-compare-before"
                src="https://images.pexels.com/photos/37023010/pexels-photo-37023010.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Before Tattoo"
              />
              <div className="img-compare-after-wrap" ref={wrapRef}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="img-compare-after"
                  ref={afterImgRef}
                  src="https://images.pexels.com/photos/19548529/pexels-photo-19548529.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="After Tattoo"
                />
              </div>
              <div className="img-compare-handle" ref={handleRef}>
                <span className="img-compare-arrow left">‹</span>
                <span className="img-compare-arrow right">›</span>
              </div>
            </div>
            <span className="compare-label before-label">Before</span>
            <span className="compare-label after-label">After</span>
          </div>
        </div>
      </div>
    </section>
  );
}
