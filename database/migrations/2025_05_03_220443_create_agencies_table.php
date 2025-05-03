<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgenciesTable extends Migration
{
    public function up()
    {
        Schema::create('agencies', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->json('contact_info')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('agencies');
    }
}