import { PadelRacketIcon, MapPinIcon, ClockIcon } from './Icons';
import { CLUB_INFO } from '../data/padelData';

export default function Footer({ onScrollToSection }) {
  return (
    <footer className="main-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand-logo" style={{ marginBottom: '10px' }}>
              <div className="brand-text">
                <span className="brand-title">VORTEX PADEL</span>
                <span className="brand-sub">Arena Club & Match</span>
              </div>
            </div>

            <p className="footer-brand-desc">
              Pusat olahraga padel di Jakarta Selatan yang didedikasikan untuk membangun komunitas pemain aktif dari tingkat pemula hingga turnamen resmi.
            </p>

            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPinIcon size={16} />
                <span>{CLUB_INFO.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ClockIcon size={16} />
                <span>{CLUB_INFO.openingHours}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Navigasi Fasilitas</div>
            <ul className="footer-list">
              <li>
                <a
                  href="#courts"
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollToSection('courts');
                  }}
                >
                  Jadwal & Lapangan
                </a>
              </li>
              <li>
                <a
                  href="#open-matches"
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollToSection('open-matches');
                  }}
                >
                  Cari Lawan Sparring
                </a>
              </li>
              <li>
                <a
                  href="#coaches"
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollToSection('coaches');
                  }}
                >
                  Pelatih & Akademi
                </a>
              </li>
              <li>
                <a
                  href="#pro-shop"
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollToSection('pro-shop');
                  }}
                >
                  Rental Raket & Toko Bola
                </a>
              </li>
              <li>
                <a
                  href="#my-bookings"
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollToSection('my-bookings');
                  }}
                >
                  Cek Reservasi Saya
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Peraturan Club Padel</div>
            <ul className="footer-list" style={{ fontSize: '0.8125rem' }}>
              {CLUB_INFO.rules.map((rule, idx) => (
                <li key={idx} style={{ lineHeight: 1.45 }}>
                  &bull; {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div>
            &copy; 2026 Vortex Padel Arena. Hak cipta dilindungi undang-undang.
          </div>
          <div>
            Kontak Club WhatsApp: {CLUB_INFO.phone}
          </div>
        </div>
      </div>
    </footer>
  );
}
