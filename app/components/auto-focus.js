// 自定义auto-focus指令
(function (angular) {
  'use strict';

  angular.module('moviecat.auto.focus', [])
    .directive('autoFocus', ['$location', function ($location) {
    // 
      var path = $location.path();
      return {
        restrict: 'A',// 指令类型
        link: function ($scope, iElm, iAttrs, controller) {
          var aLink = iElm.children().attr('href');
          var type = aLink.replace(/#(\/.+?)\/\d+/, '$1');
          if (path.startsWith(type)) {
            // 访问的是当前的链接
            iElm.addClass('active');
          }
          // console.log(iElm);
          // console.log(iAttrs)
          iElm.on('click', function () {
            iElm.parent().children().removeClass('active');
            iElm.addClass('active');
          })
        }
      }
  }])


})(angular);