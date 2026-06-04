/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Teacher, Course, FAQ, Review } from './types';

export const CONTACT_INFO = {
  phone: '+998 (95) 383-07-77',
  telegram: '@orientsupport',
  instagram: '@orientacademyuz',
  instagramUrl: 'https://www.instagram.com/orientacademyuz?igsh=cHdqM2JyZnZ0OHZn',
  address: "Toshkent sh., Chilonzor tumani, Lutfiy ko'chasi (Novza metro yaqinida)",
  yandexMapUrl: 'https://yandex.uz/maps/-/CPToqD5Y',
  coordinates: {
    lat: 41.294908,
    lng: 69.218165,
  }
};

export const COURSES: Course[] = [
  {
    id: 'beginner',
    title: 'Beginner English',
    tagline: 'Ingliz tilini butunlay noldan va mustahkam boshlang',
    level: 'A1',
    aim: 'Asosiy muloqot va grammatika poydevori',
    duration: '4 oy',
    frequency: 'Haftada 3 kun, 120 daqiqadan',
    price: "500,000",
    features: [
      'Alifbo va to\'g\'ri talaffuz qoidalari',
      'Oddiy kundalik jumlalar va so\'zlashuv',
      'Eng asosiy ingliz tili darsliklari',
      'Har darsda yangi so\'zlar va amaliyot',
      'Yordamchi ustozlar (support) nazorati',
    ]
  },
  {
    id: 'pre-intermediate',
    title: 'Pre-Intermediate English',
    tagline: 'Erkin muloqotga ilk ishonchli qadamingiz',
    level: 'A2',
    aim: 'Suhbatni davom ettirish va fikrni bayon qilish',
    duration: '4 oy',
    frequency: 'Haftada 3 kun, 120 daqiqadan',
    price: "520,000",
    features: [
      'Murakkabroq zamonlar va gap konstruktsiyalari',
      'Mavzular asosida suhbat darslari (Speaking)',
      'Osonlashtirilgan matnlar bilan ishlash (Reading)',
      'Audiolarni tushunish ko\'nikmasi (Listening)',
      'Haftalik intermediate oraliq sinovlari',
    ],
    popular: true
  },
  {
    id: 'upper-intermediate',
    title: 'Upper-Intermediate English',
    tagline: 'Akademik talablarga mos ingliz tili darajasi',
    level: 'B2',
    aim: 'Ravon nutq, murakkab grammatika va maqolalar tushunish',
    duration: '4 oy',
    frequency: 'Haftada 3 kun, 120 daqiqadan',
    price: "550,000",
    features: [
      'Debatlar va erkin tahliliy suhbatlar',
      'Akademik insholar tuzish asoslari',
      'Kengaytirilgan idomalar va phrasal fe\'llar',
      'Xalqaro yangiliklar va podkastlar',
      'CEFR yoki IELTS imtihonlariga to\'g\'ridan-to\'g\'ri yo\'llanma',
    ]
  },
  {
    id: 'cefr',
    title: 'CEFR Preparation',
    tagline: 'Milliy sertifikatdan yuqori ball (B2/C1) olish ko\'rsatkichi',
    level: 'B2 / C1',
    aim: 'Oliy o\'quv yurtlariga 100% imtiyozli kirish sertifikati',
    duration: '3 oy',
    frequency: 'Haftada 3 kun, 120 daqiqadan',
    price: "600,000",
    features: [
      'Milliy DTM standartlariga to\'liq mos dastur',
      'Lexical Resource va Grammatika darslari',
      'Yopiq va ochiq testlar bilan ishlash strategiyalari',
      'Haqiqiy CEFR formatidagi haftalik Mock imtihonlari',
      'Tajribali imtihon koordinatorlari darslari',
    ]
  },
  {
    id: 'pre-ielts',
    title: 'Pre-IELTS Course',
    tagline: 'IELTS imtihoniga mukammal poydevor hosil qiling',
    level: 'B1 / B2',
    aim: 'IELTS darslariga to\'liq texnik va lug\'aviy tayyorgarlik',
    duration: '3 oy',
    frequency: 'Haftada 3 kun, 120 daqiqadan',
    price: "580,000",
    features: [
      'IELTS 4 ta skill asoslari bilan tanishuv',
      'Paraphrasing va akademik so\'z boyligi',
      'Tez o\'qish ko\'nikmalari (Skimming & Scanning)',
      'Asosiy insho turlari (Task 1 & Task 2) tuzilishi',
      'Dastlabki diagnostik IELTS sinovlari',
    ],
    popular: true
  },
  {
    id: 'ielts',
    title: 'IELTS Master Class',
    tagline: '7.5+ va 8.0+ ballar uchun maxsus va intensiv o\'quv dasturi',
    level: 'B2 / C1 / C2',
    aim: 'Kafolatlangan yuqori bandlar (7.0, 7.5, 8.0, 8.5)',
    duration: '3 oy',
    frequency: 'Haftada 5 kun, 150 daqiqadan',
    price: "750,000",
    features: [
      'Eski va yangi IELTS savollari tahlili',
      'Erkin va Sarvinoz kabi IELTS 8.5/9.0 ustozlaridan dars',
      'Computer-Delivered formatidagi real Mock imtihonlar',
      'Har bir o\'quvchiga individual Writing & Speaking feedback',
      'Yozma shartnoma bilan natija kafolati',
    ]
  }
];

