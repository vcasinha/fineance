var app = angular.module('fineance.statistics', ['fineance.statistics.factories']);

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
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                donut: true,
                transitionDuration: 200,
                labelThreshold: 0.01,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        }
    };

    StatsCharts.categoriesYear({period: '2014'}, function(chart){
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
                type: 'multiBarChart',
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

app.controller('StatsGroupsController', ['$scope', 'StatsCharts', 'scopeToggle',
function ($scope, StatsCharts, scopeToggle) {
    var flags = {
        showList: false,
        showDebug: false,
        showChart: true
    };
    
    scopeToggle($scope, flags);
	$scope.period = parseInt(moment().format('YYYY'));
	
    $scope.chart = {
        options: {
            chart: {
                type: 'pieChart',
                height: 400,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                donut: true,
                transitionDuration: 200,
                labelThreshold: 0.01,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        }
    };
    
	function refresh(){
	    StatsCharts.groupsYear({year: $scope.period}, function(data){
	        $scope.chart.data = data;
	        console.log("statscharts.groupsYear", $scope.chart);
	    });
	}

    $scope.$watch('period', refresh);
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