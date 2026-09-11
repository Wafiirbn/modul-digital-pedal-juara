import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureBar from './components/FeatureBar';
import AboutSection from './components/AboutSection';
import TeamSection from './components/TeamSection';
import DocsSection from './components/DocsSection';
import PartnersSection from './components/PartnersSection';
import Footer from './components/Footer';
import ModulkuPage from './components/ModulkuPage';
import KartuSiapaAkuPage from './components/KartuSiapaAkuPage';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.hash === '#modulku') return 'modulku';
    if (window.location.hash === '#kartu-siapa-aku') return 'kartu-siapa-aku';
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#modulku') {
        setCurrentPage('modulku');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#kartu-siapa-aku') {
        setCurrentPage('kartu-siapa-aku');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (currentPage !== 'home') {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  const handleNavigate = (page, targetHash = '') => {
    if (page === 'modulku') {
      setCurrentPage('modulku');
      window.location.hash = '#modulku';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'kartu-siapa-aku') {
      setCurrentPage('kartu-siapa-aku');
      window.location.hash = '#kartu-siapa-aku';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      if (targetHash && !['#modulku', '#kartu-siapa-aku'].includes(targetHash)) {
        window.location.hash = targetHash;
        setTimeout(() => {
          if (targetHash === '#top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const el = document.querySelector(targetHash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      {currentPage === 'modulku' && (
        <ModulkuPage
          onBackToHome={() => handleNavigate('home')}
          onNavigateToKartu={() => handleNavigate('kartu-siapa-aku')}
        />
      )}

      {currentPage === 'kartu-siapa-aku' && (
        <KartuSiapaAkuPage
          onBackToHome={() => handleNavigate('home')}
          onNavigateToModulku={() => handleNavigate('modulku')}
        />
      )}

      {currentPage === 'home' && (
        <main>
          <Hero />
          <FeatureBar />
          <AboutSection onNavigateToModulku={() => handleNavigate('modulku')} />
          <TeamSection />
          <DocsSection />
          <PartnersSection />
        </main>
      )}

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