export const TEACHERS: Teacher[] = [
  {
    id: 'erkin',
    name: 'Erkin Kosimov',
    role: 'Bosh IELTS Instruktor & Metodist',
    ieltsScore: 'IELTS 9.0',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
    bio: '10 yillik pedagogik tajribaga ega xalqaro toifadagi ekspert. Britaniya va Avstraliyadagi nufuzli metodik markazlar sertifikati sohibi. O\'zbekistondagi barmoq bilan sanarli IELTS 9.0 sohiblaridan biri.',
    experience: '10 yil',
    activeGroups: 8,
    successfulStudents: 1240,
    specialties: ['IELTS Masterclass', 'Academic Writing Task 2', 'Advanced Vocabulary & Collocations', 'Metodologiya'],
    skills: [
      { name: 'Reading', value: 9.0 },
      { name: 'Listening', value: 9.0 },
      { name: 'Speaking', value: 8.5 },
      { name: 'Writing', value: 8.5 },
    ],
    quote: "Mening maqsadim shunchaki ingliz tilini o'rgatish emas, balki shogirdlarimning xalqaro darajada raqobatbardosh bo'lishini ta'minlashdir.",
    isSupport: false
  },
  {
    id: 'sarvinoz',
    name: 'Sarvinoz Nishonova',
    role: 'Writing & Reading Bo\'limi Rahbari',
    ieltsScore: 'IELTS 8.5',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Insho yozish (Writing Task 1 & 2) va murakkab matnlar tahlilida tengsiz o\'qituvchi. Uzoq muddat xorijiy universitetlarda ilmiy izlanishlar olib borgan va ko\'plab nufuzli xalqaro ilmiy insholar muallifi.',
    experience: '6 yil',
    activeGroups: 6,
    successfulStudents: 850,
    specialties: ['Academic Writing', 'Reading Techniques', 'CEFR C1 prep', 'Grammar Correction'],
    skills: [
      { name: 'Reading', value: 9.0 },
      { name: 'Listening', value: 8.5 },
      { name: 'Speaking', value: 8.0 },
      { name: 'Writing', value: 9.0 },
    ],
    quote: "Writing - bu san'at va aniq matematika uyg'unligidir. Siz faqat formulani tushunishingiz kerak, buni darsda amalda ko'rsataman.",
    isSupport: false
  },
  {
    id: 'jasur',
    name: 'Jasur Toshmatov',
    role: 'Speaking & Listening Eksperti',
    ieltsScore: 'IELTS 8.0',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Talaffuz ustida ishlash (Fluency & Coherence) hamda imtihondagi qo\'rquvni yengish bo\'yicha unikal psixologik metodika muallifi. Uning sobiq talabalari Speakingdan rekord darajada 8.0 / 8.5 bandlarni qayd etishmoqda.',
    experience: '7 yil',
    activeGroups: 5,
    successfulStudents: 620,
    specialties: ['Speaking Fluency', 'American/British Pronunciation', 'Listening Tactics', 'Confidence Training'],
    skills: [
      { name: 'Reading', value: 8.0 },
      { name: 'Listening', value: 8.5 },
      { name: 'Speaking', value: 8.5 },
      { name: 'Writing', value: 7.5 },
    ],
    quote: "Inglizcha gapirish poyafzal kiyish kabi tabiiy bo'lishi lozim. Biz darsda xato qilishdan qo'rqmaslik muhitini barpo etganmiz.",
    isSupport: false
  },
  {
    id: 'dilnoza',
    name: 'Dilnoza Yusupova',
    role: 'General English & Pre-IELTS To\'liq Kurs Rahbari',
    ieltsScore: 'IELTS 8.5',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'General English kurslarini tizimli ravishda qurib, o\'quvchilarni noldan professional pre-IELTS va IELTS bosqichigacha olib boruvchi yorqin ustoz. Cambridge TKT sertifikatlangan.',
    experience: '5 yil',
    activeGroups: 7,
    successfulStudents: 980,
    specialties: ['Pre-IELTS Core', 'Interactive Grammar', 'Vocabulary Retention', 'Youth Classes'],
    skills: [
      { name: 'Reading', value: 8.5 },
      { name: 'Listening', value: 8.5 },
      { name: 'Speaking', value: 8.5 },
      { name: 'Writing', value: 8.0 },
    ],
    quote: "Har bir Buyuk IELTS natijasi mustahkam poydevordan (Foundation) boshlanadi. Kelajakni hozirdan boshlab mustahkam qilamiz.",
    isSupport: false
  }
];

