import React, { useState } from 'react';
import './KartuSiapaAkuPage.css';

// Handcrafted SVG Icons (NO raw emojis!)
const GameSVG = {
  lion: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8302A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
      <path d="M12 6a4 4 0 0 0-4 4c0 2 2 3 4 5 2-2 4-3 4-5a4 4 0 0 0-4-4z"/>
    </svg>
  ),
  heart: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  palette: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9B51E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="#9B51E0"/>
      <circle cx="17.5" cy="10.5" r=".5" fill="#9B51E0"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="#9B51E0"/>
      <circle cx="6.5" cy="12.5" r=".5" fill="#9B51E0"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.65 1.9-1.54a1.86 1.86 0 0 0-.48-1.74l-.24-.25a1.86 1.86 0 0 1 .52-2.97l.76-.38A4 4 0 0 0 17 11.5V11c0-5-3.8-9-5-9z"/>
    </svg>
  ),
  team: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3DB54A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  compass: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D7DD2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
  rocket: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z"/>
    </svg>
  ),
  star: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  cards: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="14" height="16" rx="2" ry="2"/>
      <path d="M6 2h14a2 2 0 0 1 2 2v14"/>
    </svg>
  ),
  draw: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9"/>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  ),
  check: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  refresh: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
  trophy: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34"/>
      <path d="M18 4H6v7a6 6 0 0 0 12 0V4z"/>
    </svg>
  )
};

// Character Profiles
const characterProfiles = {
  bravery: {
    title: 'Si Pemberani',
    icon: GameSVG.lion,
    badgeColor: '#E8302A',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #E8302A 100%)',
    tagline: 'Memiliki Keberanian & Keteguhan Hati yang Luar Biasa!',
    description: 'Kamu tidak takut mencoba hal-hal baru dan berani menyampaikan kebenaran. Kamu adalah anak yang percaya diri, tangguh, dan siap menghadapi tantangan di depan mata!',
    strengths: ['Berani Tampil di Depan', 'Jujur & Mengakui Kesalahan', 'Tangguh Menghadapi Rintangan'],
    tip: 'Teruslah gunakan keberanianmu untuk membela teman yang butuh pertolongan dan mencoba karya-karya baru!'
  },
  kindness: {
    title: 'Si Sahabat Baik',
    icon: GameSVG.heart,
    badgeColor: '#EC4899',
    gradient: 'linear-gradient(135deg, #F472B6 0%, #DB2777 100%)',
    tagline: 'Penuh Empati, Kasih Sayang & Kepedulian!',
    description: 'Kamu selalu peduli pada perasaan teman-teman di sekitarmu. Kehadiranmu menghangatkan suasana dan membuat siapapun merasa diterima dan dihargai.',
    strengths: ['Suka Menolong Tanpa Pamrih', 'Pendengar yang Baik', 'Penyayang Lingkungan & Sesama'],
    tip: 'Kebaikan hatimu adalah kekuatan super! Terus tebarkan senyuman dan bantuan kecil setiap hari.'
  },
  creativity: {
    title: 'Si Kreatif Inovatif',
    icon: GameSVG.palette,
    badgeColor: '#9B51E0',
    gradient: 'linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)',
    tagline: 'Kaya Imajinasi & Selalu Punya Ide Unik!',
    description: 'Kamu melihat dunia dengan cara yang luar biasa! Kamu pandai mengolah barang sederhana menjadi karya menarik dan selalu punya solusi unik untuk masalah.',
    strengths: ['Punya Banyak Ide Baru', 'Suka Mengolah Barang Sisa', 'Ekspresif & Penuh Imajinasi'],
    tip: 'Asah terus kreativitasmu dengan bereksperimen mengolah limbah daur ulang menjadi benda berguna!'
  },
  teamwork: {
    title: 'Si Kapten Kolaboratif',
    icon: GameSVG.team,
    badgeColor: '#3DB54A',
    gradient: 'linear-gradient(135deg, #4ADE80 0%, #16A34A 100%)',
    tagline: 'Jago Bekerja Sama & Menjaga Kebersamaan!',
    description: 'Kamu adalah perekat dalam tim! Kamu tahu cara merangkul semua teman agar bisa bekerja sama dengan adil, seru, dan kompak.',
    strengths: ['Menghargai Pendapat Teman', 'Bisa Bekerja Sama dengan Siapa Saja', 'Adil dalam Bermain'],
    tip: 'Pertahankan sifat merangkulmu agar tim di kelas atau bazar selalu solid dan menyenangkan!'
  },
  leadership: {
    title: 'Si Pemimpin Bijak',
    icon: GameSVG.compass,
    badgeColor: '#2D7DD2',
    gradient: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
    tagline: 'Cerdas Mengambil Keputusan & Menjadi Teladan!',
    description: 'Kamu memiliki pemikiran yang tenang dan bijaksana. Saat terjadi masalah, kamu bisa berpikir jernih dan memberikan jalan keluar terbaik untuk bersama.',
    strengths: ['Penengah yang Adil', 'Cepat Mengambil Solusi', 'Dapat Dipercaya'],
    tip: 'Gunakan kemampuan memimpinmu untuk mengajak teman-teman melakukan aksi baik bagi sekolah!'
  },
  resilience: {
    title: 'Si Pantang Menyerah',
    icon: GameSVG.rocket,
    badgeColor: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
    tagline: 'Penuh Semangat, Gigih & Pantang Mundur!',
    description: 'Bagi kamu, kegagalan hanyalah batu loncatan! Kamu selalu bersemangat mencoba lagi sampai berhasil mencapai tujuanmu.',
    strengths: ['Pantang Putus Asa', 'Enerjik & Bersemangat Tinggi', 'Selalu Belajar dari Kesalahan'],
    tip: 'Semangat pantang menyerahmu sangat menginspirasi! Tetap konsisten dan bantu beri semangat pada temanmu yang ragu.'
  }
};

