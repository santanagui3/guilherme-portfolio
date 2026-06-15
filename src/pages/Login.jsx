import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Email ou senha incorretos.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Muitas tentativas. Tente novamente em alguns minutos.');
      } else {
        setError('Erro ao fazer login. Verifique suas credenciais.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="hero-grain"></div>
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <a href="#/" className="login-logo">
              <span className="logo-accent">G</span>uilherme
            </a>
            <h1 className="login-title">Painel Admin</h1>
            <p className="login-subtitle">
              Acesse para gerenciar seu portfólio
            </p>
          </div>

          {error && (
            <div className="login-error">
              <span className="login-error-icon">⚠</span>
              {error}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="login-email">E-mail</label>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Senha</label>
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="login-spinner"></span>
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <span className="btn-icon">→</span>
                </>
              )}
            </button>
          </form>

          <a href="#/" className="login-back">
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}
