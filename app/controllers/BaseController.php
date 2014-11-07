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
        $order_by = Input::get('order_by', 'transaction_at');
        $order_direction = Input::get('order_direction', 'desc');
        $offset = Input::get('offset', 0);
        $limit = Input::get('limit', 10);
        Paginator::setCurrentPage($offset/$limit);
        $object->orderBy($order_by, $order_direction)->skip($offset)->take($limit);

        return $object;
    }

}
