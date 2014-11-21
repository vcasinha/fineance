var app = angular.module('fineance.transaction.factories', []);

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