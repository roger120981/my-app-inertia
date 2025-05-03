<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServicesTable extends Migration
{
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('participant_id');
            $table->uuid('agency_id');
            $table->string('type'); // Home Care, HDM, ADHC
            $table->integer('weekly_hours')->nullable();
            $table->integer('weekly_units')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->string('status')->default('pending'); // pending, approved, active, expired
            $table->timestamps();

            $table->foreign('participant_id')->references('id')->on('participants')->onDelete('cascade');
            $table->foreign('agency_id')->references('id')->on('agencies')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('services');
    }
}
