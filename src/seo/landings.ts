import { ROOMS } from '../data/rooms';
import type { Language } from '../i18n/translations';
import type { LandingId } from './routes';

// Copy is limited to facts in the writer briefs (2026-11-21) and the live site.
// Anything the owner has not confirmed (airport pickup, fees, cafe closing time, "from" price rules, studio gaps) is deliberately absent.
export type Cell = string | { text: string; href: string };
export interface LandingSection {
  id: string;
  h2: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: { head: string[]; rows: Cell[][] };
  links?: { text: string; href: string }[];
  mapLink?: string;
}
export interface LandingContent {
  breadcrumb: string;
  h1: string;
  intro: string[];
  sections: LandingSection[];
  faqs: { q: string; a: string }[];
  faqTitle: string;
  cta: { title: string; text: string; book: string; earlyBird?: string; phone: string; email: string };
  labels: { home: string; mapText: string; related: string };
}

const MAPS = 'https://maps.app.goo.gl/AoTNEA5Tfnqa4qhK8';
const money = (value: number, language: Language) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, language === 'vi' ? '.' : ',') + ' ₫';
const rate = (id: string) => {
  const room = ROOMS.find(item => item.id === id)!;
  return { nightly: room.originalShortTermPrice!, from: room.shortTermPrice! };
};
const nightlyList = (language: Language) => ([['som-mai', 'Sớm Mai'], ['trua-he', 'Mơ Trưa'], ['hoang-hon', 'Hoàng Hôn'], ['dem-sao', 'Đêm Sao']] as const)
  .map(([id, name]) => {
    const { nightly, from } = rate(id);
    return language === 'vi'
      ? `${name} ${money(nightly, 'vi')}/đêm (từ ${money(from, 'vi')})`
      : `${name} ${money(nightly, 'en')} per night (from ${money(from, 'en')})`;
  }).join(language === 'vi' ? '; ' : '; ');
const roomRows = (language: Language): Cell[][] => {
  const prefix = language === 'vi' ? '' : '/en';
  const vi = language === 'vi';
  const price = (id: string) => { const { nightly, from } = rate(id); return vi ? `${money(nightly, 'vi')}/đêm · từ ${money(from, 'vi')}` : `${money(nightly, 'en')}/night · from ${money(from, 'en')}`; };
  const adults = vi ? '2 người lớn' : '2 adults';
  return [
    [{ text: 'Sớm Mai', href: `${prefix}/homestay/som-mai` }, adults, vi ? '23 m² + ban công' : '23 m² + balcony', price('som-mai'), vi ? 'Sofabed, tầng 1, bếp mini' : 'Sofabed, floor 1, mini kitchen'],
    [{ text: 'Mơ Trưa', href: `${prefix}/homestay/mo-trua` }, adults, vi ? '23 m² + ban công' : '23 m² + balcony', price('trua-he'), vi ? 'Sofabed, tầng 1, bếp' : 'Sofabed, floor 1, kitchen'],
    [{ text: 'Hoàng Hôn', href: `${prefix}/homestay/hoang-hon` }, adults, '25 m²', price('hoang-hon'), vi ? 'Giường Queen + sofa daybed, tầng 1, bếp mini' : 'Queen bed + daybed, floor 1, mini kitchen'],
    [{ text: 'Đêm Sao', href: `${prefix}/homestay/dem-sao` }, adults, '25 m²', price('dem-sao'), vi ? 'Giường Queen, tầng 1, màn chiếu, bếp tinh gọn' : 'Queen bed, floor 1, projector, compact kitchen'],
  ];
};

const viDistances = 'Khoảng cách theo đường đi, đo trên bản đồ và chỉ để tham khảo (thời gian thực tế tùy giờ cao điểm): Crescent Mall khoảng 3,8 km; SECC khoảng 3,8 km; Phú Mỹ Hưng (khu Tôn Dật Tiên) khoảng 4,1 km; chợ Bến Thành (Quận 1) khoảng 5,6 km; sân bay Tân Sơn Nhất khoảng 12,4 km.';
const viParking = 'Xe máy và ô tô gửi ở ngoài hẻm, đi bộ vào nhà.';

