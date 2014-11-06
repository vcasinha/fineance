<?php
	class GroupCategoryController extends BaseController {
		/*
			Get a collection of transactions
		*/
		public function index($id)
		{
			$order_by = Input::get('order_by', 'id');
			$order_direction = Input::get('order_direction', 'desc');
			$offset = Input::get('offset', 0);
			$limit = Input::get('limit', 30);
			
			$records = GroupCategory::where('group_id', $id)
				->orderBy($order_by, $order_direction)
				->skip($offset)->take($limit)->get();
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
		public function destroy($group_id, $id)
		{
			$record = GroupCategory::find($id);
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
				'group_id' => 'required',
				'category_id' => 'required',
			];
			$input = Input::json();
			
			$validator = Validator::make((array)$input->all(), $rules);
			
			if($validator->fails())
			{
				throw new Exception("validation.failed");
			}
			
			$record = new GroupCategory();
			$record->fill($input->all());
			$record->save();
			
			return $record;
		}
	}