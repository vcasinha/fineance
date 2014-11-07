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
			$order_by = Input::get('order_by', 'transaction_at');
			$order_direction = Input::get('order_direction', 'desc');
			$offset = Input::get('offset', 0);
			$limit = Input::get('limit', 10);
			$transactions = Transaction::orderBy($order_by, $order_direction)->skip($offset)->take($limit)->get();
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
		
		public function summaryCategoriesPeriod($period = NULL)
		{		
			// lists() does not accept raw queries,
			// so you have to specify the SELECT clause
			$summary = Transaction::select(array(
			        DB::raw('category_id as `category_id`'),
			        DB::raw('COUNT(*) as `count`'),
			        DB::raw('SUM(amount) as `total`'),
			        DB::raw('MIN(amount) as `minimum`'),
			        DB::raw('ROUND(AVG(amount), 2) as `average`'),
			        DB::raw('MAX(amount) as `maximum`')
			    ))
			    ->whereRaw("DATE_FORMAT(transaction_at, '%Y-%m') = '" . $period . "'")
			    ->groupBy('category_id')
			    ->orderBy('category_id', 'ASC')->get();
			    //->lists('count', 'date', 'amount');
			return $summary;
		}
		
		public function summaryYear($year = NULL)
		{
			if($year == NULL)
			{
				$year = date("Y");
			}
			
			$date = new DateTime();
			
			// lists() does not accept raw queries,
			// so you have to specify the SELECT clause
			$summary = Transaction::select(array(
			        DB::raw('MONTH(`transaction_at`) as `month`'),
			        DB::raw('COUNT(*) as `count`'),
			        DB::raw('SUM(amount) as `total`')
			    ))
			    //->where('created_at', '>', $date)
			    ->groupBy('month')
			    ->orderBy('month', 'DESC')->get();
			    //->lists('count', 'date', 'amount');
			return $summary;
		}
	}