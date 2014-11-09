<?php
	class CategoryController extends BaseController {
		
		public function getTransactions($id)
		{
			$transactions = Category::find($id)->transactions;
			$transactions->load('category'); 
			return $transactions;
		}
		
		/*
			Get a collection of transactions
		*/
		public function index()
		{
			$order_by = Input::get('order_by', 'name');
			$order_direction = Input::get('order_direction', 'asc');
			$offset = Input::get('offset', 0);
			$limit = Input::get('limit', 30);
			
			$records = Category::orderBy($order_by, $order_direction)->skip($offset)->take($limit)->get();
			return $records;
		}
		
		/*
			Get a transaction
		*/
		public function show($id)
		{
			return Category::find($id);
		}
		
		/*
			Destroy a transaction
		*/
		public function destroy($id)
		{
			$record = Category::find($id);
			$record->delete();
			return $record;
		}

		/*
			Store transaction
			@todo
			input validation
		*/
		public function update($id)
		{
			$rules = [
				'name' => 'min:3',
				'description' => 'min:3'
			];
			
			$input = Input::json();
			
			$validator = Validator::make((array)$input->all(), $rules);
			
			if($validator->fails())
			{
				throw new Exception("validation.failed");
			}
			
			$record = Category::find($id);
			$record->fill($input->all());
			$record->save();
			
			return $record;
		}
		
		/*
			Store transaction
			@todo
			input validation
		*/
		public function store()
		{
			$rules = [
				'name' => 'required',
				'description' => 'min:3',
			];
			$input = Input::json();
			
			$validator = Validator::make((array)$input->all(), $rules);
			
			if($validator->fails())
			{
				throw new Exception("validation.failed");
			}
			
			$record = new Category();
			$record->fill($input->all());
			$record->save();
			
			return $record;
		}
	}