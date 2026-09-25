import { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import RoomsSection from './components/RoomsSection';
import CafeSection from './components/CafeSection';
import AmenitiesSection from './components/AmenitiesSection';
import MonthlyLivingSection from './components/MonthlyLivingSection';
import ContactSection from './components/ContactSection';
import BookingModal from './components/BookingModal';
import StickyBookingBar from './components/StickyBookingBar';
import { ROOMS } from './data/rooms';
import { AMENITIES } from './data/amenities';
import { Room } from './types';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const openBooking = (room?: Room) => {
    setSelectedRoom(room || null);
    setBookingOpen(true);
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setSelectedRoom(null);
  };

  return (
    <>
      {/* Navigation */}
      <Navigation onBookingOpen={() => openBooking()} />

      {/* Main content */}
      <main id="main-content">
        <HeroSection onBookingOpen={() => openBooking()} />
        <IntroSection />
        <RoomsSection rooms={ROOMS} onRoomSelect={openBooking} />
        <CafeSection />
        <AmenitiesSection amenities={AMENITIES} />
        <MonthlyLivingSection onBookingOpen={() => openBooking()} />
        <ContactSection onBookingOpen={() => openBooking()} />
      </main>

      {/* Sticky CTA */}
      <StickyBookingBar onOpen={() => openBooking()} />

      {/* Booking modal */}
      <BookingModal
        isOpen={bookingOpen}
        initialRoom={selectedRoom}
        onClose={closeBooking}
      />
    </>
  );
}
