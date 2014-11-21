var app = angular.module('fineance.statistics.factories', []);

app.factory('Stats', ['$resource', 
function($resource) {
    var url = '/api/stats/summary/:period';
    var params = {
        id:'@id'
    };

    var methods = {
        'index': {
            method: 'GET',
            url: '/api/stats/summary/:period',
            isArray: true
        },
        'categories': {
            method: 'GET',
            url: '/api/categories/summary/period/:period',
            isArray: true
        },
        'categoriesYear': {
	        method: 'GET',
	        url: '/api/stats/categories/year/:period',
	        isArray: true
        },
        'groupsYear': {
            method: 'GET',
            url: 'api/group/summary/year/:year',
            isArray: true,
        }
    };

    var resource = $resource(url, params, methods);

    return {
	    categoriesYear: function(params){
			return resource.categoriesYear(params);  
	    },
        groupsYear: function(params){
            console.log("stats.groups", params);
            return resource.groupsYear(params);
        },
        categories: function(params){
            console.log("stats.categories", params);
            return resource.categories(params).$promise;
        },
        index: function(params){
            console.log("stats.index", params);
            return resource.index(params).$promise;
        }
    };
}]);

app.service('StatsCharts', ['Stats', 
function(Stats) {
    var prepareExtractSeriePairs = function(data, label, value){
        var serie = [];

        angular.forEach(data, function(record, c){
            serie.push({
	            key: record[label], 
				y: Number(record[value])
	        });
	    });
        return serie;
    };
    
    var prepareIndexChart = function(data, index, fieldsSerie){
        var series = [];

        angular.forEach(fieldsSerie, function(field, s){
            var serie = initSerie(field);
            series.push(serie);
        });

        angular.forEach(data, function(record, c){
            angular.forEach(fieldsSerie, function(field, s){
                var serie = series[s];
                var pair = {x: Number(record[index]), y: Number(record[field])};
                serie.values[c] = pair;
            });
        });

        return {
            data: data,
            series: series
        }
    };

    var prepareMultipleSeriesChart = function(data, dimension_field, index_field, value_field, series_params){
        var charts = [];
        var series = {};

        //console.log("stats.index", data, series_params);

        angular.forEach(series_params, function(param){
            console.log("preparemutipleserieschart.seriesInit", param.label, param.index);
            series[param.index] = initSerie(param.label);
        });

        angular.forEach(data, function(record){
            console.log("preparemutipleserieschart", dimension_field, record[index_field], record[value_field], record);
            var dimension = Number(record[dimension_field]);
            var serie = series[dimension];
            if(!serie){
	            console.error("statscharts.recordMissing", dimension_field, record[dimension_field]);
            }
            serie.values[Number(record[index_field] - 1)] = { x: Number(record[index_field]), y: Number(record[value_field])};
        });
        
        angular.forEach(series, function(serie){
            charts[charts.length] = serie;
        });
        
        return {
            data: data,
            series: charts
        };
    };

    var handleErrors = function(){
        console.error("failed", arguments);
    };

    function initSerie(name){
        if(name == null){
            name = "Ungroupped";
        }
        
        console.log("initSerie", name);
        var serie = {
            key: name,
            //color: getRandomColor(),
            values: []
        }

        for(var i=0;i<12;i++){
            serie.values.push({x: i+1, y:0});
        }
        
        return serie;
    }

    return {
        index: function(params, callback){
            Stats.index(params).then(
                function(data){
                    var chart_data = prepareIndexChart(data, 'month', ['total']);
                    callback(chart_data.series);
                }, handleErrors);
        },
        categoriesYear: function(params, callback){
            Stats.categoriesYear(params).$promise.then(
                function(data){
                    var chart_data = prepareExtractSeriePairs(data, 'name', 'amount');
                    callback(chart_data);
                }, handleErrors);
        },
        groupsYear: function(params, callback){
            Stats.groupsYear(params).$promise.then(
                function(data){
                    var chart_data = prepareExtractSeriePairs(data, 'name', 'amount');
                    callback(chart_data);
                }, handleErrors);
        },
        categories: function(params, series_params, callback){
            Stats.categories(params).then(
                function(data){
                    console.log("statscharts.categories", params, series_params);
                    //prepareChart(data, 'category_id', 'month', 'total', series_params);
                    var chart_data = prepareMultipleSeriesChart(data, 'category_id', 'month', 'total', series_params);
                    callback(chart_data.series);
                }, 
                handleErrors);
        },
        initSerie: initSerie
    };
}]);
