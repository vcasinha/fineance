<?php
	
class GroupCategoryController extends APIController {
	protected $rules_insert = [
			'group_id' => 'required',
			'category_id' => 'required',
		];
		
	protected $rules_update = [
			'group_id' => 'required',
			'category_id' => 'required',
		];
	
	public function __construct(GroupCategory $model)
	{
		$this->model = $model;
		$this->beforeFilter('auth', array('except' => 'someMethod'));
	}

	public function index()
	{
		$recordset = $this->model->select('*')->where('group_id', func_get_arg(0));
		$records = $this->applyInputModifiers($recordset);
		return $records;
	}

	public function destroy($aa)
	{
		list($group_id, $id) = func_get_args();
		return parent::destroy($id);
	}
}