// Interactive Mission Cards Deck
const missionCards = [
  {
    id: 1,
    title: 'Kartu Misi 1: Sambutan Teman Baru',
    scenario: 'Di sekolah, kamu melihat seorang teman baru duduk sendirian saat jam istirahat. Apa tindakan juaramu?',
    options: [
      { text: 'Mendatangi & mengajak mengobrol serta berbagi makanan bersama.', profile: 'kindness', label: 'Aksi Empati & Kebaikan' },
      { text: 'Mengajaknya masuk ke kelompok permainan seru agar ramah bersama!', profile: 'teamwork', label: 'Aksi Merangkul Tim' },
      { text: 'Membuatkan gambar ucapan selamat datang yang lucu untuknya.', profile: 'creativity', label: 'Aksi Karya Kreatif' }
    ]
  },
  {
    id: 2,
    title: 'Kartu Misi 2: Lokakarya Sampah Plastik',
    scenario: 'Kelompokmu mendapat tugas mengolah tutup botol bekas menjadi karya berguna. Apa peran pilihanmu?',
    options: [
      { text: 'Mengusulkan ide bentuk unik dan menghiasnya dengan warna-warni menarik.', profile: 'creativity', label: 'Desainer Kreatif' },
      { text: 'Memimpin pembagian tugas agar semua teman mendapat bagian yang adil.', profile: 'leadership', label: 'Ketua Tim Bijak' },
      { text: 'Terus mencoba memotong & merangkai botol sampai rapi meskipun agak sulit.', profile: 'resilience', label: 'Eksekutor Gigih' }
    ]
  },
  {
    id: 3,
    title: 'Kartu Misi 3: Tantangan Tampil Di Depan',
    scenario: 'Saat diminta tampil bercerita di depan kelas, apa yang kamu rasakan dan lakukan?',
    options: [
      { text: 'Tarik napas dalam-dalam, tersenyum, lalu melangkah berani ke depan!', profile: 'bravery', label: 'Keberanian Utama' },
      { text: 'Menyampaikan cerita dengan gaya lucu dan kreasi suara yang ceria.', profile: 'creativity', label: 'Ekspresi Kreatif' },
      { text: 'Fokus menceritakan pengalaman kebaikan bersama teman-teman.', profile: 'kindness', label: 'Kisah Sahabat' }
    ]
  },
  {
    id: 4,
    title: 'Kartu Misi 4: Resolusi Perselisihan',
    scenario: 'Ada dua temanmu yang berselisih memperebutkan alat lukis di kelas. Kamu akan...',
    options: [
      { text: 'Mendengarkan mereka dengan tenang lalu memberikan solusi pakai bergantian.', profile: 'leadership', label: 'Penengah Adil' },
      { text: 'Mengajak mereka melukis dalam satu kertas besar bersama secara tim!', profile: 'teamwork', label: 'Solusi Kolaboratif' },
      { text: 'Menghibur mereka dengan kehangatan dan mengajak saling meminta maaf.', profile: 'kindness', label: 'Kedamaian Sahabat' }
    ]
  },
  {
    id: 5,
    title: 'Kartu Misi 5: Teka-teki & Tantangan Baru',
    scenario: 'Ketika menemui permainan atau soal teka-teki sulit yang belum pernah kamu coba...',
    options: [
      { text: 'Penasaran banget! Terus mengotak-atik berkali-kali sampai berhasil menemukan jawabannya.', profile: 'resilience', label: 'Semangat Gigih' },
      { text: 'Berani langsung mencoba tanpa takut salah untuk membuktikannya!', profile: 'bravery', label: 'Langkah Berani' },
      { text: 'Mengajak teman-teman berdiskusi bersama menemukan jawabannya.', profile: 'teamwork', label: 'Diskusi Kelompok' }
    ]
  }
];

