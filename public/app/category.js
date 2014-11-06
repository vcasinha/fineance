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
	
	$scope.refresh = function(){
		$scope.records = Category.query();
	};
	
	$scope.destroy = function(record){
		console.log("category.destroy", record);
		
		record.$delete()
			.then(
			function(){
				$scope.refresh();
			}, 
			function(){
				console.error(arguments);
			});
	};
	
	$scope.refresh();
}]);

app.controller('CategoryCreateController', ['$scope', '$state', 'Category', 
function ($scope, $state, Category) {    
	$scope.category = {};
	$scope.create = function(record){
		console.log("category.create", record);
		
		var t = new Category(record);
		t.$save()
			.then(function(){
				$state.go('category');
			}, function(){
				alert('failed');
			});
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