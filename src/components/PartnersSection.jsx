import React from 'react';
import './PartnersSection.css';

export default function PartnersSection() {
  return (
    <section className="partners" id="kerjasama">
      <div className="partners__container">
        <h2 className="partners__heading">Terkait Kerjasama</h2>
        <p className="partners__sub">Kami berkolaborasi dengan berbagai pihak untuk menghadirkan pendidikan terbaik bagi anak-anak Indonesia.</p>
        <div className="partners__card">
          {/* Placeholder logos */}
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="partners__logo-slot" id={`partner-logo-${i}`}>
              <div className="partners__logo-placeholder">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="10" fill="#EBF7FF"/>
                  <path d="M12 28V16l8-6 8 6v12" stroke="#4AADE8" strokeWidth="2" strokeLinejoin="round"/>
                  <rect x="15" y="20" width="4" height="8" rx="1" fill="#4AADE8" opacity="0.6"/>
                  <rect x="21" y="20" width="4" height="8" rx="1" fill="#3DB54A" opacity="0.6"/>
                </svg>
                <span>Logo Partner</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
