<?php
	class TransactionController extends BaseController {
		/*
			Constructor
			@todo
			Filter before
		*/
		public function __construct()
		{
			$this->beforeFilter('auth', array('except' => 'someMethod'));	
		}
		
		/*
			Get a collection of transactions
		*/
		public function index()
		{
			$transactions = Transaction::all();
			return $transactions;
		}
		
		/*
			Get a transaction
		*/
		public function show($id)
		{
			return Transaction::find($id);
		}
		
		/*
			Destroy a transaction
		*/
		public function destroy($id)
		{
			$transaction = Transaction::find($id);
			$transaction->delete();
			return $transaction;
		}
		
		/*
			Store transaction
			@todo
			input validation
		*/
		public function update($id)
		{
			$rules = [
				'description' => 'min:5',
				'amount' => 'numeric'
			];
			$input = Input::json();
			
			$validator = Validator::make((array)$input->all(), $rules);
			
			if($validator->fails())
			{
				throw new Exception("validation.failed");
			}
			
			$transaction = Transaction::find($id);
			$transaction->fill($input->all());
			$transaction->save();
			
			return $transaction;
		}
		
		/*
			Store transaction
			@todo
			input validation
		*/
		public function store()
		{
			$rules = [
				'category_id' => 'required',
				'description' => 'min:5',
				'transaction_at' => 'required',
				'amount' => 'required|numeric'
			];
			$input = Input::json();
			
			$validator = Validator::make((array)$input->all(), $rules);
			
			if($validator->fails())
			{
				throw new Exception("validation.failed");
			}
			
			$transaction = new Transaction();
			$transaction->fill($input->all());
			$transaction->save();
			
			return $transaction;
		}
	}