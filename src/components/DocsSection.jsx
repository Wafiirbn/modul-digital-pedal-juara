import React, { useState } from 'react';
import './DocsSection.css';

const photos = [
  { id: 'doc-1', src: '/doc1.png', alt: 'Kegiatan belajar bersama anak-anak' },
  { id: 'doc-2', src: '/doc2.png', alt: 'Workshop edukasi bersama mahasiswa' },
  { id: 'doc-3', src: '/doc3.png', alt: 'Kegiatan komunitas dan kreativitas anak' },
  { id: 'doc-4', src: '/doc4.png', alt: 'Sesi pembelajaran interaktif' },
  { id: 'doc-5', src: '/doc5.JPG', alt: 'Program pendampingan karakter' },
  { id: 'doc-6', src: '/doc6.png', alt: 'Aktivitas eksplorasi dan permainan edukatif' },
  { id: 'doc-7', src: '/doc7.JPG', alt: 'Dokumentasi kegiatan dan evaluasi program' },
];

export default function DocsSection() {
  const [active, setActive] = useState(1); // 0-indexed center

  const prev = () => setActive(i => (i - 1 + photos.length) % photos.length);
  const next = () => setActive(i => (i + 1) % photos.length);

  const getPos = (idx) => {
    const diff = (idx - active + photos.length) % photos.length;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === photos.length - 1) return 'left';
    return 'hidden';
  };

  return (
    <section className="docs" id="dokumentasi">
      <div className="docs__container">
        <h2 className="docs__heading">Dokumentasi Pelaksanaan Program</h2>
        <div className="docs__carousel-wrap">
          {/* Left arrow */}
          <button className="docs__arrow docs__arrow--left" onClick={prev} id="carousel-prev" aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {/* Carousel */}
          <div className="docs__carousel">
            {photos.map((photo, idx) => {
              const pos = getPos(idx);
              return (
                <div
                  key={photo.id}
                  className={`docs__slide docs__slide--${pos}`}
                  onClick={() => pos !== 'hidden' && setActive(idx)}
                >
                  <img src={photo.src} alt={photo.alt} />
                  <div className="docs__slide-overlay" />
                </div>
              );
            })}
          </div>

          {/* Right arrow */}
          <button className="docs__arrow docs__arrow--right" onClick={next} id="carousel-next" aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="docs__dots">
          {photos.map((_, idx) => (
            <button
              key={idx}
              className={`docs__dot ${idx === active ? 'docs__dot--active' : ''}`}
              onClick={() => setActive(idx)}
              id={`carousel-dot-${idx}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
