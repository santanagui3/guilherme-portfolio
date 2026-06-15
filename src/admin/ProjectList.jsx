export default function ProjectList({ projects, loading, onAdd, onEdit, onDelete }) {
  return (
    <div className="admin-project-list">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Meus Projetos</h1>
          <p className="admin-subtitle">
            {projects.length} {projects.length === 1 ? 'projeto' : 'projetos'} no portfólio
          </p>
        </div>
        <button className="btn btn-primary" onClick={onAdd}>
          <span className="btn-icon">+</span>
          Novo Projeto
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">
          <div className="login-spinner large"></div>
          <p>Carregando projetos...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">📁</div>
          <h3>Nenhum projeto ainda</h3>
          <p>Comece adicionando seu primeiro projeto ao portfólio.</p>
          <button className="btn btn-primary" onClick={onAdd}>
            <span className="btn-icon">+</span>
            Adicionar Projeto
          </button>
        </div>
      ) : (
        <div className="admin-grid">
          {projects.map((project) => (
            <div key={project.id} className="admin-card">
              <div className="admin-card-image">
                {project.thumbnailUrl ? (
                  <img src={project.thumbnailUrl} alt={project.title} />
                ) : (
                  <div className="admin-card-placeholder">
                    {project.type === 'video' ? '🎬' : '📷'}
                  </div>
                )}
                <div className="admin-card-type">
                  {project.type === 'video' ? '🎬 Vídeo' : '📷 Imagem'}
                </div>
              </div>
              <div className="admin-card-body">
                <span className="admin-card-category">{project.categoryLabel}</span>
                <h3 className="admin-card-title">{project.title}</h3>
                <p className="admin-card-desc">{project.description}</p>
                <div className="admin-card-actions">
                  <button
                    className="admin-btn-edit"
                    onClick={() => onEdit(project)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="admin-btn-delete"
                    onClick={() => onDelete(project)}
                  >
                    🗑 Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
