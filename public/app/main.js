var modules = [
	'ngResource', 
	'ui.router', 
	'ui.bootstrap',
	'nvd3ChartDirectives',
	'fineance.services',
	'fineance.factories',
	'fineance.directives',
	'fineance.account',
	'fineance.transaction',
	'fineance.category',
	'fineance.group',
	'fineance.statistics',
	'fineance.pages'
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
        .otherwise('/frontpage');
}]);

app.run(['$rootScope', 'Account', function($rootScope, Account){
	$rootScope.app = {
		name: 'Fineance',
		version: '0.5 alpha'
	}
	
	Account.index().$promise
		.then(function(account_list){
			console.log("Accounts", account_list);
			$rootScope.accounts = account_list;
		});
}]);

app.directive('focus', function() {
	return function($scope, elem, attr) {
		elem[0].focus();
		$scope.$on(attr.focus, function(e) {
			elem[0].focus();
		});
	};
});
