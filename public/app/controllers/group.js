var app = angular.module('fineance.group', ['ui.router', 'ui.bootstrap']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,   $urlRouterProvider) {
	$stateProvider
		.state('group', {
			url: '/group',
			templateUrl: 'app/html/group/index.html',
			controller: 'GroupIndexController'
		})
		.state('group-create', {
			url: '/group/create',
			templateUrl: 'app/html/group/create.html',
			controller: 'GroupCreateController'
		})
		.state('group-edit', {
			url: '/group/{id}',
			templateUrl: 'app/html/group/edit.html',
			controller: 'GroupEditController'
		});
}]);

app.controller('GroupIndexController', ['$scope', 'Group',
function ($scope, Group) {

	$scope.table_params = {
		model: Group,
		max_pages: 5,
		states: {'edit': '/group'},
		fields: [
			{ name:"name", label:"Name", type: 'text', placeholder: 'Fixed income' },
			{ name:"description", label:"Description", type: 'text', placeholder: 'Fixed income' },

		],
		order: {
			'name': 'DESC'
		},
		sortable: ['name', 'description'],
	};
}]);

app.controller('GroupIndexController2', ['$scope', 'Group',
function ($scope, Group) {
/*
	$scope.table_params = {
		model: Group,
		max_pages: 5,
		states: {'edit': '/group'},
		fields: [
			{ name:"name", label:"Name", type: 'text', placeholder: 'Fixed income' },
			{ name:"description", label:"Description", type: 'text', placeholder: 'Fixed income' },

		],
		order: {
			'name': 'DESC'
		},
		sortable: ['name', 'description'],
	};
*/
	var refresh = function(){
		Group.index().then(
			function(data){
				$scope.records = data;
			},
			function(){
				
			});
	};

	$scope.destroy = function(record){
		console.log("category.destroy", record);
		Group.destroy(record)
			.then(refresh, function(){
				console.error(arguments);
			});
	};

	refresh();
}]);

app.controller('GroupCreateController', ['$scope', '$state', 'Group',
function ($scope, $state, Group) {
	$scope.record = {};
	$scope.create = function(record){
		console.log("group.create", record);
		Group.create(record).then(
			function(){
				$state.go('group');
			},
			function(e){
				console.error("GroupeCreateController.save", e.data.error);
			});
	};
}]);

app.controller('GroupEditController', [
'$scope', '$state', '$stateParams', 'Group', 'Category', 'GroupCategory',
function ($scope, $state, $stateParams, Group, Category, GroupCategory) {
	function refresh_group_categories(group_id){
		GroupCategory.index({group_id: group_id, order:{group_id: 'ASC'}}, function(data){
			$scope.group_categories = data;
		});
		console.log("group_categories", $scope.group_categories);
	}
	
	$scope.categories = Category.index();

	var collectionFind = function(collection, field, value){
		var needle = {};
		angular.forEach(collection, function(record){
			//console.log("collectionFind", record, field, value);
			if(record[field] == value){
				needle = record;
			}
		});
		return needle;
	}

	$scope.getCategory = function(category_id){
		//console.log("getCategory", category_id, collectionFind($scope.categories, 'id', category_id));
		return collectionFind($scope.categories, 'id', category_id);
	}

	$scope.record = Group.get($stateParams,function(){
			refresh_group_categories($scope.record.id);
		});

	$scope.remove = function(category){
		//console.log("group_category.remove", category);
		angular.forEach($scope.group_categories, function(group_category){

			if(category.id == group_category.category_id)
			{
				console.log("group_category.delete", group_category);
				group_category.$delete()
					.then(function(){
						refresh_group_categories($scope.record.id);
					});

				return false;
			}

		});
	};

	$scope.toggle = function(category){
		console.log("category.toggle", category);

		if($scope.inGroup(category)){
			$scope.remove(category);
		}
		else{
			var group_category = {
				group_id: $scope.record.id,
				category_id: category.id
			};

			console.log("group_category.create", group_category);
			var record = new GroupCategory(group_category);
			record.$save()
				.then(function(){
					refresh_group_categories($scope.record.id);
				});
		}
	};

	$scope.inGroup = function(category){
		var found = false;
		//console.log("group_category", category);
		angular.forEach($scope.group_categories, function(group_category){
			//console.log("category", group_category, category);
			if(category.id == group_category.category_id)
			{
				found = true;
				//console.log("category.found", group_category);
				return false;
			}

		});

		return found;
	};

	$scope.save = function(record){
		console.log("group.edit", record);

		var t = new Group(record);
		t.$update()
			.then(function(){
				$state.go('group');
			}, function(){
				alert('failed');
			});
	};
}]);