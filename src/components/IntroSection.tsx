import { useInView } from '../hooks/useScroll';
import { useLanguage } from '../context/LanguageContext';

export default function IntroSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView(0.2);

  return (
    <section
      id="intro"
      className="py-24 md:py-36 px-6 md:px-10 lg:px-16 max-w-[1280px] mx-auto"
      aria-label="About Hẻm Nhà Living"
    >
      <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: text content */}
        <div>
          {/* Section label */}
          <div
            className={`arch-tag mb-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="text-nagi-gold">凪</span>
            <span>{t.intro.label}</span>
          </div>

          <h2
            className={`font-sans text-[clamp(1.65rem,3.8vw,3.25rem)] font-medium leading-tight text-nagi-cardEdge mb-6 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <span className="block whitespace-nowrap">{t.intro.title1}</span>
            <span className="block whitespace-nowrap">{t.intro.title2}</span>
          </h2>

          <div
            className={`space-y-4 text-base md:text-lg text-nagi-slate leading-relaxed transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="space-y-1.5">
              <p>
                {t.intro.p1}
              </p>
              <p className="pl-3">
                {t.intro.p2}
              </p>
            </div>
            <div className="space-y-1.5 pl-1">
              <p className="font-medium text-nagi-charcoal">{t.intro.p3Title}</p>
              <p className="pl-3">
                {t.intro.p4}
              </p>
              <p className="pl-3">
                {t.intro.p5}
              </p>
            </div>
            <p>
              {t.intro.p6}
            </p>
            <p className="font-medium text-nagi-charcoal">
              {t.intro.p7}
            </p>
          </div>

          {/* Stats */}
          <div
            className={`mt-10 grid grid-cols-3 gap-6 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {[
              { num: t.intro.stat1Number, label: t.intro.stat1Label },
              { num: t.intro.stat2Number, label: t.intro.stat2Label },
              { num: t.intro.stat3Number, label: t.intro.stat3Label },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="font-sans text-4xl md:text-5xl font-light text-nagi-gold">{num}</div>
                <div className="font-sans text-xs uppercase tracking-widest text-nagi-muted mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: asymmetric image composition */}
        <div
          className={`relative transition-all duration-900 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
        >
          {/* Large image */}
          <div className="relative rounded-nagi-md overflow-hidden shadow-floating-card">
            <img
              src="/assets/photos/courtyard/atrium-tree.webp"
              alt="Giếng trời ngập ánh sáng tự nhiên với cây xanh treo và cầu thang gỗ"
              className="w-full aspect-[3/4] object-cover"
              loading="lazy"
            />
          </div>

          {/* Offset accent image */}
          <div className="absolute -bottom-8 -left-6 md:-left-10 w-[42%] rounded-nagi overflow-hidden shadow-floating-card border-4 border-nagi-sand">
            <img
              src="/assets/photos/architecture/facade-entrance.webp"
              alt="Lối vào boutique của Hẻm Nhà Living"
              className="w-full aspect-square object-cover"
              loading="lazy"
            />
          </div>

          {/* Decorative badge */}
          <div className="absolute -top-5 -right-3 md:-right-6 bg-nagi-cardEdge text-nagi-parchment rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-floating-card">
            <span className="font-serif italic text-xl leading-none">by</span>
            <span className="font-sans text-[0.5rem] tracking-[0.2em] uppercase">NK</span>
          </div>
        </div>
      </div>
    </section>
  );
}
