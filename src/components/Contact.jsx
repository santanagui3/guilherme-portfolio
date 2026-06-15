import ScrollReveal from './ScrollReveal';

// SVG Icons
const Icons = {
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
};

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
                    <span className="contact-link-icon">{Icons.email}</span>
                    <div className="contact-link-text">
                      <span className="contact-link-label">E-mail</span>
                      <span className="contact-link-value">{email}</span>
                    </div>
                  </a>
                )}

                {phone && (
                  <a href={`https://wa.me/${phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="contact-link">
                    <span className="contact-link-icon">{Icons.whatsapp}</span>
                    <div className="contact-link-text">
                      <span className="contact-link-label">WhatsApp</span>
                      <span className="contact-link-value">{phone}</span>
                    </div>
                  </a>
                )}

                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="contact-link">
                    <span className="contact-link-icon">{Icons.instagram}</span>
                    <div className="contact-link-text">
                      <span className="contact-link-label">Instagram</span>
                      <span className="contact-link-value">@{instagram.split('/').filter(Boolean).pop()}</span>
                    </div>
                  </a>
                )}

                {youtube && (
                  <a href={youtube} target="_blank" rel="noopener noreferrer" className="contact-link">
                    <span className="contact-link-icon">{Icons.youtube}</span>
                    <div className="contact-link-text">
                      <span className="contact-link-label">YouTube</span>
                      <span className="contact-link-value">Meu Canal</span>
                    </div>
                  </a>
                )}

                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
                    <span className="contact-link-icon">{Icons.linkedin}</span>
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
