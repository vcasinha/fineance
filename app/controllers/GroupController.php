<?php
	class GroupController extends APIController {
		protected $rules_insert = [
				'name' => 'required',
				'description' => 'min:3',
			];
		protected $rules_update = [
				'name' => 'min:3',
				'description' => 'min:3'
			];
		
		public function __construct(Group $model)
		{
			$this->model = $model;
			$this->beforeFilter('auth', array('except' => 'someMethod'));
		}
	}