import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import './NavbarSearch.css';

/**
 * Data yang bisa dicari. Tambah / ubah sesuai isi website.
 * page: 'modulku' | 'kartu-siapa-aku' | 'home'   href: anchor atau URL eksternal
 */
const searchItems = [
  { id: 'modulku', label: 'Modulku', type: 'Halaman', desc: 'Kumpulan modul digital Pedal Juara',
    keywords: ['modul', 'digital', 'belajar', 'materi'], page: 'modulku' },
  { id: 'dadu-emosi', label: 'Dadu Emosi', type: 'Permainan', desc: 'Lempar dadu dan kenali perasaanmu',
    keywords: ['emosi', 'perasaan', 'dadu', 'game'], href: 'https://dadu-emosi.vercel.app/' },
  { id: 'kartu-siapa-aku', label: 'Kartu Siapa Aku?', type: 'Permainan', desc: 'Kartu untuk mengenal diri sendiri',
    keywords: ['kartu', 'identitas', 'diri', 'game'], page: 'kartu-siapa-aku' },
  { id: 'tentang-kami', label: 'Tentang Kami', type: 'Halaman', desc: 'Kenali tim dan tujuan Pedal Juara',
    keywords: ['tim', 'about', 'profil', 'kontak'], page: 'home', href: '#tentang-kami' },
  // Contoh menambah modul:
  // { id: 'modul-empati', label: 'Modul Empati', type: 'Modul', desc: 'Memahami perasaan orang lain',
  //   keywords: ['empati', 'peduli'], page: 'modulku' },
];

const norm = (s) => s.toLowerCase().trim();

function Highlight({ text, query }) {
  const q = query.trim();
  const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

const Icon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <line x1="17" y1="17" x2="22" y2="22" />
  </svg>
);

export default function NavbarSearch({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    const q = norm(query);
    if (!q) return searchItems;
    return searchItems.filter((it) =>
      [it.label, it.desc, it.type, ...(it.keywords || [])].some((f) => norm(f).includes(q))
    );
  }, [query]);

  const close = () => { setOpen(false); setQuery(''); };

  useEffect(() => setActive(0), [query]);
  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);

  // Ctrl/Cmd + K buka, Esc tutup
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(true); }
      else if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Kunci scroll saat panel terbuka
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const choose = (it) => {
    if (!it) return;
    close();
    if (it.href && it.href.startsWith('http')) { window.open(it.href, '_blank', 'noreferrer'); return; }
    if (!onNavigate) return;
    if (it.page === 'home') onNavigate('home', it.href);
    else onNavigate(it.page);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => (results.length ? (i + 1) % results.length : 0)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); choose(results[active]); }
  };

  return (
    <>
      <button type="button" className="nsearch__btn" aria-label="Cari" title="Cari (Ctrl + K)"
              onClick={() => setOpen(true)}>
        <Icon />
      </button>

      {open && createPortal(
        <div className="nsearch__overlay" onMouseDown={close}>
          <div className="nsearch__panel" role="dialog" aria-label="Pencarian"
               onMouseDown={(e) => e.stopPropagation()}>
            <div className="nsearch__field">
              <Icon />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ketik untuk mencari… (modul, emosi, kartu)"
                aria-label="Kata kunci pencarian"
                autoComplete="off"
              />
              <button type="button" className="nsearch__close" aria-label="Tutup" onClick={close}>Esc</button>
            </div>

            {results.length === 0 ? (
              <p className="nsearch__empty">Tidak ada hasil untuk “{query}”. Coba kata lain.</p>
            ) : (
              <ul className="nsearch__list" role="listbox">
                {results.map((it, i) => (
                  <li key={it.id}>
                    <button
                      type="button"
                      className={`nsearch__item ${i === active ? 'is-active' : ''}`}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => choose(it)}
                    >
                      <span className="nsearch__text">
                        <span className="nsearch__title"><Highlight text={it.label} query={query} /></span>
                        <span className="nsearch__desc">{it.desc}</span>
                      </span>
                      <span className="nsearch__type">{it.type}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
