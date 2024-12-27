<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Companie extends Model
{
    protected $fillable = ["name","email","logo","website"]; 
    
    public function employees()
    {
        return $this->hasMany(Employee::class, 'company_id', 'id');
    }
}
