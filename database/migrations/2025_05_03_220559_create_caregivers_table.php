<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCaregiversTable extends Migration
{
    public function up()
    {
        Schema::create('caregivers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->boolean('is_active')->default(true);
            $table->json('certifications')->nullable();
            $table->integer('available_hours')->default(40);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('caregivers');
    }
}
