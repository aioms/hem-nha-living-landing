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
                    href: 'https://maps.app.goo.gl/AoTNEA5Tfnqa4qhK8',
                  },
                  {
                    icon: '📞',
                    label: t.contact.phoneLabel,
                    value: t.contact.phoneVal,
                    note: '',
                    href: `tel:${t.contact.phoneVal.replace(/\s+/g, '')}`,
                  },
                  {
                    icon: '⏰',
                    label: t.contact.checkInOutLabel,
                    value: t.contact.checkInOutVal,
                    note: '',
                  },
                ].map(({ icon, label, value, note, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="text-xl mt-0.5" aria-hidden="true">{icon}</span>
                    <div>
                      <div className="font-sans text-xs uppercase tracking-widest text-nagi-muted mb-0.5">{label}</div>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="font-sans text-sm text-nagi-parchment hover:text-nagi-goldLight transition-colors inline-flex items-center gap-1 group"
                        >
                          <span>{value}</span>
                          {href.startsWith('http') && (
                            <span className="text-nagi-goldLight text-xs opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform">↗</span>
                          )}
                        </a>
                      ) : (
                        <div className="font-sans text-sm text-nagi-parchment">{value}</div>
                      )}
                      {note && (
                        <div className="font-sans text-[0.65rem] text-nagi-muted italic mt-0.5">{note}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social & Map links */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61594197129289"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-nagi-pill border border-nagi-muted/30 text-nagi-parchment font-sans text-xs hover:border-nagi-goldLight hover:text-nagi-goldLight hover:bg-nagi-muted/10 transition-all duration-200"
                  aria-label="Hẻm Nhà Living on Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/hemnhaliving/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-nagi-pill border border-nagi-muted/30 text-nagi-parchment font-sans text-xs hover:border-nagi-goldLight hover:text-nagi-goldLight hover:bg-nagi-muted/10 transition-all duration-200"
                  aria-label="Hẻm Nhà Living on Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://maps.app.goo.gl/AoTNEA5Tfnqa4qhK8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-nagi-pill border border-nagi-muted/30 text-nagi-parchment font-sans text-xs hover:border-nagi-goldLight hover:text-nagi-goldLight hover:bg-nagi-muted/10 transition-all duration-200"
                  aria-label="Hẻm Nhà Living on Google Maps"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-4.198 0-8 3.402-8 7.602 0 4.884 7.031 15.421 7.33 15.867.163.243.432.391.72.391s.557-.148.72-.391c.299-.446 7.33-10.983 7.33-15.867 0-4.2-3.802-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                  </svg>
                  <span>Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: quick booking CTA & location map */}
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

            {/* Google Maps embed & link */}
            <div className="rounded-nagi-md overflow-hidden bg-nagi-slate/30 border border-nagi-muted/20">
              <div className="aspect-[4/3] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.820129800777!2d106.72409627638032!3d10.7483367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317525553f6683b7%3A0x332625e72a013cd!2zSOG6u20gTmjDoCBMaXZpbmc!5e0!3m2!1svi!2s!4v1791246161393!5m2!1svi!2s"
                  title={language === 'vi' ? 'Bản đồ Hẻm Nhà Living' : 'Map of Hẻm Nhà Living'}
                  className="block h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <div className="px-4 py-3 bg-nagi-darkBg/95 border-t border-nagi-muted/15 flex items-center justify-between text-xs">
                <span className="text-nagi-muted font-sans flex items-center gap-1.5 truncate">
                  <span>📍</span>
                  <span className="truncate">{language === 'vi' ? 'Hẻm Nhà Living • Q.7, TP.HCM' : 'Hẻm Nhà Living • Dist. 7, HCMC'}</span>
                </span>
                <a
                  href="https://maps.app.goo.gl/AoTNEA5Tfnqa4qhK8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-nagi-goldLight hover:underline font-medium shrink-0 ml-2"
                >
                  <span>{language === 'vi' ? 'Mở trong Google Maps' : 'Open in Google Maps'}</span>
                  <span>↗</span>
                </a>
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
