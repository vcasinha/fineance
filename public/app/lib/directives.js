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


app.directive('focus', function() {
	return function($scope, elem, attr) {
		elem[0].focus();
		$scope.$on(attr.focus, function(e) {
			elem[0].focus();
		});
	};
});

