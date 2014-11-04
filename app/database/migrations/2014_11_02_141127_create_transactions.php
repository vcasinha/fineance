<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactions extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('transactions', function($table)
	    {
		    $table->engine = "InnoDB";
	        $table->increments('id');
	        $table->integer('category_id')->index('category_id');
	        $table->string("description");
	        $table->float("amount");
	        $table->dateTime("transaction_at");
			$table->dateTime("created_at");
			$table->dateTime("updated_at");
			$table->dateTime("deleted_at");
	    });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists("transactions");
	}

}