const homestayVi: LandingContent = {
  breadcrumb: 'Homestay Quận 7',
  h1: 'Homestay Quận 7 trong hẻm Tân Thuận',
  intro: [
    'Hẻm Nhà Living là ngôi nhà 5 tầng ở Tân Thuận, Quận 7, với bốn phòng homestay mang tên Sớm Mai, Mơ Trưa, Hoàng Hôn và Đêm Sao. Đây không phải khách sạn và không có phòng theo giờ: mỗi phòng dành cho 2 người lớn, nhận phòng từ 14:00.',
    'Hẻm Nhà dự kiến đón khách từ tháng 12/2026. Nhiều bài về homestay Quận 7 tập trung vào Phú Mỹ Hưng hoặc Tân Quy; Hẻm Nhà ở Tân Thuận, là nhà 5 tầng có cafe và rooftop.',
  ],
  sections: [
    { id: 'vi-tri', h2: 'Hẻm Nhà Living ở đâu trong Quận 7?', paragraphs: [
      'Địa chỉ: 19/8A Tân Thuận Tây, Tân Thuận, Quận 7, TP. Hồ Chí Minh. Hẻm Nhà nằm trong khu Tân Thuận, không nằm trong Phú Mỹ Hưng.',
      viDistances, viParking,
    ], mapLink: MAPS },
    { id: 'bon-phong', h2: 'Bốn phòng homestay — mỗi phòng cho 2 người', table: { head: ['Phòng', 'Sức chứa', 'Diện tích', 'Giá niêm yết', 'Điểm khác'], rows: roomRows('vi') }, links: [{ text: 'Xem cả bốn phòng tại Hẻm Nhà Moments', href: '/homestay' }] },
    { id: 'gia', h2: 'Giá homestay Quận 7 tại Hẻm Nhà', paragraphs: [
      'Bảng trên ghi giá niêm yết mỗi đêm của từng phòng và giá “từ” đang hiển thị trên site. Điều kiện áp dụng giá “từ” sẽ được xác nhận khi bạn liên hệ 0912254657, vì vậy hãy hỏi trước khi đặt.',
      'Homestay ngắn ngày đặt cọc 50%. Hủy miễn phí trước giờ nhận phòng ít nhất 48 giờ; dưới 48 giờ hoặc không đến thì không hoàn tiền.',
      'Nếu cần ở theo tuần hoặc tháng, xem bảng phòng studio thuê tuần, tháng và năm.',
    ], links: [{ text: 'Chính sách hủy phòng', href: '/chinh-sach-huy-phong' }, { text: 'Studio thuê tháng Quận 7', href: '/studio-thue-thang-quan-7' }, { text: 'Bảng phòng thuê tuần, tháng, năm', href: '/thue-thang' }] },
    { id: 'tien-nghi', h2: 'Tiện nghi trong phòng và trong nhà', bullets: [
      'Mỗi phòng có bếp (bếp mini hoặc bếp tinh gọn, xem bảng phòng); Đêm Sao có màn chiếu.',
      'Ban công: Sớm Mai và Mơ Trưa (23 m² + ban công).',
      'Quando Quando Cafe đón cả khách không lưu trú: bàn làm việc chung, wifi, góc sách, đĩa than; cafe mở từ 07:00.',
      'Rooftop 06:00–23:00; bida và bi lắc 10:00–23:00.',
      'Giặt sấy tự phục vụ ở khu chung, thanh toán bằng mã QR.',
    ], links: [{ text: 'Quando Quando Cafe', href: '/cafe' }, { text: 'Rooftop và tiện ích', href: '/tien-ich' }] },
    { id: 'noi-quy', h2: 'Giờ nhận phòng, ra vào và nội quy ngắn', bullets: [
      'Check-in từ 14:00, check-out trước 12:00. Cần nhận phòng sớm thì liên hệ trước.',
      'Ra vào 24/7 bằng khóa thông minh, không có giờ giới nghiêm.',
      'Giờ yên tĩnh 22:00–07:00; không hút thuốc trong phòng (ngoài trời có chỗ riêng).',
      'Khách ở lại qua đêm phải báo trước và có phụ phí.',
      'Thú cưng được mang theo. Hẻm Nhà hỗ trợ đăng ký tạm trú cho khách nước ngoài.',
    ] },
  ],
  faqTitle: 'Câu hỏi thường gặp về homestay Quận 7',
  faqs: [
    { q: 'Homestay Hẻm Nhà Living ở quận nào?', a: 'Hẻm Nhà Living ở 19/8A Tân Thuận Tây, Tân Thuận, Quận 7, TP. Hồ Chí Minh. Nhà nằm trong khu Tân Thuận, không nằm trong Phú Mỹ Hưng.' },
    { q: 'Giá homestay Quận 7 tại Hẻm Nhà là bao nhiêu?', a: `Giá niêm yết hiện tại: ${nightlyList('vi')}. Điều kiện áp dụng giá “từ” sẽ được xác nhận khi bạn liên hệ 0912254657.` },
    { q: 'Mỗi phòng ở được bao nhiêu người?', a: 'Mỗi phòng homestay dành cho 2 người lớn.' },
    { q: 'Check-in, check-out lúc mấy giờ?', a: 'Check-in từ 14:00 và check-out trước 12:00. Nếu cần nhận phòng sớm, hãy liên hệ trước để Hẻm Nhà kiểm tra tình trạng phòng.' },
    { q: 'Hủy phòng miễn phí trước bao lâu? Cọc bao nhiêu?', a: 'Hủy miễn phí trước giờ nhận phòng ít nhất 48 giờ; dưới 48 giờ hoặc không đến thì không hoàn tiền. Homestay ngắn ngày đặt cọc 50%.' },
    { q: 'Hẻm Nhà có giờ giới nghiêm không?', a: 'Không. Bạn ra vào 24/7 bằng khóa thông minh. Giờ yên tĩnh 22:00–07:00 là quy định giữ yên cho nhà, không phải giờ giới nghiêm.' },
    { q: 'Khi nào Hẻm Nhà đón khách?', a: 'Hẻm Nhà dự kiến đón khách vào tháng 12/2026. Bạn có thể liên hệ 0912254657 hoặc đăng ký Early Bird để giữ chỗ.' },
    { q: 'Không lưu trú có vào cafe được không?', a: 'Có. Quando Quando Cafe đón cả khách không lưu trú, có bàn làm việc chung, wifi, góc sách và đĩa than.' },
  ],
  cta: { title: 'Đặt phòng hoặc giữ chỗ Early Bird', text: 'Đặt qua form trên site, gọi hoặc nhắn Zalo 0912254657. Hẻm Nhà xác nhận đặt phòng trong 2–4 giờ và chưa thu phí cho đến khi xác nhận. Hẻm Nhà dự kiến mở cửa tháng 12/2026; bạn có thể đăng ký Early Bird để giữ chỗ.', book: 'Kiểm tra phòng trống và đặt chỗ', earlyBird: 'Đăng ký Early Bird', phone: 'Gọi / Zalo 0912254657', email: 'hii.hemnhaliving@gmail.com' },
  labels: { home: 'Trang chủ', mapText: 'Mở trong Google Maps', related: 'Xem thêm' },
};

