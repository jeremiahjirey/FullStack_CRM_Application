<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Companie;
use App\Models\Division;
use App\Models\Employee;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create(['ussername'=>'superadmin','email'=>'superadmin@admin.com','password'=>'password','role'=>'superadmin']);    
        User::create(['ussername'=>'admin','email'=>'admin@admin.com','password'=>'password','role'=>'admin']);    
        User::create(['ussername'=>'user','email'=>'user@user.com','password'=>'password','role'=>'user']);    

        Companie::create(['name'=>'PT Brailing Inovasi Teknologi','email'=>'bitkreasi@sch.id','logo'=>'http://logo','website'=>'https://bitkreasi.com']);

        Employee::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'company_id' => 1,
            'email' => 'john.doe@example.com',
            'phone' => '1234567890',
        ]);

        Employee::create([
            'first_name' => 'Maulana',
            'last_name' => 'Ibnu',
            'company_id' => 1,
            'email' => 'ibnsaban@example.com',
            'phone' => '1234567890',
        ]);

        Employee::create([
            'first_name' => 'Rizki',
            'last_name' => 'Ramadhan',
            'company_id' => 1,
            'email' => 'Rizki@example.com',
            'phone' => '1234567890',
        ]);

        Division::create([
            'name_division' => 'Front End',
            'company_id' => 1
        ]);

        Division::create([
            'name_division' => 'Back End',
            'company_id' => 1
        ]);

        Division::create([
            'name_division' => 'Engginer',
            'company_id' => null,
        ]);

        $division = Division::where('name_division', 'Back End')->first();

    // Tentukan karyawan yang akan dimasukkan ke dalam divisi
        $employeeIds = [1];

    // Update karyawan dengan menetapkan divisi_id
        foreach ($employeeIds as $employeeId) {
            $employee = Employee::find($employeeId);
            $employee->division_id = $division->id;
            $employee->save();
        }

    }
}
