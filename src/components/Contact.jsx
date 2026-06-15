import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim() || !isValidEmail(formData.email))
      newErrors.email = true;
    if (!formData.message.trim()) newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Info Side */}
          <ScrollReveal>
            <div className="contact-info">
              <div className="section-label">Entre em contato</div>
              <h2 className="section-title">
                Vamos criar algo <br />
                incrível juntos?
              </h2>
              <p className="contact-description">
                Tem um projeto em mente? Estou disponível para novos trabalhos em
                vídeo, fotografia, motion graphics e pós-produção. Vamos
                conversar!
              </p>

              <div className="contact-links">
                <a
                  href="mailto:guilherme@email.com"
                  className="contact-link"
                  id="contact-email-link"
                >
                  <div className="contact-link-icon">📧</div>
                  <div className="contact-link-text">
                    <span className="contact-link-label">E-mail</span>
                    <span className="contact-link-value">
                      guilherme@email.com
                    </span>
                  </div>
                </a>
                <a
                  href="https://youtube.com/@guilherme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                  id="contact-youtube-link"
                >
                  <div className="contact-link-icon">▶️</div>
                  <div className="contact-link-text">
                    <span className="contact-link-label">YouTube</span>
                    <span className="contact-link-value">
                      youtube.com/@guilherme
                    </span>
                  </div>
                </a>
                <a
                  href="https://instagram.com/guilherme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                  id="contact-instagram-link"
                >
                  <div className="contact-link-icon">📸</div>
                  <div className="contact-link-text">
                    <span className="contact-link-label">Instagram</span>
                    <span className="contact-link-value">@guilherme</span>
                  </div>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Form Side */}
          <ScrollReveal>
            <div className="contact-form-wrapper">
              <form
                className="contact-form"
                id="contact-form"
                onSubmit={handleSubmit}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="form-name">Nome</label>
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={handleChange}
                      style={
                        errors.name ? { borderColor: '#ef4444' } : undefined
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-email">E-mail</label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={
                        errors.email ? { borderColor: '#ef4444' } : undefined
                      }
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="form-subject">Assunto</label>
                  <input
                    type="text"
                    id="form-subject"
                    name="subject"
                    placeholder="Sobre o que é o projeto?"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-message">Mensagem</label>
                  <textarea
                    id="form-message"
                    name="message"
                    placeholder="Conte-me sobre seu projeto, prazo e orçamento..."
                    value={formData.message}
                    onChange={handleChange}
                    style={
                      errors.message ? { borderColor: '#ef4444' } : undefined
                    }
                    required
                  ></textarea>
                </div>
                <div className="form-submit">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitted}
                    style={submitted ? { background: '#10b981' } : undefined}
                  >
                    {submitted ? '✓ Mensagem Enviada!' : 'Enviar Mensagem'}
                    {!submitted && <span className="btn-icon">→</span>}
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
