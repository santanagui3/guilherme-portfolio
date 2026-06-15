import { useState, useEffect } from 'react';

export default function HeroEditor({ config, onSave }) {
  const [form, setForm] = useState({
    badge: '',
    titleLine1: '',
    titleLine2: '',
    description: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (config?.hero) {
      setForm(config.hero);
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
      await onSave('hero', form);
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
        <h2 className="admin-section-title">🎬 Hero / Início</h2>
        <p className="admin-section-desc">Edite o texto principal que aparece na tela inicial do site.</p>
      </div>

      <form className="admin-edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="hero-badge">Badge (texto pequeno acima do título)</label>
          <input
            type="text"
            id="hero-badge"
            name="badge"
            value={form.badge}
            onChange={handleChange}
            placeholder="Ex: Produtor Audiovisual"
          />
        </div>

        <div className="form-group">
          <label htmlFor="hero-titleLine1">Título — Linha 1</label>
          <input
            type="text"
            id="hero-titleLine1"
            name="titleLine1"
            value={form.titleLine1}
            onChange={handleChange}
            placeholder="Ex: Criando"
          />
        </div>

        <div className="form-group">
          <label htmlFor="hero-titleLine2">Título — Linha 2 (em destaque dourado)</label>
          <input
            type="text"
            id="hero-titleLine2"
            name="titleLine2"
            value={form.titleLine2}
            onChange={handleChange}
            placeholder="Ex: Histórias Visuais"
          />
        </div>

        <div className="form-group">
          <label htmlFor="hero-description">Descrição</label>
          <textarea
            id="hero-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Descreva seu trabalho em 1-2 frases..."
          ></textarea>
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
