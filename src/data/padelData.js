export const COURTS_DATA = [
  {
    id: 'court-alpha',
    name: 'Center Court Alpha',
    type: 'panoramic',
    typeLabel: 'Panoramic Glass 12mm',
    surface: 'Mondo Supercourt XN (Turf Resmi WPT)',
    environment: 'Indoor AC',
    ceilingHeight: '10.5 Meter',
    lighting: '800 Lux Anti-Glare LED',
    pricePerHour: 320000,
    peakPricePerHour: 380000,
    features: [
      'Kaca Panoramik Tanpa Pilar Tengah',
      'Perekam Video Pertandingan Otomatis',
      'Tribun Penonton 60 Kursi',
      'Lampu Standar Turnamen Internasional'
    ],
    description: 'Lapangan utama dengan kaca panoramic 360 derajat dan karpet Mondo Supercourt XN generasi terbaru untuk pantulan bola konsisten.',
    slots: [
      { id: 'ca-0700', time: '07:00 - 08:30', duration: 90, status: 'available', price: 480000, isPeak: false },
      { id: 'ca-0830', time: '08:30 - 10:00', duration: 90, status: 'booked', price: 480000, isPeak: false },
      { id: 'ca-1000', time: '10:00 - 11:30', duration: 90, status: 'available', price: 480000, isPeak: false },
      { id: 'ca-1530', time: '15:30 - 17:00', duration: 90, status: 'available', price: 480000, isPeak: false },
      { id: 'ca-1700', time: '17:00 - 18:30', duration: 90, status: 'booked', price: 570000, isPeak: true },
      { id: 'ca-1830', time: '18:30 - 20:00', duration: 90, status: 'available', price: 570000, isPeak: true },
      { id: 'ca-2000', time: '20:00 - 21:30', duration: 90, status: 'available', price: 570000, isPeak: true },
      { id: 'ca-2130', time: '21:30 - 23:00', duration: 90, status: 'available', price: 480000, isPeak: false }
    ]
  },
  {
    id: 'court-bravo',
    name: 'Court Bravo (Pro Indoor)',
    type: 'indoor',
    typeLabel: 'Indoor Full AC',
    surface: 'Textured Monofilament Padel Turf',
    environment: 'Indoor AC',
    ceilingHeight: '9.8 Meter',
    lighting: '650 Lux Uniform LED',
    pricePerHour: 280000,
    peakPricePerHour: 340000,
    features: [
      'Pendingin Ruangan Terisolasi Suhu 23C',
      'Papan Skor Digital Terintegrasi',
      'Net Kompetisi FIP',
      'Jaring Kawat Baja Galvanis'
    ],
    description: 'Dirancang untuk sesi latihan intensif dan sparring kompetisi tanpa terganggu terik matahari atau hujan.',
    slots: [
      { id: 'cb-0700', time: '07:00 - 08:30', duration: 90, status: 'available', price: 420000, isPeak: false },
      { id: 'cb-0830', time: '08:30 - 10:00', duration: 90, status: 'available', price: 420000, isPeak: false },
      { id: 'cb-1000', time: '10:00 - 11:30', duration: 90, status: 'booked', price: 420000, isPeak: false },
      { id: 'cb-1530', time: '15:30 - 17:00', duration: 90, status: 'available', price: 420000, isPeak: false },
      { id: 'cb-1700', time: '17:00 - 18:30', duration: 90, status: 'available', price: 510000, isPeak: true },
      { id: 'cb-1830', time: '18:30 - 20:00', duration: 90, status: 'booked', price: 510000, isPeak: true },
      { id: 'cb-2000', time: '20:00 - 21:30', duration: 90, status: 'available', price: 510000, isPeak: true },
      { id: 'cb-2130', time: '21:30 - 23:00', duration: 90, status: 'available', price: 420000, isPeak: false }
    ]
  },
  {
    id: 'court-charlie',
    name: 'Court Charlie (Sunset Canopy)',
    type: 'outdoor',
    typeLabel: 'Semi-Outdoor Canopy',
    surface: 'High Resilience Sand-Dressed Turf',
    environment: 'Semi-Outdoor',
    ceilingHeight: '11 Meter Terbuka',
    lighting: '600 Lux Sports Floodlight',
    pricePerHour: 240000,
    peakPricePerHour: 300000,
    features: [
      'Atap Kanopi Penahan UV dan Hujan',
      'Sirkulasi Udara Alami Segar',
      'Lounge Area Samping Lapangan',
      'Akses Cepat ke Club Cafe'
    ],
    description: 'Lapangan semi-outdoor dengan naungan atap kanopi melengkung, ideal untuk sesi sore hari dengan angin alami.',
    slots: [
      { id: 'cc-0700', time: '07:00 - 08:30', duration: 90, status: 'booked', price: 360000, isPeak: false },
      { id: 'cc-0830', time: '08:30 - 10:00', duration: 90, status: 'available', price: 360000, isPeak: false },
      { id: 'cc-1000', time: '10:00 - 11:30', duration: 90, status: 'available', price: 360000, isPeak: false },
      { id: 'cc-1530', time: '15:30 - 17:00', duration: 90, status: 'available', price: 360000, isPeak: false },
      { id: 'cc-1700', time: '17:00 - 18:30', duration: 90, status: 'available', price: 450000, isPeak: true },
      { id: 'cc-1830', time: '18:30 - 20:00', duration: 90, status: 'available', price: 450000, isPeak: true },
      { id: 'cc-2000', time: '20:00 - 21:30', duration: 90, status: 'booked', price: 450000, isPeak: true },
      { id: 'cc-2130', time: '21:30 - 23:00', duration: 90, status: 'available', price: 360000, isPeak: false }
    ]
  },
  {
    id: 'court-delta',
    name: 'Court Delta (Club Panoramic)',
    type: 'panoramic',
    typeLabel: 'Panoramic Glass 12mm',
    surface: 'Mondo Supercourt XN',
    environment: 'Indoor AC',
    ceilingHeight: '10 Meter',
    lighting: '750 Lux LED Pro',
    pricePerHour: 300000,
    peakPricePerHour: 360000,
    features: [
      'Kaca Dinding Panoramik Presisi',
      'Sistem Audio Lapangan Bluetooth',
      'Penyimpanan Raket & Tas Khusus',
      'Dekat Ruang Loker & Shower'
    ],
    description: 'Pilihan favorit member untuk turnamen internal dan latihan rutin ganda dengan visual lapangan yang lega.',
    slots: [
      { id: 'cd-0700', time: '07:00 - 08:30', duration: 90, status: 'available', price: 450000, isPeak: false },
      { id: 'cd-0830', time: '08:30 - 10:00', duration: 90, status: 'available', price: 450000, isPeak: false },
      { id: 'cd-1000', time: '10:00 - 11:30', duration: 90, status: 'available', price: 450000, isPeak: false },
      { id: 'cd-1530', time: '15:30 - 17:00', duration: 90, status: 'booked', price: 450000, isPeak: false },
      { id: 'cd-1700', time: '17:00 - 18:30', duration: 90, status: 'available', price: 540000, isPeak: true },
      { id: 'cd-1830', time: '18:30 - 20:00', duration: 90, status: 'available', price: 540000, isPeak: true },
      { id: 'cd-2000', time: '20:00 - 21:30', duration: 90, status: 'available', price: 540000, isPeak: true },
      { id: 'cd-2130', time: '21:30 - 23:00', duration: 90, status: 'booked', price: 450000, isPeak: false }
    ]
  }
];

