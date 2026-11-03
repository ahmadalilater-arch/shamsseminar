import React, { useState } from 'react';
import {
  CalendarPlus,
  BookCheck,
  CheckCircle2,
  Sparkles,
  Compass,
  GraduationCap,
  Layers,
  MonitorCheck,
  Target,
  ArrowLeft,
  Users2,
  Lightbulb,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTENT, Language } from '../content';

interface ProgramsProps {
  currentLang: Language;
  onRequestTopic: (topicTitle: string) => void;
}

type TabKey = 'priority' | 'specialized' | 'leaders' | 'delivery';

export const Programs: React.FC<ProgramsProps> = ({
  currentLang,
  onRequestTopic,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('priority');
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  return (
    <section
      id="programs"
      className="py-24 md:py-32 bg-gradient-to-b from-[#F6F3EB]/70 via-[#FDFBF7]/90 to-[#F6F3EB]/70 border-b border-[#E8E2D4] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with On-Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mb-10 text-start"
        >
          <div className="text-xs font-bold text-[#B45309] uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-3 h-0.5 bg-[#B45309] rounded-full" />
            <span>{t.programs.badge}</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#0B1524] leading-tight">
            {t.programs.title}
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 88 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full mt-3"
          />
        </motion.div>

        {/* Center Philosophy & Diagnostic Mission Callout */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mb-12 p-6 sm:p-8 rounded-3xl celestial-card border border-[#D2C9B6] shadow-sm text-start space-y-3 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center gap-2 text-xs font-bold text-[#B45309] mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{isRtl ? 'هویت و رویکرد تخصصی مرکز' : 'Center Identity & Diagnostic Approach'}</span>
          </div>
          <p className="text-sm sm:text-base text-[#0B1524] font-medium leading-[2.1]">
            {t.programs.introP1}
          </p>
          <p className="text-xs sm:text-sm text-[#5E7086] leading-[2.0]">
            {t.programs.introP2}
          </p>
        </motion.div>

        {/* Animated Segmented 4-Tab Control */}
        <div className="flex justify-start mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/95 border border-[#D2C9B6] shadow-2xs relative shrink-0">
            <button
              onClick={() => setActiveTab('priority')}
              type="button"
              className={`relative z-10 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'priority' ? 'text-white' : 'text-[#5E7086] hover:text-[#0B1524]'
              }`}
            >
              {t.programs.tabPriority}
              {activeTab === 'priority' && (
                <motion.div
                  layoutId="programTabActive"
                  className="absolute inset-0 bg-[#0B1524] rounded-xl -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('specialized')}
              type="button"
              className={`relative z-10 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'specialized' ? 'text-white' : 'text-[#5E7086] hover:text-[#0B1524]'
              }`}
            >
              {t.programs.tabSpecialized}
              {activeTab === 'specialized' && (
                <motion.div
                  layoutId="programTabActive"
                  className="absolute inset-0 bg-[#0B1524] rounded-xl -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('leaders')}
              type="button"
              className={`relative z-10 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'leaders' ? 'text-white' : 'text-[#5E7086] hover:text-[#0B1524]'
              }`}
            >
              {t.programs.tabLeaders}
              {activeTab === 'leaders' && (
                <motion.div
                  layoutId="programTabActive"
                  className="absolute inset-0 bg-[#0B1524] rounded-xl -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              type="button"
              className={`relative z-10 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'delivery' ? 'text-white' : 'text-[#5E7086] hover:text-[#0B1524]'
              }`}
            >
              {t.programs.tabDelivery}
              {activeTab === 'delivery' && (
                <motion.div
                  layoutId="programTabActive"
                  className="absolute inset-0 bg-[#0B1524] rounded-xl -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Tab Panes */}
        <AnimatePresence mode="wait">

          {/* TAB 1: Priority Topics (Part A) */}
          {activeTab === 'priority' && (
            <motion.div
              key="priority"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-start mb-6">
                <h3 className="font-bold text-lg sm:text-xl text-[#0B1524] flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#B45309]" />
                  <span>{t.programs.prioritySectionTitle}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#5E7086] mt-1">
                  {t.programs.prioritySectionDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {t.programs.priorityTopics.map((prog, idx) => (
                  <motion.div
                    key={prog.id}
                    whileHover={{ y: -6, borderColor: 'rgba(180, 83, 9, 0.5)' }}
                    className="celestial-card rounded-3xl p-7 hover:shadow-lg transition-all duration-300 text-start flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-bl-3xl pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8E2D4]">
                        <span className="font-mono text-xs font-bold text-[#B45309] bg-amber-500/10 px-3 py-1 rounded-full border border-amber-600/20">
                          {isRtl ? `اولویت ۰${prog.num} · ${prog.tag}` : `Priority 0${prog.num} · ${prog.tag}`}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-[#0B1524] text-amber-400 flex items-center justify-center font-bold font-mono text-xs shadow-2xs">
                          {isRtl ? prog.num : prog.num}
                        </div>
                      </div>

                      <h4 className="font-bold text-base sm:text-lg text-[#0B1524] mb-3 leading-snug group-hover:text-[#B45309] transition-colors">
                        {prog.title}
                      </h4>

                      <p className="text-xs text-[#5E7086] leading-relaxed mb-6 font-normal">
                        {prog.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E8E2D4]">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onRequestTopic(prog.title)}
                        type="button"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-[#B45309] text-[#0B1524] hover:text-white border border-[#D2C9B6] hover:border-[#B45309] text-xs font-bold transition-all cursor-pointer shadow-2xs hover:shadow-md"
                      >
                        <CalendarPlus className="w-4 h-4" />
                        <span>{t.programs.requestBtn}</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: Specialized & Supplementary Topics (Part B) */}
          {activeTab === 'specialized' && (
            <motion.div
              key="specialized"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-start mb-6">
                <h3 className="font-bold text-lg sm:text-xl text-[#0B1524] flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#B45309]" />
                  <span>{t.programs.specializedSectionTitle}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#5E7086] mt-1">
                  {t.programs.specializedSectionDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.programs.specializedTopics.map((prog, idx) => (
                  <motion.div
                    key={prog.id}
                    whileHover={{ y: -6, borderColor: 'rgba(180, 83, 9, 0.5)' }}
                    className="celestial-card rounded-3xl p-6 hover:shadow-lg transition-all duration-300 text-start flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8E2D4]">
                        <span className="font-mono text-xs font-bold text-[#B45309] bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-600/20">
                          {prog.tag}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#B45309] group-hover:bg-[#B45309] group-hover:text-white transition-colors">
                          <BookCheck className="w-4 h-4" />
                        </div>
                      </div>

                      <h4 className="font-bold text-sm sm:text-base text-[#0B1524] mb-2 leading-snug group-hover:text-[#B45309] transition-colors">
                        {prog.title}
                      </h4>

                      <p className="text-xs text-[#5E7086] leading-relaxed mb-6 font-normal">
                        {prog.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E8E2D4]">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onRequestTopic(prog.title)}
                        type="button"
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-[#B45309] text-[#0B1524] hover:text-white border border-[#D2C9B6] hover:border-[#B45309] text-xs font-bold transition-all cursor-pointer shadow-2xs hover:shadow-md"
                      >
                        <CalendarPlus className="w-4 h-4" />
                        <span>{t.programs.requestBtn}</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: Management Seminars for Leaders (Part C) */}
          {activeTab === 'leaders' && (
            <motion.div
              key="leaders"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-start mb-6">
                <h3 className="font-bold text-lg sm:text-xl text-[#0B1524] flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#B45309]" />
                  <span>{t.programs.leaderSectionTitle}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#5E7086] mt-1">
                  {t.programs.leaderSectionDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {t.programs.leaderTopics.map((prog, idx) => (
                  <motion.div
                    key={prog.id}
                    whileHover={{ y: -6, borderColor: 'rgba(180, 83, 9, 0.5)' }}
                    className="celestial-card-dark text-white rounded-3xl p-7 hover:shadow-xl transition-all duration-300 text-start flex flex-col justify-between group relative overflow-hidden ring-1 ring-amber-500/20"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-400/15 to-transparent rounded-bl-3xl pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                        <span className="font-mono text-xs font-bold text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                          {isRtl ? `مدیریت ۰${prog.num} · ${prog.tag}` : `Management 0${prog.num} · ${prog.tag}`}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold font-mono text-xs border border-amber-500/30">
                          {prog.num}
                        </div>
                      </div>

                      <h4 className="font-bold text-base sm:text-lg text-white mb-3 leading-snug group-hover:text-amber-300 transition-colors">
                        {prog.title}
                      </h4>

                      <p className="text-xs text-gray-300 leading-relaxed mb-6 font-normal">
                        {prog.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onRequestTopic(prog.title)}
                        type="button"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0B1524] font-bold text-xs transition-all cursor-pointer shadow-md"
                      >
                        <CalendarPlus className="w-4 h-4" />
                        <span>{t.programs.requestBtn}</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: Delivery & Evaluation Methodology (Part D) */}
          {activeTab === 'delivery' && (
            <motion.div
              key="delivery"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 text-start"
            >
              <div className="mb-6">
                <h3 className="font-bold text-lg sm:text-xl text-[#0B1524] flex items-center gap-2">
                  <MonitorCheck className="w-5 h-5 text-[#B45309]" />
                  <span>{t.programs.deliverySectionTitle}</span>
                </h3>
              </div>

              {/* Editorial summary box */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/90 p-6 sm:p-7 rounded-3xl border border-[#D2C9B6] shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#B45309]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
                    <span>{isRtl ? 'روش‌های برگزاری و کارگاه عملی' : 'Delivery Modes & Applied Workshops'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2C3E55] leading-[2.1]">
                    {t.programs.deliveryP1}
                  </p>
                </div>

                <div className="bg-white/90 p-6 sm:p-7 rounded-3xl border border-[#D2C9B6] shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{isRtl ? 'ارزیابی مداوم و پیگیری اثرگذاری' : 'Continuous Evaluation & Impact Tracking'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2C3E55] leading-[2.1]">
                    {t.programs.deliveryP2}
                  </p>
                </div>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
                {t.programs.deliveryPillars.map((pillar, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    className="p-5 rounded-2xl bg-[#F6F3EB]/80 border border-[#E8E2D4] shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#B45309] font-mono text-xs font-bold mb-3">
                      {idx + 1}
                    </div>
                    <h5 className="font-bold text-sm text-[#0B1524] mb-1.5">
                      {pillar.title}
                    </h5>
                    <p className="text-xs text-[#5E7086] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
};
