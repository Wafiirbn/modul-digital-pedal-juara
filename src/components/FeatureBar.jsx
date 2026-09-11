import React from 'react';
import './FeatureBar.css';

const features = [
  {
    id: 'feature-kolb',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="#EAF7FF" stroke="#4AADE8" strokeWidth="2"/>
        <path d="M16 8v8l5 3" stroke="#2D7DD2" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="2" fill="#2D7DD2"/>
      </svg>
    ),
    title: 'Experiential Learning dari Kolb',
  },
  {
    id: 'feature-seligman',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="#F0FFF0" stroke="#3DB54A" strokeWidth="2"/>
        <path d="M10 16l4 4 8-8" stroke="#3DB54A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Kekuatan Karakter dari Martin Seligman',
  },
  {
    id: 'feature-wirausaha',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="#FFF8E8" stroke="#FFD31D" strokeWidth="2"/>
        <path d="M16 10l2.2 4.8 5.3.4-4 3.6 1.2 5.2-4.7-2.8-4.7 2.8 1.2-5.2-4-3.6 5.3-.4z" fill="#FF6B2B"/>
      </svg>
    ),
    title: 'Kewirausahaan Lingkungan',
  },
];

export default function FeatureBar() {
  return (
    <section className="feature-bar" id="modulku">
      <div className="feature-bar__card">
        {features.map((f, idx) => (
          <React.Fragment key={f.id}>
            <div className="feature-bar__item" id={f.id}>
              <div className="feature-bar__icon">{f.icon}</div>
              <p className="feature-bar__title">{f.title}</p>
            </div>
            {idx < features.length - 1 && (
              <div className="feature-bar__divider" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
