<?php

class StatisticsController extends BaseController{
	/*
		@todo Sum(average(Amount)) per Category per year | month (year)
		@todo Sum(Amount) per Category per year | month (year)
		@todo Sum(average(Amount)) per Group per year | month (year)
		@todo Sum(Amount) per Group per Year | month (year)
		
		@todo compare years
		@todo avg categories/year
	*/
	public function GroupMonth($month = '2014-10')
	{
        $summary = Transaction::select(array(
                DB::raw('categories.name as `name`'),
                DB::raw('SUM(ABS(amount)) as `amount`')
            ))
            ->leftJoin('categories', 'categories.id', '=', 'transactions.category_id')
            ->whereRaw('YEAR(traded_at) = ?', array($period))
            ->groupBy('category_id')
            ->orderBy('name', 'ASC')->get();
            //->lists('count', 'date', 'amount');
        return $summary;
	}
	
	public function averageCategoriesYear($period = '2014')
	{
        $summary = Transaction::select(array(
                DB::raw('categories.name as `name`'),
                DB::raw('SUM(ABS(amount)) as `amount`')
            ))
            ->leftJoin('categories', 'categories.id', '=', 'transactions.category_id')
            ->whereRaw('YEAR(traded_at) = ?', array($period))
            ->groupBy('category_id')
            ->orderBy('name', 'ASC')->get();
            //->lists('count', 'date', 'amount');
        return $summary;
	}
	
    public function summaryCategoriesPeriod($period = NULL)
    {
        // lists() does not accept raw queries,
        // so you have to specify the SELECT clause
        $summary = Transaction::select(array(
                DB::raw('category_id as `category_id`'),
                DB::raw('MONTH(traded_at) as `month`'),
                DB::raw('COUNT(*) as `count`'),
                DB::raw('SUM(ABS(amount)) as `total`')
            ))
            ->whereRaw('YEAR(traded_at) = ?', array($period))
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
                DB::raw('MONTH(`traded_at`) as `month`'),
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
                DB::raw('groups.name as `name`'),
                DB::raw('SUM(ABS(amount)) as `amount`')
            ))
            ->whereRaw('YEAR(traded_at) = ?', array($year))
            ->groupBy('name')
            ->orderBy('name', 'ASC')->get();
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