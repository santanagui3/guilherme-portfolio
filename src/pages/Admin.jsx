import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminLayout from '../admin/AdminLayout';
import ProjectList from '../admin/ProjectList';
import ProjectForm from '../admin/ProjectForm';
import { useProjects } from '../hooks/useProjects';

export default function Admin() {
  const { currentUser, loading: authLoading } = useAuth();
  const { projects, loading, addProject, updateProject, deleteProject } = useProjects();
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

  return (
    <AdminLayout>
      {showForm ? (
        <ProjectForm
          project={editingProject}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <ProjectList
          projects={projects}
          loading={loading}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </AdminLayout>
  );
}
