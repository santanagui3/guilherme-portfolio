import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminLayout from '../admin/AdminLayout';
import ProjectList from '../admin/ProjectList';
import ProjectForm from '../admin/ProjectForm';
import HeroEditor from '../admin/HeroEditor';
import AboutEditor from '../admin/AboutEditor';
import ContactEditor from '../admin/ContactEditor';
import { useProjects } from '../hooks/useProjects';
import { useSiteConfig } from '../hooks/useSiteConfig';

const TABS = [
  { key: 'projects', label: '🎬 Projetos', icon: '🎬' },
  { key: 'hero', label: '🏠 Início', icon: '🏠' },
  { key: 'about', label: '👤 Sobre', icon: '👤' },
  { key: 'contact', label: '📬 Contato', icon: '📬' },
];

export default function Admin() {
  const { currentUser, loading: authLoading } = useAuth();
  const { projects, loading, addProject, updateProject, deleteProject } = useProjects();
  const { config, updateSection } = useSiteConfig();
  const [activeTab, setActiveTab] = useState('projects');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  if (authLoading) {
    return (
      <div className="admin-loading-page">
        <div className="login-spinner large"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const handleAdd = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (project) => {
    if (window.confirm(`Tem certeza que deseja excluir "${project.title}"?`)) {
      await deleteProject(project.id);
    }
  };

  const handleSave = async (projectData, imageFile, onProgress) => {
    if (editingProject) {
      await updateProject(editingProject.id, projectData, imageFile, onProgress);
    } else {
      await addProject(projectData, imageFile, onProgress);
    }
    setShowForm(false);
    setEditingProject(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const renderContent = () => {
    if (activeTab === 'projects') {
      if (showForm) {
        return (
          <ProjectForm
            project={editingProject}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );
      }
      return (
        <ProjectList
          projects={projects}
          loading={loading}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      );
    }

    if (activeTab === 'hero') {
      return <HeroEditor config={config} onSave={updateSection} />;
    }

    if (activeTab === 'about') {
      return <AboutEditor config={config} onSave={updateSection} />;
    }

    if (activeTab === 'contact') {
      return <ContactEditor config={config} onSave={updateSection} />;
    }
  };

  return (
    <AdminLayout>
      {/* Tabs */}
      <div className="admin-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`admin-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab.key);
              setShowForm(false);
              setEditingProject(null);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderContent()}
    </AdminLayout>
  );
}
