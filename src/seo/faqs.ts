import { translations, type Language } from '../i18n/translations';

// Only facts already present in room data, translations and policies. No unpublished rates.
const additional = {
  vi: [
    { q: 'Hẻm Nhà Living ở đâu?', a: 'Hẻm Nhà Living ở 19/8A Tân Thuận Tây, Tân Thuận, Quận 7, TP. Hồ Chí Minh. Điện thoại / Zalo: 0912254657.' },
    { q: 'Khi nào Hẻm Nhà Living đón khách?', a: 'Hẻm Nhà Living dự kiến đón khách vào tháng 12/2026. Bạn có thể đăng ký Early Bird và liên hệ 0912254657 để xác nhận lịch lưu trú.' },
    { q: 'Hẻm Nhà có những hình thức lưu trú nào?', a: 'Hẻm Nhà Moments có bốn phòng homestay: Sớm Mai, Mơ Trưa, Hoàng Hôn và Đêm Sao. Hẻm DIY ở tầng trệt dành cho thuê theo năm, tự bài trí không gian. Hẻm Living có studio đầy đủ nội thất ở tầng 2, thuê theo tuần, tháng hoặc năm.' },
    { q: 'Giờ check-in và check-out là mấy giờ?', a: 'Check-in từ 14:00; check-out trước 12:00. Nếu cần nhận phòng sớm, vui lòng liên hệ trước để Hẻm Nhà kiểm tra tình trạng phòng.' },
    { q: 'Phòng homestay dành cho bao nhiêu người?', a: 'Mỗi phòng homestay Sớm Mai, Mơ Trưa, Hoàng Hôn và Đêm Sao dành cho 2 người lớn, diện tích khoảng 23–25 m². Một số phòng có ban công.' },
    { q: 'Không lưu trú có thể đến Quando Quando Cafe không?', a: 'Có. Quando Quando Cafe đón cả khách không lưu trú, có bàn làm việc chung, wifi, góc sách và đĩa than.' },
    { q: 'Hẻm Nhà có rooftop và giặt sấy không?', a: 'Có. Rooftop có giờ sử dụng 06:00–23:00 hằng ngày; khu giải trí bida, bi lắc mở 10:00–23:00. Có khu giặt sấy tự phục vụ, thanh toán bằng mã QR.' },
    { q: 'Làm sao nhận bảng giá studio thuê tuần hoặc tháng?', a: 'Vui lòng liên hệ 0912254657 hoặc hii.hemnhaliving@gmail.com để nhận bảng giá và xác nhận điều kiện thuê. Giá studio trên trang hiện được hiển thị rút gọn trong giai đoạn chuẩn bị mở cửa.' },
  ],
  en: [
    { q: 'Where is Hẻm Nhà Living?', a: 'Hẻm Nhà Living is at 19/8A Tan Thuan Tay, Tan Thuan, District 7, Ho Chi Minh City, Vietnam. Phone / Zalo: 0912254657.' },
    { q: 'When does Hẻm Nhà Living open?', a: 'Hẻm Nhà Living plans to welcome guests in December 2026. Register for Early Bird or contact 0912254657 to confirm your stay dates.' },
    { q: 'What kinds of stay are available?', a: 'Hẻm Nhà Moments has four homestay rooms: Sớm Mai, Mơ Trưa, Hoàng Hôn and Đêm Sao. Ground-floor Hẻm DIY studios are for annual leases and personal styling. Furnished Hẻm Living studios on floor 2 offer weekly, monthly or annual stays.' },
    { q: 'What are the check-in and check-out times?', a: 'Check-in starts at 14:00; check-out is before 12:00. Please contact Hẻm Nhà in advance to check availability for an early arrival.' },
    { q: 'How many guests can each homestay room accommodate?', a: 'Sớm Mai, Mơ Trưa, Hoàng Hôn and Đêm Sao each accommodate 2 adults and are approximately 23–25 m². Some rooms have a balcony.' },
    { q: 'Can non-residents visit Quando Quando Cafe?', a: 'Yes. Quando Quando Cafe welcomes non-residents, with coworking tables, wifi, books and vinyl.' },
    { q: 'Are there rooftop and laundry facilities?', a: 'Yes. The rooftop hours are 06:00–23:00 daily; billiards and foosball hours are 10:00–23:00. Self-service laundry is available with QR payment.' },
    { q: 'How do I get weekly or monthly studio rates?', a: 'Contact 0912254657 or hii.hemnhaliving@gmail.com for rates and lease conditions. Studio prices on the website currently use abbreviated displays during the pre-opening period.' },
  ],
};
export function getFaqs(language: Language, full = false) {
  return full ? [...additional[language], ...translations[language].contact.faqs] : translations[language].contact.faqs;
}
