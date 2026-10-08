"use client";

import { useRef, useState } from "react";
import { SOCIAL_LINKS } from "@/lib/site";

const STYLES = [
  ["permanent-tattoo", "Permanent Tattoo"],
  ["cover-ups", "Cover-Ups"],
  ["standard-earlobe-piercing", "Standard Earlobe Piercing"],
  ["tragus-piercing", "Tragus Piercing"],
  ["conch-piercing", "Conch Piercing"],
  ["daith-piercing", "Daith Piercing"],
  ["flat-piercing", "Flat Piercing"],
  ["industrial-piercing", "Industrial Piercing"],
  ["dimple-piercing", "Dimple Piercing"],
  ["nose-piercing", "Nose Piercing"],
  ["septum-piercing", "Septum Piercing"],
  ["eyebrow-piercing", "Eyebrow Piercing"],
  ["labret-piercing", "Labret Piercing"],
  ["smiley-piercing", "Smiley Piercing"],
  ["web-piercing", "Web Piercing"],
  ["belly-piercing", "Belly Piercing"],
  ["dermal-piercing", "Dermal Piercing"],
  ["tongue-piercing", "Tongue Piercing"],
  ["sternum-piercing", "Sternum Piercing"],
] as const;

const INFO_CARDS = [
  {
    icon: "fa-map-marker-alt",
    title: "Studio Address",
    body: (
      <>
        Inkspiration Studio & KN Fitness, Opp. Mandir & Gurudwara Ground, Premnagar, Dehradun
      </>
    ),
  },
  {
    icon: "fa-phone",
    title: "Phone",
    body: (
      <>
        (213) 555-0189
        <br />
        Mon–Sat: 10am – 8pm
      </>
    ),
  },
  {
    icon: "fa-envelope",
    title: "Email",
    body: (
      <>
        karanbakshi2208@gmail.com
        <br />
        We reply within 24 hours
      </>
    ),
  },
  {
    icon: "fa-clock",
    title: "Opening Hours",
    body: (
      <>
        Monday – Saturday: 10:00 – 20:00
        <br />
        Sunday: By appointment only
      </>
    ),
  },
] as const;

const MAP_QUERY = "https://www.google.com/maps?q=30.333831,77.961242";
const MAP_EMBED = `${MAP_QUERY}&output=embed`;

/** Port of the contact section on contact.html plus the `ContactForm` class. */
export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const [label, setLabel] = useState("Send Message");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;

    const form = formRef.current;
    const btn = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
    setPending(true);
    setLabel("Sending...");

    if (btn) btn.disabled = true;

    window.setTimeout(() => {
      setLabel("Message Sent!");
      if (btn) {
        btn.style.background = "#22c55e";
        btn.style.borderColor = "#22c55e";
      }
      form?.reset();

      window.setTimeout(() => {
        setLabel("Send Message");
        if (btn) {
          btn.style.background = "";
          btn.style.borderColor = "";
          btn.disabled = false;
        }
        setPending(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="reveal">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">
            Book Your <span className="gradient-text">Consultation</span>
          </h2>
          <p className="section-subtitle">
            Ready to bring your vision to life? Fill out the form below and our team will get
            back to you within 24 hours.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-form-wrapper reveal">
            <form className="contact-form" ref={formRef} onSubmit={onSubmit}>
              <div className="form-group">
                <input type="text" id="name" name="name" placeholder=" " required />
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="email" id="email" name="email" placeholder=" " required />
                  <label htmlFor="email">Email Address</label>
                </div>
                <div className="form-group">
                  <input type="tel" id="phone" name="phone" placeholder=" " required />
                  <label htmlFor="phone">Phone Number</label>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <select id="style" name="style" required defaultValue="">
                    <option value="" disabled />
                    {STYLES.map(([value, label]) => (
                      <option value={value} key={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="style">Style</label>
                </div>
                <div className="form-group">
                  <input type="number" id="budget" name="budget" placeholder=" " required min="0" />
                  <label htmlFor="budget">Budget (₹)</label>
                </div>
              </div>
              <div className="form-group">
                <input type="date" id="date" name="date" placeholder=" " />
                <label htmlFor="date">Preferred Date</label>
              </div>
              <div className="form-group">
                <textarea id="message" name="message" placeholder=" " rows={5} />
                <label htmlFor="message">Tell us about your idea</label>
              </div>
              <button
                type="submit"
                className="btn btn-primary magnetic-wrap"
                style={{ width: "100%" }}
                disabled={pending}
              >
                {label}
              </button>
            </form>
          </div>

          <div className="contact-info-wrapper">
            {INFO_CARDS.map((card) => (
              <div className="contact-info-card" key={card.title}>
                <div className="contact-info-icon">
                  <i className={`fas ${card.icon}`} />
                </div>
                <div className="contact-info-content">
                  <h4>{card.title}</h4>
                  <p>{card.body}</p>
                </div>
              </div>
            ))}
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <i className="fas fa-share-alt" />
              </div>
              <div className="contact-info-content">
                <h4>Follow Us</h4>
                <div className="footer-social" style={{ marginTop: 8 }}>
                  {SOCIAL_LINKS.map((social) => {
                    const href = 'href' in social ? (social as any).href : undefined;
                    return (
                      <a href={href || "#"} aria-label={social.label} key={social.label} target={href ? "_blank" : undefined} rel={href ? "noopener noreferrer" : undefined}>
                        <i className={social.icon} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="map-container reveal">
          <iframe
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Studio Location"
            style={{ pointerEvents: "none" }}
          />
          <a
            href={MAP_QUERY}
            target="_blank"
            rel="noopener"
            style={{ position: "absolute", inset: 0, zIndex: 2 }}
            aria-label="Open in Google Maps"
          />
        </div>
      </div>
    </section>
  );
}