export const OPEN_MATCHES_DATA = [
  {
    id: 'match-101',
    title: 'Sparring Ganda Intensif Malam',
    courtName: 'Center Court Alpha',
    date: 'Hari ini',
    time: '18:30 - 20:00',
    level: 'Intermediate (3.0 - 3.5)',
    levelCategory: 'intermediate',
    category: 'Pria',
    pricePerPerson: 142500,
    host: {
      name: 'Dimas Wicaksono',
      initials: 'DW',
      rating: 'Level 3.2'
    },
    totalSlots: 4,
    filledSlots: 3,
    players: [
      { name: 'Dimas W. (Host)', rating: '3.2', initials: 'DW' },
      { name: 'Rangga P.', rating: '3.0', initials: 'RP' },
      { name: 'Kevin Santoso', rating: '3.4', initials: 'KS' }
    ],
    notes: 'Bawa bola baru masing-masing atau split kaleng baru di tempat. Warmup 10 menit lanjut set reguler.'
  },
  {
    id: 'match-102',
    title: 'Mixed Friendly Doubles Padel',
    courtName: 'Court Bravo (Pro Indoor)',
    date: 'Besok',
    time: '17:00 - 18:30',
    level: 'Beginner Plus (2.0 - 2.8)',
    levelCategory: 'beginner',
    category: 'Campuran (Mixed)',
    pricePerPerson: 127500,
    host: {
      name: 'Sarah Amanda',
      initials: 'SA',
      rating: 'Level 2.5'
    },
    totalSlots: 4,
    filledSlots: 2,
    players: [
      { name: 'Sarah A. (Host)', rating: '2.5', initials: 'SA' },
      { name: 'Budi Hartono', rating: '2.3', initials: 'BH' }
    ],
    notes: 'Sesi santai fokus rally panjang dan belajar penempatan bola dari kaca belakang. Cocok untuk yang baru main beberapa bulan.'
  },
  {
    id: 'match-103',
    title: 'Competitive League Match Simulation',
    courtName: 'Center Court Alpha',
    date: 'Besok',
    time: '20:00 - 21:30',
    level: 'Advanced (4.0+)',
    levelCategory: 'advanced',
    category: 'Pria',
    pricePerPerson: 142500,
    host: {
      name: 'Farhan Maulana',
      initials: 'FM',
      rating: 'Level 4.2'
    },
    totalSlots: 4,
    filledSlots: 3,
    players: [
      { name: 'Farhan M. (Host)', rating: '4.2', initials: 'FM' },
      { name: 'Adrian Putra', rating: '4.0', initials: 'AP' },
      { name: 'Reza Fahmi', rating: '4.5', initials: 'RF' }
    ],
    notes: 'Full competitive format: golden point, smash por tres diperbolehkan. Diutamakan yang sudah rutin tanding turnamen regional.'
  },
  {
    id: 'match-104',
    title: 'Morning Rookie Social Match',
    courtName: 'Court Charlie (Sunset Canopy)',
    date: 'Lusa',
    time: '08:30 - 10:00',
    level: 'Beginner (1.5 - 2.0)',
    levelCategory: 'beginner',
    category: 'Semua Gender',
    pricePerPerson: 90000,
    host: {
      name: 'Tania Lestari',
      initials: 'TL',
      rating: 'Level 1.8'
    },
    totalSlots: 4,
    filledSlots: 1,
    players: [
      { name: 'Tania L. (Host)', rating: '1.8', initials: 'TL' }
    ],
    notes: 'Kumpul pagi santai. Belum punya raket bisa sewa langsung di pro shop club.'
  }
];

