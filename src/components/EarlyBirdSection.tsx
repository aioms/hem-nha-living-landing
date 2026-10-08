import { useInView } from '../hooks/useScroll';
import { useLanguage } from '../context/LanguageContext';

interface EarlyBirdSectionProps {
  onOpenForm: () => void;
  formUrl?: string; // Optional external Google Form link
}

export default function EarlyBirdSection({ onOpenForm, formUrl }: EarlyBirdSectionProps) {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView(0.15);

  const handleClick = (e: React.MouseEvent) => {
    if (formUrl) {
      // If external form URL is set, open in new tab
      window.open(formUrl, '_blank', 'noopener,noreferrer');
    } else {
      e.preventDefault();
      onOpenForm();
    }
  };

  return (
    <section
      id="early-bird"
      className="relative z-20 py-8 md:py-14 px-6 md:px-10 lg:px-16 max-w-[1280px] mx-auto"
      aria-label="Early Bird announcement"
    >
      <div
        ref={ref}
        className={`relative rounded-nagi-lg overflow-hidden shadow-floating-card border border-[#79a594]/30 bg-gradient-to-br from-[#1b2b24] via-[#21352c] to-[#182620] text-[#faf6ee] transition-all duration-800 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Top ambient color strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#79a594] via-[#ae7055] to-[#d9c7b0]" />

        {/* Ambient radial glows */}
        <div
          className="absolute -top-24 right-10 w-80 h-80 bg-[#79a594]/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 left-10 w-80 h-80 bg-[#ae7055]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 p-6 sm:p-10 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="max-w-2xl">
              {/* Sprout status badge */}
              <div className="inline-flex items-center gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#79a594]/20 border border-[#79a594]/35 text-[#d4ebe1] text-[0.625rem] xs:text-[0.68rem] sm:text-xs font-semibold tracking-wider uppercase mb-4 shadow-2xs backdrop-blur-xs whitespace-nowrap">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <span className="whitespace-nowrap">{t.earlyBird.sproutBadge}</span>
              </div>

              {/* Title */}
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-[#faf6ee] leading-tight tracking-tight mb-3.5">
                {t.earlyBird.headline}
              </h2>

              {/* Lead sentence */}
              <p className="font-sans text-sm sm:text-base text-[#d1e2da] leading-relaxed mb-6">
                {t.earlyBird.lead}{' '}
                <strong className="text-white font-semibold underline decoration-[#79a594]/60 underline-offset-4">
                  {t.earlyBird.leadHighlight}
                </strong>
                .{' '}
                {t.earlyBird.leadSuffix}
              </p>

              {/* Perk pills */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#dbe8e1]">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs">
                  <span>🏷️</span>
                  <span>{t.earlyBird.perk1}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs">
                  <span>✨</span>
                  <span>{t.earlyBird.perk2}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs">
                  <span>☕</span>
                  <span>{t.earlyBird.perk3}</span>
                </div>
              </div>
            </div>

            {/* Right Action */}
            <div className="shrink-0 flex flex-col items-start lg:items-end gap-3 lg:border-l lg:border-white/10 lg:pl-10">
              <div className="hidden lg:block text-right mb-1">
                <div className="text-xs uppercase tracking-widest text-[#a9c2b6] font-semibold">
                  {language === 'vi' ? 'Ưu đãi có giới hạn' : 'Limited Availability'}
                </div>
                <div className="text-sm text-[#faf6ee]/90 font-medium">
                  {language === 'vi' ? 'Dành cho 20 khách đăng ký đầu tiên' : 'For the first 20 registered guests'}
                </div>
              </div>

              <button
                onClick={handleClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#ae7055] hover:bg-[#c27c5f] active:bg-[#975f47] text-[#faf6ee] font-sans text-sm sm:text-base font-semibold tracking-wide shadow-lg hover:shadow-xl hover:shadow-[#ae7055]/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer group"
              >
                <span>{t.earlyBird.ctaButton}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <span className="font-sans text-xs text-[#a9c2b6] tracking-wide">
                {t.earlyBird.disclaimer}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
