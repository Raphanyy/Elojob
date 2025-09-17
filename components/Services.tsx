import React from 'react';
import { ServiceIcon1, ServiceIcon2, ServiceIcon3, ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface ServiceCardProps {
  icon: React.ReactNode;
  preTitle: string;
  title: string;
  description: string;
  discount?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, preTitle, title, description, discount }) => (
  <div className="relative bg-[#1A1A1A] border border-[#2C2C2C] rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-orange-600 hover:scale-105 group">
    {discount && (
      <div className="absolute top-4 right-4 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full">{discount}</div>
    )}
    <div className="w-24 h-24 rounded-full border-2 border-orange-500 group-hover:border-orange-600 flex items-center justify-center transition-colors duration-300">
      {icon}
    </div>
    <p className="mt-8 text-orange-500 font-medium">{preTitle}</p>
    <h3 className="mt-1 text-3xl font-bold">{title}</h3>
    <p className="mt-4 text-gray-400 flex-grow">{description}</p>
    <button className="mt-8 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">
      Explorar
    </button>
  </div>
);

const Services: React.FC = () => {
  const servicesData = [
    {
      icon: <ServiceIcon1 className="w-12 h-12 text-white group-hover:text-orange-500 transition-colors" />,
      preTitle: 'Nós jogamos para você',
      title: 'ELO BOOST',
      description: 'Ajudamos você a subir de elo com segurança e rapidez. Nossa equipe de boosters profissionais trabalha 24/7. Conquiste finalmente o elo que você sempre mereceu.',
      discount: '25% OFF',
    },
    {
      icon: <ServiceIcon2 className="w-12 h-12 text-white group-hover:text-orange-500 transition-colors" />,
      preTitle: 'Aprenda com profissionais',
      title: 'COACH SERVICE',
      description: 'Aprenda a jogar e tenha aulas com os maiores profissionais dos games. Desenvolva suas habilidades e estratégias com mentoria personalizada.',
      discount: '25% OFF',
    },
    {
      icon: <ServiceIcon3 className="w-12 h-12 text-white group-hover:text-orange-500 transition-colors" />,
      preTitle: 'Marketplace completo',
      title: 'KATTSHOP',
      description: 'Compre ou venda contas, itens, cosméticos e muito mais. Transações seguras com garantia total e suporte especializado disponível 24h por dia.',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                  <ServiceCard key={index} {...service} />
              ))}
            </div>
        </div>
        <div className="flex justify-center mt-8">
            <div className="w-24 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 w-full"></div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Services;