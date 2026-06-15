import { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';

const CATEGORIES = [
  { value: 'video', label: 'Vídeo' },
  { value: 'foto', label: 'Fotografia' },
  { value: 'motion', label: 'Motion Graphics' },
  { value: 'edicao', label: 'Edição' },
];

const TYPES = [
  { value: 'image', label: '📷 Imagem / Fotografia' },
  { value: 'video', label: '🎬 Vídeo do YouTube' },
];

export default function ProjectForm({ project, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'video',
    categoryLabel: 'Vídeo',
    type: 'image',
    videoUrl: '',
    thumbnailUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        category: project.category || 'video',
        categoryLabel: project.categoryLabel || 'Vídeo',
        type: project.type || 'image',
        videoUrl: project.type === 'video' ? project.src : '',
        thumbnailUrl: project.thumbnailUrl || '',
      });
    }
  }, [project]);

  const extractYoutubeId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Auto-set categoryLabel when category changes
      if (name === 'category') {
        const cat = CATEGORIES.find((c) => c.value === value);
        updated.categoryLabel = cat ? cat.label : value;
      }
      // Auto-fetch YouTube thumbnail when URL is entered
      if (name === 'videoUrl' && value.trim()) {
        const videoId = extractYoutubeId(value);
        if (videoId) {
          updated.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
      }
      return updated;
    });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImageSelect = (file) => {
    setImageFile(file);
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Título é obrigatório';
    if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (formData.type === 'video' && !formData.videoUrl.trim()) {
      newErrors.videoUrl = 'URL do YouTube é obrigatória';
    }
    // Image is optional for videos (auto-uses YouTube thumbnail)
    if (formData.type === 'image' && !project && !imageFile && !formData.thumbnailUrl) {
      newErrors.image = 'Imagem é obrigatória';
    }
    return newErrors;
  };

  const parseYoutubeUrl = (url) => {
    // Convert various YouTube URL formats to embed format
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }
    // If already an embed URL or unrecognized, return as-is
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    setUploadProgress(0);

    try {
      const dataToSave = {
        ...formData,
        videoUrl: formData.type === 'video' ? parseYoutubeUrl(formData.videoUrl) : '',
      };
      await onSave(dataToSave, imageFile, (progress) => {
        setUploadProgress(Math.round(progress));
      });
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Erro ao salvar o projeto. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-form-page">
      <div className="admin-form-header">
        <button className="admin-back-btn" onClick={onCancel}>
          ← Voltar
        </button>
        <h2 className="admin-form-title">
          {project ? 'Editar Projeto' : 'Novo Projeto'}
        </h2>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          {/* Left column - Image */}
          <div className="admin-form-left">
            <label className="admin-form-label">
              {formData.type === 'video' ? 'Capa (automática do YouTube)' : 'Imagem de Capa'}
            </label>
            <ImageUploader
              currentImage={formData.thumbnailUrl}
              onImageSelect={handleImageSelect}
            />
            {formData.type === 'video' && formData.thumbnailUrl && formData.thumbnailUrl.includes('youtube') && (
              <span className="admin-form-hint">✅ Thumbnail do YouTube detectada automaticamente. Você pode trocar por uma imagem personalizada se quiser.</span>
            )}
            {errors.image && (
              <span className="admin-form-error">{errors.image}</span>
            )}

            {saving && uploadProgress > 0 && uploadProgress < 100 && (
              <div className="upload-progress">
                <div className="upload-progress-bar">
                  <div
                    className="upload-progress-fill"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <span className="upload-progress-text">
                  Enviando... {uploadProgress}%
                </span>
              </div>
            )}
          </div>

          {/* Right column - Fields */}
          <div className="admin-form-right">
            <div className="form-group">
              <label htmlFor="project-title">Título do Projeto</label>
              <input
                type="text"
                id="project-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Curta-Metragem: Luzes da Cidade"
                style={errors.title ? { borderColor: '#ef4444' } : undefined}
              />
              {errors.title && (
                <span className="admin-form-error">{errors.title}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="project-description">Descrição</label>
              <textarea
                id="project-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva o projeto, técnicas utilizadas, etc."
                rows="3"
                style={errors.description ? { borderColor: '#ef4444' } : undefined}
              ></textarea>
              {errors.description && (
                <span className="admin-form-error">{errors.description}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="project-category">Categoria</label>
                <select
                  id="project-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="project-type">Tipo de Mídia</label>
                <select
                  id="project-type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  {TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {formData.type === 'video' && (
              <div className="form-group">
                <label htmlFor="project-video-url">URL do YouTube</label>
                <input
                  type="url"
                  id="project-video-url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  style={errors.videoUrl ? { borderColor: '#ef4444' } : undefined}
                />
                {errors.videoUrl && (
                  <span className="admin-form-error">{errors.videoUrl}</span>
                )}
                <span className="admin-form-hint">
                  Cole o link do YouTube. Aceita formatos: youtube.com/watch?v=..., youtu.be/..., ou embed.
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="admin-form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={saving}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="login-spinner"></span>
                Salvando...
              </>
            ) : (
              <>
                {project ? 'Salvar Alterações' : 'Criar Projeto'}
                <span className="btn-icon">→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
