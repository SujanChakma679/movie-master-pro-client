

// import { Clapperboard, User } from 'lucide-react';
// import React, { useState, useEffect } from 'react';

// // AnimatedValue component
// const AnimatedValue = ({ target, suffix = '', duration = 1500 }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const increment = target / (duration / 10);
//     const timer = setInterval(() => {
//       start += increment;
//       if (start >= target) {
//         setCount(target);
//         clearInterval(timer);
//       } else {
//         setCount(Math.ceil(start));
//       }
//     }, 10);

//     return () => clearInterval(timer);
//   }, [target, duration]);

//   // Format numbers for millions (e.g., 3,500,000 → 3M)
//   const formatNumber = (num) => {
//     if (num >= 1000000) return Math.floor(num / 1000000) + 'M';
//     if (num >= 1000) return num.toLocaleString();
//     return num;
//   };

//   return <>{formatNumber(count) + suffix}</>;
// };

// // StaticCard component
// const StaticCard = () => {
//   const stats = [
//     {
//       title: 'Movies',
//       value: 2200,
//       suffix: ' +',
//       description: 'Total number of movies available on the platform',
//       icon: <Clapperboard size={28} />,
//       bg: 'bg-gradient-to-r from-amber-400 to-orange-500',
//     },
//     {
//       title: 'Total Users',
//       value: 3500000,
//       suffix: ' +',
//       description: 'Registered users across all regions',
//       icon: <User size={28} />,
//       bg: 'bg-gradient-to-r from-indigo-400 to-purple-500',
//     },
//   ];

//   return (
//     <section>
//       <div>
//         <h2>Key Platform Metrics at a Glance</h2>
//       </div>
//       <div className="w-11/12 flex flex-wrap justify-center gap-6 p-6">
//         {stats.map((item, index) => (
//           <div
//             key={index}
//             className={`w-100 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-all duration-300 ${item.bg}`}
//           >
//             <div className="p-5 flex items-center justify-between border-b border-white/20">
//               <div className="flex items-center gap-3">
//                 <div className="bg-white/20 p-2 rounded-lg">{item.icon}</div>
//                 <h2 className="text-lg font-semibold">{item.title}</h2>
//               </div>
//             </div>

//             <div className="p-6 text-center">
//               <h1 className="text-4xl font-bold mb-1">
//                 <AnimatedValue target={item.value} suffix={item.suffix} />
//               </h1>
//               <p className="text-sm opacity-90">{item.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default StaticCard;


// import React, { useState, useEffect } from 'react';
// import { Clapperboard, User } from 'lucide-react';

// // AnimatedValue component remains the same
// const AnimatedValue = ({ target, suffix, duration = 1500, color }) => {
//     const [currentCount, setCurrentCount] = useState(0);

//     const formatDisplay = (num, suf) => {
//         if (suf && suf.includes('M')) {
//             const displayNum = (num / 1000000).toFixed(num >= 10000000 ? 0 : 1);
//             return displayNum.endsWith('.0') ? displayNum.slice(0, -2) : displayNum;
//         }
//         return num.toLocaleString();
//     };

//     useEffect(() => {
//         let startTime = 0;
//         const finalValue = target;
//         if (finalValue <= 0) return;
//         const stepIncrement = finalValue / (duration / 10);
//         const intervalDuration = 10;

//         const counterTimer = setInterval(() => {
//             startTime += stepIncrement;
//             if (startTime >= finalValue) {
//                 setCurrentCount(finalValue);
//                 clearInterval(counterTimer);
//             } else {
//                 setCurrentCount(Math.ceil(startTime));
//             }
//         }, intervalDuration);

//         return () => clearInterval(counterTimer);
//     }, [target, duration]);

//     const valueClass = color === 'gold'
//         ? 'text-amber-300 text-shadow-gold shadow-xl'
//         : 'text-cyan-400 text-shadow-cyan shadow-xl';

//     return (
//         <h1 className={`text-4xl font-extrabold mb-1 tracking-tight ${valueClass}`}>
//             {formatDisplay(currentCount, suffix)}
//             {suffix}
//         </h1>
//     );
// };

// // StaticCard component (main component now)
// const StaticCard = () => {

