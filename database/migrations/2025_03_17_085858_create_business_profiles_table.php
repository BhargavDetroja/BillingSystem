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
        Schema::create('business_profiles', function (Blueprint $table) {
            $table->id();
            $table->string("company_name")->nullable();
            $table->string("owner_name")->nullable();
            $table->string("mobile_number")->nullable();
            $table->string("password",255)->nullable();
            $table->string("gst_no")->nullable();
            $table->string("address",255)->nullable();
            $table->foreignId("state_id")->nullable()->constrained("states")->cascadeOnDelete();
            $table->foreignId("city_id")->nullable()->constrained("cities")->cascadeOnDelete();

            $table->string("payment_id")->nullable();
            $table->dateTime("subscription_expire_date")->nullable();
            $table->enum("is_active",["active","expire"])->nullable();
            $table->string("logo")->nullable();
            $table->string("business_category")->nullable();
            $table->string("account_number")->nullable();
            $table->string("account_person_name")->nullable();
            $table->string("ifsc_code")->nullable();
            $table->string("branch_name")->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('business_profiles');
    }
};