export const SUPPORT_TEACHERS: Teacher[] = [
  {
    id: 'maftuna_support',
    name: 'Maftuna Aliyeva',
    role: 'Speaking Assistant & Support Tutor',
    ieltsScore: 'IELTS 7.5',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Speaking darslaridan so\'ng o\'quvchilar bilan individual ravishda qo\'shimcha ko\'nikmalar bo\'yicha amaliyot va erkin speaking mashg\'ulotlarini olib boradi.',
    experience: '3 yil',
    activeGroups: 4,
    successfulStudents: 180,
    specialties: ['One-on-One Speaking', 'Vocabulary Quizzes', 'Confidence Building'],
    skills: [
      { name: 'Reading', value: 7.5 },
      { name: 'Listening', value: 8.0 },
      { name: 'Speaking', value: 8.0 },
      { name: 'Writing', value: 7.0 },
    ],
    isSupport: true
  },
  {
    id: 'bekzod_support',
    name: 'Bekzod Rustamov',
    role: 'Mock Exam Specialist & Writing Checker',
    ieltsScore: 'IELTS 7.0',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Haftalik Computer-Delivered va qog\'ozdagi Mock testlarni tizimli va Cambridge standartida o\'tkazish, insholarni tezkor xatolik tahlili (error analysis) bilan tekshirish bo\'yicha mas\'ul usta.',
    experience: '2 yil',
    activeGroups: 3,
    successfulStudents: 140,
    specialties: ['Mock coordination', 'Writing Correction', 'Test-taking Strategy'],
    skills: [
      { name: 'Reading', value: 7.5 },
      { name: 'Listening', value: 7.0 },
      { name: 'Speaking', value: 7.0 },
      { name: 'Writing', value: 7.0 },
    ],
    isSupport: true
  },
  {
    id: 'rayhona_support',
    name: 'Rayhona Ismoilova',
    role: 'Grammar Coach & Task Coordinator',
    ieltsScore: 'IELTS 7.5',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Vazifalar, lug\'at imtihonlari va darsdan so\'ng qo\'shimcha tushunilmagan mavzularni o\'zlashtirishda o\'quvchilarga g\'amxo\'rlik qiluvchi va ularni qo\'llab-quvvatlovchi ustoz.',
    experience: '3 yil',
    activeGroups: 4,
    successfulStudents: 210,
    specialties: ['Grammar Workshops', 'Daily Vocabulary Check', 'Homework Support'],
    skills: [
      { name: 'Reading', value: 7.5 },
      { name: 'Listening', value: 8.0 },
      { name: 'Speaking', value: 7.5 },
      { name: 'Writing', value: 7.0 },
    ],
    isSupport: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'review-1',
    author: 'Asilbek Azimov',
    fromScore: '5.5',
    toScore: '8.0',
    text: 'Orient Academyda bor-yo‘g‘i 3 oy tahsil olib IELTS imtihonidan 8.0 oldim! Erkin aka Writing bo’yicha yozish uslubimni mutlaqo o‘zgartirib yubordi. Support ustozlar bilan darsdan tashqaridagi amaliyotlar juda yordam berdi.',
    destination: 'Kanada Davlat Universiteti (Stipendiya sohibi)',
    year: '2024',
    avatarInitials: 'AA'
  },
  {
    id: 'review-2',
    author: 'Malika Karimova',
    fromScore: '6.0',
    toScore: '7.5',
    text: 'To‘g‘risi, birinchi urinishdayoq 7.5 olishimni kutmagandim! Sarvinoz opaning har kungi insholarimizni birma-bir tekshirib, xatolarimizni tushuntirishi menga juda katta turtki bo’ldi. Mock imtihonlar esa qog’ozdagi qo’rquvni butunlay yo’qotdi.',
    destination: 'Germaniyaning DAAD dasturi g’olibi',
    year: '2024',
    avatarInitials: 'MK'
  },
  {
    id: 'review-3',
    author: 'Sherzod Raxmatullayev',
    fromScore: 'Noldan',
    toScore: '8.5',
    text: 'Bir yarim yil oldin umuman inglizcha gapirolmasdim. Dilnoza opada Beginner, Pre-Int kurslarini uqib, keyin Erkin akada IELTS guruxida uqidim. Natijam 8.5 bo’ldi! Men hozir Buyuk Britaniya universitetida grant asosida tahsil olyapman. Katta rahmat barcha jamoaga!',
    destination: 'London University (Full Ride Scholarship)',
    year: '2025',
    avatarInitials: 'SR'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: "O'quv markazining to'liq manzili va unga borish qanday?",
    answer: "Bizning manzilimiz: Toshkent shahar, Chilonzor tumani, Lutfiy ko'chasi, Novza metro bekati yaqinida joylashgan. Yandex Maps xaritasida ushbu havola orqali to'g'ridan-to'g'ri yetib kelishingiz mumkin: https://yandex.uz/maps/-/CPToqD5Y yoki koordinatalarimiz: 41.294908, 69.218165."
  },
  {
    id: 'faq-2',
    question: "Birinchi dars (sinov darsi) bepulmi va unga yozilish qanday bo'ladi?",
    answer: "Ha, birinchi sinov darsi mutlaqo bepul. Saytda ariza qoldirishingiz, telegram orqali @orientsupport yoki +998 (95) 383-07-77 raqamimizga qo'ng'iroq qilishingiz kifoya. Biz sizga dars soatlarini moslab, birinchi darsga taklif qilamiz."
  },
  {
    id: 'faq-3',
    question: "Support – yordamchi ustozlar tizimi qanday afzalliklarga ega?",
    answer: "Jamoamizda 3 ta professional support ustozimiz bor: Maftuna, Bekzod va Rayhona. Ular darsdan so'ng o'quvchilar bilan individual ishlaydi, qo'shimcha Speaking suhbatlarini o'tkazadi, xato bo'lgan uy vazifalarini ko'rib chiqadi va har haftalik Mock testlar natijalarini yaxshilashga darsdan tashqari bepul ko'mak ko'rsatadi."
  },
  {
    id: 'faq-4',
    question: "IELTS va CEFR kurslarida natija bo'yicha kafolat bormi?",
    answer: "Ha! Biz to'liq kurslarimizni boshlashda o'quvchilar va ularning ota-onalari bilan ikki tomonlama shartnoma imzolaymiz. Agar o'quvchi darslarga 95%+ qatnashib, barcha uy vazifasini to'liq qilgan holda o'z balliga erisha olmasa, natijaga erishguncha keyingi kurslarimizda MUTLAQO BEPUL o'qiydi."
  },
  {
    id: 'faq-5',
    question: "Darslar qaysi kunlari va soatlarda bo'lib o'tadi?",
    answer: "Guruhlarimiz har soatda: ertalabki 08:30 dan kechki 20:30 gacha mavjud. Quyidagi darslar haftasiga 3 kun (Juft va Toq kunlar) yoki IELTS uchun haftasiga 5 kun (Dushanbadan Jumagacha) jadvaliga asosan tashkil etiladi. Ishlaydigan yoki talabalar uchun qulay kechki guruhlarimiz bor."
  }
];
