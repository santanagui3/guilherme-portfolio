import { useState, useRef, useCallback } from 'react';

export default function ImageUploader({ currentImage, onImageSelect }) {
  const [preview, setPreview] = useState(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = useCallback((file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('Formato não suportado. Use JPG, PNG ou WebP.');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('Imagem muito grande. Máximo de 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
    onImageSelect(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    onImageSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div
      className={`image-uploader ${isDragging ? 'dragging' : ''} ${preview ? 'has-image' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />

      {preview ? (
        <div className="uploader-preview">
          <img src={preview} alt="Preview" />
          <div className="uploader-preview-overlay">
            <button className="uploader-change" onClick={handleClick}>
              📷 Trocar Imagem
            </button>
            <button className="uploader-remove" onClick={handleRemove}>
              ✕ Remover
            </button>
          </div>
        </div>
      ) : (
        <div className="uploader-empty">
          <div className="uploader-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="uploader-text">
            <strong>Arraste uma imagem</strong> ou clique para selecionar
          </p>
          <span className="uploader-hint">JPG, PNG ou WebP • Máximo 10MB</span>
        </div>
      )}
    </div>
  );
}
