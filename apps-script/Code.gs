/**
 * =========================================================================
 * [HèmNhà Living] Google Apps Script Backend
 * -------------------------------------------------------------------------
 * Tính năng:
 * 1. Nhận dữ liệu đặt phòng sớm (Early Bird) -> Ghi vào tab "Early bird-Guest Info-Collection"
 *    và gửi thông báo về Telegram.
 * 2. Nhận dữ liệu đặt phòng tạm thời (Booking) -> Ghi vào tab "Booking Info-Collection"
 *    và gửi thông báo về Telegram.
 * =========================================================================
 */

// --- CẤU HÌNH TELEGRAM BOT ---
// Vui lòng điền Bot Token và Chat ID của bạn vào bên dưới:
const CONFIG = {
  TELEGRAM_BOT_TOKEN: 'YOUR_TELEGRAM_BOT_TOKEN', // Ví dụ: '7123456789:AAH...'
  TELEGRAM_CHAT_ID: 'YOUR_TELEGRAM_CHAT_ID',     // Ví dụ: '-1001234567890' hoặc '123456789'
  NOTIFY_ON_BOOKING: true, // Gửi Telegram khi có khách đặt phòng thường
  NOTIFY_ON_EARLY_BIRD: true, // Gửi Telegram khi có khách đăng ký Early Bird
  TAB_EARLY_BIRD: 'Early bird-Guest Info-Collection',
  TAB_BOOKING: 'Booking Info-Collection'
};

/**
 * Xử lý GET request (để kiểm tra xem Web App đã hoạt động chưa qua trình duyệt)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: '[HèmNhà Living] Booking API is online & ready.'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Xử lý POST request từ Website Landing Page
 */
