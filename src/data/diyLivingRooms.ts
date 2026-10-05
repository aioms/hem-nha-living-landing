import { Room } from '../types';

export const DIY_LIVING_ROOMS: Room[] = [
  // ==========================================
  // PHÂN LOẠI 1: HẺM DIY (2 PHÒNG TẦNG TRỆT)
  // Thuê dài hạn theo năm · Tự do DIY không gian
  // ==========================================
  {
    id: 'hem-diy-1',
    code: 'DIY 01',
    name: 'Hẻm DIY 1',
    subtitle: 'The Ground Creative Patio',
    category: 'diy',
    leaseTerm: 'Thuê dài hạn theo năm (Yearly Lease)',
    concept: 'Sân vườn riêng · Cửa sổ gập mở đón gió · Tự do DIY không gian',
    story: 'Nằm tại tầng trệt yên tĩnh với khoảng sân vườn và giàn pergola gỗ mộc riêng biệt. Điểm nhấn là hệ cửa sổ gập lớn mở trọn ra không gian ngoài trời riêng biệt, sofa daybed thư giãn và khu bếp hiện đại. Đây là không gian nguyên bản lý tưởng cho những người yêu sáng tạo.',
    area: '22 m² (+ 8 m² sân hiên riêng)',
    capacity: '1–2 người lớn',
    bedType: '1 Sofabed linh hoạt',
    floor: 'Tầng trệt — Lối đi sân vườn riêng biệt',
    monthlyPrice: 4500000,
    amenities: [
      'Sân hiên nhà với giàn lam pergola thoáng mát',
      'Hệ cửa sổ gập lớn đón gió trời & ánh sáng tự nhiên',
      'Sofabed linh hoạt tiện nghi',
      'Kệ bếp tiêu chuẩn & tủ lạnh Inverter',
      'Tự do sắp xếp & trang trí lại nội thất theo cách riêng',
      'Miễn phí wifi tốc độ cao',
      'Khu giặt sấy thanh toán tự động của toà nhà',
      'Ưu đãi khi sử dụng Quando Quando cafe',
      'Tự do sử dụng Rooftop',
    ],
    features: {
      highlight: 'Khoảng sân hiên riêng biệt và cửa sổ gập mở phong cách Nhật Bản',
      atmosphere: 'Yên bình, rợp bóng cây xanh, đậm chất studio nghệ thuật',
      suitableFor: 'Freelancer, Designer, Writer hoặc khách thuê dài hạn yêu thích DIY',
    },
    images: [
      {
        url: '/assets/photos/diy-living/hem-diy-1/page_016.jpeg',
        caption: 'Sân hiên riêng với cửa sổ gập mở và giàn lam gỗ pergola rợp bóng mát',
      },
      {
        url: '/assets/photos/diy-living/hem-diy-1/page_013.jpeg',
        caption: 'Không gian phòng khách và bếp mini thoáng đãng nhìn từ lối vào',
      },
      {
        url: '/assets/photos/diy-living/hem-diy-1/page_012.jpeg',
        caption: 'Bậu cửa sổ ngập tràn ánh nắng và sofa daybed thư giãn',
      },
      {
        url: '/assets/photos/diy-living/hem-diy-1/page_014.jpeg',
        caption: 'Khu bếp gỗ tự nhiên mặt đá cẩm thạch và cửa vòm độc đáo',
      },
      {
        url: '/assets/photos/diy-living/hem-diy-1/page_015.jpeg',
        caption: 'Góc bếp ấm cúng với đèn thả giấy lụa phong cách Wabi-sabi',
      },
      {
        url: '/assets/photos/diy-living/hem-diy-1/page_017.jpeg',
        caption: 'Lối hành lang lát gạch caro cổ điển dẫn vào phòng',
      },
      {
        url: '/assets/photos/diy-living/hem-diy-1/page_018.jpeg',
        caption: 'Phòng tắm gạch gốm ấm áp với gương tròn và đèn hắt nghệ thuật',
      },
      {
        url: '/assets/photos/diy-living/hem-diy-1/page_019.jpeg',
        caption: 'Chi tiết phòng tắm sang trọng, tiện nghi và sạch sẽ',
      },
    ],
    isAvailable: true,
  },
  {
    id: 'hem-diy-2',
    code: 'DIY 02',
    name: 'Hẻm DIY 2',
    subtitle: 'The Botanical Green Nook',
    category: 'diy',
    leaseTerm: 'Thuê dài hạn theo năm (Yearly Lease)',
    concept: 'Sắc xanh Olive · Bậu cửa sổ ngắm vườn cây · Không gian cá nhân hóa',
    story: 'Căn phòng mang sắc xanh rêu olive thanh lịch kết hợp cùng nội thất gỗ trầm ấm. Sở hữu bậu cửa sổ rộng kịch sàn nhìn ra mảng xanh nhiệt đới — nơi bạn có thể ngồi đọc sách, nhâm nhi tách trà hay đặt bàn làm việc hướng ra thiên nhiên.',
    area: '22 m² (+ 8 m² sân hiên riêng)',
    capacity: '2 người lớn',
    bedType: '1 Giường Queen',
    floor: 'Tầng trệt — Không gian vườn cây & bậu cửa ngắm nắng',
    monthlyPrice: 5000000,
    amenities: [
      'Bậu cửa sổ bay window rộng rãi tích hợp góc ngồi ngắm vườn cây',
      'Giường đôi tone gỗ với đệm lò xo êm ái',
      'Được quyền đóng kệ, treo đồ và tự trang trí không gian sống',
      'Miễn phí wifi tốc độ cao',
      'Khu giặt sấy thanh toán tự động của toà nhà',
      'Ưu đãi khi sử dụng Quando Quando cafe',
      'Tự do sử dụng Rooftop',
    ],
    features: {
      highlight: 'Bậu cửa sổ nhìn ra vườn cây xanh mát & tone màu xanh olive quý phái',
      atmosphere: 'Thư thái, gần gũi với thiên nhiên, truyền cảm hứng sống chậm',
      suitableFor: 'Khách định cư dài hạn từ 1 năm trở lên, chuyên gia làm việc từ xa',
    },
    images: [
      {
        url: '/assets/photos/diy-living/hem-diy-2/page_020.jpeg',
        caption: 'Phòng ngủ ấm cúng bên bậu cửa sổ ngập tràn cây xanh',
      },
      {
        url: '/assets/photos/diy-living/hem-diy-2/page_021.jpeg',
        caption: 'Toàn cảnh căn phòng từ góc nhìn tổng quan',
      },
      {
        url: '/assets/photos/diy-living/hem-diy-2/page_022.jpeg',
        caption: 'Khu bếp gỗ trầm và sàn caro dẫn vào phòng ngủ',
      },
      {
        url: '/assets/photos/diy-living/hem-diy-2/page_023.jpeg',
        caption: 'Bậu cửa sổ đọc sách thư giãn nhìn ra giếng trời rợp bóng cây',
      },
      {
        url: '/assets/photos/diy-living/hem-diy-2/page_024.jpeg',
        caption: 'Ánh sáng tự nhiên dịu nhẹ len lỏi qua rèm sáo gỗ',
      },
      {
        url: '/assets/photos/diy-living/hem-diy-2/page_025.jpeg',
        caption: 'Khu bếp đầy đủ tiện nghi với kệ gia vị và tủ lạnh Inverter',
      },
      {
        url: '/assets/photos/diy-living/hem-diy-2/page_026.jpeg',
        caption: 'Phòng tắm xanh olive thời thượng với gương viền tròn terracotta',
      },
      {
        url: '/assets/photos/diy-living/hem-diy-2/page_027.jpeg',
        caption: 'Khu tắm đứng có vách kính khung gỗ uốn vòm tinh tế',
      },
    ],
    isAvailable: true,
  },

  // ==========================================
  // PHÂN LOẠI 2: HẺM LIVING (4 PHÒNG TẦNG 2-4)
  // Linh hoạt theo tuần / tháng / năm · Full tiện nghi
  // ==========================================
  {
    id: 'hem-minimal',
    code: 'LIVING 201',
    name: 'Hẻm Minimal',
    subtitle: 'Pure Minimalist Living',
    category: 'living',
    leaseTerm: 'Linh hoạt: Theo Tuần · Tháng · Năm',
    concept: 'Tối giản thuần khiết · Giường đệm pallet mộc · Ban công ngập sáng',
    story: 'Mang âm hưởng tối giản, căn studio lược bỏ mọi chi tiết rườm rà để nhường chỗ cho sự tĩnh lặng của tâm trí. Sự kết hợp giữa ánh sáng tự nhiên, chất liệu mộc mạc và màu sắc ấm áp tạo nên một không gian linh hoạt, hoàn hảo để bạn thong dong nán lại từ vài tuần đến cả năm.',
    area: '23 m² + ban công',
    capacity: '1–2 người lớn',
    bedType: '1 Sofabed linh hoạt',
    floor: 'Tầng 2 — Sống tối giản nhưng đầy đủ',
    weeklyPrice: 2490000,
    monthlyPrice: 7500000,
    amenities: [
      'Sofabed linh hoạt với đệm nỉ êm ái trên bục gỗ mộc mạc.',
      'Góc bếp nhỏ (kitchenette) tích hợp gọn gàng, đầy đủ công năng.',
      'Ban công thoáng đãng ngập nắng với ghế tựa thư giãn.',
      'Hệ sào treo quần áo mở và kệ lưu trữ bằng gỗ tối giản.',
      'Điểm nhấn nhẹ nhàng với thảm cói và đèn lồng giấy thả trần.',
    ],
    features: {
      highlight: 'Ban công rộng thoáng và không gian tối giản giải phóng tâm trí',
      atmosphere: 'Thanh tịnh, mộc mạc, nhẹ nhàng đón nắng mai',
      suitableFor: 'Khách du lịch dài ngày, digital nomad thuê linh hoạt theo tuần/tháng',
    },
    images: [
      {
        url: '/assets/photos/diy-living/hem-minimal/page_069.jpeg',
        caption: 'Toàn cảnh không gian sống tối giản với đèn lồng giấy bồng bềnh',
      },
      {
        url: '/assets/photos/diy-living/hem-minimal/page_070.jpeg',
        caption: 'Góc sofa thư giãn liền kề ban công ngập tràn ánh nắng',
      },
      {
        url: '/assets/photos/diy-living/hem-minimal/page_071.jpeg',
        caption: 'Ban công thoáng gió với ghế camping và gạch thông gió nghệ thuật',
      },
      {
        url: '/assets/photos/diy-living/hem-minimal/page_072.jpeg',
        caption: 'Bếp ăn tối giản mặt đá sang trọng và kệ gia vị tiện dụng',
      },
      {
        url: '/assets/photos/diy-living/hem-minimal/page_073.jpeg',
        caption: 'Hệ giá treo quần áo và kệ để đồ mộc mạc',
      },
      {
        url: '/assets/photos/diy-living/hem-minimal/page_074.jpeg',
        caption: 'Phòng tắm gạch mosaic sạch sẽ và tiện nghi',
      },
      {
        url: '/assets/photos/diy-living/hem-minimal/page_075.jpeg',
        caption: 'Khu vực tắm sen cây áp lực mạnh thư giãn',
      },
    ],
    isAvailable: true,
  },
  {
    id: 'hem-japandi',
    code: 'LIVING 202',
    name: 'Hẻm Japandi',
    subtitle: 'Harmonious Japanese & Nordic',
    category: 'living',
    leaseTerm: 'Linh hoạt: Theo Tuần · Tháng · Năm',
    concept: 'Vách nan gỗ Wabi-sabi · Bục giật cấp đa năng · Tinh tế & tiện nghi',
    story: 'Japandi là sự kết hợp hoàn hảo giữa nét trầm mặc của kiến trúc Nhật Bản và sự ấm cúng tiện nghi vùng Scandinavia. Từng mét vuông của studio đều được tính toán cẩn thận để tối ưu công năng mà vẫn giữ trọn vẹn cảm giác thư thái cho người ở.',
    area: '23 m² + ban công',
    capacity: '2 người lớn',
    bedType: '1 Giường Platform gỗ bục giật cấp (1m8 × 2m)',
    floor: 'Tầng 2 — Sống tinh tế & an yên',
    weeklyPrice: 3090000,
    monthlyPrice: 8900000,
    amenities: [
      'Bục giường gỗ giật cấp êm ái, tách biệt hoàn toàn.',
      'Vách lam gỗ tinh tế tích hợp hệ ngăn kéo ẩn bên dưới.',
      'Bếp nấu tiện nghi xanh mát và kệ gỗ ấm cúng.',
      'Sào treo đồ mộc mạc cùng gương soi toàn thân tối giản.',
      'Ban công đón gió với gạch bông gió tạo bóng đổ độc đáo.',
    ],
    features: {
      highlight: 'Bục giường giật cấp đa năng và vách lam gỗ trang trí nghệ thuật',
      atmosphere: 'Ấm áp, chỉn chu, đậm chất nghỉ dưỡng boutique cao cấp',
      suitableFor: 'Cặp đôi, chuyên gia công tác từ 1 tuần đến vài tháng/năm',
    },
    images: [
      {
        url: '/assets/photos/diy-living/hem-japandi/page_076.jpeg',
        caption: 'Vách lam gỗ độc đáo ngăn cách không gian ngủ và ban công ngập nắng',
      },
      {
        url: '/assets/photos/diy-living/hem-japandi/page_077.jpeg',
        caption: 'Bục ngủ giật cấp với bậc thang gỗ và bếp ăn tiện nghi',
      },
      {
        url: '/assets/photos/diy-living/hem-japandi/page_078.jpeg',
        caption: 'Góc nhìn từ ban công hướng vào phòng ngủ ấm cúng',
      },
      {
        url: '/assets/photos/diy-living/hem-japandi/page_079.jpeg',
        caption: 'Bếp ăn ốp gạch gốm xanh ngọc thủ công và kệ gỗ gắn tường',
      },
      {
        url: '/assets/photos/diy-living/hem-japandi/page_080.jpeg',
        caption: 'Góc ban công thư giãn ngắm nhịp sống yên ả con hẻm',
      },
      {
        url: '/assets/photos/diy-living/hem-japandi/page_081.jpeg',
        caption: 'Khu vực treo đồ, kệ hành lý và gương uốn vòm',
      },
      {
        url: '/assets/photos/diy-living/hem-japandi/page_082.jpeg',
        caption: 'Bàn lavabo đá mài và gương tròn led hắt sáng',
      },
      {
        url: '/assets/photos/diy-living/hem-japandi/page_083.jpeg',
        caption: 'Khu tắm đứng hiện đại với sen tắm âm tường',
      },
    ],
    isAvailable: true,
  },
  {
    id: 'mo-japandi',
    code: 'LIVING 203',
    name: 'Mo-Japandi',
    subtitle: 'Modern Japandi Workspace',
    category: 'living',
    leaseTerm: 'Linh hoạt: Theo Tuần · Tháng · Năm',
    concept: 'Bàn làm việc cong công thái học · Mảng gạch kính lấy sáng · Thời thượng',
    story: 'Với tinh thần Modern-Japandi hiện đại mà tĩnh tại, căn phòng là "trạm sạc" lý tưởng cho người làm việc từ xa. Mọi chi tiết đều được tối ưu để bạn vừa bứt phá năng suất, vừa trọn vẹn tái tạo năng lượng.',
    area: '23 m² + ban công',
    capacity: '2 người lớn',
    bedType: '1 Giường King Platform bục gỗ kết hợp nan che riêng tư',
    floor: 'Tầng 2 — Sống hiện đại & linh hoạt',
    weeklyPrice: 2990000,
    monthlyPrice: 8500000,
    amenities: [
      'Bàn gỗ bo cong cạnh mảng tường gạch kính ngập sáng.',
      'Góc giường giật cấp êm ái, tĩnh lặng sau vách ngăn mây đan.',
      'Hệ sào treo đồ mở và ngăn kéo tích hợp thông minh, gọn gàng.',
      'Góc bếp thanh lịch cùng hệ kệ mở hắt sáng ấm cúng.',
    ],
    features: {
      highlight: 'Bàn làm việc cong nghệ thuật và mảng tường gạch kính bắt sáng xuất sắc',
      atmosphere: 'Hiện đại, giàu cảm hứng sáng tạo, ngập tràn ánh sáng tích cực',
      suitableFor: 'Lập trình viên, chuyên gia sáng tạo, remote worker làm việc dài hạn',
    },
    images: [
      {
        url: '/assets/photos/diy-living/mo-japandi/page_086.jpeg',
        caption: 'Góc làm việc ấn tượng với bàn gỗ bo cong và mảng tường gạch kính',
      },
      {
        url: '/assets/photos/diy-living/mo-japandi/page_085.jpeg',
        caption: 'Toàn cảnh không gian làm việc liền kề giá treo đồ tiện ích',
      },
      {
        url: '/assets/photos/diy-living/mo-japandi/page_087.jpeg',
        caption: 'Khu vực giường ngủ platform riêng tư và yên tĩnh',
      },
      {
        url: '/assets/photos/diy-living/mo-japandi/page_088.jpeg',
        caption: 'Lối vào căn phòng với khu bếp mini tiện nghi',
      },
      {
        url: '/assets/photos/diy-living/mo-japandi/page_089.jpeg',
        caption: 'Phòng tắm hiện đại thiết kế tối ưu và cao cấp',
      },
    ],
    isAvailable: true,
  },
  {
    id: 'hem-scandi',
    code: 'LIVING 204',
    name: 'Hẻm Scandi',
    subtitle: 'The Bright Scandinavian Sanctuary',
    category: 'living',
    leaseTerm: 'Linh hoạt: Theo Tuần · Tháng · Năm',
    concept: 'Scandinavian tươi sáng · Giường bục trắng tinh tế · Ban công đón nắng',
    story: 'Với tone Scandinavia thuần khiết, không gian mở ra một bản hòa ca êm dịu của tông màu trắng kem và gỗ sồi ấm áp. Mọi góc nhỏ đều được chăm chút khéo léo để mang lại cảm giác trong lành và thư thái tuyệt đối',
    area: '23 m² + ban công',
    capacity: '2 người lớn',
    bedType: '1 Giường Platform giật cấp trắng thanh lịch (1m6 × 2m)',
    floor: 'Tầng 2 — Sống thư thái nhưng linh hoạt',
    weeklyPrice: 2690000,
    monthlyPrice: 7900000,
    amenities: [
      'Giường bục giật cấp phân chia không gian.',
      'Hộc tủ kéo kết hợp với giường ẩn tiện lợi.',
      'Bàn đa năng liền kề bậc thang, tối ưu diện tích.',
      'Bếp tinh gọn với tủ gỗ sáng màu.',
      'Ban công mở cùng hệ cửa kính lùa đón trọn khí trời và ánh sáng tự nhiên.',
    ],
    features: {
      highlight: 'Giường platform trắng tinh khôi giật cấp mở ra ban công đón gió trời',
      atmosphere: 'Trong trẻo, tươi mới, tràn ngập năng lượng tích cực mỗi sớm mai',
      suitableFor: 'Khách thuê theo tuần hoặc định cư dài hạn theo tháng/năm',
    },
    images: [
      {
        url: '/assets/photos/diy-living/hem-scandi/page_090.jpeg',
        caption: 'Bục giường giật cấp trắng thanh thoát mở rộng ra ban công xanh ngập nắng',
      },
      {
        url: '/assets/photos/diy-living/hem-scandi/page_091.jpeg',
        caption: 'Khu bếp gỗ sáng màu với cửa vòm mộc mạc và kệ treo đèn led',
      },
      {
        url: '/assets/photos/diy-living/hem-scandi/page_092.jpeg',
        caption: 'Góc phòng ngủ êm đềm với tranh treo tường nghệ thuật',
      },
      {
        url: '/assets/photos/diy-living/hem-scandi/page_093.jpeg',
        caption: 'Ban công riêng đón trọn gió mát lành của thành phố',
      },
      {
        url: '/assets/photos/diy-living/hem-scandi/page_094.jpeg',
        caption: 'Bàn lavabo phòng tắm sạch sẽ với gương viền tròn',
      },
      {
        url: '/assets/photos/diy-living/hem-scandi/page_095.jpeg',
        caption: 'Phòng tắm trang bị sen cây tắm đứng tăng áp',
      },
    ],
    isAvailable: true,
  },
];