export const COACHES_DATA = [
  {
    id: 'coach-marcos',
    name: 'Marcos Silva',
    title: 'Head Padel Coach & Technical Director',
    certification: 'Sertifikasi Federacion Espanola de Padel (FIP Spanyol)',
    experience: '8 Tahun Melatih di Madrid & Jakarta',
    specialties: ['Wall Defenses (Salida de Pared)', 'Bandeja & Vibora Precision', 'Tactical Positioning'],
    pricePerHour: 450000,
    languages: 'Bahasa Indonesia, Spanyol, Inggris',
    availability: 'Senin - Sabtu (08:00 - 21:00)',
    bio: 'Mantan pemain divisi regional Madrid yang fokus pada pemahaman ruang gerak lapangan kaca dan efisiensi pukulan overhead.'
  },
  {
    id: 'coach-arya',
    name: 'Arya Pratama',
    title: 'Senior Match & Attack Specialist',
    certification: 'Lisensi Pelatih Nasional Padel Indonesia Level 2',
    experience: '5 Tahun Atlet Raket & 3 Tahun Padel Pro',
    specialties: ['Smash Por Tres & Por Cuatro', 'Net Transition & Volley Aggression', 'Match Strategy'],
    pricePerHour: 350000,
    languages: 'Bahasa Indonesia, Inggris',
    availability: 'Selasa - Minggu (15:00 - 22:00)',
    bio: 'Fokus melatih pemain intermediate yang ingin mempercepat tempo serangan di depan net dan eksekusi smash pemenang.'
  },
  {
    id: 'coach-nadia',
    name: 'Nadia Wijaya',
    title: 'Development Coach & Clinic Director',
    certification: 'PTR Certified & Padel Coach Certification Level 1',
    experience: '4 Tahun Melatih Pemula & Junior Clinic',
    specialties: ['Fundamental Grip & Footwork', 'Lobs Kontrol Tinggi', 'Confidence on Glass Walls'],
    pricePerHour: 300000,
    languages: 'Bahasa Indonesia, Inggris',
    availability: 'Setiap Hari (07:00 - 17:00)',
    bio: 'Sangat sabar membimbing pemula untuk menguasai ritme permainan padel tanpa rasa takut pantulan bola di kaca.'
  }
];

