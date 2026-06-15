import ScrollReveal from './ScrollReveal';

export default function About() {
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
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Image Side */}
          <ScrollReveal>
            <div className="about-image-wrapper">
              <div className="about-image">
                <img
                  src={`${import.meta.env.BASE_URL}assets/images/profile.png`}
                  alt="Guilherme — Profissional audiovisual"
                />
              </div>
              <div className="about-image-accent"></div>

              <div className="about-stats">
                <div className="stat-card">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Projetos</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Anos</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">30+</div>
                  <div className="stat-label">Clientes</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Content Side */}
          <ScrollReveal>
            <div className="about-content">
              <div className="section-label">Quem sou eu</div>
              <h2
                className="section-title"
                style={{ textAlign: 'left', marginBottom: 'var(--space-xl)' }}
              >
                Sobre Mim
              </h2>

              <p className="about-text">
                Olá! Sou <strong>Guilherme</strong>, profissional audiovisual
                apaixonado por contar histórias através de imagens e sons. Com
                experiência em{' '}
                <strong>
                  produção de vídeo, fotografia, motion graphics e pós-produção
                </strong>
                , transformo conceitos criativos em conteúdo visual impactante.
              </p>
              <p className="about-text">
                Trabalho desde a concepção criativa até a entrega final,
                garantindo qualidade cinematográfica em cada projeto. Minha
                abordagem combina técnica refinada com{' '}
                <strong>sensibilidade artística</strong>, sempre buscando a
                melhor forma de comunicar cada mensagem.
              </p>

              <h3 className="skills-title">🛠 Ferramentas & Habilidades</h3>
              <div className="skills-grid">
                {[
                  { icon: '🎬', name: 'Direção & Produção' },
                  { icon: '📷', name: 'Fotografia & Câmera' },
                  { icon: '🎨', name: 'After Effects & Motion' },
                  { icon: '✂️', name: 'Premiere & DaVinci' },
                  { icon: '🎵', name: 'Sound Design' },
                  { icon: '🚁', name: 'Filmagem com Drone' },
                ].map((skill) => (
                  <div className="skill-item" key={skill.name}>
                    <div className="skill-icon">{skill.icon}</div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="btn btn-primary"
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                Vamos trabalhar juntos
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
