import React from 'react';
import { ArrowRightIcon } from './Icons';

const CallToAction: React.FC = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <a href="#" className="group block cursor-pointer">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="text-orange-500 font-semibold">Pronto para evoluir no League?</p>
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mt-2 transition-colors duration-300 group-hover:text-orange-500">
                DESTRUA O NEXUS
              </h2>
            </div>
            <div className="mt-8 md:mt-0 p-6 bg-gray-800 rounded-full group-hover:bg-orange-600 transition-all duration-300 transform group-hover:scale-110">
              <ArrowRightIcon className="w-8 h-8" />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default CallToAction;