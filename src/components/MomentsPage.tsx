import { useState, useEffect, useRef } from 'react';
import { Room } from '../types';
import { getRoomTheme, formatPriceCompact } from '../utils/themes';
import { useInView } from '../hooks/useScroll';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRoom } from '../utils/localizedContent';

interface MomentsPageProps {
  rooms: Room[];
  onRoomSelect: (room: Room) => void;
  onViewDetail: (room: Room) => void;
  onNavigateHome: () => void;
}

interface RoomCardItemProps {
  room: Room;
  index: number;
  onSelect: (room: Room) => void;
  onDetail: (room: Room) => void;
}

function RoomCardItem({ room: rawRoom, index, onSelect, onDetail }: RoomCardItemProps) {
  const { t, language } = useLanguage();
  const room = getLocalizedRoom(rawRoom, language) || rawRoom;
  const [imgIdx, setImgIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView(0.1);
  const theme = getRoomTheme(room);
  const isEven = index % 2 === 0;
  const isNight = room.momentKey === 'night';

  // Auto-slide images every 2.5 seconds (pauses on hover)
  useEffect(() => {
    if (isHovered || room.images.length <= 1) return;
    const interval = setInterval(() => {
      setImgIdx(prev => (prev + 1) % room.images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovered, room.images.length]);

  return (
    <article
      id={room.id}
      ref={ref}
      className={`relative scroll-mt-28 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
      aria-label={`Phòng ${room.name}`}
    >
      <div
        className={`rounded-nagi-lg overflow-hidden flex flex-col ${
          isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
        } shadow-floating-card lg:min-h-[520px] transition-transform duration-300`}
        style={{ backgroundColor: theme.bgCard }}
      >
        {/* Image gallery side with horizontal slide transition */}
        <div
          className="relative lg:w-[54%] overflow-hidden group min-h-[340px] md:min-h-[420px] lg:min-h-[500px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex h-full w-full transition-transform duration-700 ease-in-out will-change-transform"
            style={{ transform: `translateX(-${imgIdx * 100}%)` }}
          >
            {room.images.map((img, i) => (
              <div
                key={img.url + i}
                className="w-full h-full flex-shrink-0 relative"
              >
                <img
                  src={img.url}
                  alt={img.caption || room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>

          {/* Prev / Next controls on hover */}
          {room.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImgIdx(prev => (prev - 1 + room.images.length) % room.images.length);
                }}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/35 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer shadow-md hover:scale-105"
                aria-label={t.momentsPage.prevImg}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImgIdx(prev => (prev + 1) % room.images.length);
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/35 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer shadow-md hover:scale-105"
                aria-label={t.momentsPage.nextImg}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          {/* Time badge */}
          <div className="absolute top-5 left-5 z-10">
            <span
              className="font-sans text-[0.65rem] tracking-[0.16em] uppercase px-3 py-1.5 rounded-nagi-pill font-medium shadow-sm backdrop-blur-sm"
              style={{ backgroundColor: theme.pillBg, color: theme.pillText }}
            >
              {theme.timeEmoji} {room.momentTime}
            </span>
          </div>

          {/* Availability badge */}
          <div className="absolute top-5 right-5 z-10">
            <span
              className={`font-sans text-[0.65rem] tracking-wider uppercase px-3 py-1.5 rounded-nagi-pill font-medium backdrop-blur-sm ${
                room.isAvailable
                  ? 'bg-emerald-50/90 text-emerald-700 border border-emerald-200/50'
                  : 'bg-red-50/90 text-red-600 border border-red-200/50'
              }`}
            >
              {room.isAvailable
                ? (language === 'vi' ? '● CÒN PHÒNG' : '● AVAILABLE')
                : (language === 'vi' ? '● HẾT PHÒNG' : '● BOOKED')}
            </span>
          </div>

          {/* Thumbnail strip */}
          {room.images.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 flex gap-1.5 z-10">
              {room.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                    i === imgIdx ? 'bg-white shadow' : 'bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Xem ảnh ${i + 1}: ${img.caption}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content side */}
        <div
          className="lg:w-[46%] flex flex-col justify-between p-7 md:p-10 lg:p-11"
          style={{ color: theme.textColor }}
        >
          <div>
            {/* Header info: Code & Floor */}
            <div
              className="font-sans text-xs tracking-[0.2em] uppercase mb-2.5 opacity-60 font-medium"
              style={{ color: theme.mutedColor }}
            >
              {room.code} · {room.floor}
            </div>

            {/* Title */}
            <h3
              className="font-sans font-medium text-[clamp(2.2rem,4vw,3.25rem)] leading-none mb-1 tracking-tight"
              style={{ color: theme.accentColor }}
            >
              {room.name}
            </h3>

            {/* Subtitle */}
            <div
              className="font-sans text-xs md:text-sm tracking-wide mb-3 opacity-70"
              style={{ color: theme.mutedColor }}
            >
              {room.subtitle}
            </div>

            {/* Concept */}
            <p
              className="font-sans text-[0.7rem] uppercase tracking-wider mb-5 opacity-70 font-semibold"
              style={{ color: theme.mutedColor }}
            >
              {room.concept}
            </p>

            {/* Story */}
            <p
              className="text-sm md:text-base leading-relaxed mb-6 opacity-85"
              style={{ color: theme.textColor }}
            >
              {room.story}
            </p>

            {/* Specs Grid */}
            <div
              className="grid grid-cols-2 gap-3 mb-6 text-sm"
              style={{ borderTop: `1px solid ${theme.borderColor}`, paddingTop: '1rem' }}
            >
              {[
                { icon: '⬛', label: language === 'vi' ? 'DIỆN TÍCH' : 'AREA', val: room.area },
                { icon: '👥', label: language === 'vi' ? 'SỨC CHỨA' : 'CAPACITY', val: language === 'vi' ? room.capacity : room.capacity.replace('người lớn', 'adults') },
                { icon: '🛏️', label: language === 'vi' ? 'GIƯỜNG' : 'BED TYPE', val: room.bedType.split('(')[0].trim() },
                { icon: '🏢', label: language === 'vi' ? 'TẦNG' : 'FLOOR', val: room.floor.split('—')[0].trim() },
              ].map(({ icon, label, val }) => (
                <div key={label}>
                  <div
                    className="font-sans text-[0.62rem] uppercase tracking-wider opacity-60 mb-0.5"
                    style={{ color: theme.mutedColor }}
                  >
                    {icon} {label}
                  </div>
                  <div className="font-sans text-xs md:text-sm font-medium">{val}</div>
                </div>
              ))}
            </div>

            {/* Top Amenities */}
            <ul className="space-y-1.5 mb-6">
              {room.amenities.slice(0, 4).map((amenity) => (
                <li key={amenity} className="flex items-start gap-2 font-sans text-xs md:text-sm opacity-80">
                  <span className="text-[0.65rem] mt-0.5" style={{ color: theme.accentColor }}>✦</span>
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing & CTA Buttons */}
          <div style={{ borderTop: `1px solid ${theme.borderColor}`, paddingTop: '1.25rem' }}>
            <div className="flex items-baseline gap-4 mb-4">
              <div>
                <div
                  className="font-sans text-[0.65rem] uppercase tracking-wider opacity-60 mb-0.5"
                  style={{ color: theme.mutedColor }}
                >
                  {language === 'vi' ? 'Ngắn hạn / đêm' : 'Nightly rate'}
                </div>
                <div
                  className="font-serif text-xl md:text-2xl font-bold"
                  style={{ color: theme.accentColor }}
                >
                  {formatPriceCompact(room.shortTermPrice || 0)}
                </div>
              </div>

              {room.monthlyPrice ? (
                <>
                  <div className="opacity-40" style={{ color: theme.mutedColor }}>·</div>

                  <div>
                    <div
                      className="font-sans text-[0.65rem] uppercase tracking-wider opacity-60 mb-0.5"
                      style={{ color: theme.mutedColor }}
                    >
                      {language === 'vi' ? 'Thuê tháng' : 'Monthly lease'}
                    </div>
                    <div className="font-sans text-base md:text-lg font-semibold" style={{ color: theme.textColor }}>
                      {formatPriceCompact(room.monthlyPrice)}{language === 'vi' ? '/tháng' : '/mo'}
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onSelect(room)}
                className="flex-1 rounded-nagi-pill py-3 text-xs md:text-sm font-sans font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-sm text-center cursor-pointer"
                style={{
                  backgroundColor: theme.accentColor,
                  color: isNight ? '#1a2438' : '#fbf5e8',
                }}
                aria-label={`${t.momentsPage.bookBtn} ${room.name}`}
              >
                {t.momentsPage.bookBtn}
              </button>

              <button
                onClick={() => onDetail(room)}
                className="rounded-nagi-pill px-5 py-3 text-xs md:text-sm font-sans border transition-all duration-200 hover:bg-black/5 cursor-pointer"
                style={{ borderColor: theme.borderColor, color: theme.textColor }}
                aria-label={`${t.momentsPage.detailBtn} ${room.name}`}
              >
                {t.momentsPage.detailBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function MomentsPage({ rooms, onRoomSelect, onViewDetail, onNavigateHome }: MomentsPageProps) {
  const { t, language } = useLanguage();
  const [selectedMoment, setSelectedMoment] = useState<string>('all');
  const [headerRef, headerInView] = useInView(0.2);
  const containerRef = useRef<HTMLDivElement>(null);

  const momentsNav = [
    { id: 'som-mai', label: t.hero.moments.dawn, time: '06:00', color: '#be9a66', bg: '#f4e8d2', emoji: '🌅' },
    { id: 'trua-he', label: t.hero.moments.noon, time: '11:00', color: '#866437', bg: '#eedcc0', emoji: '☀️' },
    { id: 'hoang-hon', label: t.hero.moments.sunset, time: '16:00', color: '#b8623b', bg: '#f3ded0', emoji: '🌇' },
    { id: 'dem-sao', label: t.hero.moments.night, time: '20:00', color: '#d8bc8e', bg: '#22303f', emoji: '🌙' },
  ];

  const scrollToMoment = (id: string) => {
    setSelectedMoment(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-nagi-sand pt-24 pb-28">
      {/* Page Breadcrumb / Navigation helper */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 mb-8">
        <div className="flex items-center gap-2 text-xs font-sans text-nagi-muted">
          <button
            onClick={onNavigateHome}
            className="hover:text-nagi-cardEdge hover:underline transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>{t.momentsPage.breadcrumbHome}</span>
          </button>
          <span>/</span>
          <span className="text-nagi-terracotta font-medium">{t.momentsPage.breadcrumbCurrent}</span>
        </div>
      </div>

      <div ref={containerRef} className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <div ref={headerRef} className="mb-14 md:mb-16">
          <div
            className={`arch-tag mb-5 transition-all duration-700 ${
              headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span>{t.momentsPage.label}</span>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-7">
              <h1
                className={`font-sans text-[clamp(2.2rem,5vw,3.75rem)] font-medium leading-[1.1] text-nagi-cardEdge transition-all duration-700 delay-100 ${
                  headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                {language === 'vi' ? (
                  <>Chọn khoảnh khắc<br />bạn muốn sống.</>
                ) : (
                  <>Choose the moment<br />you wish to inhabit.</>
                )}
              </h1>
            </div>

            <div className="md:col-span-5">
              <p
                className={`text-base md:text-lg text-nagi-slate leading-relaxed transition-all duration-700 delay-200 ${
                  headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {t.momentsPage.subtitle}
              </p>
            </div>
          </div>

          {/* Timeline Bar (Interactive tabs matching image) */}
          <div
            className={`mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-0 rounded-nagi overflow-hidden shadow-sm border border-nagi-border/10 transition-all duration-700 delay-300 ${
              headerInView ? 'opacity-100' : 'opacity-0'
            }`}
            role="tablist"
            aria-label="Timeline"
          >
            {momentsNav.map(({ id, label, time, color, bg, emoji }, i) => {
              const isNight = i === 3;
              const isCurrent = selectedMoment === id;

              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={isCurrent}
                  onClick={() => scrollToMoment(id)}
                  className={`py-3.5 px-4 text-center transition-all duration-200 hover:brightness-95 focus:outline-none relative cursor-pointer ${
                    isCurrent ? 'ring-2 ring-inset ring-amber-500/50' : ''
                  }`}
                  style={{
                    backgroundColor: bg,
                    borderBottom: `3px solid ${color}`,
                  }}
                >
                  <div
                    className="font-sans text-[0.65rem] tracking-widest uppercase font-medium flex items-center justify-center gap-1"
                    style={{ color }}
                  >
                    <span>{emoji}</span>
                    <span>{time}</span>
                  </div>
                  <div
                    className="font-sans text-sm font-semibold mt-0.5"
                    style={{ color: isNight ? '#d8bc8e' : '#22303f' }}
                  >
                    {label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Room Cards List */}
        <div className="space-y-10 md:space-y-14">
          {rooms.map((room, idx) => (
            <RoomCardItem
              key={room.id}
              room={room}
              index={idx}
              onSelect={onRoomSelect}
              onDetail={onViewDetail}
            />
          ))}
        </div>

        {/* Bottom Booking Guarantee & Contact note */}
        <div className="mt-20 p-8 rounded-nagi-lg bg-[#f4e8d2]/60 border border-nagi-border/15 text-center max-w-2xl mx-auto">
          <h3 className="font-sans font-semibold text-2xl text-nagi-cardEdge mb-2">
            {language === 'vi' ? 'Chưa chọn được khoảnh khắc phù hợp?' : 'Undecided on which moment fits best?'}
          </h3>
          <p className="font-sans text-sm text-nagi-slate leading-relaxed mb-6">
            {language === 'vi'
              ? 'Đội ngũ Hẻm Nhà Living luôn sẵn sàng tư vấn căn phòng lý tưởng nhất theo lịch trình và thói quen sinh hoạt của bạn.'
              : 'Our team is pleased to recommend the ideal studio based on your itinerary and travel rhythm.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onRoomSelect(rooms[0])}
              className="btn-primary text-sm px-6 py-3 cursor-pointer"
            >
              {language === 'vi' ? 'Tư vấn đặt phòng nhanh' : 'Get in touch for advice'}
            </button>
            <button
              onClick={onNavigateHome}
              className="btn-ghost text-sm px-6 py-3 cursor-pointer"
            >
              {language === 'vi' ? 'Về trang chủ' : 'Back to home'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
