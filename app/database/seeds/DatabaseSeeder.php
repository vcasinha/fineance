<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		$this->call('CategorySeeder');
		$this->call('AccountSeeder');
		$this->call('TransactionSeeder');
	}

}
