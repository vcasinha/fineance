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

app.directive('navigation', function(){
	return {

		templateUrl: 'app/html/partials/navigation.html',
		controller: function($scope){
			
			$scope.locations = [
				{label: 'Index', state: 'stats'},
				{label: 'Categories', state: 'stats-categories'},
				{label: 'Groups', state: 'stats-groups'}
			];
		}
    };
});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, $log, fields, record, model) {
	$log.info("fields", fields);
	$scope.fields = fields;
	$scope.record = {};
	angular.copy(record, $scope.record);
	$scope.selected = {
		fields: $scope.fields[0]
	};
	
	$scope.create = function () {
		model.create($scope.record).$promise
			.then(function(){
				angular.copy(record, $scope.record);
				$modalInstance.close(record);
			});
	};
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});

app.controller('tableController', function($scope, $modal, $log){
	//Pagination
	var default_params = {
		fields: [],
		order: {},
		sortable: [],
		itemCount: 0,
		page: 1,
		last_page: 1,
		records: [],
		record: {},
		trashed: false,
		show_delete: false,
	};
	
	$scope.toggle = function(index){
		$scope[index] = !$scope[index];
	}
	
	$scope.table = angular.extend({}, default_params, $scope.params);
	angular.copy($scope.record, $scope.table.record);
	
	//Modal create
	$scope.open = function (size) {
		var modal_settings = {
			backdrop: 'static',
			templateUrl: 'app/html/account/modal.create.html',
			controller: 'ModalInstanceCtrl',
			size: size,
			resolve: {
				fields: function (){
			  		return $scope.table.fields;
				},
				record: function(){
					return $scope.record;
				},
				model: function(){
					return $scope.table.model;
				}
			}
		};
		
		var modalInstance = $modal.open(modal_settings);
			
		modalInstance.result.then(
			function (record) {
				$scope.table.refresh();
			}, 
			function () {
				$log.info('Modal dismissed at: ' + new Date());
			}
		);
	};
	
	
	//Destroy record
	$scope.table.destroy = function(record){
		console.log("table.record.destroy", record);
		$scope.table.model.destroy(record).$promise
			.then(
				function(){
					$scope.table.refresh();
				}, 
				function(){
					console.error(arguments);
				});
	};
	
	//Create record
	$scope.table.create = function(record){
		console.log("table.record.create", record, $scope.record);
		$scope.table.model.create(record).$promise
			.then(function(){
				angular.copy($scope.record, $scope.table.record);
				$scope.table.refresh();
			}, function(){
				alert('failed');
			});
	};

	//Create record
	$scope.table.recover = function(record){
		console.log("table.record.recover", record);
		$scope.table.model.recover(record).$promise
			.then(function(){
				$scope.table.refresh();
			}, function(){
				alert('failed');
			});
	};
	
	$scope.table.collection_params = {
		trashed: $scope.table.trashed,
		limit: 10,
		offset: ($scope.table.page - 1) * 10, 
		order: $scope.table.order,
		where: $scope.filter
	};
	
	$scope.table.refresh = function(){
		angular.copy($scope.record, $scope.table.record);
		$scope.table.collection_params = {
			trashed: $scope.table.trashed,
			limit: 10,
			offset: ($scope.table.page - 1) * 10, 
			order: $scope.table.order,
			where: $scope.filter
		};
		
		var params = $scope.table.collection_params;
		console.log("table.refresh", $scope.record, params);
		
		var query = $scope.table.model.query(params).$promise
			.then(
				function(response){
					console.log("query.response", response);
					$scope.table.records = response.data;
					$scope.table.itemCount = response.total;
					$scope.table.last_page = response.last_page;
				}, 
				function(res){
					console.error(res.data);
				});
	};
	
	$scope.table.formatRecordValue = function(field_name, value){
		return value;
	}
	
	$scope.table.getRecordValue = function(record, field){
		//console.log("getRecordValue", record, field);
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
	
	$scope.$on('table.update', $scope.table.refresh);
	$scope.$watchGroup(['table.page', 'table.trashed'], $scope.table.refresh);
});

app.directive('tableManager', function() {
	return {
		scope: {
			params: '=',
			name: '=',
			model: '=',
			filter: '=',
			record: '='
		},
		templateUrl: 'app/html/partials/table.manager.html',
		controller: 'tableController'
    };
});

app.directive('focus', function() {
	return function($scope, elem, attr) {
		elem[0].focus();
		$scope.$on(attr.focus, function(e) {
			elem[0].focus();
		});
	};
});

