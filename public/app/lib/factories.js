var app = angular.module('fineance.factories', ['ui.router', 'ui.bootstrap']);

app.factory('API', [
	'$resource', 
	function($resource){
		var API = {
			collection: function(options){
			    var params = {
			        id:'@id'
			    };
			    
			    var methods = {
			        'index' : { method: 'GET', isArray: true },
			        'update': { method: 'PUT' },
			        'query' : { method: 'GET', params:{ paginate:true } },
			        'recover': { method: 'GET', url: options.url + '/recover'}
			    };
			    
			    angular.extend(params, options.params);
			    angular.extend(methods, options.methods);
			    
				var resource = $resource(options.url, params, methods);
				var controller = {
			        create: function(record){
			            console.log("collection.save", options.name, record);
			            return resource.save(record);
			        },
			        destroy: function(record){
			            console.log("collection.destroy", options.name, record);
			            return resource.delete(record);
			        },
			        update: function(record){
			            console.log("collection.update", options.name, record);
			            return resource.update(record);
			        },
			        index: function(params){
			            console.log("collection.index", options.name, params);
			            return resource.index(params);
			        },
			        query: function(params){
			            console.log("collection.query", options.name, params);
			            return resource.query(params);
			        },
			        recover: function(params){
			            console.log("collection.query", options.name, params);
			            return resource.recover(params);
			        }
			    }
			    
			    return controller;
			}
		}
		
		return API;
	}]);

app.factory('Account', ['API', 
function(API) {
	var collection_options = {
		name: 'Account',
		url: '/api/account/:id'
	};

	return API.collection(collection_options);
}]);

app.factory('Transaction', ['API', 
function(API) {
	var collection_options = {
		name: 'Transaction',
		url: '/api/transaction/:id'
	};

	return API.collection(collection_options);
	
    var url = '/api/transaction/:id';
    var params = {
        id:'@id'
    };

    var methods = {
        'index' : { method: 'GET', isArray: true },
        'update': { method: 'PUT' },
        'query' : { method: 'GET', params:{ paginate:true } }
    };

    var resource = $resource(url, params, methods);

	return {
        create: function(record){
            console.log("category.save", record);
            return resource.save(record).$promise;
        },
        destroy: function(record){
            console.log("category.destroy", record);
            return resource.delete(record).$promise;
        },
        update: function(record){
            console.log("category.update", record);
            return resource.update(record).$promise;
        },
        index: function(params){
            console.log("category.index", params);
            return resource.index(params).$promise;
        },
        query: function(params){
            console.log("category.query", params);
            return resource.query(params).$promise;
        }
    };
}]);

app.factory('Category', ['API', 
function(API) {
	var collection_options = {
		name: 'Category',
		url: '/api/category/:id'
	};

	return API.collection(collection_options);
    var url = '/api/category/:id';
    var params = {
        id:'@id'
    };

    var methods = {
        'index' : { method: 'GET', isArray: true },
        'update': { method: 'PUT' },
        'query' : { method: 'GET', params:{ paginate:true } }
    };

    var resource = $resource(url, params, methods);
    var records;
    return {
        create: function(record){
            console.log("category.save", record);
            return resource.save(record).$promise;
        },
        destroy: function(record){
            console.log("category.destroy", record);
            return resource.delete(record).$promise;
        },
        update: function(record){
            console.log("category.update", record);
            return resource.update(record).$promise;
        },
        index: function(params){
            console.log("category.index", params);
            return resource.index(params).$promise;
        },
        load: function(){
            this.index()
                .then(
                    function(data){
                        //console.log('category.load', data);
                        records = {};
                        angular.forEach(data, function(record){
                            records[record.id] = record;
                        });
                    },
                    function(){
                        alert("error loading");
                    });
        },
        loaded: function(){
            return records;
        },
        getByID: function(id){
            //console.log("Category.getByID", id, records);
            return records[id];
        },
        query: function(params){
            console.log("category.query", params);
            return resource.query(params).$promise;
        }
    };
}]);

