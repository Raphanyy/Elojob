import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface BoosterProfileProps {
  avatar: string;
  name: string;
  role: string;
  roleIconUrl: string;
}

const BoosterProfile: React.FC<BoosterProfileProps> = ({ avatar, name, role, roleIconUrl }) => (
  <div className="flex-shrink-0 w-52 snap-start">
    <div className="bg-[#1A1A1A] border border-[#2C2C2C] rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-orange-600 h-full">
      {/* Avatar Container */}
      <div className="relative mb-4">
        <img 
          src={avatar} 
          alt={name} 
          className="w-24 h-24 rounded-full border-2 border-gray-700 object-cover bg-gray-800" 
        />
      </div>
      
      {/* Name */}
      <h3 className="text-xl font-bold uppercase text-white mb-3 leading-tight">
        {name}
      </h3>
      
      {/* Role */}
      <div className="flex items-center justify-center space-x-2">
        <img src={roleIconUrl} alt={`${role} icon`} className="w-5 h-5" />
        <span className="text-gray-400 text-sm">{role}</span>
      </div>
    </div>
  </div>
);

const Boosters: React.FC = () => {
  const boostersData = [
    { avatar: 'https://media.discordapp.net/attachments/1183201416805167175/1218671457896435772/IMG_20240316_191000.png', name: 'THEUZIKA', role: 'Atirador', roleIconUrl: 'https://i.imgur.com/b8EeCoF.png' },
    { avatar: 'https://media.discordapp.net/attachments/1183201416805167175/1247346187513954304/IMG-20240603-WA0001.jpg', name: 'NEYTAN', role: 'Meio', roleIconUrl: 'https://i.imgur.com/tO4qAq0.png' },
    { avatar: 'https://cdn.discordapp.com/attachments/1183201416805167175/1183204223126372432/vento.png', name: 'VAYNE', role: 'Atirador', roleIconUrl: 'https://i.imgur.com/b8EeCoF.png' },
    { avatar: 'https://cdn.discordapp.com/attachments/1183201416805167175/1183204220556550254/kuro.png', name: 'KILLA', role: 'Selva', roleIconUrl: 'https://i.imgur.com/vbuSeOm.png' },
    { avatar: 'https://cdn.discordapp.com/attachments/1183201416805167175/1183204222692933652/piplup.png', name: 'AKUMA', role: 'Atirador', roleIconUrl: 'https://i.imgur.com/b8EeCoF.png' },
  ];

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
      if (scrollContainerRef.current) {
          const scrollAmount = scrollContainerRef.current.clientWidth;
          scrollContainerRef.current.scrollBy({
              left: direction === 'left' ? -scrollAmount : scrollAmount,
              behavior: 'smooth',
          });
      }
  };

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="text-left">
                  <div className="flex items-center space-x-3 mb-6">
                      <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                      </span>
                      <p className="text-cyan-400 font-semibold text-sm">83 BOOSTERS DISPONÍVEIS</p>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-normal leading-tight">
                    NÓS ESTAMOS<br/>PRONTOS PARA<br/>TE AJUDAR
                  </h2>
              </div>
              <div className="text-left lg:text-left lg:pl-8">
                  <p className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-lg">
                    Selecionados entre os melhores jogadores do Mestre ao Desafiante, nossos boosters profissionais garantem resultados excepcionais em qualquer ELO que você precisar.
                  </p>
              </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="relative">
              {/* Navigation Arrows */}
              <button 
                  onClick={() => scroll('left')} 
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full items-center justify-center text-white transition-all duration-300 shadow-lg"
              >
                  <ChevronLeftIcon className="w-6 h-6"/>
              </button>
              
              {/* Cards Container */}
              <div 
                  ref={scrollContainerRef} 
                  className="flex gap-6 overflow-x-auto md:overflow-x-visible pb-4 snap-x snap-mandatory scroll-smooth px-6 md:px-12 justify-center md:justify-center [&::-webkit-scrollbar]:hidden" 
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {boostersData.map((booster, index) => (
                  <BoosterProfile key={index} {...booster} />
                ))}
              </div>
              
              <button 
                  onClick={() => scroll('right')} 
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full items-center justify-center text-white transition-all duration-300 shadow-lg"
              >
                  <ChevronRightIcon className="w-6 h-6"/>
              </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Boosters;