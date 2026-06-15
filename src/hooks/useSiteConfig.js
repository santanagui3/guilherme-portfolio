import { useState, useEffect, useCallback } from 'react';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const DOC_PATH = 'siteConfig/main';

// Default site configuration
const DEFAULT_CONFIG = {
  hero: {
    badge: 'Produtor Audiovisual',
    titleLine1: 'Criando',
    titleLine2: 'Histórias Visuais',
    description: 'Produção audiovisual profissional com foco em storytelling cinematográfico. Do conceito à entrega final, transformo ideias em experiências visuais memoráveis.',
  },
  about: {
    text: 'Sou um <strong>profissional audiovisual</strong> apaixonado por contar histórias através de imagens em movimento. Com experiência em produção de vídeo, fotografia e motion graphics, busco sempre criar conteúdos que <strong>conectem emocionalmente</strong> com o público.',
    text2: 'Meu trabalho combina técnica apurada com <strong>visão criativa</strong>, utilizando as melhores ferramentas do mercado para entregar resultados de alta qualidade.',
    stats: [
      { number: '50+', label: 'Projetos' },
      { number: '3+', label: 'Anos Exp.' },
      { number: '30+', label: 'Clientes' },
    ],
    skills: [
      { icon: '🎬', name: 'Produção de Vídeo' },
      { icon: '📷', name: 'Fotografia' },
      { icon: '✨', name: 'Motion Graphics' },
      { icon: '🎨', name: 'Color Grading' },
      { icon: '🎵', name: 'Sound Design' },
      { icon: '✂️', name: 'Edição / Pós' },
    ],
    profileImage: '',
  },
  contact: {
    description: 'Tem um projeto em mente? Vamos conversar! Estou disponível para freelance, colaborações e projetos criativos.',
    email: 'contato@guilherme.com',
    phone: '',
    instagram: '',
    youtube: '',
    linkedin: '',
  },
  footer: {
    instagram: '',
    youtube: '',
    linkedin: '',
    vimeo: '',
  },
};

export function useSiteConfig() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const docRef = doc(db, 'siteConfig', 'main');
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        // Deep merge with defaults to ensure all fields exist
        setConfig({
          hero: { ...DEFAULT_CONFIG.hero, ...data.hero },
          about: { ...DEFAULT_CONFIG.about, ...data.about },
          contact: { ...DEFAULT_CONFIG.contact, ...data.contact },
          footer: { ...DEFAULT_CONFIG.footer, ...data.footer },
        });
      }
    } catch (err) {
      console.error('Error fetching site config:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const updateSection = async (section, data) => {
    try {
      const docRef = doc(db, 'siteConfig', 'main');
      await setDoc(docRef, {
        [section]: data,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      setConfig((prev) => ({
        ...prev,
        [section]: { ...prev[section], ...data },
      }));
    } catch (err) {
      console.error('Error updating site config:', err);
      throw err;
    }
  };

  return {
    config,
    loading,
    error,
    updateSection,
    refreshConfig: fetchConfig,
  };
}
