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
		})
		.state('stats-groups', {
			url: '/stats/groups',
			templateUrl: 'app/html/stats/groups.html',
			controller: 'StatsGroupsController'
		});
}]);

app.controller('StatsIndexController', ['$scope', 'Stats',
function ($scope, Stats) {
	$scope.showList = false;
	$scope.showDebug = false;
	$scope.showChart = true;
	
	$scope.toggle = function(field){
		$scope[field] = !$scope[field];
	}
	
	$scope.stats = Stats.index({period: '2014'},function(data){
		var values = [];
		var c = 0;
		angular.forEach(data, function(record){
			values[c] = [Number(record.month), Number(record.total)];
			c++;
		});
		
		var graph = {
			key: "Transactions",
			values: values
		};
		
		$scope.chartData = [graph];
	});
	
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
	$scope.showList = false;
	$scope.showDebug = false;
	$scope.showChart = true;
	
	$scope.toggle = function(field){
		$scope[field] = !$scope[field];
	}
	
	$scope.toTimestamp = function(d){
		var dd = new Date.parseDate('Y-m-d H:i:s', d);
		console.log("toTimestamp", d, dd);
		return dd;
	};
	
	$scope.categories = Category.query();
	$scope.period = 2014;
	
	function refresh(){
		var charts = [];
		var series = {};

		$scope.stats = Stats.categories({period: $scope.period}, function(data){
			angular.forEach(data, function(record){
				var category = Number(record.category_id);
				var serie = series[category];
				if(!serie){
					series[category] = initSerie($scope.categoryByID(category).name, category);
				}
				
				serie = series[category];
				serie.values[Number(record.month - 1)] = [Number(record.month), Number(record.total)];
			});
			
			angular.forEach(series, function(serie){
				charts[charts.length] = serie;
			});
			
			$scope.chartData = charts;
			
		});
	};
	
	$scope.datepickerOptions = {
	    datepickerMode:"'year'",
	    minMode:"year",
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

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function initSerie(name, id){
	if(name == null){
		name = "Ungroupped";
	}
	console.log("initSerie", name, id);
	return {
		key: name,
		//color: getRandomColor(),
		values: [
			[1, 0],
			[2, 0],
			[3, 0],
			[4, 0],
			[5, 0],
			[6, 0],
			[7, 0],
			[8, 0],
			[9, 0],
			[10, 0],
			[11, 0],
			[12, 0],
		]
	};
}

app.controller('StatsGroupsController', ['$scope', 'Stats',
function ($scope, Stats, Group) {
	var series = {};
	var charts = [];
	
	$scope.chartData = [];
	$scope.stats = Stats.groups({year: '2014-11'},function(data){
		angular.forEach(data, function(record){
			var group = record.group;
			serie = series[group];
			if(!serie){
				series[group] = initSerie(record.group, record.group);
			}
			
			serie = series[group];
			serie.values[Number(record.month - 1)] = [Number(record.month), Number(record.total)];

		});
		
		angular.forEach(series, function(serie){
			console.log(serie);
			charts[charts.length] = serie;
		});
		$scope.chartData = charts;
	});
}]);

/*
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
*/