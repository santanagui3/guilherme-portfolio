import { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';

export default function AboutEditor({ config, onSave }) {
  const [form, setForm] = useState({
    text: '',
    text2: '',
    stats: [
      { number: '', label: '' },
      { number: '', label: '' },
      { number: '', label: '' },
    ],
    skills: [
      { icon: '', name: '' },
      { icon: '', name: '' },
      { icon: '', name: '' },
      { icon: '', name: '' },
      { icon: '', name: '' },
      { icon: '', name: '' },
    ],
    profileImage: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (config?.about) {
      setForm({
        text: config.about.text || '',
        text2: config.about.text2 || '',
        stats: config.about.stats || form.stats,
        skills: config.about.skills || form.skills,
        profileImage: config.about.profileImage || '',
      });
    }
  }, [config]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleStatChange = (index, field, value) => {
    setForm((prev) => {
      const stats = [...prev.stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, stats };
    });
    setSaved(false);
  };

  const handleSkillChange = (index, field, value) => {
    setForm((prev) => {
      const skills = [...prev.skills];
      skills[index] = { ...skills[index], [field]: value };
      return { ...prev, skills };
    });
    setSaved(false);
  };

  const handleImageSelect = (file) => {
    setImageFile(file);
    setSaved(false);
  };

  const compressImage = (file, maxWidth = 1600, quality = 0.75) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const dataToSave = { ...form };
      if (imageFile) {
        dataToSave.profileImage = await compressImage(imageFile);
      }
      // Filter out empty skills
      dataToSave.skills = dataToSave.skills.filter(s => s.name.trim());
      dataToSave.stats = dataToSave.stats.filter(s => s.number.trim());
      
      await onSave('about', dataToSave);
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
        <h2 className="admin-section-title">👤 Sobre Mim</h2>
        <p className="admin-section-desc">Edite sua bio, estatísticas e habilidades.</p>
      </div>

      <form className="admin-edit-form" onSubmit={handleSubmit}>
        {/* Profile Image */}
        <div className="form-group">
          <label>Foto de Perfil</label>
          <ImageUploader
            currentImage={form.profileImage}
            onImageSelect={handleImageSelect}
          />
        </div>

        {/* Bio Text */}
        <div className="form-group">
          <label htmlFor="about-text">Parágrafo 1 (aceita HTML: &lt;strong&gt;negrito&lt;/strong&gt;)</label>
          <textarea
            id="about-text"
            name="text"
            value={form.text}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="about-text2">Parágrafo 2</label>
          <textarea
            id="about-text2"
            name="text2"
            value={form.text2}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        {/* Stats */}
        <div className="form-group">
          <label>Estatísticas (número + label)</label>
          <div className="admin-stats-grid">
            {form.stats.map((stat, i) => (
              <div key={i} className="admin-stat-row">
                <input
                  type="text"
                  value={stat.number}
                  onChange={(e) => handleStatChange(i, 'number', e.target.value)}
                  placeholder="50+"
                  className="admin-stat-number"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatChange(i, 'label', e.target.value)}
                  placeholder="Projetos"
                  className="admin-stat-label"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="form-group">
          <label>Habilidades (emoji + nome)</label>
          <div className="admin-skills-grid">
            {form.skills.map((skill, i) => (
              <div key={i} className="admin-skill-row">
                <input
                  type="text"
                  value={skill.icon}
                  onChange={(e) => handleSkillChange(i, 'icon', e.target.value)}
                  placeholder="🎬"
                  className="admin-skill-icon"
                />
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleSkillChange(i, 'name', e.target.value)}
                  placeholder="Produção de Vídeo"
                  className="admin-skill-name"
                />
              </div>
            ))}
          </div>
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
