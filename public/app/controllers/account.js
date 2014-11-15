var app = angular.module('fineance.account', ['ui.router', 'ui.bootstrap']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,   $urlRouterProvider) {
	$stateProvider
		.state('account', {
			url: '/acount',
			templateUrl: 'app/html/account/index.html',
			controller: 'AccountIndexController'
		})
		.state('account-create', {
			url: '/account/create',
			templateUrl: 'app/html/account/create.html',
			controller: 'AccountCreateController'
		})
		.state('account-edit', {
			url: '/category/{id}',
			templateUrl: 'app/html/category/edit.html',
			controller: 'CategoryEditController'
		});
}]);

app.controller('AccountIndexController', ['$scope', 'Account',
function ($scope, Account) {
	$scope.table_params = {
		model: Account,
		fields: [
			{ name:"name", label:"Name", type: 'text', placeholder: 'Personal Checking', required:true },
			{ name:"description", label:"Description", type: 'text', placeholder: 'Checking account' },
			{ name:"created_at", label:"Created on", type: 'date', viewonly: true}
		],
		order: {
			'name':'ASC'
		},
		sortable: ['name']
	};
}]);

app.controller('CategoryEditController', ['$scope', '$state', 'Category', '$stateParams',
function ($scope, $state, Category, $stateParams) {
	console.log("category.edit", $stateParams.id);
	$scope.record = Category.get($stateParams);
	$scope.save = function(category){
		console.log("category.create", category);
		
		var t = new Category(category);
		t.$update()
			.then(function(){
				$state.go('category');
			}, function(){
				alert('failed');
			});
	};
}]);