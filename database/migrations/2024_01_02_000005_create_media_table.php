<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('filename');
            $table->string('original_filename');
            $table->string('mime_type');
            $table->bigInteger('file_size');
            $table->string('s3_path');
            $table->string('s3_url');
            $table->enum('media_type', ['image', 'video', 'document'])->default('image');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};