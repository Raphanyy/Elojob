import React from 'react';
import { ShieldLockIcon, VpnIcon, ClockIcon, CustomerSupportIcon, BanIcon, RefundIcon, TrophyIcon } from './Icons';

interface FeatureCardProps {
    title: string;
    description: string;
    content: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, content }) => (
    <div className="bg-[#101010] border border-gray-800 rounded-xl p-8 flex flex-col">
        <div className="flex-grow">{content}</div>
        <h3 className="mt-6 text-xl font-bold">{title}</h3>
        <p className="mt-2 text-gray-400 text-sm">{description}</p>
    </div>
);

interface IconFeatureProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const IconFeature: React.FC<IconFeatureProps> = ({ icon, title, description }) => (
    <div>
        <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500">
            {icon}
        </div>
        <h4 className="mt-4 font-bold text-white">{title}</h4>
        <p className="mt-1 text-sm text-gray-400">{description}</p>
    </div>
);

const Features: React.FC = () => {
    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-orange-500 font-semibold">RÁPIDO, FÁCIL E SEGURO</p>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-normal mt-2">
                    DECOLE COM AS VANTAGENS QUE PREPARAMOS PARA VOCÊ
                </h2>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        title="DASHBOARD MAIS MODERNA DO MERCADO"
                        description="Você acompanha o progresso, acessa estatísticas, tem chat com seu booster e total controle sobre o elojob."
                        content={<img src="https://i.imgur.com/nJgqL2r.png" alt="Dashboard preview" className="rounded-lg shadow-lg" />}
                    />
                    <FeatureCard
                        title="JOGAMOS COM AS SUAS CONFIGURAÇÕES"
                        description="Nossos boosters utilizam suas configurações e campeões preferidos para uma experiência personalizada e segura."
                        content={<img src="https://i.imgur.com/K3V2QoH.png" alt="Game settings" className="rounded-lg shadow-lg" />}
                    />
                    <FeatureCard
                        title="100% DE PRIVACIDADE E SEGURANÇA"
                        description="Utilizamos tecnologias de outro planeta para garantir que suas informações estejam seguras e ninguém saiba que você contratou um Elo Job (elojob)."
                        content={
                            <div className="flex items-center justify-center h-full">
                                <div className="w-32 h-32 bg-blue-500/10 rounded-full flex items-center justify-center">
                                    <ShieldLockIcon className="w-20 h-20 text-blue-500" />
                                </div>
                            </div>
                        }
                    />
                </div>

                <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12 text-left">
                    <IconFeature icon={<VpnIcon className="w-7 h-7"/>} title="UTILIZAMOS VPN" description="Protegemos sua conta com VPN avançada para evitar detecção" />
                    <IconFeature icon={<ClockIcon className="w-7 h-7"/>} title="PRAZO GARANTIDO" description="Entregamos seu boost no prazo prometido ou reembolsamos" />
                    <IconFeature icon={<CustomerSupportIcon className="w-7 h-7"/>} title="DISPONÍVEL 24/7" description="Nossos boosters estão sempre online para atender você" />
                    <IconFeature icon={<BanIcon className="w-7 h-7"/>} title="0% CHANCE DE SUSPENSÃO" description="Métodos seguros garantem que sua conta não será banida" />
                    <IconFeature icon={<RefundIcon className="w-7 h-7"/>} title="POLÍTICA DE REEMBOLSO" description="Se não ficar satisfeito, devolvemos 100% do seu dinheiro" />
                    <IconFeature icon={<TrophyIcon className="w-7 h-7"/>} title="VITÓRIA GARANTIDA" description="Taxa de vitória acima de 80% em todas as partidas" />
                </div>
            </div>
        </section>
    );
};

export default Features;