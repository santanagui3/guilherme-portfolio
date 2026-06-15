import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section tracking
      if (!isHome) return;
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 200;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    document.body.style.overflow = !menuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeMenu();

    if (!isHome) {
      window.location.href = `/#${targetId}`;
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) return;
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
    window.scrollTo({
      top: target.offsetTop - navbarHeight,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container">
          <a href="#/" className="navbar-logo">
            Guilherme Santana
            <span className="logo-dot"></span>
          </a>

          <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
            <a
              href="#hero"
              className={activeSection === 'hero' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'hero')}
            >
              Início
            </a>
            <a
              href="#portfolio"
              className={activeSection === 'portfolio' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'portfolio')}
            >
              Portfólio
            </a>
            <a
              href="#about"
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'about')}
            >
              Sobre
            </a>
            <a
              href="#contact"
              className="navbar-cta"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Contato
            </a>
          </div>

          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            id="hamburger"
            aria-label="Abrir menu"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div
        className={`mobile-overlay ${menuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      ></div>
    </>
  );
}
