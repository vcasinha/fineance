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
		.state('transaction-categorize', {
			url: '/transaction/categorize',
			templateUrl: 'app/html/transaction/categorize.html',
			controller: 'TransactionCategorizeController'
		});
}]);

app.controller('TransactionIndexController', ['$scope', '$state', 'Transaction', 'Category',
function ($scope, $state, Transaction, Category) {
	var records = [];
	
	Category.index({limit:-1})
		.then(function(data){
			console.log("transaction.categories", data);
			angular.forEach(data, function(r){
				records.push(r);
			})
		});

	$scope.table_params = {
		model: Transaction,
		max_pages: 5,
		fields: [
			{ name:"traded_at", label:"Date of transaction", type: 'date', placeholder: '2014-01-01' },
			{ name:"description", label:"Description", type: 'text', placeholder: 'Description' },
			{ name:"category_id", label:"Category", type: 'related', 
				related: { index: 'id', label: 'name', records: records }},
			{ name:"amount", label:"Amount", type: 'number', placeholder: '12.3' },

		],
		order: {
			'traded_at': 'DESC'
		},
		sortable: ['amount', 'category_id', 'traded_at'],
	};
}]);

app.controller('TransactionIndexControllerx', ['$scope', '$state', 'Transaction', 'Category',
function ($scope, $state, Transaction, Category) {
	$scope.records = [];
	$scope.refresh = function(page){
		Transaction.query({offset: page * 10}, function(pagination){
			$scope.records = pagination.data;
			$scope.totalItems = pagination.total;
		});
	};

	$scope.categories = Category.index();

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
	Category.query({}, function(r){
		$scope.categories = r.data;
	});
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

app.controller('TransactionCategorizeController', ['$scope', '$state', 'Transaction', 'Category',
function ($scope, $state, Transaction, Category) {
	$scope.records = [];
	$scope.refresh = function(page){
		Transaction.query({offset: page * 10, whereField:'category_id', whereValue: 0}, function(pagination){
			console.log("categorize.refresh", pagination);
			$scope.records = pagination.data;
			$scope.totalItems = pagination.total;
		});
	};

	$scope.categories = Category.index({limit: 100});

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
	
	$scope.$watch('currentPage', $scope.pageChanged);
	
	$scope.assignCategory = function(transaction, category_id){
		console.log("transaction.assignCategory", transaction, category_id);

		transaction.category_id = category_id;
		Transaction.update({id: transaction.id}, transaction, function(){
			$scope.refresh($scope.currentPage);
		});
	};
}]);