<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Contact');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
        ]);

        $submission = ContactSubmission::create($validated + ['status' => 'new']);

        // Queue email notification (log for now)
        logger("Contact submission #{$submission->id}: {$validated['subject']} from {$validated['name']} <{$validated['email']}>");

        return redirect()->back()->with('success', 'Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.');
    }
}
