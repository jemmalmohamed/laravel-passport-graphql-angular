<?php

use App\Event;
use App\Special;
use App\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        factory(User::class, 1)->create();
        factory(Event::class, 10)->create();
        factory(Special::class, 10)->create();
    }
}
