import { getLocalizedRoom } from '../utils/localizedContent';
import type { Room } from '../types';
import { RoomCardItem } from './MomentsPage';
import { DiyLivingCard } from './DiyLivingPage';
import { useLanguage } from '../context/LanguageContext';
import { localizedPath } from '../seo/routes';

export default function RoomPage({ room, onRoomSelect, onViewDetail }: { room: Room; onRoomSelect: (room: Room) => void; onViewDetail: (room: Room) => void }) {
  const { language } = useLanguage();
  const localizedRoom = getLocalizedRoom(room, language)!;
  const homestay = !!room.momentKey;
  const Card = homestay ? RoomCardItem : DiyLivingCard;
  return <section className="bg-nagi-sand pt-24 pb-28">
    <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
      <nav aria-label="Breadcrumb" className="text-xs text-nagi-muted flex gap-2 mb-8">
        <a href={localizedPath('/', language)} className="hover:underline">{language === 'vi' ? 'Trang chủ' : 'Home'}</a><span>/</span>
        <a href={localizedPath(homestay ? '/homestay' : '/thue-thang', language)} className="hover:underline">{homestay ? 'Hẻm Nhà Moments' : 'DIY & Living'}</a><span>/</span><span>{room.name}</span>
      </nav>
      <h1 className="font-sans text-3xl md:text-5xl font-medium text-nagi-cardEdge mb-8">{room.name}</h1>
      <Card fullDetails room={room} index={0} onSelect={onRoomSelect} onDetail={onViewDetail} />
      <section className="mt-10 rounded-nagi-lg bg-nagi-sandAlt border border-nagi-border/20 p-6 md:p-8">
        <h2 className="font-sans text-xl font-semibold text-nagi-cardEdge mb-4">{language === 'vi' ? 'Dấu ấn không gian' : 'Space highlights'}</h2>
        <ul className="space-y-3 text-nagi-slate leading-relaxed">{Object.values(localizedRoom.features).filter(Boolean).map(feature => <li key={feature}>✦ {feature}</li>)}</ul>
      </section>
    </div>
  </section>;
}
