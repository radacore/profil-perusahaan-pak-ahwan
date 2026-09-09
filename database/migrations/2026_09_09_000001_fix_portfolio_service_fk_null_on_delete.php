<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('portfolio_projects', function (Blueprint $table) {
            $table->dropForeign(['service_id']);
        });

        Schema::table('portfolio_projects', function (Blueprint $table) {
            $table->unsignedBigInteger('service_id')->nullable()->change();
            $table->foreign('service_id')->references('id')->on('services')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('portfolio_projects', function (Blueprint $table) {
            $table->dropForeign(['service_id']);
            $table->foreign('service_id')->references('id')->on('services')->cascadeOnDelete();
        });
        Schema::table('portfolio_projects', function (Blueprint $table) {
            $table->unsignedBigInteger('service_id')->nullable(false)->change();
        });
    }
};
