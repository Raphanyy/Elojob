import React from 'react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface ReviewCardProps {
    orderId: string;
    timeAgo: string;
    service: string;
    comment: string;
    boosterAvatar: string;
    boosterName: string;
    initials: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className={`w-6 h-6 ${i < rating ? 'text-orange-500' : 'text-gray-600'}`} />
        ))}
    </div>
);


const ReviewCard: React.FC<ReviewCardProps> = ({ orderId, timeAgo, service, comment, boosterAvatar, boosterName, initials}) => (
    <div className="bg-[#1A1A1A] border border-[#2C2C2C] rounded-xl overflow-hidden w-[350px] snap-center flex flex-col flex-shrink-0">
        <div className="p-6 flex-grow">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold">{initials}</div>
                        <div>
                            <p className="font-semibold text-white">Pedido #{orderId}</p>
                            <p className="text-sm text-gray-500">{timeAgo}</p>
                        </div>
                    </div>
                </div>
                <StarRating rating={5} />
            </div>
            <div className="mt-4">
                <p className="text-sm text-gray-400">{service}</p>
                <p className="mt-2 text-white font-medium">{comment}</p>
            </div>
        </div>
        <div className="bg-[#101010] p-4 flex items-center space-x-3">
            <img src={boosterAvatar} alt={boosterName} className="w-10 h-10 rounded-full" />
            <div>
                <p className="text-sm text-gray-500">Booster avaliado</p>
                <p className="font-semibold text-white">{boosterName}</p>
            </div>
        </div>
    </div>
);

const Reviews: React.FC = () => {
    const reviewsData = [
        { orderId: "24804", timeAgo: "há 12 horas atrás", service: "Elo Boost - Esmeralda I (0 - 20) ao Diamante IV", comment: "O mais rápido de todo joga muito!!!!!!!!!", boosterAvatar: "https://cdn.discordapp.com/attachments/1064998131238125588/1183204220556550254/kuro.png", boosterName: "Kuro", initials: "KU" },
        { orderId: "24779", timeAgo: "há 2 dias atrás", service: "Elo Boost - 2 Vitórias no Platina I", comment: "Muito bom", boosterAvatar: "https://i.imgur.com/8bZJgQ9.png", boosterName: "Vayne", initials: "VA" },
        { orderId: "24756", timeAgo: "há 2 dias atrás", service: "Elo Boost - 5 Vitórias no Esmeralda IV", comment: "melhor booster, uns KDA absurdo, lee sin dele é insano", boosterAvatar: "https://cdn.discordapp.com/attachments/1064998131238125588/1183204221775790150/dudu.png", boosterName: "Green", initials: "GR" },
        { orderId: "24714", timeAgo: "há 4 dias atrás", service: "Elo - Esmeralda IV (21 - 40) ao Diamante IV", comment: "Super rápido e joga muito!!!!", boosterAvatar: "https://cdn.discordapp.com/attachments/1064998131238125588/1183204223126372432/vento.png", boosterName: "Zeri", initials: "ZE" }
    ];

    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };


    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <div className="flex justify-center mb-4">
                    <StarRating rating={5} />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
                    CONFIRA NOSSAS AVALIAÇÕES
                </h2>
                <p className="mt-4 text-gray-400">
                    Nota <span className="text-orange-500 font-bold">5 de 5</span> baseado em 2787 avaliações
                </p>

                <div className="mt-12 relative">
                    <button onClick={() => scroll('left')} className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/50 hover:bg-gray-700/80 rounded-full items-center justify-center text-white transition-colors">
                        <ChevronLeftIcon className="w-6 h-6"/>
                    </button>
                    <div ref={scrollContainerRef} className="flex space-x-8 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth" style={{scrollbarWidth: 'none'}}>
                        {reviewsData.map((review, index) => (
                            <ReviewCard key={index} {...review} />
                        ))}
                    </div>
                     <button onClick={() => scroll('right')} className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/50 hover:bg-gray-700/80 rounded-full items-center justify-center text-white transition-colors">
                        <ChevronRightIcon className="w-6 h-6"/>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Reviews;