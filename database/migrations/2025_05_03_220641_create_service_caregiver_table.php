<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiceCaregiverTable extends Migration
{
    public function up()
    {
        Schema::create('service_caregiver', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('service_id');
            $table->uuid('caregiver_id');
            $table->integer('assigned_hours');
            $table->timestamp('assigned_at')->useCurrent();
            $table->timestamps();

            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
            $table->foreign('caregiver_id')->references('id')->on('caregivers')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('service_caregiver');
    }
}
