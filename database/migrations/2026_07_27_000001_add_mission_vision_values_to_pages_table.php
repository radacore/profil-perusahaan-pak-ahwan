<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->text('mission')->nullable()->after('content');
            $table->text('vision')->nullable()->after('mission');
            $table->json('values')->nullable()->after('vision');
        });
    }

    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->dropColumn(['mission', 'vision', 'values']);
        });
    }
};
