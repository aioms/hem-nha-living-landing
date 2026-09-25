import { useInView, useParallax } from '../hooks/useScroll';

export default function HeroSection({ onBookingOpen }: { onBookingOpen: () => void }) {
  const [headlineRef, headlineInView] = useInView(0.1);
  const [parallaxRef, parallaxOffset] = useParallax(0.2);

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#fbf5e8]"
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
        {/* editorial overlay — keeps photo authentic, adds text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf5e8]/30 via-transparent to-[#fbf5e8]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5e8]/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-[1280px] mx-auto w-full px-6 md:px-10 lg:px-16 pb-20 md:pb-28 pt-32">
        <div ref={headlineRef}>
          {/* Eyebrow */}
          <div
            className={`arch-tag mb-6 transition-all duration-700 ${headlineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span>Boutique Homestay & Living</span>
            <span className="w-8 h-px bg-nagi-muted/50 inline-block" />
            <span>Ho Chi Minh City</span>
          </div>

          {/* Main headline — editorial scale */}
          <h1
            className={`font-script text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] text-nagi-cardEdge mb-4 transition-all duration-800 delay-100 ${headlineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            Hẻm Nhà
            <span className="block text-[clamp(1.2rem,3vw,2.8rem)] font-sans font-light tracking-[0.25em] text-nagi-terracotta uppercase mt-2 ml-1">
              Living
            </span>
          </h1>

          {/* Tagline */}
          <p
            className={`font-serif text-[clamp(1.1rem,2.2vw,1.6rem)] text-nagi-slate max-w-xl leading-relaxed mb-10 transition-all duration-700 delay-200 ${headlineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Nơi thời gian dừng lại qua bốn khoảnh khắc.<br />
            <em>Sớm Mai. Trưa Hè. Hoàng Hôn. Đêm Sao.</em>
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${headlineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <a
              href="#rooms"
              className="btn-primary text-base px-8 py-3.5"
            >
              Khám phá phòng
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-1" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <button
              onClick={onBookingOpen}
              className="btn-ghost text-base px-8 py-3.5"
            >
              Kiểm tra phòng trống
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute right-8 md:right-16 bottom-8 flex flex-col items-center gap-2 opacity-50">
          <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-nagi-muted rotate-90 mb-6">Cuộn xuống</span>
          <div className="w-px h-16 bg-gradient-to-b from-nagi-gold to-transparent" />
        </div>

        {/* Room moment pill teaser */}
        <div
          className={`mt-16 flex flex-wrap gap-3 transition-all duration-700 delay-500 ${headlineInView ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Các phòng theo thời điểm"
        >
          {[
            { moment: 'Sớm Mai', color: '#f4e8d2', text: '#79683f', emoji: '🌅' },
            { moment: 'Trưa Hè', color: '#eedcc0', text: '#5c4016', emoji: '☀️' },
            { moment: 'Hoàng Hôn', color: '#f3ded0', text: '#7a3520', emoji: '🌇' },
            { moment: 'Đêm Sao', color: '#22303f', text: '#d8bc8e', emoji: '🌙' },
          ].map(({ moment, color, text, emoji }) => (
            <a
              key={moment}
              href={`#${moment.toLowerCase().replace(' ', '-')}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-nagi-pill text-sm font-sans transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: color, color: text }}
            >
              <span aria-hidden="true">{emoji}</span>
              {moment}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
