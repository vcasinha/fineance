<?php
	class AccountController extends APIController {
		protected $rules_insert = [
				'name' => 'required|min:3',
				'description' => 'min:3',
			];
			
		protected $rules_update = [
				'name' => 'min:3',
				'description' => 'min:3'
			];
		
		public function __construct(Account $model)
		{
			$this->model = $model;
			$this->beforeFilter('auth', array('except' => 'someMethod'));
		}
	}
