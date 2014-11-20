var modules = [
	'ngResource',
	'ngCachedResource',
	'ui.router', 
	'ui.bootstrap',
	'nvd3',
	'oo.table',
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

app.config([
	'$stateProvider', 
	'$urlRouterProvider', 
	'$resourceProvider', 
	function ($stateProvider,   $urlRouterProvider, $resourceProvider) {
		//$resourceProvider.defaults.stripTrailingSlashes = false;
		
		$urlRouterProvider
	        .when('/c?id', '/contacts/:id')
	        .when('/user/:id', '/contacts/:id')
	
	        .otherwise('/frontpage');
	}]);

app.run([
	'$rootScope', 
	'Account', 
	function($rootScope, Account){
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
