var app = angular.module('fineance.group.factories', []);

app.factory('Group', 
	function(API) {
		var collection_options = {
			name: 'Group',
			url: '/api/group/:id'
		};
	
		return API.collection(collection_options);
	}
);

app.factory('GroupCategory', 
	function(API) {
		var collection_options = {
			name: 'GroupCategory',
			url: '/api/group/:group_id/category/:id',
			params: {
				group_id: '@group_id', 
				id:'@id'
			}
		};
	
		return API.collection(collection_options);
	}
);

