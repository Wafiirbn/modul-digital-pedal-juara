import React, { useState, useRef, useEffect } from 'react';
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
    category: 'Kebajikan Kemanusiaan',
    icon: GameSVG.heart,
    color: '#EC4899',
    description: 'Suka menolong, peduli pada sesama, dan menjaga perasaan teman.',
    actionTip: 'Berikan bantuan kecil pada teman tanpa menunggu diminta!'
  },
  {
    id: 's2',
    title: 'Keberanian (Bravery)',
    category: 'Kebajikan Keberanian',
    icon: GameSVG.lion,
    color: '#E8302A',
    description: 'Tangguh menghadapi rintangan dan berani membela kebenaran.',
    actionTip: 'Lakukan hal baik meskipun kamu merasa ragu atau malu!'
  },
  {
    id: 's3',
    title: 'Kreativitas (Creativity)',
    category: 'Kebajikan Kebijaksanaan',
    icon: GameSVG.palette,
    color: '#9B51E0',
    description: 'Menciptakan ide baru dan mengubah barang bekas menjadi karya.',
    actionTip: 'Coba olah 1 tutup botol plastik bekas menjadi kerajinan hari ini!'
  },
  {
    id: 's4',
    title: 'Kerja Sama (Teamwork)',
    category: 'Kebajikan Keadilan',
    icon: GameSVG.team,
    color: '#3DB54A',
    description: 'Rukun dalam kelompok, merangkul semua teman, dan adil.',
    actionTip: 'Ajak teman yang pemalu untuk ikut bermain bersama timmu!'
  },
  {
    id: 's5',
    title: 'Kepemimpinan (Leadership)',
    category: 'Kebajikan Keadilan',
    icon: GameSVG.compass,
    color: '#2D7DD2',
    description: 'Mengambil keputusan tenang dan memberikan solusi yang adil.',
    actionTip: 'Dengarkan pendapat dua belah pihak sebelum membuat keputusan.'
  },
  {
    id: 's6',
    title: 'Kegigihan (Perseverance)',
    category: 'Kebajikan Keberanian',
    icon: GameSVG.rocket,
    color: '#F59E0B',
    description: 'Pantang menyerah saat gagal dan selalu bersemangat mencoba.',
    actionTip: 'Jika eksperimenmu gagal, coba lagi dengan cara yang berbeda!'
  }
];

