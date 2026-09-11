import React, { useState } from 'react';
import './ModulkuPage.css';

// SVG Icons to replace all emojis
const SVG = {
  rocket: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z"/>
    </svg>
  ),
  compass: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D7DD2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
  recycle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3DB54A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="7 19 3 19 3 15"/>
      <path d="M13 19h4a2 2 0 0 0 1.83-1.2l2.35-5.3a2 2 0 0 0-.58-2.35l-3.3-2.65a2 2 0 0 0-2.6 0l-3.3 2.65a2 2 0 0 0-.58 2.35l2.35 5.3A2 2 0 0 0 13 19z"/>
      <path d="M4 14.5A7.5 7.5 0 0 1 12 4.5c3.2 0 6 2 7 5"/>
    </svg>
  ),
  video: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9B51E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  ),
  palette: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8302A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="#E8302A"/>
      <circle cx="17.5" cy="10.5" r=".5" fill="#E8302A"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="#E8302A"/>
      <circle cx="6.5" cy="12.5" r=".5" fill="#E8302A"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.65 1.9-1.54a1.86 1.86 0 0 0-.48-1.74l-.24-.25a1.86 1.86 0 0 1 .52-2.97l.76-.38A4 4 0 0 0 17 11.5V11c0-5-3.8-9-5-9z"/>
    </svg>
  ),
  trophy: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F2994A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34"/>
      <path d="M18 4H6v7a6 6 0 0 0 12 0V4z"/>
    </svg>
  ),
  star: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00A896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  clock: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  target: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  book: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  download: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  link: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  search: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2D7DD2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
};

