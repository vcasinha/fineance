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
			$transactions = $this->applyInputModifiers(Transaction::select('*'))->paginate(7);
			
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
				'category_id' => 'numeric',
				'description' => 'min:3',
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
			        DB::raw('MONTH(transaction_at) as `month`'),
			        DB::raw('COUNT(*) as `count`'),
			        DB::raw('SUM(ABS(amount)) as `total`')
			    ))
			    ->whereRaw("YEAR(transaction_at) = '" . $period . "'")
			    ->groupBy('month')
			    ->groupBy('category_id')
			    ->orderBy('month', 'ASC')->get();
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
			        DB::raw('SUM(ABS(amount)) as `total`')
			    ))
			    //->where('created_at', '>', $date)
			    ->groupBy('month')
			    ->orderBy('month', 'DESC')->get();
			    //->lists('count', 'date', 'amount');
			return $summary;
		}
		
		/*
		select month(transaction_at), groups.name, sum(transactions.amount) 
		from transactions, categories, group_categories, groups
		where transactions.category_id = categories.id 
			and categories.id = group_categories.category_id 
			and group_categories.group_id = groups.id
			#and year(transaction_at) = '2014'
		group by groups.name, month(transaction_at)
		order by month(transaction_at)
		*/
		public function summaryGroupYear($year = NULL)
		{
			if($year == NULL)
			{
				$year = date("Y");
			}

			// lists() does not accept raw queries,
			// so you have to specify the SELECT clause
			$summary = DB::table('transactions')
				->leftJoin('categories', 'transactions.category_id', '=', 'categories.id')
				->leftJoin('group_categories', 'group_categories.category_id', '=', 'categories.id')
				->leftJoin('groups', 'groups.id', '=', 'group_categories.group_id')
				->select(array(
			        DB::raw('MONTH(`transaction_at`) as `month`'),
			        DB::raw('groups.name as `group`'),
			        DB::raw('SUM(ABS(amount)) as `total`')
			    ))
			    ->whereRaw("YEAR(transaction_at) >= '" . $year . "'")
			    ->groupBy('group')
			    ->groupBy('month')
			    ->orderBy('month', 'ASC')->get();
			    //->lists('count', 'date', 'amount');
/*
			$groups = [];
			
			foreach($summary as $record)
			{
				$group = $record->group;
				if(array_key_exists($group, $groups) === false)
				{
					$groups[$group] = [[1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0], [9,0], [10,0], [11,0], [12,0]];
				}
				$month = (int)$record->month;
				$groups[$group][$month - 1] = [$month, (float)$record->total];
			}
			return $groups;
*/
			return $summary;
		}
	}