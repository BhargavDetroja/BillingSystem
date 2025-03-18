<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BusinessProfile extends Model
{
    //
    protected $fillable = [
        "company_name",
        "owner_name",
        "mobile_number",
        "gst_no",
        "address",
        "state_id",
        "city_id",
        "business_category",
        "account_number",
        "ifsc_code",
        "account_person_name",
        "branch_name",
        "logo",
    ];
}
