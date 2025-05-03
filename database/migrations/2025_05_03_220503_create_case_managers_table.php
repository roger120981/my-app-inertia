<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCaseManagersTable extends Migration
{
    public function up()
    {
        Schema::create('case_managers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->uuid('agency_id');
            $table->timestamps();

            $table->foreign('agency_id')->references('id')->on('agencies')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('case_managers');
    }
}