const studioVi: LandingContent = {
  breadcrumb: 'Studio thuê tháng Quận 7',
  h1: 'Studio thuê tháng ở Tân Thuận, Quận 7',
  intro: [
    'Hẻm Nhà Living có hai dòng studio trong ngôi nhà 5 tầng ở Tân Thuận: Hẻm Living đầy đủ nội thất ở tầng 2, thuê tuần, tháng hoặc năm; và Hẻm DIY ở tầng trệt, thuê theo năm, bạn tự bài trí. Nhà có Quando Quando Cafe và rooftop. Hẻm Nhà dự kiến mở cửa tháng 12/2026.',
    'Trang này giải thích vì sao thuê ở đây và giá gồm những gì. Bảng phòng đầy đủ nằm ở trang bảng phòng thuê tuần, tháng, năm.',
  ],
  sections: [
    { id: 'khac-biet', h2: 'Studio ở Hẻm Nhà khác căn hộ dịch vụ generic ở điểm nào', bullets: [
      'Là một ngôi nhà 5 tầng có thiết kế riêng, không phải một block phòng trọ.',
      'Quando Quando Cafe có ưu đãi cho cư dân; rooftop, bida, bi lắc và giặt sấy tự phục vụ thanh toán QR.',
      'Ra vào 24/7 bằng khóa thông minh, có CCTV 24/7.',
      'Xuất hóa đơn HKD theo yêu cầu.',
    ], paragraphs: ['Hẻm Nhà không cạnh tranh bằng mức giá thấp nhất: Hẻm Living công bố ở mức 7.x–8.x M đ/tháng. Đổi lại là không gian được thiết kế, cafe, rooftop và khả năng thuê theo tuần.'] },
    { id: 'hai-lua-chon', h2: 'Hai lựa chọn: Hẻm Living và Hẻm DIY', paragraphs: [
      'Hẻm Living: studio đầy đủ nội thất ở tầng 2, khoảng 23 m² + ban công, bếp nhỏ (kitchenette), thuê tuần, tháng hoặc năm.',
      'Hẻm DIY: studio ở tầng trệt, 22 m² + 8 m² sân hiên riêng, thuê theo năm (thanh toán theo tháng), bạn tự trang trí không gian.',
    ], table: { head: ['Căn', 'Dòng', 'Tầng', 'Diện tích', 'Sức chứa', 'Giá tuần', 'Giá tháng'], rows: [
      [{ text: 'Hẻm Minimal', href: '/thue-thang/hem-minimal' }, 'Living', 'Tầng 2', '23 m² + ban công', '1–2 người lớn', '2.x M đ', '7.x M đ'],
      [{ text: 'Hẻm Japandi', href: '/thue-thang/hem-japandi' }, 'Living', 'Tầng 2', '23 m² + ban công', '2 người lớn', '3.x M đ', '8.x M đ'],
      [{ text: 'Mo-Japandi', href: '/thue-thang/mo-japandi' }, 'Living', 'Tầng 2', '23 m² + ban công', '2 người lớn', '2.x M đ', '7.x M đ'],
      [{ text: 'Hẻm Scandi', href: '/thue-thang/hem-scandi' }, 'Living', 'Tầng 2', '23 m² + ban công', '2 người lớn', '3.x M đ', '8.x M đ'],
      [{ text: 'Hẻm DIY 1', href: '/thue-thang/hem-diy-1' }, 'DIY', 'Tầng trệt', '22 m² + 8 m² sân hiên', '1–2 người lớn', 'Theo năm', '4.x M đ'],
      [{ text: 'Hẻm DIY 2', href: '/thue-thang/hem-diy-2' }, 'DIY', 'Tầng trệt', '22 m² + 8 m² sân hiên', '2 người lớn', 'Theo năm', '5.x M đ'],
    ] }, links: [{ text: 'Xem bảng phòng thuê tuần, tháng, năm', href: '/thue-thang' }] },
    { id: 'gia', h2: 'Giá thuê tuần / tháng và chi phí phát sinh', bullets: [
      'Giá công bố dạng .x là nguồn tham chiếu; liên hệ để xác nhận tổng chi phí và phòng trống.',
      'Giá thuê bao gồm wifi riêng (cáp quang, phủ toàn nhà). Điện và nước tính theo thực tế, theo đơn giá nhà nước.',
      'Giặt sấy và dọn dẹp có mức ưu đãi cho cư dân; Hẻm Nhà sẽ báo mức phí khi bạn liên hệ.',
      'Thuê dài hạn (tuần, tháng hoặc năm) đặt cọc theo thỏa thuận.',
      'Chính sách hủy 48 giờ đang áp dụng trên site cho đặt phòng; điều khoản cụ thể cho hợp đồng tuần, tháng hoặc năm sẽ được xác nhận khi bạn liên hệ.',
    ], links: [{ text: 'Chính sách hủy phòng', href: '/chinh-sach-huy-phong' }] },
    { id: 'ai-hop', h2: 'Ai hợp ở đây', bullets: [
      'Ở vài tuần đến vài tháng: chọn Hẻm Living.',
      'Ở theo năm và muốn tự bày trí: chọn Hẻm DIY.',
      'Làm việc từ xa: Mo-Japandi có góc làm việc với bàn gỗ; Quando Quando Cafe có bàn làm việc chung và wifi.',
      'Chỉ cần vài đêm: xem homestay Quận 7 của Hẻm Nhà.',
    ], links: [{ text: 'Homestay Quận 7', href: '/homestay-quan-7' }, { text: 'Quando Quando Cafe', href: '/cafe' }, { text: 'Rooftop và tiện ích', href: '/tien-ich' }] },
    { id: 'vi-tri', h2: 'Vị trí Tân Thuận', paragraphs: [
      'Địa chỉ: 19/8A Tân Thuận Tây, Tân Thuận, Quận 7, TP. Hồ Chí Minh. Hẻm Nhà ở Tân Thuận, không nằm trong Phú Mỹ Hưng.',
      viDistances, viParking,
      'Thú cưng được mang theo. Hẻm Nhà hỗ trợ đăng ký tạm trú cho khách nước ngoài.',
    ], mapLink: MAPS },
  ],
  faqTitle: 'Câu hỏi thường gặp về studio thuê tháng',
  faqs: [
    { q: 'Studio thuê tháng ở Hẻm Nhà giá khoảng bao nhiêu?', a: 'Hẻm Living công bố dạng .x: 7.x hoặc 8.x M đ/tháng tùy căn, 2.x hoặc 3.x M đ/tuần. Hẻm DIY 1 khoảng 4.x M đ/tháng và Hẻm DIY 2 khoảng 5.x M đ/tháng, theo hợp đồng năm. Liên hệ để xác nhận tổng chi phí và phòng trống.' },
    { q: 'Thuê theo tuần hoặc vài tháng được không?', a: 'Được với Hẻm Living: thuê tuần, tháng hoặc năm. Hẻm DIY thuê theo năm, thanh toán theo tháng.' },
    { q: 'Phòng đã có nội thất chưa?', a: 'Hẻm Living đầy đủ nội thất. Hẻm DIY là không gian nguyên bản để bạn tự trang trí.' },
    { q: 'Giá đã gồm điện, nước, wifi chưa?', a: 'Giá thuê gồm wifi. Điện và nước tính theo thực tế, theo đơn giá nhà nước.' },
    { q: 'Thuê dài hạn cọc bao nhiêu?', a: 'Thuê dài hạn (tuần, tháng hoặc năm) đặt cọc theo thỏa thuận. Liên hệ 0912254657 để chốt điều kiện.' },
    { q: 'Studio ở tầng nào, diện tích bao nhiêu?', a: 'Hẻm Living ở tầng 2, khoảng 23 m² + ban công. Hẻm DIY ở tầng trệt, 22 m² + 8 m² sân hiên.' },
    { q: 'Hẻm Nhà có xuất hóa đơn không?', a: 'Có, Hẻm Nhà xuất hóa đơn HKD theo yêu cầu.' },
    { q: 'Có giờ giới nghiêm không?', a: 'Không. Bạn ra vào 24/7. Giờ yên tĩnh là 22:00–07:00.' },
  ],
  cta: { title: 'Xem phòng và nhận bảng giá', text: 'Liên hệ 0912254657 hoặc hii.hemnhaliving@gmail.com để nhận bảng giá và xác nhận điều kiện thuê. Hẻm Nhà dự kiến mở cửa tháng 12/2026 và xác nhận trong 2–4 giờ.', book: 'Kiểm tra phòng trống và đặt chỗ', phone: 'Gọi / Zalo 0912254657', email: 'hii.hemnhaliving@gmail.com' },
  labels: { home: 'Trang chủ', mapText: 'Mở trong Google Maps', related: 'Xem thêm' },
};

