<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactSubmissionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request): Response
    {
        $query = ContactSubmission::query();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return Inertia::render('Admin/ContactSubmissions/Index', [
            'submissions' => $query->latest()->paginate(15),
            'filters' => $request->only(['status']),
        ]);
    }

    public function show($id): Response
    {
        $submission = ContactSubmission::findOrFail($id);

        if ($submission->status === 'new') {
            $submission->update(['status' => 'read']);
        }

        return Inertia::render('Admin/ContactSubmissions/Show', [
            'submission' => $submission,
        ]);
    }

    public function archive($id): RedirectResponse
    {
        ContactSubmission::findOrFail($id)->update(['status' => 'archived']);

        return redirect()->route('admin.contact-submissions.index')->with('success', 'Pesan berhasil diarsipkan.');
    }

    public function destroy($id): RedirectResponse
    {
        ContactSubmission::findOrFail($id)->delete();

        return redirect()->route('admin.contact-submissions.index')->with('success', 'Pesan berhasil dihapus.');
    }
}
