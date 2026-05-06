import { ref, computed } from 'vue'

export type Lang = 'en' | 'id'

// Singleton reactive state
const currentLang = ref<Lang>('en')

export function useI18n() {
  function setLang(lang: Lang) {
    currentLang.value = lang
  }
  function toggleLang() {
    currentLang.value = currentLang.value === 'en' ? 'id' : 'en'
  }

  const t = computed(() => translations[currentLang.value])

  return { lang: currentLang, t, setLang, toggleLang }
}

const translations = {
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      work: 'Work',
      process: 'Process',
      contact: 'Contact',
      cta: 'Get in Touch',
    },
    hero: {
      line1: 'We Engineer',
      line2word1: 'Digital',
      line2word2: 'Growth.',
      sub: 'Building Scalable Digital Solutions\nfor Modern Businesses.',
      cta1: 'Explore Services',
      cta2: 'View Our Works',
    },
    about: {
      label: 'About Digivora',
      headlineWords: ['Your', 'Technology', 'Partner', 'for', 'the', 'Digital', 'Era.'],
      dimWords: ['Partner', 'for', 'the'],
      p1: 'Digivora is a modern technology company that helps businesses transform digitally through scalable software architecture, premium user experiences, and long-term technology ecosystems.',
      p2: "We don't build websites. We engineer digital infrastructure that becomes the backbone of your business growth — from enterprise web applications to automated systems, designed to scale from day one.",
      p3: 'From startups to enterprise, we operate at the intersection of design precision, engineering excellence, and business intelligence.',
      values: [
        {
          num: '01',
          label: 'Scalable Architecture',
          desc: 'Systems built to grow without breaking.',
        },
        { num: '02', label: 'Precision Engineering', desc: 'Clean code, zero compromise.' },
        { num: '03', label: 'Design Intelligence', desc: 'Every pixel engineered with purpose.' },
        { num: '04', label: 'Business First', desc: 'Technology aligned to your KPIs.' },
      ],
    },
    services: {
      label: 'What We Do',
      headlineWords: ['Full-Spectrum', 'Digital', 'Services.'],
      dimWord: 'Digital',
      sub: 'Every solution we build is crafted with enterprise-grade standards, regardless of your company size.',
      items: [
        {
          num: '01',
          title: 'Web Development',
          desc: 'Custom high-performance websites and corporate platforms engineered for speed, SEO excellence, and conversion.',
          tags: ['Next.js', 'Vue 3', 'Laravel'],
        },
        {
          num: '02',
          title: 'Mobile Development',
          desc: 'Native and cross-platform applications for iOS and Android. Seamless UX from device to cloud.',
          tags: ['React Native', 'Flutter'],
        },
        {
          num: '03',
          title: 'SaaS Platform',
          desc: 'End-to-end SaaS architecture with multi-tenancy, subscription systems, and scalable infrastructure.',
          tags: ['Microservices', 'Cloud-native'],
        },
        {
          num: '04',
          title: 'UI/UX Engineering',
          desc: 'Design systems and interfaces that convert. From wireframe to pixel-perfect implementation.',
          tags: ['Figma', 'Design System'],
        },
        {
          num: '05',
          title: 'Automation Systems',
          desc: 'Business process automation that eliminates bottlenecks, reduces cost, and accelerates operations.',
          tags: ['Workflow', 'Integration API'],
        },
        {
          num: '06',
          title: 'Business Intelligence',
          desc: 'Data pipelines, dashboards, and analytics engines that turn raw data into strategic decisions.',
          tags: ['Analytics', 'Dashboard'],
        },
      ],
    },
    portfolio: {
      label: 'Selected Works',
      headlineDim: 'Work We',
      headline: "Won't Stop",
      headline2: 'Being Proud Of.',
      sub: "A curated selection of solutions we've built for real businesses — delivered with precision, shipped with pride.",
      viewWork: 'View Work',
      items: [
        { id: '01', title: 'Everest Corporate', category: 'Corporate Website', year: '2024' },
        { id: '02', title: 'BaristaFlow POS', category: 'Cafe Management System', year: '2024' },
        { id: '03', title: 'Nusa Realty', category: 'Real Estate Platform', year: '2024' },
        { id: '04', title: 'MediBook Clinic', category: 'Reservation & EMR System', year: '2023' },
        { id: '05', title: 'Nexus ERP', category: 'Enterprise Resource Planning', year: '2023' },
        {
          id: '06',
          title: 'Aura Brand Studio',
          category: 'Digital Branding & Landing',
          year: '2024',
        },
      ],
    },
    why: {
      label: 'Why Digivora',
      headline1: 'The Standard',
      headline2: 'Other Agencies',
      headline3: "Don't Meet.",
      sub: "We operate at the intersection of elite engineering talent, premium design thinking, and deep business intelligence. The result? Digital products that don't just work — they win.",
      pillars: [
        {
          title: 'Scalable Architecture',
          desc: 'Every codebase we write is structured to grow. Microservices, modular design, horizontal scaling — built-in from the start, not bolted on later.',
        },
        {
          title: 'Clean Code Engineering',
          desc: 'We operate by engineering standards, not hacks. Typed, tested, documented, and maintainable by any engineer who joins your team.',
        },
        {
          title: 'Modern Design Language',
          desc: 'Interfaces that communicate excellence. We design product experiences that build brand trust and drive user engagement.',
        },
        {
          title: 'Business-Focused Development',
          desc: "We speak both technology and business. Every feature we build maps directly to your business outcome — not just a developer's preference.",
        },
        {
          title: 'Long-Term Partnership',
          desc: "We don't disappear after launch. Continuous support, iteration, and strategic technology planning ensure your product keeps growing.",
        },
      ],
    },
    process: {
      label: 'How We Work',
      headlineWords: ['Our', 'Proven', 'Process.'],
      dimWord: 'Process.',
      sub: 'From discovery to scale — a systematic approach that delivers excellence at every milestone.',
      steps: [
        {
          num: '01',
          title: 'Discover',
          desc: 'Deep dive into your business, goals, and users to understand the real problem.',
        },
        {
          num: '02',
          title: 'Strategy',
          desc: 'Architecture planning, technology stack selection, and product roadmap.',
        },
        {
          num: '03',
          title: 'Design',
          desc: 'Wireframes, design systems, and pixel-perfect UI crafted for conversion.',
        },
        {
          num: '04',
          title: 'Develop',
          desc: 'Agile engineering sprints with weekly demos and transparent progress.',
        },
        {
          num: '05',
          title: 'Launch',
          desc: 'Staged deployment, QA, performance optimization, and go-live.',
        },
        {
          num: '06',
          title: 'Scale',
          desc: 'Continuous iteration, monitoring, and long-term technology partnership.',
        },
      ],
    },
    trust: {
      label: 'Proof of Excellence',
      stats: [
        {
          num: 20,
          suffix: '+',
          label: 'Projects Delivered',
          desc: 'Across multiple industries and business scales.',
        },
        {
          num: 10,
          suffix: '+',
          label: 'Industries Served',
          desc: 'Healthcare, finance, retail, and beyond.',
        },
        {
          num: 99,
          suffix: '%',
          label: 'Client Satisfaction',
          desc: 'Based on post-project client feedback.',
        },
        {
          num: 5,
          suffix: '+',
          label: 'Years of Excellence',
          desc: 'Building digital solutions that last.',
        },
      ],
      industriesLabel: 'Industries We Serve',
      industries: [
        'Healthcare',
        'Real Estate',
        'Finance',
        'Food & Beverage',
        'Retail',
        'Manufacturing',
        'Education',
        'Logistics',
        'Government',
        'Hospitality',
      ],
      quote: '"We don\'t just deliver software.\nWe deliver certainty."',
      quoteAttr: '— Digivora Solution Technology',
    },
    cta: {
      label: 'Start Your Journey',
      line1: ['Your', 'Business'],
      line2: ['Deserves', 'More'],
      line3: ['Than', 'a', 'Website.'],
      sub: "We build digital ecosystems that scale — from MVP to enterprise, from launch to legacy. Let's build something exceptional together.",
      email: 'Start a Project',
      secondary: 'View Our Work',
    },
    footer: {
      tagline: 'Building scalable digital solutions for businesses that refuse to be ordinary.',
      servicesLabel: 'Services',
      navLabel: 'Navigation',
      contactLabel: 'Contact',
      rights: 'All rights reserved.',
      builtWith: 'Built with precision in Indonesia.',
    },
  },
  id: {
    nav: {
      about: 'Tentang',
      services: 'Layanan',
      work: 'Portofolio',
      process: 'Proses',
      contact: 'Kontak',
      cta: 'Hubungi Kami',
    },
    hero: {
      line1: 'Kami Membangun',
      line2word1: 'Laju',
      line2word2: 'Digital.',
      sub: 'Solusi Digital Scalable\nuntuk Bisnis Modern.',
      cta1: 'Lihat Layanan',
      cta2: 'Lihat Portofolio',
    },
    about: {
      label: 'Tentang Digivora',
      headlineWords: ['Mitra', 'Teknologi', 'Anda', 'di', 'Era', 'Digital.'],
      dimWords: ['Anda', 'di'],
      p1: 'Digivora adalah perusahaan teknologi modern yang membantu bisnis bertransformasi secara digital melalui arsitektur perangkat lunak yang skalabel, pengalaman pengguna premium, dan ekosistem teknologi jangka panjang.',
      p2: 'Kami tidak sekadar membangun website. Kami merancang infrastruktur digital yang menjadi tulang punggung pertumbuhan bisnis Anda — dari aplikasi web enterprise hingga sistem otomasi, dirancang untuk berkembang sejak hari pertama.',
      p3: 'Dari startup hingga enterprise, kami beroperasi di persimpangan presisi desain, keunggulan rekayasa, dan kecerdasan bisnis.',
      values: [
        {
          num: '01',
          label: 'Arsitektur Skalabel',
          desc: 'Sistem yang dibangun untuk tumbuh tanpa hambatan.',
        },
        { num: '02', label: 'Rekayasa Presisi', desc: 'Kode bersih, tanpa kompromi.' },
        { num: '03', label: 'Desain Cerdas', desc: 'Setiap piksel dirancang dengan tujuan.' },
        {
          num: '04',
          label: 'Bisnis Sebagai Prioritas',
          desc: 'Teknologi yang selaras dengan KPI Anda.',
        },
      ],
    },
    services: {
      label: 'Yang Kami Lakukan',
      headlineWords: ['Layanan', 'Digital', 'Lengkap.'],
      dimWord: 'Digital',
      sub: 'Setiap solusi yang kami bangun dirancang dengan standar enterprise, terlepas dari ukuran perusahaan Anda.',
      items: [
        {
          num: '01',
          title: 'Pengembangan Web',
          desc: 'Website korporat dan platform khusus berperforma tinggi, direkayasa untuk kecepatan, SEO, dan konversi.',
          tags: ['Next.js', 'Vue 3', 'Laravel'],
        },
        {
          num: '02',
          title: 'Pengembangan Mobile',
          desc: 'Aplikasi native dan lintas platform untuk iOS dan Android. UX mulus dari perangkat ke cloud.',
          tags: ['React Native', 'Flutter'],
        },
        {
          num: '03',
          title: 'Platform SaaS',
          desc: 'Arsitektur SaaS end-to-end dengan multi-tenancy, sistem langganan, dan infrastruktur skalabel.',
          tags: ['Microservices', 'Cloud-native'],
        },
        {
          num: '04',
          title: 'Rekayasa UI/UX',
          desc: 'Sistem desain dan antarmuka yang mengonversi. Dari wireframe hingga implementasi pixel-perfect.',
          tags: ['Figma', 'Design System'],
        },
        {
          num: '05',
          title: 'Sistem Otomasi',
          desc: 'Otomasi proses bisnis yang menghilangkan hambatan, mengurangi biaya, dan mempercepat operasi.',
          tags: ['Workflow', 'Integration API'],
        },
        {
          num: '06',
          title: 'Business Intelligence',
          desc: 'Pipeline data, dashboard, dan mesin analitik yang mengubah data mentah menjadi keputusan strategis.',
          tags: ['Analytics', 'Dashboard'],
        },
      ],
    },
    portfolio: {
      label: 'Karya Pilihan',
      headlineDim: 'Karya yang',
      headline: 'Selalu',
      headline2: 'Kami Banggakan.',
      sub: 'Pilihan solusi yang kami bangun untuk bisnis nyata — disampaikan dengan presisi, diluncurkan dengan kebanggaan.',
      viewWork: 'Lihat Karya',
      items: [
        { id: '01', title: 'Everest Corporate', category: 'Website Korporat', year: '2024' },
        { id: '02', title: 'BaristaFlow POS', category: 'Sistem Manajemen Kafe', year: '2024' },
        { id: '03', title: 'Nusa Realty', category: 'Platform Properti', year: '2024' },
        { id: '04', title: 'MediBook Clinic', category: 'Sistem Reservasi & RME', year: '2023' },
        { id: '05', title: 'Nexus ERP', category: 'Perencanaan Sumber Daya', year: '2023' },
        {
          id: '06',
          title: 'Aura Brand Studio',
          category: 'Branding & Landing Digital',
          year: '2024',
        },
      ],
    },
    why: {
      label: 'Mengapa Digivora',
      headline1: 'Standar yang',
      headline2: 'Tidak Dicapai',
      headline3: 'Agensi Lain.',
      sub: 'Kami beroperasi di persimpangan talenta rekayasa elite, pemikiran desain premium, dan kecerdasan bisnis mendalam. Hasilnya? Produk digital yang tidak hanya berjalan — tapi menang.',
      pillars: [
        {
          title: 'Arsitektur Skalabel',
          desc: 'Setiap codebase yang kami tulis terstruktur untuk tumbuh. Microservices, desain modular, horizontal scaling — sudah ada dari awal, bukan ditambahkan belakangan.',
        },
        {
          title: 'Rekayasa Kode Bersih',
          desc: 'Kami bekerja berdasarkan standar rekayasa, bukan jalan pintas. Bertipe, teruji, terdokumentasi, dan dapat dipelihara oleh engineer mana pun.',
        },
        {
          title: 'Bahasa Desain Modern',
          desc: 'Antarmuka yang mengkomunikasikan keunggulan. Kami merancang pengalaman produk yang membangun kepercayaan merek dan mendorong keterlibatan pengguna.',
        },
        {
          title: 'Pengembangan Berorientasi Bisnis',
          desc: 'Kami berbicara teknologi sekaligus bisnis. Setiap fitur yang kami bangun langsung terhubung ke hasil bisnis Anda.',
        },
        {
          title: 'Kemitraan Jangka Panjang',
          desc: 'Kami tidak menghilang setelah peluncuran. Dukungan berkelanjutan, iterasi, dan perencanaan teknologi strategis memastikan produk Anda terus berkembang.',
        },
      ],
    },
    process: {
      label: 'Cara Kami Bekerja',
      headlineWords: ['Proses', 'Teruji', 'Kami.'],
      dimWord: 'Kami.',
      sub: 'Dari penemuan hingga skala — pendekatan sistematis yang menghasilkan keunggulan di setiap tahap.',
      steps: [
        {
          num: '01',
          title: 'Penemuan',
          desc: 'Menyelami bisnis, tujuan, dan pengguna Anda untuk memahami masalah yang sebenarnya.',
        },
        {
          num: '02',
          title: 'Strategi',
          desc: 'Perencanaan arsitektur, pemilihan technology stack, dan peta jalan produk.',
        },
        {
          num: '03',
          title: 'Desain',
          desc: 'Wireframe, sistem desain, dan UI pixel-perfect yang dirancang untuk konversi.',
        },
        {
          num: '04',
          title: 'Pengembangan',
          desc: 'Sprint rekayasa agile dengan demo mingguan dan progres yang transparan.',
        },
        {
          num: '05',
          title: 'Peluncuran',
          desc: 'Deployment bertahap, QA, optimasi performa, dan go-live.',
        },
        {
          num: '06',
          title: 'Skalasi',
          desc: 'Iterasi berkelanjutan, pemantauan, dan kemitraan teknologi jangka panjang.',
        },
      ],
    },
    trust: {
      label: 'Bukti Keunggulan',
      stats: [
        {
          num: 20,
          suffix: '+',
          label: 'Proyek Selesai',
          desc: 'Di berbagai industri dan skala bisnis.',
        },
        {
          num: 10,
          suffix: '+',
          label: 'Industri Dilayani',
          desc: 'Kesehatan, keuangan, ritel, dan banyak lagi.',
        },
        {
          num: 99,
          suffix: '%',
          label: 'Kepuasan Klien',
          desc: 'Berdasarkan umpan balik klien pasca proyek.',
        },
        {
          num: 5,
          suffix: '+',
          label: 'Tahun Berpengalaman',
          desc: 'Membangun solusi digital yang tahan lama.',
        },
      ],
      industriesLabel: 'Industri yang Kami Layani',
      industries: [
        'Kesehatan',
        'Properti',
        'Keuangan',
        'Makanan & Minuman',
        'Ritel',
        'Manufaktur',
        'Pendidikan',
        'Logistik',
        'Pemerintahan',
        'Perhotelan',
      ],
      quote: '"Kami tidak hanya mengirimkan perangkat lunak.\nKami mengirimkan kepastian."',
      quoteAttr: '— Digivora Solution Technology',
    },
    cta: {
      label: 'Mulai Perjalanan Anda',
      line1: ['Bisnis', 'Anda'],
      line2: ['Layak', 'Lebih'],
      line3: ['dari', 'Sekadar', 'Website.'],
      sub: 'Kami membangun ekosistem digital yang berkembang — dari MVP hingga enterprise, dari peluncuran hingga legacy. Mari bangun sesuatu yang luar biasa bersama.',
      email: 'Mulai Proyek',
      secondary: 'Lihat Karya Kami',
    },
    footer: {
      tagline: 'Membangun solusi digital skalabel untuk bisnis yang menolak jadi biasa-biasa saja.',
      servicesLabel: 'Layanan',
      navLabel: 'Navigasi',
      contactLabel: 'Kontak',
      rights: 'Hak cipta dilindungi.',
      builtWith: 'Dibangun dengan presisi di Indonesia.',
    },
  },
}
