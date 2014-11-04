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
	
	$scope.transactions = Transactions.query();
}]);