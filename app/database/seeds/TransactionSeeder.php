<?php

class TransactionSeeder extends Seeder
{

    public function run()
    {
	    DB::table('transactions')->delete();
		$ts = time();
        $categories = Category::all();
        $accounts = Account::all();
        for($x = 0; $x < 1000; $x++)
        {
	        $transaction = [
                'account_id' => rand(1, count($accounts) - 1),
	            'description' => 'some transaction',
	            'amount' => rand(0, 10000) / 100,
	            'category_id' => rand(1, count($categories) - 1),
	            'traded_at' =>date("Y-m-d H:i:s", mt_rand($ts - 101536000, $ts))
	        ];

	        Transaction::create($transaction);
        }
    }

}