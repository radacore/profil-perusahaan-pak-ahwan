<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\BlogTag;
use App\Models\ContactSubmission;
use App\Models\PortfolioProject;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\User;
use App\Models\Page;
use App\Models\ContentVersion;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DummyDataSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrFail();
        $aboutPage = Page::where('slug', 'about')->firstOrFail();

        // ── Services ──
        $services = [];
        $serviceData = [
            ['slug' => 'pengembangan-web', 'title' => 'Pengembangan Web', 'description' => '<p>Kami menyediakan layanan pengembangan web profesional menggunakan teknologi terkini seperti Laravel, React, dan Vue.js. Dari website perusahaan hingga aplikasi web kompleks, tim kami siap membantu mewujudkan solusi digital Anda.</p><p>Layanan mencakup pengembangan front-end, back-end, integrasi API, dan optimasi performa.</p>', 'short_description' => 'Membangun website dan aplikasi web profesional dengan teknologi terkini', 'is_published' => true],
            ['slug' => 'desain-grafis', 'title' => 'Desain Grafis', 'description' => '<p>Tim desainer berpengalaman kami siap menciptakan identitas visual yang kuat untuk brand Anda. Mulai dari logo, brosur, hingga konten media sosial, setiap desain dibuat dengan pendekatan strategis dan estetis.</p><p>Kami menggabungkan kreativitas dengan riset pasar untuk menghasilkan desain yang tidak hanya indah tapi juga efektif.</p>', 'short_description' => 'Desain logo, branding, dan materi promosi yang memikat', 'is_published' => true],
            ['slug' => 'digital-marketing', 'title' => 'Digital Marketing', 'description' => '<p>Tingkatkan visibilitas bisnis Anda dengan strategi digital marketing yang terukur. Kami menawarkan layanan SEO, SEM, manajemen media sosial, dan email marketing yang dirancang untuk menghasilkan ROI maksimal.</p><p>Kami menggunakan data-driven approach untuk setiap kampanye yang kami jalankan.</p>', 'short_description' => 'Strategi pemasaran digital untuk mengembangkan bisnis Anda', 'is_published' => true],
            ['slug' => 'konsultasi-it', 'title' => 'Konsultasi IT', 'description' => '<p>Butuh panduan dalam pengambilan keputusan teknologi? Tim konsultan IT kami siap membantu Anda merencanakan strategi teknologi yang sesuai dengan kebutuhan dan anggaran bisnis Anda.</p><p>Kami menyediakan analisis sistem, rekomendasi arsitektur, dan perencanaan transformasi digital.</p>', 'short_description' => 'Konsultasi strategi teknologi untuk transformasi digital bisnis', 'is_published' => true],
        ];
        foreach ($serviceData as $data) {
            $services[] = Service::create($data);
        }

        // ── Blog Categories ──
        $categories = [];
        $catData = [
            ['slug' => 'teknologi', 'name' => 'Teknologi', 'description' => 'Artikel seputar teknologi terkini dan perkembangannya'],
            ['slug' => 'bisnis', 'name' => 'Bisnis', 'description' => 'Tips dan strategi untuk mengembangkan bisnis'],
            ['slug' => 'desain', 'name' => 'Desain', 'description' => 'Inspirasi dan panduan desain grafis dan UI/UX'],
            ['slug' => 'marketing', 'name' => 'Marketing', 'description' => 'Strategi pemasaran digital dan konvensional'],
        ];
        foreach ($catData as $data) {
            $categories[] = BlogCategory::create($data);
        }

        // ── Blog Tags ──
        $tags = [];
        $tagNames = ['Laravel', 'React', 'UI/UX', 'SEO', 'Startup', 'Branding'];
        foreach ($tagNames as $name) {
            $tags[] = BlogTag::create(['slug' => str($name)->slug(), 'name' => $name]);
        }

        // ── Blog Posts ──
        $now = Carbon::now();
        $postsData = [
            [
                'title' => 'Cara Membangun Website Perusahaan yang Efektif',
                'content' => '<h2>Pendahuluan</h2><p>Website perusahaan adalah wajah bisnis Anda di dunia digital. Artikel ini akan membahas langkah-langkah penting dalam membangun website yang tidak hanya menarik tapi juga fungsional.</p><h3>1. Tentukan Tujuan Website</h3><p>Sebelum membangun, tentukan apa tujuan utama website Anda. Apakah untuk branding, penjualan, atau informasi?</p><h3>2. Pilih Platform yang Tepat</h3><p>Laravel adalah pilihan tepat untuk website perusahaan karena keamanan, skalabilitas, dan kemudahan maintenance.</p><h3>3. Desain Responsif</h3><p>Pastikan website tampil sempurna di semua perangkat, dari desktop hingga smartphone.</p><h3>Kesimpulan</h3><p>Website yang efektif adalah investasi jangka panjang untuk bisnis Anda.</p>',
                'slug' => 'cara-membangun-website-perusahaan-efektif',
                'author' => 'Tim ProfilKorp',
                'status' => 'published',
                'published_at' => $now->copy()->subDays(10),
                'meta_title' => 'Cara Membangun Website Perusahaan yang Efektif - ProfilKorp',
                'meta_description' => 'Panduan lengkap membangun website perusahaan yang efektif dan profesional.',
                'category' => $categories[0],
                'tagKeys' => [0, 1],
            ],
            [
                'title' => '5 Tren Desain Grafis 2026 yang Wajib Diketahui',
                'content' => '<h2>Pendahuluan</h2><p>Dunia desain grafis terus berkembang. Di tahun 2026, ada beberapa tren yang diprediksi akan mendominasi industri kreatif.</p><h3>1. Minimalis Bertekstur</h3><p>Desain minimalis tetap populer, namun dengan tambahan tekstur dan elemen organik yang memberi kedalaman.</p><h3>2. Tipografi Ekspresif</h3><p>Penggunaan tipografi yang berani dan ekspresif sebagai elemen utama desain.</p><h3>3. Warna-warna Earth Tone</h3><p>Palet warna alami dan hangat menjadi pilihan utama untuk menciptakan kesan autentik.</p><h3>Kesimpulan</h3><p>Ikuti tren ini untuk menjaga desain Anda tetap relevan dan menarik.</p>',
                'slug' => '5-tren-desain-grafis-2026',
                'author' => 'Tim ProfilKorp',
                'status' => 'published',
                'published_at' => $now->copy()->subDays(7),
                'meta_title' => '5 Tren Desain Grafis 2026 - ProfilKorp',
                'meta_description' => 'Ketahui tren desain grafis terbaru di tahun 2026.',
                'category' => $categories[2],
                'tagKeys' => [2, 5],
            ],
            [
                'title' => 'Panduan SEO untuk Pemula: Mulai dari Mana?',
                'content' => '<h2>Apa itu SEO?</h2><p>SEO (Search Engine Optimization) adalah proses mengoptimalkan website agar muncul di peringkat atas hasil pencarian Google.</p><h3>1. Riset Kata Kunci</h3><p>Mulai dengan mencari kata kunci yang relevan dengan bisnis Anda menggunakan tools seperti Google Keyword Planner.</p><h3>2. Optimasi On-Page</h3><p>Pastikan setiap halaman memiliki meta title, meta description, dan heading yang optimal.</p><h3>3. Kecepatan Website</h3><p>Google memprioritaskan website yang cepat. Gunakan caching dan optimasi gambar.</p><h3>Kesimpulan</h3><p>SEO adalah investasi jangka panjang. Mulai sekarang juga!</p>',
                'slug' => 'panduan-seo-untuk-pemula',
                'author' => 'Tim ProfilKorp',
                'status' => 'published',
                'published_at' => $now->copy()->subDays(5),
                'meta_title' => 'Panduan SEO untuk Pemula - ProfilKorp',
                'meta_description' => 'Panduan SEO step-by-step untuk pemula yang ingin website-nya muncul di Google.',
                'category' => $categories[3],
                'tagKeys' => [3],
            ],
            [
                'title' => 'Strategi Digital Marketing untuk UMKM',
                'content' => '<h2>Mengapa Digital Marketing Penting?</h2><p>Di era digital, UMKM yang tidak memanfaatkan pemasaran online akan tertinggal dari pesaing.</p><h3>1. Manfaatkan Media Sosial</h3><p>Instagram, Facebook, dan TikTok adalah platform yang efektif untuk menjangkau target audiens.</p><h3>2. Email Marketing</h3><p>Bangun hubungan dengan pelanggan melalui newsletter dan email promosi yang personal.</p><h3>3. Google My Business</h3><p>Daftarkan bisnis Anda di Google My Business agar mudah ditemukan pelanggan lokal.</p><h3>Kesimpulan</h3><p>Mulai dengan strategi sederhana dan konsisten, lalu evaluasi hasilnya secara berkala.</p>',
                'slug' => 'strategi-digital-marketing-umkm',
                'author' => 'Tim ProfilKorp',
                'status' => 'published',
                'published_at' => $now->copy()->subDays(3),
                'meta_title' => 'Strategi Digital Marketing untuk UMKM - ProfilKorp',
                'meta_description' => 'Panduan digital marketing untuk UMKM agar bersaing di era digital.',
                'category' => $categories[3],
                'tagKeys' => [3, 4],
            ],
            [
                'title' => 'Tips Memilih Jasa Konsultan IT yang Tepat',
                'content' => '<h2>Mengapa Perlu Konsultan IT?</h2><p>Konsultan IT membantu bisnis Anda mengambil keputusan teknologi yang tepat tanpa harus memiliki tim IT internal yang besar.</p><h3>1. Cek Portofolio</h3><p>Lihat proyek-proyek sebelumnya yang pernah dikerjakan oleh konsultan tersebut.</p><h3>2. Pahami Pendekatan Mereka</h3><p>Konsultan yang baik akan mendengarkan kebutuhan Anda terlebih dahulu sebelum memberikan solusi.</p><h3>3. Komunikasi yang Jelas</h3><p>Pastikan konsultan mampu menjelaskan hal-hal teknis dengan bahasa yang mudah dipahami.</p><h3>Kesimpulan</h3><p>Konsultan IT yang tepat adalah mitra yang akan membantu bisnis Anda tumbuh.</p>',
                'slug' => 'tips-memilih-konsultan-it',
                'author' => 'Tim ProfilKorp',
                'status' => 'published',
                'published_at' => $now->copy()->subDays(1),
                'meta_title' => 'Tips Memilih Jasa Konsultan IT - ProfilKorp',
                'meta_description' => 'Panduan memilih konsultan IT yang tepat untuk bisnis Anda.',
                'category' => $categories[1],
                'tagKeys' => [4],
            ],
        ];

        foreach ($postsData as $data) {
            $tagKeys = $data['tagKeys'];
            $category = $data['category'];
            unset($data['tagKeys'], $data['category']);

            $post = BlogPost::create($data);
            $post->blogCategory()->associate($category);
            $post->save();

            $postTags = [];
            foreach ($tagKeys as $key) {
                $postTags[] = $tags[$key]->id;
            }
            $post->blogTags()->attach($postTags);
        }

        // ── Team Members ──
        $teamData = [
            ['name' => 'Ahmad Rizki', 'title' => 'CEO & Founder', 'bio' => 'Berpengalaman lebih dari 15 tahun di industri teknologi. Mendirikan ProfilKorp dengan visi membantu bisnis bertransformasi secara digital.', 'email' => 'ahmad@profilkorp.com', 'is_published' => true],
            ['name' => 'Siti Nurhaliza', 'title' => 'Lead Designer', 'bio' => 'Desainer kreatif dengan spesialisasi di UI/UX dan branding. Telah menangani lebih dari 50 proyek desain untuk berbagai klien.', 'email' => 'siti@profilkorp.com', 'is_published' => true],
            ['name' => 'Budi Santoso', 'title' => 'Web Developer Senior', 'bio' => 'Full-stack developer dengan keahlian di Laravel, React, dan arsitektur cloud. Sertifikasi AWS Solutions Architect.', 'email' => 'budi@profilkorp.com', 'is_published' => true],
            ['name' => 'Dewi Lestari', 'title' => 'Marketing Manager', 'bio' => 'Ahli digital marketing dengan track record meningkatkan engagement hingga 300% untuk klien-klien sebelumnya.', 'email' => 'dewi@profilkorp.com', 'is_published' => true],
        ];
        foreach ($teamData as $data) {
            TeamMember::create($data);
        }

        // ── Portfolio Projects ──
        $projectsData = [
            ['title' => 'Website E-commerce Toko Makmur', 'slug' => 'ecommerce-toko-makmur', 'description' => '<p>Membangun platform e-commerce lengkap untuk Toko Makmur dengan fitur manajemen produk, keranjang belanja, pembayaran online, dan dashboard penjualan.</p><p>Teknologi yang digunakan: Laravel, React, MySQL, Midtrans.</p>', 'client_name' => 'Toko Makmur', 'project_date' => '2026-06-15', 'service_id' => $services[0]->id, 'is_published' => true],
            ['title' => 'Aplikasi Mobile Sinar Sehat', 'slug' => 'aplikasi-sinar-sehat', 'description' => '<p>Mengembangkan aplikasi mobile untuk klinik Sinar Sehat dengan fitur booking janji, rekam medis digital, dan telekonsultasi.</p><p>Teknologi yang digunakan: React Native, Laravel API, PostgreSQL.</p>', 'client_name' => 'Klinik Sinar Sehat', 'project_date' => '2026-05-20', 'service_id' => $services[0]->id, 'is_published' => true],
            ['title' => 'Redesain Branding Warung Kopi', 'slug' => 'redesain-warung-kopi', 'description' => '<p>Merancang ulang identitas visual untuk Warung Kopi Nusantara termasuk logo baru, kemasan, menu digital, dan konten media sosial.</p>', 'client_name' => 'Warung Kopi Nusantara', 'project_date' => '2026-04-10', 'service_id' => $services[1]->id, 'is_published' => true],
            ['title' => 'Sistem Informasi Sekolah Prestasi', 'slug' => 'sistem-informasi-sekolah', 'description' => '<p>Membangun sistem informasi manajemen sekolah lengkap dengan fitur manajemen siswa, jadwal pelajaran, nilai, dan laporan akademik.</p><p>Teknologi yang digunakan: Laravel, Vue.js, MySQL.</p>', 'client_name' => 'SMA Prestasi Bangsa', 'project_date' => '2026-03-01', 'service_id' => $services[3]->id, 'is_published' => true],
        ];
        foreach ($projectsData as $data) {
            PortfolioProject::create($data);
        }

        // ── Testimonials ──
        $testimonialsData = [
            ['client_name' => 'Bambang Sugiarto', 'client_company' => 'PT Maju Jaya', 'client_title' => 'Direktur Utama', 'message' => 'Sangat profesional! Tim ProfilKorp berhasil membangun website perusahaan kami tepat waktu dengan kualitas yang melebihi ekspektasi. Komunikasi selama proses pengerjaan sangat lancar.', 'rating' => 5, 'status' => 'approved'],
            ['client_name' => 'Fitri Handayani', 'client_company' => 'CV Kreatif Mandiri', 'client_title' => 'Owner', 'message' => 'Desainnya luar biasa! Branding baru kami berhasil meningkatkan brand awareness secara signifikan. Terima kasih ProfilKorp!', 'rating' => 5, 'status' => 'approved'],
            ['client_name' => 'Hendra Gunawan', 'client_company' => 'Toko Berkah', 'client_title' => 'Manajer', 'message' => 'Sejak menggunakan jasa digital marketing dari ProfilKorp, penjualan online kami meningkat 150% dalam 3 bulan. Sangat recommended!', 'rating' => 5, 'status' => 'approved'],
            ['client_name' => 'Ratna Dewi', 'client_company' => 'Yayasan Peduli', 'client_title' => 'Ketua Yayasan', 'message' => 'Tim sangat responsif dan memahami kebutuhan kami. Sistem informasi yang dibangun sangat membantu operasional yayasan sehari-hari.', 'rating' => 4, 'status' => 'approved'],
        ];
        foreach ($testimonialsData as $data) {
            Testimonial::create($data);
        }

        // ── Contact Submissions ──
        $contactsData = [
            ['name' => 'Andi Pratama', 'email' => 'andi@email.com', 'subject' => 'Permintaan Penawaran Website', 'message' => 'Halo, saya tertarik dengan layanan pengembangan web. Bisakah saya mendapatkan penawaran harga untuk website perusahaan dengan fitur e-commerce? Terima kasih.', 'status' => 'new'],
            ['name' => 'Rina Wulandari', 'email' => 'rina@email.com', 'subject' => 'Konsultasi Branding', 'message' => 'Selamat siang, perusahaan saya sedang membutuhkan jasa redesain logo dan branding. Apakah ada paket khusus untuk startup? Mohon informasinya.', 'status' => 'read'],
            ['name' => 'Bambang Supriyadi', 'email' => 'bambang@email.com', 'subject' => 'Kerjasama Digital Marketing', 'message' => 'Kami tertarik untuk kerjasama jangka panjang untuk digital marketing. Mohon dihubungi kembali untuk diskusi lebih lanjut.', 'status' => 'archived'],
        ];
        foreach ($contactsData as $data) {
            ContactSubmission::create($data);
        }

        // ── Page Versions (one version for the About page) ──
        ContentVersion::create([
            'page_id' => $aboutPage->id,
            'content' => $aboutPage->content,
            'meta_title' => $aboutPage->meta_title,
            'meta_description' => $aboutPage->meta_description,
            'admin_id' => $admin->id,
            'change_notes' => 'Versi awal halaman tentang kami',
        ]);

        $this->command?->info('Dummy data berhasil diinput!');
    }
}
