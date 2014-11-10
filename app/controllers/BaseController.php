<?php

class BaseController extends Controller {

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
	protected function setupLayout()
	{
		if ( !is_null($this->layout))
		{
			$this->layout = View::make($this->layout);
		}
	}

    protected function applyInputModifiers($object)
    {
	    $whereField = Input::get('whereField');
	    $whereValue = Input::get('whereValue');
	    if($whereField and $whereValue !== null)
	    {
			$object->where($whereField, $whereValue);    
	    }
	    
	    $order_by = Input::get('order', "{}");
		$order_by = json_decode($order_by, false);
	    foreach($order_by as $field => $direction)
	    {
		    $object->orderBy($field, $direction);
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

}
