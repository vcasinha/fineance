var app = angular.module('fineance.category.factories', []);

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