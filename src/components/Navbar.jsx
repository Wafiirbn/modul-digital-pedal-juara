import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Navbar.css';

const navLinks = [
  { id: 'modulku', label: 'Modulku', href: '#modulku' },
  { id: 'dadu-emosi', label: 'Dadu Emosi', href: 'https://dadu-emosi.vercel.app/' },
  { id: 'kartu-siapa-aku', label: 'Kartu Siapa Aku?', href: '#kartu-siapa-aku' },
  { id: 'tentang-kami', label: 'Tentang Kami', href: '#tentang-kami' },
];

/**
 * Data yang bisa dicari. Tambah / ubah sesuai isi website kamu.
 * - type   : label kecil di kanan hasil (Halaman, Permainan, dst.)
 * - desc   : deskripsi singkat di bawah judul
 * - keywords: kata lain yang ikut dicocokkan
 * - page   : 'modulku' | 'kartu-siapa-aku' | 'home'  (dipakai onNavigate)
 * - href   : anchor (untuk 'home') atau URL eksternal
 */
const searchItems = [
  {
    id: 'modulku',
    label: 'Modulku',
    type: 'Halaman',
    desc: 'Kumpulan modul digital Pedal Juara',
    keywords: ['modul', 'digital', 'belajar', 'materi', 'unduh'],
    page: 'modulku',
  },
  {
    id: 'dadu-emosi',
    label: 'Dadu Emosi',
    type: 'Permainan',
    desc: 'Lempar dadu dan kenali perasaanmu',
    keywords: ['emosi', 'perasaan', 'dadu', 'game', 'permainan', 'mood'],
    href: 'https://dadu-emosi.vercel.app/',
  },
  {
    id: 'kartu-siapa-aku',
    label: 'Kartu Siapa Aku?',
    type: 'Permainan',
    desc: 'Kartu untuk mengenal diri sendiri',
    keywords: ['kartu', 'identitas', 'diri', 'kenali', 'game', 'permainan'],
    page: 'kartu-siapa-aku',
  },
  {
    id: 'tentang-kami',
    label: 'Tentang Kami',
    type: 'Halaman',
    desc: 'Kenali tim dan tujuan Pedal Juara',
    keywords: ['tim', 'about', 'profil', 'kontak', 'pedal juara'],
    page: 'home',
    href: '#tentang-kami',
  },
  // Contoh menambah modul tertentu (hapus / ganti dengan modul aslimu):
  // {
  //   id: 'modul-empati',
  //   label: 'Modul Empati',
  //   type: 'Modul',
  //   desc: 'Belajar memahami perasaan orang lain',
  //   keywords: ['empati', 'peduli', 'teman'],
  //   page: 'modulku',
  // },
];

const normalize = (s) => s.toLowerCase().trim();

function highlight(text, query) {
  const q = query.trim();
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

function searchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="17" y1="17" x2="22" y2="22" />
    </svg>
  );
}

export default function Navbar({ currentPage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const mobileInputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return searchItems;
    return searchItems.filter((item) =>
      [item.label, item.desc, item.type, ...(item.keywords || [])]
        .some((field) => normalize(field).includes(q))
    );
  }, [query]);

  useEffect(() => setActiveIndex(0), [query]);

  // Fokus ke input saat panel dibuka
  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  // Klik di luar panel = tutup
  useEffect(() => {
    if (!searchOpen) return;
    const onClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) closeSearch();
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [searchOpen]);

  // Pintasan keyboard: Ctrl/Cmd + K buka, Esc tutup
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === 'Escape') {
        closeSearch();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery('');
  };

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

  const selectResult = (item) => {
    if (!item) return;
    closeSearch();
    setMenuOpen(false);

    if (item.href && item.href.startsWith('http')) {
      window.open(item.href, '_blank', 'noreferrer');
      return;
    }
    if (!onNavigate) return;
    if (item.page === 'home') onNavigate('home', item.href);
    else onNavigate(item.page);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      selectResult(results[activeIndex]);
    }
  };

  const renderResults = () =>
    results.length === 0 ? (
      <div className="navbar__search-empty">
        Tidak ada hasil untuk “{query}”. Coba kata lain, misalnya “modul” atau “emosi”.
      </div>
    ) : (
      <ul className="navbar__search-results" role="listbox">
        {results.map((item, i) => (
          <li key={item.id} role="option" aria-selected={i === activeIndex}>
            <button
              type="button"
              className={`navbar__search-item ${i === activeIndex ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => selectResult(item)}
            >
              <span className="navbar__search-item-main">
                <span className="navbar__search-item-title">{highlight(item.label, query)}</span>
                <span className="navbar__search-item-desc">{item.desc}</span>
              </span>
              <span className="navbar__search-item-type">{item.type}</span>
            </button>
          </li>
        ))}
      </ul>
    );

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

        {/* Search: tombol + panel pencarian */}
        <div className="navbar__search-wrap" ref={searchRef}>
          <button
            className={`navbar__search ${searchOpen ? 'navbar__search--open' : ''}`}
            id="nav-search"
            aria-label="Cari"
            aria-expanded={searchOpen}
            aria-haspopup="listbox"
            onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
            title="Cari (Ctrl + K)"
          >
            {searchIcon()}
          </button>

          {searchOpen && (
            <div className="navbar__search-panel" role="dialog" aria-label="Pencarian">
              <div className="navbar__search-field">
                {searchIcon()}
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Cari modul, permainan, halaman…"
                  aria-label="Kata kunci pencarian"
                  autoComplete="off"
                />
                {query && (
                  <button
                    type="button"
                    className="navbar__search-clear"
                    aria-label="Hapus kata kunci"
                    onClick={() => {
                      setQuery('');
                      inputRef.current && inputRef.current.focus();
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
              {renderResults()}
              <div className="navbar__search-hint">
                <span>↑ ↓ pilih</span>
                <span>Enter buka</span>
                <span>Esc tutup</span>
              </div>
            </div>
          )}
        </div>

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
          <div className="navbar__search-field navbar__search-field--mobile">
            {searchIcon()}
            <input
              ref={mobileInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Cari…"
              aria-label="Kata kunci pencarian"
              autoComplete="off"
            />
          </div>

          {query.trim() ? (
            renderResults()
          ) : (
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
