<?php

class TransactionSeeder extends Seeder
{

    public function run()
    {
	    DB::table('transactions')->delete();
		$ts = time();
        $categories = Category::all();
        for($x = 0; $x < 500; $x++)
        {
	        $category_index = rand(0, count($categories) - 1);
	        $category_id = $categories[$category_index]['id'];
	        $date = date("Y-m-d H:i:s", mt_rand($ts - 31536000, $ts));
	        $transaction = [
	            'description' => 'some transaction',
	            'amount' => rand(0, 10000) / 100,
	            'category_id' => $category_id,
	            'transaction_at' => $date
	        ];
	        Transaction::create($transaction);
        }
    }

}