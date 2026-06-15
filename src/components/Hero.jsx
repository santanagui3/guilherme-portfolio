export default function Hero({ siteConfig }) {
  const hero = siteConfig?.hero || {};

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
    window.scrollTo({
      top: target.offsetTop - navbarHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="hero" id="hero">
      {/* Background Effects */}
      <div className="hero-bg"></div>
      <div className="hero-grain"></div>
      <div className="hero-lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          {hero.badge || 'Produtor Audiovisual'}
        </div>

        <h1 className="hero-title">
          <span className="title-line">{hero.titleLine1 || 'Criando'}</span>
          <span className="title-line">
            <span className="title-accent">{hero.titleLine2 || 'Histórias Visuais'}</span>
          </span>
        </h1>

        <p className="hero-description">
          {hero.description || 'Produção audiovisual profissional com foco em storytelling cinematográfico. Do conceito à entrega final, transformo ideias em experiências visuais memoráveis.'}
        </p>

        <div className="hero-actions">
          <a
            href="#portfolio"
            className="btn btn-primary"
            onClick={(e) => handleNavClick(e, 'portfolio')}
          >
            <span className="btn-icon">▶</span>
            Ver Portfólio
          </a>
          <a
            href="#contact"
            className="btn btn-secondary"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Fale Comigo
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
