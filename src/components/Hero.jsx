import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg-wrap">
        <img
          src="/hero-bg.png"
          alt="Ilustrasi langit cerah dengan balon udara dan anak membaca buku"
          className="hero__bg-img"
        />
        <div className="hero__overlay" />
      </div>
      <div className="hero__content">
        <div className="hero__headline">
          <p className="hero__subtitle-line">Modul Digital</p>
          <h1 className="hero__title">PEDAL JUARA</h1>
        </div>
      </div>
    </section>
  );
}
