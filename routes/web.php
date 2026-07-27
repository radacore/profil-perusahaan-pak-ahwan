<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Public\HomepageController;
use App\Http\Controllers\Public\AboutController;
use App\Http\Controllers\Public\ServiceController as PublicServiceController;
use App\Http\Controllers\Public\PortfolioController;
use App\Http\Controllers\Public\TeamController;
use App\Http\Controllers\Public\BlogController as PublicBlogController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AboutController as AdminAboutController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\PortfolioProjectController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\ContactSubmissionController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\SettingController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/rahasianegara/masuksini', [\App\Http\Controllers\Admin\AuthController::class, 'showLoginForm'])->name('secret.login');
Route::post('/rahasianegara/masuksini', [\App\Http\Controllers\Admin\AuthController::class, 'login']);

Route::get('/storage/s3/{path}', function (string $path) {
    try {
        $disk = Storage::disk('s3');
        $stream = $disk->readStream($path);
        if ($stream === false) {
            abort(404);
        }
        $mime = $disk->mimeType($path);
        return response()->stream(function () use ($stream) {
            fpassthru($stream);
            fclose($stream);
        }, 200, ['Content-Type' => $mime ?: 'image/webp']);
    } catch (\Exception $e) {
        abort(404);
    }
})->where('path', '.*')->name('s3.proxy');

Route::get('/', HomepageController::class)->name('home');
Route::get('/about', AboutController::class)->name('about');
Route::get('/services', [PublicServiceController::class, 'index'])->name('services.index');
Route::get('/services/{slug}', [PublicServiceController::class, 'show'])->name('services.show');
Route::get('/portfolio', [PortfolioController::class, 'index'])->name('portfolio.index');
Route::get('/portfolio/{slug}', [PortfolioController::class, 'show'])->name('portfolio.show');
Route::get('/team', [TeamController::class, 'index'])->name('team.index');
Route::get('/blog', [PublicBlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [PublicBlogController::class, 'show'])->name('blog.show');
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

/*
|--------------------------------------------------------------------------
| Admin Routes (under obfuscated path)
|--------------------------------------------------------------------------
*/

$adminPath = env('ADMIN_PATH', 'dashboard-admin');

Route::prefix($adminPath)->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
        Route::post('/login', [AuthController::class, 'login']);
    });

    Route::middleware('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        Route::get('/tentang', [AdminAboutController::class, 'edit'])->name('about.edit');
        Route::put('/tentang', [AdminAboutController::class, 'update'])->name('about.update');

        Route::resource('blog', BlogPostController::class)->except(['show']);
        Route::post('/blog/{id}/featured-image', [BlogPostController::class, 'uploadFeaturedImage'])->name('blog.featured-image');
        Route::get('/blog-categories', [BlogPostController::class, 'categories'])->name('blog.categories');
        Route::post('/blog-categories', [BlogPostController::class, 'storeCategory'])->name('blog.categories.store');
        Route::delete('/blog-categories/{id}', [BlogPostController::class, 'destroyCategory'])->name('blog.categories.destroy');
        Route::get('/blog-tags', [BlogPostController::class, 'tags'])->name('blog.tags');
        Route::post('/blog-tags', [BlogPostController::class, 'storeTag'])->name('blog.tags.store');
        Route::delete('/blog-tags/{id}', [BlogPostController::class, 'destroyTag'])->name('blog.tags.destroy');

        Route::resource('services', ServiceController::class);
        Route::post('/services/{id}/icon', [ServiceController::class, 'uploadIcon'])->name('services.icon');
        Route::post('/services/{id}/image', [ServiceController::class, 'uploadImage'])->name('services.image');

        Route::resource('portfolio', PortfolioProjectController::class);
        Route::post('/portfolio/{id}/thumbnail', [PortfolioProjectController::class, 'uploadThumbnail'])->name('portfolio.thumbnail');
        Route::post('/portfolio/{id}/gallery', [PortfolioProjectController::class, 'addGalleryImage'])->name('portfolio.gallery.add');
        Route::delete('/portfolio/{projectId}/gallery/{galleryId}', [PortfolioProjectController::class, 'deleteGalleryImage'])->name('portfolio.gallery.delete');
        Route::post('/portfolio/{id}/gallery/reorder', [PortfolioProjectController::class, 'reorderGallery'])->name('portfolio.gallery.reorder');

        Route::resource('team', TeamMemberController::class);
        Route::post('/team/{id}/photo', [TeamMemberController::class, 'uploadPhoto'])->name('team.photo');

        Route::resource('testimonials', TestimonialController::class);
        Route::post('/testimonials/{id}/image', [TestimonialController::class, 'uploadImage'])->name('testimonials.image');

        Route::get('/contact-submissions', [ContactSubmissionController::class, 'index'])->name('contact-submissions.index');
        Route::get('/contact-submissions/{id}', [ContactSubmissionController::class, 'show'])->name('contact-submissions.show');
        Route::put('/contact-submissions/{id}/archive', [ContactSubmissionController::class, 'archive'])->name('contact-submissions.archive');
        Route::delete('/contact-submissions/{id}', [ContactSubmissionController::class, 'destroy'])->name('contact-submissions.destroy');

        Route::get('/media', [MediaController::class, 'index'])->name('media.index');
        Route::post('/media/upload', [MediaController::class, 'upload'])->name('media.upload');
        Route::delete('/media/{id}', [MediaController::class, 'destroy'])->name('media.destroy');

        Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
        Route::put('/settings', [SettingController::class, 'update'])->name('settings.update');
        Route::post('/settings/logo', [SettingController::class, 'uploadLogo'])->name('settings.logo');
        Route::post('/settings/favicon', [SettingController::class, 'uploadFavicon'])->name('settings.favicon');
        Route::post('/settings/hero-image', [SettingController::class, 'uploadHeroImage'])->name('settings.hero-image');
    });
});
