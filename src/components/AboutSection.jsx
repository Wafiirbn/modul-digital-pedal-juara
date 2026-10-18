import React, { useState } from 'react';
import './AboutSection.css';

// SVG Icons to replace emojis
const StepIcons = {
  rocket: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z" />
    </svg>
  ),
  compass: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D7DD2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  recycle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3DB54A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="7 19 3 19 3 15" />
      <path d="M13 19h4a2 2 0 0 0 1.83-1.2l2.35-5.3a2 2 0 0 0-.58-2.35l-3.3-2.65a2 2 0 0 0-2.6 0l-3.3 2.65a2 2 0 0 0-.58 2.35l2.35 5.3A2 2 0 0 0 13 19z" />
      <path d="M4 14.5A7.5 7.5 0 0 1 12 4.5c3.2 0 6 2 7 5" />
    </svg>
  ),
  video: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9B51E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  palette: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8302A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="#E8302A" />
      <circle cx="17.5" cy="10.5" r=".5" fill="#E8302A" />
      <circle cx="8.5" cy="7.5" r=".5" fill="#E8302A" />
      <circle cx="6.5" cy="12.5" r=".5" fill="#E8302A" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.65 1.9-1.54a1.86 1.86 0 0 0-.48-1.74l-.24-.25a1.86 1.86 0 0 1 .52-2.97l.76-.38A4 4 0 0 0 17 11.5V11c0-5-3.8-9-5-9z" />
    </svg>
  ),
  trophy: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F2994A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34" />
      <path d="M18 4H6v7a6 6 0 0 0 12 0V4z" />
    </svg>
  ),
  star: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00A896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
};

/**
 * Warna gradient unik per tahap untuk background kartu.
 * Format: [dari, ke] — bisa kamu sesuaikan.
 */
const stepGradients = [
  ['#1A1A5E', '#4A00E0'],   // Tahap 1 – ungu gelap ke neon
  ['#0A3C7E', '#00C6FF'],   // Tahap 2 – biru navy ke cyan
  ['#134E00', '#56C300'],   // Tahap 3 – hijau tua ke lime
  ['#5C0D0D', '#FF416C'],   // Tahap 4 – merah tua ke pink
  ['#004E64', '#00B4D8'],   // Tahap 5 – teal ke biru langit
  ['#4A2800', '#F7971E'],   // Tahap 6 – coklat tua ke oranye
  ['#1B0041', '#A855F7'],   // Tahap 7 – ungu gelap ke lavender
];

