import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export type NavTab = 'home' | 'moments' | 'diy-living' | 'policies';

interface NavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab, sectionId?: string) => void;
  onBookingOpen: () => void;
}

export default function Navigation({ currentTab, onTabChange, onBookingOpen }: NavProps) {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [darkSection, setDarkSection] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Check if current scroll is in dark-themed section
      const nightElements = [
        document.getElementById('dem-sao'),
        document.getElementById('cafe'),
        document.getElementById('contact'),
      ];

      let isOverDark = false;
      for (const el of nightElements) {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 70 && rect.bottom >= 70) {
            isOverDark = true;
            break;
          }
        }
      }
      setDarkSection(isOverDark);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentTab]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  // When on home tab and not scrolled yet, the hero is full bleed image with dark overlay
  const isHeaderDark = (currentTab === 'home' && !scrolled) || darkSection;
  const logoSrc = isHeaderDark ? '/logohemnha/logohem-9.png' : '/logohemnha/logohem-13.png';
  const textColor = isHeaderDark ? 'text-[#faf6ee]' : 'text-nagi-cardEdge';

  const handleNavClick = (tab: NavTab, sectionId?: string) => {
    setMenuOpen(false);
    onTabChange(tab, sectionId);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
        scrolled
          ? darkSection
            ? 'bg-nagi-darkBg/95 border-b border-nagi-goldLight/20 shadow-md backdrop-blur-sm'
            : 'bg-nagi-sand/95 border-b border-nagi-border/15 shadow-sm backdrop-blur-sm'
          : currentTab === 'home'
            ? 'bg-gradient-to-b from-black/50 via-black/20 to-transparent'
            : 'bg-nagi-sand/80 backdrop-blur-sm border-b border-nagi-border/10'
      }`}
      aria-label="Site navigation"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          aria-label="Hẻm Nhà Living — Trang chủ"
        >
          <img
            src={logoSrc}
            alt="Hẻm Nhà Living logo"
            className="h-11 w-11 md:h-13 md:w-13 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
          />
          <div className={`transition-colors duration-300 ${textColor}`}>
            <span className={`font-sans font-normal text-xl md:text-2xl block leading-tight tracking-tight ${currentTab === 'home' && !scrolled ? 'drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]' : ''}`}>
              Hẻm Nhà
            </span>
            <span
              className={`font-sans text-[0.62rem] md:text-[0.68rem] tracking-[0.25em] uppercase block font-medium ${
                isHeaderDark ? 'text-nagi-goldLight' : 'text-nagi-terracotta'
              } ${currentTab === 'home' && !scrolled ? 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]' : ''}`}
            >
              Living
            </span>
          </div>
        </button>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1 lg:gap-2" role="list">
          {/* Home */}
          <li>
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-full font-sans text-xs lg:text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                currentTab === 'home'
                  ? isHeaderDark
                    ? !scrolled
                      ? 'bg-white/20 text-[#faf6ee] font-medium backdrop-blur-xs border border-white/10 shadow-xs'
                      : 'bg-white/10 text-nagi-parchment font-medium'
                    : 'bg-black/5 text-nagi-cardEdge font-medium'
                  : isHeaderDark
                    ? 'text-[#faf6ee]/85 hover:text-white hover:bg-white/10'
                    : 'text-nagi-cardEdge/75 hover:text-nagi-cardEdge hover:bg-black/5'
              } ${currentTab === 'home' && !scrolled ? 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]' : ''}`}
            >
              {t.nav.home}
            </button>
          </li>

          {/* Hẻm Nhà Moments Tab */}
          <li>
            <button
              onClick={() => handleNavClick('moments')}
              className={`px-3.5 py-1.5 rounded-full font-sans text-xs lg:text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                currentTab === 'moments'
                  ? isHeaderDark
                    ? 'bg-nagi-goldLight text-nagi-darkBg font-medium shadow-sm'
                    : 'bg-nagi-terracotta text-nagi-sand font-medium shadow-sm'
                  : isHeaderDark
                    ? 'text-[#faf6ee]/90 hover:text-white hover:bg-white/10'
                    : 'text-nagi-cardEdge/85 hover:text-nagi-cardEdge hover:bg-black/5'
              } ${currentTab === 'home' && !scrolled ? 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]' : ''}`}
            >
              {t.nav.moments}
            </button>
          </li>

          {/* Hẻm Nhà DIY & Living Tab */}
          <li>
            <button
              onClick={() => handleNavClick('diy-living')}
              className={`px-3.5 py-1.5 rounded-full font-sans text-xs lg:text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                currentTab === 'diy-living'
                  ? isHeaderDark
                    ? 'bg-nagi-goldLight text-nagi-darkBg font-medium shadow-sm'
                    : 'bg-nagi-cardEdge text-nagi-parchment font-medium shadow-sm'
                  : isHeaderDark
                    ? 'text-[#faf6ee]/90 hover:text-white hover:bg-white/10'
                    : 'text-nagi-cardEdge/85 hover:text-nagi-cardEdge hover:bg-black/5'
              } ${currentTab === 'home' && !scrolled ? 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]' : ''}`}
            >
              {t.nav.diyLiving}
            </button>
          </li>

          {/* Cafe */}
          <li>
            <button
              onClick={() => handleNavClick('home', 'cafe')}
              className={`px-3 py-1.5 rounded-full font-sans text-xs lg:text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                isHeaderDark
                  ? 'text-[#faf6ee]/85 hover:text-white hover:bg-white/10'
                  : 'text-nagi-cardEdge/75 hover:text-nagi-cardEdge hover:bg-black/5'
              } ${currentTab === 'home' && !scrolled ? 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]' : ''}`}
            >
              {t.nav.cafe}
            </button>
          </li>

          {/* Amenities */}
          <li>
            <button
              onClick={() => handleNavClick('home', 'amenities')}
              className={`px-3 py-1.5 rounded-full font-sans text-xs lg:text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                isHeaderDark
                  ? 'text-[#faf6ee]/85 hover:text-white hover:bg-white/10'
                  : 'text-nagi-cardEdge/75 hover:text-nagi-cardEdge hover:bg-black/5'
              } ${currentTab === 'home' && !scrolled ? 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]' : ''}`}
            >
              {t.nav.amenities}
            </button>
          </li>

          {/* Contact */}
          <li>
            <button
              onClick={() => handleNavClick('home', 'contact')}
              className={`px-3 py-1.5 rounded-full font-sans text-xs lg:text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                isHeaderDark
                  ? 'text-[#faf6ee]/85 hover:text-white hover:bg-white/10'
                  : 'text-nagi-cardEdge/75 hover:text-nagi-cardEdge hover:bg-black/5'
              } ${currentTab === 'home' && !scrolled ? 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]' : ''}`}
            >
              {t.nav.contact}
            </button>
          </li>
        </ul>

        {/* Right controls: Language Switcher + CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <div
            className={`inline-flex items-center p-0.5 rounded-full border text-xs font-sans transition-all duration-200 ${
              isHeaderDark
                ? 'bg-black/30 border-white/20 text-[#faf6ee]'
                : 'bg-black/5 border-nagi-border/30 text-nagi-cardEdge'
            }`}
            role="group"
            aria-label={t.nav.switchLangAria}
          >
            <button
              onClick={() => setLanguage('vi')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                language === 'vi'
                  ? isHeaderDark
                    ? 'bg-nagi-goldLight text-nagi-darkBg shadow-xs font-semibold'
                    : 'bg-nagi-cardEdge text-nagi-parchment shadow-xs font-semibold'
                  : 'opacity-70 hover:opacity-100'
              }`}
              aria-pressed={language === 'vi'}
              title="Tiếng Việt"
            >
              VI
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                language === 'en'
                  ? isHeaderDark
                    ? 'bg-nagi-goldLight text-nagi-darkBg shadow-xs font-semibold'
                    : 'bg-nagi-cardEdge text-nagi-parchment shadow-xs font-semibold'
                  : 'opacity-70 hover:opacity-100'
              }`}
              aria-pressed={language === 'en'}
              title="English"
            >
              EN
            </button>
          </div>

          {/* CTA Button */}
          <button
            onClick={onBookingOpen}
            className={`btn-primary text-xs lg:text-sm px-4 lg:px-5 py-2.5 transition-all duration-200 ${
              isHeaderDark
                ? '!bg-nagi-goldLight !text-nagi-darkBg hover:!bg-white shadow-md font-medium'
                : ''
            }`}
            aria-label={t.nav.checkAvailability}
          >
            {t.nav.checkAvailability}
          </button>
        </div>

        {/* Mobile controls (Language + Hamburger) */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Language Switcher */}
          <div
            className={`inline-flex items-center p-0.5 rounded-full border text-[11px] font-sans transition-all duration-200 ${
              isHeaderDark
                ? 'bg-black/30 border-white/20 text-[#faf6ee]'
                : 'bg-black/5 border-nagi-border/30 text-nagi-cardEdge'
            }`}
            role="group"
            aria-label={t.nav.switchLangAria}
          >
            <button
              onClick={() => setLanguage('vi')}
              className={`px-2 py-0.5 rounded-full font-medium transition-all duration-200 ${
                language === 'vi'
                  ? isHeaderDark
                    ? 'bg-nagi-goldLight text-nagi-darkBg font-semibold'
                    : 'bg-nagi-cardEdge text-nagi-parchment font-semibold'
                  : 'opacity-70'
              }`}
            >
              VI
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full font-medium transition-all duration-200 ${
                language === 'en'
                  ? isHeaderDark
                    ? 'bg-nagi-goldLight text-nagi-darkBg font-semibold'
                    : 'bg-nagi-cardEdge text-nagi-parchment font-semibold'
                  : 'opacity-70'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`p-2 ${textColor} transition-colors duration-200`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <div
        ref={menuRef}
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96' : 'max-h-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`px-6 pb-6 pt-3 space-y-3 border-t ${
            isHeaderDark
              ? 'bg-nagi-darkBg/98 border-nagi-goldLight/20 shadow-2xl backdrop-blur-md'
              : 'bg-nagi-sand/98 border-nagi-border/20 shadow-lg backdrop-blur-md'
          }`}
        >
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left font-sans text-base py-2 border-b border-current/10 flex items-center justify-between ${
              currentTab === 'home'
                ? isHeaderDark ? 'font-semibold text-nagi-goldLight' : 'font-semibold text-nagi-terracotta'
                : textColor
            }`}
          >
            <span>{t.nav.home}</span>
          </button>

          <button
            onClick={() => handleNavClick('moments')}
            className={`w-full text-left font-sans text-base py-2 border-b border-current/10 flex items-center justify-between ${
              currentTab === 'moments'
                ? isHeaderDark ? 'font-semibold text-nagi-goldLight' : 'font-semibold text-nagi-terracotta'
                : textColor
            }`}
          >
            <span>{t.nav.moments}</span>
          </button>

          <button
            onClick={() => handleNavClick('diy-living')}
            className={`w-full text-left font-sans text-base py-2 border-b border-current/10 flex items-center justify-between ${
              currentTab === 'diy-living'
                ? isHeaderDark ? 'font-semibold text-nagi-goldLight' : 'font-semibold text-nagi-terracotta'
                : textColor
            }`}
          >
            <span>{t.nav.diyLiving}</span>
          </button>

          <button
            onClick={() => handleNavClick('home', 'cafe')}
            className={`w-full text-left font-sans text-base py-2 border-b border-current/10 ${textColor}`}
          >
            {t.nav.cafe}
          </button>

          <button
            onClick={() => handleNavClick('home', 'amenities')}
            className={`w-full text-left font-sans text-base py-2 border-b border-current/10 ${textColor}`}
          >
            {t.nav.amenities}
          </button>

          <button
            onClick={() => handleNavClick('home', 'contact')}
            className={`w-full text-left font-sans text-base py-2 border-b border-current/10 ${textColor}`}
          >
            {t.nav.contact}
          </button>

          <button
            onClick={() => handleNavClick('policies')}
            className={`w-full text-left font-sans text-base py-2 border-b border-current/10 flex items-center justify-between ${
              currentTab === 'policies'
                ? isHeaderDark ? 'font-semibold text-nagi-goldLight' : 'font-semibold text-nagi-terracotta'
                : textColor
            }`}
          >
            <span>{language === 'vi' ? 'Chính sách & Điều khoản' : 'Policies & Terms'}</span>
            <span className="text-xs opacity-60">⚖️</span>
          </button>

          <button
            onClick={() => {
              onBookingOpen();
              setMenuOpen(false);
            }}
            className={`btn-primary w-full mt-3 py-3 ${
              isHeaderDark ? '!bg-nagi-goldLight !text-nagi-darkBg font-medium hover:!bg-white' : ''
            }`}
          >
            {t.nav.checkAvailability}
          </button>
        </div>
      </div>
    </nav>
  );
}
