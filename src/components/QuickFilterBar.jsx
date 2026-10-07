import { useState, useEffect, useRef } from 'react';
import { SearchIcon, CalendarIcon, CheckIcon } from './Icons';

function CustomFilterDropdown({ label, value, options, onChange, ariaLabel }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.id === value) || options[0];

  return (
    <div className="custom-dropdown-container" ref={dropdownRef}>
      <button
        type="button"
        className={`custom-dropdown-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`${ariaLabel}: ${selectedOption.label}`}
      >
        <span className="dropdown-meta-label">{label}:</span>
        <span className="dropdown-selected-val">{selectedOption.label}</span>
        <svg
          className={`dropdown-chevron ${isOpen ? 'open' : ''}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="custom-dropdown-menu" role="listbox" aria-label={ariaLabel}>
          {options.map((opt) => {
            const isSelected = opt.id === value;
            return (
              <button
                key={opt.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`custom-dropdown-item ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  onChange(opt.id);
                  setIsOpen(false);
                }}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <CheckIcon size={14} className="dropdown-check-icon" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function QuickFilterBar({
  selectedDate,
  onSelectDate,
  selectedType,
  onSelectType,
  selectedTimeFilter,
  onSelectTimeFilter,
  searchQuery,
  onSearchChange
}) {
  const courtTypes = [
    { id: 'all', label: 'Semua Lapangan' },
    { id: 'panoramic', label: 'Panoramic Glass' },
    { id: 'indoor', label: 'Indoor Full AC' },
    { id: 'outdoor', label: 'Semi-Outdoor Canopy' }
  ];

  const timeFilters = [
    { id: 'all', label: 'Semua Jam' },
    { id: 'morning', label: 'Pagi (07:00 - 11:30)' },
    { id: 'evening', label: 'Sore & Malam (15:30 - 23:00)' }
  ];

  // Generate 7 upcoming quick days starting from today
  const today = new Date();
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'
  ];

  function toIso(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  const todayIso = toIso(today);

  const quickDays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = toIso(d);
    let label = dayNames[d.getDay()];
    if (i === 0) label = 'Hari Ini';
    if (i === 1) label = 'Besok';

    quickDays.push({
      iso,
      label,
      sub: `${d.getDate()} ${monthNames[d.getMonth()]}`
    });
  }

  const isQuickDaySelected = quickDays.some((d) => d.iso === selectedDate);

  return (
    <div className="quick-control-panel" role="region" aria-label="Filter Tanggal dan Lapangan">
      <div className="container control-bar-inner">
        {/* Search box memanjang di atas */}
        <div className="search-top-bar">
          <div className="search-input-box wide">
            <SearchIcon size={18} />
            <input
              type="text"
              placeholder="Cari lapangan, jenis lapangan (panoramic, indoor, canopy), atau fasilitas..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Cari lapangan atau fasilitas"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="search-clear-btn"
                aria-label="Hapus pencarian"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Baris Kalender & Dropdown Filter Tipe & Waktu */}
        <div className="date-header-row">
          <div className="calendar-form-card">
            <label htmlFor="calendar-date-picker" className="calendar-picker-label">
              <CalendarIcon size={18} />
              <span>Pilih Tanggal:</span>
            </label>
            <input
              id="calendar-date-picker"
              type="date"
              min={todayIso}
              value={selectedDate || todayIso}
              onChange={(e) => onSelectDate(e.target.value)}
              className="calendar-date-input"
              aria-label="Pilih tanggal reservasi dari kalender"
            />
          </div>

          <div className="dropdown-filter-group">
            <CustomFilterDropdown
              label="Tipe Lapangan"
              value={selectedType}
              options={courtTypes}
              onChange={onSelectType}
              ariaLabel="Filter Tipe Lapangan"
            />

            <CustomFilterDropdown
              label="Waktu Bermain"
              value={selectedTimeFilter}
              options={timeFilters}
              onChange={onSelectTimeFilter}
              ariaLabel="Filter Waktu Bermain"
            />

            {(selectedType !== 'all' || selectedTimeFilter !== 'all' || searchQuery) && (
              <button
                type="button"
                className="btn-reset-filters"
                onClick={() => {
                  onSelectType('all');
                  onSelectTimeFilter('all');
                  onSearchChange('');
                }}
                title="Reset semua filter"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Pilihan Cepat 7 Hari */}
        <div className="date-selector-row" role="radiogroup" aria-label="Pilihan Cepat Tanggal">
          {quickDays.map((d) => {
            const isSelected = selectedDate === d.iso;
            return (
              <button
                key={d.iso}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`date-pill-btn ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectDate(d.iso)}
              >
                <span className="date-day-name">{d.label}</span>
                <span className="date-num">{d.sub}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
