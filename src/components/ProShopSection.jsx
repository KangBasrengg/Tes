import { useState, useRef } from 'react';
import { PadelRacketIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

export default function ProShopSection({
  equipment,
  selectedEquipment,
  onUpdateEquipmentQty
}) {
  const eqSliderRef = useRef(null);

  function handleScrollEq(direction) {
    if (eqSliderRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      eqSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  const [activeCategory, setActiveCategory] = useState('all');

  function formatIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  const filteredItems = equipment.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'racket') return item.category === 'racket';
    if (activeCategory === 'accessory') return item.category === 'accessory';
    if (activeCategory === 'rental') return item.category === 'rental';
    return true;
  });

  return (
    <section id="pro-shop" className="container" aria-labelledby="pro-shop-title">
      <div className="section-head">
        <div className="section-title-wrap">
          <div className="section-kicker">Rental Alat & Pro Shop</div>
          <h2 id="pro-shop-title" className="section-title">
            Peralatan Standar Turnamen Dunia
          </h2>
          <p className="section-desc">
            Sewa raket bersertifikasi WPT, beli kaleng bola segar bertekanan optimal, hingga rental sepatu bersol herringbone khusus rumput padel.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="chip-group" role="group" aria-label="Filter Kategori Peralatan">
            <button
              type="button"
              className={`filter-chip ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              Semua Perlengkapan
            </button>
            <button
              type="button"
              className={`filter-chip ${activeCategory === 'racket' ? 'active' : ''}`}
              onClick={() => setActiveCategory('racket')}
            >
              Raket Rental
            </button>
            <button
              type="button"
              className={`filter-chip ${activeCategory === 'accessory' ? 'active' : ''}`}
              onClick={() => setActiveCategory('accessory')}
            >
              Bola & Grip
            </button>
            <button
              type="button"
              className={`filter-chip ${activeCategory === 'rental' ? 'active' : ''}`}
              onClick={() => setActiveCategory('rental')}
            >
              Sepatu Padel
            </button>
          </div>

          {filteredItems.length > 0 && (
            <div className="slider-nav-controls">
              <div className="slider-btn-group">
                <button
                  type="button"
                  className="slider-nav-btn"
                  onClick={() => handleScrollEq('left')}
                  aria-label="Geser peralatan ke kiri"
                  title="Peralatan Sebelumnya"
                >
                  <ChevronLeftIcon size={20} />
                </button>
                <button
                  type="button"
                  className="slider-nav-btn"
                  onClick={() => handleScrollEq('right')}
                  aria-label="Geser peralatan ke kanan"
                  title="Peralatan Selanjutnya"
                >
                  <ChevronRightIcon size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="equipment-slider-wrapper">
        <div
          className="equipment-slider"
          ref={eqSliderRef}
          tabIndex="0"
          role="region"
          aria-label="Slider Peralatan Padel"
        >
        {filteredItems.map((item) => {
          const currentQty = selectedEquipment[item.id] || 0;

          return (
            <div key={item.id} className="eq-card">
              <div>
                <div className="eq-header">
                  <span className="eq-tag">{item.imageTag}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {item.brand}
                  </span>
                </div>

                <h3 className="eq-name">{item.name}</h3>

                <div className="eq-specs-grid" style={{ marginTop: '10px' }}>
                  <div>
                    <span className="eq-spec-key">Bentuk / Sol:</span>
                  </div>
                  <div className="eq-spec-val">{item.shape}</div>

                  <div>
                    <span className="eq-spec-key">Keseimbangan:</span>
                  </div>
                  <div className="eq-spec-val">{item.balance}</div>

                  <div>
                    <span className="eq-spec-key">Permukaan:</span>
                  </div>
                  <div className="eq-spec-val">{item.surface}</div>

                  <div>
                    <span className="eq-spec-key">Rekomendasi:</span>
                  </div>
                  <div className="eq-spec-val">{item.level}</div>
                </div>

                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: 1.45 }}>
                  {item.description}
                </p>
              </div>

              <div className="eq-footer">
                <div className="eq-price-box">
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {item.isPurchase ? 'Harga Beli Baru' : 'Biaya Sewa / Sesi'}
                  </span>
                  <span className="eq-price-num">{formatIDR(item.rentalPrice)}</span>
                </div>

                <div className="qty-control" aria-label={`Jumlah untuk ${item.name}`}>
                  <button
                    type="button"
                    className="qty-btn"
                    disabled={currentQty === 0}
                    onClick={() => onUpdateEquipmentQty(item.id, currentQty - 1)}
                    aria-label={`Kurangi jumlah ${item.name}`}
                  >
                    -
                  </button>
                  <span className="qty-val" aria-live="polite">
                    {currentQty}
                  </span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => onUpdateEquipmentQty(item.id, currentQty + 1)}
                    aria-label={`Tambah jumlah ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
