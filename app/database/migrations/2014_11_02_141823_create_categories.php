<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategories extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('categories', function($table)
	    {
		    $table->engine = "InnoDB";
	        $table->increments('id');
	        $table->string('name');
	        $table->string("description");
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
		Schema::dropIfExists("categories");
	}

}
