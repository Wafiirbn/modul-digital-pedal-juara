import React from 'react';
import './Footer.css';

export default function Footer({ onNavigate }) {
  const handleLinkClick = (e, href) => {
    if (href.startsWith('http')) return;

    e.preventDefault();
    if (href === '#modulku') {
      if (onNavigate) onNavigate('modulku');
    } else if (href === '#kartu-siapa-aku') {
      if (onNavigate) onNavigate('kartu-siapa-aku');
    } else {
      if (onNavigate) onNavigate('home', href);
    }
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer__container">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, '#top')}
              style={{ display: 'inline-block' }}
            >
              <img src="/logo.png" alt="Logo Pedal Juara" className="footer__logo-img" />
            </a>
          </div>
          <p className="footer__tagline">
            <b>Modul Digital</b> Penguatan Karakter dan Kewirausahaan Anak Pemulung Melalui Metode Berbasis Pengalaman untuk <b>Menurunkan Angka Putus Sekolah</b> Adisa Bantargebang
          </p>
        </div>

        {/* Links */}
        <div className="footer__links">
          <div className="footer__col">
            <p className="footer__col-title">Platform</p>
            <a href="#modulku" onClick={(e) => handleLinkClick(e, '#modulku')} className="footer__link">Modulku</a>
            <a href="https://dadu-emosi.vercel.app/" target="_blank" rel="noreferrer" className="footer__link">Dadu Emosi</a>
            <a href="#kartu-siapa-aku" onClick={(e) => handleLinkClick(e, '#kartu-siapa-aku')} className="footer__link">Kartu Siapa Aku?</a>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Tentang</p>
            <a href="#tentang-kami" onClick={(e) => handleLinkClick(e, '#tentang-kami')} className="footer__link">Tentang Kami</a>
            <a href="#tim-kami" onClick={(e) => handleLinkClick(e, '#tim-kami')} className="footer__link">Tim Kami</a>
            <a href="#dokumentasi" onClick={(e) => handleLinkClick(e, '#dokumentasi')} className="footer__link">Dokumentasi</a>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Kontak</p>
            <a href="mailto:pedaljuaraa@gmail.com" className="footer__link">pedaljuaraa@gmail.com</a>
            <a href="https://www.instagram.com/pedaljuara/" target="_blank" rel="noreferrer" className="footer__link footer__link--text">Instagram: @pedaljuara</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 PEDAL JUARA – Modul Digital Pedal Juara. All rights reserved.</p>
      </div>
    </footer>
  );
}
