(function (angular) {
  'use strict';

  angular.module('moviecat.MovieList', ['ngRoute','moviecat.services.http'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/:category/:page', {
      templateUrl: 'in_theaters/temp.html',
      controller:'MovieListController'
    });
  }])

    .controller('MovieListController', ['$scope', '$routeParams','$route','HttpSevice', function ($scope, $routeParams,$route,HttpSevice) {
    // 控制器 分两步: 1. 设计暴露数据  2. 设计暴露的行为
      var count = 10;// 每一页的条数
      var page = parseInt($routeParams.page);
      var category = $routeParams.category;
      var start = (page - 1) * count;
      $scope.subjects = [];
      $scope.title = '';
      $scope.count = count;
      $scope.message = '';
      $scope.lodding = true;// 开始加载
      $scope.totalCount = 0;
      $scope.totalPages = 0;
      $scope.currentPage = page;
      $scope.startPage = start;

      


    
      HttpSevice.jsonp('http://api.douban.com/v2/movie/'+ category+ '?apikey=0df993c66c0c636e29ecbb5344252a4a', {count:100,start:0}, function (data) {
        // console.log(data)
        $scope.subjects = data.subjects;
        $scope.title = data.title;
        $scope.totalCount = data.subjects.length;
        $scope.totalPages = Math.ceil($scope.totalCount / count);
        $scope.lodding = false;
        // $apply 的作用就是让指定的表达式重新同步
        $scope.$apply('subjects');
      })

      // 暴露行为

      $scope.go = function (page) {
        if (page >= 1 && page <= $scope.totalPages) {
          $route.updateParams({page:page})
        }
      }
      
}]);
})(angular);
