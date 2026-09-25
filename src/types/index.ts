export type MomentKey = 'dawn' | 'noon' | 'sunset' | 'night';

export interface RoomImage {
  url: string;
  caption: string;
}

export interface Room {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  momentKey: MomentKey;
  momentTime: string;
  concept: string;
  story: string;
  area: string;
  capacity: string;
  bedType: string;
  floor: string;
  shortTermPrice: number; // VND per night
  monthlyPrice: number;   // VND per month
  amenities: string[];
  features: {
    highlight: string;
    lightMood: string;
    view: string;
  };
  images: RoomImage[];
  isAvailable: boolean;
  unavailableDates?: string[];
}

export type StayType = 'short_term' | 'monthly';

export interface BookingFormState {
  stayType: StayType;
  checkIn: string;
  checkOut: string;
  monthlyStartDate: string;
  monthlyMonths: number;
  guests: number;
  selectedRoomId: string;
  fullName: string;
  phone: string;
  email: string;
  note: string;
}

export interface AmenitySpace {
  id: string;
  name: string;
  tagline: string;
  description: string;
  hours: string;
  features: string[];
  image: string;
  gallery: string[];
}
