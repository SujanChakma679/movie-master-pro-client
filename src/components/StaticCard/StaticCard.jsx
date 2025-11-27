

import React, { useState, useEffect } from 'react';
import { Clapperboard, User } from 'lucide-react';

// AnimatedValue component
const AnimatedValue = ({ target, suffix, duration = 1500, color }) => {
  const [currentCount, setCurrentCount] = useState(0);

  const formatDisplay = (num, suf) => {
    if (suf && suf.includes('M')) {
      const displayNum = (num / 1000000).toFixed(num >= 10000000 ? 0 : 1);
      return displayNum.endsWith('.0') ? displayNum.slice(0, -2) : displayNum;
    }
    return num.toLocaleString();
  };

  useEffect(() => {
    let startTime = 0;
    const finalValue = target;
    if (finalValue <= 0) return;
    const stepIncrement = finalValue / (duration / 10);

    const counterTimer = setInterval(() => {
      startTime += stepIncrement;
      if (startTime >= finalValue) {
        setCurrentCount(finalValue);
        clearInterval(counterTimer);
      } else {
        setCurrentCount(Math.ceil(startTime));
      }
    }, 10);

    return () => clearInterval(counterTimer);
  }, [target, duration]);

  const valueClass =
    color === 'gold'
      ? 'text-amber-300 drop-shadow-[0_0_8px_rgb(255,215,0)] drop-shadow-lg'
      : 'text-cyan-400 drop-shadow-[0_0_8px_rgb(0,255,255)] drop-shadow-lg';

  return (
    <h1 className={`text-4xl font-extrabold mb-1 tracking-tight ${valueClass}`}>
      {formatDisplay(currentCount, suffix)}
      {suffix}
    </h1>
  );
};

// StaticCard component
const StaticCard = () => {
  const DEFAULT_STATS = [
    {
      title: 'Total Movies',
      target: 2200,
      suffix: '+',
      description: 'Total number of unique film titles available on the platform.',
      icon: <Clapperboard size={28} />,
      color: 'gold',
    
     bg: 'bg-[#28271a] border border-amber-500/30 shadow-2xl shadow-amber-900/40',
    },
    {
      title: 'Active Users',
      target: 3500000,
      suffix: 'M+',
      description: 'Total registered user accounts across all devices and regions.',
      icon: <User size={28} />,
      color: 'cyan',
   
     bg: 'bg-[#1a2327] border border-cyan-500/30 shadow-2xl shadow-cyan-900/40',
    },
  ];

  return (
    <section className="p-8 flex flex-col items-center">
      <div className="max-w-4xl text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">
          Dashboard Key Performance Indicators
        </h2>
        <p className="text-gray-500 text-xl max-w-2xl mx-auto">
          Our KPIs showcase the platform's vital stats: 2,200+ movies in our catalog and over 3.5M+ active users. These figures confirm the platform's robust growth and wide appeal.
        </p>
      </div>

      <div className="w-full flex flex-wrap justify-center gap-8 p-4">
        {DEFAULT_STATS.map((item, index) => (
          <div
            key={index}
            className={`w-full max-w-sm md:w-[45%] lg:w-[400px] p-8 rounded-3xl text-white transform transition-all duration-300 backdrop-blur-sm ${item.bg} hover:scale-[1.02] hover:shadow-lg`}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-full ${
                    item.color === 'gold'
                      ? 'bg-white/10 border-2 border-amber-400 shadow-[0_0_10px_rgb(255,215,0)]'
                      : 'bg-white/10 border-2 border-cyan-400 shadow-[0_0_10px_rgb(0,255,255)]'
                  }`}
                >
                  {item.icon}
                </div>
                <h2 className="text-xl font-medium text-gray-300 tracking-wider">
                  {item.title}
                </h2>
              </div>
              <div className="pt-2">
                <AnimatedValue
                  target={item.target}
                  suffix={item.suffix}
                  color={item.color}
                />
                <p className="text-sm opacity-70 text-gray-400 mt-2">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StaticCard;

