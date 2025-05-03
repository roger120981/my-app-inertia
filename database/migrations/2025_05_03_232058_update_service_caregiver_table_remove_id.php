<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateServiceCaregiverTableRemoveId extends Migration
{
    public function up()
    {
        Schema::table('service_caregiver', function (Blueprint $table) {
            // Eliminar la clave primaria existente
            $table->dropPrimary('service_caregiver_pkey');
            // Eliminar el campo id
            $table->dropColumn('id');
            // Definir una nueva clave primaria compuesta
            $table->primary(['service_id', 'caregiver_id']);
        });
    }

    public function down()
    {
        Schema::table('service_caregiver', function (Blueprint $table) {
            // Revertir cambios
            $table->dropPrimary(['service_id', 'caregiver_id']);
            $table->uuid('id')->primary()->first();
        });
    }
}