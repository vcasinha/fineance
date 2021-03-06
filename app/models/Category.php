<?php
	
class Category extends Eloquent {
	use SoftDeletingTrait;
    protected $fillable = array('name', 'description');
    
    public function groups()
    {
        return $this->belongsToMany('Group', 'group_categories');
    }
    
    public function transactions()
    {
	    return $this->hasMany('Transaction');
    }

}