const enDistances = 'Road distances, measured on a map and for reference only (actual travel time depends on traffic): Crescent Mall about 3.8 km; SECC about 3.8 km; Phu My Hung (Ton Dat Tien area) about 4.1 km; Ben Thanh Market (District 1) about 5.6 km; Tan Son Nhat Airport about 12.4 km.';
const enParking = 'Motorbikes and cars are parked outside the alley; you walk into the house.';
const shortStayEn: LandingContent = {
  breadcrumb: 'Short stay in District 7',
  h1: 'A short stay in District 7 — Tan Thuan, not downtown',
  intro: [
    'Hẻm Nhà Living is a five-storey house at 19/8A Tan Thuan Tay, Tan Thuan, District 7. It is a boutique homestay with four named rooms — not a hotel tower and not a hostel dorm.',
    'Planned opening: December 2026.',
  ],
  sections: [
    { id: 'is-d7-good', h2: 'Is District 7 a good place to stay in Ho Chi Minh City?', paragraphs: [
      'Yes, if you want a calmer base in the south of the city, on the Phu My Hung / Tan Thuan side, with malls and cafes in the district. It suits quieter nights, work trips and guests who already plan to spend time in the south.',
      `It is less ideal if your only plan is to walk around District 1 all day. For reference, Ben Thanh Market in District 1 is about 5.6 km from the house by road; travel time depends on traffic.`,
    ] },
    { id: 'where', h2: 'Where Hẻm Nhà actually is', paragraphs: [
      'Address: 19/8A Tan Thuan Tay, Tan Thuan, District 7, Ho Chi Minh City. The house is in Tan Thuan, not inside Phu My Hung.',
      enDistances,
      'Motorbikes and cars are parked outside the alley; you walk into the house.',
    ], mapLink: MAPS },
    { id: 'rooms', h2: 'The four short-stay rooms', paragraphs: ['Each room is private and sleeps two adults, about 23–25 m². The rates below are the live VND rates on the site, with the published “from” rate. The rule for when a “from” rate applies is confirmed when you contact us; ask the team to confirm VND rates for your dates.'],
      table: { head: ['Room', 'Sleeps', 'Size', 'Rate', 'Notes'], rows: roomRows('en') }, links: [{ text: 'See all four rooms', href: '/en/homestay' }] },
    { id: 'longer', h2: 'Staying a week or more', paragraphs: [
      'Furnished Hẻm Living studios on floor 2 can be rented by the week, month or year. Ground-floor Hẻm DIY studios are annual and you style them yourself. Studio prices are shown as .x on the site.',
    ], links: [{ text: 'Weekly, monthly & annual studios', href: '/en/thue-thang' }] },
    { id: 'house', h2: 'Cafe, rooftop, and house rules', bullets: [
      'Quando Quando Cafe is open to non-guests: shared work table, wifi, books and vinyl. It opens at 07:00.',
      'Rooftop 06:00–23:00; billiards and foosball 10:00–23:00; self-service laundry paid by QR.',
      'Check-in from 14:00, check-out before 12:00. 24/7 access with a smart lock.',
      'Quiet hours 22:00–07:00. No smoking in rooms (there is an outdoor smoking area).',
      'Overnight visitors must be registered in advance and a fee may apply.',
      'Pets are welcome. Hẻm Nhà can help foreign guests with temporary residence registration.',
    ], links: [{ text: 'Quando Quando Cafe', href: '/en/cafe' }, { text: 'Rooftop & amenities', href: '/en/tien-ich' }] },
    { id: 'booking', h2: 'Booking, deposit, and cancellation', paragraphs: [
      'Short-stay homestays require a 50% deposit. Free cancellation up to 48 hours before check-in; cancellations with less than 48 hours’ notice or no-shows are non-refundable.',
      'Bookings are confirmed within 2–4 hours, and nothing is charged until confirmed.',
    ], links: [{ text: 'Cancellation policy', href: '/en/chinh-sach-huy-phong' }] },
  ],
  faqTitle: 'FAQ: short stay in District 7',
  faqs: [
    { q: 'Is District 7 a good place to stay in Ho Chi Minh City?', a: 'It is good for a quieter stay in the south of the city, with malls and cafes in the district. It is not the same as staying in District 1, so it suits you less if you plan to spend every day walking around District 1.' },
    { q: 'Where is Hẻm Nhà Living?', a: 'Hẻm Nhà Living is at 19/8A Tan Thuan Tay, Tan Thuan, District 7, Ho Chi Minh City. It is not inside Phu My Hung.' },
    { q: 'How much is a short-stay room?', a: `Live rates: ${nightlyList('en')}. The conditions for “from” rates are confirmed when you contact us on +84 912 254 657.` },
    { q: 'How many people can a room sleep?', a: 'Each room sleeps two adults.' },
    { q: 'What are check-in and check-out times?', a: 'Check-in is from 14:00 and check-out is before 12:00. Early check-in on request if the room is ready.' },
    { q: 'What is the cancellation and deposit policy?', a: 'Free cancellation at least 48 hours before check-in. Short-stay homestays require a 50% deposit.' },
    { q: 'Is there a curfew?', a: 'No. You have 24/7 access with a smart lock. Quiet hours are 22:00–07:00.' },
    { q: 'When does the house open?', a: 'Hẻm Nhà Living plans to open in December 2026. Contact +84 912 254 657 or hii.hemnhaliving@gmail.com.' },
    { q: 'Can I visit the cafe if I am not staying overnight?', a: 'Yes. Quando Quando Cafe is open to non-guests.' },
    { q: 'How do I get there from Tan Son Nhat Airport?', a: 'The airport is about 12.4 km from the house by road. Typical options are a ride-hailing car or a taxi; travel time and fares vary and are not published here. Airport pickup has not been confirmed, so please do not assume it is included — message us to ask.' },
  ],
  cta: { title: 'Reserve a room or join Early Bird', text: 'Message Zalo/WhatsApp +84 912 254 657, email hii.hemnhaliving@gmail.com, or use the booking form. The house opens in December 2026, confirmation takes 2–4 hours and nothing is charged until confirmed. You can also join Early Bird. Staying longer than a few nights? Ask about a weekly studio.', book: 'Check availability and reserve', earlyBird: 'Join Early Bird', phone: 'Call / Zalo +84 912 254 657', email: 'hii.hemnhaliving@gmail.com' },
  labels: { home: 'Home', mapText: 'Open in Google Maps', related: 'More' },
};

