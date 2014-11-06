var modules = [
	'ngResource', 
	'ui.router', 
	'ui.bootstrap', 
	'fineance.transactions',
	'fineance.services'
];
	
var app = angular.module('fineance', modules);

app.config(['$stateProvider', '$urlRouterProvider', '$resourceProvider', function ($stateProvider,   $urlRouterProvider, $resourceProvider) {
	$resourceProvider.defaults.stripTrailingSlashes = false;
	
	$urlRouterProvider
        // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
        // Here we are just setting up some convenience urls.
        .when('/c?id', '/contacts/:id')
        .when('/user/:id', '/contacts/:id')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/');
	
	$stateProvider
        .state("home", {
          // Use a url of "/" to set a state as the "index".
          url: "/",

          // Example of an inline template string. By default, templates
          // will populate the ui-view within the parent state's template.
          // For top level states, like this one, the parent template is
          // the index.html file. So this template will be inserted into the
          // ui-view within index.html.
          template: '<p class="lead">Welcome to the UI-Router Demo</p>' +
            '<p>Use the menu above to navigate. ' +
            'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' +
            '<p>Click these links—<a href="#/c?id=1">Alice</a> or ' +
            '<a href="#/user/42">Bob</a>—to see a url redirect in action.</p>'

        });
}]);;var app = angular.module('fineance.services', ['ui.router', 'ui.bootstrap']);

app.factory('Transaction', ['$resource', function($resource) {
	return $resource('/api/transaction/:id', {id:'@id'},
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('Category', ['$resource', function($resource) {
	return $resource('/api/category/:id', {id:'@id'},
    {
        'update': { method:'PUT' }
    });
}]);;var app = angular.module('fineance.transactions', ['ui.router', 'ui.bootstrap']);

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

app.controller('TransactionIndexController', ['$scope', 'Transaction', 'Category',
function ($scope, Transaction, Category) {
	
	$scope.refresh = function(){
		$scope.transactions = Transaction.query();
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

app.controller('TransactionAddController', ['$scope', '$state', 'Transaction', 'Category', function ($scope, $state, Transaction, Category) {
	
	$scope.opened = false;
    $scope.openCalendar = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = !$scope.opened;
    };
    
	$scope.transaction = {};
	$scope.categories = Category.query();
	$scope.addTransaction = function(transaction){
		console.log("transaction.add", transaction);
		
		var t = new Transaction($scope.transaction);
		t.$save()
		.then(function(){
			alert("worked");
			//$state.go('transaction-index');
		}, function(){
			alert('failed');
		});
	};
}]);