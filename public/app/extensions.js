var app = angular.module('fineance.extensions', []);

app.factory('table.order', function(){
	
	return function(scope){
		if(!scope.refresh){
			alert("Missing scope.refresh");
		}
		//Order
		scope.order = {};
		scope.toggleOrder = function(order_field){
			switch(scope.order[order_field]){
				case 'ASC':
					scope.order[order_field] = 'DESC';
				break;
				case 'DESC':
					delete scope.order[order_field];
				break;
				default:
					scope.order[order_field] = 'ASC';
				break;
			}
			scope.refresh();
		}
	};
});
