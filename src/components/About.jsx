import ScrollReveal from './ScrollReveal';

export default function About({ siteConfig }) {
  const about = siteConfig?.about || {};
  const base = import.meta.env.BASE_URL;

  const defaultStats = [
    { number: '50+', label: 'Projetos' },
    { number: '3+', label: 'Anos Exp.' },
    { number: '30+', label: 'Clientes' },
  ];

  const defaultSkills = [
    { icon: '🎬', name: 'Produção de Vídeo' },
    { icon: '📷', name: 'Fotografia' },
    { icon: '✨', name: 'Motion Graphics' },
    { icon: '🎨', name: 'Color Grading' },
    { icon: '🎵', name: 'Sound Design' },
    { icon: '✂️', name: 'Edição / Pós' },
  ];

  const stats = about.stats?.length > 0 ? about.stats : defaultStats;
  const skills = about.skills?.length > 0 ? about.skills : defaultSkills;
  const profileImage = about.profileImage || `${base}assets/images/profile.png`;

  const text1 = about.text || 'Sou um <strong>profissional audiovisual</strong> apaixonado por contar histórias através de imagens em movimento.';
  const text2 = about.text2 || 'Meu trabalho combina técnica apurada com <strong>visão criativa</strong>, utilizando as melhores ferramentas do mercado.';

  return (
    <section className="about" id="about">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-label">Quem Sou</div>
            <h2 className="section-title">Sobre Mim</h2>
          </div>
        </ScrollReveal>

        <div className="about-grid">
          <ScrollReveal>
            <div className="about-image-wrapper">
              <div className="about-image">
                <img
                  src={profileImage}
                  alt="Guilherme — Profissional audiovisual"
                />
              </div>
              <div className="about-image-accent"></div>
              <div className="about-stats">
                {stats.map((stat, i) => (
                  <div className="stat-card" key={i}>
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="about-content">
              <p className="about-text" dangerouslySetInnerHTML={{ __html: text1 }}></p>
              <p className="about-text" dangerouslySetInnerHTML={{ __html: text2 }}></p>

              <h3 className="skills-title">Especialidades</h3>
              <div className="skills-grid">
                {skills.map((skill, i) => (
                  <div className="skill-item" key={i}>
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>

              <a href="#contact" className="btn btn-primary">
                Vamos Conversar
                <span className="btn-icon">→</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
