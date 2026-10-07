import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import QuickFilterBar from './components/QuickFilterBar';
import CourtCard from './components/CourtCard';
import OpenMatchSection from './components/OpenMatchSection';
import CoachesSection from './components/CoachesSection';
import ProShopSection from './components/ProShopSection';
import MyBookingsSection from './components/MyBookingsSection';
import CartDrawer from './components/CartDrawer';
import BookingSuccessModal from './components/BookingSuccessModal';
import Footer from './components/Footer';
import { ChevronLeftIcon, ChevronRightIcon } from './components/Icons';

import {
  COURTS_DATA,
  OPEN_MATCHES_DATA,
  COACHES_DATA,
  EQUIPMENT_DATA
} from './data/padelData';

export default function App() {
  const [theme] = useState('light');

  const [activeTab, setActiveTab] = useState('courts');
  const todayIso = (() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  })();

  const [selectedDate, setSelectedDate] = useState(todayIso);

  function formatDateLabel(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    const d = parseInt(parts[2], 10);
    const target = new Date(y, m - 1, d);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'
    ];

    const dayName = dayNames[target.getDay()];
    const monthName = monthNames[target.getMonth()];

    if (diffDays === 0) return `Hari Ini (${d} ${monthName} ${y})`;
    if (diffDays === 1) return `Besok (${d} ${monthName} ${y})`;
    return `${dayName}, ${d} ${monthName} ${y}`;
  }

  const activeDateLabel = formatDateLabel(selectedDate);

  const [selectedCourtType, setSelectedCourtType] = useState('all');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [courtsData, setCourtsData] = useState(COURTS_DATA);
  const [openMatches, setOpenMatches] = useState(OPEN_MATCHES_DATA);

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState({});
  const [selectedCoachSessions, setSelectedCoachSessions] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [successBookingData, setSuccessBookingData] = useState(null);

  const [myBookings, setMyBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('vortex_padel_bookings');
      return saved ? JSON.parse(saved) : [
        {
          id: 'demo-b-1',
          bookingCode: 'VP-2026-9142',
          customerName: 'Rayhan Pratama',
          bookingDate: 'Hari Ini, 18:30 - 20:00',
          totalAmount: 580000,
          paymentMethod: 'QRIS Instant',
          status: 'Terkonfirmasi',
          itemsSummary: 'Center Court Alpha (18:30 - 20:00) + 1x Babolat Viper 2025'
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('vortex_theme', 'light');
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('vortex_padel_bookings', JSON.stringify(myBookings));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [myBookings]);

  function handleScrollToSection(sectionId) {
    setActiveTab(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const courtsSliderRef = useRef(null);

  function handleScrollCourts(direction) {
    if (courtsSliderRef.current) {
      const scrollAmount = direction === 'left' ? -540 : 540;
      courtsSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  function handleToggleSlot(court, slot) {
    const isAlreadySelected = selectedSlots.some(
      (s) => s.courtId === court.id && s.slotId === slot.id
    );

    if (isAlreadySelected) {
      setSelectedSlots(
        selectedSlots.filter(
          (s) => !(s.courtId === court.id && s.slotId === slot.id)
        )
      );
    } else {
      setSelectedSlots([
        ...selectedSlots,
        {
          courtId: court.id,
          courtName: court.name,
          slotId: slot.id,
          time: slot.time,
          dateLabel: activeDateLabel,
          price: slot.price
        }
      ]);
    }
  }

  function handleRemoveSlot(courtId, slotId) {
    setSelectedSlots(
      selectedSlots.filter(
        (s) => !(s.courtId === courtId && s.slotId === slotId)
      )
    );
  }

  function handleUpdateEquipmentQty(itemId, newQty) {
    setSelectedEquipment((prev) => ({
      ...prev,
      [itemId]: Math.max(0, newQty)
    }));
  }

  function handleAddCoachSession(sessionObj) {
    setSelectedCoachSessions((prev) => [...prev, sessionObj]);
    setIsCartOpen(true);
  }

  function handleRemoveCoachSession(sessionId) {
    setSelectedCoachSessions((prev) => prev.filter((s) => s.id !== sessionId));
  }

  function handleJoinMatch(matchId, playerData) {
    setOpenMatches((prev) =>
      prev.map((m) => {
        if (m.id === matchId && m.filledSlots < m.totalSlots) {
          return {
            ...m,
            filledSlots: m.filledSlots + 1,
            players: [...m.players, playerData]
          };
        }
        return m;
      })
    );
  }

  function handleCreateMatch(newMatchObj) {
    setOpenMatches((prev) => [newMatchObj, ...prev]);
  }

  function handleConfirmBooking(checkoutData) {
    const randomCode = `VP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const itemsSummaryList = [];
    if (checkoutData.selectedSlots.length > 0) {
      itemsSummaryList.push(
        checkoutData.selectedSlots.map((s) => `${s.courtName} (${s.time})`).join(', ')
      );
    }
    if (checkoutData.equipmentItems.length > 0) {
      itemsSummaryList.push(
        checkoutData.equipmentItems.map((e) => `${e.qty}x ${e.name}`).join(', ')
      );
    }
    if (checkoutData.selectedCoachSessions.length > 0) {
      itemsSummaryList.push(
        checkoutData.selectedCoachSessions.map((c) => `Coach ${c.coachName}`).join(', ')
      );
    }

    const newBooking = {
      id: `booking-${Date.now()}`,
      bookingCode: randomCode,
      customerName: checkoutData.customerName,
      whatsapp: checkoutData.whatsapp,
      email: checkoutData.email,
      bookingDate: activeDateLabel,
      paymentMethod: checkoutData.paymentMethod,
      totalAmount: checkoutData.totalAmount,
      status: 'Terkonfirmasi',
      itemsSummary: itemsSummaryList.join(' + ')
    };

    setCourtsData((prev) =>
      prev.map((court) => {
        const bookedForThisCourt = checkoutData.selectedSlots
          .filter((s) => s.courtId === court.id)
          .map((s) => s.slotId);

        if (bookedForThisCourt.length === 0) return court;

        return {
          ...court,
          slots: court.slots.map((slot) => {
            if (bookedForThisCourt.includes(slot.id)) {
              return { ...slot, status: 'booked' };
            }
            return slot;
          })
        };
      })
    );

    setMyBookings((prev) => [newBooking, ...prev]);
    setSelectedSlots([]);
    setSelectedEquipment({});
    setSelectedCoachSessions([]);
    setIsCartOpen(false);
    setSuccessBookingData(newBooking);
  }

  function handleCancelBooking(bookingId) {
    const booking = myBookings.find((b) => b.id === bookingId);
    if (!booking) return;

    setMyBookings((prev) => prev.filter((b) => b.id !== bookingId));

    if (booking.itemsSummary) {
      setCourtsData((prev) =>
        prev.map((court) => ({
          ...court,
          slots: court.slots.map((s) => {
            if (booking.itemsSummary.includes(court.name) && booking.itemsSummary.includes(s.time)) {
              return { ...s, status: 'available' };
            }
            return s;
          })
        }))
      );
    }
  }

  function handleUpdateBooking(bookingId, updatedData) {
    setMyBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            ...updatedData
          };
        }
        return b;
      })
    );
  }

  const equipmentActiveCount = Object.values(selectedEquipment).reduce(
    (sum, q) => sum + q,
    0
  );
  const totalCartCount =
    selectedSlots.length + equipmentActiveCount + selectedCoachSessions.length;

  const filteredCourts = courtsData.filter((court) => {
    if (selectedCourtType !== 'all' && court.type !== selectedCourtType) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = court.name.toLowerCase().includes(q);
      const matchSurface = court.surface.toLowerCase().includes(q);
      const matchFeat = court.features.some((f) => f.toLowerCase().includes(q));
      if (!matchName && !matchSurface && !matchFeat) return false;
    }
    return true;
  });

  return (
    <div className="app-wrapper">
      <div className="top-notice-bar" role="complementary">
        <div className="container notice-inner">
          <div className="notice-item">
            <span className="status-dot" aria-hidden="true"></span>
            <span>4 Lapangan Beroperasi Normal Hari Ini (06:00 - 23:00 WIB)</span>
          </div>
          <div className="notice-item">
            <span>Reservasi Online Otomatis &bull; Free Parkir & Air Mineral Dingin</span>
          </div>
        </div>
      </div>

      <Navbar
        theme="light"
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      <main className="main-content">
        <HeroSection onScrollToSection={handleScrollToSection} />

        <QuickFilterBar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          selectedType={selectedCourtType}
          onSelectType={setSelectedCourtType}
          selectedTimeFilter={selectedTimeFilter}
          onSelectTimeFilter={setSelectedTimeFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <section id="courts" className="container" aria-labelledby="courts-section-heading">
          <div className="section-head courts-section-head">
            <div className="section-title-wrap">
              <div className="section-kicker">Ketersediaan Lapangan</div>
              <h2 id="courts-section-heading" className="section-title">
                Pilih Lapangan & Slot Waktu: {activeDateLabel}
              </h2>
              <p className="section-desc">
                Geser ke samping untuk melihat seluruh lapangan. Ukuran kartu lapang dan slot waktu tampil penuh tanpa terpotong.
              </p>
            </div>

            {filteredCourts.length > 0 && (
              <div className="slider-nav-controls">
                <span className="slider-hint-text">
                  {filteredCourts.length} Lapangan (Geser Horizontal)
                </span>
                <div className="slider-btn-group">
                  <button
                    type="button"
                    className="slider-nav-btn"
                    onClick={() => handleScrollCourts('left')}
                    aria-label="Geser lapangan ke kiri"
                    title="Lapangan Sebelumnya"
                  >
                    <ChevronLeftIcon size={20} />
                  </button>
                  <button
                    type="button"
                    className="slider-nav-btn"
                    onClick={() => handleScrollCourts('right')}
                    aria-label="Geser lapangan ke kanan"
                    title="Lapangan Selanjutnya"
                  >
                    <ChevronRightIcon size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {filteredCourts.length === 0 ? (
            <div className="empty-state-box">
              <h3 className="empty-state-title">Tidak Ada Lapangan yang Cocok</h3>
              <p className="empty-state-desc">
                Tidak ada lapangan yang sesuai dengan kata kunci pencarian atau tipe filter yang Anda pilih.
              </p>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setSelectedCourtType('all');
                  setSearchQuery('');
                }}
              >
                Reset Filter Lapangan
              </button>
            </div>
          ) : (
            <div className="courts-slider-wrapper">
              <div
                className="courts-slider"
                ref={courtsSliderRef}
                tabIndex="0"
                role="region"
                aria-label="Daftar Slider Lapangan Padel"
              >
                {filteredCourts.map((court) => (
                  <CourtCard
                    key={court.id}
                    court={court}
                    timeFilter={selectedTimeFilter}
                    selectedSlots={selectedSlots}
                    onToggleSlot={handleToggleSlot}
                    selectedDateLabel={activeDateLabel}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        <OpenMatchSection
          matches={openMatches}
          onJoinMatch={handleJoinMatch}
          onCreateMatch={handleCreateMatch}
        />

        <CoachesSection
          coaches={COACHES_DATA}
          onAddCoachToCart={handleAddCoachSession}
        />

        <ProShopSection
          equipment={EQUIPMENT_DATA}
          selectedEquipment={selectedEquipment}
          onUpdateEquipmentQty={handleUpdateEquipmentQty}
        />

        <MyBookingsSection
          bookings={myBookings}
          onCancelBooking={handleCancelBooking}
          onUpdateBooking={handleUpdateBooking}
          onExploreCourts={() => handleScrollToSection('courts')}
        />
      </main>

      <Footer onScrollToSection={handleScrollToSection} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        selectedSlots={selectedSlots}
        onRemoveSlot={handleRemoveSlot}
        selectedEquipment={selectedEquipment}
        equipmentCatalog={EQUIPMENT_DATA}
        onUpdateEquipmentQty={handleUpdateEquipmentQty}
        selectedCoachSessions={selectedCoachSessions}
        onRemoveCoachSession={handleRemoveCoachSession}
        onConfirmBooking={handleConfirmBooking}
      />

      <BookingSuccessModal
        bookingData={successBookingData}
        onClose={() => setSuccessBookingData(null)}
        onGoToMyBookings={() => handleScrollToSection('my-bookings')}
      />
    </div>
  );
}
