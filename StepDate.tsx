import React, { useState, useMemo } from 'react';
import { CONFIG } from './config';
import { CONTENT, Language } from './content';
import {
  makeSlots,
  toDateISO,
  toPersianDigits,
  getJalaliParts,
  AFGHAN_MONTHS,
  jalali,
} from './date';
import { isTaken } from './booking';
import { Video, Building, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface StepDateProps {
  dateISO: string;
  time: string;
  mode: 'online' | 'inperson';
  onChange: (fields: Partial<{ dateISO: string; time: string; mode: 'online' | 'inperson' }>) => void;
  errors: Record<string, string>;
  currentLang: Language;
}

export const StepDate: React.FC<StepDateProps> = ({
  dateISO,
  time,
  mode,
  onChange,
  errors,
  currentLang,
}) => {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'fa';

  // Current today reference (start of day)
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // View state: Year and Month offset or specific anchor date
  const [viewDate, setViewDate] = useState<Date>(() => {
    if (dateISO) {
      const parsed = new Date(dateISO + 'T00:00:00');
      if (!isNaN(parsed.getTime())) return parsed;
    }
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const allSlots = useMemo(() => {
    return makeSlots(CONFIG.slot.start, CONFIG.slot.end, CONFIG.slot.stepMin);
  }, []);

  // Weekday column names
  const weekdays = useMemo(() => {
    if (isRtl) {
      // Afghan week starts on Saturday: شنبه، یک‌شنبه، ...
      return ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
    }
    return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  }, [isRtl]);

  // Determine current viewed month/year metadata
  const currentMonthInfo = useMemo(() => {
    if (isRtl) {
      const jp = getJalaliParts(viewDate);
      const monthName = AFGHAN_MONTHS[jp.month - 1] || '';
      return {
        title: `${monthName} ${toPersianDigits(jp.year)}`,
        year: jp.year,
        month: jp.month,
      };
    } else {
      const title = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
      }).format(viewDate);
      return {
        title,
        year: viewDate.getFullYear(),
        month: viewDate.getMonth() + 1,
      };
    }
  }, [viewDate, isRtl]);

  // Navigate month
  const handlePrevMonth = () => {
    setViewDate((prev) => {
      const next = new Date(prev);
      next.setDate(15);
      next.setMonth(next.getMonth() - 1);
      return next;
    });
  };

  const handleNextMonth = () => {
    setViewDate((prev) => {
      const next = new Date(prev);
      next.setDate(15);
      next.setMonth(next.getMonth() + 1);
      return next;
    });
  };

  // Build grid days for the month
  const calendarCells = useMemo(() => {
    const cells: {
      date: Date;
      iso: string;
      label: string;
      isCurrentMonth: boolean;
      isPast: boolean;
      isToday: boolean;
      isSelected: boolean;
    }[] = [];

    if (isRtl) {
      // Find first day of current Jalali month
      const currentJalali = getJalaliParts(viewDate);

      // Step backwards to find day 1
      const startCandidate = new Date(viewDate);
      startCandidate.setHours(0, 0, 0, 0);
      while (getJalaliParts(startCandidate).day > 1) {
        startCandidate.setDate(startCandidate.getDate() - 1);
      }
      // Guarantee we are at day 1 of current Jalali month
      while (getJalaliParts(startCandidate).month !== currentJalali.month) {
        startCandidate.setDate(startCandidate.getDate() + 1);
      }

      // In Persian week, Saturday is index 0. (JS Date: 6 = Saturday, 0 = Sunday, 1 = Monday...)
      const firstWeekday = (startCandidate.getDay() + 1) % 7;

      // Leading days from previous month
      for (let i = firstWeekday - 1; i >= 0; i--) {
        const d = new Date(startCandidate);
        d.setDate(d.getDate() - (i + 1));
        const jp = getJalaliParts(d);
        const iso = toDateISO(d);
        cells.push({
          date: d,
          iso,
          label: toPersianDigits(jp.day),
          isCurrentMonth: false,
          isPast: d < today,
          isToday: d.getTime() === today.getTime(),
          isSelected: iso === dateISO,
        });
      }

      // Current month days
      const cur = new Date(startCandidate);
      while (getJalaliParts(cur).month === currentJalali.month) {
        const jp = getJalaliParts(cur);
        const iso = toDateISO(cur);
        const d = new Date(cur);
        cells.push({
          date: d,
          iso,
          label: toPersianDigits(jp.day),
          isCurrentMonth: true,
          isPast: d < today,
          isToday: d.getTime() === today.getTime(),
          isSelected: iso === dateISO,
        });
        cur.setDate(cur.getDate() + 1);
      }

      // Trailing days to fill grid
      const totalCells = Math.ceil(cells.length / 7) * 7;
      const needed = Math.max(35, totalCells) - cells.length;
      for (let i = 0; i < needed; i++) {
        const d = new Date(cur);
        const jp = getJalaliParts(d);
        const iso = toDateISO(d);
        cells.push({
          date: d,
          iso,
          label: toPersianDigits(jp.day),
          isCurrentMonth: false,
          isPast: d < today,
          isToday: d.getTime() === today.getTime(),
          isSelected: iso === dateISO,
        });
        cur.setDate(cur.getDate() + 1);
      }
    } else {
      // Gregorian calendar grid
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const startDayIndex = (firstDay.getDay() + 6) % 7;

      // Leading days
      for (let i = startDayIndex - 1; i >= 0; i--) {
        const d = new Date(year, month, -i);
        d.setHours(0, 0, 0, 0);
        const iso = toDateISO(d);
        cells.push({
          date: d,
          iso,
          label: String(d.getDate()),
          isCurrentMonth: false,
          isPast: d < today,
          isToday: d.getTime() === today.getTime(),
          isSelected: iso === dateISO,
        });
      }

      // Current month days
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const d = new Date(year, month, day);
        d.setHours(0, 0, 0, 0);
        const iso = toDateISO(d);
        cells.push({
          date: d,
          iso,
          label: String(day),
          isCurrentMonth: true,
          isPast: d < today,
          isToday: d.getTime() === today.getTime(),
          isSelected: iso === dateISO,
        });
      }

      // Trailing days
      const totalCells = Math.ceil(cells.length / 7) * 7;
      const needed = Math.max(35, totalCells) - cells.length;
      for (let i = 1; i <= needed; i++) {
        const d = new Date(year, month + 1, i);
        d.setHours(0, 0, 0, 0);
        const iso = toDateISO(d);
        cells.push({
          date: d,
          iso,
          label: String(i),
          isCurrentMonth: false,
          isPast: d < today,
          isToday: d.getTime() === today.getTime(),
          isSelected: iso === dateISO,
        });
      }
    }

    return cells;
  }, [viewDate, isRtl, today, dateISO]);

  const selectedDateLabel = useMemo(() => {
    if (!dateISO) return '';
    return jalali(dateISO, currentLang);
  }, [dateISO, currentLang]);

  return (
    <div className="space-y-6 text-start">
      <div>
        <h3 className="font-bold text-xl text-[#0D1929]">
          {t.booking.step3.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#596B82] mt-1">
          {t.booking.step3.subtitle}
        </p>
      </div>

      {/* Online / In-Person Mode Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-[#0D1929]">
          {t.booking.step3.modeLabel}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => onChange({ mode: 'inperson' })}
            className={`p-3.5 rounded-xl border flex items-center justify-center gap-2.5 text-xs font-bold transition-all cursor-pointer ${
              mode === 'inperson'
                ? 'bg-[#0D1929] border-[#0D1929] text-white shadow-xs'
                : 'bg-white border-[#D5CEBE] hover:border-[#0D1929] text-[#3A4B60]'
            }`}
          >
            <Building className="w-4 h-4 text-amber-400" />
            <span>{t.booking.step3.modeInPerson}</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => onChange({ mode: 'online' })}
            className={`p-3.5 rounded-xl border flex items-center justify-center gap-2.5 text-xs font-bold transition-all cursor-pointer ${
              mode === 'online'
                ? 'bg-[#0D1929] border-[#0D1929] text-white shadow-xs'
                : 'bg-white border-[#D5CEBE] hover:border-[#0D1929] text-[#3A4B60]'
            }`}
          >
            <Video className="w-4 h-4 text-amber-400" />
            <span>{t.booking.step3.modeOnline}</span>
          </motion.button>
        </div>
      </div>

      {/* Full Interactive Calendar Month View */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-[#0D1929]">
            {t.booking.step3.selectDay} <span className="text-[#B45309]">*</span>
          </label>
          {dateISO && (
            <span className="text-xs font-semibold text-[#B45309] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              {selectedDateLabel}
            </span>
          )}
        </div>

        {/* Calendar Card */}
        <div className="bg-white rounded-2xl border border-[#D5CEBE] p-4 sm:p-5 shadow-sm">
          {/* Calendar Header with Navigation */}
          <div className="flex items-center justify-between pb-3.5 border-b border-[#E8E2D4] mb-3">
            <div className="flex items-center gap-2 text-[#0D1929]">
              <CalendarIcon className="w-4 h-4 text-[#B45309]" />
              <h4 className="font-bold text-sm sm:text-base tracking-wide">
                {currentMonthInfo.title}
              </h4>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={isRtl ? handleNextMonth : handlePrevMonth}
                aria-label="Previous Month"
                className="w-8 h-8 rounded-lg border border-[#D5CEBE] hover:bg-[#F6F3EB] flex items-center justify-center text-[#0D1929] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewDate(new Date())}
                className="px-2.5 py-1 text-[11px] font-semibold text-[#596B82] hover:text-[#0D1929] rounded-md hover:bg-[#F6F3EB] transition-colors cursor-pointer"
              >
                {isRtl ? 'امروز' : 'Today'}
              </button>
              <button
                type="button"
                onClick={isRtl ? handlePrevMonth : handleNextMonth}
                aria-label="Next Month"
                className="w-8 h-8 rounded-lg border border-[#D5CEBE] hover:bg-[#F6F3EB] flex items-center justify-center text-[#0D1929] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekdays Row */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[11px] font-bold text-[#7E8E9E]">
            {weekdays.map((w, idx) => (
              <div key={idx} className="py-1">
                {w}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
            {calendarCells.map((cell) => {
              const disabled = cell.isPast;
              return (
                <button
                  key={cell.iso + '-' + cell.label}
                  type="button"
                  disabled={disabled}
                  onClick={() => onChange({ dateISO: cell.iso, time: '' })}
                  className={`aspect-square sm:aspect-auto sm:h-10 rounded-xl flex flex-col items-center justify-center text-xs sm:text-sm font-semibold transition-all relative cursor-pointer ${
                    disabled
                      ? 'text-gray-300 opacity-40 cursor-not-allowed hover:bg-transparent'
                      : cell.isSelected
                      ? 'bg-[#0D1929] text-white shadow-sm ring-2 ring-amber-400 font-bold'
                      : cell.isToday
                      ? 'bg-amber-50 text-[#B45309] border border-amber-300 font-bold hover:bg-amber-100'
                      : cell.isCurrentMonth
                      ? 'text-[#0D1929] hover:bg-[#F6F3EB] border border-transparent hover:border-[#D5CEBE]'
                      : 'text-[#9AA8B7] hover:bg-[#F6F3EB]'
                  }`}
                >
                  <span className="font-mono text-xs sm:text-sm">{cell.label}</span>
                  {cell.isToday && !cell.isSelected && (
                    <span className="w-1 h-1 rounded-full bg-[#B45309] absolute bottom-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {errors.dateISO && (
          <p className="text-xs text-red-600 font-medium">{errors.dateISO}</p>
        )}
      </div>

      {/* Available Time Slots Grid */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0D1929]">
          <Clock className="w-3.5 h-3.5 text-[#B45309]" />
          <label className="block">
            {t.booking.step3.selectSlot} <span className="text-[#B45309]">*</span>
          </label>
        </div>

        {!dateISO ? (
          <div className="p-4 rounded-xl bg-[#F5F3EC] text-xs text-[#596B82] text-center border border-[#E6E2D6]">
            {t.booking.selectDayPrompt}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {allSlots.map((slot) => {
              const booked = isTaken(dateISO, slot);
              const isSelected = time === slot;

              return (
                <button
                  key={slot}
                  type="button"
                  disabled={booked}
                  onClick={() => onChange({ time: slot })}
                  className={`py-2 px-1 text-center font-mono text-xs rounded-lg border transition-all ${
                    booked
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through opacity-60'
                      : isSelected
                      ? 'bg-[#B45309] border-[#B45309] text-white font-bold shadow-xs'
                      : 'bg-white border-[#D5CEBE] text-[#0D1929] hover:border-[#B45309] cursor-pointer'
                  }`}
                >
                  {isRtl ? toPersianDigits(slot) : slot}
                </button>
              );
            })}
          </div>
        )}
        {errors.time && (
          <p className="text-xs text-red-600 font-medium">{errors.time}</p>
        )}
      </div>

    </div>
  );
};
