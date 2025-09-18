import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from './Icons';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isGamesDropdownOpen, setIsGamesDropdownOpen] = useState(false);
  const [isLolSubmenuOpen, setIsLolSubmenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navItems = ['Jogos Disponíveis', 'Avaliações', 'Fale Conosco', 'Carreiras'];
  
  const gamesOptions = [
    { name: 'League of Legends', hasSubmenu: true },
    { name: 'Mais jogos em breve', hasSubmenu: false }
  ];

  const lolServicesOptions = [
    { name: 'Elo Boost', href: 'elo-boost' },
    { name: 'Coach Service', href: 'coach-service' },
    { name: 'Vitórias Avulsas', href: 'vitorias-avulsas' },
    { name: 'MD5', href: 'md5' }
  ];

  // Controlar dropdown com clique
  const toggleDropdown = () => {
    setIsGamesDropdownOpen(!isGamesDropdownOpen);
    setIsLolSubmenuOpen(false);
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsGamesDropdownOpen(false);
        setIsLolSubmenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black bg-opacity-90 backdrop-blur-md z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 border-b border-gray-800">
          <div className="flex items-center space-x-8">
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
              <span className="text-xl font-bold text-white tracking-wider">KATTER</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item, index) => {
                if (item === 'Jogos Disponíveis') {
                  return (
                    <div 
                      key={item} 
                      className="relative" 
                      ref={dropdownRef}
                    >
                      <button
                        onClick={toggleDropdown}
                        className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {item}
                        <ChevronDownIcon 
                          className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                            isGamesDropdownOpen ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {isGamesDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                          <div className="py-2">
                            {gamesOptions.map((game) => (
                              <div key={game.name} className="relative">
                                {game.hasSubmenu ? (
                                  <div
                                    onMouseEnter={() => setIsLolSubmenuOpen(true)}
                                    onMouseLeave={() => setIsLolSubmenuOpen(false)}
                                    className="relative group"
                                  >
                                    <button
                                      className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 border-l-4 border-transparent hover:border-orange-500 flex items-center justify-between"
                                    >
                                      <span className="font-medium">{game.name}</span>
                                      <ChevronRightIcon className="w-3 h-3" />
                                    </button>
                                    
                                    {/* Submenu do League of Legends */}
                                    {isLolSubmenuOpen && (
                                      <div className="absolute left-full top-0 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-[70]">
                                        <div className="py-2">
                                          {lolServicesOptions.map((service) => (
                                            <button
                                              key={service.name}
                                              onClick={() => {
                                                onNavigate(service.href);
                                                setIsGamesDropdownOpen(false);
                                                setIsLolSubmenuOpen(false);
                                              }}
                                              className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 border-l-4 border-transparent hover:border-orange-500"
                                            >
                                              <span className="font-medium">{service.name}</span>
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <button
                                    className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 border-l-4 border-transparent hover:border-orange-500"
                                  >
                                    <span className="font-medium">{game.name}</span>
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                
                return (
                  <a key={item} href="#" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
                    {item}
                    {item === 'Carreiras' && <span className="ml-2 bg-cyan-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">Contratando</span>}
                  </a>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center">
             <button 
               onClick={() => setIsLoginModalOpen(true)}
               className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
             >
                Iniciar Sessão
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(true);
        }}
      />
      
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </header>
  );
};

export default Header;