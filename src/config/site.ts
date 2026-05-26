export const SITE = {
  name: 'harizma',
  tagline: 'Караоке',
  /** Публичный URL сайта (для canonical, OG, sitemap). Пусто = origin в браузере. */
  siteUrl: 'https://bgt95.github.io/harizma-demo',
  locale: 'ru_RU',
  /** SEO / meta (keep in sync with index.html fallback) */
  metaDescription:
    'Караоке-клуб harizma в центре Москвы: 4 индивидуальных зала, более 50 000 песен, без депозита и пробкового сбора. Бронирование онлайн.',
  keywords:
    'караоке Москва, караоке зал, harizma, караоке клуб, аренда караоке зала, караоке центр Москвы, караоке м. Метро',
  ogImagePath: '/images/hall-1.jpg',
  lcpImagePath: '/images/hero-girl.png',
  metro: 'м. Метро',
  address: 'ул. Сретенский переулок, 4',
  phone: {
    display: '+79 000 000-00-00',
    href: 'tel:+79000000000',
  },
  hours: 'Пн — Вс круглосуточно',
  copyrightYear: 2026,
  telegram: { enabled: false },
  demoDialogTitle: 'Демо-версия',
  demoNoticeMessage: 'Демонстрационная страница, рабочие ссылки на коммерческом сайте',
  bookingStep1Description:
    'Откройте чат-бот для бронирования (на демо-странице ссылка неактивна; на коммерческом сайте — рабочая).',
  links: {
    maps: '',
    telegram: '',
    social: { telegram: '', instagram: '' },
    legal: { terms: '', privacy: '' },
  },
} as const;
