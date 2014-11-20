var app = angular.module('fineance.statistics', ['ui.router', 'ui.bootstrap']);

//Categories per year
//Groups per month
//Groups per year

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

app.controller('StatsIndexController', ['$scope', 'scopeToggle', 'StatsCharts',
function ($scope, scopeToggle, StatsCharts) {
    var flags = {
        showList: false,
        showDebug: false,
        showChart: true
    };

    scopeToggle($scope, flags);
    $scope.chart = {
        options: {
            chart: {
                type: 'historicalBarChart',
                useVoronoi: false,
                height: 300,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 45
                },
                clipEdge: true,
                staggerLabels: true,
                transitionDuration: 200,
                stacked: false,
                xAxis: {
                    axisLabel: 'Month',
                    showMaxMin: false,
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'Amount',
                    axisLabelDistance: 40,
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                }
            }
        }
    };

    StatsCharts.index({period: '2014'}, function(chart){
        $scope.chart.data = chart;
        console.log("statscharts.index", chart);
    });
}]);

app.controller('StatsCategoriesController', ['$scope', 'scopeToggle', 'StatsCharts','Stats', 'Category', 
function ($scope, scopeToggle, StatsCharts, Stats, Category) {
    $scope.period = parseInt(moment().format('YYYY'));

    var flags = {
        showList: false,
        showDebug: false,
        showChart: true
    };

    scopeToggle($scope, flags);
    $scope.chart = {
        options: {
            chart: {
                type: 'stackedAreaChart',
                useVoronoi: true,
                height: 300,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 45
                },
                clipEdge: true,
                staggerLabels: true,
                transitionDuration: 200,
                stacked: false,
                xAxis: {
                    axisLabel: 'Month',
                    showMaxMin: false,
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'Amount',
                    axisLabelDistance: 40,
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                }
            }
        }
    };

    function refresh(){
        Category.index().$promise
            .then(function(categories){
                var series_params = [];

                angular.forEach(categories, function(category){
	                console.log("stats.controller", category.id);
                    series_params.push({
                        index: category.id,
                        label: category.name
                    });
                });

                StatsCharts.categories({period: $scope.period}, series_params, function(chart){
                    $scope.chart.data = chart;
                    console.log('chart.data', $scope.chart.data);
                });
            });
    }

    $scope.$watch('period', refresh);
}]);

app.controller('StatsGroupsController', ['$scope', 'Stats',
function ($scope, Stats, Group) {
	var series = {};
	var charts = [];
	
    var prepareChart = function(data){
        $scope.stats = data;
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
    };

	$scope.chartData = [];
	Stats.groups({year: '2014-11'}).then(prepareChart);
}]);

function initSerie(name){
    if(name == null){
        name = "Ungroupped";
    }
    
    console.log("initSerie", name);
    
    return {
        key: name,
        //color: getRandomColor(),
        values: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0]]
    };
}

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