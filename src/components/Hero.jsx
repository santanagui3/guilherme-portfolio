export default function Hero() {
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
          Disponível para projetos
        </div>

        <h1 className="hero-title">
          <span className="title-line">Criando histórias</span>
          <span className="title-line">
            através do <span className="title-accent">audiovisual</span>
          </span>
        </h1>

        <p className="hero-description">
          Produzo vídeos, fotografias e motion graphics que transformam ideias em
          experiências visuais memoráveis. Do conceito à pós-produção.
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
