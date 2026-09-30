import Link from "next/link";
import { QUICK_LINKS, SERVICE_LINKS, SOCIAL_LINKS, STUDIO } from "@/lib/site";
import FooterTagline from "./FooterTagline";

export function SocialLinks() {
  return (
    <div className="footer-social">
      {SOCIAL_LINKS.map((social) => (
        <a key={social.label} href="#" aria-label={social.label}>
          <i className={social.icon} />
        </a>
      ))}
    </div>
  );
}

/** Shared footer — byte-for-byte equivalent to the markup on every page. */
export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Inkspiration</div>
            <FooterTagline />
            <SocialLinks />
          </div>

          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              {QUICK_LINKS.map((link) => (
                <Link key={link.label} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Popular Services</h4>
            <div className="footer-links">
              {SERVICE_LINKS.map((link) => (
                <Link key={link.label} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Contact</h4>
            <div className="footer-contact-item">
              <i className="fas fa-map-marker-alt" />
              <span>
                {STUDIO.addressLines[0]}
                <br />
                {STUDIO.addressLines[1]}
              </span>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-phone" />
              <span>{STUDIO.phoneDisplay}</span>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-envelope" />
              <span>{STUDIO.email}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 Inkspiration. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
