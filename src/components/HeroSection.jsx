import { CourtIcon, TrophyIcon, UsersIcon, MapPinIcon } from './Icons';

export default function HeroSection({ onScrollToSection }) {
  return (
    <section className="hero-section" aria-labelledby="hero-main-title">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-headline-block">
            <h1 id="hero-main-title" className="hero-title">
              Booking Lapangan Padel Cepat, <span className="hero-highlight">Partner Sparring</span>, & Pelatih Profesional
            </h1>

            <p className="hero-subtitle">
              Pusat olahraga padel dengan 4 lapangan standar turnamen internasional, dinding kaca panoramic 12mm, rumput Mondo Supercourt XN, serta sistem reservasi slot instan tanpa antrean.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => onScrollToSection('courts')}
              >
                <CourtIcon size={18} />
                <span>Pilih Jadwal Lapangan</span>
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => onScrollToSection('open-matches')}
              >
                <UsersIcon size={18} />
                <span>Cari Lawan Sparring</span>
              </button>
            </div>

            <div className="court-stats-bar">
              <div className="stat-item-box">
                <div className="stat-icon" aria-hidden="true">
                  <CourtIcon size={20} />
                </div>
                <div>
                  <div className="stat-label">Spesifikasi Lapangan</div>
                  <div className="stat-value">4 Lapangan WPT Standar</div>
                </div>
              </div>

              <div className="stat-item-box">
                <div className="stat-icon" aria-hidden="true">
                  <TrophyIcon size={20} />
                </div>
                <div>
                  <div className="stat-label">Pencahayaan Arena</div>
                  <div className="stat-value">800 Lux LED Anti-Silau</div>
                </div>
              </div>

              <div className="stat-item-box">
                <div className="stat-icon" aria-hidden="true">
                  <MapPinIcon size={20} />
                </div>
                <div>
                  <div className="stat-label">Lokasi Fasilitas</div>
                  <div className="stat-value">Kemang Timur, Jaksel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
