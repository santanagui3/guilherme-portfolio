import { useState, useEffect } from 'react';

export default function ContactEditor({ config, onSave }) {
  const [form, setForm] = useState({
    description: '',
    email: '',
    phone: '',
    instagram: '',
    youtube: '',
    linkedin: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (config?.contact) {
      setForm({
        description: config.contact.description || '',
        email: config.contact.email || '',
        phone: config.contact.phone || '',
        instagram: config.contact.instagram || '',
        youtube: config.contact.youtube || '',
        linkedin: config.contact.linkedin || '',
      });
    }
  }, [config]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave('contact', form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Erro ao salvar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-section-editor">
      <div className="admin-section-header">
        <h2 className="admin-section-title">📬 Contato</h2>
        <p className="admin-section-desc">Edite suas informações de contato e redes sociais.</p>
      </div>

      <form className="admin-edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contact-description">Descrição da seção</label>
          <textarea
            id="contact-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            placeholder="Tem um projeto em mente? Vamos conversar!"
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="contact-email">📧 E-mail</label>
            <input
              type="email"
              id="contact-email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="contato@email.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-phone">📱 WhatsApp / Telefone</label>
            <input
              type="text"
              id="contact-phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="contact-instagram">📸 Instagram (URL)</label>
            <input
              type="url"
              id="contact-instagram"
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/seu_perfil"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-youtube">🎬 YouTube (URL)</label>
            <input
              type="url"
              id="contact-youtube"
              name="youtube"
              value={form.youtube}
              onChange={handleChange}
              placeholder="https://youtube.com/@seu_canal"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="contact-linkedin">💼 LinkedIn (URL)</label>
          <input
            type="url"
            id="contact-linkedin"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/seu_perfil"
          />
        </div>

        <div className="admin-save-bar">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? (
              <><span className="login-spinner"></span> Salvando...</>
            ) : saved ? (
              '✓ Salvo!'
            ) : (
              'Salvar Alterações'
            )}
          </button>
          {saved && <span className="admin-save-msg">Alterações salvas com sucesso!</span>}
        </div>
      </form>
    </div>
  );
}