const phuMyHungVi: LandingContent = {
  breadcrumb: 'Homestay gần Phú Mỹ Hưng',
  h1: 'Homestay gần Phú Mỹ Hưng — 4,1 km từ khu Tôn Dật Tiên',
  intro: [
    'Hẻm Nhà Living nằm ở Tân Thuận, Quận 7, không nằm trong Phú Mỹ Hưng. Khoảng cách tới khu Tôn Dật Tiên khoảng 4,1 km, Crescent Mall khoảng 3,8 km theo đường đi. Nhà 5 tầng với bốn phòng homestay Sớm Mai, Mơ Trưa, Hoàng Hôn và Đêm Sao.',
    'Hẻm Nhà dự kiến đón khách từ tháng 12/2026. Đăng ký Early Bird để giữ chỗ hoặc liên hệ 0912254657.',
  ],
  sections: [
    { id: 'khoang-cach', h2: 'Khoảng cách từ Hẻm Nhà tới Phú Mỹ Hưng và các điểm lân cận', paragraphs: [
      'Địa chỉ: 19/8A Tân Thuận Tây, Tân Thuận, Quận 7, TP. Hồ Chí Minh. Hẻm Nhà ở Tân Thuận, không nằm trong Phú Mỹ Hưng.',
      viDistances, viParking,
    ], mapLink: MAPS },
    { id: 'bon-phong', h2: 'Bốn phòng homestay cho 2 người', table: { head: ['Phòng', 'Sức chứa', 'Diện tích', 'Giá niêm yết', 'Điểm khác'], rows: roomRows('vi') }, links: [{ text: 'Xem cả bốn phòng tại Hẻm Nhà Moments', href: '/homestay' }] },
    { id: 'gia', h2: 'Giá và chính sách đặt phòng', paragraphs: [
      'Bảng trên ghi giá niêm yết mỗi đêm và giá "từ" đang hiển thị trên site. Điều kiện áp dụng giá "từ" sẽ được xác nhận khi bạn liên hệ 0912254657.',
      'Homestay ngắn ngày đặt cọc 50%. Hủy miễn phí trước giờ nhận phòng ít nhất 48 giờ; dưới 48 giờ hoặc không đến thì không hoàn tiền.',
    ], links: [{ text: 'Chính sách hủy phòng', href: '/chinh-sach-huy-phong' }] },
    { id: 'tien-nghi', h2: 'Tiện nghi tại Hẻm Nhà', bullets: [
      'Quando Quando Cafe đón cả khách không lưu trú: bàn làm việc chung, wifi, góc sách, đĩa than; cafe mở từ 07:00.',
      'Rooftop 06:00–23:00; bida và bi lắc 10:00–23:00.',
      'Giặt sấy tự phục vụ ở khu chung, thanh toán bằng mã QR.',
      'Thú cưng được mang theo. Hẻm Nhà hỗ trợ đăng ký tạm trú cho khách nước ngoài.',
    ], links: [{ text: 'Quando Quando Cafe', href: '/cafe' }, { text: 'Rooftop và tiện ích', href: '/tien-ich' }] },
    { id: 'noi-quy', h2: 'Nội quy và giờ nhận phòng', bullets: [
      'Check-in từ 14:00, check-out trước 12:00. Cần nhận phòng sớm thì liên hệ trước.',
      'Ra vào 24/7 bằng khóa thông minh, không có giờ giới nghiêm.',
      'Giờ yên tĩnh 22:00–07:00; không hút thuốc trong phòng.',
      'Nếu cần ở theo tuần hoặc tháng, xem studio thuê tháng.',
    ], links: [{ text: 'Studio thuê tháng Quận 7', href: '/studio-thue-thang-quan-7' }, { text: 'Bảng phòng thuê tuần, tháng, năm', href: '/thue-thang' }, { text: 'Homestay Quận 7', href: '/homestay-quan-7' }] },
  ],
  faqTitle: 'Câu hỏi thường gặp về homestay gần Phú Mỹ Hưng',
  faqs: [
    { q: 'Hẻm Nhà Living cách Phú Mỹ Hưng bao xa?', a: 'Khoảng 4,1 km tới khu Tôn Dật Tiên theo đường đi. Hẻm Nhà nằm ở Tân Thuận, Quận 7, không nằm trong Phú Mỹ Hưng.' },
    { q: 'Giá homestay gần Phú Mỹ Hưng tại Hẻm Nhà là bao nhiêu?', a: `Giá niêm yết hiện tại: ${nightlyList('vi')}. Điều kiện áp dụng giá "từ" sẽ được xác nhận khi bạn liên hệ 0912254657.` },
    { q: 'Mỗi phòng ở được bao nhiêu người?', a: 'Mỗi phòng homestay dành cho 2 người lớn.' },
    { q: 'Check-in, check-out lúc mấy giờ?', a: 'Check-in từ 14:00 và check-out trước 12:00.' },
    { q: 'Có hủy miễn phí không? Cọc bao nhiêu?', a: 'Hủy miễn phí trước giờ nhận phòng ít nhất 48 giờ. Homestay ngắn ngày đặt cọc 50%.' },
    { q: 'Có chỗ gửi xe không?', a: 'Xe máy và ô tô gửi ở ngoài hẻm, đi bộ vào nhà.' },
    { q: 'Khi nào Hẻm Nhà đón khách?', a: 'Hẻm Nhà dự kiến đón khách vào tháng 12/2026. Đăng ký Early Bird hoặc liên hệ 0912254657.' },
    { q: 'Có mang thú cưng được không?', a: 'Được. Thú cưng được mang theo.' },
  ],
  cta: { title: 'Đặt phòng hoặc giữ chỗ Early Bird', text: 'Đặt qua form trên site, gọi hoặc nhắn Zalo 0912254657. Hẻm Nhà xác nhận đặt phòng trong 2–4 giờ và chưa thu phí cho đến khi xác nhận. Hẻm Nhà dự kiến mở cửa tháng 12/2026; bạn có thể đăng ký Early Bird để giữ chỗ.', book: 'Kiểm tra phòng trống và đặt chỗ', earlyBird: 'Đăng ký Early Bird', phone: 'Gọi / Zalo 0912254657', email: 'hii.hemnhaliving@gmail.com' },
  labels: { home: 'Trang chủ', mapText: 'Mở trong Google Maps', related: 'Xem thêm' },
};