export const EQUIPMENT_DATA = [
  {
    id: 'eq-babolat-viper',
    category: 'racket',
    name: 'Babolat Technical Viper 2025',
    brand: 'Babolat',
    shape: 'Diamond Shape',
    balance: 'Head Heavy (Power)',
    surface: '12K Carbon Fiber',
    level: 'Advanced / Aggressive',
    rentalPrice: 50000,
    imageTag: 'Racket Pro Power',
    description: 'Raket bertenaga maksimal untuk pemain yang menyukai smash overhead dan bola cepat di depan net.'
  },
  {
    id: 'eq-bullpadel-vertex',
    category: 'racket',
    name: 'Bullpadel Vertex 03 Comfort',
    brand: 'Bullpadel',
    shape: 'Diamond / Teardrop',
    balance: 'Medium-High',
    surface: 'Fibrix Hybrid & MultiEva Core',
    level: 'Intermediate / Advanced',
    rentalPrice: 45000,
    imageTag: 'Racket Spin & Feel',
    description: 'Permukaan bertekstur Topspin untuk kontrol putaran bola optimal saat memotong bola di dekat kaca.'
  },
  {
    id: 'eq-head-flash',
    category: 'racket',
    name: 'Head Flash Pro All-Rounder',
    brand: 'Head',
    shape: 'Teardrop Shape',
    balance: 'Balanced',
    surface: 'Power Foam Core',
    level: 'Beginner / Intermediate',
    rentalPrice: 35000,
    imageTag: 'Racket Sweet Spot',
    description: 'Raket dengan sweet spot luas dan fleksibilitas nyaman untuk pergelangan tangan pemula.'
  },
  {
    id: 'eq-wilson-blade',
    category: 'racket',
    name: 'Wilson Blade Team V2',
    brand: 'Wilson',
    shape: 'Teardrop Shape',
    balance: 'Even Balance',
    surface: 'Fiberglass Weave',
    level: 'Beginner / Casual',
    rentalPrice: 30000,
    imageTag: 'Racket Easy Control',
    description: 'Ringan dan lincah digerakkan untuk rally panjang dan latihan pertahanan dasar.'
  },
  {
    id: 'eq-ball-can',
    category: 'accessory',
    name: 'Kaleng Bola Padel Head Pro S (Isi 3)',
    brand: 'Head',
    shape: 'Regulasi Resmi',
    balance: 'High Speed Pressure',
    surface: 'Premium Felt',
    level: 'Semua Level',
    rentalPrice: 110000,
    isPurchase: true,
    imageTag: 'Bola Resmi',
    description: 'Bola padel resmi baru bertekanan optimal untuk kecepatan dan pantulan tajam.'
  },
  {
    id: 'eq-overgrip',
    category: 'accessory',
    name: 'Overgrip Tourna Tac Padel (Pasang di Tempat)',
    brand: 'Tourna',
    shape: 'Tacky Feel',
    balance: 'Absorbs Sweat',
    surface: 'Polyurethane',
    level: 'Semua Level',
    rentalPrice: 25000,
    isPurchase: true,
    imageTag: 'Grip Tambahan',
    description: 'Mencegah raket licin karena keringat saat pertandingan panjang.'
  },
  {
    id: 'eq-shoes',
    category: 'rental',
    name: 'Sepatu Khusus Padel (Herringbone Clay Sole)',
    brand: 'Babolat Jet Premura',
    shape: 'Ukuran 40 - 44',
    balance: 'Anti-Slip Turf',
    surface: 'Omni Padel Sole',
    level: 'Semua Level',
    rentalPrice: 30000,
    imageTag: 'Sepatu Khusus',
    description: 'Sol khusus dengan pola zig-zag herringbone untuk daya cengkeram optimal pada rumput sintetis berpasir.'
  }
];

export const CLUB_INFO = {
  name: 'VORTEX PADEL ARENA',
  tagline: 'High-Performance Padel Club & Community Arena',
  address: 'Jl. Kemang Timur Raya No. 42, Mampang Prapatan, Jakarta Selatan',
  openingHours: 'Setiap Hari: 06:00 - 23:00 WIB',
  phone: '+62 811-9820-4411',
  facilities: [
    '4 Lapangan Standar Turnamen Internasional (2 Panoramic, 1 Indoor AC, 1 Canopy)',
    'Pencahayaan LED 800 Lux Anti-Silau',
    'Ruang Ganti Lengkap dengan Air Hangat & Loker Kunci Digital',
    'Club Cafe & Bar Nutrisi Segar (Cold Press Juice, Coffee, Protein Shake)',
    'Pro Shop Peralatan Lengkap & Mesin Pasang Grip',
    'Parkir Luas Mobil & Motor dengan Keamanan 24 Jam'
  ],
  rules: [
    'Wajib menggunakan sepatu sol datar khusus padel atau tenis (dilarang sepatu lari bergerigi kasar)',
    'Tali pengaman pergelangan tangan (wrist cord) raket wajib terpasang selama bermain',
    'Pembatalan atau pemindahan jadwal dapat dilakukan maksimal 12 jam sebelum waktu sesi',
    'Dilarang membawa makanan ke dalam area karpet lapangan'
  ]
};
