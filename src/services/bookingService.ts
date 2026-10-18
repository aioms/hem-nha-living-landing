import { EarlyBirdSubmission, BookingSubmission, BookingApiResponse } from '../types/bookingApi';

const STORAGE_KEY_EARLY_BIRD = 'hemnha_early_bird_leads';
const STORAGE_KEY_BOOKING = 'hemnha_booking_leads';

/**
 * Lấy API Endpoint từ biến môi trường Vite (nếu chưa cấu hình sẽ tự động dùng localStorage fallback)
 */
const getApiUrl = (): string => {
  return (import.meta.env.VITE_BOOKING_API_URL || '').trim();
};

/**
 * Gửi request đến Google Apps Script Web App
 * Sử dụng Content-Type: text/plain;charset=utf-8 để tránh preflight CORS OPTIONS request
 */
async function postToGoogleAppsScript(payload: any): Promise<BookingApiResponse> {
  const apiUrl = getApiUrl();

  if (!apiUrl) {
    console.warn('[HèmNhà Living] VITE_BOOKING_API_URL chưa được cấu hình. Dữ liệu được lưu dự phòng vào localStorage.');
    return {
      status: 'offline_cached',
      message: 'Đã lưu thông tin tạm thời trên thiết bị.',
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    try {
      const result = await response.json();
      return {
        status: result.status === 'success' ? 'success' : 'error',
        message: result.message || 'Thành công',
      };
    } catch {
      // Trường hợp Google Apps Script trả về plain text hoặc redirect thành công
      return {
        status: 'success',
        message: 'Ghi nhận thành công.',
      };
    }
  } catch (error: any) {
    console.error('[HèmNhà Living] Lỗi kết nối Google Apps Script:', error);
    return {
      status: 'offline_cached',
      message: error?.message || 'Lỗi kết nối mạng, đã lưu dữ liệu dự phòng.',
    };
  }
}

/**
 * Ghi nhận Đăng ký Đặt phòng Sớm (Early Bird)
 * Ghi vào Tab 'Early bird-Guest Info-Collection' và gửi Telegram
 */
export async function submitEarlyBirdBooking(
  data: EarlyBirdSubmission
): Promise<BookingApiResponse> {
  // 1. Luôn lưu bản sao vào localStorage để không bao giờ mất thông tin khách hàng
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_EARLY_BIRD) || '[]');
    existing.push({
      ...data,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY_EARLY_BIRD, JSON.stringify(existing));
  } catch (err) {
    console.warn('[HèmNhà Living] Không thể lưu vào localStorage:', err);
  }

  // 2. Gửi sang Google Apps Script backend
  const payload = {
    type: 'early_bird',
    guestName: data.fullName,
    phoneNumber: data.phone,
    email: data.email || '',
    stayOption: data.stayOption,
    expectedStayingPeriod: data.expectedStayingPeriod,
    specialNote: data.specialNote || '',
    submittedAt: new Date().toISOString(),
  };

  return await postToGoogleAppsScript(payload);
}

/**
 * Ghi nhận Đặt phòng Tạm thời (Booking)
 * Ghi vào Tab 'Booking Info-Collection' và gửi Telegram
 */
export async function submitRegularBooking(
  data: BookingSubmission
): Promise<BookingApiResponse> {
  // 1. Luôn lưu bản sao vào localStorage để không bao giờ mất thông tin khách hàng
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKING) || '[]');
    existing.push({
      ...data,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY_BOOKING, JSON.stringify(existing));
  } catch (err) {
    console.warn('[HèmNhà Living] Không thể lưu vào localStorage:', err);
  }

  // 2. Gửi sang Google Apps Script backend
  const payload = {
    type: 'booking',
    stayType: data.stayType,
    fullName: data.fullName,
    phoneNumber: data.phone,
    email: data.email || '',
    checkIn: data.checkIn,
    checkOut: data.checkOut,
    guests: data.guests,
    roomType: data.roomType,
    specialRequest: data.specialRequest || '',
    estimatedPrice: data.estimatedPrice || '',
    submittedAt: new Date().toISOString(),
  };

  return await postToGoogleAppsScript(payload);
}

/**
 * Tiện ích chuyển đổi mã Stay Option sang tên tiếng Việt hiển thị trên Sheet
 */
export function formatEarlyBirdStayOption(key: string, language: string = 'vi'): string {
  switch (key) {
    case 'homestay':
      return language === 'vi' ? 'Homestay (4 Khoảnh khắc)' : 'Homestay (4 Moments)';
    case 'living':
      return language === 'vi' ? 'Hẻm Living (Theo tháng)' : 'Hẻm Living (Monthly)';
    case 'diy':
      return language === 'vi' ? 'Thuê năm tự do decor (Hẻm DIY Tầng trệt)' : 'Annual Canvas (Ground Floor DIY)';
    default:
      return key;
  }
}

/**
 * Tiện ích chuyển đổi thời gian dự kiến sang tiếng Việt hiển thị trên Sheet
 */
export function formatEarlyBirdExpectedDate(key: string, language: string = 'vi'): string {
  switch (key) {
    case 'early_december':
      return language === 'vi' ? 'Đầu tháng 12/2026 (Khai trương)' : 'Early December 2026';
    case 'mid_december':
      return language === 'vi' ? 'Giữa tháng 12/2026' : 'Mid December 2026';
    case 'festive_season':
      return language === 'vi' ? 'Mùa lễ hội cuối năm (Giáng Sinh - Tết)' : 'Holiday Season (Christmas & NYE)';
    case 'jan_2027':
      return language === 'vi' ? 'Tháng 01/2027 (Đón Tết Âm Lịch)' : 'January 2027 (Lunar New Year)';
    case 'flexible':
      return language === 'vi' ? 'Chưa chốt ngày cụ thể (Linh hoạt)' : 'Flexible dates';
    default:
      return key;
  }
}
