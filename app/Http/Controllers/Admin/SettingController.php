<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GlobalSetting;
use App\Services\ImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function __construct(
        protected ImageService $imageService,
    ) {
        $this->middleware('auth');
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => GlobalSetting::pluck('setting_value', 'setting_key'),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'company_name' => ['nullable', 'string', 'max:255'],
            'company_tagline' => ['nullable', 'string', 'max:500'],
            'company_description' => ['nullable', 'string', 'max:2000'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:50'],
            'contact_address' => ['nullable', 'string', 'max:1000'],
            'social_facebook' => ['nullable', 'string', 'max:500'],
            'social_instagram' => ['nullable', 'string', 'max:500'],
            'social_linkedin' => ['nullable', 'string', 'max:500'],
            'social_twitter' => ['nullable', 'string', 'max:500'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:500'],
            'hero_heading' => ['nullable', 'string', 'max:500'],
            'hero_subtitle' => ['nullable', 'string', 'max:2000'],
            'hero_cta_text' => ['nullable', 'string', 'max:255'],
            'hero_cta_url' => ['nullable', 'string', 'max:500'],
            'hero_cta_secondary_text' => ['nullable', 'string', 'max:255'],
            'hero_cta_secondary_url' => ['nullable', 'string', 'max:500'],
            'hero_image' => ['nullable', 'string', 'max:1000'],
        ]);

        foreach ($validated as $key => $value) {
            GlobalSetting::updateOrCreate(
                ['setting_key' => $key],
                ['setting_value' => $value ?? '']
            );
        }

        return redirect()->back()->with('success', 'Pengaturan berhasil disimpan.');
    }

    public function uploadLogo(Request $request): RedirectResponse
    {
        $request->validate(['file' => ['required', 'image', 'max:2048']]);

        $data = $this->imageService->convertToWebp($request->file('file'), 'settings');

        GlobalSetting::updateOrCreate(
            ['setting_key' => 'company_logo'],
            ['setting_value' => $data['s3_url']]
        );

        return redirect()->back()->with('success', 'Logo berhasil diupload.');
    }

    public function uploadFavicon(Request $request): RedirectResponse
    {
        $request->validate(['file' => ['required', 'image', 'max:1024']]);

        $data = $this->imageService->convertToWebp($request->file('file'), 'settings');

        GlobalSetting::updateOrCreate(
            ['setting_key' => 'company_favicon'],
            ['setting_value' => $data['s3_url']]
        );

        return redirect()->back()->with('success', 'Favicon berhasil diupload.');
    }

    public function uploadHeroImage(Request $request): RedirectResponse
    {
        $request->validate(['file' => ['required', 'image', 'max:5120']]);

        $data = $this->imageService->convertToWebp($request->file('file'), 'settings');

        GlobalSetting::updateOrCreate(
            ['setting_key' => 'hero_image'],
            ['setting_value' => $data['s3_url']]
        );

        return redirect()->back()->with('success', 'Gambar hero berhasil diupload.');
    }
}
