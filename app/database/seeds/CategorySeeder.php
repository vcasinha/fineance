<?php

class CategorySeeder extends Seeder
{

    public function run()
    {
        DB::table('categories')->delete();
        Category::create(array(
            'name'     => 'Groceries',
            'description' => 'Groceries and supermarket'
        ));
    }

}