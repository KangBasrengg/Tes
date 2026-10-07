import { useState, useEffect } from 'react';
import { CloseIcon, CourtIcon, PadelRacketIcon, UserIcon } from './Icons';

export default function CartDrawer({
  isOpen,
  onClose,
  selectedSlots,
  onRemoveSlot,
  selectedEquipment,
  equipmentCatalog,
  onUpdateEquipmentQty,
  selectedCoachSessions,
  onRemoveCoachSession,
  onConfirmBooking
}) {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    paymentMethod: 'qris',
    notes: ''
  });

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function formatIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  const slotSubtotal = selectedSlots.reduce((sum, s) => sum + s.price, 0);

  const equipmentItems = Object.entries(selectedEquipment)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const item = equipmentCatalog.find((eq) => eq.id === id);
      return {
        ...item,
        qty,
        total: (item ? item.rentalPrice : 0) * qty
      };
    });

  const equipmentSubtotal = equipmentItems.reduce((sum, item) => sum + item.total, 0);

  const coachSubtotal = selectedCoachSessions.reduce((sum, c) => sum + c.price, 0);

  const subtotal = slotSubtotal + equipmentSubtotal + coachSubtotal;
  const serviceFee = subtotal > 0 ? 10000 : 0;
  const tax = Math.round(subtotal * 0.11);
  const totalAmount = subtotal + serviceFee + tax;

  const totalItemCount = selectedSlots.length + equipmentItems.length + selectedCoachSessions.length;

  function handleSubmit(e) {
    e.preventDefault();
    if (totalItemCount === 0) return;
    if (!formData.name.trim() || !formData.whatsapp.trim()) return;

    onConfirmBooking({
      customerName: formData.name,
      whatsapp: formData.whatsapp,
      email: formData.email,
      paymentMethod: formData.paymentMethod === 'qris' ? 'QRIS Instant' : formData.paymentMethod === 'va' ? 'Virtual Account' : 'Bayar di Kasir',
      totalAmount,
      selectedSlots,
      equipmentItems,
      selectedCoachSessions
    });
  }

  return (
    <div
      className="cart-drawer-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <div>
            <h2 id="cart-drawer-title" className="modal-title">
              Ringkasan Reservasi
            </h2>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              {totalItemCount} item dipilih
            </span>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup ringkasan reservasi"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="cart-drawer-body">
          {totalItemCount === 0 ? (
            <div className="empty-state-box" style={{ padding: '36px 12px' }}>
              <div className="empty-icon-wrap" aria-hidden="true">
                <CourtIcon size={24} />
              </div>
              <h3 className="empty-state-title">Keranjang Reservasi Kosong</h3>
              <p className="empty-state-desc">
                Pilih slot lapangan yang tersedia, sewa raket, atau jadwalkan pelatih untuk melanjutkan ke tahap pembayaran.
              </p>
              <button type="button" className="btn-secondary" onClick={onClose}>
                Kembali ke Jadwal
              </button>
            </div>
          ) : (
            <>
              {selectedSlots.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Slot Lapangan ({selectedSlots.length})
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedSlots.map((slot) => (
                      <div key={`${slot.courtId}-${slot.slotId}`} className="cart-item-card">
                        <div>
                          <div className="cart-item-title">{slot.courtName}</div>
                          <div className="cart-item-subtitle">{slot.dateLabel} &bull; {slot.time}</div>
                          <div className="cart-item-price">{formatIDR(slot.price)}</div>
                        </div>
                        <button
                          type="button"
                          className="cart-remove-btn"
                          onClick={() => onRemoveSlot(slot.courtId, slot.slotId)}
                          aria-label={`Hapus slot ${slot.courtName} ${slot.time}`}
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {equipmentItems.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Rental Peralatan & Bola ({equipmentItems.length})
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {equipmentItems.map((item) => (
                      <div key={item.id} className="cart-item-card">
                        <div>
                          <div className="cart-item-title">{item.name}</div>
                          <div className="cart-item-subtitle">
                            {item.qty} &times; {formatIDR(item.rentalPrice)}
                          </div>
                          <div className="cart-item-price">{formatIDR(item.total)}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            type="button"
                            className="qty-btn"
                            style={{ width: '28px', height: '28px', minHeight: '28px' }}
                            onClick={() => onUpdateEquipmentQty(item.id, item.qty - 1)}
                            aria-label={`Kurangi ${item.name}`}
                          >
                            -
                          </button>
                          <span style={{ fontSize: '0.8125rem', fontWeight: 700 }}>{item.qty}</span>
                          <button
                            type="button"
                            className="qty-btn"
                            style={{ width: '28px', height: '28px', minHeight: '28px' }}
                            onClick={() => onUpdateEquipmentQty(item.id, item.qty + 1)}
                            aria-label={`Tambah ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedCoachSessions.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Sesi Pelatih ({selectedCoachSessions.length})
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedCoachSessions.map((c) => (
                      <div key={c.id} className="cart-item-card">
                        <div>
                          <div className="cart-item-title">{c.coachName}</div>
                          <div className="cart-item-subtitle">{c.sessionTypeLabel} &bull; {c.preferredDate}</div>
                          <div className="cart-item-price">{formatIDR(c.price)}</div>
                        </div>
                        <button
                          type="button"
                          className="cart-remove-btn"
                          onClick={() => onRemoveCoachSession(c.id)}
                          aria-label={`Hapus sesi coach ${c.coachName}`}
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <form id="checkout-form" onSubmit={handleSubmit} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Data Pemesan & Pembayaran
                </h3>

                <div className="form-group">
                  <label htmlFor="checkout-name" className="form-label">Nama Lengkap</label>
                  <input
                    id="checkout-name"
                    required
                    type="text"
                    className="form-input"
                    placeholder="Nama Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkout-wa" className="form-label">Nomor WhatsApp (Kirim Tiket Masuk)</label>
                  <input
                    id="checkout-wa"
                    required
                    type="tel"
                    className="form-input"
                    placeholder="0812-3456-7890"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkout-email" className="form-label">Alamat Email</label>
                  <input
                    id="checkout-email"
                    type="email"
                    className="form-input"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkout-payment" className="form-label">Metode Pembayaran</label>
                  <select
                    id="checkout-payment"
                    className="form-input"
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  >
                    <option value="qris">QRIS Instant (BCA, Gopay, OVO, ShopeePay)</option>
                    <option value="va">Transfer Virtual Account (BCA / Mandiri / BNI)</option>
                    <option value="cashier">Bayar di Kasir Club (Maksimal 30 menit sebelum sesi)</option>
                  </select>
                </div>
              </form>
            </>
          )}
        </div>

        {totalItemCount > 0 && (
          <div className="cart-drawer-footer">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div className="price-summary-row">
                <span>Subtotal Item</span>
                <span>{formatIDR(subtotal)}</span>
              </div>
              <div className="price-summary-row">
                <span>Biaya Layanan & Pemeliharaan</span>
                <span>{formatIDR(serviceFee)}</span>
              </div>
              <div className="price-summary-row">
                <span>PPN (11%)</span>
                <span>{formatIDR(tax)}</span>
              </div>
              <div className="price-summary-row total">
                <span>Total Bayar</span>
                <strong>{formatIDR(totalAmount)}</strong>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
            >
              Konfirmasi & Bayar Reservasi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
