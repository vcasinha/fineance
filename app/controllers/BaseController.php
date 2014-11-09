<?php

class BaseController extends Controller {

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
	protected function setupLayout()
	{
		if ( ! is_null($this->layout))
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
	    
        $offset = Input::get('offset', 0);
        $limit = Input::get('limit', 10);

        $object->skip($offset)->take($limit);
        
        Paginator::setCurrentPage($offset/$limit);

        return $object;
    }

}
