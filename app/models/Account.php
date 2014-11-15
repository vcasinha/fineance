<?php
	
class Account extends Eloquent {
	use SoftDeletingTrait;
    protected $fillable = array('name', 'description');
    
    public function transactions()
    {
	    return $this->hasMany('Transaction');
    }

}