const programSteps = [
  {
    step: 1,
    label: 'Pra-Acara',
    subtitle: 'Persiapan dan pengenalan program',
    icon: StepIcons.rocket,
    /**
     * Taruh foto kegiatan di /public/steps/
     * Contoh: /steps/step1.jpg
     * Jika kosong, hanya gradient yang tampil.
     */
    photo: './step1.png',
    desc: 'Rangkaian pra-acara menjadi tahap awal untuk memperkenalkan program sekaligus membangun kedekatan dengan peserta. Kegiatan diawali dengan sosialisasi, kemudian dilanjutkan pemetaan kondisi awal melalui asesmen dan permainan kartu karakter "Siapa Aku". Melalui rangkaian ini, peserta mulai mengenali karakter dan kekuatan dirinya sebagai dasar pendampingan pada kegiatan berikutnya.',
    objective: 'Membangun kesiapan dan antusiasme peserta serta mengenali kondisi awal dan kekuatan karakter mereka.',
  },
  {
    step: 2,
    label: 'Jelajah Peta Karakter',
    subtitle: 'Eksplorasi karakter, literasi, dan numerasi',
    icon: StepIcons.compass,
    photo: './step2.png',
    desc: 'Peserta diajak mengeksplorasi kekuatan karakter melalui permainan, studi kasus, serta aktivitas literasi dan numerasi. Peserta belajar mengenali potensi diri sekaligus menggunakannya untuk memecahkan masalah, mengambil keputusan, dan menyelesaikan tugas secara kolaboratif.',
    objective: 'Mengenalkan character strengths sekaligus menguatkan kemampuan literasi, numerasi, dan pemecahan masalah.',
  },
  {
    step: 3,
    label: 'Lokakarya Eksplorasi Sisa',
    subtitle: 'Mengubah barang bekas menjadi karya bernilai',
    icon: StepIcons.recycle,
    photo: './step1.png',
    desc: 'Peserta diajak melihat barang bekas dari sudut pandang baru dengan mengolah tutup botol plastik menjadi gantungan kunci. Melalui praktik langsung, peserta mengembangkan kreativitas dan keterampilan produksi sekaligus mengenali potensi ekonomi dari barang yang sebelumnya dianggap tidak bernilai.',
    objective: 'Mengembangkan kreativitas, keterampilan produksi, kepedulian lingkungan, dan jiwa kewirausahaan.',
  },
  {
    step: 4,
    label: 'Lokakarya Citra Juara',
    subtitle: 'Membangun identitas dan talenta digital',
    icon: StepIcons.video,
    photo: './step2.png',
    desc: 'Peserta mulai mengenalkan diri dan karya yang telah dibuat melalui pembuatan label personal, label produk, dan konten promosi digital. Kegiatan ini menjadi ruang bagi peserta untuk berlatih berkomunikasi, tampil di depan kamera, dan mempromosikan karya dengan lebih percaya diri.',
    objective: 'Meningkatkan kepercayaan diri, kemampuan komunikasi, dan keterampilan promosi produk.',
  },
  {
    step: 5,
    label: 'Lokakarya Reka Ruang',
    subtitle: 'Berkreasi untuk lingkungan belajar',
    icon: StepIcons.palette,
    photo: './step1.png',
    desc: 'Peserta berkolaborasi mengolah limbah plastik menjadi dekorasi untuk ruang kelas dan stan bazar. Selain menghasilkan karya, kegiatan ini mendorong peserta untuk bekerja sama, menuangkan ide kreatif, dan membangun rasa memiliki terhadap lingkungan sekolah.',
    objective: 'Mengembangkan kreativitas, kolaborasi, dan rasa memiliki terhadap lingkungan sekolah.',
  },
  {
    step: 6,
    label: 'Bazaar Karya Juara',
    subtitle: 'Menerapkan keterampilan dalam pengalaman nyata',
    icon: StepIcons.trophy,
    photo: './step2.png',
    desc: 'Peserta mempraktikkan keterampilan kewirausahaan melalui mini bazar dengan berperan langsung sebagai penjual. Mereka belajar menata stan, mengenalkan produk, berinteraksi dengan pembeli, serta bekerja sama dalam menjalankan kegiatan penjualan.',
    objective: 'Melatih keberanian, komunikasi, kerja sama, dan keterampilan kewirausahaan melalui praktik langsung.',
  },
  {
    step: 7,
    label: 'Gema Masa Depan',
    subtitle: 'Refleksi, apresiasi, dan pemetaan masa depan',
    icon: StepIcons.star,
    photo: './step1.png',
    desc: 'Sebagai penutup, peserta diajak melihat kembali perjalanan dan perubahan yang telah mereka alami melalui photovoice, refleksi, post-test, dan pemetaan masa depan. Peserta menyusun papan impian berdasarkan potensi yang telah ditemukan dan menerima portofolio sebagai bentuk apresiasi atas proses belajar mereka.',
    objective: 'Merefleksikan perkembangan diri, memperkuat karakter, dan membangun keberanian untuk merencanakan masa depan.',
  },
];

