import { Room } from '../types';
import { getRoomTheme, formatPriceCompact } from '../utils/themes';
import { useInView } from '../hooks/useScroll';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRoom } from '../utils/localizedContent';

interface MomentsTeaserSectionProps {
  rooms: Room[];
  onNavigateToMoments: (roomId?: string) => void;
  onBookingOpen: (room?: Room) => void;
}

export default function MomentsTeaserSection({
  rooms,
  onNavigateToMoments,
  onBookingOpen,
}: MomentsTeaserSectionProps) {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView(0.15);

  return (
    <section
      id="moments-preview"
      className="py-20 md:py-28 px-6 md:px-10 lg:px-16 max-w-[1280px] mx-auto"
      aria-label="Explore Hẻm Nhà Moments"
    >
      <div ref={ref}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div
              className={`arch-tag mb-4 transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span>{t.momentsTeaser.label}</span>
            </div>
            <h2
              className={`font-sans text-[clamp(2rem,4vw,3.25rem)] font-medium leading-tight text-nagi-cardEdge transition-all duration-700 delay-100 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {t.momentsTeaser.title}
            </h2>
            <p
              className={`text-base md:text-lg text-nagi-slate max-w-xl mt-3 transition-all duration-700 delay-200 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {t.momentsTeaser.desc}
            </p>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              onClick={() => onNavigateToMoments()}
              className="btn-primary text-sm px-6 py-3 flex items-center gap-2 group"
            >
              <span>{t.momentsTeaser.viewAllBtn}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* 4 Moment Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((rawRoom, idx) => {
            const room = getLocalizedRoom(rawRoom, language) || rawRoom;
            const theme = getRoomTheme(room);
            const isNight = room.momentKey === 'night';

            return (
              <div
                key={room.id}
                onClick={() => onNavigateToMoments(room.id)}
                className={`group cursor-pointer rounded-nagi-lg overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-floating-card flex flex-col justify-between ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  backgroundColor: theme.bgCard,
                  borderColor: theme.borderColor,
                  color: theme.textColor,
                  transitionDelay: `${(idx + 1) * 100}ms`,
                }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={room.images[0]?.url}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className="font-sans text-[0.6rem] tracking-wider uppercase px-2.5 py-1 rounded-nagi-pill font-medium backdrop-blur-sm"
                      style={{ backgroundColor: theme.pillBg, color: theme.pillText }}
                    >
                      {theme.timeEmoji} {room.momentTime}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div
                      className="font-sans text-[0.65rem] tracking-widest uppercase mb-1 opacity-60"
                      style={{ color: theme.mutedColor }}
                    >
                      {room.floor.split('—')[0].trim()} - {room.code}
                    </div>
                    <h3
                      className="font-sans text-2xl font-semibold mb-1"
                      style={{ color: theme.accentColor }}
                    >
                      {room.name}
                    </h3>
                    <div
                      className="font-sans text-xs tracking-wide mb-3 opacity-70 line-clamp-1"
                      style={{ color: theme.mutedColor }}
                    >
                      {room.subtitle}
                    </div>
                    <p className="text-xs line-clamp-2 opacity-80 mb-4">
                      {room.concept}
                    </p>
                  </div>

                  <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: theme.borderColor }}>
                    <div>
                      <div className="font-sans text-[0.6rem] uppercase tracking-wider opacity-60">
                        {t.momentsTeaser.fromLabel}
                      </div>
                      <div className="font-sans text-base font-bold" style={{ color: theme.accentColor }}>
                        {formatPriceCompact(room.shortTermPrice || 0)}{t.momentsTeaser.nightUnit}
                      </div>
                    </div>

                    <span
                      className="font-sans text-xs font-medium flex items-center gap-1 group-hover:underline"
                      style={{ color: theme.accentColor }}
                    >
                      {t.momentsTeaser.detailsBtn}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
