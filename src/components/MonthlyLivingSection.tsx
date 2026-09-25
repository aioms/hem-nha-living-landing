import { useInView } from '../hooks/useScroll';

export default function MonthlyLivingSection({ onBookingOpen }: { onBookingOpen: () => void }) {
  const [ref, inView] = useInView(0.15);

  return (
    <section
      id="monthly"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: '#f4e8d2' }}
      aria-label="Monthly Living — Thuê phòng dài hạn theo tháng"
    >
      {/* Decorative large kanji */}
      <div
        className="absolute -right-8 top-1/2 -translate-y-1/2 font-script text-[30vw] leading-none opacity-[0.04] select-none pointer-events-none text-nagi-terracotta"
        aria-hidden="true"
      >
        家
      </div>

      <div ref={ref} className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: editorial image stack */}
          <div
            className={`relative transition-all duration-900 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            {/* Main image */}
            <div className="relative rounded-nagi-md overflow-hidden shadow-floating-card">
              <img
                src="/assets/photos/rooms/trua-he/hero.webp"
                alt="Phòng thuê dài hạn thoáng rộng và hiện đại tại Hẻm Nhà Living"
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#866437]/20 via-transparent to-transparent" />
            </div>

            {/* Offset accent image */}
            <div className="absolute -bottom-6 -right-6 md:-right-10 w-[45%] rounded-nagi overflow-hidden shadow-floating-card border-4 border-[#f4e8d2]">
              <img
                src="/assets/photos/rooms/som-mai/kitchenette.webp"
                alt="Bếp mini đầy đủ tiện nghi cho khách thuê dài hạn"
                className="w-full aspect-square object-cover"
                loading="lazy"
              />
            </div>

            {/* Price badge floating */}
            <div className="absolute -top-5 left-6 bg-nagi-cardEdge text-nagi-parchment rounded-nagi-md px-5 py-3 shadow-floating-card">
              <div className="font-sans text-[0.6rem] tracking-widest uppercase opacity-60 mb-0.5">Từ</div>
              <div className="font-serif text-2xl font-semibold">9.8M</div>
              <div className="font-sans text-[0.6rem] tracking-widest uppercase opacity-60">₫ / tháng</div>
            </div>
          </div>

          {/* Right: content */}
          <div>
            <div
              className={`arch-tag mb-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <span>Monthly Living</span>
              <span className="w-8 h-px bg-current inline-block opacity-40" />
              <span>Từ 1 tháng trở lên</span>
            </div>

            <h2
              className={`font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-tight text-nagi-cardEdge mb-5 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              Sống lâu hơn,<br />cảm sâu hơn.
            </h2>

            <div
              className={`space-y-5 mb-8 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <p className="font-serif text-lg text-nagi-slate leading-relaxed">
                Monthly Living tại Hẻm Nhà không phải trọ theo tháng thông thường. Đây là lối sống — với đầy đủ
                tiện nghi của một căn hộ hiện đại, cộng đồng cư dân ấm áp và những không gian chung đủ để bạn
                không cảm thấy cô đơn.
              </p>
              <p className="font-serif text-lg text-nagi-slate leading-relaxed">
                Giá thuê tháng bao gồm điện nước, wifi, giặt sấy, và quyền sử dụng Cafe Hẻm, Sân Thượng và tất
                cả khu vực sinh hoạt chung — không phát sinh chi phí ẩn.
              </p>
            </div>

            {/* Benefits grid */}
            <div
              className={`grid grid-cols-2 gap-4 mb-8 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {[
                { icon: '🔌', title: 'Điện & Nước', desc: 'Bao gồm trong giá' },
                { icon: '📶', title: 'Wifi Cáp quang', desc: 'Phủ sóng toàn nhà' },
                { icon: '🧺', title: 'Giặt Sấy', desc: 'Miễn phí hàng tuần' },
                { icon: '☕', title: 'Cafe Hẻm', desc: '20% ưu đãi mỗi ngày' },
                { icon: '🏋️', title: 'Rooftop', desc: 'Tự do sử dụng 24/7' },
                { icon: '🎱', title: 'Bida & Bi lắc', desc: 'Miễn phí buổi tối' },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 p-3 rounded-nagi bg-white/50"
                >
                  <span className="text-xl" aria-hidden="true">{icon}</span>
                  <div>
                    <div className="font-sans text-sm font-medium text-nagi-cardEdge">{title}</div>
                    <div className="font-sans text-xs text-nagi-muted">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <button
                onClick={onBookingOpen}
                className="btn-primary text-base px-8 py-3.5"
              >
                Hỏi phòng thuê tháng
              </button>
              <a
                href="#rooms"
                className="btn-ghost text-base px-8 py-3.5"
              >
                Xem tất cả phòng
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
