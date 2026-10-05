import { useState, useEffect } from 'react';
import { Room } from '../types';
import { MOMENT_THEMES, formatPriceCompact } from '../utils/themes';
import { useInView } from '../hooks/useScroll';

interface RoomCardProps {
  room: Room;
  index: number;
  onSelect: (room: Room) => void;
}

function RoomCard({ room, index, onSelect }: RoomCardProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView(0.1);
  const theme = MOMENT_THEMES[room.momentKey || 'dawn'];
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
      id={room.name.toLowerCase().replace(/\s+/g, '-')}
      ref={ref}
      className={`relative transition-all duration-800 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 60}ms` }}
      aria-label={`Phòng ${room.name}`}
    >
      <div
        className={`rounded-nagi-lg overflow-hidden ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex lg:min-h-[540px]`}
        style={{ backgroundColor: theme.bgCard }}
      >
        {/* Image gallery side with horizontal slide transition */}
        <div
          className="relative lg:w-[55%] overflow-hidden group min-h-[360px]"
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
                  alt={img.caption}
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
                aria-label="Ảnh trước"
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
                aria-label="Ảnh tiếp theo"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          {/* Image reveal overlay with moment time */}
          <div className="absolute top-5 left-5 z-10">
            <span
              className="font-sans text-[0.65rem] tracking-[0.18em] uppercase px-3 py-1.5 rounded-nagi-pill"
              style={{ backgroundColor: theme.pillBg, color: theme.pillText }}
            >
              {theme.timeEmoji} {room.momentTime}
            </span>
          </div>

          {/* Availability badge */}
          <div className="absolute top-5 right-5 z-10">
            <span
              className={`font-sans text-[0.65rem] tracking-widest uppercase px-3 py-1.5 rounded-nagi-pill ${
                room.isAvailable
                  ? 'bg-emerald-50/90 text-emerald-700'
                  : 'bg-red-50/90 text-red-600'
              }`}
            >
              {room.isAvailable ? '● Còn phòng' : '● Hết phòng'}
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
          className="lg:w-[45%] flex flex-col justify-between p-8 md:p-10 lg:p-12"
          style={{ color: theme.textColor }}
        >
          <div>
            {/* Room code + floor */}
            <div
              className="font-sans text-xs tracking-[0.18em] uppercase mb-3 opacity-50"
              style={{ color: theme.mutedColor }}
            >
              {room.code} · {room.floor}
            </div>

            {/* Room name */}
            <h3
              className="font-sans font-normal text-[clamp(2rem,4vw,3.25rem)] leading-none mb-1 tracking-tight"
              style={{ color: theme.accentColor }}
            >
              {room.name}
            </h3>
            <div
              className="font-sans text-sm tracking-wide mb-5 opacity-70"
              style={{ color: theme.mutedColor }}
            >
              {room.subtitle}
            </div>

            {/* Concept tags */}
            <p className="font-sans text-xs uppercase tracking-wider mb-5 opacity-60" style={{ color: theme.mutedColor }}>
              {room.concept}
            </p>

            {/* Story */}
            <p className="text-base leading-relaxed mb-6 opacity-80" style={{ color: theme.textColor }}>
              {room.story}
            </p>

            {/* Specs grid */}
            <div
              className="grid grid-cols-2 gap-3 mb-6 text-sm"
              style={{ borderTop: `1px solid ${theme.borderColor}`, paddingTop: '1.25rem' }}
            >
              {[
                { icon: '⬛', label: 'Diện tích', val: room.area },
                { icon: '👥', label: 'Sức chứa', val: room.capacity },
                { icon: '🛏️', label: 'Giường', val: room.bedType.split('(')[0].trim() },
                { icon: '🏢', label: 'Tầng', val: room.floor.split('—')[0].trim() },
              ].map(({ icon, label, val }) => (
                <div key={label}>
                  <div className="font-sans text-[0.65rem] uppercase tracking-wider opacity-50 mb-0.5" style={{ color: theme.mutedColor }}>
                    {icon} {label}
                  </div>
                  <div className="font-sans text-sm font-medium">{val}</div>
                </div>
              ))}
            </div>

            {/* Top amenities */}
            <ul className="space-y-1.5 mb-6">
              {room.amenities.slice(0, 4).map((amenity) => (
                <li key={amenity} className="flex items-start gap-2 font-sans text-sm opacity-70">
                  <span className="text-[0.7rem] mt-0.5 opacity-60" style={{ color: theme.accentColor }}>✦</span>
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing + CTA */}
          <div style={{ borderTop: `1px solid ${theme.borderColor}`, paddingTop: '1.25rem' }}>
            <div className="flex items-end gap-4 mb-5">
              <div>
                <div className="font-sans text-xs uppercase tracking-wider opacity-50 mb-0.5" style={{ color: theme.mutedColor }}>
                  Ngắn hạn / đêm
                </div>
                <div className="font-sans text-2xl font-semibold" style={{ color: theme.accentColor }}>
                  {formatPriceCompact(room.shortTermPrice ?? 0)}
                </div>
              </div>
              {room.monthlyPrice ? (
                <>
                  <div className="opacity-40" style={{ color: theme.mutedColor }}>·</div>
                  <div>
                    <div className="font-sans text-xs uppercase tracking-wider opacity-50 mb-0.5" style={{ color: theme.mutedColor }}>
                      Thuê tháng
                    </div>
                    <div className="font-sans text-xl font-medium" style={{ color: theme.textColor }}>
                      {formatPriceCompact(room.monthlyPrice)}/tháng
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onSelect(room)}
                className="flex-1 rounded-nagi-pill py-3 text-sm font-sans font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{ backgroundColor: theme.accentColor, color: isNight ? '#1a2438' : '#fbf5e8' }}
                aria-label={`Đặt phòng ${room.name}`}
              >
                Kiểm tra & Đặt phòng
              </button>
              <button
                onClick={() => onSelect(room)}
                className="rounded-nagi-pill px-4 py-3 text-sm font-sans border transition-all duration-200 hover:opacity-80"
                style={{ borderColor: theme.borderColor, color: theme.textColor }}
                aria-label={`Xem chi tiết phòng ${room.name}`}
              >
                Chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

interface RoomsSectionProps {
  rooms: Room[];
  onRoomSelect: (room: Room) => void;
}

export default function RoomsSection({ rooms, onRoomSelect }: RoomsSectionProps) {
  const [headerRef, headerInView] = useInView(0.2);

  return (
    <section
      id="rooms"
      className="py-24 md:py-36 px-6 md:px-10 lg:px-16 max-w-[1280px] mx-auto"
      aria-label="Bốn căn phòng — Bốn khoảnh khắc trong ngày"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-16 md:mb-20">
        <div
          className={`arch-tag mb-6 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <span>Bốn khoảnh khắc</span>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-end">
          <h2
            className={`font-sans text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-tight text-nagi-cardEdge transition-all duration-700 delay-100 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            Chọn khoảnh khắc<br />bạn muốn sống.
          </h2>
          <p
            className={`text-base md:text-lg text-nagi-slate leading-relaxed transition-all duration-700 delay-200 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Mỗi phòng là một thời điểm trong ngày — được thiết kế để bạn không chỉ nghỉ ngơi mà còn <em>cảm nhận</em> nhịp sống của không gian đó.
          </p>
        </div>

        {/* Timeline strip */}
        <div
          className={`mt-10 flex gap-0 overflow-x-auto pb-2 transition-all duration-700 delay-300 ${headerInView ? 'opacity-100' : 'opacity-0'}`}
          role="list"
          aria-label="Timeline các khoảnh khắc trong ngày"
        >
          {[
            { label: 'Sớm Mai', time: '06:00', color: '#be9a66', bg: '#f4e8d2' },
            { label: 'Mơ Trưa', time: '11:00', color: '#866437', bg: '#eedcc0' },
            { label: 'Hoàng Hôn', time: '16:00', color: '#b8623b', bg: '#f3ded0' },
            { label: 'Đêm Sao', time: '20:00', color: '#d8bc8e', bg: '#22303f' },
          ].map(({ label, time, color, bg }, i) => (
            <div
              key={label}
              role="listitem"
              className="flex-1 min-w-[100px] py-3 px-4 text-center cursor-default"
              style={{ backgroundColor: bg, borderBottom: `3px solid ${color}` }}
            >
              <div className="font-sans text-[0.6rem] tracking-widest uppercase" style={{ color }}>
                {time}
              </div>
              <div className="font-sans text-sm font-medium mt-0.5" style={{ color: i === 3 ? '#d8bc8e' : '#22303f' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Room cards stack */}
      <div className="space-y-8 md:space-y-12">
        {rooms.map((room, idx) => (
          <RoomCard
            key={room.id}
            room={room}
            index={idx}
            onSelect={onRoomSelect}
          />
        ))}
      </div>
    </section>
  );
}
