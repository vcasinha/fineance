var app = angular.module('fineance.group', ['fineance.group.factories']);

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
		actions: {
			categories: {
				size: 'lg',
				label: 'Categories',
				name: 'categories',
				templateUrl: 'app/html/group/edit.html',
				controller: 'GroupEditController'
			}
		},
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

app.controller('GroupEditController',
	function ($scope, $modalInstance, $log, Group, Category, GroupCategory, fields, record) {
		console.log("arguments", arguments);
		function refresh_group_categories(group_id){
			var params = {
				group_id: group_id, 
				order:{
					group_id: 'ASC'
				}
			};
			
			$log.info("group.edit.groupCategories", params);
			$scope.group_categories = GroupCategory.index(params);
		}
		
		$scope.categories = Category.index();
	
		var collectionFind = function(collection, field, value){
			var needle = {};
			angular.forEach(collection, function(record){
				//$log.info("collectionFind", record, field, value);
				if(record[field] == value){
					needle = record;
				}
			});
			return needle;
		}
	
		$scope.getCategory = function(category_id){
			return collectionFind($scope.categories, 'id', category_id);
		}
		
		$log.info("Record received", record);
		$scope.record = record;
		refresh_group_categories(record.id);
	
		$scope.remove = function(category){
			//$log.info("group_category.remove", category);
			angular.forEach($scope.group_categories, function(group_category){
	
				if(category.id == group_category.category_id)
				{
					$log.info("group_category.delete", group_category);
					GroupCategory.destroy(group_category).$promise
						.then(
						function(){
							refresh_group_categories($scope.record.id);
						},
						function(){
							$log.error('Failed to update');
						});
	
					return false;
				}
	
			});
		};
	
		$scope.toggle = function(category){
			$log.info("category.toggle", category);
	
			if($scope.inGroup(category)){
				$scope.remove(category);
			}
			else{
				var group_category = {
					group_id: $scope.record.id,
					category_id: category.id
				};
	
				$log.info("group_category.create", group_category);
				var record = GroupCategory.create(group_category)
				record.$promise.then(function(){
					refresh_group_categories($scope.record.id);
				});
			}
		};
	
		$scope.inGroup = function(category){
			var found = false;
			//$log.info("group_category", category);
			angular.forEach($scope.group_categories, function(group_category){
				//$log.info("category", group_category, category);
				if(category.id == group_category.category_id)
				{
					found = true;
					//$log.info("category.found", group_category);
					return false;
				}
	
			});
	
			return found;
		};
	
		$scope.save = function(record){
			$log.info("group.edit", record);
	
			Group.update(record).$promise
				.then(function(){
					$modalInstance.close(record);
				}, function(){
					$log.error("group.edit", "Failed to update");
				});
		};
		
		$scope.cancel = function(){
			$modalInstance.dismiss('cancel');
		}
	}
);