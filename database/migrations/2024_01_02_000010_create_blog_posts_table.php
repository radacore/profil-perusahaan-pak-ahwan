<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->longText('content');
            $table->foreignId('blog_category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('author');
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->string('featured_image_url')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};