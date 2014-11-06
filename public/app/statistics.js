var app = angular.module('fineance.statistics', ['ui.router', 'ui.bootstrap']);

app.config(['$stateProvider', '$urlRouterProvider', 
function ($stateProvider,   $urlRouterProvider) {
	$stateProvider
		.state('stats', {
			url: '/stats',
			templateUrl: 'app/html/stats/index.html',
			controller: 'StatsIndexController'
		})
		.state('stats-categories', {
			url: '/stats/categories',
			templateUrl: 'app/html/stats/categories.html',
			controller: 'StatsCategoriesController'
		});
}]);

app.controller('StatsIndexController', ['$scope', 'Stats',
function ($scope, Stats) {
	$scope.stats = Stats.index({period: '2014-11'});
	$scope.months = [
		'',
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
}]);

app.controller('StatsCategoriesController', ['$scope', '$filter', 'Stats', 'Category',
function ($scope, $filter, Stats, Category) {
	$scope.categories = Category.query();
	$scope.period = '2014-11';
	
	function refresh(){
		var period = $scope.date = $filter('date')($scope.period,'yyyy-MM'); 
		$scope.stats = Stats.categories({period: period});
	};
	
	$scope.datepickerOptions = {
	    datepickerMode:"'month'",
	    minMode:"month",
	    minDate:"minDate",
	    showWeeks:"false",
	 };
	
	$scope.opened = false;
    $scope.openCalendar = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = !$scope.opened;
    };
    
	$scope.$watch('period', function(newValue, oldValue) {
		refresh();
	});
	
	$scope.categoryByID = function(category_id){
		var value = {};
		angular.forEach($scope.categories, function(category){
			if(category.id == category_id){
				value = category;
				return false;
			}
		});
		
		return value;
	}
}]);