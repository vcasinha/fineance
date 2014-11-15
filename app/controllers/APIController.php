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
	    
	    $whereField = Input::get('whereField');
	    $whereValue = Input::get('whereValue');
	    if($whereField and $whereValue !== null)
	    {
			$object->where($whereField, $whereValue);    
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

	    
        $limit = Input::get('limit', 0);
		$offset = Input::get('offset', 0);
		
		if($offset)
		{
			$object->skip($offset);
		}
		
        $object->take($limit);
        
        
        $records = [];
		if(Input::get('paginate'))
		{
			$limit = Input::get('limit', 10);
			Paginator::setCurrentPage($offset/$limit);
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
		
		if(is_array($this->rules_insert))
		{
			$validator = Validator::make((array)$input->all(), $this->rules_insert);
			
			if($validator->fails())
			{
				throw new Exception("validation.failed");
			}
		}
		
		$record = $this->model->create($input->all());
		
		return $record;
	}
}