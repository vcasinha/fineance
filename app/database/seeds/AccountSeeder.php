<?php

class AccountSeeder extends Seeder
{

    public function run()
    {
        DB::table('accounts')->delete();
        for($x = 0; $x < 3; $x++)
        {
            $record = [
                'name' => 'Account #' . ($x + 1),
                'description' => 'Account #' . ($x + 1) . ' description',
            ];
            
            Account::create($record);
        }
    }

}