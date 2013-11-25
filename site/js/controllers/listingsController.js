micasaApp.controller('listingsController', function listingsController($scope, $cookies, listingsService) {

    $scope.getListings = function () {
            
        if (!$scope.data.fetching && !$scope.data.done) {

            $scope.data.fetching = true;
            
            listingsService.getListings($scope.data.start, $scope.criteria, function (data) {

                $scope.data.fetching = false;

                if (data.listings.length === 0) {
                    $scope.data.done = true;

                } else {
                    _.each(data.listings, function (listing) {
                        
                        listing.loading = true;

                        listingsService.getListing(listing.id, function (data) {
                            if (data.images.length !== 0) {
                                $scope.listings.push(listing);
                                
                                listing.url = data.url;
                                listing.images = data.images;
                                listing.currentImage = listing.images[0];
                                listing.currentImageIndex = 0;
                                
                                showPager = false;
                            }
                        });
                    });

                    $scope.data.start += 100;
                }
            });
        }
    }

    $scope.search = function () {
        $scope.save();
        $scope.data.start = 0;
        $scope.data.done = false;
        $scope.listings = [];
        $scope.getListings();
    };

    $scope.next = function () {
        $scope.getListings();
    }

    $scope.save = function () {
        localStorage["criteria"] = angular.toJson($scope.criteria);
    }

    $scope.restore = function () {
        $scope.criteria = angular.fromJson(localStorage["criteria"]);
    	
        if (!$scope.criteria) {
		    $scope.criteria = {
		        keyword: '',
		        min: 1000,
		        max: 3000,
		    };
        }
        $scope.data = {};
    }

    $scope.loaded = function (listing) {
        console.log('$scope.loaded');
        listing.loading = false;
    }   

    $scope.open = function (listing) {
        window.open(listing.url);
    }	

    $scope.hover = function (listing) {
        if (listing.images && listing.images.length > 1)
            listing.showPager = !listing.showPager;
    };

    $scope.pageLeft = function (listing) {
        if (listing.currentImageIndex === 0) listing.currentImageIndex = (listing.images.length);
        listing.currentImageIndex--;
        listing.currentImage = listing.images[listing.currentImageIndex];
    };

    $scope.pageRight = function (listing) {
        if (listing.currentImageIndex === (listing.images.length - 1)) listing.currentImageIndex = -1;
        listing.currentImageIndex++;
        listing.currentImage = listing.images[listing.currentImageIndex];
    };

    $scope.restore();
    $scope.search();

});
