export default function Footer({ siteConfig }) {
  const contact = siteConfig?.contact || {};

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-accent">G</span>uilherme
          </div>
          <p className="footer-text">
            © {new Date().getFullYear()} Guilherme. Todos os direitos
            reservados.
          </p>
          <div className="footer-socials">
            {contact.youtube && (
              <a
                href={contact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="YouTube"
              >
                ▶
              </a>
            )}
            {contact.instagram && (
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="Instagram"
              >
                📷
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="LinkedIn"
              >
                💼
              </a>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="footer-social"
                aria-label="E-mail"
              >
                📧
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
