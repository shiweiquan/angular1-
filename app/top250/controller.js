(function (angular) {
    'use strict';

  angular.module('moviecat.top250', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/toop250', {
      templateUrl: 'top250/temp.html',
      controller: 'Top250Controller'
    });
  }])

  .controller('Top250Controller', ['$scope,$http',function($scope) {

  }]);
})(angular);