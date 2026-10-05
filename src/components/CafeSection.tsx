import { useInView } from '../hooks/useScroll';
import { useLanguage } from '../context/LanguageContext';

export default function CafeSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView(0.15);

  return (
    <section
      id="cafe"
      className="relative overflow-hidden py-24 md:py-36 bg-[#1e2a2e]"
      aria-label="Quando Quando Cafe"
    >
      {/* Background texture image */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/assets/photos/cafe/cafe-main-lounge.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e2a2e] via-[#1e2a2e]/85 to-[#1e2a2e]/25" />
      </div>

      <div ref={ref} className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left text */}
          <div>
            <div
              className={`arch-tag mb-8 !text-[#d9c7b0] !border-[#d9c7b0]/40 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <span>{t.cafe.label}</span>
            </div>

            <h2
              className={`font-sans font-normal text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-[#d9c7b0] mb-4 tracking-tight transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              {t.cafe.title}
            </h2>
            <p
              className={`font-sans text-sm tracking-[0.18em] uppercase text-[#79a594] mb-6 transition-all duration-700 delay-150 ${inView ? 'opacity-100' : 'opacity-0'}`}
            >
              {t.cafe.subtitle}
            </p>

            <div
              className={`space-y-5 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <p className="text-base md:text-lg text-[#faf6f0] leading-relaxed">
                {t.cafe.p1}
              </p>
              <p className="text-base md:text-lg text-[#d9c7b0]/90 leading-relaxed">
                {t.cafe.p2}
              </p>
            </div>

            {/* Cafe features */}
            <ul
              className={`mt-8 space-y-3 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {t.cafe.features.map((item) => (
                <li key={item} className="flex items-center gap-3 font-sans text-sm text-[#d9c7b0]">
                  <span className="text-[#79a594] text-xs">✦</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#booking"
              className="mt-10 inline-flex items-center gap-2 rounded-nagi-pill px-7 py-3 font-sans text-sm tracking-wide border border-[#d9c7b0]/50 text-[#d9c7b0] hover:bg-[#d9c7b0]/15 transition-all duration-200"
            >
              {t.cafe.ctaBtn}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Right: editorial photo grid */}
          <div
            className={`relative transition-all duration-900 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            {/* Main large photo */}
            <div className="relative rounded-nagi-md overflow-hidden">
              <img
                src="/assets/photos/cafe/cafe-bar.webp"
                alt="Quando Quando Cafe Bar"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>

            {/* Floating accent — library nook */}
            <div className="absolute -bottom-6 left-6 w-[48%] rounded-nagi overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-2 border-[#4f6b73]">
              <img
                src="/assets/photos/cafe/cafe-library-nook.webp"
                alt="Reading nook at Cafe"
                className="w-full aspect-square object-cover"
                loading="lazy"
              />
            </div>

            {/* Time badge */}
            <div className="absolute -top-4 -right-4 bg-[#d9c7b0] text-[#1e2a2e] rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg">
              <span className="font-sans text-2xl font-bold leading-none">{t.cafe.openBadgeTime}</span>
              <span className="font-sans text-[0.5rem] tracking-[0.2em] uppercase mt-0.5">{t.cafe.openBadgeLabel}</span>
            </div>
          </div>

        </div>

        {/* Secondary photo row */}
        <div
          className={`mt-20 grid grid-cols-3 gap-4 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {[
            { src: '/assets/photos/cafe/cafe-communal-table.webp', alt: 'Bàn dài cộng đồng trong Quando Quando Cafe' },
            { src: '/assets/photos/cafe/cafe-window-view.webp', alt: 'Góc cửa sổ nhìn ra hẻm yên tĩnh' },
            { src: '/assets/photos/cafe/cafe-main-lounge.webp', alt: 'Không gian lounge chính của Quando Quando Cafe' },
          ].map(({ src, alt }) => (
            <div key={src} className="rounded-nagi overflow-hidden">
              <img
                src={src}
                alt={alt}
                className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
