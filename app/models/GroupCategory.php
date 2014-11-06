<?php
	
class GroupCategory extends Eloquent {
	use SoftDeletingTrait;
    protected $fillable = array('group_id', 'category_id');
}