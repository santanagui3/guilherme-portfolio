import { useEffect } from 'react';

export default function Lightbox({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="lightbox active" onClick={handleBackdropClick}>
      <button className="lightbox-close" aria-label="Fechar" onClick={onClose}>
        ✕
      </button>
      <div className="lightbox-content">
        {project.type === 'video' ? (
          <iframe
            src={project.src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={project.title}
          />
        ) : (
          <img src={project.src || project.thumbnailUrl} alt={project.title} />
        )}
      </div>
      <div className="lightbox-info">
        <h3 className="lightbox-title">{project.title}</h3>
        <span className="lightbox-category">{project.categoryLabel}</span>
      </div>
    </div>
  );
}
