micasaApp.controller('listingsController', function listingsController($scope, listingsService) {
	
	$scope.criteria = {
		keyword: '',
		min: 1000,
		max: 3000,
		start: 0
	};

	listingsService.getListings($scope.criteria, function(data){
		$scope.listings = data.listings;
		_.each($scope.listings, function(listing){
			listingsService.getListing(listing.id, function(data){
				showPager = false;
				listing.url = data.url;
				listing.images = data.images;
				listing.currentImage = listing.images[0];
				listing.currentImageIndex = 0;
			});
		});
	});

	$scope.open = function(listing) {
		window.open(listing.url);
	}

	$scope.hover = function(listing) {
	    if (listing.images.length > 1)
		    listing.showPager = ! listing.showPager;
	};	

	$scope.pageLeft = function(listing) {
		if (listing.currentImageIndex !== 0) {
			listing.currentImageIndex--;
			listing.currentImage = listing.images[listing.currentImageIndex];
		}
	};	

	$scope.pageRight = function(listing) {
		if (listing.currentImageIndex !== (listing.images.length - 1)) {
			listing.currentImageIndex++;
			listing.currentImage = listing.images[listing.currentImageIndex];
		}
	};	

	$scope.search = function() {
		//alert($scope.keyword);

		$scope.listings = [];
	};

});
