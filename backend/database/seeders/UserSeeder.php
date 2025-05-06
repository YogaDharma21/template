<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'creator',
                'email' => 'creator@example.com',
                'password' => Hash::make('password456'),
            ],
            [
                'name' => 'editor',
                'email' => 'editor@example.com',
                'password' => Hash::make('password789'),
            ],
        ];
        foreach ($users as $user) {
            User::create($user);
        }
    }
}
