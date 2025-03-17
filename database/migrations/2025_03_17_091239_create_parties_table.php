<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('parties', function (Blueprint $table) {
            $table->id();
            $table->string("name")->nullable(); // this is company name and person name
            $table->string("gst_no")->nullable();
            $table->string("address",255)->nullable();
            $table->string("mobile_number")->nullable();
            $table->string("email")->nullable();

            $table->foreignId("state_id")->nullable()->constrained("states")->cascadeOnDelete();
            $table->foreignId("city_id")->nullable()->constrained("cities")->cascadeOnDelete();

            $table->string("pin_code")->nullable();

            $table->string("account_number")->nullable();
            $table->string("account_person_name")->nullable();
            $table->string("ifsc_code")->nullable();
            $table->string("branch_name")->nullable();

            $table->string("status")->default(1)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parties');
    }
};
