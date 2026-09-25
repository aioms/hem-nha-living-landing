import { useInView } from '../hooks/useScroll';

export default function CafeSection() {
  const [ref, inView] = useInView(0.15);

  return (
    <section
      id="cafe"
      className="relative overflow-hidden py-24 md:py-36 bg-[#1a2438]"
      aria-label="Cafe Hẻm tầng trệt"
    >
      {/* Background texture image */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/assets/photos/cafe/cafe-main-lounge.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2438] via-[#1a2438]/80 to-[#1a2438]/20" />
      </div>

      <div ref={ref} className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left text */}
          <div>
            <div
              className={`arch-tag mb-8 !text-[#d8bc8e] !border-[#d8bc8e]/40 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <span>Tầng trệt</span>
              <span className="w-8 h-px bg-current inline-block opacity-50" />
              <span>07:00 – 21:30</span>
            </div>

            <h2
              className={`font-script text-[clamp(3rem,7vw,6rem)] leading-none text-[#d8bc8e] mb-4 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              Cafe Hẻm
            </h2>
            <p
              className={`font-sans text-sm tracking-[0.18em] uppercase text-[#8e97ad] mb-6 transition-all duration-700 delay-150 ${inView ? 'opacity-100' : 'opacity-0'}`}
            >
              Ground Floor Coffee & Co-working
            </p>

            <div
              className={`space-y-5 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <p className="font-serif text-lg text-[#e9ddca] leading-relaxed">
                Cafe Hẻm không cố gắng trở thành một coffee shop. Đây là phòng khách của cả ngôi nhà — nơi ngày
                mới bắt đầu với tách cà phê specialty, nơi deadline được đánh bại trên chiếc bàn gỗ dài, nơi những
                người lạ trở thành bạn.
              </p>
              <p className="font-serif text-lg text-[#c8c4bd] leading-relaxed">
                Thư viện mini, board games, cây xanh và ánh sáng tự nhiên. Không cần là khách lưu trú — cánh cửa
                mở cho tất cả mọi người.
              </p>
            </div>

            {/* Cafe features */}
            <ul
              className={`mt-8 space-y-3 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {[
                'Cà phê specialty & trà thảo mộc theo mùa',
                'Co-working wifi tốc độ cao không giới hạn',
                'Thư viện mini & góc board games cộng đồng',
                'Menu đồ ăn nhẹ ăn sáng & chiều',
                'Không gian sự kiện nhỏ cuối tuần',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 font-sans text-sm text-[#c8c4bd]">
                  <span className="text-[#d8bc8e] text-xs">✦</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#booking"
              className="mt-10 inline-flex items-center gap-2 rounded-nagi-pill px-7 py-3 font-sans text-sm tracking-wide border border-[#d8bc8e]/40 text-[#d8bc8e] hover:bg-[#d8bc8e]/10 transition-all duration-200"
            >
              Khám phá Cafe Hẻm
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Right: editorial photo grid */}
          <div
            className={`relative transition-all duration-900 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            {/* Main large photo */}
            <div className="relative rounded-nagi-md overflow-hidden">
              <img
                src="/assets/photos/cafe/cafe-bar.webp"
                alt="Quầy bar Cafe Hẻm với đèn thả và kệ gỗ thủ công"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>

            {/* Floating accent — library nook */}
            <div className="absolute -bottom-6 left-6 w-[48%] rounded-nagi overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.4)] border-2 border-[#22303f]">
              <img
                src="/assets/photos/cafe/cafe-library-nook.webp"
                alt="Góc đọc sách và thư viện mini trong Cafe Hẻm"
                className="w-full aspect-square object-cover"
                loading="lazy"
              />
            </div>

            {/* Time badge */}
            <div className="absolute -top-4 -right-4 bg-[#d8bc8e] text-[#1a2438] rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg">
              <span className="font-script text-3xl leading-none">07</span>
              <span className="font-sans text-[0.5rem] tracking-[0.2em] uppercase">Mở cửa</span>
            </div>
          </div>
        </div>

        {/* Secondary photo row */}
        <div
          className={`mt-20 grid grid-cols-3 gap-4 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {[
            { src: '/assets/photos/cafe/cafe-communal-table.webp', alt: 'Bàn dài cộng đồng trong Cafe Hẻm' },
            { src: '/assets/photos/cafe/cafe-window-view.webp', alt: 'Góc cửa sổ nhìn ra hẻm yên tĩnh' },
            { src: '/assets/photos/cafe/cafe-main-lounge.webp', alt: 'Không gian lounge chính của Cafe Hẻm' },
          ].map(({ src, alt }) => (
            <div key={src} className="rounded-nagi overflow-hidden">
              <img
                src={src}
                alt={alt}
                className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