app.factory('Group', ['$resource', 
function($resource) {
    var url = '/api/group/:id';
    var params = {
        id:'@id'
    };

    var methods = {
        'index' : { method: 'GET', isArray: true },
        'update': { method: 'PUT' },
        'query' : { method: 'GET', params:{ paginate:true } }
    };

    var resource = $resource(url, params, methods);

    return {
        create: function(record){
            console.log("group.save", record);
            return resource.save(record).$promise;
        },
        destroy: function(record){
            console.log("group.destroy", record);
            return resource.delete(record).$promise;
        },
        update: function(record){
            console.log("group.update", record);
            return resource.update(record).$promise;
        },
        index: function(params){
            console.log("group.index", params);
            return resource.index(params).$promise;
        },
        query: function(params){
            console.log("group.query", params);
            return resource.query(params).$promise;
        }
    };
}]);

app.factory('GroupCategory', ['$resource', 
function($resource) {
    var url = '/api/group/:group_id/category/:id';
    var params = {group_id: '@group_id', id:'@id'}
    var methods = {
        'index' : { method: 'GET', isArray: true },
        'update': { method: 'PUT' },
        'query' : { method: 'GET', params:{ paginate:true } }
    };

    var resource = $resource(url, params, methods);

    return {
        create: function(record){
            console.log("category.save", record);
            return resource.save(record).$promise;
        },
        destroy: function(record){
            console.log("category.destroy", record);
            return resource.delete(record).$promise;
        },
        update: function(record){
            console.log("category.update", record);
            return resource.update(record).$promise;
        },
        index: function(params){
            console.log("category.index", params);
            return resource.index(params).$promise;
        },
        query: function(params){
            console.log("category.query", params);
            return resource.query(params).$promise;
        }
    };
}]);

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
        'groups': {
            method: 'GET',
            url: 'api/group/summary/year/:year',
            isArray: true,
        }
    };

    var resource = $resource(url, params, methods);

    return {
        categories: function(params){
            console.log("stats.categories", params);
            return resource.categories(params).$promise;
        },
        groups: function(params){
            console.log("stats.groups", params);
            return resource.groups(params).$promise;
        },
        index: function(params){
            console.log("stats.index", params);
            return resource.index(params).$promise;
        }
    };
}]);

app.service('StatsCharts', ['Stats', 
function(Stats) {
    var prepareIndexChart = function(data, index, fieldsSerie){
        var series = [];

        angular.forEach(fieldsSerie, function(field, s){
            var serie = initSerie(field);
            series.push(serie);
        });

        angular.forEach(data, function(record, c){
            angular.forEach(fieldsSerie, function(field, s){
                var serie = series[s];
                var pair = [Number(record[index]), Number(record[field])];
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
            serie.values[Number(record[index_field] - 1)] = [Number(record[index_field]), Number(record[value_field])];
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

    return {
        index: function(params, callback){
            Stats.index(params).then(
                function(data){
                    var chart_data = prepareIndexChart(data, 'month', ['total']);
                    callback(chart_data);
                }, handleErrors);
        },
        categories: function(params, series_params, callback){
            Stats.categories(params).then(
                function(data){
                    console.log("statscharts.categories", params, series_params);
                    //prepareChart(data, 'category_id', 'month', 'total', series_params);
                    var chart_data = prepareMultipleSeriesChart(data, 'category_id', 'month', 'total', series_params);
                    callback(chart_data);
                }, 
                handleErrors);
        },
        initSerie: function initSerie(name){
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
    };
}]);

app.factory('scopeToggle', 
function() {
    return function($scope, flags){
        angular.forEach(flags, function(value, flag){
            $scope[flag] = value;
        });
        
        $scope.toggle = function(flag){
            $scope[flag] = !$scope[flag];
        }
    };
});
