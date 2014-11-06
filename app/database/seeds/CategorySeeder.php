<?php

class CategorySeeder extends Seeder
{

    public function run()
    {
	    $categories = [
	    	'groceries' => 'Groceries', 
	    	'car' => 'Car', 
	    	'myself' => 'Spent with myself',
	    	'house' => 'Spent on the house',
	    	'insurance' => 'Insurance expenses',
	    	'income' => 'Fixed income',
	    	'extra' => 'Extra income'
	    ];
	    
        DB::table('categories')->delete();
        foreach($categories as $name => $description)
        {
	        Category::create([
	            'name'     => ucfirst($name),
	            'description' => $description
	        ]);
        }
    }

}