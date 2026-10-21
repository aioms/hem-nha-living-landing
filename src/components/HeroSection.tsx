import { useInView, useParallax } from '../hooks/useScroll';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onBookingOpen: () => void;
  onNavigateToMoments: (momentId?: string) => void;
  onNavigateToMonthly?: () => void;
  onOpenEarlyBird?: () => void;
}

export default function HeroSection({
  onBookingOpen,
  onNavigateToMoments,
  onNavigateToMonthly,
  onOpenEarlyBird,
}: HeroSectionProps) {
  const { t } = useLanguage();
  const [headlineRef, headlineInView] = useInView(0, '0px');
  const [parallaxRef, parallaxOffset] = useParallax(0.2);

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#faf6f0]"
      aria-label="Hero section"
    >
      {/* Background image with parallax */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <img
          src="/assets/photos/architecture/facade-main.webp"
          alt="Mặt tiền boutique của Hẻm Nhà Living — ngôi nhà 5 tầng với ban công vòm Địa Trung Hải và cây xanh"
          className="w-full h-full object-cover object-top"
          loading="eager"
          fetchPriority="high"
        />
        {/* Editorial overlay: reveals the top ~1/3 of the building and sky, smoothly transitions into warm cream for logo and content */}
        {/* Top vignette subtle shadow for header legibility */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 via-black/20 to-transparent pointer-events-none" />

        {/* Vertical gradient: transparent top showing ~1/3 facade, softly fading into warm #faf6f0 at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#faf6f0]/65 via-55% to-[#faf6f0] to-85%" />

        {/* Horizontal light diffusion from left to keep headline, logo and CTAs readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf6f0]/75 via-[#faf6f0]/40 via-45% to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-[1280px] mx-auto w-full px-6 md:px-10 lg:px-16 pb-20 md:pb-28 pt-32">
        <div ref={headlineRef} className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className={`arch-tag mb-5 transition-all duration-500 flex flex-wrap items-center gap-2 ${headlineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          >
            <span>{t.hero.eyebrow}</span>
            <span className="w-8 h-px bg-current opacity-40 inline-block" />
            <span>{t.hero.city}</span>
            <span className="w-8 h-px bg-current opacity-40 inline-block hidden sm:inline-block" />
            <button
              onClick={() => onOpenEarlyBird ? onOpenEarlyBird() : document.getElementById('early-bird')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-800/15 hover:bg-emerald-800/25 border border-emerald-700/30 text-emerald-900 text-[0.625rem] xs:text-[0.68rem] sm:text-[0.7rem] font-bold tracking-tight sm:tracking-wide transition-all cursor-pointer shadow-2xs whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              <span className="whitespace-nowrap">{t.earlyBird.sproutBadge}</span>
            </button>
          </div>

          {/* Main headline logo - Left aligned flush with tagline text below */}
          <h1 className="sr-only">Hẻm Nhà Living</h1>
          <div
            className={`relative mb-6 transition-all duration-500 ${headlineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          >
            {/* Seamless organic ambient aura behind logo */}
            <div
              className="absolute -inset-8 -z-10 rounded-full pointer-events-none blur-2xl opacity-90"
              style={{
                background: 'radial-gradient(ellipse at 35% 50%, rgba(251, 245, 232, 0.95) 0%, rgba(251, 245, 232, 0.6) 50%, rgba(251, 245, 232, 0) 75%)',
              }}
              aria-hidden="true"
            />

            <img
              src="/logohemnha/logohem-14.png"
              alt="Hẻm Nhà Living"
              className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[560px] h-auto object-contain block drop-shadow-xs"
              loading="eager"
            />
          </div>

          {/* Tagline */}
          <p
            className={`text-[clamp(1.1rem,2.2vw,1.6rem)] text-nagi-slate max-w-xl leading-relaxed mb-8 transition-all duration-500 delay-100 ${headlineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          >
            {t.hero.taglineMoments}
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-500 delay-150 ${headlineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          >
            <button
              onClick={() => onNavigateToMoments()}
              className="btn-primary text-base px-8 py-3.5"
            >
              {t.hero.exploreRoomsBtn}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-1" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <button
              onClick={onBookingOpen}
              className="btn-ghost text-base px-8 py-3.5"
            >
              {t.hero.checkAvailabilityBtn}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute right-8 md:right-16 bottom-8 flex flex-col items-center gap-2 opacity-60">
          <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-nagi-muted rotate-90 mb-6">
            {t.hero.scrollDown}
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-[#2f5244]/70 to-transparent" />
        </div>

        {/* Accommodation options: Homestay 4 Khoảnh khắc & Thuê Dài Hạn */}
        <div
          className={`mt-12 sm:mt-14 transition-all duration-700 delay-500 ${headlineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          aria-label={t.hero.stayOptionsLabel}
        >
          {/* Subtle category header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-sans text-[0.68rem] tracking-[0.2em] uppercase text-nagi-slate/80 font-semibold">
              {t.hero.stayOptionsLabel}
            </span>
            <div className="w-8 h-px bg-nagi-slate/25" />
          </div>

          <div className="flex flex-row items-center gap-2.5 sm:gap-3.5 flex-wrap">
            {/* Khung 1: Homestay • 4 Moments */}
            <button
              type="button"
              onClick={() => onNavigateToMoments()}
              className="inline-flex items-center gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-white/75 hover:bg-white/95 backdrop-blur-md border border-[#22303f]/10 hover:border-amber-700/30 shadow-[0_2px_12px_-4px_rgba(34,48,63,0.06)] hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer group whitespace-nowrap"
              title={t.hero.homestayOption}
            >
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-950 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-amber-500/15 group-hover:bg-amber-500/25 rounded-xl transition-colors">
                <span>{t.hero.homestayOption}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="transition-transform group-hover:translate-x-0.5 opacity-70 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>

            {/* Khung 2: Long-term Studios */}
            <button
              type="button"
              onClick={() => onNavigateToMonthly ? onNavigateToMonthly() : onNavigateToMoments()}
              className="inline-flex items-center gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-white/75 hover:bg-white/95 backdrop-blur-md border border-emerald-800/20 hover:border-emerald-700/40 shadow-[0_2px_12px_-4px_rgba(27,77,62,0.08)] hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer group whitespace-nowrap"
              title={t.hero.longTermOption}
            >
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-950 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-emerald-500/15 group-hover:bg-emerald-500/25 rounded-xl transition-colors">
                <span>{t.hero.longTermOption}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="transition-transform group-hover:translate-x-0.5 opacity-70 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
