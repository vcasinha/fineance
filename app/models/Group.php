<?php
	
class Group extends Eloquent {
	use SoftDeletingTrait;
    protected $fillable = array('name', 'description');
    
    public function categories()
    {
        return $this->belongsToMany('Category', 'group_categories');
    }
}