/* Ikon tambahan (tab & bintang) */
const DrawIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="3" width="14" height="18" rx="3" />
    <path d="M12 8.5l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4z" />
  </svg>
);
const CollectionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="8" rx="2" />
    <rect x="3" y="13" width="8" height="8" rx="2" /><rect x="13" y="13" width="8" height="8" rx="2" />
  </svg>
);
const StarIcon = ({ filled }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"
    fill={filled ? '#FBBF24' : '#ffffff'} stroke={filled ? '#F59E0B' : '#00d2ff'} strokeWidth="2" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const scoreLabels = [
  ['bravery', 'Berani', GameSVG.lion],
  ['kindness', 'Baik Hati', GameSVG.heart],
  ['creativity', 'Kreatif', GameSVG.palette],
  ['teamwork', 'Kompak', GameSVG.team],
  ['leadership', 'Bijak', GameSVG.compass],
  ['resilience', 'Gigih', GameSVG.rocket],
];

const emptyScores = { bravery: 0, kindness: 0, creativity: 0, teamwork: 0, leadership: 0, resilience: 0 };

const tabDescriptions = {
  draw: 'Tarik kartu misi, pilih tindakan juaramu, dan temukan karakter yang paling cocok denganmu.',
  deck: 'Kenali kekuatan karakter juara satu per satu, lalu coba aksi nyatanya hari ini.',
};

/* Nomor misi sudah ditampilkan di "Misi n dari 5", jadi dibuang dari judul kartu */
const cleanMissionTitle = (t) => t.replace(/^Kartu Misi \d+:\s*/, '');

export default function KartuSiapaAkuPage({ onNavigateToModulku }) {
  const [activeTab, setActiveTab] = useState('draw'); // 'draw' | 'deck'

  // Draw game state
  const [currentDrawIdx, setCurrentDrawIdx] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [stars, setStars] = useState(0);
  const [scores, setScores] = useState(emptyScores);
  const [gameFinished, setGameFinished] = useState(false);
  const [resultProfile, setResultProfile] = useState(null);
  const [alsoProfiles, setAlsoProfiles] = useState([]);
  const [finalScores, setFinalScores] = useState(emptyScores);
  const drawTimer = useRef(null);

  // Deck state
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => () => clearTimeout(drawTimer.current), []);

  const handleDrawCard = () => {
    setIsDrawing(true);
    clearTimeout(drawTimer.current);
    drawTimer.current = setTimeout(() => setIsDrawing(false), 400);
  };

  const handleChooseAction = (profileKey) => {
    const newScores = { ...scores, [profileKey]: scores[profileKey] + 1 };
    setScores(newScores);
    setStars(stars + 1);

    if (currentDrawIdx + 1 < missionCards.length) {
      setCurrentDrawIdx(currentDrawIdx + 1);
      handleDrawCard();
    } else {
      // Skor seri dipilih acak agar tidak selalu menguntungkan karakter yang sama
      const max = Math.max(...Object.values(newScores));
      const tied = Object.keys(newScores).filter(k => newScores[k] === max);
      const chosen = tied[Math.floor(Math.random() * tied.length)];
      setResultProfile(characterProfiles[chosen]);
      setAlsoProfiles(tied.filter(k => k !== chosen).map(k => characterProfiles[k]));
      setFinalScores(newScores);
      setGameFinished(true);
    }
  };

  const resetGame = () => {
    setCurrentDrawIdx(0);
    setStars(0);
    setScores(emptyScores);
    setGameFinished(false);
    setResultProfile(null);
    setAlsoProfiles([]);
    setFinalScores(emptyScores);
  };

  const toggleFlip = (id) => {
    setFlippedCards(prev => (prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]));
  };

  const mission = missionCards[currentDrawIdx];

  const renderPower = (values, title) => (
    <div className="ks-power">
      <h3 className="ks-power__title">{title}</h3>
      <ul className="ks-power__grid">
        {scoreLabels.map(([key, label, icon]) => (
          <li key={key} className={`ks-power__chip${values[key] > 0 ? ' ks-power__chip--on' : ''}`}>
            <span className="ks-power__icon">{icon}</span>
            <span className="ks-power__label">{label}</span>
            <span className="ks-power__count">{values[key]}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="ks-page">
      {/* ── Header ── */}
      <div className="ks-header">
        <h1 className="ks-header__title">Kartu Siapa Aku?</h1>
        <p className="ks-header__desc">{tabDescriptions[activeTab]}</p>

        <div className="ks-tabs" role="group" aria-label="Mode permainan">
          <button
            type="button"
            className={`ks-tab${activeTab === 'draw' ? ' ks-tab--active' : ''}`}
            aria-pressed={activeTab === 'draw'}
            onClick={() => setActiveTab('draw')}
            id="tab-draw-game"
          >
            <DrawIcon /> Tarik Kartu Misi
          </button>
          <button
            type="button"
            className={`ks-tab${activeTab === 'deck' ? ' ks-tab--active' : ''}`}
            aria-pressed={activeTab === 'deck'}
            onClick={() => setActiveTab('deck')}
            id="tab-deck-game"
          >
            <CollectionIcon /> Kartu Karakter
          </button>
        </div>
      </div>

      <div className="ks-content">

        {/* ═════ MODE 1: TARIK KARTU MISI ═════ */}
        {activeTab === 'draw' && !gameFinished && (
          <div className="ks-draw">
            <div className="ks-stage">
              <div className="ks-progress">
                <span className="ks-progress__text" aria-live="polite">
                  Misi {currentDrawIdx + 1} dari {missionCards.length}
                </span>
                <span className="ks-stars" role="img" aria-label={`Bintang karakter: ${stars} dari ${missionCards.length}`}>
                  {Array.from({ length: missionCards.length }).map((_, i) => (
                    <StarIcon key={i} filled={i < stars} />
                  ))}
                </span>
              </div>

              <div className={`ks-stack${isDrawing ? ' ks-stack--drawing' : ''}`}>
                <div className="ks-stack__back ks-stack__back--3" aria-hidden="true" />
                <div className="ks-stack__back ks-stack__back--2" aria-hidden="true" />
                <article className="ks-mission">
                  <div className="ks-mission__top">
                    <span className="ks-pill ks-pill--cyan">Kartu misi</span>
                    <span className="ks-mission__brand">Pedal Juara</span>
                  </div>
                  <h2 className="ks-mission__title">{cleanMissionTitle(mission.title)}</h2>
                  <p className="ks-mission__scenario">{mission.scenario}</p>
                  <p className="ks-mission__foot">Pilih satu tindakan juaramu.</p>
                </article>
              </div>
            </div>

            <div className="ks-panel">
              <h2 className="ks-panel__title">Apa tindakan juaramu?</h2>
              <p className="ks-panel__sub">Pilihanmu menentukan karakter akhirmu.</p>

              <div className="ks-options">
                {mission.options.map((opt, idx) => (
                  <button
                    type="button"
                    key={`${mission.id}-${idx}`}
                    className="ks-option"
                    onClick={() => handleChooseAction(opt.profile)}
                  >
                    <span className="ks-pill ks-pill--tag">{opt.label}</span>
                    <span className="ks-option__text">{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="ks-board">
              {renderPower(scores, 'Papan kekuatan sementara')}
            </div>
          </div>
        )}

        {/* ═════ HASIL ═════ */}
        {activeTab === 'draw' && gameFinished && resultProfile && (
          <article className="ks-result" aria-labelledby="ks-result-title">
            <div className="ks-result__hero" style={{ '--ks-accent': resultProfile.badgeColor }}>
              <span className="ks-pill ks-pill--white">
                {GameSVG.trophy} Kartu juara saya
              </span>
              <div className="ks-result__avatar">{resultProfile.icon}</div>
              <h2 id="ks-result-title" className="ks-result__title">{resultProfile.title}</h2>
              <p className="ks-result__tagline">{resultProfile.tagline}</p>
            </div>

            {alsoProfiles.length > 0 && (
              <p className="ks-result__also">
                Skormu seimbang! Kamu juga kuat sebagai{' '}
                <strong>{alsoProfiles.map(p => p.title).join(' dan ')}</strong>.
              </p>
            )}

            <div className="ks-result__grid">
              <div className="ks-result__box">
                <h3>Gambaran karaktermu</h3>
                <p>{resultProfile.description}</p>
              </div>
              <div className="ks-result__box">
                <h3>Kekuatan utamamu</h3>
                <ul className="ks-result__list">
                  {resultProfile.strengths.map((s, i) => (
                    <li key={i}>{GameSVG.check}<span>{s}</span></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="ks-result__tip">
              <strong>Langkah juara berikutnya</strong>
              <p>{resultProfile.tip}</p>
            </div>

            <div className="ks-result__scores">
              {renderPower(finalScores, 'Skor kekuatanmu')}
            </div>

            <div className="ks-result__actions">
              <button type="button" className="ks-btn ks-btn--primary" onClick={resetGame}>
                {GameSVG.refresh} Main lagi
              </button>
              <button type="button" className="ks-btn ks-btn--outline" onClick={() => setActiveTab('deck')}>
                <CollectionIcon /> Lihat kartu karakter
              </button>
              {onNavigateToModulku && (
                <button type="button" className="ks-btn ks-btn--text" onClick={onNavigateToModulku}>
                  Kembali ke Modulku
                </button>
              )}
            </div>
          </article>
        )}

        {/* ═════ MODE 2: KARTU KARAKTER ═════ */}
        {activeTab === 'deck' && (
          <div className="ks-deck">
            <h2 className="ks-deck__title">Kartu Karakter Juara</h2>
            <p className="ks-deck__desc">Ketuk kartu untuk membaliknya dan baca aksi nyata yang bisa kamu lakukan.</p>

            <div className="ks-deck__grid">
              {seligmanDeck.map((card) => {
                const isFlipped = flippedCards.includes(card.id);
                return (
                  <button
                    type="button"
                    key={card.id}
                    className={`ks-flip${isFlipped ? ' ks-flip--flipped' : ''}`}
                    aria-pressed={isFlipped}
                    onClick={() => toggleFlip(card.id)}
                    style={{ '--ks-accent': card.color }}
                  >
                    <span className="ks-flip__inner">
                      <span className="ks-flip__face ks-flip__front" aria-hidden={isFlipped}>
                        <span className="ks-pill ks-pill--cyan">{card.category}</span>
                        <span className="ks-flip__icon">{card.icon}</span>
                        <span className="ks-flip__name">{card.title}</span>
                        <span className="ks-flip__hint">Ketuk untuk membalik</span>
                      </span>
                      <span className="ks-flip__face ks-flip__back" aria-hidden={!isFlipped}>
                        <span className="ks-flip__back-head">
                          <span className="ks-flip__icon ks-flip__icon--sm">{card.icon}</span>
                          <span className="ks-flip__back-title">{card.title}</span>
                        </span>
                        <span className="ks-flip__desc">{card.description}</span>
                        <span className="ks-flip__action">
                          <strong>Aksi nyata</strong>
                          {card.actionTip}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
