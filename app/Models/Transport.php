<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transport extends Model
{
    protected $fillable = [
        'transport_id',
        'name',
        'address',
        'mobile_number',
        'gst_no',
        'status',
    ];
}
