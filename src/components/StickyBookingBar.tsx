import { useLanguage } from '../context/LanguageContext';

interface StickyBookingBarProps {
  onOpen: () => void;
}

export default function StickyBookingBar({ onOpen }: StickyBookingBarProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* Desktop: compact sticky bar */}
      <div
        className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-[190] items-center gap-4 bg-nagi-cardEdge/95 text-nagi-parchment rounded-nagi-pill px-6 py-3 shadow-[0_10px_28px_-8px_rgba(18,26,42,0.6)]"
        role="complementary"
        aria-label={t.stickyBar.checkBtn}
      >
        <img
          src="/logohemnha/logohem-9.png"
          alt=""
          aria-hidden="true"
          className="w-7 h-7 object-contain"
        />
        <span className="font-sans text-sm opacity-80">{t.stickyBar.brand}</span>
        <span className="w-px h-4 bg-current opacity-20" aria-hidden="true" />
        <button
          onClick={onOpen}
          className="font-sans text-sm font-medium text-nagi-goldLight hover:text-nagi-goldLight/80 transition-colors cursor-pointer"
        >
          {t.stickyBar.checkBtn}
        </button>
      </div>

      {/* Mobile: bottom action bar */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-[190] bg-nagi-sand/95 border-t border-nagi-border/20 px-4 py-3 safe-area-inset-bottom"
        role="complementary"
        aria-label={t.stickyBar.checkBtn}
      >
        <button
          onClick={onOpen}
          className="btn-primary w-full py-3.5 text-base"
        >
          {t.stickyBar.mobileBtn}
        </button>
      </div>
    </>
  );
}
