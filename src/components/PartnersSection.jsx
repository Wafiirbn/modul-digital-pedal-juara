import React from 'react';
import './PartnersSection.css';

/**
 * Data mitra kerjasama.
 * Ganti nilai `logo` dengan path gambar logo masing-masing.
 * Taruh file gambar di folder /public/partners/ lalu isi path-nya.
 *
 * Contoh: logo: '/partners/logo-smk-almuttaqin.png'
 */
const partners = [
  {
    id: 'akademik',
    kategori: 'Akademik',
    nama: 'SMK Al-Muttaqin',
    logo: './logo-akademik.png',   // ← ganti nama file sesuai gambarmu
    alt: 'Logo SMK Al-Muttaqin',
  },
  {
    id: 'pemerintahan',
    kategori: 'Pemerintahan',
    nama: 'DP3A Kota Bekasi',
    logo: './logo-pemerintahan.png', // ← ganti nama file sesuai gambarmu
    alt: 'Logo DP3A Kota Bekasi',
  },
  {
    id: 'komunitas',
    kategori: 'Komunitas',
    nama: 'Komunitas Literasi Tambun Selatan & Forum Anak Kabupaten Bekasi',
    logo: './logo-komunitas.png',   // ← ganti nama file sesuai gambarmu
    alt: 'Logo Komunitas Literasi',
  },
  {
    id: 'bisnis',
    kategori: 'Bisnis',
    nama: 'Rabeads',
    logo: './logo-bisnis.png',      // ← ganti nama file sesuai gambarmu
    alt: 'Logo Rabeads',
  },
  {
    id: 'media',
    kategori: 'Media',
    nama: 'BEM-KM IPB & 14 Media Publikasi',
    logo: './logo-media.png',       // ← ganti nama file sesuai gambarmu
    alt: 'Logo Media',
  },
];

export default function PartnersSection() {
  return (
    <section className="partners" id="kerjasama">
      <div className="partners__container">
        <h2 className="partners__heading">Terkait Kerjasama</h2>
        <p className="partners__sub">
          Kami berkolaborasi dengan berbagai pihak untuk menghadirkan pendidikan terbaik bagi anak-anak Indonesia.
        </p>

        <div className="partners__grid">
          {partners.map((p) => (
            <div key={p.id} className="partners__card" id={`partner-${p.id}`}>
              <div className="partners__logo-wrap">
                <img
                  src={p.logo}
                  alt={p.alt}
                  className="partners__logo-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback jika gambar belum tersedia */}
                <div className="partners__logo-fallback" style={{ display: 'none' }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <rect width="36" height="36" rx="9" fill="#EBF7FF"/>
                    <path d="M10 26V15l8-6 8 6v11" stroke="#4AADE8" strokeWidth="2" strokeLinejoin="round"/>
                    <rect x="13" y="19" width="4" height="7" rx="1" fill="#4AADE8" opacity="0.6"/>
                    <rect x="19" y="19" width="4" height="7" rx="1" fill="#3DB54A" opacity="0.6"/>
                  </svg>
                  <span>Logo</span>
                </div>
              </div>
              <div className="partners__info">
                <p className="partners__kategori">{p.kategori}</p>
                <p className="partners__nama">{p.nama}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
