<?php
	
class Transaction extends Eloquent {
	use SoftDeletingTrait;
	
    protected $fillable = array('category_id', 'description', 'amount', 'transaction_at');
	public function category()
	{
		return $this->belongsTo('Category');
	}
}