import { ROOMS } from '../data/rooms';
import { DIY_LIVING_ROOMS } from '../data/diyLivingRooms';
import type { Language } from '../i18n/translations';

export const ORIGIN = 'https://hemnhaliving.com';
export type View = 'home' | 'moments' | 'diy-living' | 'cafe' | 'faq' | 'amenities' | 'policies';
export type Policy = 'all' | 'terms' | 'cancellation' | 'privacy';
export interface Route {
  path: string;
  view: View;
  title: [string, string];
  description: [string, string];
  roomId?: string;
  policy?: Policy;
}
export const ROUTES: Route[] = [
  { path: '/', view: 'home', title: ['Hẻm Nhà Living | Homestay & studio thuê tháng Quận 7', 'Hẻm Nhà Living | Homestay & monthly studios in District 7'], description: ['Một nhịp sống riêng tại 19/8A Tân Thuận Tây, Quận 7, TP.HCM: homestay, studio thuê tuần/tháng, Quando Quando Cafe và rooftop. Dự kiến mở cửa tháng 12/2026.', 'Find your own pace at 19/8A Tan Thuan Tay, District 7, Ho Chi Minh City: homestay, weekly/monthly studios, Quando Quando Cafe and rooftop. Planned opening: December 2026.'] },
  { path: '/homestay', view: 'moments', title: ['Homestay Quận 7 — Bốn khoảnh khắc | Hẻm Nhà Living', 'District 7 homestay — Four moments | Hẻm Nhà Living'], description: ['Sớm Mai, Mơ Trưa, Hoàng Hôn và Đêm Sao: bốn phòng homestay tại Tân Thuận, Quận 7. Không gian cho hai người lớn, check-in 14:00, check-out 12:00.', 'Sớm Mai, Mơ Trưa, Hoàng Hôn and Đêm Sao: four homestay rooms in Tan Thuan, District 7. Rooms for two adults. Check-in 14:00, check-out 12:00.'] },
  ...ROOMS.map((room): Route => ({ path: `/homestay/${room.id === 'trua-he' ? 'mo-trua' : room.id}`, view: 'moments', roomId: room.id, title: [`Phòng ${room.name} — Homestay Quận 7 | Hẻm Nhà Living`, `${room.name} room — District 7 homestay | Hẻm Nhà Living`], description: [`Phòng ${room.name} tại Hẻm Nhà Living, 19/8A Tân Thuận Tây, Quận 7: ${room.area}, ${room.capacity.toLowerCase()}. ${room.concept}. Dự kiến đón khách tháng 12/2026.`, `${room.name} at Hẻm Nhà Living, 19/8A Tan Thuan Tay, District 7: ${room.area.replace('ban công', 'balcony')}, two adults. Discover your own moment. Planned opening: December 2026.`] })),
  { path: '/thue-thang', view: 'diy-living', title: ['Studio thuê tuần, tháng & năm Quận 7 | Hẻm Nhà Living', 'Weekly, monthly & annual studios in District 7 | Hẻm Nhà Living'], description: ['Hẻm DIY thuê năm, tự bài trí; Hẻm Living đầy đủ nội thất thuê tuần, tháng hoặc năm tại Tân Thuận, Quận 7. Có wifi, cafe Quando Quando và rooftop.', 'Annual DIY studios to make your own, or furnished Living studios for weekly, monthly and annual stays in Tan Thuan, District 7. Wifi, Quando Quando Cafe and rooftop.'] },
  ...DIY_LIVING_ROOMS.map((room): Route => ({ path: `/thue-thang/${room.id}`, view: 'diy-living', roomId: room.id, title: [`${room.name} — Studio Quận 7 | Hẻm Nhà Living`, `${room.name} — District 7 studio | Hẻm Nhà Living`], description: [`Studio ${room.name} tại 19/8A Tân Thuận Tây, Quận 7. ${room.area}. ${room.concept}. Liên hệ Hẻm Nhà Living để nhận bảng giá và xác nhận lịch lưu trú.`, `${room.name} studio at 19/8A Tan Thuan Tay, District 7. ${room.area.replace('ban công', 'balcony').replace('sân hiên riêng', 'private patio')}. Contact Hẻm Nhà Living for rates and to confirm your stay.`] })),
  { path: '/cafe', view: 'cafe', title: ['Quando Quando Cafe — Góc cà phê Quận 7 | Hẻm Nhà Living', 'Quando Quando Cafe in District 7 | Hẻm Nhà Living'], description: ['Quando Quando Cafe tại Hẻm Nhà Living, 19/8A Tân Thuận Tây, Quận 7: cà phê, góc sách, đĩa than và bàn làm việc chung. Đón cả khách không lưu trú.', 'Quando Quando Cafe at Hẻm Nhà Living, 19/8A Tan Thuan Tay, District 7: coffee, books, vinyl and coworking tables. Non-resident guests welcome.'] },
  { path: '/tien-ich', view: 'amenities', title: ['Rooftop, bida & tiện ích Quận 7 | Hẻm Nhà Living', 'Rooftop, billiards & shared spaces | Hẻm Nhà Living'], description: ['Khoảng trời chung ở Hẻm Nhà Living, Quận 7: rooftop, bida, bi lắc và giặt sấy tự phục vụ. Khám phá tiện ích dành cho những nhịp sống riêng.', 'A shared sky for individual rhythms at Hẻm Nhà Living, District 7: rooftop, billiards, foosball and self-service laundry. Explore the shared spaces.'] },
  { path: '/faq', view: 'faq', title: ['Hỏi đáp: lưu trú, cafe & đặt phòng | Hẻm Nhà Living Quận 7', 'FAQ: stays, cafe & reservations | Hẻm Nhà Living District 7'], description: ['Địa chỉ, thời gian dự kiến mở cửa, check-in/check-out, studio thuê tháng, cafe và liên hệ Hẻm Nhà Living tại Quận 7. Câu trả lời rõ ràng cho chuyến ở của bạn.', 'Address, planned opening, check-in/check-out, monthly studios, cafe and contact details for Hẻm Nhà Living in District 7. Plain answers to plan your stay.'] },
  { path: '/chinh-sach', view: 'policies', policy: 'all', title: ['Chính sách & điều khoản | Hẻm Nhà Living', 'Policies & terms | Hẻm Nhà Living'], description: ['Nội quy lưu trú, chính sách hủy phòng và bảo mật tại Hẻm Nhà Living, Quận 7. Đọc thông tin trước khi gửi yêu cầu đặt chỗ.', 'House rules, cancellation and privacy policies at Hẻm Nhà Living, District 7. Review the details before requesting a reservation.'] },
  { path: '/dieu-khoan', view: 'policies', policy: 'terms', title: ['Điều khoản dịch vụ & nội quy | Hẻm Nhà Living', 'Terms of service & house rules | Hẻm Nhà Living'], description: ['Điều khoản dịch vụ và nội quy lưu trú tại Hẻm Nhà Living, 19/8A Tân Thuận Tây, Quận 7. Thông tin dành cho khách trước khi đặt phòng.', 'Terms of service and house rules at Hẻm Nhà Living, 19/8A Tan Thuan Tay, District 7. Information for guests before booking.'] },
  { path: '/chinh-sach-huy-phong', view: 'policies', policy: 'cancellation', title: ['Chính sách hủy phòng & hoàn tiền | Hẻm Nhà Living', 'Cancellation & refund policy | Hẻm Nhà Living'], description: ['Đọc chính sách hủy phòng, hoàn tiền, thay đổi lịch và trường hợp đặc biệt tại Hẻm Nhà Living. Liên hệ 0912254657 để xác nhận điều kiện đặt chỗ.', 'Read the cancellation, refund, date-change and special-case policy at Hẻm Nhà Living. Contact 0912254657 to confirm reservation conditions.'] },
  { path: '/chinh-sach-bao-mat', view: 'policies', policy: 'privacy', title: ['Chính sách bảo mật thông tin | Hẻm Nhà Living', 'Privacy policy | Hẻm Nhà Living'], description: ['Cách Hẻm Nhà Living thu thập, sử dụng và bảo vệ thông tin khi bạn đăng ký hoặc đặt phòng. Xem chính sách bảo mật và thông tin liên hệ.', 'How Hẻm Nhà Living collects, uses and protects information when you register or book. Read the privacy policy and contact details.'] },
];

