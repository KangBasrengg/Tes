import { useState } from 'react';
import { CheckIcon } from './Icons';

export default function BookingSuccessModal({
  bookingData,
  onClose,
  onGoToMyBookings
}) {
  const [copied, setCopied] = useState(false);

  if (!bookingData) return null;

  function handleCopy() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(bookingData.bookingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function formatIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span id="success-modal-title" className="modal-title">
            Reservasi Berhasil Dikonfirmasi
          </span>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Tutup konfirmasi reservasi"
          >
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="success-card">
            <div className="success-icon-badge" aria-hidden="true">
              <CheckIcon size={32} />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Terima Kasih, {bookingData.customerName}!
            </h3>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '360px' }}>
              Bukti reservasi dan kode QR akses gerbang telah dicatat di sistem Vortex Padel Arena.
            </p>

            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Kode Tiket Gerbang
              </div>
              <div className="booking-code-pill">
                {bookingData.bookingCode}
              </div>
            </div>

            <div style={{
              background: '#ffffff',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              display: 'inline-block',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <svg width="140" height="140" viewBox="0 0 100 100" fill="#0A0F1D">
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

            <div style={{
              width: '100%',
              background: 'var(--bg-subtle)',
              padding: '14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.8125rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>WhatsApp Notifikasi: </span>
                <strong style={{ color: 'var(--text-primary)' }}>{bookingData.whatsapp}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Metode Bayar: </span>
                <strong style={{ color: 'var(--text-primary)' }}>{bookingData.paymentMethod}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Total Dibayarkan: </span>
                <strong style={{ color: 'var(--accent-volt)' }}>{formatIDR(bookingData.totalAmount)}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', width: '100%', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-secondary"
                style={{ flex: 1 }}
                onClick={handleCopy}
              >
                {copied ? 'Tersalin!' : 'Salin Kode'}
              </button>
              <button
                type="button"
                className="btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  onClose();
                  onGoToMyBookings();
                }}
              >
                Lihat di Tiket Saya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
