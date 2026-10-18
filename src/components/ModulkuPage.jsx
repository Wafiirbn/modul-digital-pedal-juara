import React, { useState, useRef, useMemo, useEffect } from 'react';
import './ModulkuPage.css';

/* ── Data ─────────────────────────────────────────── */
const modulesData = [
  {
    id: 'modul-1', step: 1,
    category: 'Pra-Acara', filterGroup: 'Karakter',
    tag: 'PRA-ACARA',
    title: 'Pra-Acara & Pemetaan Karakter',
    tagline: 'Kenalan dengan Pedal Juara dan mulai mengenali kekuatan dirimu.',
    duration: '2 pertemuan', time: '120 menit', target: 'Usia 8–12 tahun',
    chapters: [
      { title: 'Sosialisasi Program & Orientasi Belajar', desc: 'Membangun antusiasme dan kepercayaan anak-anak melalui ice breaking yang energik.' },
      { title: 'Permainan Kartu "Siapa Aku"', desc: 'Menggali minat, bakat, dan kelebihan peserta secara menyenangkan lewat kartu karakter.' },
      { title: 'Asesmen Pemetaan Potensi Awal', desc: 'Mengukur tingkat kepedulian lingkungan, kerja sama, dan percaya diri peserta.' },
      { title: 'Pembentukan Kelompok Belajar', desc: 'Membagi kelompok heterogen agar tiap anak saling melengkapi.' },
    ],
    features: ['Kartu Karakter Siapa Aku', 'Lembar Observasi Awal', 'Panduan Ice Breaking', 'Format Rekap Asesmen'],
    downloadUrl: '#',
    externalTool: { label: 'Buka Kartu Siapa Aku', link: '#kartu-siapa-aku' },
  },
  {
    id: 'modul-2', step: 2,
    category: 'Jelajah', filterGroup: 'Karakter',
    tag: 'JELAJAH KARAKTER',
    title: 'Jelajahi Karakter, Literasi & Numerasi',
    tagline: 'Temukan kekuatan karakter lewat cerita, permainan, dan tantangan sederhana.',
    duration: '3 pertemuan', time: '180 menit', target: 'Usia 8–12 tahun',
    chapters: [
      { title: '24 Character Strengths', desc: 'Mengenal karakter juara lewat cerita bergambar yang menarik dan mudah dipahami.' },
      { title: 'Tantangan Literasi Cerita Juara', desc: 'Membaca kritis dan diskusi kelompok untuk mengidentifikasi karakter tokoh inspiratif.' },
      { title: 'Permainan Numerasi', desc: 'Latihan matematika kontekstual yang relevan dengan kehidupan sehari-hari.' },
      { title: 'Studi Kasus Solutif', desc: 'Simulasi penyelesaian masalah sosial lingkungan secara kolaboratif.' },
    ],
    features: ['Komik Karakter Juara', 'Lembar Kerja Literasi', 'Modul Numerasi Kontekstual', 'Kartu Tantangan Solusi'],
    downloadUrl: '#',
    externalTool: { label: 'Buka Dadu Emosi', link: 'https://dadu-emosi.vercel.app/' },
  },
  {
    id: 'modul-3', step: 3,
    category: 'Lokakarya', filterGroup: 'Karya',
    tag: 'EKSPLORASI SISA',
    title: 'Lokakarya Eksplorasi Sisa (Upcycling)',
    tagline: 'Ubah barang bekas menjadi karya yang bisa digunakan dan bernilai.',
    duration: '2 pertemuan', time: '150 menit', target: 'Peserta & Instruktur',
    chapters: [
      { title: 'Edukasi Pemilahan Sampah', desc: 'Mengenal jenis-jenis plastik dan pentingnya daur ulang berbasis ekonomi sirkular.' },
      { title: 'SOP Keselamatan Kerja', desc: 'Standar keamanan dalam mencacah, melelehkan, dan mencetak plastik sisa.' },
      { title: 'Teknik Pencetakan Gantungan Kunci', desc: 'Membuat gantungan kunci warna-warni dengan cetakan silikon langkah demi langkah.' },
      { title: 'Potensi Ekonomi Sampah Plastik', desc: 'Menghitung nilai tambah dari barang bekas yang berhasil diselamatkan.' },
    ],
    features: ['Panduan SOP K3', 'Video Tutorial', 'Infografis Jenis Plastik', 'Kalkulator Nilai Sisa'],
    downloadUrl: '#',
  },
  {
    id: 'modul-4', step: 4,
    category: 'Lokakarya', filterGroup: 'Karya',
    tag: 'CITRA JUARA',
    title: 'Citra Juara & Talenta Digital',
    tagline: 'Kenali potensimu, buat karya digital, dan berani menunjukkannya.',
    duration: '2 pertemuan', time: '120 menit', target: 'Peserta & Mentor',
    chapters: [
      { title: 'Desain Label Personal & Branding', desc: 'Membuat nama merek, logo sederhana, dan stiker kemasan karya.' },
      { title: 'Public Speaking & Pitching', desc: 'Teknik berbicara percaya diri dan menyampaikan nilai produk.' },
      { title: 'Video Short Promosi', desc: 'Merekam video promosi karya 30 detik menggunakan ponsel.' },
      { title: 'Etika Bermedia Digital', desc: 'Bijak bersosial media dan menjaga keamanan data diri.' },
    ],
    features: ['Template Label Produk', 'Modul Public Speaking', 'Checklist Produksi Video', 'Rubrik Evaluasi'],
    downloadUrl: '#',
  },
  {
    id: 'modul-5', step: 5,
    category: 'Lokakarya', filterGroup: 'Karya',
    tag: 'REKA RUANG',
    title: 'Lokakarya Reka Ruang & Dekorasi Eco',
    tagline: 'Berkolaborasi menciptakan ruang belajar yang lebih hidup dan bermakna.',
    duration: '2 pertemuan', time: '150 menit', target: 'Kelompok Peserta',
    chapters: [
      { title: 'Perancangan Konsep Booth Bazar', desc: 'Sketsa denah dan perencanaan tema booth bazar ramah lingkungan.' },
      { title: 'Ornamen Wall Decor dari Sampah', desc: 'Merangkai hiasan dinding, spanduk daur ulang, dan sign board estetik.' },
      { title: 'Pembagian Peran Kerja Sama Tim', desc: 'Metode pembagian tugas agar semua anak berpartisipasi aktif.' },
      { title: 'Finishing & Uji Kelayakan Stand', desc: 'Checklist kerapihan, keamanan struktur booth, dan kenyamanan pengunjung.' },
    ],
    features: ['Template Blueprint Booth', 'Panduan Dekorasi Eco', 'Lembar Tugas Tim', 'Checklist Keamanan'],
    downloadUrl: '#',
  },
  {
    id: 'modul-6', step: 6,
    category: 'Kewirausahaan', filterGroup: 'Kewirausahaan',
    tag: 'BAZAAR KARYA',
    title: 'Panduan Bazaar Karya Juara',
    tagline: 'Rasakan pengalaman berjualan nyata dan belajar berwirausaha.',
    duration: '1 hari event', time: '240 menit', target: 'Peserta, Orang Tua & Komunitas',
    chapters: [
      { title: 'Manajemen Pre-Opening Stand', desc: 'Checklist penataan barang, daftar harga, dan pembagian kembalian.' },
      { title: 'Pelayanan Konsumen & Negosiasi', desc: 'Cara menyapa pembeli dengan sopan dan menjelaskan keunggulan karya.' },
      { title: 'Buku Kas Sederhana', desc: 'Pencatatan barang keluar, pemasukan, dan perhitungan modal vs keuntungan.' },
      { title: 'Refleksi & Apresiasi Hasil', desc: 'Penutupan bazar, penghitungan omzet bersama, dan syukuran kelompok.' },
    ],
    features: ['Buku Kas Sederhana', 'Daftar Harga Print-out', 'Panduan Pelayanan', 'Form Rekap Omzet'],
    downloadUrl: '#',
  },
  {
    id: 'modul-7', step: 7,
    category: 'Evaluasi', filterGroup: 'Evaluasi',
    tag: 'GEMA MASA DEPAN',
    title: 'Gema Masa Depan & Papan Impian',
    tagline: 'Lihat perjalananmu, rayakan kemajuanmu, dan bayangkan masa depanmu.',
    duration: '2 pertemuan', time: '120 menit', target: 'Peserta, Fasilitator & Orang Tua',
    chapters: [
      { title: 'Pameran Refleksi Photovoice', desc: 'Memilih foto kenangan terbaik dan menuliskan pesan perubahan diri.' },
      { title: 'Asesmen Post-Test Karakter', desc: 'Mengukur peningkatan karakter, literasi, numerasi, dan wawasan lingkungan.' },
      { title: 'Workshop Papan Impian', desc: 'Membuat papan cita-cita masa depan berdasarkan karakter juara.' },
      { title: 'Penyerahan Portofolio & Sertifikat', desc: 'Seremoni wisuda kecil dan penyerahan hasil karya peserta.' },
    ],
    features: ['Template Photovoice', 'Lembar Post-Test', 'Kit Papan Impian', 'Certificate Template'],
    downloadUrl: '#',
  },
];

