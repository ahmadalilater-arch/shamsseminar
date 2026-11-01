import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, CheckCircle2, X } from 'lucide-react';
import { Language } from './content';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  if (!isOpen) return null;
  const isRtl = currentLang === 'fa';

  return (
    <div className="fixed inset-0 z-50 bg-[#070E18]/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#D5CEBE] overflow-hidden text-start animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E6E2D6] flex items-center justify-between bg-[#F8F6F0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0D1929] text-amber-400 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-[#0D1929]">
                {isRtl ? 'حریم خصوصی و تدابیر امنیت معلومات' : 'Privacy Policy & Information Security'}
              </h3>
              <p className="text-xs text-[#596B82]">
                {isRtl ? 'تعهد رسمی مرکز توانمندسازی معلمان شمس' : 'Official commitment of Shams Teacher Empowerment Center'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl hover:bg-white text-[#7E8E9E] hover:text-[#0D1929] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#2C3E55] leading-relaxed">

          {/* Statement */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-600/20 text-[#0D1929]">
            <p className="font-medium">
              {isRtl
                ? 'مرکز توانمندسازی معلمان شمس متعهد است که تمام معلومات مکاتب، مدیران و معلمان گرامی را در بالاترین سطح رازداری و با رعایت اصول حرفه‌ای و قوانین آموزشی محفوظ نگه دارد.'
                : 'Shams Teacher Empowerment Center is committed to protecting all information of schools, principals, and teachers with strict professional confidentiality and academic governance.'}
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="p-4 rounded-xl border border-[#E8E2D4] bg-[#FDFCF7] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#0D1929]">
                <Lock className="w-4 h-4 text-[#B45309]" />
                <h4>{isRtl ? 'رمزگذاری و انتقال امن' : 'Secure Transmission'}</h4>
              </div>
              <p className="text-xs text-[#5E7086]">
                {isRtl
                  ? 'تمامی معلومات وارد شده در فرم ثبت نوبت از طریق پروتکل‌های استاندارد امنیتی (SSL/TLS) و بدون امکان دسترسی غیرمجاز منتقل می‌شوند.'
                  : 'All information submitted via the booking form is transmitted over standard SSL/TLS encryption without unauthorized third-party access.'}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#E8E2D4] bg-[#FDFCF7] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#0D1929]">
                <EyeOff className="w-4 h-4 text-[#B45309]" />
                <h4>{isRtl ? 'عدم افشا و فروش داده‌ها' : 'Zero Data Selling'}</h4>
              </div>
              <p className="text-xs text-[#5E7086]">
                {isRtl
                  ? 'معلومات تماس، شماره‌های تلفن و اسامی به هیچ وجه در اختیار شرکت‌های تبلیغاتی یا طرف‌های ثالث قرار داده نمی‌شود.'
                  : 'Contact details, phone numbers, and institution names are strictly never sold or shared with advertisers or third parties.'}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#E8E2D4] bg-[#FDFCF7] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#0D1929]">
                <Server className="w-4 h-4 text-[#B45309]" />
                <h4>{isRtl ? 'حق تصحیح و حذف' : 'Right to Erasure'}</h4>
              </div>
              <p className="text-xs text-[#5E7086]">
                {isRtl
                  ? 'هر زمان نماینده مکتب اراده نماید، می‌تواند با ارائه کد پیگیری، درخواست حذف کامل پیشینه نوبت یا شماره‌های ثبت‌شده را داشته باشد.'
                  : 'School representatives can request the complete deletion or correction of their appointment records at any time by quoting their tracking code.'}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#E8E2D4] bg-[#FDFCF7] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#0D1929]">
                <CheckCircle2 className="w-4 h-4 text-[#B45309]" />
                <h4>{isRtl ? 'رازداری اداری مکاتب' : 'School Confidentiality'}</h4>
              </div>
              <p className="text-xs text-[#5E7086]">
                {isRtl
                  ? 'ارزیابی‌ها و نیازسنجی‌های صنف‌ها و کادر مکتب فقط در قالب مشورتی داخلی میان مرکز شمس و اداره مکتب محرمانه تلقی می‌گردد.'
                  : 'Assessments, classroom evaluations, and school diagnostic reports remain strictly confidential between Shams Center and the respective school leadership.'}
              </p>
            </div>

          </div>

          <div className="text-xs text-[#7E8E9E] border-t border-[#E8E2D4] pt-4">
            {isRtl
              ? 'در صورت داشتن هرگونه سوال در مورد خط‌مشی حریم خصوصی و امنیت، می‌توانید مستقیماً از طریق واتساپ یا ایمیل با مدیریت مرکز در ارتباط باشید.'
              : 'For questions regarding our privacy policy and security practices, you can contact the administration via official WhatsApp or email.'}
          </div>

        </div>

        {/* Footer Button */}
        <div className="px-6 py-4 border-t border-[#E6E2D6] bg-[#F8F6F0] flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-6 py-2.5 rounded-xl bg-[#0D1929] hover:bg-[#182C44] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
          >
            {isRtl ? 'متوجه شدم و قبول دارم' : 'Close & Acknowledge'}
          </button>
        </div>

      </div>
    </div>
  );
};
