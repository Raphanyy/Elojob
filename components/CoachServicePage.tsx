import React, { useState } from 'react';
import { ChevronDownIcon } from './Icons';

interface EloRank {
  name: string;
  tier: string;
  division: string;
  color: string;
  bgColor: string;
  gradient: string;
  emblem: React.ReactNode;
}

interface CoachPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  recommendedFor: string[];
  bgColor: string;
  icon: React.ReactNode;
  features: string[];
}

const CoachServicePage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('basico');
  const [quantity, setQuantity] = useState(1);
  const [modelType, setModelType] = useState<'individual' | 'dupla' | 'equipe'>('individual');

  // Imagens dos emblemas dos elos (reutilizando da página de Boost)
  const getEmblemImage = (tier: string) => {
    const imageUrls: { [key: string]: string } = {
      'Ferro': 'https://i.imgur.com/i88x7OD.png',
      'Bronze': 'https://i.imgur.com/mnmq1oT.png', 
      'Prata': 'https://i.imgur.com/vFhyaNi.png',
      'Ouro': 'https://i.imgur.com/7FfmFrL.png',
      'Platina': 'https://i.imgur.com/rpLVabB.png',
      'Esmeralda': 'https://i.imgur.com/PDeCwkG.png',
      'Diamante': 'https://i.imgur.com/uYXAfwU.png',
      'Mestre': 'https://i.imgur.com/8vLBs3I.png',
      'Grão Mestre': 'https://i.imgur.com/DfpAnIn.png',
      'Desafiante': 'https://i.imgur.com/GJYLYWD.png'
    };

    return (
      <img 
        src={imageUrls[tier] || imageUrls['Ouro']} 
        alt={`Elo ${tier}`}
        className="w-full h-full object-contain"
        style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}
      />
    );
  };

  // Planos de coaching
  const coachPlans: CoachPlan[] = [
    {
      id: 'basico',
      name: 'BÁSICO',
      price: 30,
      description: 'Confira o conteúdo',
      recommendedFor: ['Ferro', 'Bronze', 'Prata'],
      bgColor: 'bg-slate-700',
      icon: (
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
          {/* Sparkle pontiaguda para plano básico */}
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L12 8L18 8L13 12L15 18L10 14L5 18L7 12L2 8L8 8L10 2Z"/>
          </svg>
        </div>
      ),
      features: ['Análise de gameplay', 'Dicas básicas', 'Revisão de partidas']
    },
    {
      id: 'experiente',
      name: 'EXPERIENTE',
      price: 35,
      description: 'Confira o conteúdo',
      recommendedFor: ['Ouro', 'Platina', 'Esmeralda'],
      bgColor: 'bg-gradient-to-b from-teal-700 to-teal-900',
      icon: (
        <div className="w-12 h-12 bg-teal-800 rounded-full flex items-center justify-center">
          {/* Sparkle pontiaguda para plano experiente */}
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L12 8L18 8L13 12L15 18L10 14L5 18L7 12L2 8L8 8L10 2Z"/>
          </svg>
        </div>
      ),
      features: ['Análise avançada', 'Estratégias específicas', 'Coaching em tempo real']
    },
    {
      id: 'avancado',
      name: 'AVANÇADO',
      price: 40,
      description: 'Confira o conteúdo',
      recommendedFor: ['Diamante', 'Mestre', 'Grão Mestre', 'Desafiante'],
      bgColor: 'bg-gradient-to-b from-blue-700 to-blue-900',
      icon: (
        <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center">
          {/* Sparkle pontiaguda para plano avançado */}
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L12 8L18 8L13 12L15 18L10 14L5 18L7 12L2 8L8 8L10 2Z"/>
          </svg>
        </div>
      ),
      features: ['Análise profissional', 'Estratégias de alto nível', 'Coaching personalizado']
    }
  ];

  const selectedPlanData = coachPlans.find(plan => plan.id === selectedPlan) || coachPlans[0];

  const calculatePrice = () => {
    let basePrice = selectedPlanData.price;
    
    // Aplicar porcentagem do modelo primeiro
    if (modelType === 'dupla') {
      basePrice *= 1.25; // +25%
    } else if (modelType === 'equipe') {
      basePrice *= 1.5; // +50%
    }
    // Individual mantém o preço base (sem acréscimo)
    
    // Depois multiplicar pela quantidade de aulas
    return basePrice * quantity;
  };

  const getModelPriceText = (type: string) => {
    const basePrice = selectedPlanData.price;
    let adjustedPrice = basePrice;
    
    switch (type) {
      case 'individual': 
        return 'FREE';
      case 'dupla': 
        adjustedPrice = basePrice * 1.25;
        return `+25% (R$ ${adjustedPrice.toFixed(2).replace('.', ',')})`;
      case 'equipe': 
        adjustedPrice = basePrice * 1.5;
        return `+50% (R$ ${adjustedPrice.toFixed(2).replace('.', ',')})`;
      default: 
        return 'FREE';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Side - Plan Selection */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-gray-300">Escolha seu plano</h2>
              <div className="flex items-center bg-gray-800 px-4 py-2 rounded-full">
                <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-sm">60m de duração</span>
              </div>
            </div>

            {/* Plan Cards */}
            {coachPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id 
                    ? 'ring-2 ring-blue-400 shadow-lg shadow-blue-400/25' 
                    : 'hover:ring-1 hover:ring-white/20'
                } ${plan.bgColor}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Indicador de seleção */}
                {selectedPlan === plan.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10">
                      {plan.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                      <div className="flex items-center text-white text-sm mb-2">
                        <span>{plan.description}</span>
                        <svg className="w-4 h-4 ml-1 transform rotate-45" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-white text-lg font-semibold">
                        R$ {plan.price} / aula
                      </div>
                      <div className="text-white text-xs mt-2 opacity-80">
                        {plan.id === 'basico' && 'Torne-se um bom jogador'}
                        {plan.id === 'experiente' && 'Se destaque aos outros'}
                        {plan.id === 'avancado' && 'Torne-se uma verdadeira lenda'}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="h-8 flex items-center justify-end mb-3">
                      {selectedPlan !== plan.id ? (
                        <button className="px-4 py-2 text-sm border border-white/30 text-white rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200">
                          Selecionar
                        </button>
                      ) : (
                        <div className="px-4 py-2 text-sm border border-orange-500 text-orange-400 rounded-lg bg-orange-500/10">
                          Marcado
                        </div>
                      )}
                    </div>

                    <div className="mt-3">
                      <div className="text-white text-sm mb-2 font-medium">Recomendado para</div>
                      <div className="flex flex-wrap gap-2">
                        {plan.recommendedFor.map((elo) => (
                          <div key={elo} className="relative group">
                            <div className="w-12 h-12 flex items-center justify-center transition-transform duration-200">
                              {getEmblemImage(elo)}
                            </div>
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                              {elo}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Checkout */}
          <div className="lg:col-span-1 pt-12">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-3 h-[calc(100vh-16rem)] max-h-[500px] flex flex-col shadow-lg">
              <h3 className="text-lg font-bold text-white mb-1">PLANO {selectedPlanData.name}</h3>
              <div className="text-gray-400 text-xs mb-1">{quantity} AULA{quantity > 1 ? 'S' : ''}</div>
              <div className="text-xl font-bold text-white mb-2">R$ {calculatePrice().toFixed(2).replace('.', ',')}</div>

              <div className="space-y-2 mb-4">
                <div className="text-white text-sm font-medium">Você agenda o horário</div>
                <div className="text-gray-400 text-sm">
                  Professor pronto em até ⚡ 2 horas
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Quantity Selection */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Quantidade de Aulas</label>
                    <div className="flex items-center">
                      <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg px-3 py-2">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="mx-3 text-white text-sm font-medium min-w-[20px] text-center">
                          {quantity}
                        </span>
                        <button 
                          onClick={() => setQuantity(Math.min(10, quantity + 1))}
                          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Model Selection */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Escolha o Modelo</label>
                    <div className="space-y-2">
                      {[
                        { value: 'individual', label: 'Individual' },
                        { value: 'dupla', label: 'Dupla' },
                        { value: 'equipe', label: 'Equipe' }
                      ].map((option) => (
                        <label key={option.value} className={`flex items-center justify-between cursor-pointer p-2 rounded-lg border transition-all duration-200 ${
                          modelType === option.value 
                            ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20' 
                            : 'border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50'
                        }`} onClick={() => setModelType(option.value as 'individual' | 'dupla' | 'equipe')}>
                          <div className="flex items-center">
                            <div className={`w-2.5 h-2.5 rounded-full border-2 mr-2 transition-all duration-200 ${
                              modelType === option.value 
                                ? 'border-orange-500 bg-orange-500' 
                                : 'border-gray-500'
                            }`}>
                              {modelType === option.value && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>
                            <span className="text-white text-xs font-medium">{option.label}</span>
                          </div>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                            option.value === 'individual' 
                              ? 'text-green-400 bg-green-500/20 border border-green-500/50' 
                              : 'text-blue-400 bg-blue-500/20 border border-blue-500/50'
                          }`}>
                            {getModelPriceText(option.value)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Purchase Button */}
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                  Contratar (R$ {calculatePrice().toFixed(2).replace('.', ',')})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vantagens Grátis Section */}
      <div className="mt-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl font-bold text-white">Vantagens</h3>
            <span className="text-xs font-bold text-orange-400 border border-orange-500/40 bg-orange-500/10 px-2 py-0.5 rounded">Grátis</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {[
              'Boosters Didáticos e Amigáveis',
              'Entrega Rápida e Garantida',
              'Conteúdo Personalizado',
              'Você Define os Horários',
              'Feedback e Dicas in-game',
              'Disponibilidade 24/7',
              'Professores Desafiantes',
              'Política de Reembolso'
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-cyan-500/40 bg-cyan-500/10">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-200 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-8" />
        </div>
      </div>
    </div>
  );
};

export default CoachServicePage;
