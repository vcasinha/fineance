<?php

class UserTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('users')->delete();
        User::create(array(
            'name'     => 'Vladimiro Casinha',
            'username' => 'vcasinha',
            'email'    => 'vcasinha@gmail.com',
            'password' => Hash::make('test'),
        ));
    }

}