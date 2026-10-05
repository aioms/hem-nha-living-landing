import { useState, useEffect } from 'react';
import { Room } from '../types';
import { getRoomTheme, formatPriceCompact } from '../utils/themes';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRoom } from '../utils/localizedContent';

interface RoomDetailModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (room: Room) => void;
}

export default function RoomDetailModal({ room: rawRoom, isOpen, onClose, onBook }: RoomDetailModalProps) {
  const { t, language } = useLanguage();
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setActiveImgIdx(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, rawRoom]);

  if (!isOpen || !rawRoom) return null;

  const room = getLocalizedRoom(rawRoom, language) || rawRoom;
  const theme = getRoomTheme(room);
  const isNight = room.momentKey === 'night';
  const badgeLabel = room.momentTime || room.leaseTerm || (room.category === 'diy' ? (language === 'vi' ? 'Tầng trệt · Thuê năm' : 'Ground Floor · Annual') : (language === 'vi' ? 'Linh hoạt Tuần/Tháng' : 'Flexible Weekly/Monthly'));

  return (
    <div
      className="fixed inset-0 z-[350] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={language === 'vi' ? `Chi tiết phòng ${room.name}` : `Room details: ${room.name}`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-nagi-darkBg/75 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-nagi-lg overflow-hidden shadow-2xl transition-all duration-300 my-auto"
        style={{ backgroundColor: theme.bgPage, color: theme.textColor }}
      >
        {/* Sticky Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b shrink-0 z-20"
          style={{ backgroundColor: theme.bgCard, borderColor: theme.borderColor }}
        >
          <div className="flex items-center gap-3">
            <span
              className="font-sans text-xs tracking-wider uppercase px-3 py-1 rounded-nagi-pill font-medium"
              style={{ backgroundColor: theme.pillBg, color: theme.pillText }}
            >
              {theme.timeEmoji} {badgeLabel}
            </span>
            <span className="font-sans text-xs uppercase tracking-widest opacity-60">
              {room.code} · {room.floor.split('—')[0]}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/10 transition-colors opacity-70 hover:opacity-100"
            aria-label={language === 'vi' ? 'Đóng chi tiết' : 'Close details'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Gallery View */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] md:aspect-[16/9] w-full rounded-nagi overflow-hidden bg-black/10">
              <img
                src={room.images[activeImgIdx]?.url}
                alt={room.images[activeImgIdx]?.caption || room.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-black/65 text-white text-xs px-3 py-2 rounded-md backdrop-blur-sm">
                {room.images[activeImgIdx]?.caption || room.name}
              </div>
            </div>

            {/* Thumbnails */}
            {room.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {room.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`relative shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all ${
                      idx === activeImgIdx ? 'border-amber-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title and Subtitle */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2
                className="font-sans font-normal text-3xl md:text-4xl tracking-tight"
                style={{ color: theme.accentColor }}
              >
                {room.name}
              </h2>
              {room.category && (
                <span className="text-xs uppercase font-sans tracking-widest px-2.5 py-1 rounded-nagi-pill bg-black/5 font-semibold">
                  {room.category === 'diy' ? (language === 'vi' ? 'Hẻm DIY' : 'Hẻm DIY') : (language === 'vi' ? 'Hẻm Living' : 'Hẻm Living Studio')}
                </span>
              )}
            </div>
            <div className="font-sans text-sm tracking-wide opacity-70 mb-3" style={{ color: theme.mutedColor }}>
              {room.subtitle} — <span className="italic">{room.concept}</span>
            </div>
            <p className="font-serif text-lg leading-relaxed opacity-90">{room.story}</p>
          </div>

          {/* Specs Grid */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-nagi"
            style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.borderColor}` }}
          >
            <div>
              <div className="font-sans text-[0.65rem] uppercase tracking-wider opacity-60">
                {t.roomDetailModal.areaLabel}
              </div>
              <div className="font-sans text-sm font-semibold mt-0.5">{room.area}</div>
            </div>
            <div>
              <div className="font-sans text-[0.65rem] uppercase tracking-wider opacity-60">
                {t.roomDetailModal.capacityLabel}
              </div>
              <div className="font-sans text-sm font-semibold mt-0.5">
                {language === 'vi' ? room.capacity : room.capacity.replace('người lớn', 'adults')}
              </div>
            </div>
            <div>
              <div className="font-sans text-[0.65rem] uppercase tracking-wider opacity-60">
                {t.roomDetailModal.bedLabel}
              </div>
              <div className="font-sans text-sm font-semibold mt-0.5">{room.bedType.split('(')[0]}</div>
            </div>
            <div>
              <div className="font-sans text-[0.65rem] uppercase tracking-wider opacity-60">
                {t.roomDetailModal.floorLabel}
              </div>
              <div className="font-sans text-sm font-semibold mt-0.5">{room.floor.split('—')[0]}</div>
            </div>
          </div>

          {/* Special highlights */}
          {room.features && (
            <div className="space-y-3">
              <h3 className="font-sans text-xs uppercase tracking-widest font-semibold" style={{ color: theme.accentColor }}>
                {language === 'vi' ? 'Đặc trưng không gian' : 'Space Highlights'}
              </h3>
              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                <div className="p-3 rounded-nagi bg-black/5">
                  <div className="font-medium text-xs opacity-60 mb-1">
                    {language === 'vi' ? 'Nổi bật' : 'Highlight'}
                  </div>
                  <div>{room.features.highlight}</div>
                </div>
                <div className="p-3 rounded-nagi bg-black/5">
                  <div className="font-medium text-xs opacity-60 mb-1">
                    {language === 'vi' ? 'Không khí' : 'Atmosphere'}
                  </div>
                  <div>
                    {room.features.atmosphere || room.features.lightMood || (language === 'vi' ? 'Thoáng đãng & ấm cúng' : 'Airy & warm')}
                  </div>
                </div>
                <div className="p-3 rounded-nagi bg-black/5">
                  <div className="font-medium text-xs opacity-60 mb-1">
                    {language === 'vi' ? 'Phù hợp cho' : 'Ideal for'}
                  </div>
                  <div>
                    {room.features.suitableFor || room.features.view || (language === 'vi' ? 'Khách lưu trú & làm việc' : 'Quiet retreats & focused work')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Full Amenities */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: theme.accentColor }}>
              {language === 'vi' ? 'Trang bị & Tiện nghi đầy đủ' : 'Full In-Room Amenities'}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {room.amenities.map((amenity, i) => (
                <div key={i} className="flex items-start gap-2.5 opacity-85">
                  <span className="text-xs mt-1" style={{ color: theme.accentColor }}>✦</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Price & Actions */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 p-6 border-t shrink-0"
          style={{ backgroundColor: theme.bgCard, borderColor: theme.borderColor }}
        >
          <div className="flex items-baseline gap-4">
            {room.shortTermPrice && (
              <>
                <div>
                  <div className="font-sans text-[0.65rem] uppercase tracking-wider opacity-60">
                    {language === 'vi' ? 'Ngắn hạn / đêm' : 'Nightly rate'}
                  </div>
                  <div className="font-serif text-2xl font-bold" style={{ color: theme.accentColor }}>
                    {formatPriceCompact(room.shortTermPrice)}
                  </div>
                </div>
                <div className="opacity-40">·</div>
              </>
            )}

            {room.weeklyPrice && (
              <>
                <div>
                  <div className="font-sans text-[0.65rem] uppercase tracking-wider opacity-60">
                    {language === 'vi' ? 'Theo tuần' : 'Weekly rate'}
                  </div>
                  <div className="font-serif text-xl font-bold" style={{ color: theme.accentColor }}>
                    {formatPriceCompact(room.weeklyPrice)}
                  </div>
                </div>
                <div className="opacity-40">·</div>
              </>
            )}

            {room.monthlyPrice && (
              <div>
                <div className="font-sans text-[0.65rem] uppercase tracking-wider opacity-60">
                  {room.category === 'diy'
                    ? (language === 'vi' ? 'Thuê năm (trả tháng)' : 'Annual lease (monthly)')
                    : (language === 'vi' ? 'Thuê tháng' : 'Monthly lease')}
                </div>
                <div className="font-serif text-2xl font-bold" style={{ color: theme.accentColor }}>
                  {formatPriceCompact(room.monthlyPrice)}<span className="text-sm font-normal text-current opacity-70">{t.roomDetailModal.perMonthLabel}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-nagi-pill text-sm font-sans border hover:bg-black/5 transition-colors cursor-pointer"
              style={{ borderColor: theme.borderColor }}
            >
              {language === 'vi' ? 'Đóng' : 'Close'}
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(room);
              }}
              className="px-6 py-2.5 rounded-nagi-pill text-sm font-sans font-medium transition-all shadow-md hover:scale-[1.02] cursor-pointer"
              style={{
                backgroundColor: theme.accentColor,
                color: isNight ? '#1a2438' : '#fbf5e8',
              }}
            >
              {room.category === 'diy'
                ? (language === 'vi' ? 'Hỏi thuê dài hạn' : 'Inquire Annual Lease')
                : (t.roomDetailModal.bookThisRoomBtn)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
