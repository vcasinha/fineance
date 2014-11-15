<?php
	
class Transaction extends Eloquent {
	use SoftDeletingTrait;
	
    protected $fillable = array('account_id', 'category_id', 'description', 'amount', 'transaction_at');
    
	public function account()
	{
		return $this->belongsTo('Account');
	}
    
	public function category()
	{
		return $this->belongsTo('Category');
	}
}