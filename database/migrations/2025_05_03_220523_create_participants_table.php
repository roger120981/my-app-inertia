<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParticipantsTable extends Migration
{
    public function up()
    {
        Schema::create('participants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('medicaid_id')->unique();
            $table->string('gender')->nullable();
            $table->date('dob')->nullable();
            $table->string('address')->nullable();
            $table->string('primary_phone')->nullable();
            $table->string('secondary_phone')->nullable();
            $table->string('community')->nullable();
            $table->boolean('is_active')->default(true);
            $table->uuid('case_manager_id')->nullable();
            $table->timestamps();

            $table->foreign('case_manager_id')->references('id')->on('case_managers')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('participants');
    }
}
