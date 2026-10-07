import { useState, useRef } from 'react';
import { UsersIcon, CheckIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

export default function OpenMatchSection({
  matches,
  onJoinMatch,
  onCreateMatch
}) {
  const matchSliderRef = useRef(null);

  function handleScrollMatches(direction) {
    if (matchSliderRef.current) {
      const scrollAmount = direction === 'left' ? -440 : 440;
      matchSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  const [levelFilter, setLevelFilter] = useState('all');
  const [selectedMatchToJoin, setSelectedMatchToJoin] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [joinForm, setJoinForm] = useState({
    name: '',
    rating: '3.0',
    whatsapp: ''
  });

  const [newMatchForm, setNewMatchForm] = useState({
    title: '',
    courtName: 'Center Court Alpha',
    date: 'Besok',
    time: '19:00 - 20:30',
    level: 'Intermediate (3.0 - 3.5)',
    levelCategory: 'intermediate',
    category: 'Campuran (Mixed)',
    pricePerPerson: 135000,
    hostName: '',
    hostRating: '3.0',
    notes: ''
  });

  function formatIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  const filteredMatches = matches.filter((m) => {
    if (levelFilter === 'all') return true;
    return m.levelCategory === levelFilter;
  });

  function handleJoinSubmit(e) {
    e.preventDefault();
    if (!joinForm.name.trim()) return;

    onJoinMatch(selectedMatchToJoin.id, {
      name: joinForm.name,
      rating: joinForm.rating,
      initials: joinForm.name.slice(0, 2).toUpperCase()
    });

    setSelectedMatchToJoin(null);
    setJoinForm({ name: '', rating: '3.0', whatsapp: '' });
  }

  function handleCreateSubmit(e) {
    e.preventDefault();
    if (!newMatchForm.title.trim() || !newMatchForm.hostName.trim()) return;

    onCreateMatch({
      id: `match-custom-${Date.now()}`,
      title: newMatchForm.title,
      courtName: newMatchForm.courtName,
      date: newMatchForm.date,
      time: newMatchForm.time,
      level: newMatchForm.level,
      levelCategory: newMatchForm.levelCategory,
      category: newMatchForm.category,
      pricePerPerson: Number(newMatchForm.pricePerPerson),
      host: {
        name: newMatchForm.hostName,
        initials: newMatchForm.hostName.slice(0, 2).toUpperCase(),
        rating: `Level ${newMatchForm.hostRating}`
      },
      totalSlots: 4,
      filledSlots: 1,
      players: [
        {
          name: `${newMatchForm.hostName} (Host)`,
          rating: newMatchForm.hostRating,
          initials: newMatchForm.hostName.slice(0, 2).toUpperCase()
        }
      ],
      notes: newMatchForm.notes || 'Pertandingan komunitas santai dan fair play.'
    });

    setShowCreateModal(false);
    setNewMatchForm({
      title: '',
      courtName: 'Center Court Alpha',
      date: 'Besok',
      time: '19:00 - 20:30',
      level: 'Intermediate (3.0 - 3.5)',
      levelCategory: 'intermediate',
      category: 'Campuran (Mixed)',
      pricePerPerson: 135000,
      hostName: '',
      hostRating: '3.0',
      notes: ''
    });
  }

  return (
    <section id="open-matches" className="container" aria-labelledby="open-matches-title">
      <div className="section-head">
        <div className="section-title-wrap">
          <div className="section-kicker">Komunitas & Matchmaking</div>
          <h2 id="open-matches-title" className="section-title">
            Open Match & Partner Sparring
          </h2>
          <p className="section-desc">
            Kurang pemain untuk ganda 4 orang? Gabung ke sesi match yang sedang mencari partner berdasarkan tingkat keterampilan Anda.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="chip-group" role="group" aria-label="Filter Tingkat Keterampilan">
            <button
              type="button"
              className={`filter-chip ${levelFilter === 'all' ? 'active' : ''}`}
              onClick={() => setLevelFilter('all')}
            >
              Semua Level
            </button>
            <button
              type="button"
              className={`filter-chip ${levelFilter === 'beginner' ? 'active' : ''}`}
              onClick={() => setLevelFilter('beginner')}
            >
              Beginner
            </button>
            <button
              type="button"
              className={`filter-chip ${levelFilter === 'intermediate' ? 'active' : ''}`}
              onClick={() => setLevelFilter('intermediate')}
            >
              Intermediate
            </button>
            <button
              type="button"
              className={`filter-chip ${levelFilter === 'advanced' ? 'active' : ''}`}
              onClick={() => setLevelFilter('advanced')}
            >
              Advanced
            </button>
          </div>

          {filteredMatches.length > 0 && (
            <div className="slider-nav-controls">
              <div className="slider-btn-group">
                <button
                  type="button"
                  className="slider-nav-btn"
                  onClick={() => handleScrollMatches('left')}
                  aria-label="Geser pertandingan ke kiri"
                  title="Sesi Sebelumnya"
                >
                  <ChevronLeftIcon size={20} />
                </button>
                <button
                  type="button"
                  className="slider-nav-btn"
                  onClick={() => handleScrollMatches('right')}
                  aria-label="Geser pertandingan ke kanan"
                  title="Sesi Selanjutnya"
                >
                  <ChevronRightIcon size={20} />
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <UsersIcon size={16} />
            <span>Buat Open Match</span>
          </button>
        </div>
      </div>

      {filteredMatches.length === 0 ? (
        <div className="empty-state-box">
          <div className="empty-icon-wrap" aria-hidden="true">
            <UsersIcon size={24} />
          </div>
          <h3 className="empty-state-title">Belum Ada Sesi untuk Kategori Ini</h3>
          <p className="empty-state-desc">
            Tidak ada open match yang sesuai dengan filter tingkat keterampilan saat ini. Anda dapat membuat open match baru dan mengundang pemain lain.
          </p>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setLevelFilter('all')}
          >
            Reset Filter Level
          </button>
        </div>
      ) : (
        <div className="matches-slider-wrapper">
          <div
            className="matches-slider"
            ref={matchSliderRef}
            tabIndex="0"
            role="region"
            aria-label="Slider Open Match"
          >
          {filteredMatches.map((m) => {
            const isFull = m.filledSlots >= m.totalSlots;
            const emptyCount = m.totalSlots - m.filledSlots;

            return (
              <div key={m.id} className="match-card">
                <div>
                  <div className="match-header">
                    <span className="match-level-badge">{m.level}</span>
                    <span className="match-time-tag">
                      <ClockIcon size={14} />
                      <span>{m.date}, {m.time}</span>
                    </span>
                  </div>

                  <h3 className="match-title">{m.title}</h3>
                  <div className="match-court-name">{m.courtName} &bull; {m.category}</div>
                </div>

                <div className="match-slots-visual">
                  <div className="slots-visual-header">
                    <span>Status Slot ({m.filledSlots}/{m.totalSlots} Terisi)</span>
                    <span style={{ color: isFull ? 'var(--court-rose)' : 'var(--accent-volt)' }}>
                      {isFull ? 'Slot Penuh' : `Kurang ${emptyCount} Pemain`}
                    </span>
                  </div>

                  <div className="slots-avatar-row">
                    {m.players.map((p, idx) => (
                      <div key={idx} className="player-slot-box" title={`${p.name} (Lvl ${p.rating})`}>
                        <div className="player-avatar">{p.initials}</div>
                        <span className="player-name-short">{p.name.split(' ')[0]}</span>
                      </div>
                    ))}
                    {Array.from({ length: emptyCount }).map((_, idx) => (
                      <div key={`empty-${idx}`} className="player-slot-box">
                        <div className="player-avatar empty">?</div>
                        <span className="player-name-short">Kosong</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="match-notes-box">
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Catatan Host: </span>
                  {m.notes}
                </div>

                <div className="match-footer">
                  <div className="match-cost-info">
                    <span className="match-cost-label">Biaya / Orang</span>
                    <span className="match-price-amount">{formatIDR(m.pricePerPerson)}</span>
                  </div>

                  <button
                    type="button"
                    disabled={isFull}
                    className="btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.875rem' }}
                    onClick={() => setSelectedMatchToJoin(m)}
                  >
                    {isFull ? 'Sudah Penuh' : 'Gabung Pertandingan'}
                  </button>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      )}

      {selectedMatchToJoin && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedMatchToJoin(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="join-match-title"
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span id="join-match-title" className="modal-title">
                Gabung Open Match
              </span>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedMatchToJoin(null)}
                aria-label="Tutup form gabung match"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleJoinSubmit}>
              <div className="modal-body">
                <div style={{ background: 'var(--bg-subtle)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{selectedMatchToJoin.title}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {selectedMatchToJoin.courtName} &bull; {selectedMatchToJoin.date}, {selectedMatchToJoin.time}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--accent-volt)', marginTop: '4px', fontWeight: 600 }}>
                    Biaya: {formatIDR(selectedMatchToJoin.pricePerPerson)} per pemain
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="player-name" className="form-label">Nama Lengkap</label>
                  <input
                    id="player-name"
                    required
                    type="text"
                    className="form-input"
                    placeholder="Contoh: Budi Pratama"
                    value={joinForm.name}
                    onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="player-rating" className="form-label">Level / Rating Padel (Perkiraan NTRP/Playtomic)</label>
                  <select
                    id="player-rating"
                    className="form-input"
                    value={joinForm.rating}
                    onChange={(e) => setJoinForm({ ...joinForm, rating: e.target.value })}
                  >
                    <option value="2.0">Level 2.0 (Pemula, belajar rally)</option>
                    <option value="2.5">Level 2.5 (Paham posisi & aturan)</option>
                    <option value="3.0">Level 3.0 (Konsisten rally sedang)</option>
                    <option value="3.5">Level 3.5 (Kontrol dinding kaca baik)</option>
                    <option value="4.0">Level 4.0 (Pukulan cepat & taktis)</option>
                    <option value="4.5">Level 4.5+ (Kompetitif turnamen)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="player-wa" className="form-label">Nomor WhatsApp (Untuk koordinasi)</label>
                  <input
                    id="player-wa"
                    required
                    type="tel"
                    className="form-input"
                    placeholder="081234567890"
                    value={joinForm.whatsapp}
                    onChange={(e) => setJoinForm({ ...joinForm, whatsapp: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setSelectedMatchToJoin(null)}
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn-primary">
                    Konfirmasi Gabung
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowCreateModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-match-title"
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span id="create-match-title" className="modal-title">
                Buka Sesi Open Match Baru
              </span>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowCreateModal(false)}
                aria-label="Tutup form open match"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleCreateSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="create-title" className="form-label">Judul Sesi Pertandingan</label>
                  <input
                    id="create-title"
                    required
                    type="text"
                    className="form-input"
                    placeholder="Contoh: Sparring Ganda Sore Santai"
                    value={newMatchForm.title}
                    onChange={(e) => setNewMatchForm({ ...newMatchForm, title: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-group">
                    <label htmlFor="create-court" className="form-label">Lapangan</label>
                    <select
                      id="create-court"
                      className="form-input"
                      value={newMatchForm.courtName}
                      onChange={(e) => setNewMatchForm({ ...newMatchForm, courtName: e.target.value })}
                    >
                      <option value="Center Court Alpha">Center Court Alpha</option>
                      <option value="Court Bravo (Pro Indoor)">Court Bravo (Pro Indoor)</option>
                      <option value="Court Charlie (Sunset Canopy)">Court Charlie</option>
                      <option value="Court Delta (Club Panoramic)">Court Delta</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="create-time" className="form-label">Waktu Sesi</label>
                    <input
                      id="create-time"
                      required
                      type="text"
                      className="form-input"
                      placeholder="18:30 - 20:00"
                      value={newMatchForm.time}
                      onChange={(e) => setNewMatchForm({ ...newMatchForm, time: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-group">
                    <label htmlFor="create-level" className="form-label">Level Target</label>
                    <select
                      id="create-level"
                      className="form-input"
                      value={newMatchForm.levelCategory}
                      onChange={(e) => {
                        const cat = e.target.value;
                        const labelMap = {
                          beginner: 'Beginner (1.5 - 2.5)',
                          intermediate: 'Intermediate (3.0 - 3.5)',
                          advanced: 'Advanced (4.0+)'
                        };
                        setNewMatchForm({
                          ...newMatchForm,
                          levelCategory: cat,
                          level: labelMap[cat]
                        });
                      }}
                    >
                      <option value="beginner">Beginner (1.5 - 2.5)</option>
                      <option value="intermediate">Intermediate (3.0 - 3.5)</option>
                      <option value="advanced">Advanced (4.0+)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="create-price" className="form-label">Split Biaya / Orang (Rp)</label>
                    <input
                      id="create-price"
                      required
                      type="number"
                      className="form-input"
                      value={newMatchForm.pricePerPerson}
                      onChange={(e) => setNewMatchForm({ ...newMatchForm, pricePerPerson: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-group">
                    <label htmlFor="create-host-name" className="form-label">Nama Anda (Host)</label>
                    <input
                      id="create-host-name"
                      required
                      type="text"
                      className="form-input"
                      placeholder="Nama Host"
                      value={newMatchForm.hostName}
                      onChange={(e) => setNewMatchForm({ ...newMatchForm, hostName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="create-host-rating" className="form-label">Rating Anda</label>
                    <input
                      id="create-host-rating"
                      required
                      type="text"
                      className="form-input"
                      placeholder="Contoh: 3.2"
                      value={newMatchForm.hostRating}
                      onChange={(e) => setNewMatchForm({ ...newMatchForm, hostRating: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="create-notes" className="form-label">Catatan Tambahan untuk Pemain</label>
                  <textarea
                    id="create-notes"
                    rows="2"
                    className="form-input"
                    placeholder="Contoh: Bawa bola baru masing-masing, warmup 10 menit..."
                    value={newMatchForm.notes}
                    onChange={(e) => setNewMatchForm({ ...newMatchForm, notes: e.target.value })}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn-primary">
                    Publikasikan Match
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
