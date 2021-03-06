var micasaApp = angular.module('micasaApp', ['ui.bootstrap'])
    .value('api', 'http://127.0.0.1:3000')
.factory('listingsService', function ($http, $log, api) {
    return {
        getListings: function (start, criteria, callback) {
            $http({ method: 'GET', url: '{0}/list?start={1}&query={2}&min={3}&max={4}'.format(api, start, criteria.keyword, criteria.range.min, criteria.range.max) }).
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
}).directive('myScrolling', function() {
    return function(scope, element, attrs) {
    	$(window).scroll(function(){
            if ($(window).scrollTop() >= ($(document).height() - ($(window).height() * 2))) {
                scope.$apply(attrs.myScrolling);
            }
    	});
    };
}).directive('myLoaded', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                scope.$apply(attrs.myLoaded);
            });
        }
    };
}).directive('myFocus', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            $timeout(function () {
                element[0].focus();
            });
        }
    };
});