import { useState, useEffect } from 'react';
import { PadelRacketIcon, SunIcon, MoonIcon, CartIcon, MenuIcon, CloseIcon } from './Icons';

export default function Navbar({
  theme,
  onToggleTheme,
  cartCount,
  onOpenCart,
  activeTab,
  onSelectTab
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'courts', label: 'Lapangan & Jadwal', href: '#courts' },
    { id: 'open-matches', label: 'Open Match', href: '#open-matches' },
    { id: 'coaches', label: 'Pelatih & Akademi', href: '#coaches' },
    { id: 'pro-shop', label: 'Sewa Alat', href: '#pro-shop' },
    { id: 'my-bookings', label: 'Reservasi Saya', href: '#my-bookings' }
  ];

  function handleNavClick(id) {
    onSelectTab(id);
    setMobileMenuOpen(false);
  }

  return (
    <>
      <header className="main-header" role="banner">
        <div className="container header-container">
          <a
            href="#courts"
            className="brand-logo"
            onClick={() => handleNavClick('courts')}
            aria-label="Vortex Padel Arena Beranda"
          >
            <div className="brand-text">
              <span className="brand-title">VORTEX PADEL</span>
              <span className="brand-sub">Arena Club & Match</span>
            </div>
          </a>

          <nav className="nav-desktop" aria-label="Navigasi Utama">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="cart-toggle-btn"
              onClick={onOpenCart}
              aria-label={`Buka ringkasan reservasi, ${cartCount} item dipilih`}
            >
              <CartIcon size={18} />
              <span>Reservasi</span>
              {cartCount > 0 && (
                <span className="cart-badge" aria-live="polite">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="btn-icon mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Menu Navigasi Mobile"
        >
          <div
            className="modal-dialog"
            style={{ maxWidth: '340px', marginTop: '70px', alignSelf: 'flex-start' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <span className="modal-title">Menu Navigasi</span>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Tutup menu"
              >
                <CloseIcon size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                    style={{ fontSize: '1rem', padding: '12px' }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
