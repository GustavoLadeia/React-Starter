import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Coins, RotateCw, Trophy, Minus, Plus } from 'lucide-react';

// Symbols and their weights/multipliers
const SYMBOLS = [
    { char: '🍒', weight: 4, multiplier: 2 },
    { char: '🍋', weight: 4, multiplier: 3 },
    { char: '🍊', weight: 3, multiplier: 5 },
    { char: '🍇', weight: 3, multiplier: 10 },
    { char: '🔔', weight: 2, multiplier: 20 },
    { char: '💎', weight: 1, multiplier: 50 },
    { char: '7️⃣', weight: 1, multiplier: 100 },
];

const CARD_HEIGHT = 80; // Height of one symbol card
const REEL_COUNT = 3;

interface SlotMachineProps { }

export const SlotMachine: React.FC<SlotMachineProps> = () => {
    const [balance, setBalance] = useState(1000);
    const [bet, setBet] = useState(10);
    const [reels, setReels] = useState<string[]>(['7️⃣', '7️⃣', '7️⃣']);
    const [isSpinning, setIsSpinning] = useState(false);
    const [lastWin, setLastWin] = useState(0);
    const [message, setMessage] = useState('Boa sorte!');

    const controls = useAnimation();

    const getRandomSymbol = () => {
        // Simple weighted random selection could be implemented here, 
        // for now just uniform random for simplicity in this version, 
        // but let's try to simulate the weighted distribution slightly by expanding the array
        const weightedPool: string[] = [];
        SYMBOLS.forEach(s => {
            for (let i = 0; i < s.weight; i++) weightedPool.push(s.char);
        });
        return weightedPool[Math.floor(Math.random() * weightedPool.length)];
    };

    const spin = async () => {
        if (balance < bet) {
            setMessage("Saldo insuficiente!");
            return;
        }

        setIsSpinning(true);
        setBalance(prev => prev - bet);
        setLastWin(0);
        setMessage('Girando...');

        // Animate the spinning
        await controls.start({
            y: [0, -CARD_HEIGHT * 10], // Simulate spinning by moving strip up
            transition: { duration: 0.5, ease: "easeIn" }
        });

        // Determine result
        const newReels = Array(REEL_COUNT).fill(null).map(() => getRandomSymbol());

        // Reset position instantly to 0 but show new symbols (simulated)
        // In a real seamless loop we'd handle this differently, but for this simple version:
        setReels(newReels);

        // "Landing" animation
        await controls.start({
            y: [-CARD_HEIGHT, 0],
            transition: { duration: 0.3, type: "spring", stiffness: 200, damping: 20 }
        });

        checkWin(newReels);
        setIsSpinning(false);
    };

    const checkWin = (currentReels: string[]) => {
        const first = currentReels[0];
        if (currentReels.every(s => s === first)) {
            const symbolData = SYMBOLS.find(s => s.char === first);
            if (symbolData) {
                const winAmount = bet * symbolData.multiplier;
                setBalance(prev => prev + winAmount);
                setLastWin(winAmount);
                setMessage(`Ganhou! +${winAmount}`);
            }
        } else {
            setMessage('Tente novamente');
        }
    };

    const adjustBet = (amount: number) => {
        if (isSpinning) return;
        const newBet = bet + amount;
        if (newBet >= 10 && newBet <= balance) {
            setBet(newBet);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 p-6 w-full max-w-2xl mx-auto">
            {/* Header Stats */}
            <div className="flex w-full justify-between items-center bg-card p-4 rounded-xl shadow-sm border border-border">
                <div className="flex items-center gap-2 text-yellow-500">
                    <Coins className="h-6 w-6" />
                    <span className="font-bold text-xl">{balance}</span>
                </div>
                <div className="flex items-center gap-2 text-green-500">
                    <Trophy className="h-5 w-5" />
                    <span className="font-bold">Ganho: {lastWin}</span>
                </div>
            </div>

            {/* Slot Machine Display */}
            <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl border-4 border-yellow-600 w-full">
                {/* Decorative Top */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-600 px-6 py-1 rounded-b-lg shadow-md z-10">
                    <span className="text-white font-bold tracking-widest text-xs">CASINO ROYALE</span>
                </div>

                <div className="flex justify-center gap-2 md:gap-4 bg-black/50 p-4 rounded-xl inner-shadow overflow-hidden">
                    {reels.map((symbol, i) => (
                        <div key={i} className="relative w-24 h-32 md:w-32 md:h-40 bg-white rounded-lg flex items-center justify-center overflow-hidden border-2 border-gray-300 shadow-inner">
                            <motion.div
                                animate={controls}
                                className="text-6xl md:text-7xl select-none filter drop-shadow-md"
                            >
                                {symbol}
                            </motion.div>
                            {/* Overlay gradient for glass effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                {/* Payline indicator */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500/30 pointer-events-none -translate-y-1/2"></div>
            </div>

            {/* Status Message */}
            <motion.div
                key={message}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-bold text-primary h-8"
            >
                {message}
            </motion.div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row items-center gap-6 w-full justify-center">
                {/* Bet Controls */}
                <div className="flex items-center gap-3 bg-muted p-2 rounded-full border">
                    <button
                        onClick={() => adjustBet(-10)}
                        disabled={isSpinning || bet <= 10}
                        className="p-3 rounded-full hover:bg-background transition-colors disabled:opacity-50"
                    >
                        <Minus className="h-5 w-5" />
                    </button>
                    <div className="flex flex-col items-center w-24">
                        <span className="text-xs text-muted-foreground uppercase font-bold">Aposta</span>
                        <span className="font-bold text-lg">{bet}</span>
                    </div>
                    <button
                        onClick={() => adjustBet(10)}
                        disabled={isSpinning || bet >= balance}
                        className="p-3 rounded-full hover:bg-background transition-colors disabled:opacity-50"
                    >
                        <Plus className="h-5 w-5" />
                    </button>
                </div>

                {/* Spin Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={spin}
                    disabled={isSpinning}
                    className={`
                    relative px-12 py-4 rounded-full font-bold text-xl shadow-lg 
                    flex items-center gap-3 transition-all
                    ${isSpinning
                            ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                            : 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:shadow-orange-500/25 ring-2 ring-orange-400 ring-offset-2 ring-offset-background'}
                `}
                >
                    <RotateCw className={`h-6 w-6 ${isSpinning ? 'animate-spin' : ''}`} />
                    {isSpinning ? 'GIRANDO...' : 'GIRAR'}
                </motion.button>
            </div>
        </div>
    );
};
