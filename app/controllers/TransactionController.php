<?php
	class TransactionController extends APIController {
		protected $rules_insert = [
				'account_id' => 'required',
				'category_id' => 'required',
				'description' => 'min:3',
				'traded_at' => 'required',
				'amount' => 'required|numeric'
			];
			
		protected $rules_update = [
				'description' => 'min:5',
				'amount' => 'numeric'
			];
		/*
			Constructor
			@todo
			Filter before
		*/
		public function __construct(Transaction $model)
		{
			$this->model = $model;
			$this->beforeFilter('auth', array('except' => 'someMethod'));
		}
	}