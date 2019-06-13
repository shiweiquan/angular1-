(function (angular) {
  'use strict';

  angular.module('moviecat.coming_soon', ['ngRoute','moviecat.services.http'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/coming_soon/:page', {
      templateUrl: 'coming_soon/temp.html',
      controller:'ComingSoonController'
    });
  }])

    .controller('ComingSoonController', ['$scope', '$routeParams','$route','HttpSevice', function ($scope, $routeParams,$route,HttpSevice) {
    // 控制器 分两步: 1. 设计暴露数据  2. 设计暴露的行为
      var count = 2;// 每一页的条数
      var page = parseInt($routeParams.page);
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

      


    // $scope.data = nowplaying;
    // console.log( $scope.data)
      // $http.get('/app/data.json').then(function (res) {
      //   // 此处代码是异步请求完成过后才执行(需要等待一段时间)
      //   if (res.status === 200) {
      //     $scope.data = res.data;
      //   } else {
      //     $scope.message = '获取数据失败,错误信息: ' + res.statusText;
      //   }
        
      // }, function (err) {
      //     console.log(err);
      //     $scope.message = '获取数据失败,错误信息: ' + res.statusText;
      // });
      HttpSevice.jsonp('http://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a', {}, function (data) {
        // console.log(data)
        $scope.subjects = data.entries;
        console.log( $scope.subjects)
        $scope.title = data.title;
        $scope.totalCount =  $scope.subjects.length;
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
