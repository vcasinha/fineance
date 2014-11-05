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
    
    //Category routes
    Route::resource('category', 'CategoryController');
    Route::get('category/{id}/transactions', 'CategoryController@getTransactions');
});

//Authentication routes
Route::post('auth/login', 'AuthController@login');
Route::get('auth/logout', 'AuthController@logout');
Route::get('auth/check', 'AuthController@check');

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