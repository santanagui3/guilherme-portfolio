import { useState, useEffect } from 'react';
import { useProjects } from '../hooks/useProjects';
import PortfolioCard from './PortfolioCard';
import Lightbox from './Lightbox';
import ScrollReveal from './ScrollReveal';

const FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: 'video', label: 'Vídeo' },
  { key: 'foto', label: 'Fotografia' },
  { key: 'motion', label: 'Motion' },
  { key: 'edicao', label: 'Edição' },
];

// Default/fallback projects when Firebase is not configured
const base = import.meta.env.BASE_URL;
const DEFAULT_PROJECTS = [
  {
    id: 'default-1',
    title: 'Curta-Metragem: Luzes da Cidade',
    description: 'Produção e direção de curta-metragem sobre a vida noturna urbana. Filmado em 4K com color grading cinematográfico.',
    category: 'video',
    categoryLabel: 'Vídeo',
    type: 'video',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: `${base}assets/images/project_filmmaking.png`,
  },
  {
    id: 'default-2',
    title: 'Fotografia Aérea: Litoral',
    description: 'Ensaio fotográfico aéreo com drone capturando paisagens litorâneas ao pôr do sol.',
    category: 'foto',
    categoryLabel: 'Fotografia',
    type: 'image',
    src: `${base}assets/images/project_aerial.png`,
    thumbnailUrl: `${base}assets/images/project_aerial.png`,
  },
  {
    id: 'default-3',
    title: 'Motion Graphics: Abertura de Evento',
    description: 'Animação de abertura para evento corporativo com partículas e tipografia dinâmica em After Effects.',
    category: 'motion',
    categoryLabel: 'Motion Graphics',
    type: 'video',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: `${base}assets/images/project_motion.png`,
  },
  {
    id: 'default-4',
    title: 'Pós-Produção: Doc. Ambiental',
    description: 'Edição e color grading de documentário sobre preservação ambiental. Workflow completo em DaVinci Resolve.',
    category: 'edicao',
    categoryLabel: 'Edição',
    type: 'video',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: `${base}assets/images/project_editing.png`,
  },
  {
    id: 'default-5',
    title: 'Retrato Cinematográfico',
    description: 'Ensaio de retrato com iluminação dramática e estética cinematográfica. Luz natural e artificial combinadas.',
    category: 'foto',
    categoryLabel: 'Fotografia',
    type: 'image',
    src: `${base}assets/images/project_portrait.png`,
    thumbnailUrl: `${base}assets/images/project_portrait.png`,
  },
  {
    id: 'default-6',
    title: 'Documentário: Histórias Locais',
    description: 'Documentário autoral sobre histórias e tradições de comunidades locais. Direção, câmera e edição.',
    category: 'video',
    categoryLabel: 'Vídeo',
    type: 'video',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: `${base}assets/images/project_documentary.png`,
  },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxProject, setLightboxProject] = useState(null);
  const [animatingCards, setAnimatingCards] = useState({});
  const { projects: firebaseProjects, loading, error } = useProjects();

  // Use Firebase projects if available, otherwise fallback to defaults
  const projects = firebaseProjects.length > 0 ? firebaseProjects : DEFAULT_PROJECTS;

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const handleFilterChange = (filterKey) => {
    if (filterKey === activeFilter) return;

    // Animate out
    const hiding = {};
    filteredProjects.forEach((p) => {
      if (filterKey !== 'all' && p.category !== filterKey) {
        hiding[p.id] = 'hiding';
      }
    });
    setAnimatingCards(hiding);

    setTimeout(() => {
      setActiveFilter(filterKey);
      setAnimatingCards({});
    }, 300);
  };

  const openLightbox = (project) => {
    setLightboxProject(project);
  };

  const closeLightbox = () => {
    setLightboxProject(null);
  };

  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-label">Trabalhos Selecionados</div>
            <h2 className="section-title">Portfólio</h2>
            <p className="section-subtitle">
              Uma seleção dos meus melhores projetos em vídeo, fotografia, motion
              graphics e edição.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="filter-tabs">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`filter-tab ${activeFilter === f.key ? 'active' : ''}`}
                onClick={() => handleFilterChange(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="portfolio-grid">
          {loading && firebaseProjects.length === 0 && projects === DEFAULT_PROJECTS ? (
            <div className="portfolio-loading">Carregando projetos...</div>
          ) : (
            filteredProjects.map((project, index) => (
              <PortfolioCard
                key={project.id}
                project={project}
                index={index}
                onClick={openLightbox}
              />
            ))
          )}
        </div>
      </div>

      {lightboxProject && (
        <Lightbox project={lightboxProject} onClose={closeLightbox} />
      )}
    </section>
  );
}