const modulesData = [
  {
    id: 'modul-1',
    stage: 'Tahap 1',
    category: 'Pra-Acara',
    badgeClass: 'badge-pra',
    title: 'Modul 1: Pra-Acara & Pemetaan Karakter "Siapa Aku"',
    subtitle: 'Sosialisasi awal, pemetaan karakter, dan permainan kartu interaktif',
    icon: SVG.rocket,
    duration: '2 Pertemuan (120 Menit)',
    target: 'Anak Usia 8–12 Tahun & Fasilitator',
    color: '#FF6B2B',
    summary: 'Rangkaian pra-acara untuk memperkenalkan program Pedal Juara, mencairkan suasana dengan ice breaking, serta memetakan kondisi awal dan karakter unik setiap peserta.',
    chapters: [
      { title: 'Bab 1: Sosialisasi Program & Orientasi Belajar', content: 'Panduan pelaksanaan sosialisasi untuk membangun antusiasme dan kepercayaan anak-anak. Dilengkapi skrip sambutan fasilitator dan ice breaking energik.' },
      { title: 'Bab 2: Panduan Permainan Kartu "Siapa Aku"', content: 'Aturan main kartu karakter "Siapa Aku" untuk menggali minat, bakat, kelebihan, dan hal yang paling disukai peserta secara menyenangkan.' },
      { title: 'Bab 3: Asesmen Pemetaan Potensi Karakter Awal', content: 'Lembar observasi dan kuesioner bergambar untuk mengukur tingkat kepedulian lingkungan, kerja sama, dan percaya diri awal.' },
      { title: 'Bab 4: Panduan Pembentukan Kelompok Belajar', content: 'Petunjuk praktis membagi kelompok heterogen agar tiap anak saling melengkapi berdasarkan hasil asesmen awal.' }
    ],
    features: ['Kartu Karakter Siapa Aku', 'Lembar Observasi Awal', 'Panduan Ice Breaking', 'Format Rekap Asesmen'],
    downloadUrl: '#',
    externalTool: { label: 'Buka Kartu Siapa Aku', link: '#kartu-siapa-aku' }
  },
  {
    id: 'modul-2',
    stage: 'Tahap 2',
    category: 'Jelajah',
    badgeClass: 'badge-jelajah',
    title: 'Modul 2: Jelajah Peta Karakter, Literasi & Numerasi',
    subtitle: 'Eksplorasi kekuatan karakter melalui studi kasus, cerita & tantangan angka',
    icon: SVG.compass,
    duration: '3 Pertemuan (180 Menit)',
    target: 'Anak Usia 8–12 Tahun',
    color: '#2D7DD2',
    summary: 'Mengintegrasikan 24 Character Strengths Seligman dengan aktivitas literasi bacaan inspiratif dan tantangan matematika praktis berbasis lingkungan.',
    chapters: [
      { title: 'Bab 1: Mengenal 6 Kebijakan & 24 Character Strengths', content: 'Pengenalan karakter juara (keberanian, kebaikan hati, keadilan, kebijaksanaan, kesederhanaan, dan spiritualitas) lewat cerita bergambar.' },
      { title: 'Bab 2: Tantangan Literasi Cerita Juara', content: 'Lembar membaca kritis dan diskusi kelompok untuk mengidentifikasi karakter tokoh cerita inspiratif.' },
      { title: 'Bab 3: Permainan Numerasi "Hitung Langkah Juaramu"', content: 'Latihan perhitungan matematis kontekstual seperti mengukur jumlah sampah plastik dan menghitung jarak tempuh kegiatan.' },
      { title: 'Bab 4: Lembar Kerja Studi Kasus Solutif', content: 'Simulasi penyelesaian masalah sosial lingkungan di sekitar sekolah dengan pendekatan kolaboratif.' }
    ],
    features: ['Komik Karakter Juara', 'Lembar Kerja Literasi', 'Modul Numerasi Kontekstual', 'Kartu Tantangan Solusi'],
    downloadUrl: '#',
    externalTool: { label: 'Buka Dadu Emosi', link: 'https://dadu-emosi.vercel.app/' }
  },
  {
    id: 'modul-3',
    stage: 'Tahap 3',
    category: 'Lokakarya',
    badgeClass: 'badge-lokakarya',
    title: 'Modul 3: Lokakarya Eksplorasi Sisa (Upcycling Plastik)',
    subtitle: 'Mengubah material sisa tutup botol menjadi produk kreatif bernilai jual',
    icon: SVG.recycle,
    duration: '2 Pertemuan (150 Menit)',
    target: 'Peserta & Instruktur Keterampilan',
    color: '#3DB54A',
    summary: 'Panduan hands-on pengolahan sampah plastik anorganik (tutup botol HD/PP) menjadi produk gantungan kunci dan kerajinan bernilai ekonomis.',
    chapters: [
      { title: 'Bab 1: Edukasi Pemilahan Sampah & Dampak Ekologis', content: 'Materi visual pengenalan jenis-jenis plastik dan pentingnya daur ulang berbasis ekonomi sirkular.' },
      { title: 'Bab 2: SOP Keselamatan Kerja & Persiapan Alat', content: 'Standar keamanan dalam mencacah, melelehkan, dan mencetak plastik sisa secara aman di bawah pengawasan.' },
      { title: 'Bab 3: Teknik Pencetakan Gantungan Kunci Juara', content: 'Langkah demi langkah membuat gantungan kunci warna-warni unik dengan cetakan silikon.' },
      { title: 'Bab 4: Analisis Potensi Ekonomi Sampah Plastik', content: 'Panduan menghitung nilai tambah dari barang bekas yang berhasil diselamatkan dari TPA.' }
    ],
    features: ['Panduan SOP K3 Upcycling', 'Video Tutorial Pencetakan', 'Infografis Jenis Plastik', 'Kalkulator Nilai Sisa'],
    downloadUrl: '#'
  },
  {
    id: 'modul-4',
    stage: 'Tahap 4',
    category: 'Lokakarya',
    badgeClass: 'badge-lokakarya',
    title: 'Modul 4: Lokakarya Citra Juara & Talenta Digital',
    subtitle: 'Membangun identitas personal, desain label produk, dan konten promosi',
    icon: SVG.video,
    duration: '2 Pertemuan (120 Menit)',
    target: 'Peserta & Mentoring Digital',
    color: '#9B51E0',
    summary: 'Melatih kemampuan personal branding, desain label packaging sederhana, serta keberanian tampil berkomunikasi di depan kamera.',
    chapters: [
      { title: 'Bab 1: Desain Label Personal & Branding Produk', content: 'Panduan membuat nama merek, logo sederhana, dan stiker kemasan karya peserta.' },
      { title: 'Bab 2: Panduan Public Speaking & Pitching Karya', content: 'Teknik dasar berbicara percaya diri, kontak mata, dan menyampaikan nilai produk karya.' },
      { title: 'Bab 3: Pembuatan Video Short / Story Promosi', content: 'Latihan merekam video promosi karya berdurasi 30 detik menggunakan ponsel dengan percaya diri.' },
      { title: 'Bab 4: Etika Ber media Digital & Keamanan Anak', content: 'Pemahaman dasar bijak bersosial media dan menjaga kerahasiaan data pribadi.' }
    ],
    features: ['Template Label Produk', 'Modul Public Speaking', 'Checklist Produksi Video', 'Rubrik Evaluasi Presentasi'],
    downloadUrl: '#'
  },
  {
    id: 'modul-5',
    stage: 'Tahap 5',
    category: 'Lokakarya',
    badgeClass: 'badge-lokakarya',
    title: 'Modul 5: Lokakarya Reka Ruang & Dekorasi Eco-Creative',
    subtitle: 'Berkreasi mengubah material sisa menjadi dekorasi kelas & booth bazar',
    icon: SVG.palette,
    duration: '2 Pertemuan (150 Menit)',
    target: 'Kelompok Peserta',
    color: '#E8302A',
    summary: 'Mendorong semangat gotong royong dan rasa memiliki lingkungan sekolah melalui pembuatan instalasi dekorasi ruang dan booth dari sampah plastik.',
    chapters: [
      { title: 'Bab 1: Perancangan Konsep Lay-out & Stand Bazaar', content: 'Panduan sketsa denah dan perencanaan tema booth bazar ramah lingkungan.' },
      { title: 'Bab 2: Pembuatan Ornamen Wall Decor dari Sampah', content: 'Tutorial merangkai hiasan dinding, spanduk daur ulang, dan sign board estetik.' },
      { title: 'Bab 3: Pembagian Peran Kerja Sama Tim', content: 'Metode pembagian tugas (manajer booth, desainer, kurator produk) agar semua anak berpartisipasi.' },
      { title: 'Bab 4: Finishing & Uji Kelayakan Stand', content: 'Checklist kerapihan, keamanan struktur booth, dan kenyamanan pengunjung.' }
    ],
    features: ['Template Blueprint Booth', 'Panduan Dekorasi Eco', 'Lembar Tugas Tim', 'Checklist Keamanan'],
    downloadUrl: '#'
  },
  {
    id: 'modul-6',
    stage: 'Tahap 6',
    category: 'Kewirausahaan',
    badgeClass: 'badge-kewirausahaan',
    title: 'Modul 6: Panduan Bazaar Karya Juara & Kewirausahaan',
    subtitle: 'Praktik langsung penjualan produk karya, komunikasi transaksi & kas',
    icon: SVG.trophy,
    duration: '1 Hari Event (240 Menit)',
    target: 'Peserta, Orang Tua & Komunitas',
    color: '#F2994A',
    summary: 'Pengalaman nyata menjalankan bisnis sosial mini, di mana anak-anak menjajakan hasil karya daur ulangnya kepada warga sekolah dan orang tua.',
    chapters: [
      { title: 'Bab 1: Manajemen Pre-Opening Stand Bazar', content: 'Checklist penataan barang dagangan, penyusunan daftar harga, dan pembagian uang kembalian.' },
      { title: 'Bab 2: Simuasi Pelayanan Konsumen & Negosiasi', content: 'Buku saku ucapan salam, cara menyapa pembeli dengan sopan, dan menjelaskan keunggulan karya.' },
      { title: 'Bab 3: Pencatatan Buku Kas Sederhana', content: 'Lembar pencatatan barang keluar, pemasukan tunai, dan perhitungan modal vs keuntungan.' },
      { title: 'Bab 4: Refleksi & Apresiasi Hasil Penjualan', content: 'Panduan penutupan bazar, penghitungan omzet bersama, dan syukuran kelompok.' }
    ],
    features: ['Buku Kas Sederhana', 'Daftar Harga Print-out', 'Panduan Pelayanan Ramah', 'Form Rekap Omzet'],
    downloadUrl: '#'
  },
  {
    id: 'modul-7',
    stage: 'Tahap 7',
    category: 'Evaluasi',
    badgeClass: 'badge-evaluasi',
    title: 'Modul 7: Gema Masa Depan, Photovoice & Papan Impian',
    subtitle: 'Refleksi perjalanan, pameran foto Photovoice, & penyusunan Dream Board',
    icon: SVG.star,
    duration: '2 Pertemuan (120 Menit)',
    target: 'Peserta, Fasilitator & Orang Tua',
    color: '#00A896',
    summary: 'Penutup program yang berkesan untuk merefleksikan perubahan diri peserta melalui metode Photovoice, evaluasi post-test, dan penyusunan papan impian.',
    chapters: [
      { title: 'Bab 1: Pameran Refleksi Metode Photovoice', content: 'Panduan anak memilih foto kenangan terbaik selama kegiatan dan menuliskan pesan perubahan dirinya.' },
      { title: 'Bab 2: Asesmen Post-Test Perkembangan Karakter', content: 'Lembar evaluasi akhir untuk mengukur peningkatan karakter, literasi, numerasi, dan wawasan lingkungan.' },
      { title: 'Bab 3: Workshop Penyusunan Papan Impian (Dream Board)', content: 'Instruksi membuat papan cita-cita masa depan 5 tahun mendatang berdasarkan karakter juara.' },
      { title: 'Bab 4: Penyerahan Portofolio Juara & Sertifikat', content: 'Panduan seremoni wisuda kecil dan penyerahan hasil karya serta portofolio peserta.' }
    ],
    features: ['Template Photovoice', 'Lembar Post-Test Evaluasi', 'Kit Papan Impian (Dream Board)', 'Certificate Template'],
    downloadUrl: '#'
  }
];

