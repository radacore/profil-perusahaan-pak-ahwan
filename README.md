# CV Azhari Permata Mandiri — Profil Perusahaan

Aplikasi profil perusahaan berbasis **Laravel 13 + Inertia.js + React 19 + TypeScript** (starter kit `laravel/react-starter-kit`). Mengelola konten situs publik dan panel admin obfuscated untuk artikel, layanan, portofolio, tim, testimoni, media (S3), dan pengaturan global. Beranda mengonsolidasikan **Portfolio** (filter + lightbox) dan **Tim** (slider) tanpa halaman terpisah — sesuai audit K1–K8 / P1–P12.

> **Brand:** `CV Azhari Permata Mandiri` (fallback `VITE_APP_NAME` / `APP_NAME` / `settings.company_name`).
> **Repo:** `radacore/profil-perusahaan-pak-ahwan` · **Branch:** `main`.

---

## Daftar Isi

- [Fitur](#fitur)
- [Stack](#stack)
- [Persyaratan](#persyaratan)
- [Instalasi](#instalasi)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Build & Deploy](#build--deploy)
- [Struktur Proyek](#struktur-proyek)
- [Rute](#rute)
- [Model & Database](#model--database)
- [Keamanan & Hardening](#keamanan--hardening)
- [Media & Storage](#media--storage)
- [Cache](#cache)
- [Panel Admin](#panel-admin)
- [Halaman Publik](#halaman-publik)
- [Skrip NPM & Composer](#skrip-npm--composer)
- [Troubleshooting](#troubleshooting)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

---

## Fitur

- **Beranda** (`/`) — Hero + subtitle rotasi, layanan unggulan, portofolio (filter by layanan, `PortfolioCard` → `/portfolio/{slug}`), **TeamSlider** & **TestimonialsSlider** 3-per-halaman (autoplay 5s, swipe, dots, keyboard), artikel terbaru. Data di-cache 10 menit.
- **Portofolio detail** (`/portfolio/{slug}`) — Header + thumbnail + deskripsi (sanitasi DOMPurify), **galeri lightbox** (tanpa tab baru): klik gambar → modal, tombol prev/next, keyboard ← → Esc, swipe, counter, dots. SEO: Head title/description/og:image/canonical.
- **Layanan** (`/services`, `/services/{slug}`), **Blog** (`/blog`, `/blog/{slug}`), **Tentang** (`/about`), **Kontak** (`/contact`).
- **Admin obfuscated** (`/rahasianegara/masuksini`, dikonfigurasi via `ADMIN_PATH`) — CRUD Service (icon picker), Portfolio (thumbnail + gallery reorder), Team, Blog/Categories/Tags, Testimonials, Media, Settings (logo/favicon/hero image), About, Contact Submissions. Guard `EnsureIsAdmin` (`role = admin`).
- **Keamanan**: `HtmlSanitizer` (HTMLPurifier), whitelist MIME upload, `ImageService` (quality 82), validasi `role`, index DB `is_published/status`, sanitasi konten publik dengan `dompurify`.

---

## Stack

| Lapisan | Teknologi |
|---------|-----------|
| Backend | PHP 8.4, Laravel 13.21, Inertia Laravel 3, Fortify 1.37, Wayfinder 0.1, HTMLPurifier 4.19 |
| Frontend | React 19, TypeScript 5.7, Vite 8, Tailwind 4, Radix UI, Lucide, Tiptap 3, DOMPurify 3.4 |
| Storage | MySQL (default `profilkorp_app`), S3 (NevaObjects / AWS S3, via `league/flysystem-aws-s3-v3`), filesystem `local` |
| Tooling | Pint, PHPStan (Larastan), ESLint 9, Prettier + tailwind plugin, React Compiler |

---

## Persyaratan

- PHP **^8.3** (teruji 8.4.18), Composer 2
- Node **22** (teruji 22.22.0), npm 10+
- MySQL 8 / MariaDB (atau SQLite untuk dev ringan)
- Kredensial S3 (bucket NevaObjects / AWS) untuk upload media

Cek versi:

```bash
php -v
node -v
composer --version
```

---

## Instalasi

```bash
git clone https://github.com/radacore/profil-perusahaan-pak-ahwan.git
cd profil-perusahaan-pak-ahwan   # atau profilkorp-app sesuai clone

# 1) Dependensi PHP & JS
composer install
npm install

# 2) Environment
cp .env.example .env
php artisan key:generate

# 3) Database + seed
php artisan migrate
# atau dengan dummy data:
php artisan migrate --seed
# seeder: DatabaseSeeder + DummyDataSeeder

# 4) Storage link (untuk proxy S3 / upload lokal)
php artisan storage:link
```

> `composer setup` menjalankan rangkaian di atas + `npm run build` secara otomatis:
> ```bash
> composer setup
> ```

---

## Konfigurasi Environment

Salin dan isi `.env` dari `.env.example`:

```ini
APP_NAME="CV Azhari Permata Mandiri"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=profilkorp_app
DB_USERNAME=root
DB_PASSWORD=

CACHE_STORE=database
# CACHE_PREFIX=  # default: cv-azhari-permata-mandiri-cache-

# Obfuscated admin path — harus sinkron dengan VITE_ADMIN_PATH
ADMIN_PATH=dashboard-admin
VITE_ADMIN_PATH="${ADMIN_PATH}"
VITE_APP_NAME="${APP_NAME}"

# S3 / NevaObjects
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_ENDPOINT=
AWS_USE_PATH_STYLE_ENDPOINT=false
AWS_URL=

# Mail (log di local)
MAIL_MAILER=log
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

**Catatan:**
- `ADMIN_PATH` default `dashboard-admin` → login admin di `/rahasianegara/masuksini` (lihat `routes/web.php`, `bootstrap/app.php` `redirectGuestsTo`). Ubah path obfuscated via env dan jangan commit kredensial S3.
- `CACHE_STORE=database` memakai tabel `cache`; prefix `cv-azhari-permata-mandiri-cache-` (lihat `config/cache.php`).
- Rotasi kredensial S3 berkala disarankan (catatan di `.env.example`).

---

## Menjalankan Aplikasi

### Mode pengembangan (disarankan)

Menjalankan **server, queue, pail, dan Vite HMR** sekaligus:

```bash
composer dev
# alias: php artisan dev
# menjalankan: php artisan serve --host=localhost
#             php artisan queue:listen --tries=1 --timeout=0
#             php artisan pail --timeout=0
#             npm run dev (Vite HMR di http://localhost:5173, APP_URL http://localhost:8000)
```

Dev processes terdaftar di `php artisan dev:list`:

```
server  php artisan serve --host=localhost
queue   php artisan queue:listen --tries=1 --timeout=0
logs    php artisan pail --timeout=0
vite    npm run dev
```

### Alternatif manual

```bash
php artisan serve --host=localhost   # http://localhost:8000
npm run dev                          # HMR — jaga VITE_APP_NAME / ADMIN_PATH sinkron
php artisan queue:listen --tries=1
```

Setelah ganti `.env` / `APP_NAME` / `ADMIN_PATH`, jalankan:

```bash
php artisan config:clear
php artisan cache:clear
# restart artisan serve / vite agar env baru terbaca (proses lama cache env di memory)
```

---

## Build & Deploy

```bash
npm run build          # Vite build → public/build (manifest.json)
npm run build:ssr      # + SSR build bila diperlukan
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

- `public/build` di-ignore (`.gitignore:4`), deploy harus menjalankan `npm run build` di CI/server.
- `VITE_APP_NAME` dan `ADMIN_PATH` harus tersedia saat build (Vite inline env).

---

## Struktur Proyek

```
.
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/          # Dashboard, Auth, Service, PortfolioProject, TeamMember, BlogPost, Media, Settings, About, Testimonial
│   │   │   └── Public/         # HomepageController, PortfolioController (show), ServiceController, BlogController, ContactController, AboutController
│   │   └── Middleware/
│   │       ├── HandleInertiaRequests.php  # share: name (config app.name), settings (Cache global_settings), appUrl
│   │       └── EnsureIsAdmin.php          # guard role admin
│   ├── Models/                 # Service, PortfolioProject, PortfolioImage, Media, TeamMember, BlogPost, Testimonial, GlobalSetting, User, ...
│   ├── Services/ImageService.php  # kualitas 82, whitelist MIME, resize/optimize
│   └── Support/HtmlSanitizer.php  # HTMLPurifier wrapper
├── bootstrap/app.php           # redirectGuestsTo('/rahasianegara/masuksini'), middleware alias is_admin
├── config/
│   ├── app.php                 # name env('APP_NAME','Laravel')
│   └── cache.php               # store database, prefix cv-azharia..., serializable_classes whitelist
├── database/
│   ├── migrations/             # users, cache, jobs, passkeys, pages, services, portfolio, media, team, blog, testimonial, settings, + 2026_07/09_09 K8/P4
│   └── seeders/                # DatabaseSeeder, DummyDataSeeder (fallback company_name)
├── resources/
│   ├── js/
│   │   ├── app.tsx             # appName = VITE_APP_NAME || 'CV Azharia...'
│   │   ├── layouts/            # public-layout.tsx, admin-layout.tsx
│   │   ├── pages/
│   │   │   ├── Public/         # Homepage.tsx (sliders), Portfolio/Show.tsx (lightbox), Services, Blog, About, Contact
│   │   │   └── Admin/          # Login, Dashboard, Services/*, Portfolio/*, Team, Blog, Settings, Media, ...
│   │   ├── components/         # image-carousel, Admin/icon-picker, ui/*
│   │   ├── lib/                # sanitize.ts (dompurify), service-icons.tsx
│   │   └── types/global.d.ts
│   ├── views/app.blade.php     # @vite(['resources/css/app.css','resources/js/app.tsx']), title config app.name
│   └── css/app.css
├── routes/web.php              # home, about, blog, contact, services, portfolio/{slug}, s3 proxy, admin group
├── vite.config.ts              # laravel input app.css/app.tsx, wayfinder, react
└── public/                     # build/ (generated)
```

---

## Rute

Jalankan `php artisan route:list` untuk daftar lengkap (110 routes). Ringkas:

| Metode | URI | Nama | Handler |
|--------|-----|------|---------|
| GET | `/` | `home` | `Public\HomepageController` |
| GET | `/about` | `about` | `Public\AboutController` |
| GET | `/blog`, `/blog/{slug}` | `blog.index`, `blog.show` | `Public\BlogController` |
| GET | `/contact` + POST | `contact.index`, `contact.store` | `Public\ContactController` |
| GET | `/services`, `/services/{slug}` | `services.index`, `services.show` | `Public\ServiceController` |
| GET | `/portfolio/{slug}` | `portfolio.show` | `Public\PortfolioController@show` |
| GET | `/login` | `login` | redirect → `/rahasianegara/masuksini` (fix 405) |
| ANY | `/portfolio`, `/register`, `/team` | — | redirect controller (legacy) |
| GET | `/storage/s3/{path}` | `s3.proxy` | proxy S3 (NevaObjects) |
| GET/POST | `/rahasianegara/masuksini` | `secret.login` | `Admin\AuthController` (obfuscated login) |
| — | `dashboard-admin/*` | `admin.*` | group `auth` + `is_admin` (services, portfolio, team, blog, testimonials, media, settings, about, contact-submissions) |
| GET | `/up` | — | health check |

---

## Model & Database

**Migrasi inti** (`database/migrations`):

- `0001_01_01_*` users / cache / jobs
- `2024_01_01` passkeys
- `2024_01_02_*` pages, page_versions, services, portfolio_projects, media, portfolio_images, team_members, blog_categories, blog_tags, blog_posts, blog_post_tag, testimonials, contact_submissions, global_settings
- `2024_01_03` `thumbnail_url` di portfolio_projects
- `2026_07_28` `icon_name` di services (icon picker)
- `2026_09_09_000001` FK `portfolio_projects.service_id` → `nullOnDelete` (sebelumnya cascade)
- `2026_09_09_000002` index `is_published` / `status` (`services`, `portfolio_projects`, `team_members`, `blog_posts`, `testimonials`)
- `2026_09_09_000003` `role` di `users` (`is_admin` / `admin` string, middleware `EnsureIsAdmin`)

**Seeder**: `DatabaseSeeder` + `DummyDataSeeder` — isi services, portfolio (dengan gallery), team, blog, testimonials, `GlobalSetting.company_name = CV Azhari Permata Mandiri`.

---

## Keamanan & Hardening

- **HTML**: `App\Support\HtmlSanitizer::clean()` (HTMLPurifier) untuk `services.description`, `portfolio.description`, `pages.content`; frontend `sanitizeHtml()` via `dompurify` (`resources/js/lib/sanitize.ts`, `@types/dompurify`).
- **Upload**: `ImageService` (quality 82, whitelist MIME image/jpeg/png/webp/gif), validasi di `ServiceController`, `PortfolioProjectController`, `TeamMemberController`, `TestimonialController`, `MediaController`, `SettingController`.
- **Auth**: `EnsureIsAdmin` + `bootstrap/app.php` alias `is_admin`; `User` field `role`; `redirectGuestsTo('/rahasianegara/masuksini')`; `GET /login` di-redirect permanen (hindari 405).
- **Cache**: `config/cache.php` `serializable_classes` whitelist Eloquent collections agar `homepage_data` tidak jadi `__PHP_Incomplete_Class`; beranda serialize ke **plain arrays** + frontend guard `Array.isArray`.

---

## Media & Storage

- Disk `s3` (`AWS_*` env) untuk `Media.s3_url`; proxy publik `GET /storage/s3/{path}` (`routes/web.php:37`) agar URL tidak expose kredensial.
- `PortfolioImage` (FK `portfolio_projects`, `media_id`, `display_order`, `alt_text`) + gallery reorder endpoint `admin.portfolio.gallery.reorder`.
- `TeamMember` / `Testimonial` / `Service` punya endpoint upload terpisah (`/icon`, `/image`, `/photo`, `/hero-image`, `/logo`, `/favicon`).

---

## Cache

- **Store**: `database` (`CACHE_STORE=database`, tabel `cache`, prefix `cv-azhari-permata-mandiri-cache-`).
- **Beranda**: `HomepageController::__invoke()` `Cache::remember('homepage_data', 600, ...)` — 10 menit, isi `services`, `posts` (3 latest), `testimonials`, `portfolioProjects` (12), `portfolioServices`, `teamMembers` (8) — semua `toArray()`/mapping plain. Invalidate di admin controllers via `Cache::forget('homepage_data')`.
- **Settings**: `HandleInertiaRequests` `Cache::remember('global_settings', 3600, ...)` — 1 jam.
- Setelah migrasi / ganti prefix, bersihkan: `php artisan cache:clear` dan hapus row legacy `profilkorp-cache-*` bila ada.

---

## Panel Admin

- **URL**: `/{ADMIN_PATH}` (default `dashboard-admin`) + login obfuscated `/rahasianegara/masuksini`. Jangan expose `ADMIN_PATH` di URL publik; share via `VITE_ADMIN_PATH` untuk frontend bila perlu.
- **Guard**: `auth` + `is_admin` (`EnsureIsAdmin`), field `users.role` (`admin`).
- **Menu**: Sidebar dikelompokkan (Konten/Manajemen/Pengaturan).
- **Fitur**: CRUD lengkap + upload + reorder gallery + icon picker (Service).

---

## Halaman Publik

- **Homepage** (`resources/js/pages/Public/Homepage.tsx`): `PortfolioCard` sebagai `Link` ke `/portfolio/{slug}`, `PortfolioFilter` (chips), `TeamSlider` & `TestimonialsSlider` (chunk 3, translateX, autoplay, swipe `diff>50`, dots, prev/next, keyboard).
- **Portfolio Show** (`resources/js/pages/Public/Portfolio/Show.tsx`): galeri grid 2 kolom, **lightbox modal** (backdrop `bg-black/80`, `role=dialog`), `useState lightboxIndex`, `goPrev/goNext` loop, `useEffect` lock `body.overflow` + listener `Escape/ArrowLeft/ArrowRight`, swipe handler, thumbnails tidak buka tab baru.
- SEO di `About/Blog/Services/Contact/Portfolio/Show` via Inertia `Head` (`title`, `meta description`, `og:*`, `canonical` dari `appUrl`/`window.location.origin`).

---

## Skrip NPM & Composer

```bash
# Composer
composer install
composer setup          # install + key:generate + migrate + npm install + build
composer dev            # dev processes (serve + queue + pail + vite)
composer lint           # pint --parallel
composer lint:check
composer types:check    # phpstan analyse
composer test           # config:clear + lint:check + types:check + phpunit
composer ci:check       # lint:check + format:check + types:check + test

# NPM
npm install
npm run dev             # vite HMR (Vite 8)
npm run build           # production build
npm run build:ssr       # + SSR
npm run lint            # eslint --fix
npm run lint:check
npm run format          # prettier --write resources/
npm run format:check    # prettier --check
npm run types:check     # tsc --noEmit
```

---

## Troubleshooting

| Gejala | Penyebab | Solusi |
|--------|----------|--------|
| `services.map is not a function` / `__PHP_Incomplete_Class` di Inertia props | `homepage_data` cache berisi `Eloquent\Collection` ter-serialize dengan `serializable_classes=false` | Sudah fix: `HomepageController` serialize plain arrays + `config/cache.php` whitelist + frontend `Array.isArray` guard. Jika muncul lagi: `php artisan cache:clear` + `DB::table('cache')->where('key','like','%homepage%')->delete()` + restart `php artisan dev`. |
| Title masih `ProfilKorp` / `VITE_APP_NAME=ProfilKorp` | `php artisan serve` / Vite masih baca env lama (proses tidak restart) | `php artisan config:clear && php artisan cache:clear`, kill `artisan serve`/`vite` lalu `composer dev` / `npm run dev` ulang. Pastikan `.env` `APP_NAME="CV Azhari Permata Mandiri"`. |
| `GET /login` 405 | Route fortify hanya `POST /login` | Sudah di-fix: `routes/web.php:29` `GET /login → 301 /rahasianegara/masuksini`; `bootstrap/app.php` `redirectGuestsTo(...)`. |
| `npm run types:check` error casing `icon-picker` | Import path casing mismatch (macOS case-insensitive) | Sudah selaras `resources/js/components/Admin/icon-picker.tsx` + import `@/components/Admin/icon-picker`. Jaga casing konsisten. |
| S3 upload gagal / `s3.proxy` 403 | Kredensial `AWS_*` belum isi / `AWS_ENDPOINT` salah | Isi `.env` S3, rotasi berkala; cek `AWS_USE_PATH_STYLE_ENDPOINT`, `AWS_BUCKET`, `AWS_URL`. |
| Cache prefix ganda `profilkorp-cache-*` & `cv-azhari-...` | Ganti `APP_NAME` tanpa clear cache DB | `php artisan tinker --execute "DB::table('cache')->where('key','like','%profilkorp-cache%')->delete();"` |

---

## Kontribusi

1. Buat branch dari `main`: `git checkout -b feat/nama-fitur`
2. Ikuti **Conventional Commits** (subject Bahasa Indonesia, imperative, lowercase, ≤72 char, tanpa titik — lihat `~/.config/opencode/skills/commit-conventions/SKILL.md`).
3. Jalankan `composer ci:check` sebelum push.
4. Buka PR ke `main` — jangan `push --force` tanpa instruksi.

---

## Lisensi

MIT — lihat `LICENSE` (starter kit Laravel).