// 3D Seligman Character Deck
const seligmanDeck = [
  {
    id: 's1',
    title: 'Kebaikan Hati (Kindness)',
    category: 'Kebijakan Kemanusiaan',
    icon: GameSVG.heart,
    color: '#EC4899',
    description: 'Suka menolong, peduli pada sesama, dan menjaga perasaan teman.',
    actionTip: 'Berikan bantuan kecil pada teman tanpa menunggu diminta!'
  },
  {
    id: 's2',
    title: 'Keberanian (Bravery)',
    category: 'Kebijakan Keberanian',
    icon: GameSVG.lion,
    color: '#E8302A',
    description: 'Tangguh menghadapi rintangan dan berani membela kebenaran.',
    actionTip: 'Lakukan hal baik meskipun kamu merasa ragu atau malu!'
  },
  {
    id: 's3',
    title: 'Kreativitas (Creativity)',
    category: 'Kebijakan Kebijaksanaan',
    icon: GameSVG.palette,
    color: '#9B51E0',
    description: 'Menciptakan ide baru dan mengubah barang bekas menjadi karya.',
    actionTip: 'Coba olah 1 tutup botol plastik bekas menjadi kerajinan hari ini!'
  },
  {
    id: 's4',
    title: 'Kerja Sama (Teamwork)',
    category: 'Kebijakan Keadilan',
    icon: GameSVG.team,
    color: '#3DB54A',
    description: 'Rukun dalam kelompok, merangkul semua teman, dan adil.',
    actionTip: 'Ajak teman yang pemalu untuk ikut bermain bersama timmu!'
  },
  {
    id: 's5',
    title: 'Kebijaksanaan (Leadership)',
    category: 'Kebijakan Kepemimpinan',
    icon: GameSVG.compass,
    color: '#2D7DD2',
    description: 'Mengambil keputusan tenang dan memberikan solusi yang adil.',
    actionTip: 'Dengarkan pendapat dua belah pihak sebelum membuat keputusan.'
  },
  {
    id: 's6',
    title: 'Kegigihan (Perseverance)',
    category: 'Kebijakan Keteguhan',
    icon: GameSVG.rocket,
    color: '#F59E0B',
    description: 'Pantang menyerah saat gagal dan selalu bersemangat mencoba.',
    actionTip: 'Jika eksperimenmu gagal, coba lagi dengan cara yang berbeda!'
  }
];

