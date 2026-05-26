# harizma — демо-лендинг караоке-клуба

Одностраничный маркетинговый сайт караоке-клуба **harizma** (React + Vite + TypeScript + Tailwind). Это **демонстрационная версия**: контакты и внешние ссылки — заглушки, бронирование через Telegram-бот показывает информационное окно вместо перехода в мессенджер.

**Живой пример:** `https://bgt95.github.io/harizma-demo/`

---

## Стек

- React 19, Vite 7, TypeScript
- Tailwind CSS 3, Radix UI (диалоги)
- GSAP + ScrollTrigger, Swiper
- Vitest + Testing Library

---

## Быстрый старт

```bash
npm install
npm run dev
```

Сайт откроется на [http://localhost:3000](http://localhost:3000).

### Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Локальная разработка (`base: /`) |
| `npm run build` | Production-сборка для корня домена |
| `npm run build:pages` | Сборка для GitHub Pages (`base: /harizma-demo/`) |
| `npm run deploy:pages` | Сборка и публикация в ветку `gh-pages` |
| `npm run preview` | Просмотр последней сборки |
| `npm run test` | Unit/smoke-тесты (Vitest) |
| `npm run lint` | ESLint |

---

## GitHub Pages (репозиторий `harizma-demo`)

URL: **https://bgt95.github.io/harizma-demo/** (base path `/harizma-demo/`).

Деплой автоматический: при push в `main` срабатывает workflow `.github/workflows/deploy.yml` (GitHub Actions → Pages).

В **Settings → Pages** источник должен быть **GitHub Actions** (настраивается автоматически после первого успешного деплоя).

---

## Конфигурация

Все брендовые данные и демо-тексты — в одном файле:

`src/config/site.ts`

| Поле | Назначение |
|------|------------|
| `name`, `metro`, `phone`, `address` | Отображаемые заглушки (не продакшен-контакты) |
| `demoNoticeMessage` | Текст модалки «демо-версия» |
| `links.*` | Пустые строки → кнопки открывают демо-диалог |
| `siteUrl` | Публичный URL для canonical/OG (заполнить после деплоя) |

Данные залов: `src/data/halls.ts` (4 зала; HALL №4 использует `hall-5.jpg`).

---

## Структура проекта

```
src/
  config/site.ts      # бренд, SEO, демо-тексты, ссылки
  data/halls.ts       # залы
  sections/           # Hero, Halls, Advantages, Booking, FAQ
  components/         # Header, Footer, MenuOverlay, DemoNoticeDialog
  lib/seo.ts          # meta + JSON-LD в runtime
public/
  images/             # статика, промо-SVG, залы
  robots.txt, llms.txt
```

---

## SEO и доступность

- Meta-теги и JSON-LD в `index.html` + динамическое обновление в `main.tsx`
- `public/robots.txt`, `public/llms.txt` для краулеров
- Lazy-load тяжёлых секций, code splitting (React, GSAP, Swiper)
- Учёт `prefers-reduced-motion` в Hero (видео отключается)

---

## Демо-поведение (намеренно)

- Телефон, метро и адрес — **заглушки** для макета
- Telegram, карты, соцсети и legal-ссылки пустые → показывается `DemoNoticeDialog`
- На коммерческом сайте достаточно заполнить `SITE.links` и включить `telegram.enabled`

---

## Лицензия

Демо-проект. Уточните лицензию у правообладателя перед коммерческим использованием.
