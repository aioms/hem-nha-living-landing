import { useInView } from '../hooks/useScroll';

export default function ContactSection({ onBookingOpen }: { onBookingOpen: () => void }) {
  const [ref, inView] = useInView(0.15);

  return (
    <section
      id="contact"
      className="py-24 md:py-36 px-6 md:px-10 lg:px-16 bg-nagi-cardEdge"
      aria-label="Liên hệ và thông tin Hẻm Nhà Living"
    >
      <div ref={ref} className="max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: brand */}
          <div>
            <div
              className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              {/* Logo large */}
              <div className="mb-8">
                <img
                  src="/assets/branding/logo-transparent.png"
                  alt="Hẻm Nhà Living logo"
                  className="w-24 h-24 object-contain"
                  style={{ filter: 'brightness(10) invert(1)' }}
                />
              </div>

              <h2 className="font-script text-[clamp(3rem,6vw,5rem)] text-nagi-parchment leading-none mb-4">
                Hẻm Nhà<br />Living
              </h2>
              <p className="font-sans text-sm tracking-[0.2em] uppercase text-nagi-muted mb-6">by NK</p>

              <p className="font-serif text-lg text-nagi-clay leading-relaxed max-w-sm">
                Boutique Homestay · Monthly Living<br />
                Cafe · Rooftop · Billiards & Foosball
              </p>

              <div className="mt-10 space-y-4">
                {[
                  {
                    icon: '📍',
                    label: 'Địa chỉ',
                    value: '[Địa chỉ cụ thể — cần cập nhật]',
                    note: 'Placeholder — chờ bổ sung thông tin thực tế',
                  },
                  {
                    icon: '📞',
                    label: 'Điện thoại / Zalo',
                    value: '[Số điện thoại — cần cập nhật]',
                    note: 'Placeholder — chờ bổ sung thông tin thực tế',
                  },
                  {
                    icon: '⏰',
                    label: 'Check-in / Check-out',
                    value: 'Check-in: 14:00 · Check-out: 12:00',
                    note: '',
                  },
                ].map(({ icon, label, value, note }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="text-xl mt-0.5" aria-hidden="true">{icon}</span>
                    <div>
                      <div className="font-sans text-xs uppercase tracking-widest text-nagi-muted mb-0.5">{label}</div>
                      <div className="font-sans text-sm text-nagi-parchment">{value}</div>
                      {note && (
                        <div className="font-sans text-[0.65rem] text-nagi-muted italic mt-0.5">{note}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links — placeholder */}
              <div className="mt-8 flex gap-3">
                {['Facebook', 'Instagram', 'TikTok'].map(platform => (
                  <a
                    key={platform}
                    href="#"
                    className="px-4 py-2 rounded-nagi-pill border border-nagi-muted/30 text-nagi-muted font-sans text-xs hover:border-nagi-goldLight/50 hover:text-nagi-goldLight transition-all duration-200"
                    aria-label={`Hẻm Nhà Living trên ${platform}`}
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: quick booking CTA & map placeholder */}
          <div
            className={`space-y-8 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {/* Quick CTA card */}
            <div className="bg-nagi-parchment rounded-nagi-lg p-8">
              <h3 className="font-serif text-2xl text-nagi-cardEdge mb-2">Sẵn sàng trải nghiệm?</h3>
              <p className="font-serif text-base text-nagi-slate mb-6 leading-relaxed">
                Kiểm tra phòng trống và đặt chỗ chỉ trong 2 phút. Chúng tôi xác nhận trong 2–4 giờ.
              </p>
              <button onClick={onBookingOpen} className="btn-primary w-full py-4 text-base">
                Kiểm tra phòng trống →
              </button>
              <p className="font-sans text-xs text-nagi-muted text-center mt-4">
                Chưa thu phí cho đến khi xác nhận · Hủy miễn phí 48 giờ trước
              </p>
            </div>

            {/* Map placeholder */}
            <div className="rounded-nagi-md overflow-hidden bg-nagi-slate/30 aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-nagi-muted">
                <div className="text-4xl mb-3">🗺️</div>
                <div className="font-sans text-sm">Bản đồ vị trí</div>
                <div className="font-sans text-xs mt-1 opacity-60">[Nhúng Google Maps sau khi có địa chỉ thực tế]</div>
              </div>
            </div>

            {/* FAQ quick */}
            <div className="space-y-3">
              {[
                { q: 'Tôi có thể check-in sớm không?', a: 'Vui lòng liên hệ trước. Chúng tôi hỗ trợ early check-in tùy thuộc phòng còn trống.' },
                { q: 'Có hỗ trợ đưa đón không?', a: 'Hẻm Nhà có thể hỗ trợ kết nối xe đưa đón theo yêu cầu. Liên hệ trực tiếp để biết chi tiết.' },
                { q: 'Thú cưng có được không?', a: 'Hiện tại chưa hỗ trợ thú cưng trong phòng. Cảm ơn bạn đã thông cảm.' },
              ].map(({ q, a }) => (
                <details key={q} className="rounded-nagi border border-nagi-muted/20 overflow-hidden">
                  <summary className="font-sans text-sm text-nagi-parchment px-4 py-3 cursor-pointer hover:bg-nagi-muted/10 transition-colors list-none flex items-center justify-between">
                    {q}
                    <span className="text-nagi-muted">+</span>
                  </summary>
                  <div className="font-sans text-sm text-nagi-clay px-4 py-3 border-t border-nagi-muted/10">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div className="mt-20 pt-8 border-t border-nagi-muted/20 flex flex-wrap gap-4 items-center justify-between text-nagi-muted font-sans text-xs">
          <span>© {new Date().getFullYear()} Hẻm Nhà Living by NK. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-nagi-parchment transition-colors">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-nagi-parchment transition-colors">Chính sách hủy phòng</a>
            <a href="#" className="hover:text-nagi-parchment transition-colors">Bảo mật thông tin</a>
          </div>
        </div>
      </div>
    </section>
  );
}
