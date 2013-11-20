var micasaApp = angular.module('micasaApp', [])
    .value('api', 'http://127.0.0.1:3000')
.factory('listingsService', function ($http, $log, api) {
    return {
        getListings: function (criteria, callback) {
            $http({ method: 'GET', url: '{0}/list?start={1}&query={2}&min={3}&max={4}'.format(api, criteria.start, criteria.keyword, criteria.min, criteria.max) }).
				success(function (data, status, headers, config) {
				    callback(data);
				}).
				error(function (data, status, headers, config) {
				    $log.warn(data, status, headers, config);
				});
        },
        getListing: function (id, callback) {
            $http({ method: 'GET', url: '{0}/list/{1}'.format(api, id) }).
				success(function (data, status, headers, config) {
				    callback(data);
				}).
				error(function (data, status, headers, config) {
				    $log.warn(data, status, headers, config);
				});
        }
    };
});
