<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    protected $fillable = ['name_division','company_id'];

    public function employees()
    {
        return $this->hasMany(Employee::class, 'division_id', 'id');
    }

    public function company()
    {
        return $this->belongsTo(Companie::class, 'company_id', 'id');
    }
}
