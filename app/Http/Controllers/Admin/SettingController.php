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
            'settings' => ['required', 'array'],
            'settings.*' => ['nullable', 'string'],
        ]);

        foreach ($validated['settings'] as $key => $value) {
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
}
