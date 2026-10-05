import { Room } from '../types';

export const ROOMS: Room[] = [
  {
    id: 'som-mai',
    code: 'ROOM 101',
    name: 'Sớm Mai',
    subtitle: 'The Rise & Shine',
    momentKey: 'dawn',
    momentTime: '06:00 — 10:30',
    concept: 'Trong trẻo · Ánh sáng dịu · Yên tĩnh đón ngày mới',
    story: 'Căn phòng đánh thức bạn bằng ánh sáng tự nhiên ngập tràn cùng những dải màu trắng mờ sương sớm, & màu gỗ sáng mộc mạc. Hãy để xúc giác cảm nhận sự mềm mại của tấm rèm voan, khứu giác hít hà hương hạt cà phê sáng từ góc bếp, và thính giác đón lấy những thanh âm rì rào, trong veo của một ngày mới bắt đầu.',
    area: '23 m² + ban công',
    capacity: '2 người lớn',
    bedType: '1 Sofabed linh hoạt',
    floor: 'Tầng 1 — Mặt trước hướng nắng sớm',
    shortTermPrice: 489000,
    amenities: [
      'Tông màu trắng thanh khiết và gỗ sồi ấm áp.',
      'Đèn trần đám mây bồng bềnh độc đáo.',
      'Sofa nỉ êm ái kết hợp thảm cói mộc mạc.',
      'Bếp mini tiện nghi',
      'Màn hình chiếu thư giãn',
    ],
    features: {
      highlight: 'Ban công ngập ánh nắng ban mai & góc sofa đọc sách thư thái',
      lightMood: 'Ánh sáng tự nhiên dịu nhẹ, rèm lụa 2 lớp điều tiết nắng',
      view: 'Nhìn xuống con hẻm rợp bóng mát & giếng trời xanh mát',
    },
    images: [
      {
        url: '/assets/photos/rooms/som-mai/hero.webp',
        caption: 'Không gian sofa thư giãn với đèn mây bồng bềnh và ánh nắng sớm',
      },
      {
        url: '/assets/photos/rooms/som-mai/living-kitchen.webp',
        caption: 'Không gian tích hợp sofa êm ái và bếp mini tiện nghi',
      },
      {
        url: '/assets/photos/rooms/som-mai/room-overview.webp',
        caption: 'Toàn cảnh căn phòng Sớm Mai nhìn từ cửa vào với sàn caro và kệ vòm',
      },
      {
        url: '/assets/photos/rooms/som-mai/console-shelf.webp',
        caption: 'Kệ console đục lỗ tròn nghệ thuật, máy quay đĩa và gương uốn lượn',
      },
      {
        url: '/assets/photos/rooms/som-mai/music-corner.webp',
        caption: 'Góc thưởng thức âm nhạc và thư giãn liền kề khu bếp',
      },
      {
        url: '/assets/photos/rooms/som-mai/kitchenette.webp',
        caption: 'Khu bếp mini mặt đá terrazzo đầy đủ máy pha cà phê và bếp nấu',
      },
      {
        url: '/assets/photos/rooms/som-mai/bathroom.webp',
        caption: 'Phòng tắm gạch gốm tông be ấm áp, vách kính lượn sóng và sen tắm đứng',
      },
    ],
    isAvailable: true,
    unavailableDates: ['2026-09-20', '2026-09-21', '2026-09-28'],
  },
  {
    id: 'trua-he',
    code: 'ROOM 102',
    name: 'Mơ Trưa',
    subtitle: 'The Midday Dream',
    momentKey: 'noon',
    momentTime: '11:00 — 15:30',
    concept: 'Ấm áp · Năng lượng nhiệt đới · Bừng sáng tự nhiên',
    story: 'Trốn khỏi cái chói chang bên ngoài, căn phòng ôm trọn bạn bằng tông màu cam đất ấm áp, dịu mắt. Dưới ánh sáng dìu dịu, chiếc đèn trần bằng lông vũ bồng bềnh như một giấc mơ. Thả mình xuống chiếc sofa nỉ mát & mềm, hít thở mùi hương trầm mộc mạc, bạn sẽ nghe thấy sự tĩnh lặng tuyệt đối, tách biệt hoàn toàn khỏi thế giới ồn ã.',
    area: '23 m² + ban công',
    capacity: '2 người lớn',
    bedType: '1 Sofabed linh hoạt',
    floor: 'Tầng 1 — Tầm nhìn thoáng đãng',
    shortTermPrice: 599000,
    amenities: [
      'Tông cam đất trầm dịu mắt, xoa dịu cái nắng chói chang.',
      'Đèn lông vũ bềnh bồng, mộng mơ.',
      'Sofabed êm ái như góc ngả lưng mềm mại để vỗ về giấc trưa.',
      'Bếp thanh lịch bo cong tinh tế kết hợp kệ mở mộc mạc',
      'Màn hình chiếu thư giãn',
    ],
    features: {
      highlight: 'Bục giường gỗ phong cách Nhật ngập tràn ánh nắng nhiệt đới',
      lightMood: 'Ánh nắng vàng óng rực rỡ, rèm chống nắng 100% khi cần nghỉ ngơi',
      view: 'Toàn cảnh mái ngói và vòm cây xanh mát xung quanh',
    },
    images: [
      {
        url: '/assets/photos/rooms/trua-he/hero.webp',
        caption: 'Không gian phòng khách Trưa Hè ấm cúng với sofa êm ái, đèn thả bồng bềnh và mảng tường cam đất',
      },
      {
        url: '/assets/photos/rooms/trua-he/kitchenette.webp',
        caption: 'Khu bếp mini tông cam đất vòm cong độc đáo và vách ngăn tròn nghệ thuật',
      },
      {
        url: '/assets/photos/rooms/trua-he/console-corner.webp',
        caption: 'Tủ console chân vòm, gương uốn lượn phong cách và ban công đón nắng',
      },
      {
        url: '/assets/photos/rooms/trua-he/window-arch-view.webp',
        caption: 'Góc nhìn nghệ thuật qua ô cửa sổ tròn hướng ra sofa và ban công rực nắng',
      },
      {
        url: '/assets/photos/rooms/trua-he/sunlit-balcony.webp',
        caption: 'Không gian đón nắng ban trưa tràn ngập ánh sáng và cây xanh tươi mát',
      },
      {
        url: '/assets/photos/rooms/trua-he/bathroom.webp',
        caption: 'Phòng tắm gạch gốm caro cam đất nung, sàn terrazzo và vách kính lượn sóng',
      },
    ],
    isAvailable: true,
    unavailableDates: ['2026-09-18', '2026-09-19', '2026-09-25'],
  },
  {
    id: 'hoang-hon',
    code: 'ROOM 103',
    name: 'Hoàng Hôn',
    subtitle: 'The Golden Sunset',
    momentKey: 'sunset',
    momentTime: '16:00 — 19:30',
    concept: 'Ấm cúng · Golden Hour · Lãng mạn & Tinh tế',
    story: 'Thời khắc chuyển giao diệu kỳ được thể hiện qua khoảng lặng lãng mạn dưới dải tường ombre hoàng hôn. Cuộn mình trên ghế lười êm ái, đắm chìm trong hương hoa ngọt dịu và giai điệu analog chậm rãi — đây là một trạm dừng hoàn hảo để tâm hồn thực sự nghỉ ngơi.',
    area: '25 m²',
    capacity: '2 người lớn',
    bedType: '1 Giường Queen + Sofa daybed',
    floor: 'Tầng 1 — Tầm nhìn ngắm hoàng hôn đắt giá',
    shortTermPrice: 749000,
    amenities: [
      'Tường ombre chuyển màu rực rỡ, lãng mạn lúc chiều tà.',
      'Giường êm ái, độc đáo với sắc pastel ngọt ngào.',
      'Ghế lười (Beanbag) & bench ghế thư giãn bỏ qua muộn phiền.',
      'Bếp mini tiện nghi',
      'Màn hình chiếu giải trí',
      'Board Games gắn kết tại phòng',
    ],
    features: {
      highlight: 'Khung giờ vàng hoàng hôn rót mật vào phòng qua ban công lộng gió',
      lightMood: 'Ánh sáng vàng hổ phách dịu ngọt, bóng đổ ấm áp như thước phim',
      view: 'Tầm nhìn bao quát hoàng hôn thành phố không bị che chắn',
    },
    images: [
      {
        url: '/assets/photos/rooms/hoang-hon/hero.webp',
        caption: 'Không gian phòng ngủ Hoàng Hôn ấm áp với giường nệm êm ái, rèm sáo và đèn trần cam hổ phách',
      },
      {
        url: '/assets/photos/rooms/hoang-hon/sunset-wall.webp',
        caption: 'Mảng tường ombre chuyển sắc hoàng hôn, sofa hoa cúc và kệ sách nghệ thuật',
      },
      {
        url: '/assets/photos/rooms/hoang-hon/room-overview.webp',
        caption: 'Toàn cảnh căn phòng nhìn từ giường ngủ bao quát góc sofa, quầy bếp và cửa vòm',
      },
      {
        url: '/assets/photos/rooms/hoang-hon/bed-lounge.webp',
        caption: 'Góc nghỉ ngơi thư thái bên khung cửa sổ rộng đón ánh hoàng hôn dịu ngọt',
      },
      {
        url: '/assets/photos/rooms/hoang-hon/kitchenette.webp',
        caption: 'Bếp mini màu hồng pastel phối gỗ, máy pha cà phê espresso Smeg và cửa vòm sang trọng',
      },
      {
        url: '/assets/photos/rooms/hoang-hon/kitchen-vinyl.webp',
        caption: 'Khu vực bếp nấu tiện nghi liền kề kệ đĩa than và sàn caro vàng cam độc đáo',
      },
      {
        url: '/assets/photos/rooms/hoang-hon/bathroom-vanity.webp',
        caption: 'Phòng tắm gạch sọc màu hoàng hôn, gương dài bo góc viền đỏ và lavabo cao cấp',
      },
      {
        url: '/assets/photos/rooms/hoang-hon/bathroom-shower.webp',
        caption: 'Khu vực tắm đứng với sen trần, vách kính lượn sóng màu hổ phách',
      },
      {
        url: '/assets/photos/rooms/hoang-hon/window-view.webp',
        caption: 'Khung cửa sổ thoáng đãng đón trọn khoảnh khắc hoàng hôn lãng mạn',
      },
    ],
    isAvailable: true,
    unavailableDates: ['2026-09-15', '2026-09-16'],
  },
  {
    id: 'dem-sao',
    code: 'ROOM 104',
    name: 'Đêm Sao',
    subtitle: 'The Starry Night',
    momentKey: 'night',
    momentTime: '20:00 — 05:00',
    concept: 'Sâu lắng · Riêng tư · Không gian tĩnh lặng về đêm',
    story: 'Một vũ trụ thu nhỏ hiện ra cùng bức tường ngân hà lấp lánh và ánh trăng lơ lửng. Cuộn tròn trên giường nhung xanh thẳm, hít hà hương đêm the mát và đắm chìm vào rạp phim thu nhỏ — trạm dừng hoàn hảo để bạn ngủ một giấc thật sâu và sạc đầy năng lượng',
    area: '25 m²',
    capacity: '2 người lớn',
    bedType: '1 Giường Queen',
    floor: 'Tầng 1 — Yên tĩnh tuyệt đối',
    shortTermPrice: 789000,
    amenities: [
      'Mảng tường & trần nhà lấp lánh vì sao như vũ trụ thu nhỏ.',
      'Màn chiếu rộng & sống động',
      'Đèn hắt trần ngắm sao siêu chill tại phòng',
      'Ghế beanbag cực êm thư giãn đọc sách ban đêm',
      'Bếp ăn tinh gọn và tiện nghi',
    ],
    features: {
      highlight: 'Không gian bóng đêm có kiểm soát đầy mê hoặc và tĩnh lặng tuyệt đối',
      lightMood: 'Hệ đèn dimmable ấm cúng giả lập ánh trăng dịu và vòm sao trời',
      view: 'Ngắm bầu trời đêm và ánh đèn lấp lánh của thành phố từ trên cao',
    },
    images: [
      {
        url: '/assets/photos/rooms/dem-sao/hero.webp',
        caption: 'Toàn cảnh phòng ngủ Đêm Sao với sắc xanh navy huyền bí',
      },
      {
        url: '/assets/photos/rooms/dem-sao/moon-light-bed.webp',
        caption: 'Đèn trăng tròn tỏa sáng dịu êm bên kệ sách đen tuyền',
      },
      {
        url: '/assets/photos/rooms/dem-sao/cozy-lounge.webp',
        caption: 'Góc chill ban đêm với ghế lười và bàn trà nhỏ ấm cúng',
      },
      {
        url: '/assets/photos/rooms/dem-sao/night-window.webp',
        caption: 'Cửa sổ nhìn vào căn phòng lung linh trong bóng đêm',
      },
      {
        url: '/assets/photos/rooms/dem-sao/night-kitchen.webp',
        caption: 'Bếp mini hiện đại với dải đèn led hắt sáng thanh lịch',
      },
      {
        url: '/assets/photos/rooms/dem-sao/blue-bathroom.webp',
        caption: 'Phòng tắm xanh navy sọc Art Deco cá tính',
      },
    ],
    isAvailable: true,
    unavailableDates: ['2026-09-22', '2026-09-23'],
  },
];
