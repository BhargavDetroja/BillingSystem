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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string("invoice_no")->nullable();
            // unique and not skip 1,2,3 but repeat in year
            $table->date("bill_date")->nullable();
            $table->string("address", 255)->nullable();
            //$table->integer("bill_type")->nullable(); //1 paku bill, 2 kachu bill

            $table->string("lr_no")->nullable()->comment("transport reciept number"); //
            $table->foreignId("transport_id")->nullable()->constrained("transports")->cascadeOnDelete();

            $table->string("packages")->nullable(); //2 bachka, 2 cartoon
            $table->float("gst_percentage", 6, 2)->nullable();
            $table->foreignId("state_id")->nullable()->constrained("states")->cascadeOnDelete(); //from state
            $table->foreignId("city_id")->nullable()->comment("place of supply")->constrained("cities")->cascadeOnDelete(); // city id

            $table->string("cancel_reason")->nullable();
            $table->datetime("cancel_date")->nullable();
            $table->enum("sell_purchase_type", ["sell","purchase"])->nullable();
            $table->enum("status", ["active","cancel","delete"])->nullable();
            $table->string("place_of_supply")->nullable();
            $table->string("shipping_to")->nullable();
            $table->foreignId("party_id")->nullable()->constrained("parties")->cascadeOnDelete();

            $table->string("mark")->nullable();
            $table->float("percentage")->nullable();
            $table->string("gst")->nullable();

            $table->string("notes")->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