export default function KartuSiapaAkuPage({ onBackToHome, onNavigateToModulku }) {
  const [activeTab, setActiveTab] = useState('draw'); // 'draw' | 'deck'

  // Draw Game State
  const [currentDrawIdx, setCurrentDrawIdx] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [stars, setStars] = useState(0);
  const [scores, setScores] = useState({
    bravery: 0,
    kindness: 0,
    creativity: 0,
    teamwork: 0,
    leadership: 0,
    resilience: 0
  });
  const [gameFinished, setGameFinished] = useState(false);
  const [resultProfile, setResultProfile] = useState(null);

  // Deck State
  const [flippedCards, setFlippedCards] = useState([]);

  // Draw Card Handler
  const handleDrawCard = () => {
    setIsDrawing(true);
    setTimeout(() => {
      setIsDrawing(false);
    }, 400);
  };

  const handleChooseAction = (profileKey) => {
    const newScores = { ...scores, [profileKey]: scores[profileKey] + 1 };
    setScores(newScores);
    setStars(stars + 1);

    if (currentDrawIdx + 1 < missionCards.length) {
      setCurrentDrawIdx(currentDrawIdx + 1);
      handleDrawCard();
    } else {
      // Find top score profile
      let topProfile = 'kindness';
      let maxScore = -1;
      Object.keys(newScores).forEach(key => {
        if (newScores[key] > maxScore) {
          maxScore = newScores[key];
          topProfile = key;
        }
      });
      setResultProfile(characterProfiles[topProfile]);
      setGameFinished(true);
    }
  };

  const resetGame = () => {
    setCurrentDrawIdx(0);
    setStars(0);
    setScores({ bravery: 0, kindness: 0, creativity: 0, teamwork: 0, leadership: 0, resilience: 0 });
    setGameFinished(false);
    setResultProfile(null);
  };

  // Flip 3D card
  const toggleFlip = (id) => {
    if (flippedCards.includes(id)) {
      setFlippedCards(flippedCards.filter(c => c !== id));
    } else {
      setFlippedCards([...flippedCards, id]);
    }
  };

  return (
    <div className="siapa-aku-page">
      {/* Hero Header */}
      <section className="siapa-aku-hero">
        <div className="siapa-aku-hero__container">
          <div className="siapa-aku-nav-buttons">
            <button className="siapa-aku-back-btn" onClick={onBackToHome} id="btn-back-home">
              ← Beranda
            </button>
            <button className="siapa-aku-modul-btn" onClick={onNavigateToModulku} id="btn-to-modulku">
              {GameSVG.cards} Lihat Modul Digital
            </button>
          </div>

          <div className="siapa-aku-hero__header">
            <div className="siapa-aku-hero__badge">
              <span>Arena Karakter Pedal Juara</span>
            </div>
            <h1 className="siapa-aku-hero__title">
              Kartu <span className="highlight-pedal">SIAPA</span> <span className="highlight-juara">AKU?</span>
            </h1>
            <p className="siapa-aku-hero__subtitle">
              Kocok & tarik kartu misi karaktermu! Selesaikan tantangan untuk mengumpulkan Bintang Karakter dan temukan profil Juaramu.
            </p>

            {/* Game Mode Selector */}
            <div className="siapa-aku-tab-selector">
              <button
                className={`siapa-aku-tab-btn ${activeTab === 'draw' ? 'active' : ''}`}
                onClick={() => setActiveTab('draw')}
                id="tab-draw-game"
              >
                {GameSVG.draw} Tarik Kartu Misi
              </button>
              <button
                className={`siapa-aku-tab-btn ${activeTab === 'deck' ? 'active' : ''}`}
                onClick={() => setActiveTab('deck')}
                id="tab-deck-game"
              >
                {GameSVG.cards} Geladak Kartu 3D
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Game Arena */}
      <section className="siapa-aku-content">
        <div className="siapa-aku-container">

          {/* MODE 1: PHYSICAL CARD DRAW QUEST */}
          {activeTab === 'draw' && (
            <div className="siapa-aku-draw-arena">
              {!gameFinished ? (
                <div className="draw-layout">
                  {/* Left: Physical Card Deck Stage */}
                  <div className="draw-card-stage">
                    <div className="draw-score-badge">
                      <span>Bintang Karakter: <strong>{stars}</strong></span>
                      <div className="stars-row">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`star-item ${i < stars ? 'earned' : ''}`}>
                            {GameSVG.star}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stacked Physical Card Animation */}
                    <div className={`physical-card-stack ${isDrawing ? 'drawing' : ''}`}>
                      <div className="stack-card stack-card-3" />
                      <div className="stack-card stack-card-2" />
                      <div className="stack-card stack-card-1">
                        <div className="card-inner-front">
                          <div className="card-top-bar">
                            <span className="card-misi-tag">TANTANGAN {currentDrawIdx + 1}/5</span>
                            <span className="card-logo-tag">PEDAL JUARA</span>
                          </div>

                          <div className="card-body-content">
                            <h3 className="card-misi-title">{missionCards[currentDrawIdx].title}</h3>
                            <p className="card-misi-scenario">{missionCards[currentDrawIdx].scenario}</p>
                          </div>

                          <div className="card-bottom-bar">
                            <span>Pilih Tindakan Juaramu Di Samping →</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Decision Options & Power Meters */}
                  <div className="draw-options-panel">
                    <h3 className="panel-title">Apa Tindakan Juaramu?</h3>
                    <p className="panel-sub">Pilih salah satu langkah di bawah untuk menentukan karaktermu:</p>

                    <div className="options-stack">
                      {missionCards[currentDrawIdx].options.map((opt, idx) => (
                        <button
                          key={idx}
                          className="action-option-card"
                          onClick={() => handleChooseAction(opt.profile)}
                        >
                          <span className="action-label-chip">{opt.label}</span>
                          <p className="action-text">{opt.text}</p>
                        </button>
                      ))}
                    </div>

                    {/* Live Power Dashboard */}
                    <div className="power-dashboard">
                      <h4 className="dashboard-title">Papan Kekuatan Sementara:</h4>
                      <div className="dashboard-grid">
                        <div className="power-chip">
                          <span className="chip-icon">{GameSVG.lion}</span>
                          <span className="chip-label">Berani ({scores.bravery})</span>
                        </div>
                        <div className="power-chip">
                          <span className="chip-icon">{GameSVG.heart}</span>
                          <span className="chip-label">Baik ({scores.kindness})</span>
                        </div>
                        <div className="power-chip">
                          <span className="chip-icon">{GameSVG.palette}</span>
                          <span className="chip-label">Kreatif ({scores.creativity})</span>
                        </div>
                        <div className="power-chip">
                          <span className="chip-icon">{GameSVG.team}</span>
                          <span className="chip-label">Kompak ({scores.teamwork})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* RESULT CHAMPION CARD */
                <div className="siapa-aku-result-card" style={{ '--result-theme': resultProfile.badgeColor }}>
                  <div className="result-card-inner">
                    <div className="result-badge-header">
                      <span className="result-trophy">{GameSVG.trophy}</span>
                      <span className="result-badge-title">KARTU JUARA SAYA</span>
                    </div>

                    <div className="result-hero-box" style={{ background: resultProfile.gradient }}>
                      <div className="result-avatar-wrap">
                        {resultProfile.icon}
                      </div>
                      <h2 className="result-hero-title">{resultProfile.title}</h2>
                      <p className="result-hero-tagline">{resultProfile.tagline}</p>
                    </div>

                    <div className="result-details-grid">
                      <div className="result-detail-box">
                        <h4>Gambaran Karaktermu:</h4>
                        <p>{resultProfile.description}</p>
                      </div>

                      <div className="result-detail-box">
                        <h4>Kekuatan Utama Kamu:</h4>
                        <ul className="result-strengths-list">
                          {resultProfile.strengths.map((str, i) => (
                            <li key={i}>{GameSVG.check} {str}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="result-tip-banner">
                      <strong>Langkah Juara Berikutnya:</strong>
                      <p>{resultProfile.tip}</p>
                    </div>

                    <div className="result-actions-bar">
                      <button className="btn-result-reset" onClick={resetGame}>
                        {GameSVG.refresh} Main Lagi
                      </button>
                      <button className="btn-result-deck" onClick={() => setActiveTab('deck')}>
                        {GameSVG.cards} Lihat Geladak Kartu 3D
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODE 2: 3D SELIGMAN CARD DECK */}
          {activeTab === 'deck' && (
            <div className="siapa-aku-deck-arena">
              <div className="deck-arena-header">
                <h2>Geladak Kartu 24 Character Strengths (Seligman)</h2>
                <p>Klik kartu fisik di bawah ini untuk membalikkan (flip 3D) dan mempelajari kekuatan karakter!</p>
              </div>

              <div className="deck-cards-grid">
                {seligmanDeck.map((card) => {
                  const isFlipped = flippedCards.includes(card.id);
                  return (
                    <div
                      key={card.id}
                      className={`seligman-card-wrap ${isFlipped ? 'flipped' : ''}`}
                      onClick={() => toggleFlip(card.id)}
                    >
                      <div className="seligman-card-inner">
                        {/* FRONT FACE */}
                        <div className="seligman-face face-front">
                          <div className="face-header">
                            <span className="face-category">{card.category}</span>
                          </div>
                          <div className="face-body">
                            <div className="face-icon-wrap" style={{ borderColor: card.color }}>
                              {card.icon}
                            </div>
                            <h3 className="face-title">{card.title}</h3>
                          </div>
                          <div className="face-footer">
                            <span>Klik untuk Balik Kartu 🔄</span>
                          </div>
                        </div>

                        {/* BACK FACE */}
                        <div className="seligman-face face-back" style={{ '--card-accent': card.color }}>
                          <div className="face-back-header">
                            <span className="face-back-icon">{card.icon}</span>
                            <span className="face-back-badge">{card.title}</span>
                          </div>
                          <p className="face-back-desc">{card.description}</p>
                          <div className="face-back-action">
                            <strong>Aksi Nyata:</strong>
                            <p>{card.actionTip}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
