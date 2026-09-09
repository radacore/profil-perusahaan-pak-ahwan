<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->index('is_published');
            $table->index('display_order');
        });
        Schema::table('portfolio_projects', function (Blueprint $table) {
            $table->index('is_published');
        });
        Schema::table('team_members', function (Blueprint $table) {
            $table->index('is_published');
            $table->index('display_order');
        });
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->index('status');
            $table->index('published_at');
        });
        Schema::table('testimonials', function (Blueprint $table) {
            $table->index('status');
            $table->index('display_order');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropIndex(['is_published']);
            $table->dropIndex(['display_order']);
        });
        Schema::table('portfolio_projects', function (Blueprint $table) {
            $table->dropIndex(['is_published']);
        });
        Schema::table('team_members', function (Blueprint $table) {
            $table->dropIndex(['is_published']);
            $table->dropIndex(['display_order']);
        });
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropIndex(['published_at']);
        });
        Schema::table('testimonials', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropIndex(['display_order']);
        });
    }
};
