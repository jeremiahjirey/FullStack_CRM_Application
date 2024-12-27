<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = ['first_name','last_name','company_id','email','phone'];

    public function companie()
    {
        return $this->belongsTo(Companie::class, 'company_id', 'id');
    }
    
    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id', 'id');
    }
}
