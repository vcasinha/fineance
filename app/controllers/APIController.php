<?php
	
class APIController extends BaseController {
	protected $model;
	protected $rules_insert = [];
	protected $rules_update = [];
	
	public function __construct()
	{
		$this->beforeFilter('auth');
	}
	
	/*
		Get collection of records
	*/
	public function index()
	{
		$recordset = $this->model->select('*');
		$records = $this->applyInputModifiers($recordset);
		return $records;
	}
		
    protected function applyInputModifiers($object)
    {
	    
	    if(Input::get('trashed', false) == "true")
	    {
		    $object->onlyTrashed();
	    }
	    
	    $where = Input::get('where', "{}");
		$where = json_decode($where, true);
		if(is_array($where))
		{
		    foreach($where as $field => $value)
		    {
			    $object->where($field, $value);
		    }
		}
	    
	    $order_by = Input::get('order', "{}");
		$order_by = json_decode($order_by, true);
		if(is_array($order_by))
		{
		    foreach($order_by as $field => $direction)
		    {
			    $object->orderBy($field, $direction);
		    }
		}

		$offset = Input::get('offset', 0);
		if($offset > 0)
		{
			$object->skip($offset);
		}
	    
	    
        $limit = Input::get('limit', 0);
        $object->take($limit);
        
        
        $records = [];
		if(Input::get('paginate'))
		{
			if($limit == 0)
			{
				$limit = 10;
			}
			
			Paginator::setCurrentPage((int)($offset/$limit) + 1);
			$records = $object->paginate($limit);
		}
		else
		{
			$records = $object->get();
		}
        

        return $records;
    }
		
	/*
		Get record
	*/
	public function show($id)
	{
		return $this->model->find($id);
	}
	
	/*
		Destroy record
	*/
	public function destroy($id)
	{
		$record = $this->model->find($id);
		$record->delete();
		return $record;
	}

	/*
		Recover record
	*/
	public function recover($id)
	{
		$record = $this->model->onlyTrashed()->find($id);
		$record->deleted_at = NULL;
		$record->save();
		return $record;
	}

	/*
		Update record
		@todo
		input validation
	*/
	public function update($id)
	{	
		$input = Input::json()->all();
		
		if(is_array($this->rules_update))
		{
			$validator = Validator::make($input, $this->rules_update);
			
			if($validator->fails())
			{
				throw new Exception("validation.failed");
			}
		}
		
		$record = $this->model->find($id);
		$record->fill($input);
		$record->save();
		
		return $record;
	}
	
	/*
		Insert record
		@todo
		input validation
	*/
	public function store()
	{
		$input = Input::json();
		
		$record = (array)$input->all();
		if(is_array($this->rules_insert))
		{
			$validator = Validator::make($record, $this->rules_insert);
			
			if($validator->fails())
			{
				$messages = $validator->messages();
				throw new Exception("validation.failed " . json_encode($messages));
			}
		}
		
		$record = $this->model->create($record);
		$queries = DB::getQueryLog();
		$last_query = end($queries);

		return $record;
	}
}