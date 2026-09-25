import { useState, useEffect, useRef } from 'react';

interface NavProps {
  onBookingOpen: () => void;
}

const navLinks = [
  { label: 'Phòng', href: '#rooms' },
  { label: 'Cafe', href: '#cafe' },
  { label: 'Thuê tháng', href: '#monthly' },
  { label: 'Tiện ích', href: '#amenities' },
  { label: 'Liên hệ', href: '#contact' },
];

export default function Navigation({ onBookingOpen }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [darkSection, setDarkSection] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Check if current scroll is in night-themed section
      const nightSection = document.getElementById('dem-sao');
      if (nightSection) {
        const rect = nightSection.getBoundingClientRect();
        setDarkSection(rect.top < 80 && rect.bottom > 80);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  const isDark = darkSection;
  const textColor = isDark ? 'text-nagi-parchment' : 'text-nagi-cardEdge';
  const logoFilter = isDark ? 'brightness(10) invert(1)' : '';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
        scrolled
          ? isDark
            ? 'bg-nagi-darkBg/90 border-b border-nagi-goldLight/20'
            : 'bg-nagi-sand/90 border-b border-nagi-border/15'
          : 'bg-transparent'
      }`}
      style={{ backdropFilter: scrolled ? 'blur(0)' : 'none' }}
      aria-label="Site navigation"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-3 group"
          aria-label="Hẻm Nhà Living — Trang chủ"
        >
          <img
            src="/assets/branding/logo-transparent.png"
            alt="Hẻm Nhà Living logo"
            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:rotate-6"
            style={{ filter: logoFilter }}
          />
          <div className={`hidden sm:block transition-colors duration-500 ${textColor}`}>
            <span className="font-script text-2xl block leading-none">Hẻm Nhà</span>
            <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase opacity-60">Living</span>
          </div>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`font-sans text-sm tracking-wide transition-all duration-200 hover:opacity-60 ${textColor}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onBookingOpen}
            className={`btn-primary text-sm px-5 py-2.5 ${
              isDark
                ? '!bg-nagi-goldLight !text-nagi-darkBg'
                : ''
            }`}
            aria-label="Kiểm tra phòng trống"
          >
            Kiểm tra phòng trống
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 ${textColor}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={menuOpen}
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span
              className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu drawer */}
      <div
        ref={menuRef}
        className={`md:hidden transition-all duration-400 overflow-hidden ${menuOpen ? 'max-h-screen' : 'max-h-0'}`}
        aria-hidden={!menuOpen}
      >
        <div className={`px-6 pb-6 pt-2 space-y-4 border-t ${isDark ? 'bg-nagi-darkBg/95 border-nagi-goldLight/20' : 'bg-nagi-sand/95 border-nagi-border/20'}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`block font-sans text-base py-2 border-b border-current/10 transition-all ${textColor}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { onBookingOpen(); setMenuOpen(false); }}
            className="btn-primary w-full mt-2"
          >
            Kiểm tra phòng trống
          </button>
        </div>
      </div>
    </nav>
  );
}
