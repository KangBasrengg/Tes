import { useState } from 'react';
import { UserIcon, CheckIcon } from './Icons';

export default function CoachesSection({ coaches, onAddCoachToCart }) {
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [sessionType, setSessionType] = useState('private');
  const [preferredDate, setPreferredDate] = useState('Besok, 17:00');
  const [studentLevel, setStudentLevel] = useState('Beginner');
  const [coachingNotes, setCoachingNotes] = useState('');

  function formatIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  function handleBookingSubmit(e) {
    e.preventDefault();
    if (!selectedCoach) return;

    let multiplier = 1;
    let typeLabel = 'Sesi Privat 1-on-1 (60 Menit)';
    if (sessionType === 'semi-private') {
      multiplier = 1.35;
      typeLabel = 'Sesi Semi-Privat 2 Orang (60 Menit)';
    } else if (sessionType === 'clinic') {
      multiplier = 1.8;
      typeLabel = 'Clinic Grup 4 Orang (90 Menit)';
    }

    const calculatedPrice = Math.round(selectedCoach.pricePerHour * multiplier);

    onAddCoachToCart({
      id: `coach-${selectedCoach.id}-${Date.now()}`,
      coachId: selectedCoach.id,
      coachName: selectedCoach.name,
      sessionTypeLabel: typeLabel,
      preferredDate,
      studentLevel,
      price: calculatedPrice,
      notes: coachingNotes
    });

    setSelectedCoach(null);
    setCoachingNotes('');
  }

  return (
    <section id="coaches" className="container" aria-labelledby="coaches-section-title">
      <div className="section-head">
        <div className="section-title-wrap">
          <div className="section-kicker">Pelatih & Akademi</div>
          <h2 id="coaches-section-title" className="section-title">
            Pelatih Bersertifikasi FIP & Nasional
          </h2>
          <p className="section-desc">
            Tingkatkan akurasi pukulan kaca (bajada & salida de pared), teknik overhead (bandeja & vibora), hingga strategi rotasi posisi lapangan.
          </p>
        </div>
      </div>

      <div className="coaches-grid">
        {coaches.map((c) => (
          <div key={c.id} className="coach-card">
            <div>
              <div className="coach-profile-top">
                <div className="coach-avatar-initials" aria-hidden="true">
                  {c.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="coach-name">{c.name}</h3>
                  <div className="coach-title">{c.title}</div>
                  <div className="coach-cert">{c.certification}</div>
                </div>
              </div>

              <div style={{ marginTop: '14px' }}>
                <p className="coach-bio-text">{c.bio}</p>
              </div>

              <div style={{ marginTop: '14px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
                  Fokus Pelatihan:
                </div>
                <div className="coach-specialties-wrap">
                  {c.specialties.map((s, idx) => (
                    <span key={idx} className="specialty-tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="coach-footer">
              <div className="coach-rate-box">
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tarif Sesi Mulai</span>
                <span className="coach-rate-val">{formatIDR(c.pricePerHour)} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)' }}>/ jam</span></span>
              </div>

              <button
                type="button"
                className="btn-primary"
                onClick={() => setSelectedCoach(c)}
              >
                Pesan Sesi Latihan
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCoach && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedCoach(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="coach-modal-title"
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span id="coach-modal-title" className="modal-title">
                Pesan Sesi Latihan bersama {selectedCoach.name}
              </span>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedCoach(null)}
                aria-label="Tutup form booking pelatih"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleBookingSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="session-type" className="form-label">Tipe Sesi Latihan</label>
                  <select
                    id="session-type"
                    className="form-input"
                    value={sessionType}
                    onChange={(e) => setSessionType(e.target.value)}
                  >
                    <option value="private">Privat 1-on-1 ({formatIDR(selectedCoach.pricePerHour)} / jam)</option>
                    <option value="semi-private">Semi-Privat 2 Orang ({formatIDR(Math.round(selectedCoach.pricePerHour * 1.35))} / jam)</option>
                    <option value="clinic">Clinic Grup 4 Orang ({formatIDR(Math.round(selectedCoach.pricePerHour * 1.8))} / 90 menit)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="preferred-date" className="form-label">Preferensi Jadwal Hari & Waktu</label>
                  <input
                    id="preferred-date"
                    required
                    type="text"
                    className="form-input"
                    placeholder="Contoh: Besok, jam 19:00"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="student-level" className="form-label">Tingkat Kemampuan Saat Ini</label>
                  <select
                    id="student-level"
                    className="form-input"
                    value={studentLevel}
                    onChange={(e) => setStudentLevel(e.target.value)}
                  >
                    <option value="Pemula Total">Pemula Total (Belum pernah main raket)</option>
                    <option value="Pemula Transisi">Pemula Transisi (Biasa main tenis/badminton)</option>
                    <option value="Intermediate">Intermediate (Ingin memperbaiki variasi smash & pantulan dinding)</option>
                    <option value="Kompetisi">Kompetisi (Persiapan turnamen klub)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="coaching-notes" className="form-label">Fokus Tertentu yang Ingin Dilatih</label>
                  <textarea
                    id="coaching-notes"
                    rows="2"
                    className="form-input"
                    placeholder="Contoh: Ingin fokus latihan bandeja dan posisi saat lawan melakukan lob..."
                    value={coachingNotes}
                    onChange={(e) => setCoachingNotes(e.target.value)}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setSelectedCoach(null)}
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn-primary">
                    Tambahkan ke Reservasi
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