const seccVi: LandingContent = {
  breadcrumb: 'Chỗ ở gần SECC',
  h1: 'Chỗ ở gần SECC — cách 3,8 km tại Tân Thuận, Quận 7',
  intro: [
    'Hẻm Nhà Living là ngôi nhà 5 tầng ở Tân Thuận, Quận 7, cách SECC (Trung tâm Hội chợ Triển lãm Sài Gòn) khoảng 3,8 km theo đường đi. Nhà có bốn phòng homestay Sớm Mai, Mơ Trưa, Hoàng Hôn và Đêm Sao, Quando Quando Cafe và rooftop.',
    'Nếu bạn đang tham dự sự kiện hoặc triển lãm tại SECC và cần chỗ nghỉ 1–3 đêm, Hẻm Nhà là một lựa chọn trong Quận 7. Dự kiến đón khách từ tháng 12/2026.',
  ],
  sections: [
    { id: 'khoang-cach', h2: 'Khoảng cách từ Hẻm Nhà tới SECC và các điểm lân cận', paragraphs: [
      'Địa chỉ: 19/8A Tân Thuận Tây, Tân Thuận, Quận 7, TP. Hồ Chí Minh.',
      viDistances, viParking,
    ], mapLink: MAPS },
    { id: 'bon-phong', h2: 'Bốn phòng homestay cho 2 người', table: { head: ['Phòng', 'Sức chứa', 'Diện tích', 'Giá niêm yết', 'Điểm khác'], rows: roomRows('vi') }, links: [{ text: 'Xem cả bốn phòng tại Hẻm Nhà Moments', href: '/homestay' }] },
    { id: 'gia', h2: 'Giá và chính sách đặt phòng', paragraphs: [
      'Bảng trên ghi giá niêm yết mỗi đêm và giá "từ" đang hiển thị trên site. Điều kiện áp dụng giá "từ" sẽ được xác nhận khi bạn liên hệ 0912254657.',
      'Homestay ngắn ngày đặt cọc 50%. Hủy miễn phí trước giờ nhận phòng ít nhất 48 giờ; dưới 48 giờ hoặc không đến thì không hoàn tiền.',
    ], links: [{ text: 'Chính sách hủy phòng', href: '/chinh-sach-huy-phong' }] },
    { id: 'tien-nghi', h2: 'Tiện nghi cho khách công tác', bullets: [
      'Quando Quando Cafe: wifi, bàn làm việc chung, góc sách, đĩa than. Cafe mở từ 07:00. Đón cả khách không lưu trú.',
      'Rooftop 06:00–23:00; bida và bi lắc 10:00–23:00.',
      'Giặt sấy tự phục vụ ở khu chung, thanh toán bằng mã QR.',
      'Ra vào 24/7 bằng khóa thông minh. Giờ yên tĩnh 22:00–07:00.',
    ], links: [{ text: 'Quando Quando Cafe', href: '/cafe' }, { text: 'Rooftop và tiện ích', href: '/tien-ich' }] },
    { id: 'o-lau', h2: 'Ở lâu hơn — studio thuê tuần hoặc tháng', paragraphs: [
      'Nếu bạn cần ở nhiều hơn vài đêm, Hẻm Nhà có studio Hẻm Living đầy đủ nội thất ở tầng 2, thuê theo tuần, tháng hoặc năm.',
    ], links: [{ text: 'Studio thuê tháng Quận 7', href: '/studio-thue-thang-quan-7' }, { text: 'Bảng phòng thuê tuần, tháng, năm', href: '/thue-thang' }, { text: 'Homestay Quận 7', href: '/homestay-quan-7' }, { text: 'Homestay gần Phú Mỹ Hưng', href: '/homestay-gan-phu-my-hung' }] },
  ],
  faqTitle: 'Câu hỏi thường gặp về chỗ ở gần SECC',
  faqs: [
    { q: 'Hẻm Nhà Living cách SECC bao xa?', a: 'Khoảng 3,8 km theo đường đi. Thời gian thực tế tùy giờ cao điểm.' },
    { q: 'Giá phòng gần SECC tại Hẻm Nhà là bao nhiêu?', a: `Giá niêm yết hiện tại: ${nightlyList('vi')}. Liên hệ 0912254657 để xác nhận.` },
    { q: 'Mỗi phòng ở được bao nhiêu người?', a: 'Mỗi phòng homestay dành cho 2 người lớn.' },
    { q: 'Check-in, check-out lúc mấy giờ?', a: 'Check-in từ 14:00 và check-out trước 12:00.' },
    { q: 'Có wifi và chỗ làm việc không?', a: 'Có. Quando Quando Cafe có wifi và bàn làm việc chung.' },
    { q: 'Hủy phòng thế nào? Cọc bao nhiêu?', a: 'Hủy miễn phí trước giờ nhận phòng ít nhất 48 giờ. Homestay ngắn ngày đặt cọc 50%.' },
    { q: 'Khi nào Hẻm Nhà đón khách?', a: 'Hẻm Nhà dự kiến đón khách vào tháng 12/2026. Liên hệ 0912254657 hoặc đăng ký Early Bird.' },
  ],
  cta: { title: 'Đặt phòng hoặc giữ chỗ Early Bird', text: 'Đặt qua form trên site, gọi hoặc nhắn Zalo 0912254657. Hẻm Nhà xác nhận đặt phòng trong 2–4 giờ và chưa thu phí cho đến khi xác nhận. Hẻm Nhà dự kiến mở cửa tháng 12/2026; bạn có thể đăng ký Early Bird để giữ chỗ.', book: 'Kiểm tra phòng trống và đặt chỗ', earlyBird: 'Đăng ký Early Bird', phone: 'Gọi / Zalo 0912254657', email: 'hii.hemnhaliving@gmail.com' },
  labels: { home: 'Trang chủ', mapText: 'Mở trong Google Maps', related: 'Xem thêm' },
};

