import { useInView } from '../hooks/useScroll';

export default function IntroSection() {
  const [ref, inView] = useInView(0.2);

  return (
    <section
      id="intro"
      className="py-24 md:py-36 px-6 md:px-10 lg:px-16 max-w-[1280px] mx-auto"
      aria-label="Giới thiệu về Hẻm Nhà Living"
    >
      <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: text content */}
        <div>
          {/* Section label */}
          <div
            className={`arch-tag mb-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="text-nagi-gold">凪</span>
            <span>Ngôi nhà</span>
          </div>

          <h2
            className={`font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-tight text-nagi-cardEdge mb-6 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            Một ngôi nhà sống,<br />
            không chỉ để ở.
          </h2>

          <div
            className={`space-y-5 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <p className="font-serif text-lg text-nagi-slate leading-relaxed">
              Hẻm Nhà Living là một không gian sống đa tầng được thiết kế như một cộng đồng nhỏ — nơi mỗi người
              có thể tìm thấy nhịp sống phù hợp với mình, dù chỉ dừng lại một đêm hay định cư cả tháng.
            </p>
            <p className="font-serif text-lg text-nagi-slate leading-relaxed">
              Tầng trệt là <strong className="font-semibold text-nagi-terracotta">Cafe Hẻm</strong> — nơi ngày mới bắt đầu.
              Từ tầng 2 đến tầng 5, bốn căn phòng mang bốn thời điểm trong ngày, mỗi phòng một câu chuyện.
              Trên cùng là <strong className="font-semibold text-nagi-terracotta">Sân Thượng</strong> — nơi tất cả mọi người gặp nhau.
            </p>
            <p className="font-serif text-lg text-nagi-slate leading-relaxed">
              Không phải khách sạn. Không phải hostel. Là nơi để sống, thực sự sống.
            </p>
          </div>

          {/* Stats */}
          <div
            className={`mt-10 grid grid-cols-3 gap-6 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {[
              { num: '4', label: 'Phòng concept' },
              { num: '5', label: 'Tầng không gian' },
              { num: '∞', label: 'Khoảnh khắc' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="font-script text-4xl md:text-5xl text-nagi-gold">{num}</div>
                <div className="font-sans text-xs uppercase tracking-widest text-nagi-muted mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: asymmetric image composition */}
        <div
          className={`relative transition-all duration-900 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
        >
          {/* Large image */}
          <div className="relative rounded-nagi-md overflow-hidden shadow-floating-card">
            <img
              src="/assets/photos/courtyard/atrium-tree.webp"
              alt="Giếng trời ngập ánh sáng tự nhiên với cây xanh treo và cầu thang gỗ"
              className="w-full aspect-[3/4] object-cover"
              loading="lazy"
            />
          </div>

          {/* Offset accent image */}
          <div className="absolute -bottom-8 -left-6 md:-left-10 w-[42%] rounded-nagi overflow-hidden shadow-floating-card border-4 border-nagi-sand">
            <img
              src="/assets/photos/architecture/facade-entrance.webp"
              alt="Lối vào boutique của Hẻm Nhà Living"
              className="w-full aspect-square object-cover"
              loading="lazy"
            />
          </div>

          {/* Decorative badge */}
          <div className="absolute -top-5 -right-3 md:-right-6 bg-nagi-cardEdge text-nagi-parchment rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-floating-card">
            <span className="font-script text-2xl leading-none">by</span>
            <span className="font-sans text-[0.5rem] tracking-[0.2em] uppercase">NK</span>
          </div>
        </div>
      </div>
    </section>
  );
}
