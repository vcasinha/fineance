<?php
	class CategoryController extends BaseController {
		public function index()
		{
			return Category::all();	
		}
		
		public function getTransactions($id)
		{
			$transactions = Category::find($id)->transactions;
			$transactions->load('category'); 
			return $transactions;
		}
	}