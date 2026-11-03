import React, { useState } from 'react';
import { ArrowLeft, Compass, CheckCircle2, Sparkles, Sun, Shield, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTENT, Language } from '../content';

interface HeroProps {
  currentLang: Language;
  onBookClick: () => void;
  onModelClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onBookClick,
  onModelClick,
}) => {
  const [activeOrbitNode, setActiveOrbitNode] = useState<number>(0);
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#070D18] text-white">
      {/* 1. Cinematic Stock Photo Backdrop with layered high-contrast dark gradient overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2000&q=80"
          alt="Educational Workshop and Teacher Training"
          className="w-full h-full object-cover object-center opacity-25 scale-105 transform motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
        />
        {/* Deep celestial navy and solar warm radial gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060B14]/95 via-[#0B1524]/90 to-[#070D18]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060B14] via-[#0B1524]/80 to-transparent" />

        {/* Ambient solar glowing flares */}
        <div className="absolute -top-32 -left-32 w-96 h-96 hero-glow-sphere blur-3xl pointer-events-none opacity-80" />
        <div className="absolute top-1/3 -right-24 w-[32rem] h-[32rem] hero-glow-sphere blur-3xl pointer-events-none opacity-60" />

        {/* Subtle geometric starfield grid */}
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FCD34D 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center"
        >
          {/* Main Editorial Text Column */}
          <div className="lg:col-span-7 space-y-7 text-start">
            
            {/* Tagline kicker with glowing solar badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-400/35 text-xs md:text-sm font-semibold text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
              </span>
              <span className="tracking-wide text-amber-200">{t.hero.tagline}</span>
              <span className="text-amber-400/40" aria-hidden="true">·</span>
              <span className="text-slate-300 font-normal">{t.hero.location}</span>
            </motion.div>

            {/* Dominant Bilingual Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-black text-3xl sm:text-5xl md:text-5xl lg:text-[3.75rem] text-white leading-[1.25] tracking-tight drop-shadow-sm"
            >
              {t.hero.h1Part1}
              <span className="relative inline-block font-heading font-bold ps-2.5 text-amber-400">
                <span className="solar-amber-text-gradient drop-shadow-[0_2px_12px_rgba(245,158,11,0.4)]">
                  {t.hero.h1Part2}
                </span>
                <svg
                  className="absolute -bottom-3 inset-x-0 w-full h-3 text-amber-400/70 pointer-events-none drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path d="M0,6 Q50,12 100,6" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-200/90 leading-[1.9] max-w-2xl font-normal drop-shadow-xs"
            >
              {t.hero.sub}
            </motion.p>

            {/* Action Buttons with High-Converting Glow & Motion */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.035, boxShadow: '0 0 35px rgba(245, 158, 11, 0.55)' }}
                whileTap={{ scale: 0.98 }}
                onClick={onBookClick}
                type="button"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#D97706] text-[#0B1524] font-extrabold text-sm sm:text-base shadow-[0_4px_25px_rgba(217,119,6,0.4)] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                {/* Button shine sweep animation */}
                <span className="absolute inset-0 w-1/2 h-full hero-shimmer pointer-events-none opacity-40" />
                <span className="relative z-10">{t.hero.ctaPrimary}</span>
                <ArrowLeft
                  className={`w-5 h-5 relative z-10 text-[#0B1524] transition-transform duration-200 ${
                    isRtl ? 'group-hover:-translate-x-1' : 'rotate-180 group-hover:translate-x-1'
                  }`}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255, 255, 255, 0.12)', borderColor: 'rgba(245, 158, 11, 0.6)' }}
                whileTap={{ scale: 0.98 }}
                onClick={onModelClick}
                type="button"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white/10 backdrop-blur-md text-white font-bold text-sm sm:text-base border border-white/20 shadow-lg hover:text-amber-300 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <Compass className="w-5 h-5 text-amber-400" />
                <span>{t.hero.ctaSecondary}</span>
              </motion.button>
            </motion.div>

            {/* Assurances ribbon with animated checkmarks */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300"
            >
              {t.hero.assurances.map((item, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xs font-medium hover:border-amber-400/40 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-200">{item}</span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Side Column: Kinetic 3D Astrolabe & Solar Orbit Display with Glassmorphic Console */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative"
          >
            {/* Floating Trust Badge Top Right */}
            <div className="absolute -top-5 -right-3 sm:-right-5 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/40 backdrop-blur-md text-amber-200 text-xs font-semibold shadow-lg animate-float-gentle">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin [animation-duration:8s]" />
              <span>{isRtl ? '۱۰۰٪ آموزش کاربردی و ارزیابی‌شده' : '100% Practical & Verified'}</span>
            </div>

            <div className="celestial-card-dark rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-amber-400/50 transition-all duration-300 border border-white/15">
              
              {/* Radial flare behind dial */}
              <div className="absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-br from-amber-500/25 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tr from-amber-600/15 to-transparent rounded-full blur-2xl pointer-events-none" />

              {/* Header Ribbon of the Astrolabe */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-sm">
                    <Sun className="w-4.5 h-4.5 animate-spin [animation-duration:18s]" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-100">
                    {t.hero.matrixTitle}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-amber-300 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 shadow-xs">
                  {t.hero.matrixBadge}
                </span>
              </div>

              {/* Kinetic Astrolabe Dial Mechanism */}
              <div className="relative py-2 flex flex-col items-center justify-center z-10">
                
                {/* SVG Solar Axis Dial with smooth rotating motion */}
                <div className="w-56 h-56 relative flex items-center justify-center mb-6">
                  
                  {/* Outer slow-spinning decorative ring with degree markings */}
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
                    viewBox="0 0 240 240"
                    className="w-full h-full text-amber-200/25 absolute inset-0"
                  >
                    <circle cx="120" cy="120" r="112" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
                    <circle cx="120" cy="120" r="92" fill="none" stroke="#F59E0B" strokeOpacity="0.35" strokeWidth="1.2" />
                    <line x1="120" y1="8" x2="120" y2="232" stroke="#F59E0B" strokeOpacity="0.25" strokeWidth="0.75" />
                    <line x1="8" y1="120" x2="232" y2="120" stroke="#F59E0B" strokeOpacity="0.25" strokeWidth="0.75" />
                  </motion.svg>

                  {/* Middle counter-rotating astrolabe ring with 4 solar beacons */}
                  <motion.svg
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                    viewBox="0 0 240 240"
                    className="w-full h-full text-amber-400 absolute inset-0"
                  >
                    <circle cx="120" cy="120" r="62" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="5 7" />
                    <circle cx="120" cy="58" r="4.5" fill="#FCD34D" filter="drop-shadow(0 0 6px #F59E0B)" />
                    <circle cx="182" cy="120" r="4.5" fill="#FCD34D" filter="drop-shadow(0 0 6px #F59E0B)" />
                    <circle cx="120" cy="182" r="4.5" fill="#FCD34D" filter="drop-shadow(0 0 6px #F59E0B)" />
                    <circle cx="58" cy="120" r="4.5" fill="#FCD34D" filter="drop-shadow(0 0 6px #F59E0B)" />
                  </motion.svg>

                  {/* Core Golden Sun Core with breathing glow */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#101E33] via-[#0B1524] to-[#1F385C] border-2 border-amber-400 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)] cursor-pointer hover:border-amber-300 transition-all"
                  >
                    <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-sm pointer-events-none" />
                    <span className="font-heading text-lg font-bold text-amber-300 drop-shadow-sm">
                      {t.hero.sunCenter}
                    </span>
                    <span className="text-[9px] font-mono font-bold tracking-wider text-amber-400/90 -mt-0.5">
                      SHAMS
                    </span>
                  </motion.div>
                </div>

                {/* 3 Core Interactive Highlights from the content dictionary */}
                <div className="w-full space-y-2.5">
                  {t.hero.orbitCards.map((card, idx) => {
                    const isSelected = activeOrbitNode === idx;
                    return (
                      <motion.div
                        key={idx}
                        onClick={() => setActiveOrbitNode(idx)}
                        whileHover={{ x: isRtl ? -4 : 4 }}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                            : 'bg-white/5 border-white/10 hover:border-amber-400/40 hover:bg-white/10'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isSelected
                              ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-[#0B1524] shadow-md'
                              : 'bg-white/10 text-amber-300 border border-white/10'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div className="text-start">
                          <div className={`text-xs font-bold transition-colors ${isSelected ? 'text-amber-200' : 'text-slate-100'}`}>
                            {card.title}
                          </div>
                          <div className="text-[11px] text-slate-300/80 mt-0.5 leading-relaxed">
                            {card.desc}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

              </div>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
