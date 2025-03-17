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
        Schema::create('invoice_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId("invoice_id")->nullable()->constrained("invoices")->cascadeOnDelete();
            $table->foreignId("product_id")->nullable()->constrained("products")->cascadeOnDelete();
            $table->string("rate")->nullable()->comment("1 quantity");
            $table->string("quantity")->nullable();
            $table->string("units")->nullable(); //kg, units, piece, packags
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_items');
    }
};
