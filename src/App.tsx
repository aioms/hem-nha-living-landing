import { useState, useEffect } from 'react';
import Navigation, { NavTab } from './components/Navigation';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import MomentsTeaserSection from './components/MomentsTeaserSection';
import MomentsPage from './components/MomentsPage';
import DiyLivingPage from './components/DiyLivingPage';
import PolicyPage, { PolicyTab } from './components/PolicyPage';
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

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [policyTab, setPolicyTab] = useState<PolicyTab>('all');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [roomForDetail, setRoomForDetail] = useState<Room | null>(null);
  const [earlyBirdOpen, setEarlyBirdOpen] = useState(false);

  // Sync with URL hash on mount & on hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (
        hash.startsWith('#terms') ||
        hash.startsWith('#terms-of-service')
      ) {
        setCurrentTab('policies');
        setPolicyTab('terms');
      } else if (
        hash.startsWith('#cancellation') ||
        hash.startsWith('#cancellation-policy') ||
        hash.startsWith('#cancel')
      ) {
        setCurrentTab('policies');
        setPolicyTab('cancellation');
      } else if (
        hash.startsWith('#privacy') ||
        hash.startsWith('#privacy-policy')
      ) {
        setCurrentTab('policies');
        setPolicyTab('privacy');
      } else if (
        hash.startsWith('#policies') ||
        hash.startsWith('#policy') ||
        hash.startsWith('#legal')
      ) {
        setCurrentTab('policies');
        setPolicyTab('all');
      } else if (
        hash.startsWith('#diy-living') ||
        hash.startsWith('#diy') ||
        hash.startsWith('#living') ||
        hash.includes('hem-diy') ||
        hash.includes('hem-minimal') ||
        hash.includes('hem-japandi') ||
        hash.includes('mo-japandi') ||
        hash.includes('hem-scandi')
      ) {
        setCurrentTab('diy-living');
        const roomId = hash.replace('#diy-living/', '').replace('#diy-living', '').replace('#', '');
        if (roomId && roomId !== 'diy-living' && roomId !== 'diy' && roomId !== 'living') {
          setTimeout(() => {
            const target = document.getElementById(roomId);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      } else if (
        hash.startsWith('#moments') ||
        hash.includes('som-mai') ||
        hash.includes('trua-he') ||
        hash.includes('hoang-hon') ||
        hash.includes('dem-sao')
      ) {
        setCurrentTab('moments');
        const momentId = hash.replace('#moments/', '').replace('#moments', '').replace('#', '');
        if (momentId && momentId !== 'moments') {
          setTimeout(() => {
            const target = document.getElementById(momentId);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      } else {
        setCurrentTab('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (tab: NavTab, sectionId?: string) => {
    setCurrentTab(tab);
    if (tab === 'diy-living') {
      if (sectionId) {
        window.location.hash = `diy-living/${sectionId}`;
        setTimeout(() => {
          const target = document.getElementById(sectionId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.location.hash = 'diy-living';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (tab === 'moments') {
      if (sectionId) {
        window.location.hash = `moments/${sectionId}`;
        setTimeout(() => {
          const target = document.getElementById(sectionId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.location.hash = 'moments';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (tab === 'policies') {
      if (sectionId === 'terms') {
        setPolicyTab('terms');
        window.location.hash = 'terms';
      } else if (sectionId === 'cancellation' || sectionId === 'cancellation-policy') {
        setPolicyTab('cancellation');
        window.location.hash = 'cancellation-policy';
      } else if (sectionId === 'privacy' || sectionId === 'privacy-policy') {
        setPolicyTab('privacy');
        window.location.hash = 'privacy-policy';
      } else {
        setPolicyTab('all');
        window.location.hash = 'policies';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (sectionId) {
        window.location.hash = sectionId;
        setTimeout(() => {
          const target = document.getElementById(sectionId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
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
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onBookingOpen={() => openBooking()}
      />

      {/* Main Content */}
      <main id="main-content">
        {currentTab === 'home' && (
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
              onNavigateToPolicy={(key) => handleTabChange('policies', key)}
            />
          </>
        )}

        {currentTab === 'moments' && (
          <>
            <MomentsPage
              rooms={ROOMS}
              onRoomSelect={openBooking}
              onViewDetail={openDetail}
              onNavigateHome={() => handleTabChange('home')}
            />
            <ContactSection
              onBookingOpen={() => openBooking()}
              onNavigateToPolicy={(key) => handleTabChange('policies', key)}
            />
          </>
        )}

        {currentTab === 'diy-living' && (
          <>
            <DiyLivingPage
              rooms={DIY_LIVING_ROOMS}
              onRoomSelect={openBooking}
              onViewDetail={openDetail}
              onNavigateHome={() => handleTabChange('home')}
            />
            <ContactSection
              onBookingOpen={() => openBooking()}
              onNavigateToPolicy={(key) => handleTabChange('policies', key)}
            />
          </>
        )}

        {currentTab === 'policies' && (
          <>
            <PolicyPage
              initialTab={policyTab}
              onNavigateHome={() => handleTabChange('home')}
              onBookingOpen={() => openBooking()}
            />
            <ContactSection
              onBookingOpen={() => openBooking()}
              onNavigateToPolicy={(key) => handleTabChange('policies', key)}
            />
          </>
        )}
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
