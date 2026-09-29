"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export type TestimonialData = {
  stars: string;
  text: string;
  name: string;
  title: string;
  avatar: string;
};

/** Port of the `.testimonials` swiper from index.html + `initSwipers()`. */
export default function TestimonialsSwiper({ items }: { items: TestimonialData[] }) {
  return (
    <section className="section testimonials">
      <div className="container">
        <div className="reveal" style={{ textAlign: "center" }}>
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">
            What Our Clients <span className="gradient-text">Say</span>
          </h2>
        </div>
        <div className="testimonials-wrapper">
          <Swiper
            className="testimonials-swiper"
            modules={[Autoplay, Navigation]}
            slidesPerView={1}
            spaceBetween={0}
            loop
            speed={800}
            grabCursor
            data-lenis-prevent
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
          >
            {items.map((item) => (
              <SwiperSlide className="testimonial-slide" key={item.name}>
                <div className="testimonial-stars">{item.stars}</div>
                <p className="testimonial-text">{item.text}</p>
                <div className="testimonial-author">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.avatar} alt="Client" />
                  <div className="testimonial-author-info">
                    <h4 className="testimonial-author-name">{item.name}</h4>
                    <p className="testimonial-author-title">{item.title}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-next" aria-label="Next testimonial" />
            <div className="swiper-button-prev" aria-label="Previous testimonial" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
