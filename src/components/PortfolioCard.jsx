export default function PortfolioCard({ project, index, onClick }) {
  const isVideo = project.type === 'video';

  return (
    <div
      className="portfolio-card reveal visible"
      data-category={project.category}
      data-type={project.type}
      onClick={() => onClick(project)}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="card-image">
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          loading="lazy"
        />
        <div className="card-overlay">
          <div className="card-play">
            {isVideo ? (
              <svg viewBox="0 0 24 24">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path
                  d="M12 2a10 10 0 100 20 10 10 0 000-20z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      <div className="card-content">
        <div className="card-category">
          <span className="card-category-dot"></span>
          {project.categoryLabel}
        </div>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-description">{project.description}</p>
      </div>
    </div>
  );
}
