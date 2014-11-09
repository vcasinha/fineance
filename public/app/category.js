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

app.controller('CategoryIndexController', ['$scope', 'Category', 'Group', 'table.order',
function ($scope, Category, Group, traitOrder) {
	$scope.groups = Group.query();
	
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
	
	$scope.record = {};
	$scope.create = function(record){
		console.log("category.create", record);
		
		var t = new Category(record);
		t.$save()
			.then(function(){
				$scope.record = {};
				$scope.refresh();
			}, function(){
				alert('failed');
			});
	};
	
	//Pagination
	$scope.table = {
		itemCount: 0,
		page: 0,
		records: []
	};

	$scope.refresh = function(){
		var query_params = {
			offset: $scope.table.page * 10, 
			order: $scope.order
		};
		
		Category.query(query_params, function(response){
			console.log("query.response", response);
			$scope.table.records = response.data;
			$scope.table.itemCount = response.total;
		});
	};
	
	$scope.$watch('table.page', $scope.refresh);
	
	traitOrder($scope);
	
/*
	//Order
	$scope.order = {};
	$scope.toggleOrder = function(order_field){
		switch($scope.order[order_field]){
			case 'ASC':
				$scope.order[order_field] = 'DESC';
			break;
			case 'DESC':
				delete $scope.order[order_field];
			break;
			default:
				$scope.order[order_field] = 'ASC';
			break;
		}
		$scope.refresh();
	}
	
*/

	

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