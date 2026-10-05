import { useState, useEffect } from 'react';
import { Room } from '../types';
import { DIY_THEME, LIVING_THEME, formatPriceCompact } from '../utils/themes';
import { useInView } from '../hooks/useScroll';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRoom } from '../utils/localizedContent';

interface DiyLivingPageProps {
  rooms: Room[];
  onRoomSelect: (room: Room) => void;
  onViewDetail: (room: Room) => void;
  onNavigateHome: () => void;
}

interface DiyLivingCardProps {
  room: Room;
  index: number;
  onSelect: (room: Room) => void;
  onDetail: (room: Room) => void;
}

function DiyLivingCard({ room: rawRoom, index, onSelect, onDetail }: DiyLivingCardProps) {
  const { t, language } = useLanguage();
  const room = getLocalizedRoom(rawRoom, language) || rawRoom;
  const [imgIdx, setImgIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView(0.1);
  const isEven = index % 2 === 0;
  const isDiy = room.category === 'diy';
  const theme = isDiy ? DIY_THEME : LIVING_THEME;

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
        } shadow-floating-card lg:min-h-[520px] transition-transform duration-300 border border-nagi-border/10`}
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
                aria-label={t.diyLivingPage.prevImg}
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
                aria-label={t.diyLivingPage.nextImg}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          {/* Category / Lease Term badge */}
          <div className="absolute top-5 left-5 z-10 flex flex-wrap gap-2">
            <span
              className="font-sans text-[0.65rem] tracking-[0.16em] uppercase px-3 py-1.5 rounded-nagi-pill font-semibold shadow-sm backdrop-blur-sm"
              style={{ backgroundColor: theme.pillBg, color: theme.pillText }}
            >
              {isDiy ? (language === 'vi' ? '🛠️ Hẻm DIY · Tầng trệt' : '🛠️ Hẻm DIY · Ground Floor') : (language === 'vi' ? '🛋️ Hẻm Living' : '🛋️ Hẻm Living Studio')}
            </span>
            <span className="font-sans text-[0.65rem] tracking-wider uppercase px-3 py-1.5 rounded-nagi-pill font-medium bg-black/60 text-white backdrop-blur-sm">
              {language === 'vi'
                ? (room.leaseTerm?.split('(')[0].trim() || 'Thuê dài hạn')
                : (isDiy ? '1-Year Lease' : 'Flexible Lease')}
            </span>
          </div>

          {/* Availability badge */}
          <div className="absolute top-5 right-5 z-10">
            <span
              className={`font-sans text-[0.65rem] tracking-wider uppercase px-3 py-1.5 rounded-nagi-pill font-medium backdrop-blur-sm ${
                room.isAvailable
                  ? 'bg-emerald-50/95 text-emerald-700 border border-emerald-200/50'
                  : 'bg-red-50/95 text-red-600 border border-red-200/50'
              }`}
            >
              {room.isAvailable
                ? (language === 'vi' ? '● CÒN PHÒNG' : '● AVAILABLE')
                : (language === 'vi' ? '● ĐÃ THUÊ' : '● OCCUPIED')}
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
              className="font-serif font-medium text-[clamp(2.2rem,4vw,3.25rem)] leading-none mb-1 tracking-tight"
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
              className="font-sans text-[0.7rem] uppercase tracking-wider mb-5 opacity-75 font-semibold"
              style={{ color: theme.mutedColor }}
            >
              {room.concept}
            </p>

            {/* Story */}
            <p
              className="font-serif text-sm md:text-base leading-relaxed mb-6 opacity-85"
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
                { icon: '🏢', label: language === 'vi' ? 'VỊ TRÍ' : 'FLOOR', val: room.floor.split('—')[0].trim() },
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
                <li key={amenity} className="flex items-start gap-2 font-sans text-xs md:text-sm opacity-85">
                  <span className="text-[0.65rem] mt-0.5" style={{ color: theme.accentColor }}>✦</span>
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing & CTA Buttons */}
          <div style={{ borderTop: `1px solid ${theme.borderColor}`, paddingTop: '1.25rem' }}>
            <div className="flex items-baseline gap-4 mb-4">
              {room.weeklyPrice && (
                <>
                  <div>
                    <div
                      className="font-sans text-[0.65rem] uppercase tracking-wider opacity-60 mb-0.5"
                      style={{ color: theme.mutedColor }}
                    >
                      {language === 'vi' ? 'Theo tuần' : 'Weekly rate'}
                    </div>
                    <div
                      className="font-serif text-lg md:text-xl font-bold"
                      style={{ color: theme.accentColor }}
                    >
                      {formatPriceCompact(room.weeklyPrice)}
                    </div>
                  </div>
                  <div className="opacity-40" style={{ color: theme.mutedColor }}>·</div>
                </>
              )}

              {room.monthlyPrice ? (
                <div>
                  <div
                    className="font-sans text-[0.65rem] uppercase tracking-wider opacity-60 mb-0.5"
                    style={{ color: theme.mutedColor }}
                  >
                    {isDiy
                      ? (language === 'vi' ? 'Hợp đồng năm (thanh toán tháng)' : 'Annual lease (monthly rate)')
                      : (language === 'vi' ? 'Thuê tháng' : 'Monthly lease')}
                  </div>
                  <div className="font-serif text-xl md:text-2xl font-bold" style={{ color: theme.accentColor }}>
                    {formatPriceCompact(room.monthlyPrice)}<span className="text-sm font-normal text-current opacity-70">{language === 'vi' ? '/tháng' : '/mo'}</span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onSelect(room)}
                className="flex-1 rounded-nagi-pill py-3 text-xs md:text-sm font-sans font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-sm text-center cursor-pointer"
                style={{
                  backgroundColor: theme.accentColor,
                  color: '#fbf5e8',
                }}
                aria-label={`${t.diyLivingPage.bookBtn} ${room.name}`}
              >
                {t.diyLivingPage.bookBtn}
              </button>

              <button
                onClick={() => onDetail(room)}
                className="rounded-nagi-pill px-5 py-3 text-xs md:text-sm font-sans border transition-all duration-200 hover:bg-black/5 cursor-pointer"
                style={{ borderColor: theme.borderColor, color: theme.textColor }}
                aria-label={`${t.diyLivingPage.detailBtn} ${room.name}`}
              >
                {t.diyLivingPage.detailBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function DiyLivingPage({
  rooms,
  onRoomSelect,
  onViewDetail,
  onNavigateHome,
}: DiyLivingPageProps) {
  const { t, language } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<'all' | 'diy' | 'living'>('all');
  const [headerRef, headerInView] = useInView(0.15);

  const diyRooms = rooms.filter((r) => r.category === 'diy');
  const livingRooms = rooms.filter((r) => r.category === 'living');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-nagi-sand pt-24 pb-28">
      {/* Page Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 mb-8">
        <div className="flex items-center gap-2 text-xs font-sans text-nagi-muted">
          <button
            onClick={onNavigateHome}
            className="hover:text-nagi-cardEdge hover:underline transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>{t.diyLivingPage.breadcrumbHome}</span>
          </button>
          <span>/</span>
          <span className="text-nagi-terracotta font-medium">{t.diyLivingPage.breadcrumbCurrent}</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header Hero Section */}
        <div ref={headerRef} className="mb-14 md:mb-16">
          <div
            className={`arch-tag mb-5 transition-all duration-700 ${
              headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span>{t.diyLivingPage.label}</span>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <h1
                className={`font-serif text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[1.08] text-nagi-cardEdge transition-all duration-700 delay-100 ${
                  headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                {t.diyLivingPage.title}
              </h1>
              <p
                className={`font-serif text-xl md:text-2xl text-nagi-terracotta mt-2 italic transition-all duration-700 delay-150 ${
                  headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {language === 'vi' ? 'Sống lâu hơn, cảm sâu hơn.' : 'Stay longer, feel deeper.'}
              </p>
            </div>

            <div className="md:col-span-5">
              <p
                className={`font-serif text-base md:text-lg text-nagi-slate leading-relaxed transition-all duration-700 delay-200 ${
                  headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {t.diyLivingPage.subtitle}
              </p>
            </div>
          </div>

          {/* Quick All-Inclusive Benefits Bar */}
          <div
            className={`mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 transition-all duration-700 delay-300 ${
              headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
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
                className="flex items-start gap-2.5 p-3 rounded-nagi bg-white/70 border border-nagi-border/10 shadow-xs"
              >
                <span className="text-xl" aria-hidden="true">{icon}</span>
                <div>
                  <div className="font-sans text-xs font-semibold text-nagi-cardEdge">{title}</div>
                  <div className="font-sans text-[0.65rem] text-nagi-muted">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Filter Categories Tabs */}
          <div className="mt-10 flex flex-wrap gap-2 border-b border-nagi-border/15 pb-4">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-5 py-2.5 rounded-full font-sans text-xs md:text-sm font-medium transition-all cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-nagi-cardEdge text-nagi-parchment shadow-sm'
                  : 'bg-white/60 text-nagi-cardEdge hover:bg-white'
              }`}
            >
              {t.diyLivingPage.filterAll}
            </button>
            <button
              onClick={() => {
                setFilterCategory('diy');
                scrollToSection('section-diy');
              }}
              className={`px-5 py-2.5 rounded-full font-sans text-xs md:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                filterCategory === 'diy'
                  ? 'bg-nagi-terracotta text-nagi-parchment shadow-sm'
                  : 'bg-white/60 text-nagi-cardEdge hover:bg-white'
              }`}
            >
              <span>🛠️ {t.diyLivingPage.filterDiy}</span>
              <span className="text-[0.65rem] opacity-80 uppercase tracking-wider bg-black/10 px-2 py-0.5 rounded-full">
                {language === 'vi' ? 'Tầng trệt · Thuê năm' : 'Ground floor · Annual'}
              </span>
            </button>
            <button
              onClick={() => {
                setFilterCategory('living');
                scrollToSection('section-living');
              }}
              className={`px-5 py-2.5 rounded-full font-sans text-xs md:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                filterCategory === 'living'
                  ? 'bg-amber-800 text-nagi-parchment shadow-sm'
                  : 'bg-white/60 text-nagi-cardEdge hover:bg-white'
              }`}
            >
              <span>🛋️ {t.diyLivingPage.filterLiving}</span>
              <span className="text-[0.65rem] opacity-80 uppercase tracking-wider bg-black/10 px-2 py-0.5 rounded-full">
                {language === 'vi' ? 'Linh hoạt Tuần/Tháng/Năm' : 'Weekly/Monthly/Annual'}
              </span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CATEGORY 1: HẺM DIY (2 STUDIOS)                                */}
        {/* ============================================================== */}
        {(filterCategory === 'all' || filterCategory === 'diy') && (
          <section id="section-diy" className="mb-20 scroll-mt-28">
            {/* Category header card */}
            <div className="bg-[#ede4d4] rounded-nagi-lg p-6 md:p-8 mb-8 border border-nagi-border/15">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                <div className="arch-tag !border-nagi-terracotta/40 !text-nagi-terracotta">
                  <span>{language === 'vi' ? 'Phân loại 1' : 'Option 1'}</span>
                  <span>·</span>
                  <span>{language === 'vi' ? 'Tầng trệt' : 'Ground Floor'}</span>
                  <span>·</span>
                  <span>{language === 'vi' ? 'Thuê dài hạn theo năm' : 'Annual Lease'}</span>
                </div>
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-nagi-terracotta bg-white/70 px-3 py-1 rounded-full">
                  {language === 'vi' ? '2 Căn phòng độc bản' : '2 Raw Canvas Studios'}
                </span>
              </div>

              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-nagi-cardEdge mb-2">
                {language === 'vi'
                  ? 'Hẻm DIY — Không gian tầng trệt tự do sáng tạo theo cách riêng'
                  : 'Hẻm DIY — Ground-floor raw canvases to curate your own sanctuary'}
              </h2>
              <p className="font-serif text-sm md:text-base text-nagi-slate max-w-3xl leading-relaxed">
                {language === 'vi'
                  ? 'Được thiết kế dành riêng cho khách thuê dài hạn theo năm tại tầng trệt. Mỗi căn phòng sở hữu khoảng sân hiên / patio riêng biệt, bậu cửa sổ lớn đón trọn mảng xanh và gió trời. Tại đây, bạn hoàn toàn có thể tự tay trang trí, đóng kệ sách, sắp đặt nội thất và DIY không gian sống & làm việc theo đúng cá tính của mình.'
                  : 'Designed specifically for annual residents on the ground floor. Each studio features a private terrace/patio and wide window ledges framing breezy greenery. Savor the freedom to furnish, build bookshelves, and style your space to reflect your unique creative aesthetic.'}
              </p>
            </div>

            {/* DIY Rooms Cards */}
            <div className="space-y-10 md:space-y-14">
              {diyRooms.map((room, idx) => (
                <DiyLivingCard
                  key={room.id}
                  room={room}
                  index={idx}
                  onSelect={onRoomSelect}
                  onDetail={onViewDetail}
                />
              ))}
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* CATEGORY 2: HẺM LIVING (4 STUDIOS)                            */}
        {/* ============================================================== */}
        {(filterCategory === 'all' || filterCategory === 'living') && (
          <section id="section-living" className="mb-20 scroll-mt-28">
            {/* Category header card */}
            <div className="bg-[#f0e8db] rounded-nagi-lg p-6 md:p-8 mb-8 border border-nagi-border/15">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                <div className="arch-tag !border-amber-700/40 !text-amber-800">
                  <span>{language === 'vi' ? 'Phân loại 2' : 'Option 2'}</span>
                  <span>·</span>
                  <span>{language === 'vi' ? 'Tầng 2 — Tầng 4' : 'Floors 2 — 4'}</span>
                  <span>·</span>
                  <span>{language === 'vi' ? 'Linh hoạt Tuần / Tháng / Năm' : 'Flexible Weekly / Monthly / Annual'}</span>
                </div>
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-amber-900 bg-white/70 px-3 py-1 rounded-full">
                  {language === 'vi' ? '4 Phong cách sống' : '4 Design Concepts'}
                </span>
              </div>

              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-nagi-cardEdge mb-2">
                {language === 'vi'
                  ? 'Hẻm Living — Phong cách đa dạng, linh hoạt và tiện nghi trọn gói'
                  : 'Hẻm Living — Fully appointed studios for effortless boutique living'}
              </h2>
              <p className="font-serif text-sm md:text-base text-nagi-slate max-w-3xl leading-relaxed">
                {language === 'vi'
                  ? 'Các căn phòng Hẻm Living được hoàn thiện với nội thất thiết kế cao cấp, tích hợp ban công riêng ngập sáng, khu bếp tiện nghi và không gian làm việc công thái học. Đáp ứng trọn vẹn nhu cầu thuê linh hoạt theo tuần, tháng hoặc năm với chi phí trọn gói minh bạch, không phát sinh phụ phí.'
                  : 'Furnished with warm boutique materials, sunlit private balconies, efficient kitchenettes, and ergonomic work nooks. Perfectly tailored for flexible stays by the week, month, or year with complete pricing clarity.'}
              </p>
            </div>

            {/* Living Rooms Cards */}
            <div className="space-y-10 md:space-y-14">
              {livingRooms.map((room, idx) => (
                <DiyLivingCard
                  key={room.id}
                  room={room}
                  index={idx}
                  onSelect={onRoomSelect}
                  onDetail={onViewDetail}
                />
              ))}
            </div>
          </section>
        )}

        {/* Long-term Living Guide & Policies Banner */}
        <div className="rounded-nagi-lg bg-white/70 border border-nagi-border/15 p-8 md:p-10 shadow-xs">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="font-sans text-xs uppercase tracking-widest text-nagi-terracotta font-semibold mb-2">
                {language === 'vi' ? '01 · Chi phí minh bạch' : '01 · Transparent Pricing'}
              </div>
              <h3 className="font-serif text-lg font-semibold text-nagi-cardEdge mb-2">
                {language === 'vi' ? 'Không chi phí ẩn' : 'No Hidden Surcharges'}
              </h3>
              <p className="font-serif text-sm text-nagi-slate leading-relaxed">
                {language === 'vi'
                  ? 'Giá thuê bao gồm wifi riêng (điện nước tính phí theo thực tế). Đặc biệt, cung cấp dịch vụ giặt sấy và dọn dẹp với mức ưu đãi đặc quyền chỉ dành cho cư dân Hẻm Nhà.'
                  : 'Rent includes high-speed fiber internet (utilities billed by actual government tariffs). Complimentary access to laundry machines and resident privileges at our cafe.'}
              </p>
            </div>

            <div>
              <div className="font-sans text-xs uppercase tracking-widest text-nagi-terracotta font-semibold mb-2">
                {language === 'vi' ? '02 · Hợp đồng linh hoạt' : '02 · Flexible Terms'}
              </div>
              <h3 className="font-serif text-lg font-semibold text-nagi-cardEdge mb-2">
                {language === 'vi' ? 'Tuần · Tháng · Năm' : 'Weekly · Monthly · Annual'}
              </h3>
              <p className="font-serif text-sm text-nagi-slate leading-relaxed">
                {language === 'vi'
                  ? 'Hỗ trợ ký hợp đồng nhanh chóng, thủ tục đơn giản. Có xuất hóa đơn HKD theo yêu cầu cho khách hàng doanh nghiệp hoặc chuyên gia công tác.'
                  : 'Fast check-in and streamlined documentation. Official business invoices available upon request for corporate stays and remote specialists.'}
              </p>
            </div>

            <div>
              <div className="font-sans text-xs uppercase tracking-widest text-nagi-terracotta font-semibold mb-2">
                {language === 'vi' ? '03 · Cộng đồng & Tiện ích' : '03 · Community & Perks'}
              </div>
              <h3 className="font-serif text-lg font-semibold text-nagi-cardEdge mb-2">
                {language === 'vi' ? 'Sống trọn vẹn tại Hẻm' : 'A Holistic Living Rhythm'}
              </h3>
              <p className="font-serif text-sm text-nagi-slate leading-relaxed">
                {language === 'vi'
                  ? 'Cư dân được nhận ưu đãi đặc biệt tại Quando Quando cafe - tầng lửng, sử dụng Rooftop ngắm hoàng hôn, giải trí miễn phí.'
                  : 'Residents enjoy exclusive discounts at Quando Quando Cafe, open access to the sunset rooftop terrace, billiards, foosball, and community events.'}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-nagi-border/15 flex flex-wrap items-center justify-between gap-4">
            <span className="font-serif text-sm text-nagi-slate">
              {language === 'vi'
                ? 'Bạn quan tâm đến căn phòng nào? Hãy để lại thông tin để chúng tôi liên hệ tư vấn và xếp lịch xem phòng trực tiếp.'
                : 'Interested in a studio? Leave your details and we will reach out promptly to schedule an in-person or virtual tour.'}
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => onRoomSelect(rooms[0])}
                className="btn-primary text-sm px-6 py-2.5 cursor-pointer"
              >
                {language === 'vi' ? 'Đặt lịch xem phòng' : 'Schedule a Tour'}
              </button>
              <button
                onClick={onNavigateHome}
                className="btn-ghost text-sm px-5 py-2.5 cursor-pointer"
              >
                {language === 'vi' ? 'Về trang chủ' : 'Back to Home'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
