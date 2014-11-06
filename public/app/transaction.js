var app = angular.module('fineance.transaction', ['ui.router', 'ui.bootstrap']);

app.directive('tabletransactions', function() {
	return {
		restrict: "E",
		scope: {
			transactions: '=records'
		},
		templateUrl: 'app/html/partials/transaction.table.html'
    };
});

app.config(['$stateProvider', '$urlRouterProvider', 
function ($stateProvider,   $urlRouterProvider) {
	$stateProvider
		.state('transaction', {
			url: '/transaction',
			templateUrl: 'app/html/transaction/index.html',
			controller: 'TransactionIndexController'
		})
		.state('transaction-create', {
			url: '/transaction/create',
			templateUrl: 'app/html/transaction/create.html',
			controller: 'TransactionCreateController'
		});
}]);

app.controller('TransactionIndexController', ['$scope', 'Transaction', 'Category',
function ($scope, Transaction, Category) {
	
	$scope.refresh = function(){
		$scope.records = Transaction.query();
	};
	
	$scope.categories = Category.query();
	
	$scope.destroy = function(transaction){
		console.log("transaction.delete", transaction);
		transaction.$delete(function(){
			$scope.refresh();
		});
	};
	
	$scope.refresh();
}]);

app.controller('TransactionCreateController', ['$scope', '$state', 'Transaction', 'Category', 
function ($scope, $state, Transaction, Category) {
	
	$scope.opened = false;
    $scope.openCalendar = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = !$scope.opened;
    };
    
	$scope.transaction = {};
	$scope.categories = Category.query();
	$scope.create = function(transaction){
		console.log("transaction.add", transaction);
		
		var t = new Transaction(transaction);
		t.$save()
			.then(function(){
				$state.go('transaction');
			}, function(){
				alert('failed');
			});
	};
}]);