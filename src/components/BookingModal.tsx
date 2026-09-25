import { useState } from 'react';
import { Room, BookingFormState, StayType } from '../types';
import { ROOMS } from '../data/rooms';
import { MOMENT_THEMES, formatPriceCompact } from '../utils/themes';

interface BookingModalProps {
  isOpen: boolean;
  initialRoom?: Room | null;
  onClose: () => void;
}

const emptyForm: BookingFormState = {
  stayType: 'short_term',
  checkIn: '',
  checkOut: '',
  monthlyStartDate: '',
  monthlyMonths: 1,
  guests: 2,
  selectedRoomId: '',
  fullName: '',
  phone: '',
  email: '',
  note: '',
};

type Step = 'dates' | 'rooms' | 'contact' | 'confirm';

export default function BookingModal({ isOpen, initialRoom, onClose }: BookingModalProps) {
  const [form, setForm] = useState<BookingFormState>({ ...emptyForm, selectedRoomId: initialRoom?.id || '' });
  const [step, setStep] = useState<Step>('dates');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const update = (patch: Partial<BookingFormState>) => setForm(prev => ({ ...prev, ...patch }));

  const selectedRoom = ROOMS.find(r => r.id === form.selectedRoomId) || null;
  const theme = selectedRoom ? MOMENT_THEMES[selectedRoom.momentKey] : null;

  const availableRooms = ROOMS.filter(room => {
    if (!room.isAvailable) return false;
    if (form.stayType === 'short_term' && form.checkIn && form.checkOut) {
      // Mock: filter against unavailable dates
      const checkin = new Date(form.checkIn);
      const checkout = new Date(form.checkOut);
      return !(room.unavailableDates || []).some(d => {
        const date = new Date(d);
        return date >= checkin && date < checkout;
      });
    }
    return true;
  });

  const canAdvanceDates = (() => {
    if (form.stayType === 'short_term') return form.checkIn && form.checkOut && form.checkIn < form.checkOut;
    return form.monthlyStartDate && form.monthlyMonths >= 1;
  })();

  const handleSubmit = async () => {
    setIsLoading(true);
    // TODO: Connect to actual booking API / backend
    // This is a mock submission — replace with real API call
    await new Promise(r => setTimeout(r, 1400));
    setIsLoading(false);
    setSubmitted(true);
  };

  const reset = () => {
    setForm({ ...emptyForm });
    setStep('dates');
    setSubmitted(false);
    onClose();
  };

  const stayTypes: { key: StayType; label: string; sub: string }[] = [
    { key: 'short_term', label: 'Ngắn hạn', sub: 'Theo đêm (1–30 ngày)' },
    { key: 'monthly', label: 'Thuê tháng', sub: 'Dài hạn (≥ 1 tháng)' },
  ];

  return (
    <div
      className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Kiểm tra phòng và đặt chỗ"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-nagi-darkBg/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full sm:max-w-xl bg-nagi-sand rounded-t-2xl sm:rounded-nagi-lg overflow-hidden shadow-[0_34px_70px_-32px_rgba(34,48,63,0.5)] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-nagi-sand/95 flex items-center justify-between px-6 py-5 border-b border-nagi-border/15">
          <div>
            <h2 className="font-serif text-xl text-nagi-cardEdge">Kiểm tra phòng trống</h2>
            <p className="font-sans text-xs text-nagi-muted mt-0.5">
              {!submitted && (
                <>Bước <strong className="text-nagi-terracotta">{['dates','rooms','contact','confirm'].indexOf(step)+1}</strong>/4</>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-nagi-clay/50 transition-colors"
            aria-label="Đóng"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {submitted ? (
            /* Success state */
            <div className="text-center py-12 space-y-6">
              <div className="text-6xl animate-float">🌿</div>
              <h3 className="font-serif text-2xl text-nagi-cardEdge">Yêu cầu đã được gửi!</h3>
              <p className="font-serif text-base text-nagi-slate leading-relaxed max-w-sm mx-auto">
                Chúng tôi sẽ liên hệ lại với bạn trong vòng <strong>2–4 giờ</strong> để xác nhận đặt phòng.
                Cảm ơn vì đã chọn Hẻm Nhà Living.
              </p>
              <div className="text-xs text-nagi-muted font-sans bg-nagi-clay/30 rounded-nagi px-4 py-3 text-left">
                <strong className="block mb-1">Lưu ý quan trọng:</strong>
                Đây là yêu cầu tạm giữ chỗ. Đặt phòng chỉ được xác nhận sau khi chúng tôi liên hệ và
                bạn thanh toán đặt cọc 30%.
              </div>
              <button onClick={reset} className="btn-primary px-8">
                Đóng
              </button>
            </div>
          ) : (
            <>
              {/* Step 1: Dates & Stay type */}
              {step === 'dates' && (
                <div className="space-y-6">
                  {/* Stay type selector */}
                  <div>
                    <label className="font-sans text-xs uppercase tracking-widest text-nagi-muted mb-3 block">Loại lưu trú</label>
                    <div className="flex gap-3">
                      {stayTypes.map(({ key, label, sub }) => (
                        <button
                          key={key}
                          onClick={() => update({ stayType: key })}
                          className={`flex-1 px-4 py-3.5 rounded-nagi border text-left transition-all duration-200 ${
                            form.stayType === key
                              ? 'border-nagi-terracotta bg-nagi-cream'
                              : 'border-nagi-border/30 hover:border-nagi-border/60'
                          }`}
                          aria-pressed={form.stayType === key}
                        >
                          <div className="font-sans text-sm font-medium text-nagi-cardEdge">{label}</div>
                          <div className="font-sans text-xs text-nagi-muted">{sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {form.stayType === 'short_term' ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-sans text-xs uppercase tracking-widest text-nagi-muted mb-2 block" htmlFor="checkin">
                          Check-in
                        </label>
                        <input
                          id="checkin"
                          type="date"
                          value={form.checkIn}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={e => update({ checkIn: e.target.value })}
                          className="w-full rounded-nagi border border-nagi-border/30 bg-white px-4 py-3 font-sans text-sm text-nagi-cardEdge focus:outline-none focus:ring-2 focus:ring-nagi-gold/50"
                        />
                      </div>
                      <div>
                        <label className="font-sans text-xs uppercase tracking-widest text-nagi-muted mb-2 block" htmlFor="checkout">
                          Check-out
                        </label>
                        <input
                          id="checkout"
                          type="date"
                          value={form.checkOut}
                          min={form.checkIn || new Date().toISOString().split('T')[0]}
                          onChange={e => update({ checkOut: e.target.value })}
                          className="w-full rounded-nagi border border-nagi-border/30 bg-white px-4 py-3 font-sans text-sm text-nagi-cardEdge focus:outline-none focus:ring-2 focus:ring-nagi-gold/50"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-sans text-xs uppercase tracking-widest text-nagi-muted mb-2 block" htmlFor="monthstart">
                          Ngày bắt đầu
                        </label>
                        <input
                          id="monthstart"
                          type="date"
                          value={form.monthlyStartDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={e => update({ monthlyStartDate: e.target.value })}
                          className="w-full rounded-nagi border border-nagi-border/30 bg-white px-4 py-3 font-sans text-sm text-nagi-cardEdge focus:outline-none focus:ring-2 focus:ring-nagi-gold/50"
                        />
                      </div>
                      <div>
                        <label className="font-sans text-xs uppercase tracking-widest text-nagi-muted mb-2 block" htmlFor="months">
                          Số tháng dự kiến
                        </label>
                        <select
                          id="months"
                          value={form.monthlyMonths}
                          onChange={e => update({ monthlyMonths: Number(e.target.value) })}
                          className="w-full rounded-nagi border border-nagi-border/30 bg-white px-4 py-3 font-sans text-sm text-nagi-cardEdge focus:outline-none focus:ring-2 focus:ring-nagi-gold/50"
                        >
                          {[1,2,3,4,5,6,9,12].map(m => (
                            <option key={m} value={m}>{m} tháng</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Guests */}
                  <div>
                    <label className="font-sans text-xs uppercase tracking-widest text-nagi-muted mb-2 block" htmlFor="guests">
                      Số khách
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => update({ guests: Math.max(1, form.guests - 1) })}
                        className="w-10 h-10 rounded-full border border-nagi-border/30 flex items-center justify-center font-sans text-lg text-nagi-cardEdge hover:bg-nagi-clay/30 transition-colors"
                        aria-label="Giảm số khách"
                      >−</button>
                      <span id="guests" className="font-serif text-2xl text-nagi-cardEdge w-8 text-center">{form.guests}</span>
                      <button
                        onClick={() => update({ guests: Math.min(4, form.guests + 1) })}
                        className="w-10 h-10 rounded-full border border-nagi-border/30 flex items-center justify-center font-sans text-lg text-nagi-cardEdge hover:bg-nagi-clay/30 transition-colors"
                        aria-label="Tăng số khách"
                      >+</button>
                      <span className="font-sans text-sm text-nagi-muted">người lớn</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('rooms')}
                    disabled={!canAdvanceDates}
                    className="w-full btn-primary py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Tìm phòng phù hợp →
                  </button>
                </div>
              )}

              {/* Step 2: Select room */}
              {step === 'rooms' && (
                <div className="space-y-4">
                  <p className="font-serif text-base text-nagi-slate">
                    {availableRooms.length === 0 ? (
                      <span className="text-red-600">Không có phòng trống cho ngày đã chọn. Vui lòng thử ngày khác.</span>
                    ) : (
                      <><strong>{availableRooms.length} phòng</strong> còn trống trong thời gian bạn chọn:</>
                    )}
                  </p>

                  {availableRooms.map(room => {
                    const t = MOMENT_THEMES[room.momentKey];
                    const isSelected = form.selectedRoomId === room.id;
                    const nights = form.stayType === 'short_term' && form.checkIn && form.checkOut
                      ? Math.ceil((new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / 86400000)
                      : 0;
                    const price = form.stayType === 'short_term'
                      ? nights * room.shortTermPrice
                      : form.monthlyMonths * room.monthlyPrice;

                    return (
                      <button
                        key={room.id}
                        onClick={() => update({ selectedRoomId: room.id })}
                        className={`w-full text-left rounded-nagi-md border-2 transition-all duration-200 overflow-hidden flex gap-0 ${
                          isSelected ? 'border-nagi-terracotta' : 'border-nagi-border/20 hover:border-nagi-border/50'
                        }`}
                        aria-pressed={isSelected}
                        aria-label={`Chọn phòng ${room.name}`}
                      >
                        <div className="w-24 flex-shrink-0">
                          <img
                            src={room.images[0]?.url}
                            alt={`Phòng ${room.name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="font-sans text-[0.6rem] uppercase tracking-widest block mb-0.5" style={{ color: t.mutedColor }}>
                                {t.timeEmoji} {room.momentTime}
                              </span>
                              <div className="font-script text-2xl" style={{ color: t.accentColor }}>{room.name}</div>
                              <div className="font-sans text-xs text-nagi-muted mt-0.5">{room.area} · {room.capacity}</div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="font-serif text-lg font-semibold text-nagi-terracotta">
                                {price > 0 ? formatPriceCompact(price) : formatPriceCompact(
                                  form.stayType === 'short_term' ? room.shortTermPrice : room.monthlyPrice
                                )}
                              </div>
                              <div className="font-sans text-[0.6rem] text-nagi-muted uppercase tracking-wider">
                                {form.stayType === 'short_term'
                                  ? nights > 0 ? `${nights} đêm` : '/đêm'
                                  : `${form.monthlyMonths} tháng`}
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep('dates')} className="btn-ghost flex-1 py-3">
                      ← Quay lại
                    </button>
                    <button
                      onClick={() => setStep('contact')}
                      disabled={!form.selectedRoomId}
                      className="btn-primary flex-1 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Tiếp tục →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact info */}
              {step === 'contact' && (
                <div className="space-y-5">
                  {selectedRoom && (
                    <div
                      className="flex items-center gap-3 p-3 rounded-nagi text-sm"
                      style={{ backgroundColor: theme?.pillBg, color: theme?.pillText }}
                    >
                      <img
                        src={selectedRoom.images[0]?.url}
                        alt=""
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <div className="font-sans font-medium">{selectedRoom.name}</div>
                        <div className="font-sans text-xs opacity-70">{selectedRoom.code}</div>
                      </div>
                    </div>
                  )}

                  {[
                    { id: 'fullName', label: 'Họ và tên', type: 'text', required: true, autocomplete: 'name' },
                    { id: 'phone', label: 'Số điện thoại', type: 'tel', required: true, autocomplete: 'tel' },
                    { id: 'email', label: 'Email', type: 'email', required: false, autocomplete: 'email' },
                  ].map(({ id, label, type, required, autocomplete }) => (
                    <label key={id} className="block">
                      <span className="font-sans text-xs uppercase tracking-widest text-nagi-muted mb-2 block">
                        {label} {required && <span className="text-red-500">*</span>}
                      </span>
                      <input
                        id={id}
                        type={type}
                        autoComplete={autocomplete}
                        value={(form as any)[id]}
                        onChange={e => update({ [id]: e.target.value } as any)}
                        required={required}
                        className="w-full rounded-nagi border border-nagi-border/30 bg-white px-4 py-3 font-sans text-sm text-nagi-cardEdge focus:outline-none focus:ring-2 focus:ring-nagi-gold/50"
                      />
                    </label>
                  ))}

                  <label className="block">
                    <span className="font-sans text-xs uppercase tracking-widest text-nagi-muted mb-2 block">Ghi chú / Yêu cầu đặc biệt</span>
                    <textarea
                      value={form.note}
                      onChange={e => update({ note: e.target.value })}
                      rows={3}
                      className="w-full rounded-nagi border border-nagi-border/30 bg-white px-4 py-3 font-sans text-sm text-nagi-cardEdge focus:outline-none focus:ring-2 focus:ring-nagi-gold/50 resize-none"
                      placeholder="Giờ check-in dự kiến, yêu cầu đặc biệt..."
                    />
                  </label>

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep('rooms')} className="btn-ghost flex-1 py-3">← Quay lại</button>
                    <button
                      onClick={() => setStep('confirm')}
                      disabled={!form.fullName || !form.phone}
                      className="btn-primary flex-1 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Xem lại →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirm */}
              {step === 'confirm' && selectedRoom && (
                <div className="space-y-6">
                  <div className="rounded-nagi-md overflow-hidden border border-nagi-border/20">
                    {/* Room hero */}
                    <div className="relative h-36">
                      <img
                        src={selectedRoom.images[0]?.url}
                        alt={`Phòng ${selectedRoom.name}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-nagi-cardEdge/80 to-transparent" />
                      <div className="absolute bottom-3 left-4 text-nagi-parchment">
                        <div className="font-script text-3xl leading-none">{selectedRoom.name}</div>
                        <div className="font-sans text-xs opacity-70 mt-0.5">{selectedRoom.code} · {selectedRoom.floor}</div>
                      </div>
                    </div>

                    {/* Summary rows */}
                    <div className="bg-nagi-sand divide-y divide-nagi-border/10">
                      {[
                        { label: 'Loại lưu trú', value: form.stayType === 'short_term' ? 'Ngắn hạn (theo đêm)' : 'Thuê tháng' },
                        form.stayType === 'short_term'
                          ? { label: 'Thời gian', value: `${form.checkIn} → ${form.checkOut}` }
                          : { label: 'Thời gian', value: `Từ ${form.monthlyStartDate} · ${form.monthlyMonths} tháng` },
                        { label: 'Số khách', value: `${form.guests} người lớn` },
                        { label: 'Khách hàng', value: form.fullName },
                        { label: 'Liên hệ', value: form.phone + (form.email ? ` · ${form.email}` : '') },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between px-4 py-3 text-sm">
                          <span className="font-sans text-nagi-muted">{label}</span>
                          <span className="font-sans text-nagi-cardEdge font-medium text-right max-w-[55%]">{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total price */}
                    <div className="bg-nagi-clay/40 px-4 py-4 flex items-center justify-between">
                      <span className="font-sans text-sm text-nagi-cardEdge">Tổng dự kiến</span>
                      <span className="font-serif text-2xl font-semibold text-nagi-terracotta">
                        {formatPriceCompact(
                          form.stayType === 'short_term'
                            ? Math.ceil((new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / 86400000) * selectedRoom.shortTermPrice
                            : form.monthlyMonths * selectedRoom.monthlyPrice
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="bg-nagi-clay/30 rounded-nagi px-4 py-3 text-xs text-nagi-slate font-sans leading-relaxed">
                    Đây là yêu cầu giữ chỗ. Hẻm Nhà Living sẽ liên hệ xác nhận và hướng dẫn đặt cọc 30% trong vòng 2–4 giờ.
                    Chưa phát sinh chi phí cho đến khi xác nhận.
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep('contact')} className="btn-ghost flex-1 py-3">← Sửa</button>
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="btn-primary flex-1 py-3"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeWidth="2"/>
                          </svg>
                          Đang gửi...
                        </span>
                      ) : 'Gửi yêu cầu đặt phòng'}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
