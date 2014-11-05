var app = angular.module('fineance.transactions', ['ui.router']);

app.factory('Transaction', ['$resource', function($resource) {
	return $resource('/api/transaction/:id', null,
    {
        'update': { method:'PUT' }
    });
}]);

app.directive('tabletransactions', function() {
	return {
		restrict: "E",
		scope: {
		        transactions: '=records'
		},
    	templateUrl: 'app/html/partials/transaction.table.html'
    };
});

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,   $urlRouterProvider) {
	$stateProvider
		.state('transaction-index', {
			url: '/transaction',
			templateUrl: 'app/html/transactions/index.html',
			controller: 'TransactionIndexController'
		})
		.state('transaction-add', {
			url: '/transaction/create',
			templateUrl: 'app/html/transactions/add.html',
			controller: 'TransactionAddController'
		});
}]);

app.controller('TransactionIndexController', ['$scope', 'Transaction', function ($scope, Transaction) {
	
	$scope.refresh = function(){
		$scope.transactions = Transaction.query();
	};
	
	$scope.delete = function(transaction){
		console.log("transaction.delete", transaction);
		transaction.$delete();
		$scope.refresh();
	};
	
	$scope.refresh();
}]);

app.controller('TransactionAddController', ['$scope', '$state', 'Transaction', function ($scope, $state, Transaction) {
	
	$scope.transaction = {};
	$scope.categories = [{id: 1, description: 'Base category'}];
	$scope.addTransaction = function(transaction){
		console.log("transaction.add", transaction);
		
		var t = new Transaction($scope.transaction);
		t.$save(function(){
			$state.go('transaction-index');
		});
	};
}]);