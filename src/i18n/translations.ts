export type Language = 'vi' | 'en';

export interface Translations {
  nav: {
    home: string;
    moments: string;
    diyLiving: string;
    cafe: string;
    monthly: string;
    amenities: string;
    contact: string;
    checkAvailability: string;
    closeMenu: string;
    openMenu: string;
    switchLangAria: string;
  };
  earlyBird: {
    sproutBadge: string;
    headline: string;
    lead: string;
    leadHighlight: string;
    leadSuffix: string;
    perk1: string;
    perk2: string;
    perk3: string;
    ctaButton: string;
    disclaimer: string;
    modal: {
      badge: string;
      title: string;
      subtitle: string;
      fullNameLabel: string;
      fullNamePlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      stayTypeLabel: string;
      stayTypeHomestay: string;
      stayTypeMonthly: string;
      expectedDateLabel: string;
      expectedDateEarlyDec: string;
      expectedDateMidDec: string;
      expectedDateLateDec: string;
      expectedDateEarly2027: string;
      noteLabel: string;
      notePlaceholder: string;
      submitBtn: string;
      submittingBtn: string;
      successTitle: string;
      successDesc: string;
      successClose: string;
    };
  };
  hero: {
    eyebrow: string;
    city: string;
    tagline1: string;
    taglineMoments: string;
    exploreRoomsBtn: string;
    checkAvailabilityBtn: string;
    scrollDown: string;
    stayOptionsLabel: string;
    homestayBadge: string;
    homestaySubtitle: string;
    monthlyBadge: string;
    monthlySubtitle: string;
    monthlyButtonText: string;
    monthlyFromPrice: string;
    moments: {
      dawn: string;
      noon: string;
      sunset: string;
      night: string;
    };
  };
  intro: {
    label: string;
    title1: string;
    title2: string;
    p1: string;
    p2: string;
    p3Title: string;
    p4: string;
    p5: string;
    p6: string;
    p7: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
  };
  momentsTeaser: {
    label: string;
    title: string;
    desc: string;
    viewAllBtn: string;
    fromLabel: string;
    nightUnit: string;
    detailsBtn: string;
  };
  monthly: {
    label: string;
    period: string;
    title1: string;
    title2: string;
    p1: string;
    pDiy: string;
    pLiving: string;
    fromLabel: string;
    monthUnit: string;
    benefits: {
      utilities: { title: string; desc: string };
      wifi: { title: string; desc: string };
      laundry: { title: string; desc: string };
      cafe: { title: string; desc: string };
      rooftop: { title: string; desc: string };
      cctv: { title: string; desc: string };
    };
    findSpaceBtn: string;
    exploreStudiosBtn: string;
  };
  cafe: {
    label: string;
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    features: string[];
    openBadgeTime: string;
    openBadgeLabel: string;
    ctaBtn: string;
  };
  amenities: {
    label: string;
    title: string;
    desc: string;
    rooftopName: string;
    rooftopTagline: string;
    rooftopDesc: string;
    rooftopHours: string;
  };
  contact: {
    brandSubtitle: string;
    addressLabel: string;
    addressVal: string;
    addressNote: string;
    phoneLabel: string;
    phoneVal: string;
    phoneNote: string;
    checkInOutLabel: string;
    checkInOutVal: string;
    readyTitle: string;
    readyDesc: string;
    checkBtn: string;
    guarantee: string;
    mapLabel: string;
    mapSub: string;
    faqTitle: string;
    faqs: { q: string; a: string }[];
    rightsReserved: string;
    termsLink: string;
    cancelLink: string;
    privacyLink: string;
  };
  stickyBar: {
    brand: string;
    checkBtn: string;
    mobileBtn: string;
  };
  bookingModal: {
    title: string;
    stepDates: string;
    stepRooms: string;
    stepContact: string;
    stepConfirm: string;
    stayTypeLabel: string;
    shortTermTitle: string;
    shortTermSub: string;
    monthlyTitle: string;
    monthlySub: string;
    checkInLabel: string;
    checkOutLabel: string;
    startDateLabel: string;
    monthsLabel: string;
    monthsUnit: string;
    guestsLabel: string;
    guestsCount: string;
    nextStepBtn: string;
    backBtn: string;
    chooseRoomTitle: string;
    availableRoomsCount: (count: number) => string;
    noRoomsFound: string;
    selectRoomBtn: string;
    selectedBadge: string;
    roomPricePerNight: (price: string) => string;
    roomPricePerMonth: (price: string) => string;
    contactInfoTitle: string;
    fullNameLabel: string;
    phoneLabel: string;
    emailLabel: string;
    noteLabel: string;
    notePlaceholder: string;
    summaryTitle: string;
    bookingDetailsTitle: string;
    roomSelectedLabel: string;
    datesLabel: string;
    durationLabel: string;
    estimatedTotalLabel: string;
    confirmSubmitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successMessage: string;
    closeBtn: string;
  };
  roomDetailModal: {
    tabOverview: string;
    tabAmenities: string;
    tabRules: string;
    tabLocation: string;
    areaLabel: string;
    capacityLabel: string;
    bedLabel: string;
    floorLabel: string;
    highlightLabel: string;
    conceptLabel: string;
    bookThisRoomBtn: string;
    perNightLabel: string;
    perMonthLabel: string;
  };
  momentsPage: {
    breadcrumbHome: string;
    breadcrumbCurrent: string;
    label: string;
    title: string;
    subtitle: string;
    filterAll: string;
    floorUnit: string;
    fromLabel: string;
    nightUnit: string;
    bookBtn: string;
    detailBtn: string;
    prevImg: string;
    nextImg: string;
  };
  diyLivingPage: {
    breadcrumbHome: string;
    breadcrumbCurrent: string;
    label: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterDiy: string;
    filterLiving: string;
    diyTag: string;
    livingTag: string;
    monthUnit: string;
    yearUnit: string;
    depositLabel: string;
    bookBtn: string;
    detailBtn: string;
    prevImg: string;
    nextImg: string;
  };
  policiesPage: {
    breadcrumbHome: string;
    breadcrumbCurrent: string;
    badge: string;
    title: string;
    subtitle: string;
    lastUpdated: string;
    filterAll: string;
    filterTerms: string;
    filterCancellation: string;
    filterPrivacy: string;
    cancellation: {
      title: string;
      subtitle: string;
      welcomeIntro: string;
      sec1Title: string;
      sec1CheckInOut: string;
      sec1CheckInOutVal: string;
      sec1Deposit: string;
      sec1DepositVal: string;
      sec2Title: string;
      sec2NoticeCol: string;
      sec2RefundCol: string;
      sec2RescheduleCol: string;
      rows: Array<{
        notice: string;
        refund: string;
        refundBadge: string;
        refundType: 'full' | 'half' | 'none';
        reschedule: string;
      }>;
      sec3Title: string;
      sec3AdvanceLabel: string;
      sec3AdvanceVal: string;
      sec3ValidityLabel: string;
      sec3ValidityVal: string;
      sec3LimitLabel: string;
      sec3LimitVal: string;
      sec4Title: string;
      sec4Desc: string;
      contactTitle: string;
      contactIntro: string;
      hostLabel: string;
      hostVal: string;
      hotlineLabel: string;
      hotlineVal: string;
      emailLabel: string;
      emailVal: string;
      addressLabel: string;
      addressVal: string;
    };
    terms: {
      title: string;
      subtitle: string;
      intro: string;
      rules: Array<{
        key: string;
        icon: string;
        title: string;
        desc: string;
        badge: string;
      }>;
    };
    privacy: {
      title: string;
      subtitle: string;
      intro: string;
      sections: Array<{
        key: string;
        icon: string;
        title: string;
        desc: string;
      }>;
    };
    footerNote: {
      title: string;
      desc: string;
      contactBtn: string;
      bookBtn: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  vi: {
    nav: {
      home: 'Trang chủ',
      moments: 'Hẻm Nhà Moments',
      diyLiving: 'Hẻm Nhà DIY & Living',
      cafe: 'Cafe',
      monthly: 'Thuê tháng',
      amenities: 'Tiện ích',
      contact: 'Liên hệ',
      checkAvailability: 'Kiểm tra phòng trống',
      closeMenu: 'Đóng menu',
      openMenu: 'Mở menu',
      switchLangAria: 'Chuyển đổi ngôn ngữ',
    },
    earlyBird: {
      sproutBadge: 'Giai đoạn ươm mầm • Dự kiến đón khách Tháng 12/2026',
      headline: 'Hẻm Nhà Living đang trong quá trình ươm mầm',
      lead: 'Toà nhà đang được chăm chút hoàn thiện từng góc nhỏ để sẵn sàng mở cửa đón khách vào',
      leadHighlight: 'tháng 12 này',
      leadSuffix: '. Thân mời bạn đăng ký lưu trú đợt Early Bird ngay hôm nay để nhận ưu đãi độc quyền cùng quyền ưu tiên chọn những căn phòng đẹp nhất.',
      perk1: 'Ưu đãi độc quyền giảm đến 20%',
      perk2: 'Ưu tiên chọn phòng & góc ban công ưng ý',
      perk3: 'Tặng voucher đồ uống tại Quando Quando cafe',
      ctaButton: 'Đăng ký nhận ưu đãi Early Bird',
      disclaimer: 'Đăng ký giữ chỗ không mất phí • Nhận tin báo đầu tiên',
      modal: {
        badge: '🌱 ƯƠM MẦM • ĐÓN KHÁCH THÁNG 12/2026',
        title: 'Đăng ký lưu trú Early Bird',
        subtitle: 'Nhận ưu đãi độc quyền giảm tới 20% và quyền ưu tiên chọn phòng đẹp nhất.',
        fullNameLabel: 'Họ và tên *',
        fullNamePlaceholder: 'Nguyễn Văn A',
        phoneLabel: 'Số điện thoại / Zalo *',
        phonePlaceholder: '0901 234 567',
        emailLabel: 'Email nhận thông tin ưu đãi',
        emailPlaceholder: 'ban@example.com',
        stayTypeLabel: 'Nhu cầu lưu trú dự kiến',
        stayTypeHomestay: 'Homestay nghỉ dưỡng (Theo ngày / Tuần)',
        stayTypeMonthly: 'Thuê căn hộ ở lâu dài (Theo tháng / Năm)',
        expectedDateLabel: 'Thời gian dự kiến nhận phòng',
        expectedDateEarlyDec: 'Đầu tháng 12/2026',
        expectedDateMidDec: 'Giữa tháng 12/2026',
        expectedDateLateDec: 'Cuối tháng 12/2026 (Dịp Giáng Sinh / Năm mới)',
        expectedDateEarly2027: 'Đầu năm 2027',
        noteLabel: 'Ghi chú thêm (loại phòng mong muốn, sở thích...)',
        notePlaceholder: 'Ví dụ: Tôi thích phòng có ban công nhiều nắng, hướng nhìn thoáng mát...',
        submitBtn: 'Gửi đăng ký Early Bird',
        submittingBtn: 'Đang gửi đăng ký...',
        successTitle: 'Đăng ký thành công!',
        successDesc: 'Cảm ơn bạn đã quan tâm đến Hẻm Nhà Living. Chúng tôi đã ghi nhận thông tin và sẽ gửi thông báo ưu đãi độc quyền tới bạn sớm nhất trước ngày khai trương.',
        successClose: 'Hoàn tất & Đóng',
      },
    },
    hero: {
      eyebrow: 'Concept Homestay & Living',
      city: 'Tân Thuận, D7, HCMC.',
      tagline1: 'Một góc sống khác trong hẻm Sài Gòn,',
      taglineMoments: 'Một góc sống khác trong hẻm Sài Gòn, theo nhịp sống riêng của bạn.',
      exploreRoomsBtn: 'Khám phá phòng',
      checkAvailabilityBtn: 'Kiểm tra phòng trống',
      scrollDown: 'Cuộn xuống',
      stayOptionsLabel: 'Lựa chọn lưu trú',
      homestayBadge: 'Homestay',
      homestaySubtitle: '• 4 Khoảnh khắc',
      monthlyBadge: 'Thuê tháng',
      monthlySubtitle: '• Dài hạn',
      monthlyButtonText: 'Phòng Dài Hạn · DIY Living',
      monthlyFromPrice: 'Từ 4.5tr',
      moments: {
        dawn: 'Sớm Mai',
        noon: 'Trưa Hè',
        sunset: 'Hoàng Hôn',
        night: 'Đêm Sao',
      },
    },
    intro: {
      label: 'Ngôi nhà',
      title1: 'Một ngôi nhà để sống,',
      title2: 'không chỉ để ở',
      p1: 'Hẻm Nhà Living là hệ sinh thái sống đa tầng — nơi bạn có thể làm chủ nhịp điệu riêng. Mỗi tầng lầu lại mở ra một định dạng sống, bạn có thể ghé chơi đôi ngày ở:',
      p2: '• Tầng 1: Moments Homestay — Cảm nhận mọi giác quan qua từng khoảnh khắc Sớm Mai, Giấc mơ trưa, Hoàng hôn buông, Đêm trời sao.',
      p3Title: 'Hoặc gắn kết dài hạn hơn ở:',
      p4: '• Tầng trệt: Hẻm Nhà DIY — Tự do phác hoạ chốn an cư của mình.',
      p5: '• Tầng 2: Studio tiện nghi — Chốn tĩnh lặng và đầy phong cách.',
      p6: 'Bên cạnh đó là các không gian kết nối cộng đồng với Quando Quando Cafe ở tầng lửng & khu vực giải trí rooftop…',
      p7: 'Không phải khách sạn. Chẳng phải nhà trọ. Đây là nếp nhà để bạn thực sự sống theo cách riêng.',
      stat1Number: '3',
      stat1Label: 'Lựa chọn sống',
      stat2Number: '5',
      stat2Label: 'Tầng không gian',
      stat3Number: '∞',
      stat3Label: 'Khoảnh khắc',
    },
    momentsTeaser: {
      label: 'Bộ sưu tập không gian',
      title: 'Hẻm Nhà Moments',
      desc: 'Bốn căn phòng – Bốn khoảnh khắc độc bản trong ngày ở Hẻm: Sớm Ban Mai – Giấc Mơ Trưa – Hoàng Hôn Buông – Đêm Trời Sao',
      viewAllBtn: 'Xem trọn bộ 4 khoảnh khắc',
      fromLabel: 'Từ',
      nightUnit: '/đêm',
      detailsBtn: 'Chi tiết →',
    },
    monthly: {
      label: 'Bộ sưu tập không gian',
      period: 'Dài hạn theo Tuần/Tháng/Năm',
      title1: 'Sống lâu hơn,',
      title2: 'cảm sâu hơn.',
      p1: "Mỗi người có một định nghĩa riêng về 'nhà'. Hẻm Nhà Living mở ra hai lựa chọn chốn an cư phù hợp sống theo nhịp điệu của chính mình:",
      pDiy: '• Hẻm Nhà DIY (Thuê theo năm): Một không gian nguyên bản, trao bạn đặc quyền tự tay thiết kế và thổi hồn vào chốn đi về mang đậm dấu ấn cá nhân.',
      pLiving: '• Hẻm Nhà Living (Thuê tuần/tháng/năm): Những căn studio tiện nghi và phong cách, nơi mọi thứ đã được chuẩn bị sẵn sàng để bạn dọn vào và tận hưởng ngay.',
      fromLabel: 'Từ',
      monthUnit: '₫ / tháng',
      benefits: {
        utilities: { title: 'Điện & Nước', desc: 'Theo đơn giá nhà nước' },
        wifi: { title: 'Wifi Cáp quang', desc: 'Phủ sóng toàn nhà' },
        laundry: { title: 'Giặt Sấy', desc: 'Thanh toán tự động' },
        cafe: { title: 'Quando Quando Cafe', desc: 'Ưu đãi độc quyền' },
        rooftop: { title: 'Rooftop', desc: 'Tự do thư giãn ngoài trời' },
        cctv: { title: 'CCTV', desc: 'An ninh 24/7' },
      },
      findSpaceBtn: 'Tìm không gian phù hợp',
      exploreStudiosBtn: 'Khám phá 6 phòng DIY & Living',
    },
    cafe: {
      label: 'Tầng lửng & sân nhà',
      title: 'Quando Quando Cafe',
      subtitle: 'Indoor & Outdoor Space Available',
      p1: "Hơn cả một quán cafe, Quando Quando là 'phòng khách' của cả ngôi nhà: nơi nhâm nhi cà phê thơm phức, tập trung làm việc bên bàn gỗ dài, và thả mình vào không gian Listening Bar với đĩa Vinyl mộc mạc.",
      p2: 'Thư viện mini, trạm đĩa than, board games, cây xanh và ánh sáng tự nhiên – Không cần là khách lưu trú — Quando Quando luôn rộng mở chào đón tất cả mọi người.',
      features: [
        'Menu thức uống tinh gọn nhưng mang hương vị độc bản.',
        'Bàn lớn làm việc (co-working) tích hợp wifi tốc độ cao.',
        'Góc cửa sổ ngập sáng cho những người yêu sách.',
        'Khu trò chuyện nghe nhạc và sân ngoài trời tán gẫu.',
        'Không gian sự kiện nhỏ cuối tuần với màn hình chiếu.',
      ],
      openBadgeTime: '07:00',
      openBadgeLabel: 'Mở cửa',
      ctaBtn: 'Khám phá Quando Quando Cafe',
    },
    amenities: {
      label: 'Cuộc sống ở Hẻm Nhà Living',
      title: 'Nhiều hơn một chỗ để ngủ.',
      desc: 'Từ không gian giải trí chung hay chỉ đơn giản là để ngắm sao trên tầng thượng đến khu giặt sấy tiện dụng — mọi góc nhỏ đều được thiết kế để bạn thực sự sống, thực sự thuộc về.',
      rooftopName: 'Rooftop Lounge & Terrace',
      rooftopTagline: 'Thảnh thơi giữa khoảng trời mở',
      rooftopDesc: 'Khoảng trời chung cho những nhịp sống riêng. Trạm dừng để hít thở khí trời ban mai, tĩnh lặng lúc chiều tà và kết nối dưới bầu trời đầy sao.',
      rooftopHours: '06:00 – 23:00 Hàng ngày',
    },
    contact: {
      brandSubtitle: 'Concept Homestay · Longterm Living\nSignature Cafe · Rooftop Entertainment',
      addressLabel: 'Địa chỉ',
      addressVal: '19/8A Tân Thuận Tây, Tân Thuận, Q.7, TP.HCM',
      addressNote: 'Địa chỉ chi tiết sẽ gửi khi xác nhận đặt phòng',
      phoneLabel: 'Điện thoại / Zalo',
      phoneVal: '0912254657',
      phoneNote: 'Hỗ trợ trực tuyến 24/7',
      checkInOutLabel: 'Check-in / Check-out',
      checkInOutVal: 'Check-in: 14:00 · Check-out: 12:00',
      readyTitle: 'Sẵn sàng trải nghiệm?',
      readyDesc: 'Kiểm tra phòng trống và đặt chỗ chỉ trong 2 phút. Chúng tôi xác nhận trong 2–4 giờ.',
      checkBtn: 'Kiểm tra phòng trống →',
      guarantee: 'Chưa thu phí cho đến khi xác nhận · Hủy miễn phí 48 giờ trước',
      mapLabel: 'Bản đồ vị trí',
      mapSub: 'Hẻm yên tĩnh ngay trung tâm Sài Gòn',
      faqTitle: 'Hỏi đáp thường gặp (Q&A)',
      faqs: [
        {
          q: 'Tôi có thể check-in sớm không?',
          a: 'Vui lòng liên hệ trước. Chúng tôi luôn linh hoạt hỗ trợ check-in sớm tùy thuộc vào tình trạng phòng trống thực tế.',
        },
        {
          q: 'Có quy định giờ giới nghiêm ra vào Hẻm Nhà không?',
          a: 'Hoàn toàn không. Với tinh thần "Live with your Own Pace", bạn có thể ra vào tự do 24/7 bằng hệ thống khoá an ninh thông minh và an toàn.',
        },
        {
          q: 'Có được mời bạn bè đến chơi tại phòng hoặc không gian chung không?',
          a: 'Có. Bạn thoải mái đón bạn bè tại Quando Quando Cafe hoặc rooftop giải trí. Vui lòng báo trước với Hẻm Nhà và sẽ có phụ phí nếu bạn bè ở lại qua đêm.',
        },
      ],
      rightsReserved: 'Hẻm Nhà Living by NK. Toàn bộ bản quyền được bảo lưu.',
      termsLink: 'Điều khoản dịch vụ',
      cancelLink: 'Chính sách hủy phòng',
      privacyLink: 'Chính sách bảo mật',
    },
    stickyBar: {
      brand: 'Hẻm Nhà Living',
      checkBtn: 'Kiểm tra phòng trống →',
      mobileBtn: '🏠 Kiểm tra phòng trống',
    },
    bookingModal: {
      title: 'Kiểm tra phòng trống & Đặt chỗ',
      stepDates: 'Thời gian',
      stepRooms: 'Chọn phòng',
      stepContact: 'Thông tin',
      stepConfirm: 'Xác nhận',
      stayTypeLabel: 'Hình thức lưu trú',
      shortTermTitle: 'Ngắn hạn',
      shortTermSub: 'Theo đêm (1–30 ngày)',
      monthlyTitle: 'Thuê tháng',
      monthlySub: 'Dài hạn (≥ 1 tháng)',
      checkInLabel: 'Ngày nhận phòng',
      checkOutLabel: 'Ngày trả phòng',
      startDateLabel: 'Ngày bắt đầu ở',
      monthsLabel: 'Thời gian thuê',
      monthsUnit: 'tháng',
      guestsLabel: 'Số lượng khách',
      guestsCount: 'khách',
      nextStepBtn: 'Tiếp tục chọn phòng',
      backBtn: 'Quay lại',
      chooseRoomTitle: 'Các phòng phù hợp',
      availableRoomsCount: (count: number) => `${count} phòng còn trống`,
      noRoomsFound: 'Hiện chưa có phòng phù hợp với khoảng thời gian này. Vui lòng chọn ngày khác.',
      selectRoomBtn: 'Chọn phòng này',
      selectedBadge: 'Đã chọn ✓',
      roomPricePerNight: (price: string) => `${price}/đêm`,
      roomPricePerMonth: (price: string) => `${price}/tháng`,
      contactInfoTitle: 'Thông tin người đặt',
      fullNameLabel: 'Họ và tên *',
      phoneLabel: 'Số điện thoại / Zalo *',
      emailLabel: 'Email *',
      noteLabel: 'Yêu cầu đặc biệt (tùy chọn)',
      notePlaceholder: 'Ví dụ: Yêu cầu phòng tầng cao, cần thêm nệm phụ...',
      summaryTitle: 'Tóm tắt đặt phòng',
      bookingDetailsTitle: 'Chi tiết đặt phòng',
      roomSelectedLabel: 'Phòng đã chọn:',
      datesLabel: 'Thời gian lưu trú:',
      durationLabel: 'Thời lượng:',
      estimatedTotalLabel: 'Tạm tính ước tính:',
      confirmSubmitBtn: 'Gửi yêu cầu đặt phòng',
      submittingBtn: 'Đang xử lý...',
      successTitle: 'Gửi yêu cầu thành công!',
      successMessage: 'Cảm ơn bạn! Đội ngũ Hẻm Nhà Living sẽ liên hệ xác nhận qua điện thoại hoặc Zalo trong vòng 2–4 giờ.',
      closeBtn: 'Đóng',
    },
    roomDetailModal: {
      tabOverview: 'Tổng quan',
      tabAmenities: 'Tiện nghi',
      tabRules: 'Quy định',
      tabLocation: 'Vị trí',
      areaLabel: 'Diện tích',
      capacityLabel: 'Sức chứa',
      bedLabel: 'Giường ngủ',
      floorLabel: 'Vị trí tầng',
      highlightLabel: 'Điểm nổi bật',
      conceptLabel: 'Ý tưởng không gian',
      bookThisRoomBtn: 'Đặt phòng này ngay',
      perNightLabel: '/đêm',
      perMonthLabel: '/tháng',
    },
    momentsPage: {
      breadcrumbHome: 'Trang chủ',
      breadcrumbCurrent: 'Hẻm Nhà Moments',
      label: 'Bốn khoảnh khắc',
      title: 'Hẻm Nhà Moments',
      subtitle: 'Mỗi khoảnh khắc trong ngày là một định dạng sống, một cảm xúc riêng biệt được gói gọn trong từng căn phòng.',
      filterAll: 'Tất cả 4 khoảnh khắc',
      floorUnit: 'Tầng',
      fromLabel: 'Từ',
      nightUnit: '/đêm',
      bookBtn: 'Kiểm tra & Đặt phòng',
      detailBtn: 'Xem chi tiết',
      prevImg: 'Ảnh trước',
      nextImg: 'Ảnh tiếp theo',
    },
    diyLivingPage: {
      breadcrumbHome: 'Trang chủ',
      breadcrumbCurrent: 'Hẻm Nhà DIY & Living',
      label: 'Căn hộ thuê tháng & năm',
      title: 'Hẻm Nhà DIY & Living',
      subtitle: 'Lựa chọn chốn an cư dài hạn: từ không gian nguyên bản tự tay trang trí (DIY) đến các căn studio tiện nghi đủ đầy (Living).',
      filterAll: 'Tất cả 6 phòng',
      filterDiy: 'Hẻm Nhà DIY (Nguyên bản)',
      filterLiving: 'Hẻm Nhà Living (Đầy đủ nội thất)',
      diyTag: 'DIY Studio',
      livingTag: 'Full Interior',
      monthUnit: '₫ / tháng',
      yearUnit: 'hợp đồng năm',
      depositLabel: 'Cọc',
      bookBtn: 'Đăng ký thuê phòng',
      detailBtn: 'Xem chi tiết',
      prevImg: 'Ảnh trước',
      nextImg: 'Ảnh tiếp theo',
    },
    policiesPage: {
      breadcrumbHome: 'Trang chủ',
      breadcrumbCurrent: 'Chính sách & Điều khoản',
      badge: 'QUY ĐỊNH & PHÁP LÝ · HẺM NHÀ LIVING',
      title: 'Minh Bạch, Tiện Nghi & An Tâm',
      subtitle: 'Tổng hợp các quy định về đặt phòng, điều khoản lưu trú và cam kết bảo vệ dữ liệu cá nhân tại Hẻm Nhà Living.',
      lastUpdated: 'Áp dụng từ tháng 10/2026',
      filterAll: 'Tất cả quy định',
      filterTerms: 'Điều khoản dịch vụ',
      filterCancellation: 'Chính sách hủy phòng',
      filterPrivacy: 'Chính sách bảo mật',
      cancellation: {
        title: 'Chính Sách Hủy Phòng & Hoàn Tiền',
        subtitle: 'Chính Sách Hủy Phòng & Hoàn Tiền — Hẻm Nhà Living',
        welcomeIntro: 'Chào mừng quý khách đến với Hẻm Nhà Living. Chúng tôi luôn nỗ lực mang đến trải nghiệm lưu trú thoải mái và trọn vẹn nhất. Để đảm bảo quyền lợi đôi bên và sự thuận tiện trong quá trình vận hành, kính mong quý khách tham khảo kỹ các quy định về đặt phòng, hủy phòng và thay đổi lịch trình dưới đây.',
        sec1Title: '1. Quy Định Chung',
        sec1CheckInOut: 'Nhận / Trả phòng',
        sec1CheckInOutVal: 'Check-in từ 14:00; Check-out trước 12:00.',
        sec1Deposit: 'Đặt cọc',
        sec1DepositVal: 'Yêu cầu thanh toán 100% hoặc cọc theo thỏa thuận để xác nhận phòng.',
        sec2Title: '2. Quy Định Hủy Phòng & Hoàn Tiền',
        sec2NoticeCol: 'Thời Gian Báo Hủy (Trước Giờ Check-in)',
        sec2RefundCol: 'Mức Hoàn Tiền',
        sec2RescheduleCol: 'Quyền Đổi Ngày Lưu Trú',
        rows: [
          {
            notice: 'Trên 7 ngày',
            refund: 'Hoàn 100%',
            refundBadge: 'Hoàn 100%',
            refundType: 'full',
            reschedule: 'Miễn phí đổi ngày (1 lần)',
          },
          {
            notice: 'Từ 3 đến 7 ngày',
            refund: 'Hoàn 50%',
            refundBadge: 'Hoàn 50%',
            refundType: 'half',
            reschedule: 'Hỗ trợ đổi ngày (tùy thuộc phòng trống)',
          },
          {
            notice: 'Dưới 3 ngày (72 giờ)',
            refund: 'Không hoàn tiền (0%)',
            refundBadge: 'Không hoàn tiền',
            refundType: 'none',
            reschedule: 'Không áp dụng',
          },
          {
            notice: 'Không đến (No-Show) / Hủy trong ngày',
            refund: 'Không hoàn tiền (0%)',
            refundBadge: 'Không hoàn tiền',
            refundType: 'none',
            reschedule: 'Không áp dụng',
          },
        ],
        sec3Title: '3. Quy Định Thay Đổi Lịch Đặt Phòng',
        sec3AdvanceLabel: 'Thời gian thông báo',
        sec3AdvanceVal: 'Yêu cầu đổi ngày cần gửi trước ít nhất 3 ngày so với ngày nhận phòng ban đầu.',
        sec3ValidityLabel: 'Thời hạn áp dụng',
        sec3ValidityVal: 'Ngày lưu trú mới phải nằm trong vòng 30 ngày kể từ ngày đặt ban đầu. Khách hàng vui lòng thanh toán chênh lệch giá phòng (nếu có).',
        sec3LimitLabel: 'Giới hạn áp dụng',
        sec3LimitVal: 'Tối đa 1 lần thay đổi ngày lưu trú cho mỗi đơn đặt phòng.',
        sec4Title: '4. Trường Hợp Đặc Biệt & Bất Khả Kháng',
        sec4Desc: 'Trong các trường hợp bất khả kháng (thiên tai, dịch bệnh, chuyến bay bị hủy có xác nhận từ hãng), Hẻm Nhà Living sẽ linh hoạt hỗ trợ bảo lưu khoản cọc hoặc thay đổi thời gian lưu trú phù hợp.',
        contactTitle: 'Support & Contact / Thông Tin Liên Hệ',
        contactIntro: 'Nếu quý khách cần điều chỉnh hoặc hủy đơn đặt phòng, vui lòng liên hệ kèm Tên và Ngày đặt phòng:',
        hostLabel: 'Host',
        hostVal: 'Hẻm Nhà Host',
        hotlineLabel: 'Hotline / Zalo',
        hotlineVal: '0912254657',
        emailLabel: 'Email',
        emailVal: 'hii.hemnhaliving@gmail.com',
        addressLabel: 'Địa chỉ',
        addressVal: '19/8A Tân Thuận Tây, Tân Thuận, Q.7, TP.HCM',
      },
      terms: {
        title: 'Điều Khoản Dịch Vụ & Nội Quy Nhà Chung',
        subtitle: 'Terms of Service & House Rules',
        intro: 'Để mang đến một không gian nghỉ dưỡng ấm cúng, dễ chịu và văn minh cho tất cả mọi người, Hẻm Nhà Living kính mong quý khách lưu ý một số quy định nhỏ:',
        rules: [
          {
            key: 'quiet',
            icon: '🌙',
            title: 'Không gian yên tĩnh',
            desc: 'Quý khách vui lòng giữ gìn sự yên tĩnh chung, đặc biệt trong khung giờ nghỉ ngơi từ 22:00 đến 07:00 sáng hôm sau.',
            badge: '22:00 – 07:00',
          },
          {
            key: 'property',
            icon: '🛋️',
            title: 'Bảo quản tài sản chung',
            desc: 'Xin vui lòng trân trọng và giữ gìn các trang thiết bị, nội thất tại phòng nghỉ cũng như không gian chung. Mọi hư hỏng do sơ suất sẽ được giải quyết dựa trên mức độ thực tế.',
            badge: 'Trân trọng thiết bị',
          },
          {
            key: 'safety',
            icon: '🚭',
            title: 'An toàn & An ninh',
            desc: 'Vì sự an toàn chung, hút thuốc lá trong phòng bị nghiêm cấm (khu vực ngoài trời có chỗ dành riêng); khách ghé thăm qua đêm vui lòng đăng ký trước với quản lý homestay.',
            badge: 'Cấm hút thuốc trong phòng',
          },
          {
            key: 'liability',
            icon: '🛡️',
            title: 'Trách nhiệm tài sản',
            desc: 'Hẻm Nhà Living không chịu trách nhiệm đối với tài sản có giá trị để quên trong phòng. Quý khách vui lòng tự bảo quản tư trang cá nhân.',
            badge: 'Tự bảo quản tư trang',
          },
        ],
      },
      privacy: {
        title: 'Chính Sách Bảo Mật',
        subtitle: 'Sự Riêng Tư Của Bạn Là Ưu Tiên Hàng Đầu',
        intro: 'Tại Hẻm Nhà Living, chúng tôi trân trọng sự riêng tư của bạn và cam kết bảo vệ thông tin cá nhân của quý khách một cách an toàn nhất.',
        sections: [
          {
            key: 'collect',
            icon: '📋',
            title: 'Thông tin chúng tôi thu thập',
            desc: 'Chúng tôi chỉ thu thập các thông tin cần thiết cho việc lưu trú như họ tên, số điện thoại, email và giấy tờ tùy thân (theo quy định lưu trú địa phương).',
          },
          {
            key: 'usage',
            icon: '🎯',
            title: 'Mục đích sử dụng dữ liệu',
            desc: 'Thông tin của quý khách được sử dụng độc quyền để quản lý đặt phòng, hỗ trợ nhận/trả phòng nhanh chóng, gửi thông báo liên quan đến kỳ nghỉ và tuân thủ các quy định pháp luật về lưu trú.',
          },
          {
            key: 'protection',
            icon: '🔐',
            title: 'Bảo mật thông tin',
            desc: 'Chúng tôi tuyệt đối không chia sẻ, bán hoặc cho thuê dữ liệu cá nhân của bạn cho bên thứ ba. Mọi thông tin đều được lưu trữ an toàn và bảo mật nghiêm ngặt.',
          },
        ],
      },
      footerNote: {
        title: 'Cần giải đáp thêm thắc mắc?',
        desc: 'Đội ngũ quản lý Hẻm Nhà Living luôn sẵn sàng hỗ trợ bạn 24/7 qua Hotline, Zalo hoặc Email.',
        contactBtn: 'Liên hệ Host ngay',
        bookBtn: 'Kiểm tra phòng trống',
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      moments: 'Hẻm Nhà Moments',
      diyLiving: 'Hẻm Nhà DIY & Living',
      cafe: 'Cafe',
      monthly: 'Monthly Living',
      amenities: 'Amenities',
      contact: 'Contact',
      checkAvailability: 'Check Availability',
      closeMenu: 'Close menu',
      openMenu: 'Open menu',
      switchLangAria: 'Switch language',
    },
    earlyBird: {
      sproutBadge: 'Shaping up! • Welcoming Guests this December 2026',
      headline: 'Hẻm Nhà Living is coming to life',
      lead: "We're putting the finishing touches on every cozy corner to welcome you this",
      leadHighlight: 'December',
      leadSuffix: '. Sign up for our Early Bird list today to unlock exclusive perks and first pick of our most charming rooms.',
      perk1: 'Up to 20% off your stay',
      perk2: 'Priority room & balcony selection',
      perk3: 'Complimentary drinks at Quando Quando cafe',
      ctaButton: 'Claim Your Early Bird Perk',
      disclaimer: 'Free priority signup • First to know when doors open',
      modal: {
        badge: '🌱 SPROUTING • OPENING DECEMBER 2026',
        title: 'Early Bird Priority Signup',
        subtitle: 'Enjoy up to 20% off and priority access to our most sought-after rooms.',
        fullNameLabel: 'Full Name *',
        fullNamePlaceholder: 'Alex Morgan',
        phoneLabel: 'Phone / WhatsApp / Zalo *',
        phonePlaceholder: '+84 901 234 567',
        emailLabel: 'Email for exclusive perks',
        emailPlaceholder: 'you@example.com',
        stayTypeLabel: 'Desired Stay Option',
        stayTypeHomestay: 'Homestay Vacation (Daily / Weekly)',
        stayTypeMonthly: 'Long-term Living (Monthly / Yearly)',
        expectedDateLabel: 'Expected Arrival Time',
        expectedDateEarlyDec: 'Early December 2026',
        expectedDateMidDec: 'Mid December 2026',
        expectedDateLateDec: 'Late December 2026 (Holidays / New Year)',
        expectedDateEarly2027: 'Early 2027',
        noteLabel: 'Special preferences (favorite corner, floor, vibe...)',
        notePlaceholder: 'e.g., I love a sunlit balcony with gentle morning breeze...',
        submitBtn: 'Join Early Bird List',
        submittingBtn: 'Submitting...',
        successTitle: 'You are on the list!',
        successDesc: "Thank you for connecting with Hẻm Nhà Living. We've saved your spot and will reach out with early bird rates before our official opening.",
        successClose: 'Done & Close',
      },
    },
    hero: {
      eyebrow: 'Concept Homestay & Living',
      city: 'Tan Thuan, D7, HCMC.',
      tagline1: 'A different rhythm of Saigon living,',
      taglineMoments: 'A different rhythm of Saigon living, tuned to your own pace.',
      exploreRoomsBtn: 'Explore Rooms',
      checkAvailabilityBtn: 'Check Availability',
      scrollDown: 'Scroll down',
      stayOptionsLabel: 'Stay Options',
      homestayBadge: 'Homestay',
      homestaySubtitle: '• 4 Moments',
      monthlyBadge: 'Monthly',
      monthlySubtitle: '• Long-term',
      monthlyButtonText: 'Long-Term Living · DIY Studios',
      monthlyFromPrice: 'From 4.5M',
      moments: {
        dawn: 'Rise & Shine',
        noon: 'Midday Dream',
        sunset: 'Golden Sunset',
        night: 'Starry Night',
      },
    },
    intro: {
      label: 'The House',
      title1: 'A home to truly live in,',
      title2: 'not just to stay',
      p1: 'Hẻm Nhà Living is a multi-story living ecosystem where you can set your own rhythm. Each floor opens into a unique way of being:',
      p2: '• 1st Floor: Moments Homestay — Awaken all senses through four daily moods: Rise & Shine, Midday Dream, Golden Sunset, and Starry Night.',
      p3Title: 'Or settle in longer with us at:',
      p4: '• Ground Floor: Hẻm Nhà DIY — Shape and style your personal sanctuary.',
      p5: '• 2nd Floor: Curated Studios — Serene, thoughtful, and fully furnished.',
      p6: 'Connected by shared community nooks: Quando Quando Cafe on the mezzanine and our open-air rooftop lounge…',
      p7: 'Not a hotel. Not a generic rental. Just an authentic home where you can live life on your own terms.',
      stat1Number: '3',
      stat1Label: 'Living Styles',
      stat2Number: '5',
      stat2Label: 'Unique Floors',
      stat3Number: '∞',
      stat3Label: 'Timeless Moments',
    },
    momentsTeaser: {
      label: 'Curated Spaces',
      title: 'Hẻm Nhà Moments',
      desc: 'Four rooms — Four distinct moods of the Saigon day: Rise & Shine – Midday Dream – Golden Sunset – Starry Night.',
      viewAllBtn: 'Discover All 4 Moments',
      fromLabel: 'From',
      nightUnit: '/night',
      detailsBtn: 'Details →',
    },
    monthly: {
      label: 'Curated Spaces',
      period: 'Weekly, Monthly & Yearly Living',
      title1: 'Stay longer,',
      title2: 'feel deeper.',
      p1: 'Everyone has their own definition of home. Hẻm Nhà Living offers two ways to settle in at your natural pace:',
      pDiy: '• Hẻm Nhà DIY (Yearly lease): An authentic, raw architectural canvas giving you full freedom to curate your own soulful habitat.',
      pLiving: '• Hẻm Nhà Living (Weekly, monthly, or yearly): Tastefully furnished studios with every essential in place, ready for you to move straight in.',
      fromLabel: 'From',
      monthUnit: 'VND / month',
      benefits: {
        utilities: { title: 'Utilities', desc: 'State-regulated rates' },
        wifi: { title: 'Fiber Wi-Fi', desc: 'High-speed throughout' },
        laundry: { title: 'Laundry', desc: 'Smart self-service' },
        cafe: { title: 'Quando Quando Cafe', desc: 'Resident perks' },
        rooftop: { title: 'Rooftop', desc: 'Breezy outdoor lounge' },
        cctv: { title: 'CCTV Security', desc: 'Peace of mind 24/7' },
      },
      findSpaceBtn: 'Find Your Sanctuary',
      exploreStudiosBtn: 'Explore 6 DIY & Living Studios',
    },
    cafe: {
      label: 'Mezzanine & Courtyard',
      title: 'Quando Quando Cafe',
      subtitle: 'Indoor & Outdoor Space Available',
      p1: "More than just a coffee shop, Quando Quando is the shared living room of our house: where you can savor artisanal brews, focus at the communal wooden table, and sink into our analog vinyl Listening Bar.",
      p2: 'A cozy book nook, vinyl records, board games, verdant plants, and soft natural light. You do not need to be an overnight guest — Quando Quando warmly welcomes everyone.',
      features: [
        'Curated beverage menu with distinctive flavor profiles.',
        'Spacious co-working table with fast, dependable Wi-Fi.',
        'Sun-drenched window nooks perfect for reading.',
        'Vinyl listening corner and breezy open courtyard.',
        'Intimate weekend events with film screenings.',
      ],
      openBadgeTime: '07:00',
      openBadgeLabel: 'Opens Daily',
      ctaBtn: 'Discover Quando Quando Cafe',
    },
    amenities: {
      label: 'Life at Hẻm Nhà Living',
      title: 'Far more than just a place to sleep.',
      desc: 'From open-air rooftop stargazing and communal lounge spaces to convenient self-service laundry — every corner is thoughtfully created for you to truly live, relax, and belong.',
      rooftopName: 'Rooftop Lounge & Terrace',
      rooftopTagline: 'Unwind under open skies',
      rooftopDesc: 'A shared sky for individual rhythms. A quiet haven to breathe the dawn breeze, pause at golden sunset, and connect under starry skies.',
      rooftopHours: '06:00 – 23:00 Daily',
    },
    contact: {
      brandSubtitle: 'Concept Homestay · Longterm Living\nSignature Cafe · Rooftop Entertainment',
      addressLabel: 'Address',
      addressVal: '19/8A Tan Thuan Tay, Tan Thuan, Dist 7, HCMC',
      addressNote: 'Detailed alleyway directions sent upon booking confirmation',
      phoneLabel: 'Phone / Zalo / WhatsApp',
      phoneVal: '0912254657',
      phoneNote: '24/7 resident & guest support',
      checkInOutLabel: 'Check-in / Check-out',
      checkInOutVal: 'Check-in: 14:00 · Check-out: 12:00',
      readyTitle: 'Ready for your stay?',
      readyDesc: 'Check availability and reserve in just 2 minutes. We confirm all requests within 2–4 hours.',
      checkBtn: 'Check Availability →',
      guarantee: 'No charges until confirmed · Free cancellation up to 48 hours prior',
      mapLabel: 'Location Map',
      mapSub: 'Quiet alleyway in the heart of Saigon',
      faqTitle: 'Frequently Asked Questions (Q&A)',
      faqs: [
        {
          q: 'Can I request an early check-in?',
          a: 'Please give us a heads-up in advance. We happily accommodate early check-ins whenever the room is available.',
        },
        {
          q: 'Is there a curfew for entering or leaving Hẻm Nhà?',
          a: 'No. Embracing "Live with your Own Pace", you have 24/7 keyless smart lock access with no curfew.',
        },
        {
          q: 'Can I invite friends over to my room or common areas?',
          a: 'Yes. You are welcome to host friends at Quando Quando Cafe or the rooftop. Please notify Hẻm Nhà in advance; an extra fee applies for overnight stays.',
        },
      ],
      rightsReserved: 'Hẻm Nhà Living by NK. All rights reserved.',
      termsLink: 'Terms of Service',
      cancelLink: 'Cancellation Policy',
      privacyLink: 'Privacy Policy',
    },
    stickyBar: {
      brand: 'Hẻm Nhà Living',
      checkBtn: 'Check Availability →',
      mobileBtn: '🏠 Check Availability',
    },
    bookingModal: {
      title: 'Check Availability & Reserve',
      stepDates: 'Dates',
      stepRooms: 'Select Room',
      stepContact: 'Your Info',
      stepConfirm: 'Confirm',
      stayTypeLabel: 'Stay Duration',
      shortTermTitle: 'Short-term',
      shortTermSub: 'By night (1–30 days)',
      monthlyTitle: 'Monthly Living',
      monthlySub: 'Long-term (≥ 1 month)',
      checkInLabel: 'Check-in Date',
      checkOutLabel: 'Check-out Date',
      startDateLabel: 'Move-in Date',
      monthsLabel: 'Lease Length',
      monthsUnit: 'months',
      guestsLabel: 'Number of Guests',
      guestsCount: 'guest(s)',
      nextStepBtn: 'Continue to Select Room',
      backBtn: 'Back',
      chooseRoomTitle: 'Available Rooms',
      availableRoomsCount: (count: number) => `${count} room(s) available`,
      noRoomsFound: 'No rooms available for your selected dates. Please try another timeframe.',
      selectRoomBtn: 'Select this room',
      selectedBadge: 'Selected ✓',
      roomPricePerNight: (price: string) => `${price}/night`,
      roomPricePerMonth: (price: string) => `${price}/mo`,
      contactInfoTitle: 'Guest Details',
      fullNameLabel: 'Full Name *',
      phoneLabel: 'Phone / WhatsApp *',
      emailLabel: 'Email Address *',
      noteLabel: 'Special Requests (optional)',
      notePlaceholder: 'e.g., quiet floor preference, late arrival...',
      summaryTitle: 'Booking Summary',
      bookingDetailsTitle: 'Reservation Overview',
      roomSelectedLabel: 'Selected Room:',
      datesLabel: 'Stay Dates:',
      durationLabel: 'Duration:',
      estimatedTotalLabel: 'Estimated Total:',
      confirmSubmitBtn: 'Submit Reservation Request',
      submittingBtn: 'Submitting request...',
      successTitle: 'Request Sent Successfully!',
      successMessage: 'Thank you! Our Hẻm Nhà Living team will reach out via WhatsApp or phone within 2–4 hours to finalize your stay.',
      closeBtn: 'Done & Close',
    },
    roomDetailModal: {
      tabOverview: 'Overview',
      tabAmenities: 'Amenities',
      tabRules: 'House Rules',
      tabLocation: 'Location',
      areaLabel: 'Room Size',
      capacityLabel: 'Capacity',
      bedLabel: 'Bed Type',
      floorLabel: 'Floor',
      highlightLabel: 'Highlights',
      conceptLabel: 'Design Concept',
      bookThisRoomBtn: 'Book This Room',
      perNightLabel: '/night',
      perMonthLabel: '/mo',
    },
    momentsPage: {
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'Hẻm Nhà Moments',
      label: 'Four Moments',
      title: 'Hẻm Nhà Moments',
      subtitle: 'Each moment of the Saigon day carries its own rhythm and mood, reflected in four uniquely curated rooms.',
      filterAll: 'All 4 Moments',
      floorUnit: 'Floor',
      fromLabel: 'From',
      nightUnit: '/night',
      bookBtn: 'Check & Reserve',
      detailBtn: 'View Details',
      prevImg: 'Previous photo',
      nextImg: 'Next photo',
    },
    diyLivingPage: {
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'Hẻm Nhà DIY & Living',
      label: 'Monthly & Yearly Studios',
      title: 'Hẻm Nhà DIY & Living',
      subtitle: 'Choose your long-term sanctuary: from a raw artistic canvas to style yourself (DIY) to fully appointed boutique studios (Living).',
      filterAll: 'All 6 Studios',
      filterDiy: 'Hẻm Nhà DIY (Raw Canvas)',
      filterLiving: 'Hẻm Nhà Living (Full Interior)',
      diyTag: 'DIY Studio',
      livingTag: 'Full Interior',
      monthUnit: 'VND / month',
      yearUnit: 'annual lease',
      depositLabel: 'Deposit',
      bookBtn: 'Inquire & Apply',
      detailBtn: 'View Details',
      prevImg: 'Previous photo',
      nextImg: 'Next photo',
    },
    policiesPage: {
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'Policies & Terms',
      badge: 'LEGAL & POLICIES · HẺM NHÀ LIVING',
      title: 'Transparency, Comfort & Trust',
      subtitle: 'Complete guidelines on room booking, stay regulations, cancellation terms, and privacy protection at Hẻm Nhà Living.',
      lastUpdated: 'Effective from October 2026',
      filterAll: 'All Policies',
      filterTerms: 'Terms of Service',
      filterCancellation: 'Cancellation Policy',
      filterPrivacy: 'Privacy Policy',
      cancellation: {
        title: 'Room Booking Cancellation & Refund Policy',
        subtitle: 'Cancellation & Refund Policy — Hẻm Nhà Living',
        welcomeIntro: 'Welcome to Hẻm Nhà Living. We aim to make your stay as comfortable and seamless as possible. To ensure smooth management and fair treatment for all guests, please review our booking, cancellation, and rescheduling terms below.',
        sec1Title: '1. General Booking Conditions',
        sec1CheckInOut: 'Check-in / Check-out',
        sec1CheckInOutVal: 'Check-in from 14:00; Check-out by 12:00.',
        sec1Deposit: 'Deposit',
        sec1DepositVal: '100% room charge or agreed deposit required to confirm booking.',
        sec2Title: '2. Cancellation & Refund Terms',
        sec2NoticeCol: 'Notice Period (Prior to Check-in)',
        sec2RefundCol: 'Refund Amount',
        sec2RescheduleCol: 'Rescheduling Option',
        rows: [
          {
            notice: '> 7 Days',
            refund: '100% Refund',
            refundBadge: '100% Refund',
            refundType: 'full',
            reschedule: 'Free date modification (1 time)',
          },
          {
            notice: '3 to 7 Days',
            refund: '50% Refund',
            refundBadge: '50% Refund',
            refundType: 'half',
            reschedule: 'Date change subject to availability',
          },
          {
            notice: '< 3 Days (72 Hours)',
            refund: 'Non-refundable (0%)',
            refundBadge: 'Non-refundable',
            refundType: 'none',
            reschedule: 'Not applicable',
          },
          {
            notice: 'No-Show / Same-day Cancel',
            refund: 'Non-refundable (0%)',
            refundBadge: 'Non-refundable',
            refundType: 'none',
            reschedule: 'Not applicable',
          },
        ],
        sec3Title: '3. Rescheduling Policy',
        sec3AdvanceLabel: 'Advance Notice',
        sec3AdvanceVal: 'Date modifications must be requested at least 3 days prior to your scheduled check-in time.',
        sec3ValidityLabel: 'Validity Period',
        sec3ValidityVal: 'New booking dates must fall within 30 days of the original check-in date. Room rates are subject to seasonal adjustments if applicable.',
        sec3LimitLabel: 'Limit',
        sec3LimitVal: 'A maximum of 1 date modification is permitted per booking.',
        sec4Title: '4. Special Conditions & Force Majeure',
        sec4Desc: 'In cases of flight cancellations, severe weather, or documented emergencies, we evaluate requests individually to offer credit or date changes.',
        contactTitle: 'Support & Contact / Host Assistance',
        contactIntro: 'If you need to adjust or cancel your booking, please contact us with your Booking Name and Date:',
        hostLabel: 'Host',
        hostVal: 'Hẻm Nhà Host',
        hotlineLabel: 'Hotline / Zalo',
        hotlineVal: '0912254657',
        emailLabel: 'Email',
        emailVal: 'hii.hemnhaliving@gmail.com',
        addressLabel: 'Address',
        addressVal: '19/8A Tan Thuan Tay, Tan Thuan Ward, Dist. 7, HCMC',
      },
      terms: {
        title: 'Terms of Service & House Rules',
        subtitle: 'Terms of Service & House Rules',
        intro: 'To ensure a wonderful and peaceful experience for everyone under our roof, we kindly ask our guests to observe a few simple guidelines:',
        rules: [
          {
            key: 'quiet',
            icon: '🌙',
            title: 'Respectful Environment',
            desc: 'Please maintain a quiet and peaceful atmosphere, especially during quiet hours (from 22:00 to 07:00), to ensure comfort for all residents.',
            badge: '22:00 – 07:00',
          },
          {
            key: 'property',
            icon: '🛋️',
            title: 'Property Care',
            desc: 'Guests are kindly requested to treat our rooms, furnishings, and shared spaces with care. Any damage to property will be subject to fair replacement or repair fees.',
            badge: 'Respect Amenities',
          },
          {
            key: 'safety',
            icon: '🚭',
            title: 'Safety & Security',
            desc: 'For the safety of all guests, smoking is strictly prohibited inside the rooms (designated outdoor areas are available), and unregistered outside visitors are not permitted overnight.',
            badge: 'Non-smoking Indoors',
          },
          {
            key: 'liability',
            icon: '🛡️',
            title: 'Liability & Valuables',
            desc: 'Hẻm Nhà Living is not responsible for the loss of unattended valuables left in the rooms; please utilize our secure storage options or keep valuables with you.',
            badge: 'Personal Responsibility',
          },
        ],
      },
      privacy: {
        title: 'Privacy Policy',
        subtitle: 'Your Privacy Matters to Us',
        intro: 'At Hẻm Nhà Living, we deeply respect your privacy and are committed to safeguarding your personal information with the utmost care.',
        sections: [
          {
            key: 'collect',
            icon: '📋',
            title: 'Information We Collect',
            desc: 'We collect essential details required for your stay, such as your full name, contact information (phone number, email), and identification details (as required by local hospitality regulations).',
          },
          {
            key: 'usage',
            icon: '🎯',
            title: 'How We Use Your Data',
            desc: 'Your information is used strictly to manage your bookings, facilitate smooth check-ins/check-outs, communicate important updates regarding your stay, and comply with local legal and safety requirements.',
          },
          {
            key: 'protection',
            icon: '🔐',
            title: 'Data Protection & Security',
            desc: 'We never share, sell, or rent your personal data to third parties. All information is securely stored and handled with strict confidentiality.',
          },
        ],
      },
      footerNote: {
        title: 'Have questions regarding our terms?',
        desc: 'Our dedicated hosting team is available 24/7 via Hotline, Zalo, or Email to provide assistance.',
        contactBtn: 'Contact Host Now',
        bookBtn: 'Check Availability',
      },
    },
  },
};