const studioRows = (language: Language): Cell[][] => {
  const prefix = language === 'vi' ? '' : '/en';
  const vi = language === 'vi';
  return [
    [{ text: 'Hẻm Minimal', href: `${prefix}/thue-thang/hem-minimal` }, 'Living', vi ? 'Tầng 2' : 'Floor 2', vi ? '23 m² + ban công' : '23 m² + balcony', vi ? '1–2 người lớn' : '1–2 adults', '2.x M đ', '7.x M đ'],
    [{ text: 'Hẻm Japandi', href: `${prefix}/thue-thang/hem-japandi` }, 'Living', vi ? 'Tầng 2' : 'Floor 2', vi ? '23 m² + ban công' : '23 m² + balcony', vi ? '2 người lớn' : '2 adults', '3.x M đ', '8.x M đ'],
    [{ text: 'Mo-Japandi', href: `${prefix}/thue-thang/mo-japandi` }, 'Living', vi ? 'Tầng 2' : 'Floor 2', vi ? '23 m² + ban công' : '23 m² + balcony', vi ? '2 người lớn' : '2 adults', '2.x M đ', '7.x M đ'],
    [{ text: 'Hẻm Scandi', href: `${prefix}/thue-thang/hem-scandi` }, 'Living', vi ? 'Tầng 2' : 'Floor 2', vi ? '23 m² + ban công' : '23 m² + balcony', vi ? '2 người lớn' : '2 adults', '3.x M đ', '8.x M đ'],
    [{ text: 'Hẻm DIY 1', href: `${prefix}/thue-thang/hem-diy-1` }, 'DIY', vi ? 'Tầng trệt' : 'Ground floor', vi ? '22 m² + 8 m² sân hiên' : '22 m² + 8 m² patio', vi ? '1–2 người lớn' : '1–2 adults', vi ? 'Theo năm' : 'Annual', '4.x M đ'],
    [{ text: 'Hẻm DIY 2', href: `${prefix}/thue-thang/hem-diy-2` }, 'DIY', vi ? 'Tầng trệt' : 'Ground floor', vi ? '22 m² + 8 m² sân hiên' : '22 m² + 8 m² patio', vi ? '2 người lớn' : '2 adults', vi ? 'Theo năm' : 'Annual', '5.x M đ'],
  ];
};

