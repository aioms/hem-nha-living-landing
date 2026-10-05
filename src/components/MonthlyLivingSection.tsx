import { useInView } from '../hooks/useScroll';
import { useLanguage } from '../context/LanguageContext';

interface MonthlyLivingSectionProps {
  onBookingOpen: () => void;
  onNavigateToDiyLiving?: () => void;
}

export default function MonthlyLivingSection({ onBookingOpen, onNavigateToDiyLiving }: MonthlyLivingSectionProps) {
  const { t } = useLanguage();
  const [ref, inView] = useInView(0.15);

  return (
    <section
      id="monthly"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: '#f4ece1' }}
      aria-label="Monthly Living — Long-term & DIY Living"
    >
      {/* Decorative large kanji */}
      <div
        className="absolute -right-8 top-1/2 -translate-y-1/2 font-sans font-black text-[25vw] leading-none opacity-[0.03] select-none pointer-events-none text-nagi-terracotta tracking-tighter"
        aria-hidden="true"
      >
        家
      </div>

      <div ref={ref} className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: editorial image stack */}
          <div
            className={`relative transition-all duration-900 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            {/* Main image */}
            <div className="relative rounded-nagi-md overflow-hidden shadow-floating-card">
              <img
                src="/assets/photos/diy-living/hem-scandi/page_090.jpg"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedJpeg) {
                    target.dataset.triedJpeg = 'true';
                    target.src = '/assets/photos/diy-living/hem-scandi/page_090.jpeg';
                  } else {
                    target.onerror = null;
                    target.src = '/assets/photos/rooms/trua-he/hero.webp';
                  }
                }}
                alt="Long-term apartment interior at Hẻm Nhà Living"
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4f6b73]/20 via-transparent to-transparent" />
            </div>

            {/* Offset accent image */}
            <div className="absolute -bottom-6 -right-6 md:-right-10 w-[45%] rounded-nagi overflow-hidden shadow-floating-card border-4 border-[#f4ece1]">
              <img
                src="/assets/photos/diy-living/hem-diy-1/page_016.jpg"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedJpeg) {
                    target.dataset.triedJpeg = 'true';
                    target.src = '/assets/photos/diy-living/hem-diy-1/page_016.jpeg';
                  } else {
                    target.onerror = null;
                    target.src = '/assets/photos/rooms/som-mai/hero.webp';
                  }
                }}
                alt="Patio garden of DIY living"
                className="w-full aspect-square object-cover"
                loading="lazy"
              />
            </div>

            {/* Price badge floating */}
            <div className="absolute -top-5 left-6 bg-nagi-deepSlate text-nagi-sand rounded-nagi-md px-5 py-3 shadow-floating-card">
              <div className="font-sans text-[0.6rem] tracking-widest uppercase opacity-80 mb-0.5">{t.monthly.fromLabel}</div>
              <div className="font-sans text-2xl font-bold">4.5M</div>
              <div className="font-sans text-[0.6rem] tracking-widest uppercase opacity-80">{t.monthly.monthUnit}</div>
            </div>
          </div>

          {/* Right: content */}
          <div>
            <div
              className={`arch-tag mb-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <span>{t.monthly.label}</span>
              <span className="w-8 h-px bg-current inline-block opacity-40" />
              <span>{t.monthly.period}</span>
            </div>

            <h2
              className={`font-sans text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-tight text-nagi-slate mb-5 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              {t.monthly.title1}<br />{t.monthly.title2}
            </h2>

            <div
              className={`space-y-4 text-base md:text-lg text-nagi-slate leading-relaxed mb-8 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <p>
                {t.monthly.p1}
              </p>
              <div className="space-y-2 pl-1 text-sm md:text-base">
                <p>
                  {t.monthly.pDiy}
                </p>
                <p>
                  {t.monthly.pLiving}
                </p>
              </div>
            </div>

            {/* Benefits grid */}
            <div
              className={`grid grid-cols-2 gap-4 mb-8 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {[
                { icon: '🔌', title: t.monthly.benefits.utilities.title, desc: t.monthly.benefits.utilities.desc },
                { icon: '📶', title: t.monthly.benefits.wifi.title, desc: t.monthly.benefits.wifi.desc },
                { icon: '🧺', title: t.monthly.benefits.laundry.title, desc: t.monthly.benefits.laundry.desc },
                { icon: '☕', title: t.monthly.benefits.cafe.title, desc: t.monthly.benefits.cafe.desc },
                { icon: '🌿', title: t.monthly.benefits.rooftop.title, desc: t.monthly.benefits.rooftop.desc },
                { icon: '📹', title: t.monthly.benefits.cctv.title, desc: t.monthly.benefits.cctv.desc },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 p-3 rounded-nagi bg-white/70 border border-[#d9c7b0]/40 shadow-2xs"
                >
                  <span className="text-xl" aria-hidden="true">{icon}</span>
                  <div>
                    <div className="font-sans text-sm font-medium text-nagi-slate">{title}</div>
                    <div className="font-sans text-xs text-nagi-muted">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <button
                onClick={onBookingOpen}
                className="btn-primary text-base px-8 py-3.5"
              >
                {t.monthly.findSpaceBtn}
              </button>
              <button
                onClick={() => onNavigateToDiyLiving ? onNavigateToDiyLiving() : undefined}
                className="btn-ghost text-base px-8 py-3.5 flex items-center gap-2 group"
              >
                <span>{t.monthly.exploreStudiosBtn}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
