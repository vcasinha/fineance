var app = angular.module('fineance.category', ['ui.router', 'ui.bootstrap']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,   $urlRouterProvider) {
	$stateProvider
		.state('category', {
			url: '/category',
			templateUrl: 'app/html/category/index.html',
			controller: 'CategoryIndexController'
		})
		.state('category-create', {
			url: '/category/create',
			templateUrl: 'app/html/category/create.html',
			controller: 'CategoryCreateController'
		})
		.state('category-edit', {
			url: '/category/{id}',
			templateUrl: 'app/html/category/edit.html',
			controller: 'CategoryEditController'
		});
}]);

app.controller('CategoryIndexController', ['$scope', 'Category',
function ($scope, Category) {
	$scope.table_params = {
		model: Category,
		fields: [
			{ name:"name", label:"Name", type: 'text', placeholder: 'Fixed Income' },
			{ name:"description", label:"Description", type: 'text', placeholder: 'Fixed recurring income' },
/*
			{ name:"category", label:"Category", type: 'related', 
				related: { index: 'id', records: Category.index(), label: 'name' }}
*/
		],
		order: {
			'name':'ASC'
		},
		sortable: ['name'],
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