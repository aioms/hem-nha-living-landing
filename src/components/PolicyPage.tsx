import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useInView } from '../hooks/useScroll';

export type PolicyTab = 'all' | 'terms' | 'cancellation' | 'privacy';

interface PolicyPageProps {
  initialTab?: PolicyTab;
  onNavigateHome: () => void;
  onBookingOpen: () => void;
}

export default function PolicyPage({
  initialTab = 'all',
  onNavigateHome,
  onBookingOpen,
}: PolicyPageProps) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);
  const [headerRef, headerInView] = useInView(0.1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sync with initialTab prop if it changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const p = t.policiesPage;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTabChange = (tab: PolicyTab) => {
    setActiveTab(tab);
    if (tab === 'terms') {
      window.location.hash = 'terms';
    } else if (tab === 'cancellation') {
      window.location.hash = 'cancellation-policy';
    } else if (tab === 'privacy') {
      window.location.hash = 'privacy-policy';
    } else {
      window.location.hash = 'policies';
    }
    // Scroll smoothly to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isVisible = (tab: 'terms' | 'cancellation' | 'privacy') => {
    return activeTab === 'all' || activeTab === tab;
  };

  return (
    <div className="min-h-screen bg-nagi-sand text-nagi-slate pt-24 md:pt-28 pb-20">
      {/* Top Breadcrumb & Hero */}
      <header className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-12">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-sans text-nagi-muted">
          <button
            onClick={onNavigateHome}
            className="hover:text-nagi-terracotta transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>←</span> {p.breadcrumbHome}
          </button>
          <span>/</span>
          <span className="text-nagi-cardEdge font-medium">{p.breadcrumbCurrent}</span>
        </nav>

        <div
          ref={headerRef}
          className={`space-y-4 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nagi-terracotta/10 border border-nagi-terracotta/20 text-nagi-terracotta text-[0.7rem] uppercase tracking-widest font-semibold">
            <span>⚖️</span>
            <span>{p.badge}</span>
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold text-nagi-cardEdge tracking-tight">
            {p.title}
          </h1>

          <p className="font-sans text-base md:text-lg text-nagi-slate/90 max-w-3xl leading-relaxed">
            {p.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-nagi-muted pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {p.lastUpdated}
            </span>
            <span>•</span>
            <span>Hẻm Nhà Living · 19/8A Tân Thuận Tây, Q.7, TP.HCM</span>
          </div>
        </div>

        {/* Tab Filter Switcher */}
        <div className="mt-10 flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-nagi-clay/40 border border-nagi-border/15 max-w-fit">
          <button
            onClick={() => handleTabChange('all')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-sans font-medium transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-nagi-cardEdge text-nagi-sand shadow-sm'
                : 'text-nagi-cardEdge/70 hover:text-nagi-cardEdge hover:bg-white/40'
            }`}
          >
            {p.filterAll}
          </button>
          <button
            onClick={() => handleTabChange('terms')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-sans font-medium transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-nagi-cardEdge text-nagi-sand shadow-sm'
                : 'text-nagi-cardEdge/70 hover:text-nagi-cardEdge hover:bg-white/40'
            }`}
          >
            📋 {p.filterTerms}
          </button>
          <button
            onClick={() => handleTabChange('cancellation')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-sans font-medium transition-all cursor-pointer ${
              activeTab === 'cancellation'
                ? 'bg-nagi-cardEdge text-nagi-sand shadow-sm'
                : 'text-nagi-cardEdge/70 hover:text-nagi-cardEdge hover:bg-white/40'
            }`}
          >
            🔄 {p.filterCancellation}
          </button>
          <button
            onClick={() => handleTabChange('privacy')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-sans font-medium transition-all cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-nagi-cardEdge text-nagi-sand shadow-sm'
                : 'text-nagi-cardEdge/70 hover:text-nagi-cardEdge hover:bg-white/40'
            }`}
          >
            🔒 {p.filterPrivacy}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 space-y-16">

        {/* 1. CANCELLATION & REFUND POLICY */}
        {isVisible('cancellation') && (
          <section
            id="cancellation-policy"
            className="scroll-mt-28 bg-white/70 border border-nagi-border/20 rounded-nagi-lg p-6 sm:p-8 md:p-12 shadow-sm transition-all"
          >
            {/* Header */}
            <div className="border-b border-nagi-border/15 pb-6 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-sans text-xs uppercase tracking-widest text-nagi-terracotta font-semibold block mb-1">
                    01 · {language === 'vi' ? 'Quy định đặt phòng' : 'Booking Terms'}
                  </span>
                  <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-nagi-cardEdge">
                    {p.cancellation.title}
                  </h2>
                </div>
                <button
                  onClick={() => handleCopy(window.location.href.split('#')[0] + '#cancellation-policy', 'cancel-link')}
                  className="px-3 py-1.5 rounded-full border border-nagi-border/30 text-xs font-sans text-nagi-muted hover:text-nagi-cardEdge hover:border-nagi-cardEdge/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🔗</span>
                  <span>{copiedKey === 'cancel-link' ? (language === 'vi' ? 'Đã sao chép link' : 'Link copied') : (language === 'vi' ? 'Sao chép liên kết' : 'Copy link')}</span>
                </button>
              </div>

              {/* Welcome intro quote box */}
              <div className="mt-6 p-5 rounded-nagi bg-[#f4e8d2]/50 border-l-4 border-nagi-terracotta text-nagi-cardEdge font-sans text-sm leading-relaxed">
                <p>{p.cancellation.welcomeIntro}</p>
              </div>
            </div>

            <div className="space-y-10">
              {/* Part 1: General Booking Conditions */}
              <div>
                <h3 className="font-sans text-lg font-semibold text-nagi-cardEdge mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-nagi-terracotta/15 text-nagi-terracotta flex items-center justify-center text-xs font-bold">1</span>
                  {p.cancellation.sec1Title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-nagi bg-nagi-sand/80 border border-nagi-border/15 flex items-start gap-3.5">
                    <span className="text-xl mt-0.5">🕒</span>
                    <div>
                      <h4 className="font-sans text-xs uppercase tracking-wider text-nagi-muted font-semibold">
                        {p.cancellation.sec1CheckInOut}
                      </h4>
                      <p className="font-sans text-sm font-medium text-nagi-cardEdge mt-1">
                        {p.cancellation.sec1CheckInOutVal}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-nagi bg-nagi-sand/80 border border-nagi-border/15 flex items-start gap-3.5">
                    <span className="text-xl mt-0.5">💳</span>
                    <div>
                      <h4 className="font-sans text-xs uppercase tracking-wider text-nagi-muted font-semibold">
                        {p.cancellation.sec1Deposit}
                      </h4>
                      <p className="font-sans text-sm font-medium text-nagi-cardEdge mt-1">
                        {p.cancellation.sec1DepositVal}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 2: Cancellation & Refund Table */}
              <div>
                <h3 className="font-sans text-lg font-semibold text-nagi-cardEdge mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-nagi-terracotta/15 text-nagi-terracotta flex items-center justify-center text-xs font-bold">2</span>
                  {p.cancellation.sec2Title}
                </h3>

                {/* Desktop Table View */}
                <div className="hidden sm:block overflow-hidden rounded-nagi border border-nagi-border/20 shadow-xs">
                  <table className="w-full text-left font-sans text-sm border-collapse">
                    <thead>
                      <tr className="bg-nagi-darkBg text-nagi-sand border-b border-nagi-muted/20">
                        <th className="py-3.5 px-5 font-semibold text-xs uppercase tracking-wider">
                          {p.cancellation.sec2NoticeCol}
                        </th>
                        <th className="py-3.5 px-5 font-semibold text-xs uppercase tracking-wider text-center">
                          {p.cancellation.sec2RefundCol}
                        </th>
                        <th className="py-3.5 px-5 font-semibold text-xs uppercase tracking-wider">
                          {p.cancellation.sec2RescheduleCol}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-nagi-border/15 bg-white">
                      {p.cancellation.rows.map((row, idx) => {
                        const isFull = row.refundType === 'full';
                        const isHalf = row.refundType === 'half';
                        return (
                          <tr key={idx} className="hover:bg-nagi-sand/40 transition-colors">
                            <td className="py-4 px-5 font-medium text-nagi-cardEdge">
                              {row.notice}
                            </td>
                            <td className="py-4 px-5 text-center">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                  isFull
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : isHalf
                                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                    : 'bg-rose-100 text-rose-800 border border-rose-200'
                                }`}
                              >
                                {row.refundBadge}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-nagi-slate">
                              {row.reschedule}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards View */}
                <div className="sm:hidden space-y-3">
                  {p.cancellation.rows.map((row, idx) => {
                    const isFull = row.refundType === 'full';
                    const isHalf = row.refundType === 'half';
                    return (
                      <div key={idx} className="p-4 rounded-nagi bg-white border border-nagi-border/20 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-xs uppercase tracking-wider text-nagi-muted font-semibold">
                            {p.cancellation.sec2NoticeCol}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              isFull
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : isHalf
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-rose-100 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {row.refundBadge}
                          </span>
                        </div>
                        <div className="font-sans font-semibold text-nagi-cardEdge text-base">
                          {row.notice}
                        </div>
                        <div className="pt-2 border-t border-nagi-border/10 text-xs font-sans text-nagi-slate flex items-start gap-1.5">
                          <span className="text-nagi-muted">🔄</span>
                          <span>{row.reschedule}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Part 3: Rescheduling Policy */}
              <div>
                <h3 className="font-sans text-lg font-semibold text-nagi-cardEdge mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-nagi-terracotta/15 text-nagi-terracotta flex items-center justify-center text-xs font-bold">3</span>
                  {p.cancellation.sec3Title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-nagi bg-nagi-sand/80 border border-nagi-border/15">
                    <span className="text-base font-semibold text-nagi-terracotta block mb-1">
                      📅 {p.cancellation.sec3AdvanceLabel}
                    </span>
                    <p className="font-sans text-xs md:text-sm text-nagi-slate leading-relaxed">
                      {p.cancellation.sec3AdvanceVal}
                    </p>
                  </div>
                  <div className="p-4 rounded-nagi bg-nagi-sand/80 border border-nagi-border/15">
                    <span className="text-base font-semibold text-nagi-terracotta block mb-1">
                      ⏳ {p.cancellation.sec3ValidityLabel}
                    </span>
                    <p className="font-sans text-xs md:text-sm text-nagi-slate leading-relaxed">
                      {p.cancellation.sec3ValidityVal}
                    </p>
                  </div>
                  <div className="p-4 rounded-nagi bg-nagi-sand/80 border border-nagi-border/15">
                    <span className="text-base font-semibold text-nagi-terracotta block mb-1">
                      🔢 {p.cancellation.sec3LimitLabel}
                    </span>
                    <p className="font-sans text-xs md:text-sm text-nagi-slate leading-relaxed">
                      {p.cancellation.sec3LimitVal}
                    </p>
                  </div>
                </div>
              </div>

              {/* Part 4: Special Conditions & Force Majeure */}
              <div>
                <h3 className="font-sans text-lg font-semibold text-nagi-cardEdge mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-nagi-terracotta/15 text-nagi-terracotta flex items-center justify-center text-xs font-bold">4</span>
                  {p.cancellation.sec4Title}
                </h3>
                <div className="p-5 rounded-nagi bg-nagi-sand/80 border border-nagi-border/15 font-sans text-sm text-nagi-slate leading-relaxed flex items-start gap-3">
                  <span className="text-xl">✈️</span>
                  <p>{p.cancellation.sec4Desc}</p>
                </div>
              </div>

              {/* Support & Contact Box */}
              <div className="p-6 rounded-nagi-lg bg-nagi-darkBg text-nagi-sand border border-nagi-goldLight/20 shadow-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-nagi-muted/20">
                  <div>
                    <h4 className="font-sans text-base font-semibold text-nagi-goldLight">
                      {p.cancellation.contactTitle}
                    </h4>
                    <p className="font-sans text-xs text-nagi-muted mt-1">
                      {p.cancellation.contactIntro}
                    </p>
                  </div>
                  <button
                    onClick={onBookingOpen}
                    className="self-start md:self-auto px-4 py-2 rounded-full bg-nagi-terracotta text-nagi-sand text-xs font-sans font-medium hover:brightness-110 transition-all cursor-pointer shadow-xs"
                  >
                    {p.footerNote.bookBtn}
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
                  <div>
                    <span className="text-nagi-muted uppercase tracking-wider text-[0.65rem] block">{p.cancellation.hostLabel}</span>
                    <span className="font-semibold text-nagi-parchment text-sm">{p.cancellation.hostVal}</span>
                  </div>
                  <div>
                    <span className="text-nagi-muted uppercase tracking-wider text-[0.65rem] block">{p.cancellation.hotlineLabel}</span>
                    <button
                      onClick={() => handleCopy(p.cancellation.hotlineVal, 'hotline')}
                      className="font-semibold text-nagi-goldLight hover:underline text-sm flex items-center gap-1 cursor-pointer"
                    >
                      {p.cancellation.hotlineVal}
                      <span className="text-[0.65rem] text-nagi-muted">
                        {copiedKey === 'hotline' ? '✓' : '📋'}
                      </span>
                    </button>
                  </div>
                  <div>
                    <span className="text-nagi-muted uppercase tracking-wider text-[0.65rem] block">{p.cancellation.emailLabel}</span>
                    <button
                      onClick={() => handleCopy(p.cancellation.emailVal, 'email')}
                      className="font-semibold text-nagi-goldLight hover:underline text-sm truncate max-w-full flex items-center gap-1 cursor-pointer"
                    >
                      {p.cancellation.emailVal}
                      <span className="text-[0.65rem] text-nagi-muted">
                        {copiedKey === 'email' ? '✓' : '📋'}
                      </span>
                    </button>
                  </div>
                  <div>
                    <span className="text-nagi-muted uppercase tracking-wider text-[0.65rem] block">{p.cancellation.addressLabel}</span>
                    <span className="text-nagi-parchment text-xs leading-tight block">{p.cancellation.addressVal}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. TERMS OF SERVICE & HOUSE RULES */}
        {isVisible('terms') && (
          <section
            id="terms"
            className="scroll-mt-28 bg-white/70 border border-nagi-border/20 rounded-nagi-lg p-6 sm:p-8 md:p-12 shadow-sm transition-all"
          >
            {/* Header */}
            <div className="border-b border-nagi-border/15 pb-6 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-sans text-xs uppercase tracking-widest text-nagi-terracotta font-semibold block mb-1">
                    02 · {language === 'vi' ? 'Nội quy nhà chung' : 'House Guidelines'}
                  </span>
                  <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-nagi-cardEdge">
                    {p.terms.title}
                  </h2>
                </div>
                <button
                  onClick={() => handleCopy(window.location.href.split('#')[0] + '#terms', 'terms-link')}
                  className="px-3 py-1.5 rounded-full border border-nagi-border/30 text-xs font-sans text-nagi-muted hover:text-nagi-cardEdge hover:border-nagi-cardEdge/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🔗</span>
                  <span>{copiedKey === 'terms-link' ? (language === 'vi' ? 'Đã sao chép link' : 'Link copied') : (language === 'vi' ? 'Sao chép liên kết' : 'Copy link')}</span>
                </button>
              </div>

              <p className="mt-4 font-sans text-sm text-nagi-slate leading-relaxed">
                {p.terms.intro}
              </p>
            </div>

            {/* 4 Rules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {p.terms.rules.map((rule) => (
                <div
                  key={rule.key}
                  className="p-6 rounded-nagi bg-nagi-sand/70 border border-nagi-border/15 hover:border-nagi-terracotta/40 hover:bg-nagi-sand transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{rule.icon}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-nagi-cardEdge/10 text-nagi-cardEdge text-[0.7rem] font-sans font-medium">
                        {rule.badge}
                      </span>
                    </div>
                    <h3 className="font-sans text-base font-semibold text-nagi-cardEdge">
                      {rule.title}
                    </h3>
                    <p className="font-sans text-sm text-nagi-slate leading-relaxed">
                      {rule.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. PRIVACY POLICY */}
        {isVisible('privacy') && (
          <section
            id="privacy-policy"
            className="scroll-mt-28 bg-white/70 border border-nagi-border/20 rounded-nagi-lg p-6 sm:p-8 md:p-12 shadow-sm transition-all"
          >
            {/* Header */}
            <div className="border-b border-nagi-border/15 pb-6 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-sans text-xs uppercase tracking-widest text-nagi-terracotta font-semibold block mb-1">
                    03 · {language === 'vi' ? 'Bảo vệ dữ liệu' : 'Data Protection'}
                  </span>
                  <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-nagi-cardEdge">
                    {p.privacy.title}
                  </h2>
                </div>
                <button
                  onClick={() => handleCopy(window.location.href.split('#')[0] + '#privacy-policy', 'privacy-link')}
                  className="px-3 py-1.5 rounded-full border border-nagi-border/30 text-xs font-sans text-nagi-muted hover:text-nagi-cardEdge hover:border-nagi-cardEdge/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🔗</span>
                  <span>{copiedKey === 'privacy-link' ? (language === 'vi' ? 'Đã sao chép link' : 'Link copied') : (language === 'vi' ? 'Sao chép liên kết' : 'Copy link')}</span>
                </button>
              </div>

              <div className="mt-4 p-4 rounded-nagi bg-emerald-50 border border-emerald-200/60 flex items-start gap-3">
                <span className="text-emerald-700 text-lg">🔒</span>
                <div>
                  <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-emerald-800">
                    {p.privacy.subtitle}
                  </h4>
                  <p className="font-sans text-sm text-emerald-900 mt-1 leading-relaxed">
                    {p.privacy.intro}
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Privacy Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {p.privacy.sections.map((sec) => (
                <div
                  key={sec.key}
                  className="p-6 rounded-nagi bg-nagi-sand/70 border border-nagi-border/15 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-3">
                    <span className="text-2xl block">{sec.icon}</span>
                    <h3 className="font-sans text-base font-semibold text-nagi-cardEdge">
                      {sec.title}
                    </h3>
                    <p className="font-sans text-sm text-nagi-slate leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA Banner */}
        <div className="p-8 md:p-10 rounded-nagi-lg bg-[#f4e8d2]/60 border border-nagi-border/20 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="font-sans text-xl md:text-2xl font-semibold text-nagi-cardEdge">
            {p.footerNote.title}
          </h3>
          <p className="font-sans text-sm md:text-base text-nagi-slate max-w-xl mx-auto leading-relaxed">
            {p.footerNote.desc}
          </p>
          <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="px-6 py-3 rounded-full border border-nagi-cardEdge/30 text-nagi-cardEdge font-sans text-sm font-medium hover:bg-nagi-cardEdge/5 transition-colors cursor-pointer"
            >
              ← {language === 'vi' ? 'Quay lại trang chủ' : 'Back to Home'}
            </button>
            <button
              onClick={onBookingOpen}
              className="px-6 py-3 rounded-full bg-nagi-terracotta text-nagi-sand font-sans text-sm font-medium hover:brightness-110 shadow-sm transition-all cursor-pointer"
            >
              {p.footerNote.bookBtn} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
