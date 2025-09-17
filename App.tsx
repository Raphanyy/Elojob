import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Boosters from './components/Boosters';
import Reviews from './components/Reviews';
import Features from './components/Features';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import EloBoostPage from './components/EloBoostPage';
import { ChatBubbleIcon } from './components/Icons';
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'elo-boost':
        return <EloBoostPage />;
      default:
        return (
          <>
            <Hero />
            <Services />
            <Boosters />
            <Reviews />
            <Features />
            <CallToAction />
          </>
        );
    }
  };

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden">
      <Header onNavigate={setCurrentPage} />
      <main className="pt-20">
        {renderPage()}
      </main>
      <Footer />
      <button className="fixed bottom-8 right-8 bg-[#5865F2] hover:bg-[#4752C4] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110">
        <ChatBubbleIcon className="w-8 h-8" />
      </button>
    </div>
  );
};

export default App;