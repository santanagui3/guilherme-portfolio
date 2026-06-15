import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'projects';

/**
 * Compresses an image file client-side and returns a base64 data URL.
 * Resizes to max 1200px width and uses JPEG compression at 0.7 quality.
 * This keeps images under ~200KB, well within Firestore's 1MB doc limit.
 */
function compressImage(file, maxWidth = 1200, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Scale down if larger than maxWidth
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const projectList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectList);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (projectData, imageFile, onProgress) => {
    try {
      let imageDataUrl = projectData.thumbnailUrl || '';

      if (imageFile) {
        if (onProgress) onProgress(30);
        imageDataUrl = await compressImage(imageFile);
        if (onProgress) onProgress(80);
      }

      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        title: projectData.title,
        description: projectData.description,
        category: projectData.category,
        categoryLabel: projectData.categoryLabel,
        type: projectData.type, // 'image' or 'video'
        src: projectData.type === 'video' ? projectData.videoUrl : imageDataUrl,
        thumbnailUrl: imageDataUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      if (onProgress) onProgress(100);
      await fetchProjects();
      return docRef.id;
    } catch (err) {
      console.error('Error adding project:', err);
      throw err;
    }
  };

  const updateProject = async (projectId, projectData, imageFile, onProgress) => {
    try {
      const projectRef = doc(db, COLLECTION_NAME, projectId);
      const updateData = {
        title: projectData.title,
        description: projectData.description,
        category: projectData.category,
        categoryLabel: projectData.categoryLabel,
        type: projectData.type,
        updatedAt: serverTimestamp()
      };

      if (imageFile) {
        if (onProgress) onProgress(30);
        const imageDataUrl = await compressImage(imageFile);
        if (onProgress) onProgress(80);

        updateData.thumbnailUrl = imageDataUrl;
        if (projectData.type === 'image') {
          updateData.src = imageDataUrl;
        }
      }

      if (projectData.type === 'video') {
        updateData.src = projectData.videoUrl;
      }

      await updateDoc(projectRef, updateData);
      if (onProgress) onProgress(100);
      await fetchProjects();
    } catch (err) {
      console.error('Error updating project:', err);
      throw err;
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, projectId));
      await fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
      throw err;
    }
  };

  return {
    projects,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject,
    refreshProjects: fetchProjects
  };
}
