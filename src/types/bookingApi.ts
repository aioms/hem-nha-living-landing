export interface EarlyBirdSubmission {
  fullName: string;
  phone: string;
  email?: string;
  stayOption: string;
  expectedStayingPeriod: string;
  specialNote?: string;
}

export interface BookingSubmission {
  stayType: string;
  fullName: string;
  phone: string;
  email?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  specialRequest?: string;
  estimatedPrice?: string;
}

export interface BookingApiResponse {
  status: 'success' | 'error' | 'offline_cached';
  message: string;
}
