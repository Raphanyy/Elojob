import React, { useState } from 'react';
import { ServiceIcon3, ChevronDownIcon } from './Icons';

interface EloRank {
  name: string;
  tier: string;
  division: string;
  color: string;
  bgColor: string;
  gradient: string;
  emblem: React.ReactNode;
  pdl: number;
}

interface EloTier {
  name: string;
  color: string;
  bgColor: string;
  gradient: string;
  emblem: React.ReactNode;
}

const EloBoostPage: React.FC = () => {
  const [currentElo, setCurrentElo] = useState<EloRank | null>(null);
  const [desiredElo, setDesiredElo] = useState<EloRank | null>(null);
  const [queue, setQueue] = useState('SOLO');
  const [server, setServer] = useState('BR');
  const [showEloModal, setShowEloModal] = useState(false);
  const [modalType, setModalType] = useState<'current' | 'desired'>('current');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<string>('Platina');
  const [selectedDivision, setSelectedDivision] = useState<string>('IV');
  
  // Estados para modais de seleção
  const [showPDLModal, setShowPDLModal] = useState(false);
  const [showServerModal, setShowServerModal] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [modalContext, setModalContext] = useState<'current' | 'desired'>('current');
  
  // Opções de customização
  const [options, setOptions] = useState({
    rotaseCampeoes: false,
    streamJogos: false,
    entregaExpressa: false,
    definaHorarios: false,
    monoCampeao: false,
    correcaoPDL: false,
    duoBoost: false,
    vitoriaExtra: false
  });

  // Imagens dos emblemas dos elos (links oficiais do League of Legends)
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

  // Manter função createEmblem para compatibilidade
  const createEmblem = (tier: string) => {
    return getEmblemImage(tier);
  };

  // Tiers de elo (incluindo todos os tiers do League of Legends)
  const eloTiers: EloTier[] = [
    { 
      name: 'Ferro', 
      color: '#8B7D6B', 
      bgColor: '#4A3728', 
      gradient: 'from-gray-700 to-gray-900',
      emblem: getEmblemImage('Ferro')
    },
    { 
      name: 'Bronze', 
      color: '#CD7F32', 
      bgColor: '#8B4513', 
      gradient: 'from-orange-700 to-orange-900',
      emblem: getEmblemImage('Bronze')
    },
    { 
      name: 'Prata', 
      color: '#C0C0C0', 
      bgColor: '#A9A9A9', 
      gradient: 'from-gray-400 to-gray-600',
      emblem: getEmblemImage('Prata')
    },
    { 
      name: 'Ouro', 
      color: '#FFD700', 
      bgColor: '#DAA520', 
      gradient: 'from-yellow-400 to-yellow-700',
      emblem: getEmblemImage('Ouro')
    },
    { 
      name: 'Platina', 
      color: '#00CED1', 
      bgColor: '#008B8B', 
      gradient: 'from-cyan-400 to-cyan-700',
      emblem: getEmblemImage('Platina')
    },
    { 
      name: 'Esmeralda', 
      color: '#50C878', 
      bgColor: '#006400', 
      gradient: 'from-green-500 to-green-800',
      emblem: getEmblemImage('Esmeralda')
    },
    { 
      name: 'Diamante', 
      color: '#87CEEB', 
      bgColor: '#191970', 
      gradient: 'from-blue-400 to-blue-800',
      emblem: getEmblemImage('Diamante')
    },
    { 
      name: 'Mestre', 
      color: '#9932CC', 
      bgColor: '#4B0082', 
      gradient: 'from-purple-500 to-purple-800',
      emblem: getEmblemImage('Mestre')
    },
    { 
      name: 'Grão Mestre', 
      color: '#FF0000', 
      bgColor: '#8B0000', 
      gradient: 'from-red-600 to-red-900',
      emblem: getEmblemImage('Grão Mestre')
    },
    { 
      name: 'Desafiante', 
      color: '#00FFFF', 
      bgColor: '#008B8B', 
      gradient: 'from-cyan-400 to-cyan-600',
      emblem: getEmblemImage('Desafiante')
    }
  ];

  const divisions = ['IV', 'III', 'II', 'I'];
  
  // Opções para os modais de seleção
  
  const serverOptions = [
    { value: 'BR', label: 'Brasileiro' },
    { value: 'EUW', label: 'Europeu' },
    { value: 'NA', label: 'Americano' },
    { value: 'CN', label: 'Chines' },
    { value: 'KR', label: 'Coreano' }
  ];
  const queueOptions = ['SOLO', 'FLEX'];

  // Definir elo padrão (Ouro I baseado na primeira imagem)
  const defaultCurrentElo: EloRank = {
    name: 'OURO I',
    tier: 'Ouro',
    division: 'I',
    color: '#FFD700',
    bgColor: '#DAA520',
    gradient: 'from-yellow-400 to-yellow-700',
    emblem: getEmblemImage('Ouro'),
    pdl: 16
  };

  // Definir elo desejado padrão (Platina IV)
  const defaultDesiredElo: EloRank = {
    name: 'PLATINA IV',
    tier: 'Platina',
    division: 'IV',
    color: '#00CED1',
    bgColor: '#008B8B',
    gradient: 'from-cyan-400 to-cyan-700',
    emblem: getEmblemImage('Platina'),
    pdl: 17
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (!currentElo) {
      setCurrentElo(defaultCurrentElo);
    }
    if (!desiredElo) {
      setDesiredElo(defaultDesiredElo);
    }
  }, []);

  const customizationOptions = [
    { key: 'rotaseCampeoes', label: 'Campeões', price: 'FREE', badgeClass: 'border-green-500 text-green-400 bg-green-500/10' },
    { key: 'entregaExpressa', label: 'Rotas', price: 'FREE', badgeClass: 'border-green-500 text-green-400 bg-green-500/10' },
    { key: 'streamJogos', label: 'Ao vivo', price: '+5%', badgeClass: 'border-cyan-500 text-cyan-400 bg-cyan-500/10' },
    { key: 'definaHorarios', label: 'Horários', price: '+15%', badgeClass: 'border-blue-500 text-blue-400 bg-blue-500/10' },
    { key: 'monoCampeao', label: 'Mono Campeão', price: '+30%', badgeClass: 'border-purple-500 text-purple-400 bg-purple-500/10' },
    { key: 'correcaoPDL', label: 'Correção PDL', price: '+30%', badgeClass: 'border-purple-500 text-purple-400 bg-purple-500/10' },
    { key: 'duoBoost', label: 'Duo Boost', price: '+70%', badgeClass: 'border-red-500 text-red-400 bg-red-500/10' },
    { key: 'vitoriaExtra', label: 'Vitória Extra', price: '+5%', badgeClass: 'border-cyan-500 text-cyan-400 bg-cyan-500/10' }
  ];

  // Funções do modal
  const openEloModal = (type: 'current' | 'desired') => {
    setModalType(type);
    setShowEloModal(true);
    
    // Definir tier e divisão iniciais baseados no elo atual
    if (type === 'current' && currentElo) {
      setSelectedTier(currentElo.tier);
      setSelectedDivision(currentElo.division || 'IV');
    } else if (type === 'desired' && desiredElo) {
      setSelectedTier(desiredElo.tier);
      setSelectedDivision(desiredElo.division || 'IV');
    } else {
      setSelectedTier('Platina');
      setSelectedDivision('IV');
    }
  };

  // Funções para abrir modais de seleção
  

  const openServerModal = (context: 'current' | 'desired') => {
    setModalContext(context);
    setShowServerModal(true);
  };

  const openQueueModal = (context: 'current' | 'desired') => {
    setModalContext(context);
    setShowQueueModal(true);
  };

  const selectElo = () => {
    const selectedTierData = eloTiers.find(tier => tier.name === selectedTier);
    if (!selectedTierData) return;

    // Tiers sem divisões
    const tiersWithoutDivisions = ['Mestre', 'Grão Mestre', 'Desafiante'];
    
    let eloName: string;
    let pdl: number;

    if (tiersWithoutDivisions.includes(selectedTier)) {
      // Para tiers sem divisões, usar apenas o nome do tier
      eloName = selectedTier.toUpperCase();
      // PDL baseado na posição do tier (Mestre=32, Grão Mestre=33, Desafiante=34)
      pdl = 32 + tiersWithoutDivisions.indexOf(selectedTier);
    } else {
      // Calcular PDL baseado no tier e divisão para tiers normais
      let basePdl = eloTiers.indexOf(selectedTierData) * 4; // 4 divisões por tier
      const divisionIndex = divisions.indexOf(selectedDivision);
      pdl = basePdl + (4 - divisionIndex); // IV=1, III=2, II=3, I=4
      eloName = `${selectedTier.toUpperCase()} ${selectedDivision}`;
    }

    const newElo: EloRank = {
      name: eloName,
      tier: selectedTier,
      division: tiersWithoutDivisions.includes(selectedTier) ? '' : selectedDivision,
      color: selectedTierData.color,
      bgColor: selectedTierData.bgColor,
      gradient: selectedTierData.gradient,
      emblem: selectedTierData.emblem,
      pdl: pdl
    };

    if (modalType === 'current') {
      setCurrentElo(newElo);
    } else {
      setDesiredElo(newElo);
    }

    setShowEloModal(false);
  };

  // Função de cálculo de preços para Elojob
  const calculatePrice = (from: string, to: string): number => {
    // Lista completa de ranks em ordem
    const allRanks = [
      "Ferro 4", "Ferro 3", "Ferro 2", "Ferro 1",
      "Bronze 4", "Bronze 3", "Bronze 2", "Bronze 1", 
      "Prata 4", "Prata 3", "Prata 2", "Prata 1",
      "Ouro 4", "Ouro 3", "Ouro 2", "Ouro 1",
      "Platina 4", "Platina 3", "Platina 2", "Platina 1",
      "Esmeralda 4", "Esmeralda 3", "Esmeralda 2", "Esmeralda 1",
      "Diamante 4", "Diamante 3", "Diamante 2", "Diamante 1",
      "Mestre",
      "Grão-Mestre",
      "Desafiante"
    ];

    // Valores por tier (de um tier para o próximo)
    const tierValues = {
      "Ferro": 55,
      "Bronze": 60,
      "Prata": 70,
      "Ouro": 80,
      "Platina": 110,
      "Esmeralda": 175,
      "Diamante": 350
    };

    // Valores especiais para tiers sem divisões
    const specialValues = {
      "Grão-Mestre": 600,
      "Desafiante": 700
    };

    // Função auxiliar para obter preço por divisão de um tier
    const getDivisionPrice = (tier: string): number => {
      if (tier === "Mestre") return 0; // Mestre não adiciona valor
      if (tier === "Grão-Mestre") return specialValues["Grão-Mestre"];
      if (tier === "Desafiante") return specialValues["Desafiante"];
      
      return tierValues[tier as keyof typeof tierValues] / 4; // Divide por 4 divisões
    };

    // Validações
    const fromIndex = allRanks.indexOf(from);
    const toIndex = allRanks.indexOf(to);

    if (fromIndex === -1) {
      throw new Error(`Elo de origem "${from}" não encontrado na lista de ranks`);
    }
    
    if (toIndex === -1) {
      throw new Error(`Elo de destino "${to}" não encontrado na lista de ranks`);
    }

    if (fromIndex >= toIndex) {
      return 0; // Elo atual é igual ou maior que o desejado
    }

    // Cálculo do preço
    let totalPrice = 0;

    // Percorrer cada rank entre from e to (exclusive)
    for (let i = fromIndex; i < toIndex; i++) {
      const currentRank = allRanks[i];
      const tier = currentRank.split(" ")[0]; // Extrair o tier (ex: "Ferro" de "Ferro 4")
      
      totalPrice += getDivisionPrice(tier);
    }

    // Adicionar valores fixos ao cruzar para tiers especiais
    const gmIndex = allRanks.indexOf("Grão-Mestre");
    const challengerIndex = allRanks.indexOf("Desafiante");

    // Se destino alcança (ou ultrapassa) Grão-Mestre, somar 700
    if (toIndex >= gmIndex && gmIndex !== -1) {
      totalPrice += 600;
    }
    // Se destino alcança Desafiante, somar também 1100
    if (toIndex >= challengerIndex && challengerIndex !== -1) {
      totalPrice += 700;
    }

    return totalPrice;
  };

  // Conversão de algarismos romanos (divisões) para arábicos
  const romanToArabic: Record<string, string> = {
    'I': '1',
    'II': '2',
    'III': '3',
    'IV': '4'
  };

  const normalizeRankString = (elo: EloRank): string => {
    if (elo.name === "MESTRE") return "Mestre";
    if (elo.name === "GRÃO MESTRE") return "Grão-Mestre";
    if (elo.name === "DESAFIANTE") return "Desafiante";
    const divisionNumeric = romanToArabic[elo.division] || elo.division;
    return `${elo.tier} ${divisionNumeric}`;
  };

  // Função para calcular preço baseado nos elos selecionados
  const calculateCurrentPrice = (): number => {
    // Usar elos padrão se os estados ainda não foram inicializados
    const current = currentElo || defaultCurrentElo;
    const desired = desiredElo || defaultDesiredElo;

    try {
      const fromRank = normalizeRankString(current);
      const toRank = normalizeRankString(desired);

      console.log('Calculando preço:', fromRank, '→', toRank);
      const basePrice = calculatePrice(fromRank, toRank);
      console.log('Preço base calculado (sem addons):', basePrice);

      // Aplicar addons (apenas os que possuem percentual)
      let finalPrice = basePrice;
      if (options.streamJogos) finalPrice *= 1.05;       // Ao vivo +5%
      if (options.definaHorarios) finalPrice *= 1.15;    // Horários +15%
      if (options.monoCampeao) finalPrice *= 1.30;       // Mono Campeão +30%
      if (options.correcaoPDL) finalPrice *= 1.30;       // Correção PDL +30%
      if (options.duoBoost) finalPrice *= 1.70;          // Duo Boost +70%
      if (options.vitoriaExtra) finalPrice *= 1.05;      // Vitória Extra +5%
      // Campeões (rotaseCampeoes) e Rotas (entregaExpressa) = FREE (sem efeito)

      console.log('Preço final com addons:', finalPrice);
      return finalPrice;
    } catch (error) {
      console.error("Erro ao calcular preço:", error);
      return 99.99; // Fallback para preço fixo
    }
  };

  // ====== Cálculo de Duração ======
  const calculateDuration = (from: string, to: string): number => {
    const allRanks = [
      "Ferro 4", "Ferro 3", "Ferro 2", "Ferro 1",
      "Bronze 4", "Bronze 3", "Bronze 2", "Bronze 1", 
      "Prata 4", "Prata 3", "Prata 2", "Prata 1",
      "Ouro 4", "Ouro 3", "Ouro 2", "Ouro 1",
      "Platina 4", "Platina 3", "Platina 2", "Platina 1",
      "Esmeralda 4", "Esmeralda 3", "Esmeralda 2", "Esmeralda 1",
      "Diamante 4", "Diamante 3", "Diamante 2", "Diamante 1",
      "Mestre",
      "Grão-Mestre",
      "Desafiante"
    ];

    const fromIndex = allRanks.indexOf(from);
    const toIndex = allRanks.indexOf(to);
    if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) return 0;

    const normalTiers = new Set(["Ferro", "Bronze", "Prata", "Ouro", "Platina", "Esmeralda"]);

    let totalDays = 0;
    for (let i = fromIndex; i < toIndex; i++) {
      const currentRank = allRanks[i];
      const tier = currentRank.split(" ")[0];
      if (tier === "Diamante") {
        totalDays += 2; // Diamante: 2 dias por divisão
      } else if (normalTiers.has(tier)) {
        totalDays += 1; // Tiers normais: 1 dia por divisão
      } else {
        // Mestre não adiciona
      }
    }

    const gmIndex = allRanks.indexOf("Grão-Mestre");
    const challengerIndex = allRanks.indexOf("Desafiante");
    if (toIndex >= gmIndex && gmIndex !== -1) totalDays += 15;
    if (toIndex >= challengerIndex && challengerIndex !== -1) totalDays += 30;

    return totalDays;
  };

  const calculateCurrentDuration = (): number => {
    const current = currentElo || defaultCurrentElo;
    const desired = desiredElo || defaultDesiredElo;
    const fromRank = normalizeRankString(current);
    const toRank = normalizeRankString(desired);
    const days = calculateDuration(fromRank, toRank);
    return days;
  };

  const formatDays = (days: number): string => {
    if (days <= 0) return '1 dia';
    return days === 1 ? '1 dia' : `${days} dias`;
  };

  // Calcular duração considerando Duo Boost
  const calculateDurationWithDuoBoost = (): number => {
    const baseDuration = calculateCurrentDuration();
    return options.duoBoost ? baseDuration * 2 : baseDuration;
  };

  // Lista de vantagens do serviço
  const benefits: string[] = [
    '90% de Win Rate',
    '0% Chance de Suspensão',
    'Feedback e Dicas in-game',
    'Chat Offline in-game',
    'Entrega Rápida e Garantida',
    'Disponibilidade 24/7',
    'Privacidade e Segurança',
    'Estatísticas e Histórico de Partidas',
    'Proteção VPN',
    'Política de Reembolso'
  ];

  const faqs: { question: string; answer: string }[] = [
    {
      question: 'Porquê escolher a Katter ?',
      answer: 'Equipe profissional, entrega rápida, suporte 24/7 e total transparência.',
    },
    {
      question: 'O site é seguro, posso confiar ?',
      answer: 'Sim. HTTPS, pagamentos confiáveis e práticas rígidas de segurança.',
    },
    {
      question: 'Como funciona o serviço ?',
      answer: 'Escolha o elo desejado, finalize o pedido, configure-o e acompanhe a entrega',
    },
    {
      question: 'É garantido que chegarei no elo ?',
      answer: 'Sim. Trabalhamos até atingir o elo contratado, com garantia.',
    },
    {
      question: 'Posso escolher quem vai jogar ?',
      answer: 'Pode solicitar; depende da disponibilidade do booster.',
    },
    {
      question: 'Posso cancelar ou alterar meu pedido ?',
      answer: 'Cancelamentos e alterações são permitidos. Reembolso apenas antes do início.',
    },
    {
      question: 'Posso acompanhar o serviço ?',
      answer: 'Sim. Progresso, estatísticas e opcional de stream ao vivo.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <section className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-6 max-w-6xl">

          <div className="flex flex-nowrap gap-6 justify-center items-stretch">
            
            {/* ELO Atual Card */}
            <div 
              onClick={() => openEloModal('current')}
              className="bg-gradient-to-b rounded-2xl p-8 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 w-[340px] h-[560px] flex flex-col"
               style={{
                 background: currentElo ? `linear-gradient(to bottom, ${currentElo.color}80, ${currentElo.bgColor}80)` : 'linear-gradient(to bottom, #f59e0b80, #b4530980)'
               }}
            >
              {/* Edit Icon */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>

              {/* Content Area */}
              <div className="text-center flex-1 flex flex-col items-center justify-center relative z-10">
                {/* Elo Emblem */}
                <div className="w-44 h-44 mx-auto mb-6 flex items-center justify-center shrink-0">
                  {currentElo?.emblem}
                </div>
                
                <div className="mb-6">
                  <p 
                    className="text-base font-medium mb-2"
                    style={{ color: currentElo ? `${currentElo.color}DD` : '#fbbf24DD' }}
                  >Selecione seu Elo Atual</p>
                  <h2 className="text-3xl font-extrabold text-white tracking-normal">
                    {currentElo?.name || 'OURO I'}
                  </h2>
                </div>
              </div>

              {/* Bottom Selectors */}
              <div className="space-y-3 relative z-10">
                {/* Spacer to preserve layout where PDL selector used to be */}
                <div className="invisible flex items-center justify-between bg-black/20 rounded-lg p-4 border" aria-hidden="true"></div>

              {/* Queue Type */}
                 <div 
                   className="flex items-center justify-between bg-black/20 rounded-lg p-4 border cursor-pointer"
                   style={{ borderColor: currentElo ? `${currentElo.color}30` : '#f59e0b30' }}
                   onClick={(e) => {
                     e.stopPropagation();
                     openQueueModal('current');
                   }}
                 >
                  <span className="text-white font-medium text-base">Fila</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl font-bold text-white">{queue}</span>
                    <div className="w-6 h-6 bg-black/30 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7V9C15 10.1 14.1 11 13 11V22H11V11C9.9 11 9 10.1 9 9V7H3V9C3 10.1 2.1 11 1 11H3V22H5V11C6.1 11 7 10.1 7 9V7C7 5.9 7.9 5 9 5H15C16.1 5 17 5.9 17 7V9C17 10.1 16.1 11 15 11H17V22H19V11C20.1 11 21 10.1 21 9Z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ELO Desejado Card */}
            <div 
              onClick={() => openEloModal('desired')}
              className="bg-gradient-to-b rounded-2xl p-8 cursor-pointer hover:scale-105 transition-transform duration-200 w-[340px] h-[560px] relative flex flex-col"
               style={{
                 background: desiredElo ? `linear-gradient(to bottom, ${desiredElo.color}80, ${desiredElo.bgColor}80)` : 'linear-gradient(to bottom, #14b8a680, #0f766e80)'
               }}
            >
              {/* Edit Icon */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>

              {/* Content Area */}
              <div className="text-center flex-1 flex flex-col items-center justify-center relative z-10">
                {/* Elo Emblem */}
                <div className="w-44 h-44 mx-auto mb-6 flex items-center justify-center shrink-0">
                  {desiredElo?.emblem || createEmblem('Platina')}
                </div>
                
                <div className="mb-6">
                  <p 
                    className="text-base font-medium mb-2"
                    style={{ color: desiredElo ? `${desiredElo.color}DD` : '#5eead4DD' }}
                  >Selecione o Elo Desejado</p>
                  <h2 className="text-3xl font-extrabold text-white tracking-normal">
                    {desiredElo?.name || 'PLATINA IV'}
                </h2>
              </div>
              </div>

               {/* Bottom Selectors */}
               <div className="space-y-3 relative z-10">
                 {/* Queue Type */}
                <div className="invisible flex items-center justify-between bg-black/20 rounded-lg p-4 border" aria-hidden="true"></div>

              {/* Server */}
                 <div 
                   className="flex items-center justify-between bg-black/20 rounded-lg p-4 border cursor-pointer"
                   style={{ borderColor: desiredElo ? `${desiredElo.color}30` : '#14b8a630' }}
                   onClick={(e) => {
                     e.stopPropagation();
                     openServerModal('desired');
                   }}
                 >
                   <span className="text-white font-medium text-base">Servidor</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl font-bold text-white">{serverOptions.find(s => s.value === server)?.label || server}</span>
                     <div className="w-6 h-6 bg-black/30 rounded-full flex items-center justify-center">
                       <svg className="w-3 h-3 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                       </svg>
                     </div>
                   </div>
                 </div>
              </div>
            </div>

            {/* Pricing & Options */}
            <div className="bg-gray-900 rounded-2xl p-5 border border-gray-700 w-[360px] h-[560px] flex flex-col overflow-hidden">
              
              {/* Orders Completed */}
              <div className="flex items-center mb-3">
                <span className="text-blue-400 text-sm font-medium">Mais de 20 Mil Pedidos Concluídos</span>
              </div>

              {/* Section Divider */}
              <div className="border-t border-gray-800 my-2"></div>

              {/* Resumo Header */}
              <h4 className="text-white font-bold mb-2 text-[13px] tracking-wide">Resumo do pedido</h4>

              {/* Price Section */}
              <div className="mb-4 flex flex-col">
                <h3 className="text-base font-bold text-white mb-4 leading-tight min-h-[2.5rem] flex items-center">
                  {currentElo?.name || 'OURO I'} AO {desiredElo?.name || 'PLATINA IV'}
                </h3>
                <div className="mb-4">
                  <div className="flex items-baseline gap-4">
                    <span className="text-2xl font-extrabold text-green-400">
                      R$ {calculateCurrentPrice().toFixed(2)}
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      R$ {(calculateCurrentPrice() / 0.75).toFixed(2)}
                    </span>
                    <span className="inline-block bg-green-600 text-white px-2 py-1 rounded text-[10px] font-bold">
                      25% OFF
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-sm text-gray-200 whitespace-nowrap">
                    <span className="truncate">Seu pedido terá início em: </span>
                    <span className="font-medium text-white">{options.duoBoost ? 'A Combinar' : '15 minutos'}</span>
                  </div>
                  <div className="text-sm text-gray-200 flex items-center gap-1 whitespace-nowrap">
                    <span className="shrink-0">Tempo estimado para conclusão:</span>
                    <span className="truncate font-medium text-white">{formatDays(calculateDurationWithDuoBoost())}</span>
                </div>
                </div>
              </div>

              {/* Customization Options */}
              <div className="mb-4 flex-1 mt-2">
                <h4 className="text-white font-bold mb-3 text-xs whitespace-nowrap">Adicione Complementos</h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {customizationOptions.map((option) => {
                    const selected = options[option.key as keyof typeof options];
                    return (
                      <button
                      key={option.key}
                        type="button"
                        onClick={() => setOptions({
                          ...options,
                          [option.key]: !selected
                        })}
                        aria-pressed={selected}
                        className={`w-full text-left flex items-center justify-between p-2 rounded-lg border transition-all text-[11px] ${
                          selected
                            ? 'border-orange-500 bg-transparent'
                            : 'border-gray-600 hover:border-gray-400 bg-transparent'
                        }`}
                    >
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="text-white font-medium truncate">{option.label}</div>
                        </div>
                        <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border ${option.badgeClass}`}>
                          {option.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA Button */}
               <button className="mt-auto w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all transform hover:scale-105 shadow-lg">
                 Contratar (R$ {calculateCurrentPrice().toFixed(2)})
               </button>
            </div>
            </div>
        </div>

        {/* Vantagens */}
        <div className="container mx-auto px-6 max-w-6xl mt-16">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl font-bold text-white">Vantagens</h3>
            <span className="text-xs font-bold text-orange-400 border border-orange-500/40 bg-orange-500/10 px-2 py-0.5 rounded">Grátis</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {benefits.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-cyan-500/40 bg-cyan-500/10">
                  <ServiceIcon3 className="w-4 h-4 text-cyan-400" />
                </span>
                <span className="text-gray-200 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-8" />
        </div>

        {/* Perguntas Frequentes (FAQ) */}
        <div className="container mx-auto px-6 max-w-6xl mt-8">
          <h3 className="text-2xl font-bold text-white mb-4">Perguntas Frequentes</h3>
          <div className="divide-y divide-gray-800">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              return (
                <div key={faq.question} className="py-1">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-white font-medium">{faq.question}</span>
                    <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-[max-height] duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
                    <p className="text-gray-300 pb-5 pr-2">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


       {/* Modal de Seleção de Servidor */}
       {showServerModal && (
         <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
           <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-4xl">
             <div className="flex items-center justify-between mb-8">
               <h2 className="text-3xl font-bold text-white">SERVIDOR</h2>
               <button
                 onClick={() => setShowServerModal(false)}
                 className="text-gray-400 hover:text-white text-3xl transition-colors"
               >
                 ✕
               </button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {serverOptions.map((serverOption) => (
                 <button
                   key={serverOption.value}
                   onClick={() => {
                     setServer(serverOption.value);
                     setShowServerModal(false);
                   }}
                   className="px-8 py-6 rounded-xl font-bold text-xl transition-all bg-gray-700 text-gray-300 hover:bg-orange-500 hover:text-white transform hover:scale-105 shadow-lg flex items-center justify-center"
                 >
                   {serverOption.label}
              </button>
               ))}
             </div>
           </div>
         </div>
       )}

       {/* Modal de Seleção de Fila */}
       {showQueueModal && (
         <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
           <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-2xl">
             <div className="flex items-center justify-between mb-8">
               <h2 className="text-3xl font-bold text-white">FILA</h2>
               <button
                 onClick={() => setShowQueueModal(false)}
                 className="text-gray-400 hover:text-white text-3xl transition-colors"
               >
                 ✕
               </button>
             </div>
             <div className="flex justify-center space-x-8">
               {queueOptions.map((queueOption) => (
                 <button
                   key={queueOption}
                   onClick={() => {
                     setQueue(queueOption);
                     setShowQueueModal(false);
                   }}
                   className="px-12 py-8 rounded-xl font-bold text-2xl transition-all bg-gray-700 text-gray-300 hover:bg-orange-500 hover:text-white transform hover:scale-105 shadow-lg min-w-[150px]"
                 >
                   {queueOption}
                 </button>
               ))}
              </div>
            </div>
         </div>
       )}

       {/* Modal de Seleção de Elo */}
       {showEloModal && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {modalType === 'current' ? 'ELO ATUAL' : 'ELO DESEJADO'}
              </h2>
              <button
                onClick={() => setShowEloModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Tier Selection */}
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 mb-6">
              {eloTiers.map((tier) => (
                <button
                  key={tier.name}
                  onClick={() => setSelectedTier(tier.name)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedTier === tier.name
                      ? 'border-orange-500 bg-orange-500/20'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <div className="w-16 h-16 mx-auto mb-2">
                    {tier.emblem}
                  </div>
                  <div className="text-white text-xs font-bold text-center">{tier.name}</div>
                </button>
              ))}
            </div>

             {/* Division Selection - Only show for tiers with divisions */}
             {!['Mestre', 'Grão Mestre', 'Desafiante'].includes(selectedTier) && (
               <div className="flex justify-center space-x-4 mb-6">
                 {divisions.map((division) => (
                   <button
                     key={division}
                     onClick={() => setSelectedDivision(division)}
                     className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                       selectedDivision === division
                         ? 'bg-orange-500 text-white'
                         : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                     }`}
                   >
                     {division}
                   </button>
                 ))}
               </div>
             )}

            {/* Select Button */}
            <div className="flex justify-center">
              <button
                onClick={selectElo}
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Selecionar →
              </button>
          </div>
        </div>
      </div>
      )}
    </section>
  );
};

export default EloBoostPage;
