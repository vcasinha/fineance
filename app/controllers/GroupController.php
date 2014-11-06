<?php
	class GroupController extends BaseController {
		/*
			Get a collection of transactions
		*/
		public function index()
		{
			$order_by = Input::get('order_by', 'name');
			$order_direction = Input::get('order_direction', 'desc');
			$offset = Input::get('offset', 0);
			$limit = Input::get('limit', 30);
			
			$records = Group::orderBy($order_by, $order_direction)->skip($offset)->take($limit)->get();
			return $records;
		}
		
		/*
			Get a transaction
		*/
		public function show($id)
		{
			return Group::find($id);
		}
		
		/*
			Destroy a transaction
		*/
		public function destroy($id)
		{
			$record = Group::find($id);
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
				'name' => 'min:5',
				'description' => 'min:5'
			];
			
			$input = Input::json();
			
			$validator = Validator::make((array)$input->all(), $rules);
			
			if($validator->fails())
			{
				throw new Exception("validation.failed");
			}
			
			$record = Group::find($id);
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
				'description' => 'min:5',
			];
			$input = Input::json();
			
			$validator = Validator::make((array)$input->all(), $rules);
			
			if($validator->fails())
			{
				throw new Exception("validation.failed");
			}
			
			$record = new Group();
			$record->fill($input->all());
			$record->save();
			
			return $record;
		}
	}