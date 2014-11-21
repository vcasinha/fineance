var app = angular.module('fineance.transaction', ['fineance.transaction.factories']);

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

app.controller('TransactionIndexController', [
	'$scope', 
	'Transaction', 
	'Category',
	'Account',
	function ($scope, Transaction, Category, Account) {
		$scope.refresh = function(){
			$scope.$broadcast('table.update');
		}
		
		$scope.toggleAccount = function(account_id){
			console.log("transaction.toggleAccount", account_id);
			$scope.filter.account_id = account_id;
			$scope.record.account_id = account_id;
			$scope.$broadcast('table.update');
		}
		
		var categories = Category.index({limit:-1});
			
		$scope.filter = {
			account_id: 1,
		};
		
		$scope.accounts = Account.index();
		$scope.accounts.$promise
			.then(function(accounts){
				if(accounts.length > 0){
					$scope.filter.account_id = accounts[0].id;
					$scope.refresh();
				}
				
			});

		//Default empty record
		$scope.record = {
			account_id: 1,
			category_id: 1,
			traded_at: new Date(),
		};

		//Table parameters
		$scope.table_params = {
			model: Transaction,
			max_pages: 5,
			fields: [
				{ name:"traded_at", label:"Date of transaction", type: 'date', placeholder: '2014-01-01', required: true, output: 'date' },
				{ name:"description", label:"Description", type: 'text', placeholder: 'Description', required:true },
				{ name:"category_id", label:"Category", type: 'related', related: { index: 'id', label: 'name', records: categories }},
				{ name:"amount", label:"Amount", type: 'number', placeholder: '12.3' },
	
			],
			order: {
				'traded_at': 'DESC'
			},
			sortable: ['amount', 'description', 'category_id', 'traded_at'],
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