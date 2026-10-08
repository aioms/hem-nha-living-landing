import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface EarlyBirdModalProps {
  isOpen: boolean;
  onClose: () => void;
  formUrl?: string; // Optional external Google Form link
}

interface EarlyBirdFormState {
  fullName: string;
  phone: string;
  email: string;
  stayType: string;
  expectedDate: string;
  note: string;
}

const initialForm: EarlyBirdFormState = {
  fullName: '',
  phone: '',
  email: '',
  stayType: 'homestay',
  expectedDate: 'mid_december',
  note: '',
};

export default function EarlyBirdModal({ isOpen, onClose, formUrl }: EarlyBirdModalProps) {
  const { t, language } = useLanguage();
  const [form, setForm] = useState<EarlyBirdFormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSubmitted(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim()) return;

    setIsSubmitting(true);
    // Simulate submission and save to localStorage
    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('hemnha_early_bird_leads') || '[]');
        existing.push({
          ...form,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem('hemnha_early_bird_leads', JSON.stringify(existing));
      } catch (err) {
        console.error('Save lead error:', err);
      }
      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setForm(initialForm);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[350] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Đăng ký lưu trú đợt Early Bird - Hẻm Nhà Living"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1e2a2e]/80 backdrop-blur-sm transition-opacity"
        onClick={handleResetAndClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-xl rounded-nagi-lg bg-[#faf6f0] text-nagi-slate border border-[#d9c7b0]/60 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#79a594] via-[#ae7055] to-[#d9c7b0]" />

        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 flex items-start justify-between border-b border-[#d9c7b0]/30 bg-[#f4ece1]/50">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#79a594]/20 border border-[#79a594]/30 text-[#2f5244] text-[0.7rem] font-bold tracking-wider uppercase mb-1.5">
              <span>{t.earlyBird.modal.badge}</span>
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-nagi-cardEdge">
              {t.earlyBird.modal.title}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-nagi-slate/80 mt-1">
              {t.earlyBird.modal.subtitle}
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-full hover:bg-black/5 text-nagi-muted hover:text-nagi-slate transition-colors -mr-2 -mt-1 cursor-pointer"
            aria-label={language === 'vi' ? 'Đóng' : 'Close'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            /* Success State */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#79a594]/20 text-[#2f5244] flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
                🌱
              </div>
              <h3 className="font-sans text-xl font-bold text-nagi-cardEdge mb-2">
                {t.earlyBird.modal.successTitle}
              </h3>
              <p className="font-sans text-sm text-nagi-slate/85 max-w-md mx-auto leading-relaxed mb-6">
                {language === 'vi' ? (
                  <>
                    Cảm ơn bạn <strong className="font-semibold text-[#ae7055]">{form.fullName}</strong> đã đồng hành cùng Hẻm Nhà Living ngay từ những ngày ươm mầm đầu tiên. Đội ngũ Hẻm Nhà sẽ liên hệ với bạn qua số <strong className="font-semibold">{form.phone}</strong> (Zalo/Điện thoại) để gửi gói ưu đãi độc quyền sớm nhất trước ngày đón khách!
                  </>
                ) : (
                  <>
                    Thank you <strong className="font-semibold text-[#ae7055]">{form.fullName}</strong> for joining Hẻm Nhà Living early! Our team will connect with you via <strong className="font-semibold">{form.phone}</strong> (WhatsApp/phone) with exclusive early bird privileges before opening!
                  </>
                )}
              </p>

              <div className="p-4 rounded-nagi-md bg-white/80 border border-[#d9c7b0]/50 text-left max-w-md mx-auto mb-6 text-xs space-y-1.5 text-nagi-slate/80">
                <div className="font-semibold text-nagi-cardEdge mb-1 text-sm flex items-center gap-1.5">
                  <span>✨</span> {language === 'vi' ? 'Đặc quyền Early Bird dành cho bạn:' : 'Your Early Bird perks:'}
                </div>
                <div>{language === 'vi' ? '• Giảm ngay đến 20% tổng chi phí kỳ lưu trú đầu tiên' : '• Up to 20% off your initial stay'}</div>
                <div>{language === 'vi' ? '• Ưu tiên chọn tầng & căn phòng có ánh sáng/ban công ưng ý' : '• Priority room & balcony view selection'}</div>
                <div>{language === 'vi' ? '• Tặng 02 ly cà phê signature chào mừng tại Quando Quando cafe' : '• 2 complimentary signature coffees at Quando Quando cafe'}</div>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="btn-primary text-sm px-8 py-3 w-full sm:w-auto"
              >
                {t.earlyBird.modal.successClose}
              </button>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Full Name & Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-xs font-semibold text-nagi-cardEdge uppercase tracking-wider mb-1.5">
                    {t.earlyBird.modal.fullNameLabel} <span className="text-[#ae7055]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.earlyBird.modal.fullNamePlaceholder}
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-nagi bg-white border border-[#d9c7b0]/80 text-nagi-slate placeholder:text-nagi-muted/60 text-sm focus:outline-none focus:border-[#79a594] focus:ring-2 focus:ring-[#79a594]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs font-semibold text-nagi-cardEdge uppercase tracking-wider mb-1.5">
                    {t.earlyBird.modal.phoneLabel} <span className="text-[#ae7055]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={t.earlyBird.modal.phonePlaceholder}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-nagi bg-white border border-[#d9c7b0]/80 text-nagi-slate placeholder:text-nagi-muted/60 text-sm focus:outline-none focus:border-[#79a594] focus:ring-2 focus:ring-[#79a594]/20 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block font-sans text-xs font-semibold text-nagi-cardEdge uppercase tracking-wider mb-1.5">
                  {t.earlyBird.modal.emailLabel} <span className="text-nagi-muted text-[0.7rem] font-normal">({language === 'vi' ? 'Không bắt buộc' : 'Optional'})</span>
                </label>
                <input
                  type="email"
                  placeholder={t.earlyBird.modal.emailPlaceholder}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-nagi bg-white border border-[#d9c7b0]/80 text-nagi-slate placeholder:text-nagi-muted/60 text-sm focus:outline-none focus:border-[#79a594] focus:ring-2 focus:ring-[#79a594]/20 transition-all"
                />
              </div>

              {/* Stay Type */}
              <div>
                <label className="block font-sans text-xs font-semibold text-nagi-cardEdge uppercase tracking-wider mb-1.5">
                  {t.earlyBird.modal.stayTypeLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'homestay', label: t.earlyBird.modal.stayTypeHomestay, desc: language === 'vi' ? '4 Khoảnh khắc' : '4 Moments' },
                    { id: 'living', label: t.earlyBird.modal.stayTypeMonthly, desc: language === 'vi' ? 'Hẻm Living' : 'Living Studios' },
                    { id: 'diy', label: language === 'vi' ? 'Thuê năm tự do decor' : 'Annual DIY Studio', desc: language === 'vi' ? 'Hẻm DIY Tầng trệt' : 'Ground Floor Canvas' },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className={`flex flex-col p-2.5 rounded-nagi border cursor-pointer text-xs transition-all ${
                        form.stayType === item.id
                          ? 'bg-[#79a594]/15 border-[#79a594] text-nagi-cardEdge font-medium shadow-2xs'
                          : 'bg-white/70 border-[#d9c7b0]/60 text-nagi-slate/80 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <input
                          type="radio"
                          name="stayType"
                          checked={form.stayType === item.id}
                          onChange={() => setForm({ ...form, stayType: item.id })}
                          className="accent-[#79a594]"
                        />
                        <span className="font-semibold">{item.label}</span>
                      </div>
                      <span className="text-[0.68rem] text-nagi-muted mt-1 ml-4">{item.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Expected Date in December */}
              <div>
                <label className="block font-sans text-xs font-semibold text-nagi-cardEdge uppercase tracking-wider mb-1.5">
                  {t.earlyBird.modal.expectedDateLabel}
                </label>
                <select
                  value={form.expectedDate}
                  onChange={(e) => setForm({ ...form, expectedDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-nagi bg-white border border-[#d9c7b0]/80 text-nagi-slate text-sm focus:outline-none focus:border-[#79a594] focus:ring-2 focus:ring-[#79a594]/20 transition-all cursor-pointer"
                >
                  <option value="early_december">{t.earlyBird.modal.expectedDateEarlyDec}</option>
                  <option value="mid_december">{t.earlyBird.modal.expectedDateMidDec}</option>
                  <option value="festive_season">{t.earlyBird.modal.expectedDateLateDec}</option>
                  <option value="jan_2027">{t.earlyBird.modal.expectedDateEarly2027}</option>
                  <option value="flexible">{language === 'vi' ? 'Chưa chốt ngày cụ thể (Linh hoạt)' : 'Flexible dates'}</option>
                </select>
              </div>

              {/* Note */}
              <div>
                <label className="block font-sans text-xs font-semibold text-nagi-cardEdge uppercase tracking-wider mb-1.5">
                  {t.earlyBird.modal.noteLabel}
                </label>
                <textarea
                  rows={2}
                  placeholder={t.earlyBird.modal.notePlaceholder}
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-nagi bg-white border border-[#d9c7b0]/80 text-nagi-slate placeholder:text-nagi-muted/60 text-sm focus:outline-none focus:border-[#79a594] focus:ring-2 focus:ring-[#79a594]/20 transition-all resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                {formUrl ? (
                  <a
                    href={formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-nagi-muted hover:text-[#ae7055] underline transition-colors order-2 sm:order-1"
                  >
                    {language === 'vi' ? 'Hoặc mở Google Form riêng ↗' : 'Or open external Google Form ↗'}
                  </a>
                ) : (
                  <span className="text-[0.72rem] text-nagi-muted order-2 sm:order-1">
                    {language === 'vi' ? '🔒 Bảo mật thông tin khách hàng tuyệt đối' : '🔒 Strict guest privacy protection'}
                  </span>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !form.fullName.trim() || !form.phone.trim()}
                  className="w-full sm:w-auto btn-primary text-sm px-7 py-3 order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {isSubmitting ? t.earlyBird.modal.submittingBtn : t.earlyBird.modal.submitBtn}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
