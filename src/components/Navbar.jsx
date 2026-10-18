import React, { useState, useEffect } from 'react';
import NavbarSearch from './NavbarSearch';
import './Navbar.css';

const navLinks = [
  { id: 'modulku', label: 'Modulku', href: '#modulku' },
  { id: 'dadu-emosi', label: 'Dadu Emosi', href: 'https://dadu-emosi.vercel.app/' },
  { id: 'kartu-siapa-aku', label: 'Kartu Siapa Aku?', href: '#kartu-siapa-aku' },
  { id: 'tentang-kami', label: 'Tentang Kami', href: '#tentang-kami' },
];

export default function Navbar({ currentPage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e, link) => {
    if (link.href.startsWith('http')) {
      // External link like Dadu Emosi opens directly
      return;
    }

    e.preventDefault();
    setMenuOpen(false);

    if (link.id === 'modulku') {
      if (onNavigate) onNavigate('modulku');
    } else if (link.id === 'kartu-siapa-aku') {
      if (onNavigate) onNavigate('kartu-siapa-aku');
    } else {
      if (onNavigate) onNavigate('home', link.href);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <a
          href="#"
          className="navbar__logo"
          id="nav-logo"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('home', '#top');
          }}
        >
          <img src="/logo.png" alt="Logo Pedal Juara" className="navbar__logo-img" />
        </a>

        {/* Desktop nav links */}
        <ul className="navbar__links">
          {navLinks.map(link => {
            const isActive =
              (link.id === 'modulku' && currentPage === 'modulku') ||
              (link.id === 'kartu-siapa-aku' && currentPage === 'kartu-siapa-aku');
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                  id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={(e) => handleLinkClick(e, link)}
                  target={link.href.startsWith('http') ? '_blank' : '_self'}
                  rel={link.href.startsWith('http') ? 'noreferrer' : ''}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Search */}
        <NavbarSearch onNavigate={onNavigate} />

        {/* Hamburger for mobile */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          id="nav-hamburger"
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {(
            navLinks.map(link => {
              const isActive =
                (link.id === 'modulku' && currentPage === 'modulku') ||
                (link.id === 'kartu-siapa-aku' && currentPage === 'kartu-siapa-aku');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`navbar__mobile-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link)}
                  target={link.href.startsWith('http') ? '_blank' : '_self'}
                  rel={link.href.startsWith('http') ? 'noreferrer' : ''}
                >
                  {link.label}
                </a>
              );
            })
          )}
        </div>
      )}
    </nav>
  );
}
