<?php

namespace App\Models;

use App\Enum\StatusEnums;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = ["name", "status"];

    // public function products()
    // {
    //     return $this->hasMany(Product::class);
    // }

    //create a scope for only status is active 
    public function scopeActive($query)
    {
        return $query->where('status', StatusEnums::ACTIVE->value);
    }
}
