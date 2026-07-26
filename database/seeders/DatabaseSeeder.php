<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Page;
use App\Models\GlobalSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@profilkorp.com',
            'password' => Hash::make('password'),
        ]);

        Page::create([
            'slug' => 'about',
            'title' => 'Tentang Kami',
            'content' => '<h2>Selamat Datang di Perusahaan Kami</h2><p>Kami adalah perusahaan yang berdedikasi untuk memberikan layanan terbaik kepada pelanggan kami.</p><h3>Misi</h3><p>Memberikan solusi inovatif yang melebihi harapan.</p><h3>Visi</h3><p>Menjadi pemimpin industri yang diakui secara global.</p>',
            'meta_title' => 'Tentang Kami - ProfilKorp',
            'meta_description' => 'Pelajari lebih lanjut tentang perusahaan kami, misi, dan visi.',
            'is_published' => true,
        ]);

        $settings = [
            'company_name' => 'ProfilKorp',
            'company_logo' => '',
            'company_favicon' => '',
            'contact_email' => 'hello@profilkorp.com',
            'contact_phone' => '+62 21 1234 5678',
            'contact_address' => 'Jl. Contoh No. 123, Jakarta Pusat',
            'social_facebook' => 'https://facebook.com/profilkorp',
            'social_twitter' => 'https://twitter.com/profilkorp',
            'social_linkedin' => 'https://linkedin.com/company/profilkorp',
            'social_instagram' => 'https://instagram.com/profilkorp',
        ];

        foreach ($settings as $key => $value) {
            GlobalSetting::create([
                'setting_key' => $key,
                'setting_value' => $value,
            ]);
        }
    }
}
