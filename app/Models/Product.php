<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        "name",
        "code",
        "unit",
        "rate",
        "hsn_code",
        "category_id",
        "status",
    ];

    //relationship for the category model
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
