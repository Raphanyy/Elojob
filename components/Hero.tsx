
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img src="https://i.imgur.com/cAT33zj.jpeg" alt="Hero Character" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/85 to-black/60"></div>
        </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight mb-8">
            <span className="block text-white">SOMOS A MAIOR PLATAFORMA</span>
            <span className="block text-orange-500">DE BOOSTING DO MUNDO</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-4xl mx-auto mb-10 leading-relaxed">
            Transformamos seus objetivos em realidade com expertise e dedicação.<br/>
            Nossos especialistas trabalham incansavelmente para você alcançar o nível que sempre sonhou.
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-lg shadow-orange-600/20">
            Contrate já
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;