const monthlyStudioEn: LandingContent = {
  breadcrumb: 'Monthly studio District 7',
  h1: 'Monthly studio in District 7 — Tan Thuan, not a hotel tower',
  intro: [
    'Hẻm Nhà Living is a five-storey house at 19/8A Tan Thuan Tay, Tan Thuan, District 7. It has furnished Hẻm Living studios on floor 2 for weekly, monthly or annual stays, and unfurnished Hẻm DIY studios on the ground floor for annual leases. The house also has Quando Quando Cafe and a rooftop.',
    'Planned opening: December 2026.',
  ],
  sections: [
    { id: 'why', h2: 'Why rent here instead of a generic serviced apartment', bullets: [
      'A five-storey house with its own design, not a block of identical rooms.',
      'Quando Quando Cafe with resident perks; rooftop, billiards, foosball, and self-service laundry paid by QR.',
      '24/7 access with a smart lock. CCTV.',
      'HKD invoices on request.',
    ], paragraphs: ['Hẻm Nhà does not compete on the lowest price: Hẻm Living publishes at 7.x–8.x M VND per month. In return you get designed spaces, a cafe, a rooftop and the ability to rent by the week.'] },
    { id: 'two-lines', h2: 'Two studio lines: Hẻm Living and Hẻm DIY', paragraphs: [
      'Hẻm Living: furnished studios on floor 2, about 23 m² + balcony, kitchenette, weekly, monthly or annual.',
      'Hẻm DIY: ground-floor studios, 22 m² + 8 m² private patio, annual lease (monthly payments), you style the space.',
    ], table: { head: ['Unit', 'Line', 'Floor', 'Size', 'Sleeps', 'Weekly', 'Monthly'], rows: studioRows('en') }, links: [{ text: 'See all studios', href: '/en/thue-thang' }] },
    { id: 'included', h2: 'What is included in the rent', bullets: [
      'Rates shown as .x are reference prices; contact to confirm the total cost and availability.',
      'Rent includes private wifi (fibre, house-wide). Electricity and water are billed at actual consumption at government tariffs.',
      'Laundry and cleaning are available at resident rates; Hẻm Nhà will confirm the fees when you contact them.',
      'Long-term rentals (weekly, monthly or annual) have a deposit by agreement.',
      'The 48-hour cancellation policy applies to bookings on the site; specific lease terms will be confirmed when you contact the team.',
    ], links: [{ text: 'Cancellation policy', href: '/en/chinh-sach-huy-phong' }] },
    { id: 'location', h2: 'Location in District 7', paragraphs: [
      'Address: 19/8A Tan Thuan Tay, Tan Thuan, District 7, Ho Chi Minh City. The house is in Tan Thuan, not inside Phu My Hung.',
      enDistances, enParking,
      'Pets are welcome. Hẻm Nhà can help foreign guests with temporary residence registration.',
    ], mapLink: MAPS },
    { id: 'short-stay', h2: 'Only need a few nights?', paragraphs: [
      'Hẻm Nhà Moments has four homestay rooms for short stays. Each room sleeps two adults.',
    ], links: [{ text: 'Short stay in District 7', href: '/en/short-stay-district-7' }, { text: 'All four homestay rooms', href: '/en/homestay' }] },
  ],
  faqTitle: 'FAQ: monthly studio in District 7',
  faqs: [
    { q: 'How much is a monthly studio at Hẻm Nhà Living?', a: 'Hẻm Living publishes rates in .x format: 7.x or 8.x M VND per month depending on the unit, 2.x or 3.x M VND per week. Hẻm DIY 1 is about 4.x M VND/month and Hẻm DIY 2 about 5.x M VND/month on annual leases. Contact +84 912 254 657 for the confirmed total.' },
    { q: 'Can I rent by the week?', a: 'Yes. Hẻm Living studios can be rented by the week, month or year. Hẻm DIY is annual only, with monthly payments.' },
    { q: 'Are the studios furnished?', a: 'Hẻm Living is fully furnished. Hẻm DIY is an empty shell for you to style yourself.' },
    { q: 'Is wifi included?', a: 'Yes. Electricity and water are billed at actual usage at government tariffs.' },
    { q: 'What is the deposit?', a: 'Long-term rentals (weekly, monthly or annual) have a deposit by agreement. Contact 0912254657 to confirm terms.' },
    { q: 'Where is the house?', a: '19/8A Tan Thuan Tay, Tan Thuan, District 7, Ho Chi Minh City. It is in Tan Thuan, not inside Phu My Hung.' },
    { q: 'Can Hẻm Nhà help with residence registration?', a: 'Yes. Hẻm Nhà can help foreign guests with temporary residence registration (tạm trú).' },
    { q: 'When does the house open?', a: 'Hẻm Nhà Living plans to open in December 2026. Contact +84 912 254 657 or hii.hemnhaliving@gmail.com.' },
  ],
  cta: { title: 'Get studio rates and availability', text: 'Message Zalo/WhatsApp +84 912 254 657, email hii.hemnhaliving@gmail.com, or use the booking form. Confirmation takes 2–4 hours and nothing is charged until confirmed. The house opens in December 2026.', book: 'Check availability and reserve', phone: 'Call / Zalo +84 912 254 657', email: 'hii.hemnhaliving@gmail.com' },
  labels: { home: 'Home', mapText: 'Open in Google Maps', related: 'More' },
};

export const LANDINGS: Record<LandingId, LandingContent> = {
  'homestay-quan-7': homestayVi,
  'studio-thue-thang-quan-7': studioVi,
  'short-stay-district-7': shortStayEn,
  'homestay-gan-phu-my-hung': phuMyHungVi,
  'cho-o-gan-secc': seccVi,
  'monthly-studio-district-7': monthlyStudioEn,
};
export const landingFaqs = (id: LandingId) => LANDINGS[id].faqs;
