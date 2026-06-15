import ScrollReveal from './ScrollReveal';

export default function Contact({ siteConfig }) {
  const contact = siteConfig?.contact || {};

  const email = contact.email || 'contato@guilherme.com';
  const phone = contact.phone || '';
  const instagram = contact.instagram || '';
  const youtube = contact.youtube || '';
  const linkedin = contact.linkedin || '';
  const description = contact.description || 'Tem um projeto em mente? Vamos conversar! Estou disponível para freelance, colaborações e projetos criativos.';

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          <ScrollReveal>
            <div className="contact-info">
              <div className="section-label">Entre em Contato</div>
              <h2 className="section-title">Vamos Criar Algo Incrível</h2>
              <p className="contact-description">{description}</p>

              <div className="contact-links">
                {email && (
                  <a href={`mailto:${email}`} className="contact-link">
                    <span className="contact-link-icon">📧</span>
                    <div className="contact-link-text">
                      <span className="contact-link-label">E-mail</span>
                      <span className="contact-link-value">{email}</span>
                    </div>
                  </a>
                )}

                {phone && (
                  <a href={`https://wa.me/${phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="contact-link">
                    <span className="contact-link-icon">📱</span>
                    <div className="contact-link-text">
                      <span className="contact-link-label">WhatsApp</span>
                      <span className="contact-link-value">{phone}</span>
                    </div>
                  </a>
                )}

                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="contact-link">
                    <span className="contact-link-icon">📸</span>
                    <div className="contact-link-text">
                      <span className="contact-link-label">Instagram</span>
                      <span className="contact-link-value">@{instagram.split('/').filter(Boolean).pop()}</span>
                    </div>
                  </a>
                )}

                {youtube && (
                  <a href={youtube} target="_blank" rel="noopener noreferrer" className="contact-link">
                    <span className="contact-link-icon">🎬</span>
                    <div className="contact-link-text">
                      <span className="contact-link-label">YouTube</span>
                      <span className="contact-link-value">Meu Canal</span>
                    </div>
                  </a>
                )}

                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
                    <span className="contact-link-icon">💼</span>
                    <div className="contact-link-text">
                      <span className="contact-link-label">LinkedIn</span>
                      <span className="contact-link-value">Perfil Profissional</span>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Mensagem enviada! (Funcionalidade a implementar)'); }}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Nome</label>
                    <input type="text" id="contact-name" placeholder="Seu nome" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email-input">E-mail</label>
                    <input type="email" id="contact-email-input" placeholder="seu@email.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="contact-subject">Assunto</label>
                  <input type="text" id="contact-subject" placeholder="Sobre o que quer falar?" />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Mensagem</label>
                  <textarea id="contact-message" placeholder="Conte sobre seu projeto..." rows="5" required></textarea>
                </div>
                <div className="form-submit">
                  <button type="submit" className="btn btn-primary">
                    Enviar Mensagem
                    <span className="btn-icon">→</span>
                  </button>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