const journeyLabels = ['Kenalan', 'Kenali Diri', 'Berkarya', 'Tunjukkan', 'Kreasi Ruang', 'Berwirausaha', 'Refleksi'];

const filterGroups = [
  { key: 'Semua', label: 'Semua' },
  { key: 'Karakter', label: 'Karakter' },
  { key: 'Karya', label: 'Karya' },
  { key: 'Kewirausahaan', label: 'Kewirausahaan' },
  { key: 'Evaluasi', label: 'Evaluasi' },
];

/* ── Icon helpers ── */
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" /><line x1="17" y1="17" x2="22" y2="22" />
  </svg>
);
const ClearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 14" />
  </svg>
);
const PeopleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14.4c1.8.8 3 2.7 3 5.6" />
  </svg>
);

/* ── Component ── */
export default function ModulkuPage({ onNavigateToKartu }) {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState(null);
  const moduleRefs = useRef({});
  const searchInputRef = useRef(null);

  /* Combined filter + search */
  const filteredModules = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return modulesData.filter(m => {
      const matchesFilter = activeFilter === 'Semua' || m.filterGroup === activeFilter;
      if (!q) return matchesFilter;
      const matchesSearch =
        m.title.toLowerCase().includes(q) ||
        m.tagline.toLowerCase().includes(q) ||
        m.tag.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const isSearchActive = searchQuery.trim().length > 0;

  /* Close detail dialog with Escape; lock page scroll while open */
  useEffect(() => {
    if (!selectedModule) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setSelectedModule(null); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedModule]);

  const handleExternalClick = (e, tool) => {
    if (tool.link === '#kartu-siapa-aku') {
      e.preventDefault();
      if (onNavigateToKartu) onNavigateToKartu();
    }
  };

  const scrollToModule = (step) => {
    const el = moduleRefs.current[step];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const clearSearch = () => {
    setSearchQuery('');
    searchInputRef.current?.focus();
  };

  const resetAll = () => {
    setSearchQuery('');
    setActiveFilter('Semua');
  };

  const hasDownload = (m) => m.downloadUrl && m.downloadUrl !== '#';

  return (
    <div className="mk-page">

      {/* ── Header ── */}
      <header className="mk-header">
        <h1 className="mk-header__title">Modul Pembelajaran</h1>
        <p className="mk-header__desc">
          Jelajahi materi, lanjutkan progres belajarmu, dan temukan aktivitas
          yang sesuai dengan kebutuhanmu.
        </p>
      </header>

      <div className="mk-layout">

        {/* ── Left: Modulku list ── */}
        <section className="mk-main" aria-labelledby="mk-list-title">
          <div className="mk-main__top">
            <h2 id="mk-list-title" className="mk-main__title">Modulku</h2>

            <div className={`mk-search${isSearchActive ? ' mk-search--active' : ''}`}>
              <span className="mk-search__icon"><SearchIcon /></span>
              <input
                ref={searchInputRef}
                type="text"
                className="mk-search__input"
                placeholder="Cari nama atau kategori modul"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                id="search-modul"
                aria-label="Cari modul"
              />
              {isSearchActive && (
                <button className="mk-search__clear" onClick={clearSearch} aria-label="Hapus pencarian">
                  <ClearIcon />
                </button>
              )}
            </div>
          </div>

          <div className="mk-filters" role="group" aria-label="Filter modul">
            {filterGroups.map(f => (
              <button
                key={f.key}
                type="button"
                className={`mk-filter${activeFilter === f.key ? ' mk-filter--active' : ''}`}
                aria-pressed={activeFilter === f.key}
                onClick={() => setActiveFilter(f.key)}
                id={`filter-${f.key.toLowerCase()}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <p className="mk-count" aria-live="polite">
            {isSearchActive
              ? <>{filteredModules.length} modul ditemukan untuk <strong>“{searchQuery.trim()}”</strong></>
              : <>Menampilkan {filteredModules.length} dari {modulesData.length} modul</>}
          </p>

          {filteredModules.length === 0 && (
            <div className="mk-empty">
              <p className="mk-empty__title">
                {isSearchActive ? 'Modul tidak ditemukan' : 'Belum ada modul di kategori ini'}
              </p>
              <p className="mk-empty__text">
                {isSearchActive
                  ? 'Coba kata kunci lain atau hapus pencarian untuk melihat semua modul.'
                  : 'Pilih kategori lain atau tampilkan semua modul.'}
              </p>
              <button type="button" className="mk-btn-primary" onClick={isSearchActive ? clearSearch : resetAll}>
                {isSearchActive ? 'Hapus pencarian' : 'Tampilkan semua modul'}
              </button>
            </div>
          )}

          <div className="mk-list">
            {filteredModules.map((mod) => (
              <article
                key={mod.id}
                id={mod.id}
                className="mk-card"
                ref={el => { moduleRefs.current[mod.step] = el; }}
              >
                <div className="mk-card__thumb" data-group={mod.filterGroup} aria-hidden="true">
                  <span className="mk-card__step">{mod.step}</span>
                  <span className="mk-card__thumb-label">Tahap</span>
                </div>

                <div className="mk-card__body">
                  <div className="mk-card__tags">
                    <span className="mk-pill mk-pill--cat">{mod.category}</span>
                    <span className="mk-pill mk-pill--tag">{mod.tag}</span>
                  </div>
                  <h3 className="mk-card__title">{mod.title}</h3>
                  <p className="mk-card__tagline">{mod.tagline}</p>

                  <ul className="mk-card__meta">
                    <li><ClockIcon />{mod.duration}, {mod.time}</li>
                    <li><PeopleIcon />{mod.target}</li>
                  </ul>

                  <div className="mk-card__actions">
                    <button
                      type="button"
                      className="mk-btn-primary"
                      onClick={() => setSelectedModule(mod)}
                      id={`btn-detail-${mod.id}`}
                    >
                      Lihat Modul <ArrowRight />
                    </button>
                    {mod.externalTool && (
                      <a
                        href={mod.externalTool.link}
                        className="mk-btn-ghost"
                        target={mod.externalTool.link.startsWith('http') ? '_blank' : '_self'}
                        rel="noreferrer"
                        onClick={e => handleExternalClick(e, mod.externalTool)}
                      >
                        {mod.externalTool.label} <ExternalIcon />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Right: Journey + tools ── */}
        <aside className="mk-side" aria-label="Perjalanan belajar">
          <div className="mk-panel">
            <h2 className="mk-panel__title">Perjalanan Belajar</h2>
            <p className="mk-panel__sub">{modulesData.length} tahap, dari kenalan sampai refleksi.</p>
            <ol className="mk-journey">
              {modulesData.map((mod, idx) => {
                const visible = filteredModules.includes(mod);
                return (
                  <li key={mod.id}>
                    <button
                      type="button"
                      className={`mk-journey__item${visible ? '' : ' mk-journey__item--dim'}`}
                      title={mod.title}
                      onClick={() => {
                        if (!visible) resetAll();
                        setTimeout(() => scrollToModule(mod.step), 60);
                      }}
                    >
                      <span className="mk-journey__num">{mod.step}</span>
                      <span className="mk-journey__text">
                        <span className="mk-journey__name">{journeyLabels[idx]}</span>
                        <span className="mk-journey__cat">{mod.category}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mk-panel mk-panel--tools">
            <h2 className="mk-panel__title">Aktivitas Interaktif</h2>
            <p className="mk-panel__sub">Langsung dicoba bersama peserta.</p>
            <a
              className="mk-tool"
              href="#kartu-siapa-aku"
              onClick={e => { e.preventDefault(); if (onNavigateToKartu) onNavigateToKartu(); }}
            >
              <span className="mk-tool__name">Kartu Siapa Aku?</span>
              <span className="mk-tool__go"><ArrowRight /></span>
            </a>
            <a className="mk-tool" href="https://dadu-emosi.vercel.app/" target="_blank" rel="noreferrer">
              <span className="mk-tool__name">Dadu Emosi</span>
              <span className="mk-tool__go"><ExternalIcon /></span>
            </a>
          </div>
        </aside>
      </div>

      {/* ── Detail dialog ── */}
      {selectedModule && (
        <div className="mk-modal-overlay" onClick={() => setSelectedModule(null)}>
          <div
            className="mk-modal"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mk-modal-title"
          >
            <button
              type="button"
              className="mk-modal__close"
              onClick={() => setSelectedModule(null)}
              aria-label="Tutup"
              autoFocus
            >
              <ClearIcon />
            </button>

            <div className="mk-modal__head">
              <div className="mk-modal__stage">Tahap {selectedModule.step} · {selectedModule.category}</div>
              <h2 id="mk-modal-title" className="mk-modal__title">{selectedModule.title}</h2>
              <p className="mk-modal__tagline">{selectedModule.tagline}</p>
            </div>

            <ul className="mk-modal__meta-row">
              <li><ClockIcon />{selectedModule.duration}, {selectedModule.time}</li>
              <li><PeopleIcon />{selectedModule.target}</li>
            </ul>

            <div className="mk-modal__section">
              <h3>Apa yang akan kita lakukan?</h3>
              <ol className="mk-modal__chapters">
                {selectedModule.chapters.map((ch, i) => (
                  <li key={i} className="mk-modal__chapter">
                    <div>
                      <p className="mk-modal__ch-title">{ch.title}</p>
                      <p className="mk-modal__ch-desc">{ch.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mk-modal__section">
              <h3>Materi & Perlengkapan</h3>
              <div className="mk-modal__features">
                {selectedModule.features.map((f, i) => (
                  <span key={i} className="mk-modal__feat">{f}</span>
                ))}
              </div>
            </div>

            <div className="mk-modal__footer">
              {hasDownload(selectedModule) ? (
                <a className="mk-btn-primary" href={selectedModule.downloadUrl} download>
                  <DownloadIcon /> Unduh Modul (PDF)
                </a>
              ) : (
                <button type="button" className="mk-btn-primary" disabled>
                  <DownloadIcon /> PDF segera tersedia
                </button>
              )}
              {selectedModule.externalTool && (
                <a
                  href={selectedModule.externalTool.link}
                  className="mk-btn-outline"
                  target={selectedModule.externalTool.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  onClick={e => { handleExternalClick(e, selectedModule.externalTool); setSelectedModule(null); }}
                >
                  {selectedModule.externalTool.label}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
