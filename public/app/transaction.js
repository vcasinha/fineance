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

app.controller('TransactionIndexController', ['$scope', '$state', 'Transaction', 'Category',
function ($scope, $state, Transaction, Category) {
	$scope.records = [];
	$scope.refresh = function(page){
		Transaction.query({offset: page * 10}, function(pagination){
			$scope.records = pagination.data;
			$scope.totalItems = pagination.total;
		});
	};

	$scope.categories = Category.query();

	$scope.getCategory = function(id){
		var selected = {
			name: "UNDEFINED"
		};
		angular.forEach($scope.categories, function(category){
			if(category.id === id){
				selected = category;
			}
		});

		return selected;
	};

	$scope.destroy = function(transaction){
		console.log("transaction.delete", transaction);
		transaction.$delete(function(){
			$scope.refresh();
		});
	};

	$scope.refresh(0);

	//Pagination
	$scope.pageChanged = function(){
		console.log("transactions.pagechanged", $scope.currentPage, $scope.totalItems);
		$scope.refresh($scope.currentPage);
	};

	//Create record related
	$scope.opened = false;
    $scope.openCalendar = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = !$scope.opened;
    };

	$scope.transaction = {};
	$scope.categories = Category.query();
	$scope.allowCreate = false;

	$scope.$watch('form.$invalid', function(){
		$scope.allowCreate = $scope.form.$valid;
	});
	
	$scope.$watch('currentPage', $scope.pageChanged);
	
	$scope.create = function(transaction){
		$scope.allowCreate = false,
		console.log("transaction.add", transaction);

		var t = new Transaction(transaction);
		t.$save()
			.then(function(){
				$scope.allowCreate = true;
				transaction.description = '';
				transaction.amount = '';
				$scope.refresh();
			}, function(){
				alert('failed');
			});
	};
}]);