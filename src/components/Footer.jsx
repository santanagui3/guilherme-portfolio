export default function Footer() {
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
            <a
              href="https://youtube.com/@guilherme"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="YouTube"
              id="footer-youtube"
            >
              ▶
            </a>
            <a
              href="https://instagram.com/guilherme"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="Instagram"
              id="footer-instagram"
            >
              📷
            </a>
            <a
              href="https://github.com/guilherme"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
              aria-label="GitHub"
              id="footer-github"
            >
              ⌨
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