//     const DEFAULT_STATS = [
//         {
//             title: 'Total Titles',
//             target: 2200,
//             suffix: '+',
//             description: 'Total number of unique film titles available on the platform.',
//             icon: <Clapperboard size={28} />,
//             color: 'gold',
//             bg: 'bg-[#28271a] border border-amber-500/30 shadow-2xl shadow-amber-900/40',
//         },
//         {
//             title: 'Active Users',
//             target: 3500000,
//             suffix: 'M +',
//             description: 'Total registered user accounts across all devices and regions.',
//             icon: <User size={28} />,
//             color: 'cyan',
//             bg: 'bg-[#1a2327] border border-cyan-500/30 shadow-2xl shadow-cyan-900/40',
//         },
//     ];

//     return (
//         <section className="p-8  text-white flex flex-col items-center">
//             <style jsx="true">{`
//                 .text-shadow-cyan {
//                     text-shadow: 0 0 8px rgba(0, 255, 255, 0.4), 0 0 15px rgba(0, 255, 255, 0.2);
//                 }
//                 .text-shadow-gold {
//                     text-shadow: 0 0 8px rgba(255, 215, 0, 0.6), 0 0 15px rgba(255, 215, 0, 0.3);
//                 }
//                 .icon-glow-cyan {
//                     box-shadow: 0 0 10px rgba(0, 255, 255, 0.5), inset 0 0 5px rgba(0, 255, 255, 0.3);
//                     border: 2px solid #00FFFF;
//                 }
//                 .icon-glow-gold {
//                     box-shadow: 0 0 10px rgba(255, 215, 0, 0.5), inset 0 0 5px rgba(255, 215, 0, 0.3);
//                     border: 2px solid #FFD700;
//                 }
//             `}</style>

//             <div className="max-w-4xl text-center mb-12">
//                 <h2 className="text-3xl font-bold text-gray-50 mb-3">Dashboard Key Performance Indicators</h2>
//                 <p className="text-gray-400 max-w-2xl mx-auto">
//                     These static cards provide a real-time snapshot of the platform's core metrics, displaying the total number of available content and the active user base with a smooth numerical counting animation on load.
//                 </p>
//             </div>

//             <div className="w-full flex flex-wrap justify-center gap-8 p-4">
//                 {DEFAULT_STATS.map((item, index) => (
//                     <div
//                         key={index}
//                         className={`w-full max-w-sm md:w-[45%] lg:w-[400px] p-8 rounded-3xl text-white transform transition-all duration-300 backdrop-blur-sm ${item.bg} hover:scale-[1.02] hover:shadow-cyan-500/50`}
//                     >
//                         <div className="flex flex-col gap-4">
//                             <div className="flex items-center gap-4">
//                                 <div className={`p-3 rounded-full bg-white/10 ${item.color === 'gold' ? 'icon-glow-gold text-amber-300' : 'icon-glow-cyan text-cyan-400'}`}>
//                                     {item.icon}
//                                 </div>
//                                 <h2 className="text-xl font-medium text-gray-300 tracking-wider">{item.title}</h2>
//                             </div>
//                             <div className="pt-2">
//                                 <AnimatedValue target={item.target} suffix={item.suffix} color={item.color} />
//                                 <p className="text-sm opacity-70 text-gray-400 mt-2">{item.description}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default StaticCard;

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
    //   bg: 'bg-gradient-to-r from-amber-400 to-orange-500',
     bg: 'bg-[#28271a] border border-amber-500/30 shadow-2xl shadow-amber-900/40',
    },
    {
      title: 'Active Users',
      target: 3500000,
      suffix: 'M+',
      description: 'Total registered user accounts across all devices and regions.',
      icon: <User size={28} />,
      color: 'cyan',
    //   bg: 'bg-gradient-to-r from-indigo-400 to-purple-500',
     bg: 'bg-[#1a2327] border border-cyan-500/30 shadow-2xl shadow-cyan-900/40',
    },
  ];

  return (
    <section className="p-8 text-white flex flex-col items-center">
      <div className="max-w-4xl text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-50 mb-3">
          Dashboard Key Performance Indicators
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          These static cards provide a real-time snapshot of the platform's core metrics, displaying the total number of available content and the active user base with a smooth numerical counting animation on load.
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

