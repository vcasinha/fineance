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
	        $table->integer('account_id')->unsigned()->index('account_id');
	        $table->integer('category_id')->unsigned()->index('category_id');
	        $table->string('description');
	        $table->float('amount');
	        $table->float('checksum');
	        $table->dateTime("traded_at");
			$table->timestamps();
			$table->softDeletes();
	    });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('transactions');
	}

}
