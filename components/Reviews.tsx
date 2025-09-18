import React from 'react';
import { StarIcon } from './Icons';

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
    <div className="bg-[#1A1A1A] border border-[#2C2C2C] rounded-xl overflow-hidden w-[350px] snap-center flex flex-col flex-shrink-0" style={{minHeight: '280px'}}>
        <div className="p-6 flex-grow">
            <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                <div>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold">{initials}</div>
                        <div style={{textAlign: 'left'}}>
                            <p className="font-semibold text-white" style={{textAlign: 'left', margin: '0'}}>Pedido #{orderId}</p>
                            <p className="text-sm text-gray-500" style={{textAlign: 'left', margin: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{timeAgo}</p>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'flex-start'}}>
                    <StarRating rating={5} />
                </div>
            </div>
            <div className="mt-4" style={{textAlign: 'left', minHeight: '5.2em'}}>
                <p className="text-sm text-gray-400" style={{textAlign: 'left', margin: '0', lineHeight: '1.3', height: '2.6em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>{service}</p>
                <p className="mt-2 text-white font-medium" style={{textAlign: 'left', margin: '8px 0 0 0', lineHeight: '1.2', height: '2.4em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>{comment}</p>
            </div>
        </div>
        <div className="bg-[#101010] p-4">
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '12px'}}>
                <img src={boosterAvatar} alt={boosterName} className="w-10 h-10 rounded-full flex-shrink-0" />
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <p className="text-sm text-gray-500" style={{textAlign: 'left', margin: '0'}}>Booster avaliado</p>
                    <p className="font-semibold text-white" style={{textAlign: 'left', margin: '0'}}>{boosterName}</p>
                </div>
            </div>
        </div>
    </div>
);

const Reviews: React.FC = () => {
    const reviewsData = [
        { orderId: "24804", timeAgo: "há 14 minutos atrás", service: "Elo Boost - Esmeralda I ao Diamante IV", comment: "O mais rápido de todo joga muito!", boosterAvatar: "https://cdn.discordapp.com/attachments/1064998131238125588/1183204220556550254/kuro.png", boosterName: "Kuro", initials: "KU" },
        { orderId: "24779", timeAgo: "há 23 minutos atrás", service: "Elo Boost - 2 Vitórias no Platina I", comment: "Muito bom e rápido! Serviço excelente e profissional, recomendo para todos!", boosterAvatar: "https://i.imgur.com/8bZJgQ9.png", boosterName: "Vayne", initials: "VA" },
        { orderId: "24756", timeAgo: "há 40 minutos atrás", service: "Elo Boost - 5 Vitórias no Esmeralda IV", comment: "Melhor booster!", boosterAvatar: "https://cdn.discordapp.com/attachments/1064998131238125588/1183204221775790150/dudu.png", boosterName: "Green", initials: "GR" },
        { orderId: "24714", timeAgo: "há 1 hora atrás", service: "Elo - Esmeralda IV ao Diamante IV", comment: "Super rápido e joga muito! KDA absurdo e muito didático!", boosterAvatar: "https://cdn.discordapp.com/attachments/1064998131238125588/1183204223126372432/vento.png", boosterName: "Zeri", initials: "ZE" },
        { orderId: "24698", timeAgo: "há 2 horas atrás", service: "Elo Boost - Platina II ao Diamante III", comment: "Excelente!", boosterAvatar: "https://cdn.discordapp.com/attachments/1064998131238125588/1183204220556550254/kuro.png", boosterName: "Shadow", initials: "SH" },
        { orderId: "24687", timeAgo: "há 3 horas atrás", service: "Elo Boost - Ouro I ao Platina IV", comment: "Muito profissional e rápido! Serviço top, chegou no elo desejado!", boosterAvatar: "https://cdn.discordapp.com/attachments/1064998131238125588/1183204221775790150/dudu.png", boosterName: "Blade", initials: "BL" },
        { orderId: "24675", timeAgo: "há 4 horas atrás", service: "Elo Boost - Diamante III ao Mestre", comment: "Incrível! Chegou no Mestre!", boosterAvatar: "https://cdn.discordapp.com/attachments/1064998131238125588/1183204223126372432/vento.png", boosterName: "Storm", initials: "ST" },
        { orderId: "24662", timeAgo: "há 5 horas atrás", service: "Elo Boost - Esmeralda II ao Diamante I", comment: "Serviço perfeito, muito bom! Booster incrível e muito rápido!", boosterAvatar: "https://i.imgur.com/8bZJgQ9.png", boosterName: "Frost", initials: "FR" }
    ];

    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [startX, setStartX] = React.useState(0);
    const [scrollLeft, setScrollLeft] = React.useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
        scrollContainerRef.current.style.cursor = 'grabbing';
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.cursor = 'grab';
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.cursor = 'grab';
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Multiplicador para velocidade do arrasto
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };



    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <div className="flex justify-center mb-4">
                    <StarRating rating={5} />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-extrabold tracking-normal">
                    CONFIRA NOSSAS AVALIAÇÕES
                </h2>
                <p className="mt-4 text-gray-400">
                    Nota <span className="text-orange-500 font-bold">5 de 5</span> baseado em 2787 avaliações
                </p>

                <div className="mt-12">
                    <div 
                        ref={scrollContainerRef}
                        className="flex space-x-8 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth cursor-grab select-none" 
                        style={{scrollbarWidth: 'none'}}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        {reviewsData.map((review, index) => (
                            <ReviewCard key={index} {...review} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;