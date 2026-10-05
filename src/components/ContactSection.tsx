import { useInView } from '../hooks/useScroll';
import { useLanguage } from '../context/LanguageContext';

interface ContactSectionProps {
  onBookingOpen: () => void;
  onNavigateToPolicy?: (policyKey: 'terms' | 'cancellation' | 'privacy') => void;
}

export default function ContactSection({ onBookingOpen, onNavigateToPolicy }: ContactSectionProps) {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView(0.15);

  return (
    <section
      id="contact"
      className="py-24 md:py-36 px-6 md:px-10 lg:px-16 bg-nagi-cardEdge"
      aria-label="Contact & Information"
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
                  src="/logohemnha/logohem-9.png"
                  alt="Hẻm Nhà Living logo"
                  className="w-24 h-24 object-contain"
                />
              </div>

              <h2 className="font-sans font-normal text-[clamp(2.5rem,5vw,4rem)] text-nagi-parchment leading-tight mb-4 tracking-tight">
                Hẻm Nhà<br />
                <span className="text-nagi-goldLight font-light tracking-widest text-[0.6em] uppercase">Living</span>
              </h2>
              <p className="font-sans text-sm tracking-[0.2em] uppercase text-nagi-muted mb-6">by NK</p>

              <p className="text-base md:text-lg text-nagi-clay leading-relaxed max-w-sm whitespace-pre-line">
                {t.contact.brandSubtitle}
              </p>

              <div className="mt-10 space-y-4">
                {[
                  {
                    icon: '📍',
                    label: t.contact.addressLabel,
                    value: t.contact.addressVal,
                    note: '',
                  },
                  {
                    icon: '📞',
                    label: t.contact.phoneLabel,
                    value: t.contact.phoneVal,
                    note: '',
                  },
                  {
                    icon: '⏰',
                    label: t.contact.checkInOutLabel,
                    value: t.contact.checkInOutVal,
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

              {/* Social links */}
              <div className="mt-8 flex gap-3">
                {['Facebook', 'Instagram', 'TikTok'].map(platform => (
                  <a
                    key={platform}
                    href="#"
                    className="px-4 py-2 rounded-nagi-pill border border-nagi-muted/30 text-nagi-muted font-sans text-xs hover:border-nagi-goldLight/50 hover:text-nagi-goldLight transition-all duration-200"
                    aria-label={`Hẻm Nhà Living on ${platform}`}
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
              <h3 className="font-sans font-semibold text-2xl text-nagi-cardEdge mb-2">
                {t.contact.readyTitle}
              </h3>
              <p className="text-base text-nagi-slate mb-6 leading-relaxed">
                {t.contact.readyDesc}
              </p>
              <button onClick={onBookingOpen} className="btn-primary w-full py-4 text-base">
                {t.contact.checkBtn}
              </button>
              <p className="font-sans text-xs text-nagi-muted text-center mt-4">
                {t.contact.guarantee}
              </p>
            </div>

            {/* Map placeholder */}
            <div className="rounded-nagi-md overflow-hidden bg-nagi-slate/30 aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-nagi-muted">
                <div className="text-4xl mb-3">🗺️</div>
                <div className="font-sans text-sm">{t.contact.mapLabel}</div>
                <div className="font-sans text-xs mt-1 opacity-60">
                  {language === 'vi' ? '[Bản đồ vị trí Tân Thuận Tây, Q.7, TP.HCM]' : '[Tan Thuan Tay, District 7, HCMC Map]'}
                </div>
              </div>
            </div>

            {/* FAQ quick */}
            <div>
              <h4 className="font-sans text-xs uppercase tracking-widest text-nagi-goldLight font-semibold mb-3">
                {t.contact.faqTitle}
              </h4>
              <div className="space-y-3">
                {t.contact.faqs.map(({ q, a }) => (
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
        </div>

        {/* Footer strip */}
        <div className="mt-20 pt-8 border-t border-nagi-muted/20 flex flex-wrap gap-4 items-center justify-between text-nagi-muted font-sans text-xs">
          <span>© {new Date().getFullYear()} {t.contact.rightsReserved}</span>
          <div className="flex flex-wrap gap-6">
            <button
              onClick={() => onNavigateToPolicy ? onNavigateToPolicy('terms') : (window.location.hash = 'terms')}
              className="hover:text-nagi-parchment transition-colors cursor-pointer text-xs font-sans text-left"
            >
              {t.contact.termsLink}
            </button>
            <button
              onClick={() => onNavigateToPolicy ? onNavigateToPolicy('cancellation') : (window.location.hash = 'cancellation-policy')}
              className="hover:text-nagi-parchment transition-colors cursor-pointer text-xs font-sans text-left"
            >
              {t.contact.cancelLink}
            </button>
            <button
              onClick={() => onNavigateToPolicy ? onNavigateToPolicy('privacy') : (window.location.hash = 'privacy-policy')}
              className="hover:text-nagi-parchment transition-colors cursor-pointer text-xs font-sans text-left"
            >
              {t.contact.privacyLink}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
