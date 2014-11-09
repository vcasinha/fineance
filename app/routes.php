<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

use Carbon\Carbon;

//API Routes
Route::group(array('prefix' => 'api'), function()
{
    Route::get('/', function()
    {
        // Has Auth Filter
    });

    Route::get('user/profile', function()
    {
        // Has Auth Filter
    });
    
    //Transaction routes
    Route::resource('transaction', 'TransactionController');
    Route::get('stats/summary/{year?}', 'TransactionController@summaryYear');
    Route::get('categories/summary/period/{month?}', 'TransactionController@summaryCategoriesPeriod');
    Route::get('group/summary/year/{year?}', 'TransactionController@summaryGroupYear');
    //Group routes
    Route::resource('group', 'GroupController');
    
    //Group Category routes
    Route::resource('group/{id}/category', 'GroupCategoryController');
    
    //Category routes
    Route::resource('category', 'CategoryController');
    Route::get('category/{id}/transactions', 'CategoryController@getTransactions');
});

//Authentication routes
Route::post('auth/login', 'AuthController@login');
Route::get('auth/logout', 'AuthController@logout');
Route::get('auth/check', 'AuthController@check');

Route::get('parse', function(){
	DB::table('transactions')->delete();
	$file = storage_path() . '/files/cgd.csv';
	$data = file($file);
	for($i = 7;$i < count($data) - 3; $i++)
	{
		
		$fields = explode(";", $data[$i]);
		
		if($fields[3] != '')
		{
			$amount = "-" . $fields[3];
		}
		else
		{
			$amount = $fields[4];
		}
		
		$amount = str_replace(".", "", $amount);
		$amount = str_replace(",", ".", $amount);
		
		$t = [
			'transaction_at' => date('Y-m-d', strtotime($fields[1])),
			'description' => $fields[2],
			'amount' => $amount
		];
/*
		echo "<pre>";
		var_dump($t);
		die();
*/
		$transaction = new Transaction();
		$transaction->fill($t);
		$transaction->save();
	}
});

//Application routes
Route::get('/', function()
{
    return View::make('application');
});

//Fill database
Route::get('fill', function(){
    $cat = new Category();
    $cat->name = "Somename";
    $cat->description = "Some description";
    $cat->save();

    for($x=0;$x<10;$x++)
    {
        $transaction = new Transaction();
        $transaction->category_id = 1;
        $transaction->amount = rand(0, 10000) / 100;
        $transaction->description = "Testing this";
        $transaction->transaction_at = Carbon::now();
        $transaction->save();
    }
});