export default function AboutSection({ onNavigateToModulku }) {
  const [selectedStep, setSelectedStep] = useState(null);

  const openStepDetail = (stepObj) => {
    setSelectedStep(stepObj);
  };

  const closeStepDetail = () => {
    setSelectedStep(null);
  };

  return (
    <section className="about" id="tentang-kami">
      <div className="about__container">
        {/* Badge title */}
        <div className="about__badge" id="about-badge">
          <span>Yuk kenalan dengan pedal juara!</span>
        </div>

        {/* Main card */}
        <div className="about__card">
          {/* Left: Illustration */}
          <div className="about__illustration">
            <img
              src="/kid-star.png"
              alt="Ilustrasi anak melompat menuju bintang di atas buku terbuka"
              className="about__img"
            />
          </div>

          {/* Right: Description */}
          <div className="about__text">
            <h2 className="about__heading">Apa itu Pedal Juara?</h2>
            <p className="about__desc">
              Pedal Juara adalah sebuah Program Kreativitas Mahasiswa bidang Pengabdian Masyarakat yang berfokus
              pada keberlanjutan pendidikan yang dirancang khusus untuk anak-anak, menggabungkan pendekatan <strong>Experiential Learning</strong> dari
              David Kolb, <strong>Kekuatan Karakter</strong> dari Martin Seligman, dan nilai-nilai
              <strong> Kewirausahaan Lingkungan</strong> dengan penyelenggaraan yang menyenangkan dan interaktif.
            </p>
            <p className="about__desc">
              Melalui pembelajaran praktis yang engaging, anak-anak diajak untuk mengenal potensi diri,
              membangun karakter yang kuat, dan menumbuhkan kepedulian terhadap lingkungan sejak dini.
            </p>
            <a
              href="#modulku"
              className="about__cta"
              id="about-cta"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToModulku) onNavigateToModulku();
              }}
            >
              Jelajahi Modul →
            </a>
          </div>
        </div>

        {/* Stepper Title & Subtitle */}
        <div className="about__stepper-header">
          <h3 className="about__stepper-title">Rangkaian Program Pedal Juara</h3>
          <p className="about__stepper-sub">Klik angka 1 – 7 di bawah untuk melihat rincian setiap tahap kegiatan</p>
        </div>

        {/* Step indicator */}
        <div className="about__stepper" id="about-stepper">
          {programSteps.map((item, idx) => (
            <React.Fragment key={item.step}>
              <button
                className={`about__step ${selectedStep?.step === item.step ? 'about__step--active' : ''}`}
                onClick={() => openStepDetail(item)}
                title={`Klik untuk melihat detail ${item.title}`}
                aria-label={`Tahap ${item.step}`}
              >
                <span>{item.step}</span>
              </button>
              {idx < programSteps.length - 1 && <div className="about__step-line" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Program Step Detail Modal */}
      {selectedStep && (
        <div className="about__modal-overlay" onClick={closeStepDetail}>
          <div className="about__modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="about__modal-close" onClick={closeStepDetail} aria-label="Tutup">
              &times;
            </button>

            {/* ── Hero: foto tanpa gradient, foto pojok kiri ── */}
            <div className="about__modal-hero">
              {/* Foto kegiatan */}
              {selectedStep.photo && (
                <img
                  src={selectedStep.photo}
                  alt={`Foto kegiatan ${selectedStep.label}`}
                  className="about__modal-hero-img"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              )}

              {/* Konten teks di atas foto */}
              <div className="about__modal-hero-content">
                <span className="about__modal-step-badge">Modul ke-{selectedStep.step}</span>

                {/* Judul — SVG untuk gradient stroke smooth */}
                <svg
                  viewBox="0 0 720 68"
                  xmlns="http://www.w3.org/2000/svg"
                  className="about__modal-title-svg"
                >
                  <defs>
                    <linearGradient id={`pinkStroke-${selectedStep.step}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F42057" />
                      <stop offset="100%" stopColor="#FAAC9C" />
                    </linearGradient>
                  </defs>
                  <text
                    x="2" y="54"
                    fontFamily="Poppins, sans-serif"
                    fontWeight="900"
                    fontSize="52"
                    fill="white"
                    stroke={`url(#pinkStroke-${selectedStep.step})`}
                    strokeWidth="7"
                    paintOrder="stroke fill"
                    strokeLinejoin="round"
                  >
                    {selectedStep.label}
                  </text>
                </svg>

                {/* Subtitle — SVG untuk gradient stroke smooth */}
                <svg
                  viewBox="0 0 720 28"
                  xmlns="http://www.w3.org/2000/svg"
                  className="about__modal-subtitle-svg"
                >
                  <defs>
                    <linearGradient id={`greenStroke-${selectedStep.step}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#025322" />
                      <stop offset="100%" stopColor="#D8E729" />
                    </linearGradient>
                  </defs>
                  <text
                    x="2" y="20"
                    fontFamily="Poppins, sans-serif"
                    fontWeight="700"
                    fontSize="17"
                    fill="white"
                    stroke={`url(#greenStroke-${selectedStep.step})`}
                    strokeWidth="4"
                    paintOrder="stroke fill"
                    strokeLinejoin="round"
                  >
                    {selectedStep.subtitle}
                  </text>
                </svg>
              </div>
            </div>

            {/* ── Body: deskripsi + tujuan ── */}
            <div className="about__modal-body">
              <div className="about__modal-box about__modal-box--desc">
                <p className="about__modal-desc">{selectedStep.desc}</p>
              </div>
              <div className="about__modal-box about__modal-box--goal">
                <p className="about__modal-goal-label">Tujuan Tahap Ini:</p>
                <p className="about__modal-goal-text">{selectedStep.objective}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
