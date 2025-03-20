<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Party extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'gst_no',
        'address',
        'mobile_number',
        'email',
        'state_id',
        'city_id',
        'account_number',
        'account_person_name',
        'ifsc_code',
        'branch_name',
        'status',
        'pin_code',
    ];

    public function state()
    {
        return $this->belongsTo(State::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
