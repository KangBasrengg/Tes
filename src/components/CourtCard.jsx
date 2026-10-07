import { useState } from 'react';
import { CheckIcon, ClockIcon } from './Icons';

export default function CourtCard({
  court,
  timeFilter,
  selectedSlots,
  onToggleSlot,
  selectedDateLabel
}) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredSlots = court.slots.filter((slot) => {
    if (timeFilter === 'morning') {
      const startHour = parseInt(slot.time.split(':')[0], 10);
      return startHour < 12;
    }
    if (timeFilter === 'evening') {
      const startHour = parseInt(slot.time.split(':')[0], 10);
      return startHour >= 12;
    }
    return true;
  });

  function formatIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  return (
    <>
      <div className="court-card" id={court.id}>
        <div className="court-header-preview">
          <div className="court-badge-row">
            <span className="court-type-pill">{court.typeLabel}</span>
            <div className="court-price-tag">
              Mulai <strong>{formatIDR(court.pricePerHour)}</strong> / jam
            </div>
          </div>

          <h3 className="court-title">{court.name}</h3>
          <p className="court-surface-meta">{court.surface} ({court.environment})</p>
        </div>

        <div className="court-features-list">
          {court.features.slice(0, 3).map((feat, i) => (
            <div key={i} className="feature-bullet">
              <span className="bullet-icon" aria-hidden="true">
                <CheckIcon size={14} />
              </span>
              <span>{feat}</span>
            </div>
          ))}
        </div>

        <div className="court-slots-section">
          <div className="slots-section-title">
            <span>Pilih Slot Waktu (Sesi 90 Menit)</span>
            <button
              type="button"
              style={{ fontSize: '0.75rem', color: 'var(--accent-volt)', textDecoration: 'underline' }}
              onClick={() => setShowDetailsModal(true)}
            >
              Lihat Detail
            </button>
          </div>

          <div className="slots-grid">
            {filteredSlots.map((slot) => {
              const isSelected = selectedSlots.some(
                (s) => s.courtId === court.id && s.slotId === slot.id
              );
              const isBooked = slot.status === 'booked';

              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={isBooked}
                  className={`slot-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => onToggleSlot(court, slot)}
                  aria-pressed={isSelected}
                  aria-label={`${slot.time}, harga ${formatIDR(slot.price)}, status ${isBooked ? 'sudah dipesan' : isSelected ? 'dipilih' : 'tersedia'}`}
                >
                  <div className="slot-time-text">
                    <span>{slot.time}</span>
                    {isSelected && <CheckIcon size={16} />}
                  </div>
                  <div className="slot-meta-row">
                    <span className="slot-price">{formatIDR(slot.price)}</span>
                    <span className={`slot-status-label ${slot.isPeak ? 'peak' : ''}`}>
                      {isBooked ? 'Sudah Dipesan' : slot.isPeak ? 'Slot Malam' : 'Reguler'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {showDetailsModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowDetailsModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${court.id}`}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span id={`modal-title-${court.id}`} className="modal-title">
                {court.name}
              </span>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowDetailsModal(false)}
                aria-label="Tutup detail lapangan"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                {court.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.875rem' }}>
                <div style={{ background: 'var(--bg-subtle)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Tinggi Langit-Langit</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>{court.ceilingHeight}</div>
                </div>

                <div style={{ background: 'var(--bg-subtle)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Pencahayaan</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>{court.lighting}</div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  Kelengkapan Lapangan
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  {court.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--accent-volt)' }}>&bull;</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setShowDetailsModal(false)}
                >
                  Tutup dan Pilih Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
