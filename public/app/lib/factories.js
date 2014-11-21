var app = angular.module('fineance.factories', ['ui.router', 'ui.bootstrap']);

app.factory('API', 
	function($cachedResource){
		var collection = function(options){
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
		    if(options.methods){
			    angular.foreach(options.methods, function(method, name){
				    methods[name] = method;
			    });
		    }
		    
			var resource = $cachedResource(options.name, options.url, params, methods);
			var controller = {
				get: function(record){
		            console.log("collection.get", record);
		            return resource.get(record);
				},
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
		};
		
		return {
			collection: collection
		};
	}
);

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
