import { useState } from 'react';
import { CalendarIcon, CourtIcon, ClockIcon, CheckIcon } from './Icons';

export default function MyBookingsSection({
  bookings,
  onCancelBooking,
  onUpdateBooking,
  onExploreCourts
}) {
  const [activeQrModalBooking, setActiveQrModalBooking] = useState(null);
  const [cancelModalBooking, setCancelModalBooking] = useState(null);
  const [cancelFeedback, setCancelFeedback] = useState('');

  const [editBooking, setEditBooking] = useState(null);
  const [editForm, setEditForm] = useState({
    customerName: '',
    whatsapp: '',
    bookingDate: '',
    timeSlot: '18:30 - 20:00',
    notes: ''
  });

  function handleOpenEdit(b) {
    setEditBooking(b);
    setEditForm({
      customerName: b.customerName || '',
      whatsapp: b.whatsapp || '081234567890',
      bookingDate: b.bookingDate ? b.bookingDate.split(',')[0].trim() : 'Besok',
      timeSlot: '18:30 - 20:00',
      notes: ''
    });
  }

  function handleSaveEdit(e) {
    e.preventDefault();
    if (!editForm.customerName.trim()) return;

    if (onUpdateBooking) {
      onUpdateBooking(editBooking.id, {
        customerName: editForm.customerName.trim(),
        whatsapp: editForm.whatsapp.trim(),
        bookingDate: `${editForm.bookingDate}, ${editForm.timeSlot}`
      });
    }

    const code = editBooking.bookingCode;
    setEditBooking(null);
    setCancelFeedback(`Jadwal reservasi ${code} berhasil diperbarui.`);
    setTimeout(() => setCancelFeedback(''), 4000);
  }

  function formatIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  return (
    <section id="my-bookings" className="container" aria-labelledby="my-bookings-title">
      <div className="section-head">
        <div className="section-title-wrap">
          <div className="section-kicker">Riwayat & Tiket Masuk</div>
          <h2 id="my-bookings-title" className="section-title">
            Reservasi & Tiket Saya
          </h2>
          <p className="section-desc">
            Daftar reservasi lapangan, sewa raket, dan jadwal pelatih yang telah dikonfirmasi. Tunjukkan kode QR di pintu turnstile untuk akses masuk lapangan.
          </p>
        </div>
      </div>

      <div className="my-bookings-container">
        {cancelFeedback && (
          <div style={{
            backgroundColor: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid var(--court-rose)',
            color: 'var(--court-rose)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '16px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>&bull;</span>
            <span>{cancelFeedback}</span>
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="empty-state-box">
            <div className="empty-icon-wrap" aria-hidden="true">
              <CalendarIcon size={24} />
            </div>
            <h3 className="empty-state-title">Belum Ada Reservasi Aktif</h3>
            <p className="empty-state-desc">
              Anda belum melakukan booking lapangan, sewa raket, atau sesi pelatih. Pilih slot waktu yang tersedia untuk mulai bermain.
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={onExploreCourts}
            >
              <CourtIcon size={18} />
              <span>Jelajahi Lapangan Tersedia</span>
            </button>
          </div>
        ) : (
          <div>
            {bookings.map((b) => (
              <div key={b.id} className="booking-ticket-card">
                <div className="booking-ticket-header">
                  <div>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Kode Reservasi</span>
                    <div className="ticket-code">{b.bookingCode}</div>
                  </div>

                  <span className="ticket-status-badge">
                    {b.status || 'Terkonfirmasi'}
                  </span>
                </div>

                <div className="ticket-details-grid">
                  <div className="ticket-data-item">
                    <span>Nama Pemesan</span>
                    <strong>{b.customerName}</strong>
                  </div>

                  <div className="ticket-data-item">
                    <span>Waktu & Tanggal</span>
                    <strong>{b.bookingDate || 'Jadwal Terjadwal'}</strong>
                  </div>

                  <div className="ticket-data-item">
                    <span>Metode Pembayaran</span>
                    <strong>{b.paymentMethod || 'QRIS Instant'}</strong>
                  </div>

                  <div className="ticket-data-item">
                    <span>Total Pembayaran</span>
                    <strong style={{ color: 'var(--accent-volt)' }}>{formatIDR(b.totalAmount)}</strong>
                  </div>
                </div>

                {b.itemsSummary && (
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', background: 'var(--bg-card)', padding: '10px 12px', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Rincian Item: </span>
                    {b.itemsSummary}
                  </div>
                )}

                <div className="ticket-action-bar">
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ fontSize: '0.8125rem', padding: '6px 12px' }}
                    onClick={() => setActiveQrModalBooking(b)}
                  >
                    Tampilkan QR Akses Gerbang
                  </button>

                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ fontSize: '0.8125rem', padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    onClick={() => handleOpenEdit(b)}
                    aria-label={`Ubah atau reschedule jadwal reservasi ${b.bookingCode}`}
                  >
                    <CalendarIcon size={14} />
                    <span>Ubah Jadwal / Edit</span>
                  </button>

                  <button
                    type="button"
                    className="btn-cancel-ticket"
                    onClick={() => setCancelModalBooking(b)}
                    aria-label={`Batalkan reservasi ${b.bookingCode}`}
                  >
                    Batalkan Reservasi
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeQrModalBooking && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveQrModalBooking(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-modal-title"
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span id="qr-modal-title" className="modal-title">
                QR Akses Masuk Turnstile
              </span>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setActiveQrModalBooking(null)}
                aria-label="Tutup tiket QR"
              >
                &times;
              </button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center', alignItems: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Dekatkan barcode QR ini pada pemindai di pintu masuk lapangan 15 menit sebelum sesi dimulai.
              </div>

              <div style={{
                background: '#ffffff',
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                display: 'inline-block',
                margin: '16px auto',
                boxShadow: 'var(--shadow-md)'
              }}>
                <svg width="180" height="180" viewBox="0 0 100 100" fill="#0A0F1D">
                  <rect x="10" y="10" width="24" height="24" />
                  <rect x="14" y="14" width="16" height="16" fill="#fff" />
                  <rect x="18" y="18" width="8" height="8" />

                  <rect x="66" y="10" width="24" height="24" />
                  <rect x="70" y="14" width="16" height="16" fill="#fff" />
                  <rect x="74" y="18" width="8" height="8" />

                  <rect x="10" y="66" width="24" height="24" />
                  <rect x="14" y="70" width="16" height="16" fill="#fff" />
                  <rect x="18" y="74" width="8" height="8" />

                  <rect x="42" y="12" width="6" height="6" />
                  <rect x="52" y="12" width="6" height="18" />
                  <rect x="42" y="24" width="6" height="12" />
                  <rect x="12" y="44" width="18" height="6" />
                  <rect x="24" y="52" width="6" height="6" />
                  <rect x="42" y="42" width="16" height="16" />
                  <rect x="66" y="44" width="10" height="6" />
                  <rect x="80" y="44" width="8" height="18" />
                  <rect x="44" y="66" width="8" height="18" />
                  <rect x="58" y="68" width="16" height="6" />
                  <rect x="60" y="80" width="14" height="8" />
                </svg>
              </div>

              <div className="booking-code-pill" style={{ margin: '0 0 12px' }}>
                {activeQrModalBooking.bookingCode}
              </div>

              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Pemegang Tiket: {activeQrModalBooking.customerName} &bull; {activeQrModalBooking.bookingDate}
              </div>

              <button
                type="button"
                className="btn-primary"
                style={{ marginTop: '16px', width: '100%' }}
                onClick={() => setActiveQrModalBooking(null)}
              >
                Tutup QR Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {cancelModalBooking && (
        <div
          className="modal-backdrop"
          onClick={() => setCancelModalBooking(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-modal-title"
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span id="cancel-modal-title" className="modal-title" style={{ color: 'var(--court-rose)' }}>
                Konfirmasi Pembatalan Reservasi
              </span>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setCancelModalBooking(null)}
                aria-label="Tutup form pembatalan"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                Apakah Anda yakin ingin membatalkan reservasi ini?
              </p>

              <div style={{
                background: 'var(--bg-subtle)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                margin: '12px 0'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--accent-volt)', fontSize: '1rem' }}>
                  {cancelModalBooking.bookingCode}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {cancelModalBooking.bookingDate}
                </div>
                {cancelModalBooking.itemsSummary && (
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', marginTop: '4px', fontWeight: 500 }}>
                    {cancelModalBooking.itemsSummary}
                  </div>
                )}
                <div style={{ fontSize: '0.8125rem', color: 'var(--court-rose)', marginTop: '6px', fontWeight: 600 }}>
                  Total: {formatIDR(cancelModalBooking.totalAmount)}
                </div>
              </div>

              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                Slot lapangan akan dibebaskan kembali ke jadwal arena dan pemesanan akan dihapus dari daftar aktif Anda.
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setCancelModalBooking(null)}
                >
                  Kembali
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ backgroundColor: 'var(--court-rose)', borderColor: 'var(--court-rose)', color: '#ffffff' }}
                  onClick={() => {
                    const code = cancelModalBooking.bookingCode;
                    onCancelBooking(cancelModalBooking.id);
                    setCancelModalBooking(null);
                    setCancelFeedback(`Reservasi ${code} berhasil dibatalkan.`);
                    setTimeout(() => setCancelFeedback(''), 4000);
                  }}
                >
                  Ya, Batalkan Reservasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editBooking && (
        <div
          className="modal-backdrop"
          onClick={() => setEditBooking(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-modal-title"
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span id="edit-modal-title" className="modal-title">
                Ubah Jadwal / Edit Reservasi
              </span>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setEditBooking(null)}
                aria-label="Tutup form ubah jadwal"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="modal-body">
                <div style={{
                  background: 'var(--bg-subtle)',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '14px'
                }}>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Kode Tiket
                  </div>
                  <div style={{ fontWeight: 800, color: 'var(--accent-volt)', fontSize: '1.0625rem' }}>
                    {editBooking.bookingCode}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {editBooking.itemsSummary}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="edit-customer-name" className="form-label">Nama Pemesan</label>
                  <input
                    id="edit-customer-name"
                    required
                    type="text"
                    className="form-input"
                    value={editForm.customerName}
                    onChange={(e) => setEditForm({ ...editForm, customerName: e.target.value })}
                    placeholder="Contoh: Budi Pratama"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-whatsapp" className="form-label">Nomor WhatsApp</label>
                  <input
                    id="edit-whatsapp"
                    required
                    type="tel"
                    className="form-input"
                    value={editForm.whatsapp}
                    onChange={(e) => setEditForm({ ...editForm, whatsapp: e.target.value })}
                    placeholder="081234567890"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-group">
                    <label htmlFor="edit-date" className="form-label">Pilih Hari Main</label>
                    <select
                      id="edit-date"
                      className="form-input"
                      value={editForm.bookingDate}
                      onChange={(e) => setEditForm({ ...editForm, bookingDate: e.target.value })}
                    >
                      <option value="Hari Ini">Hari Ini</option>
                      <option value="Besok">Besok</option>
                      <option value="Lusa">Lusa</option>
                      <option value="Minggu Depan">Minggu Depan</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="edit-slot" className="form-label">Slot Waktu Baru</label>
                    <select
                      id="edit-slot"
                      className="form-input"
                      value={editForm.timeSlot}
                      onChange={(e) => setEditForm({ ...editForm, timeSlot: e.target.value })}
                    >
                      <option value="07:00 - 08:30">07:00 - 08:30 (Pagi)</option>
                      <option value="08:30 - 10:00">08:30 - 10:00 (Pagi)</option>
                      <option value="10:00 - 11:30">10:00 - 11:30 (Siang)</option>
                      <option value="15:30 - 17:00">15:30 - 17:00 (Sore)</option>
                      <option value="17:00 - 18:30">17:00 - 18:30 (Sore)</option>
                      <option value="18:30 - 20:00">18:30 - 20:00 (Prime Malam)</option>
                      <option value="20:00 - 21:30">20:00 - 21:30 (Prime Malam)</option>
                      <option value="21:30 - 23:00">21:30 - 23:00 (Late Night)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="edit-notes" className="form-label">Alasan / Catatan Perubahan (Opsional)</label>
                  <input
                    id="edit-notes"
                    type="text"
                    className="form-input"
                    value={editForm.notes}
                    onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                    placeholder="Contoh: Reschedule karena jadwal lembur kantor"
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setEditBooking(null)}
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn-primary">
                    Simpan Perubahan Jadwal
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
