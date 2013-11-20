micasaApp.factory('listingsService', function ($http, $log) {
	return { 
		getListings: function (criteria, callback) {
			$http({method: 'GET', url:'http://127.0.0.1:3000/list?start=0&query=' + criteria.keyword + '&min=1000&max=3000'}).
				success(function(data, status, headers, config) {
					callback(data);
				}).
				error(function(data, status, headers, config) {
					$log.warn(data, status, headers, config);
				});
		},
		getListing: function (id, callback) {
			$http({method: 'GET', url:'http://127.0.0.1:3000/list/' + id}).
				success(function(data, status, headers, config) {
					callback(data);
				}).
				error(function(data, status, headers, config) {
					$log.warn(data, status, headers, config);
				});
		}
	};
});
