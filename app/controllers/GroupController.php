<?php
	class GroupController extends APIController {
		protected $rules_insert = [
				'name' => 'required',
				'description' => 'min:5',
			];
		protected $rules_update = [
				'name' => 'min:5',
				'description' => 'min:5'
			];
		
		public function __construct(Group $model)
		{
			$this->model = $model;
			$this->beforeFilter('auth', array('except' => 'someMethod'));
		}
	}