import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon } from './Icons';

const Footer: React.FC = () => {
  const footerLinks = {
    Páginas: ['Serviços', 'Astronautas', 'Avaliações', 'Como Funciona', 'Empregos'],
    Jogos: ['League of Legends', 'Valorant'],
    Contato: ['Chat 24 horas', 'Whatsapp', 'Email'],
  };

  return (
    <footer className="bg-black text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center">
                <span className="text-2xl font-bold text-white tracking-wider">KATTER</span>
            </div>
            <p className="mt-4 text-sm max-w-sm">
              League of Legends and Valorant are registered trademarks of Riot Games, Inc. We are in no way affiliated with, associated with or endorsed by Riot Games, Inc.
            </p>
          </div>
          
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h5 className="font-bold text-white uppercase tracking-wider">{title}</h5>
              <ul className="mt-4 space-y-3">
                {links.map(link => (
                  <li key={link}><a href="#" className="hover:text-white hover:underline">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-white"><FacebookIcon className="w-5 h-5"/></a>
                    <a href="#" className="hover:text-white"><TwitterIcon className="w-5 h-5"/></a>
                    <a href="#" className="hover:text-white"><InstagramIcon className="w-5 h-5"/></a>
                </div>
                 <div className="hidden md:flex space-x-6">
                    <a href="#" className="hover:text-white">Termos de Uso</a>
                    <a href="#" className="hover:text-white">Política de Privacidade</a>
                </div>
            </div>
            <div className="flex md:hidden space-x-6 mt-4">
                <a href="#" className="hover:text-white">Termos de Uso</a>
                <a href="#" className="hover:text-white">Política de Privacidade</a>
            </div>
            <p className="mt-4 md:mt-0">Katter © 2013-2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;