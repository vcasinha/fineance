var app = angular.module('fineance', ['ngResource', 'ngRoute']);

app.config(['$resourceProvider', function($resourceProvider) {
	// Don't strip trailing slashes from calculated URLs
	$resourceProvider.defaults.stripTrailingSlashes = false;
}]);

app.factory('Transactions', ['$resource', function($resource) {
	return $resource('/api/transaction/:id', null,
    {
        'update': { method:'PUT' }
    });
}]);

app.controller('frontController', ['$scope', 'Transactions', function ($scope, Transactions) {
	
	var update_list = function(){
		$scope.transactions = Transactions.query();
	}
	
	$scope.addTransaction = function(){
		var t = new Transactions();
		t.amount = 33.19;
		t.description = "Some description";
		t.category_id = 1;
		t.transaction_at = '2014-11-04';
		t.$save(function(){
			update_list();
		});
		
	}
	
	update_list();
}]);