function doPost(e) {
  try {
    let data;
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    } else {
      throw new Error('Không nhận được dữ liệu payload hợp lệ.');
    }

    const type = data.type || data.action || 'early_bird';
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    if (type === 'early_bird') {
      return handleEarlyBirdSubmission(spreadsheet, data);
    } else if (type === 'booking') {
      return handleBookingSubmission(spreadsheet, data);
    } else {
      throw new Error('Loại form không xác định: ' + type);
    }
  } catch (error) {
    Logger.log('Lỗi doPost: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 1. Xử lý ghi nhận Đăng Ký Early Bird
 * Tab: Early bird-Guest Info-Collection
 * Cột A: Guest Name
 * Cột B: Phone Number
 * Cột C: Email (Optional)
 * Cột D: Stay Option
 * Cột E: Expected Staying Period
 * Cột F: Special Note
 */
function handleEarlyBirdSubmission(spreadsheet, data) {
  const sheet = spreadsheet.getSheetByName(CONFIG.TAB_EARLY_BIRD) || spreadsheet.getSheets()[0];
  if (!sheet) {
    throw new Error('Không tìm thấy tab sheet: ' + CONFIG.TAB_EARLY_BIRD);
  }

  const guestName = data.guestName || data.fullName || '';
  const phoneNumber = data.phoneNumber || data.phone || '';
  const email = data.email || '';
  const stayOption = data.stayOption || data.stayType || '';
  const expectedPeriod = data.expectedStayingPeriod || data.expectedDate || '';
  const specialNote = data.specialNote || data.note || '';

  // Thêm dòng mới vào Google Sheet đúng theo thứ tự Cột A -> F
  sheet.appendRow([
    guestName,
    phoneNumber,
    email,
    stayOption,
    expectedPeriod,
    specialNote
  ]);

  // Gửi thông báo Telegram
  if (CONFIG.NOTIFY_ON_EARLY_BIRD && CONFIG.TELEGRAM_BOT_TOKEN !== 'YOUR_TELEGRAM_BOT_TOKEN') {
    const nowStr = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
    const message = [
      '🌱 *[HÈM NHÀ LIVING] KHÁCH ĐĂNG KÝ EARLY BIRD!*',
      '━━━━━━━━━━━━━━━━━━━━',
      '👤 *Khách hàng:* ' + escapeMarkdown(guestName),
      '📞 *Số điện thoại:* ' + escapeMarkdown(phoneNumber),
      '✉️ *Email:* ' + (email ? escapeMarkdown(email) : '_Không cung cấp_'),
      '🏡 *Gói quan tâm:* ' + escapeMarkdown(stayOption),
      '📅 *Dự kiến đến ở:* ' + escapeMarkdown(expectedPeriod),
      '📝 *Ghi chú:* ' + (specialNote ? escapeMarkdown(specialNote) : '_Không có_'),
      '',
      '⏰ *Thời gian gửi:* ' + nowStr,
      '━━━━━━━━━━━━━━━━━━━━',
      '👉 _Đội ngũ Hẻm Nhà hãy liên hệ khách sớm để áp dụng ưu đãi độc quyền!_'
    ].join('\n');

    sendTelegramMessage(message);
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    type: 'early_bird',
    message: 'Ghi nhận Early Bird thành công!'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * 2. Xử lý ghi nhận Đặt Phòng Tạm Thời (Booking)
 * Tab: Booking Info-Collection
 * Cột A: Tyoe of Stay
 * Cột B: Full Name
 * Cột C: Phone Number
 * Cột D: Email
 * Cột E: Checkin date
 * Cột F: Checkout date
 * Cột G: Number of Guest
 * Cột H: Room type
 * Cột I: Special Request
 */
function handleBookingSubmission(spreadsheet, data) {
  const sheet = spreadsheet.getSheetByName(CONFIG.TAB_BOOKING) || spreadsheet.getSheets()[1];
  if (!sheet) {
    throw new Error('Không tìm thấy tab sheet: ' + CONFIG.TAB_BOOKING);
  }

  const stayType = data.stayType || data.typeOfStay || '';
  const fullName = data.fullName || data.guestName || '';
  const phone = data.phoneNumber || data.phone || '';
  const email = data.email || '';
  const checkIn = data.checkIn || data.checkinDate || '';
  const checkOut = data.checkOut || data.checkoutDate || '';
  const guests = data.guests || data.numberOfGuest || 1;
  const roomType = data.roomType || data.roomName || '';
  const specialRequest = data.specialRequest || data.note || '';
  const estimatedPrice = data.estimatedPrice || '';

  // Thêm dòng mới vào Google Sheet đúng theo thứ tự Cột A -> I
  sheet.appendRow([
    stayType,
    fullName,
    phone,
    email,
    checkIn,
    checkOut,
    guests,
    roomType,
    specialRequest
  ]);

  // Gửi thông báo Telegram
  if (CONFIG.NOTIFY_ON_BOOKING && CONFIG.TELEGRAM_BOT_TOKEN !== 'YOUR_TELEGRAM_BOT_TOKEN') {
    const nowStr = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
    const message = [
      '🛎️ *[HÈM NHÀ LIVING] YÊU CẦU ĐẶT PHÒNG TẠM THỜI!*',
      '━━━━━━━━━━━━━━━━━━━━',
      '🏡 *Phòng:* ' + escapeMarkdown(roomType),
      '🔖 *Hình thức:* ' + escapeMarkdown(stayType),
      '👤 *Khách hàng:* ' + escapeMarkdown(fullName),
      '📞 *Số điện thoại:* ' + escapeMarkdown(phone),
      '✉️ *Email:* ' + (email ? escapeMarkdown(email) : '_Không cung cấp_'),
      '📅 *Nhận phòng (Check-in):* ' + escapeMarkdown(checkIn),
      '📅 *Trả phòng (Check-out):* ' + escapeMarkdown(checkOut),
      '👥 *Số lượng khách:* ' + guests + ' người',
      estimatedPrice ? ('💰 *Ước tính:* ' + escapeMarkdown(estimatedPrice)) : '',
      '📝 *Yêu cầu đặc biệt:* ' + (specialRequest ? escapeMarkdown(specialRequest) : '_Không có_'),
      '',
      '⏰ *Thời gian gửi:* ' + nowStr,
      '━━━━━━━━━━━━━━━━━━━━',
      '👉 _Yêu cầu tạm giữ chỗ - Vui lòng liên hệ xác nhận & hướng dẫn thanh toán cọc 30%!_'
    ].filter(Boolean).join('\n');

    sendTelegramMessage(message);
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    type: 'booking',
    message: 'Ghi nhận Booking tạm thời thành công!'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Gửi tin nhắn qua Telegram Bot API
 */
function sendTelegramMessage(text) {
  try {
    const url = 'https://api.telegram.org/bot' + CONFIG.TELEGRAM_BOT_TOKEN + '/sendMessage';
    const payload = {
      chat_id: CONFIG.TELEGRAM_CHAT_ID,
      text: text,
      parse_mode: 'Markdown'
    };

    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(url, options);
    Logger.log('Telegram response: ' + response.getContentText());
    return response;
  } catch (err) {
    Logger.log('Lỗi gửi Telegram: ' + err.toString());
  }
}

/**
 * Escape ký tự Markdown cho Telegram
 */
function escapeMarkdown(text) {
  if (!text) return '';
  return String(text).replace(/([_*\[\]()~`>#+-=|{}.!])/g, '\\$1');
}

/**
 * =========================================================================
 * CÁC HÀM TEST NỘI BỘ (Chạy thử 1-click trực tiếp trong Apps Script Editor)
 * =========================================================================
 */
function testEarlyBirdSubmission() {
  const fakePayload = {
    postData: {
      contents: JSON.stringify({
        type: 'early_bird',
        fullName: 'Nguyễn Văn Test (Early Bird)',
        phone: '0909123456',
        email: 'test.earlybird@gmail.com',
        stayOption: 'Homestay (4 Khoảnh khắc)',
        expectedStayingPeriod: 'Giữa tháng 12/2026',
        specialNote: 'Thích phòng có ban công ngắm hẻm yên tĩnh'
      })
    }
  };
  const result = doPost(fakePayload);
  Logger.log('Test Early Bird Result: ' + result.getContentText());
}

function testBookingSubmission() {
  const fakePayload = {
    postData: {
      contents: JSON.stringify({
        type: 'booking',
        stayType: 'Ngắn ngày (Short-term)',
        fullName: 'Trần Thị Test (Booking)',
        phone: '0918889999',
        email: 'test.booking@gmail.com',
        checkIn: '2026-12-15',
        checkOut: '2026-12-18 (3 đêm)',
        guests: 2,
        roomType: 'Sớm Mai (P.101)',
        specialRequest: 'Xin check-in muộn lúc 21h',
        estimatedPrice: '2.550.000 đ'
      })
    }
  };
  const result = doPost(fakePayload);
  Logger.log('Test Booking Result: ' + result.getContentText());
}
