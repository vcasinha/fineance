var app = angular.module('oo.table', []);

/*Should be removed?*/
app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, $log, fields, record, model) {
    $log.info("fields", fields);
    $scope.fields = fields;
    $scope.record = {};
    angular.copy(record, $scope.record);
    $scope.selected = {
        fields: $scope.fields[0]
    };
    
    $scope.create = function (new_record) {
        var clean_record = {};
        angular.copy(new_record, clean_record);
        angular.forEach(fields, function(field){
            switch(field.output){
                case 'date':
                    clean_record[field.name] = moment(new_record[field.name]).format("YYYY-MM-DD HH:mm:ss");
                break;
                default:
                    clean_record[field.name] = new_record[field.name];
                break;
            }
        });

        $log.info('table.create', new_record, clean_record);

        model.create(clean_record).$promise
            .then(function(){
                angular.copy(record, $scope.record);
                $modalInstance.close(clean_record);
            });
    };
    
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

//Table manager
app.directive('tableManager', function() {
    return {
        scope: {
            params: '=',
            name: '=',
            model: '=',
            filter: '=',
            record: '='
        },
        templateUrl: 'app/html/partials/table.manager.html',
        controller: 'tableController'
    };
});

//Table controller
app.controller('tableController', function($scope, $modal, $log){
    //Pagination
    var default_params = {
        fields: [],
        order: {},
        sortable: [],
        itemCount: 0,
        page: 1,
        last_page: 1,
        records: [],
        record: {},
        trashed: false,
        edit_mode: false,
    };
    
    $scope.table = angular.extend({}, default_params, $scope.params);
    angular.copy($scope.record, $scope.table.record);
    
    //Create a list of possible modals

    //Modal create
    $scope.open = function (size) {
        var modal_settings = {
            backdrop: 'static',
            templateUrl: 'app/html/account/modal.create.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                fields: function (){
                    return $scope.table.fields;
                },
                record: function(){
                    return $scope.record;
                },
                model: function(){
                    return $scope.table.model;
                }
            }
        };
        
        var modalInstance = $modal.open(modal_settings);
            
        modalInstance.result.then(
            function (record) {
                $scope.table.refresh();
            }, 
            function () {
                $log.info('Modal dismissed at: ' + new Date());
            }
        );
    };

    //Modal create
    $scope.modalDialog = function (name, record) {
	    var action = $scope.table.actions[name];
	    if(!action){
		    throw "Invalid action " + name;
	    }
	    
        var modal_settings = {
            backdrop: 'static',
            templateUrl: action.templateUrl,
            controller: action.controller,
            size: action.size,
            resolve: {
                fields: function (){
                    return $scope.table.fields;
                },
                record: function(){
                    return record;
                },
                model: function(){
                    return $scope.table.model;
                }
            }
        };
        
        var modalInstance = $modal.open(modal_settings);
            
        modalInstance.result.then(
            function (record) {
                $scope.table.refresh();
            }, 
            function () {
                $log.info('Modal dismissed at: ' + new Date());
            }
        );
    };

    //Toggle flag in scope
    $scope.toggle = function(index){
        $scope[index] = !$scope[index];
    }

    //Destroy record
    $scope.table.destroy = function(record){
        $log.info("table.record.destroy", record);
        $scope.table.model.destroy(record).$promise
            .then(
                function(){
                    $scope.table.refresh();
                }, 
                function(){
                    console.error(arguments);
                });
    };
    
    //Create record
    $scope.table.create = function(record){
        $log.info("table.record.create", record, $scope.record);
        $scope.table.model.create(record).$promise
            .then(function(){
                angular.copy($scope.record, $scope.table.record);
                $scope.table.refresh();
            }, function(){
                $log.error('table.create', arguments);
            });
    };

    //Create record
    $scope.table.recover = function(record){
        console.log("table.record.recover", record);
        $scope.table.model.recover(record).$promise
            .then(function(){
                $scope.table.refresh();
            }, function(){
                $log.error('table.recover', arguments);
            });
    };
    
    $scope.table.refresh = function(){
        angular.copy($scope.record, $scope.table.record);
        $scope.table.collection_params = {
            trashed: $scope.table.show_trashed,
            limit: 10,
            offset: ($scope.table.page - 1) * 10, 
            order: $scope.table.order,
            where: $scope.filter
        };
        
        $log.info("table.refresh.request", $scope.table.collection_params);
        
        var query = $scope.table.model.query($scope.table.collection_params).$promise
            .then(
                function(response){
                    $log.info("table.refresh.response", response);
                    $scope.table.records = response.data;
                    $scope.table.itemCount = response.total;
                    $scope.table.last_page = response.last_page;
                }, 
                function(res){
                    $log.error(res.data);
                });
    };
    
/*    $scope.table.formatRecordValue = function(field_name, value){
        return value;
    }*/
    
    $scope.table.getRecordValue = function(record, field){
        var collectionFind = function(collection, field, value){
            var needle;
            angular.forEach(collection, function(record){
                if(record[field] == value){
                    needle = record;
                }
            });
            return needle;
        }
        
        if(field.type == 'related'){
            var item = collectionFind(field.related.records, field.related.index, record[field.name]);
            //console.log('table.getRecordValue.related', record, field.related );
            return item[field.related.label];
        }
        if(!field.name in record){
            $log.warn('table.getRecordValue.missingKey', field.name, record);
        }
        var value = record[field.name];
        switch(field.output){
            case 'date':
                value = moment(value).format("YYYY-MM-DD");
            break;
            default:
            break;
        }
        
        //$log.info("table.getRecordValue", field.name, value, field);

        return value;
    }
    
    //Order
    //scope.order = {};
    $scope.table.getOrder = function(field){
        return $scope.table.order[field];
    };
    
    $scope.table.toggleOrder = function(order_field){
        if($scope.table.sortable.indexOf(order_field) == -1){
            $log.warn("not.sortable", order_field, $scope.table.sortable);
            return false;
        }
        switch($scope.table.order[order_field]){
            case 'ASC':
                $scope.table.order[order_field] = 'DESC';
            break;
            case 'DESC':
                delete $scope.table.order[order_field];
            break;
            default:
                $scope.table.order[order_field] = 'ASC';
            break;
        }
        $log.info("toggleOrder", $scope.table.sortable, $scope.table.order);
        $scope.table.refresh();
    }
    
    $scope.table.collection_params = {
        trashed: $scope.table.show_trashed,
        limit: 10,
        offset: ($scope.table.page - 1) * 10, 
        order: $scope.table.order,
        where: $scope.filter
    };

    //Watches and events
    $scope.$on('table.update', $scope.table.refresh);
    $scope.$watch('table.show_trashed', $scope.table.refresh);
    $scope.$watchGroup(['table.page', 'table.trashed'], $scope.table.refresh);
});
