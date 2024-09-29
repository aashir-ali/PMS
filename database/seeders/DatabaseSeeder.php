<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        \App\Models\User::factory()->create([
            'name'              => 'Alma',
            'email'             => 'alma@mail.com',
            'password'          => bcrypt('12345678'),
            'email_verified_at' => time(),
        ]);
        \App\Models\Project::factory()->count(30)->hasTasks(30)->create();
    }
}