export function languageFromPath(path: string): Language { return /^\/en(?:\/|$)/.test(path) ? 'en' : 'vi'; }
export function basePath(path: string) { return path.replace(/^\/en(?=\/|$)/, '').replace(/\/$/, '') || '/'; }
export function localizedPath(path: string, language: Language) {
  const suffixAt = path.search(/[?#]/);
  const suffix = suffixAt < 0 ? '' : path.slice(suffixAt);
  const base = basePath(suffixAt < 0 ? path : path.slice(0, suffixAt));
  return (language === 'en' ? `/en${base === '/' ? '' : base}` : base) + suffix;
}
export function findRoute(path: string) { return ROUTES.find(route => route.path === basePath(path)); }
export function roomPath(id: string) { return ROUTES.find(route => route.roomId === id)?.path || '/homestay'; }
export function policyPath(policy: string) { return ROUTES.find(route => route.policy === policy)?.path || '/chinh-sach'; }
export function tabPath(tab: View, section?: string) {
  if (tab === 'moments') return section ? roomPath(section) : '/homestay';
  if (tab === 'diy-living') return section ? roomPath(section) : '/thue-thang';
  if (tab === 'policies') return policyPath(section || 'all');
  if (tab === 'home' && section === 'cafe') return '/cafe';
  if (tab === 'home' && section === 'amenities') return '/tien-ich';
  return tab === 'home' ? `/${section ? `#${section}` : ''}` : ROUTES.find(route => route.view === tab)?.path || '/';
}

// Old shared hash URLs remain usable; new links always use real paths.
export function legacyPath(hash: string): string | undefined {
  const key = hash.toLowerCase().replace(/^#/, '');
  if (['terms', 'terms-of-service'].includes(key)) return '/dieu-khoan';
  if (['cancel', 'cancellation', 'cancellation-policy'].includes(key)) return '/chinh-sach-huy-phong';
  if (['privacy', 'privacy-policy'].includes(key)) return '/chinh-sach-bao-mat';
  if (['policies', 'policy', 'legal'].includes(key)) return '/chinh-sach';
  if (key === 'moments') return '/homestay';
  if (['diy-living', 'diy', 'living'].includes(key)) return '/thue-thang';
  const room = key.replace(/^(moments|diy-living)\//, '');
  if ([...ROOMS, ...DIY_LIVING_ROOMS].some(item => item.id === room)) return roomPath(room);
  return undefined;
}

export function navigate(path: string, replace = false) {
  window.history[replace ? 'replaceState' : 'pushState']({}, '', path);
  window.dispatchEvent(new Event('site:navigate'));
}
