var app = angular.module('fineance.directives', []);

app.directive('navStats', function() {
	return {
		scope: {
			transactions: '=records'
		},
		templateUrl: 'app/html/stats/navigation.html',
		controller: function($scope){
			
			$scope.locations = [
				{label: 'Index', state: 'stats'},
				{label: 'Categories', state: 'stats-categories'},
				{label: 'Groups', state: 'stats-groups'}
			];
		}
    };
});

app.controller('tableController', ['$scope', function($scope){
	//Pagination
	var default_params = {
		fields: [],
		order: {},
		sortable: [],
		itemCount: 0,
		page: 0,
		records: [],
		record: {},
	};
	
	$scope.table = angular.extend(default_params, $scope.params);
	
	//Destroy record
	$scope.table.destroy = function(record){
		console.log("category.destroy", record);
		$scope.table.model.delete(record, function(){
				$scope.table.refresh();
			}, 
			function(){
				console.error(arguments);
			});
	};
	
	//Create record
	$scope.table.create = function(record){
		console.log("category.create", record);
		var t = new $scope.table.model(record);
		t.$save()
			.then(function(){
				$scope.table.record = {};
				$scope.table.refresh();
			}, function(){
				alert('failed');
			});
	};

	
	$scope.table.refresh = function(){
		$scope.table.collection_params = {
			limit: 10,
			offset: $scope.table.page * 10, 
			order: $scope.table.order
		};
		
		//console.log("table.refresh", $scope.table.collection_params, $scope);
		
		var query = $scope.table.model.query($scope.table.collection_params);
		query.$promise.then(
			function(response){
				//console.log("query.response", response);
				$scope.table.records = response.data;
				$scope.table.itemCount = response.total;
			}, 
			function(res){
				console.error(res.data);
			});
	};
	
	$scope.table.getRecordValue = function(record, field){
		var collectionFind = function(collection, field, value){
			var needle;
			angular.forEach(collection, function(record){
				if(record[field] == value){
					needle = record;
				}
			});
			return needle;
		}
		
		
		if(field.type == 'related'){
			var item = collectionFind(field.related.records, field.related.index, record[field.name]);
			//console.log('table.getRecordValue.related', record, field.related );
			return item[field.related.label];
		}
		
		return record[field.name];
	}
	
	//Order
	//scope.order = {};
	$scope.table.getOrder = function(field){
		return $scope.table.order[field];
	};
	
	$scope.table.toggleOrder = function(order_field){
		if($scope.table.sortable.indexOf(order_field) == -1){
			console.log("not.sortable", order_field, $scope.table.sortable);
			return false;
		}
		switch($scope.table.order[order_field]){
			case 'ASC':
				$scope.table.order[order_field] = 'DESC';
			break;
			case 'DESC':
				delete $scope.table.order[order_field];
			break;
			default:
				$scope.table.order[order_field] = 'ASC';
			break;
		}
		console.log("toggleOrder", $scope.table.sortable, $scope.table.order);
		$scope.table.refresh();
	}
	
	$scope.$watch('table.page', $scope.table.refresh);
}]);

app.directive('tableManager', function() {
	return {
		scope: {
			params: '=params',
			name: '=name',
			model: '='
		},
		templateUrl: 'app/html/partials/table.manager.html',
		controller: 'tableController'
    };
});