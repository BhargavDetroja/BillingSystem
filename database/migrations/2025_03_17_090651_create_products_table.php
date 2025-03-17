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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string("code")->nullable();
            $table->string("name")->nullable();
            $table->string("unit")->nullable(); //like kg, piece, package
            $table->string("rate")->nullable();
            $table->string("hsn_code")->nullable();
            $table->foreignId("category_id")->nullable()->constrained("categories")->cascadeOnDelete();
            $table->string("status")->default(1)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
