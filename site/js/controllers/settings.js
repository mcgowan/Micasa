var settingsController = micasaApp.controller('settingsController', function settingsController($scope, $modalInstance, range) {

    $scope.range = range;
   
    $scope.ok = function () {
        $modalInstance.close($scope.range);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});