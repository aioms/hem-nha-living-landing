import { useState, useEffect } from 'react';
import Navigation, { NavTab } from './components/Navigation';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import MomentsTeaserSection from './components/MomentsTeaserSection';
import MomentsPage from './components/MomentsPage';
import DiyLivingPage from './components/DiyLivingPage';
import PolicyPage from './components/PolicyPage';
import CafeSection from './components/CafeSection';
import AmenitiesSection from './components/AmenitiesSection';
import MonthlyLivingSection from './components/MonthlyLivingSection';
import ContactSection from './components/ContactSection';
import BookingModal from './components/BookingModal';
import RoomDetailModal from './components/RoomDetailModal';
import EarlyBirdSection from './components/EarlyBirdSection';
import EarlyBirdModal from './components/EarlyBirdModal';
import StickyBookingBar from './components/StickyBookingBar';
import { ROOMS } from './data/rooms';
import { DIY_LIVING_ROOMS } from './data/diyLivingRooms';
import { AMENITIES } from './data/amenities';
import { Room } from './types';
import { useLanguage } from './context/LanguageContext';
import { findRoute, legacyPath, localizedPath, navigate, tabPath } from './seo/routes';
import { updateHead } from './seo/metadata';
import FaqPage from './components/FaqPage';
import RoomPage from './components/RoomPage';
import LandingPage from './components/LandingPage';

export default function App({ initialPath = '/' }: { initialPath?: string }) {
  const { language } = useLanguage();
  const [path, setPath] = useState(initialPath);
  const route = findRoute(path);
  const currentTab = route?.view || 'home';
  const policyTab = route?.policy || 'all';
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [roomForDetail, setRoomForDetail] = useState<Room | null>(null);
  const [earlyBirdOpen, setEarlyBirdOpen] = useState(false);

  useEffect(() => { document.documentElement.dataset.hydrated = 'true'; }, []);

  useEffect(() => {
    const sync = () => {
      const legacy = legacyPath(window.location.hash);
      if (legacy) {
        navigate(localizedPath(legacy, language), true);
      }
      setPath(window.location.pathname);
      if (window.location.hash) requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin || !findRoute(url.pathname)) return;
      event.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    };
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    window.addEventListener('site:navigate', sync);
    document.addEventListener('click', click);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('site:navigate', sync);
      document.removeEventListener('click', click);
    };
  }, [language]);

  useEffect(() => {
    updateHead(path, language);
    const id = window.location.hash.slice(1);
    // Scroll only after React has committed the new view.
    const frame = requestAnimationFrame(() => {
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [path, language]);

  const handleTabChange = (tab: NavTab, sectionId?: string) => {
    const target = tabPath(tab, sectionId);
    navigate(localizedPath(target.split('#')[0], language) + (target.includes('#') ? '#' + target.split('#')[1] : ''));
  };

  const openBooking = (room?: Room) => {
    setSelectedRoom(room || null);
    setBookingOpen(true);
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setSelectedRoom(null);
  };

  const openDetail = (room: Room) => {
    setRoomForDetail(room);
    setDetailModalOpen(true);
  };

  return (
    <>
      {/* Top Navigation with tabs */}
      <Navigation
        initialPath={path}
        currentTab={currentTab}
        onBookingOpen={() => openBooking()}
      />

      {/* Main Content */}
      <main id="main-content">
        {route && currentTab === 'home' && (
          <>
            <HeroSection
              onBookingOpen={() => openBooking()}
              onNavigateToMoments={(id) => handleTabChange('moments', id)}
              onNavigateToMonthly={() => handleTabChange('diy-living')}
              onOpenEarlyBird={() => setEarlyBirdOpen(true)}
            />
            <EarlyBirdSection onOpenForm={() => setEarlyBirdOpen(true)} />
            <IntroSection />
            <MomentsTeaserSection
              rooms={ROOMS}
              onNavigateToMoments={(id) => handleTabChange('moments', id)}
              onBookingOpen={openBooking}
            />
            <MonthlyLivingSection
              onBookingOpen={() => openBooking()}
              onNavigateToDiyLiving={() => handleTabChange('diy-living')}
            />
            <CafeSection />
            <AmenitiesSection amenities={AMENITIES} />
            <ContactSection
              onBookingOpen={() => openBooking()}
            />
          </>
        )}

        {currentTab === 'moments' && (
          <>
            {route?.roomId ? <RoomPage key={path} room={ROOMS.find(room => room.id === route.roomId)!} onRoomSelect={openBooking} onViewDetail={openDetail} /> : <MomentsPage
              key={path}
              rooms={ROOMS}
              onRoomSelect={openBooking}
              onViewDetail={openDetail}
              onNavigateHome={() => handleTabChange('home')}
            />}
            <ContactSection
              onBookingOpen={() => openBooking()}
            />
          </>
        )}

        {currentTab === 'diy-living' && (
          <>
            {route?.roomId ? <RoomPage key={path} room={DIY_LIVING_ROOMS.find(room => room.id === route.roomId)!} onRoomSelect={openBooking} onViewDetail={openDetail} /> : <DiyLivingPage
              key={path}
              rooms={DIY_LIVING_ROOMS}
              onRoomSelect={openBooking}
              onViewDetail={openDetail}
              onNavigateHome={() => handleTabChange('home')}
            />}
            <ContactSection
              onBookingOpen={() => openBooking()}
            />
          </>
        )}

        {currentTab === 'policies' && (
          <>
            <PolicyPage
              key={path}
              initialTab={policyTab}
              onNavigateHome={() => handleTabChange('home')}
              onBookingOpen={() => openBooking()}
            />
            <ContactSection
              onBookingOpen={() => openBooking()}
            />
          </>
        )}
        {currentTab === 'landing' && route?.landing && (
          <>
            <LandingPage key={path} id={route.landing} onBookingOpen={() => openBooking()} onOpenEarlyBird={() => setEarlyBirdOpen(true)} />
            <ContactSection onBookingOpen={() => openBooking()} />
          </>
        )}
        {['cafe', 'faq', 'amenities'].includes(currentTab) && (
          <>
            {currentTab === 'cafe' && <div className="pt-20"><CafeSection standalone /></div>}
            {currentTab === 'amenities' && <div className="pt-20"><h1 className="sr-only">{language === 'vi' ? 'Rooftop & tiện ích Hẻm Nhà Living Quận 7' : 'Hẻm Nhà Living rooftop & amenities in District 7'}</h1><AmenitiesSection amenities={AMENITIES} /></div>}
            {currentTab === 'faq' && <FaqPage />}
            <ContactSection onBookingOpen={() => openBooking()} />
          </>
        )}
        {!route && <><section className="pt-32 pb-20 px-6"><h1 className="font-sans text-3xl">{language === 'vi' ? 'Không tìm thấy trang' : 'Page not found'}</h1><a className="underline" href={localizedPath('/', language)}>{language === 'vi' ? 'Về trang chủ' : 'Back home'}</a></section><ContactSection onBookingOpen={() => openBooking()} /></>}
      </main>

      {/* Sticky CTA */}
      <StickyBookingBar onOpen={() => openBooking()} />

      {/* Room Detail Modal */}
      <RoomDetailModal
        room={roomForDetail}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        onBook={openBooking}
      />

      {/* Booking modal */}
      <BookingModal
        isOpen={bookingOpen}
        initialRoom={selectedRoom}
        onClose={closeBooking}
      />

      {/* Early Bird Registration Modal */}
      <EarlyBirdModal
        isOpen={earlyBirdOpen}
        onClose={() => setEarlyBirdOpen(false)}
      />
    </>
  );
}