export default function ModulkuPage({ onBackToHome, onNavigateToKartu }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedModule, setSelectedModule] = useState(null);

  const categories = ['Semua', 'Pra-Acara', 'Jelajah', 'Lokakarya', 'Kewirausahaan', 'Evaluasi'];

  const filteredModules = modulesData.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mod.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mod.stage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Semua' || mod.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleExternalClick = (e, tool) => {
    if (tool.link === '#kartu-siapa-aku') {
      e.preventDefault();
      if (onNavigateToKartu) onNavigateToKartu();
    }
  };

  return (
    <div className="modulku-page">
      {/* Hero Banner with Homepage Aesthetic */}
      <section className="modulku-hero">
        <div className="modulku-hero__container">
          <button className="modulku-back-btn" onClick={onBackToHome} id="btn-back-home">
            ← Kembali ke Beranda
          </button>

          <div className="modulku-hero__content">
            <div className="modulku-badge" id="modulku-badge">
              <span className="modulku-badge-inner">{SVG.book} Modul Digital Interactive</span>
            </div>

            <h1 className="modulku-hero__title">
              Pusat Modul Pembelajaran <span className="highlight-pedal">PEDAL</span> <span className="highlight-juara">JUARA</span>
            </h1>

            <p className="modulku-hero__desc">
              Akses dan unduh seluruh modul panduan digital interaktif dari Tahap 1 hingga Tahap 7.
              Dirancang khusus untuk memfasilitasi pengembangan karakter, literasi, numerasi, dan kewirausahaan lingkungan.
            </p>

            {/* Search and Filters Box */}
            <div className="modulku-filter-box">
              <div className="modulku-search-input-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D7DD2" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7"/>
                  <line x1="17" y1="17" x2="22" y2="22"/>
                </svg>
                <input
                  type="text"
                  placeholder="Cari modul, kata kunci, atau tahap program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="modulku-search-input"
                  id="modulku-search-input"
                />
                {searchQuery && (
                  <button className="modulku-search-clear" onClick={() => setSearchQuery('')}>✕</button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="modulku-categories">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`modulku-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                    id={`cat-btn-${cat.toLowerCase()}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid Section */}
      <section className="modulku-grid-section">
        <div className="modulku-grid-container">
          <div className="modulku-section-header">
            <h2 className="modulku-section-title">Rangkaian Modul Digital ({filteredModules.length})</h2>
            <p className="modulku-section-sub">Klik modul di bawah untuk melihat rincian bab, panduan fasilitator, dan materi PDF</p>
          </div>

          {filteredModules.length === 0 ? (
            <div className="modulku-empty">
              <span className="modulku-empty-icon">{SVG.search}</span>
              <h3>Modul tidak ditemukan</h3>
              <p>Coba kata kunci lain atau pilih kategori "Semua".</p>
              <button className="modulku-reset-btn" onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}>
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="modulku-grid">
              {filteredModules.map((mod) => (
                <div key={mod.id} className="modulku-card" style={{ '--card-color': mod.color }}>
                  <div className="modulku-card__top">
                    <span className={`modulku-card__badge ${mod.badgeClass}`}>
                      {mod.stage}
                    </span>
                    <span className="modulku-card__icon">{mod.icon}</span>
                  </div>

                  <h3 className="modulku-card__title">{mod.title}</h3>
                  <p className="modulku-card__subtitle">{mod.subtitle}</p>
                  <p className="modulku-card__desc">{mod.summary}</p>

                  <div className="modulku-card__meta">
                    <span>{SVG.clock} {mod.duration}</span>
                    <span>{SVG.target} {mod.target}</span>
                  </div>

                  <div className="modulku-card__tags">
                    {mod.features.map((feat, idx) => (
                      <span key={idx} className="modulku-tag">{SVG.check} {feat}</span>
                    ))}
                  </div>

                  <div className="modulku-card__actions">
                    <button
                      className="modulku-btn-primary"
                      onClick={() => setSelectedModule(mod)}
                      id={`btn-detail-${mod.id}`}
                    >
                      Jelajahi Modul →
                    </button>
                    {mod.externalTool && (
                      <a
                        href={mod.externalTool.link}
                        target={mod.externalTool.link.startsWith('http') ? '_blank' : '_self'}
                        rel="noreferrer"
                        className="modulku-btn-outline"
                        onClick={(e) => handleExternalClick(e, mod.externalTool)}
                      >
                        {mod.externalTool.label}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal Reader */}
      {selectedModule && (
        <div className="modulku-modal-overlay" onClick={() => setSelectedModule(null)}>
          <div className="modulku-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modulku-modal-close" onClick={() => setSelectedModule(null)} aria-label="Tutup">
              &times;
            </button>

            <div className="modulku-modal-header">
              <span className="modulku-modal-icon-badge">{selectedModule.icon}</span>
              <div className="modulku-modal-titles">
                <span className={`modulku-card__badge ${selectedModule.badgeClass}`}>
                  {selectedModule.stage} • {selectedModule.category}
                </span>
                <h3 className="modulku-modal-title">{selectedModule.title}</h3>
                <p className="modulku-modal-subtitle">{selectedModule.subtitle}</p>
              </div>
            </div>

            <div className="modulku-modal-body">
              <div className="modulku-modal-info-box">
                <div><strong>{SVG.clock} Durasi:</strong> {selectedModule.duration}</div>
                <div><strong>{SVG.target} Sasaran:</strong> {selectedModule.target}</div>
              </div>

              <div className="modulku-modal-section">
                <h4>Ringkasan Modul</h4>
                <p className="modulku-modal-desc">{selectedModule.summary}</p>
              </div>

              <div className="modulku-modal-section">
                <h4>Rincian Bab & Aktivitas</h4>
                <div className="modulku-chapters-list">
                  {selectedModule.chapters.map((chap, idx) => (
                    <div key={idx} className="modulku-chapter-item">
                      <h5>{chap.title}</h5>
                      <p>{chap.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modulku-modal-section">
                <h4>Fitur & Kit Pembelajaran</h4>
                <div className="modulku-features-grid">
                  {selectedModule.features.map((feat, idx) => (
                    <div key={idx} className="modulku-feature-chip">
                      {SVG.check} {feat}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modulku-modal-footer">
              <button
                className="modulku-btn-download"
                onClick={() => alert(`Mengunduh file PDF ${selectedModule.title}...`)}
              >
                {SVG.download} Unduh Modul Digital (PDF)
              </button>
              {selectedModule.externalTool && (
                <a
                  href={selectedModule.externalTool.link}
                  className="modulku-btn-link"
                  target={selectedModule.externalTool.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  onClick={(e) => {
                    handleExternalClick(e, selectedModule.externalTool);
                    setSelectedModule(null);
                  }}
                >
                  {SVG.link} {selectedModule.externalTool.label}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
