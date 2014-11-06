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
				{label: 'Mmm', state: 'stats-mmm'}
			];
		}
    };
});