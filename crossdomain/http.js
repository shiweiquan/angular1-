// 手写一个跨域请求服务

(function (window,document,undefined) {
  'use strict';
  
  var jsonp = function (url, data, callback) {
    var fnSuffix = Math.random().toString().replace('.', '');
    var cbFunName = 'my_movie_cb'+fnSuffix;
    // 1. 挂载回调函数 
    window[cbFunName] = callback;
    
    // 2. 将data转换为url字符串的形式
  // { id:1, name: 'zhangsan } ==> id=1&name=zhangsan
    var querystring = url.indexOf('?')==-1? '?' : '&';
    for (var key in data) {
      querystring += key + '=' + data[key] + '&';
      //  id = 1 &
    }
  //  querystring = ?id=1&name=zhangsan&
    
    // 3.处理url中的回调参数
    // url += callback = sshdksjgsld
    querystring += 'callback=' + cbFunName;
    // querystring = ?id=1&name=zhangsan&cb=my_json_cb_01454121564

    // 4.创建一个script标签
    var scriptElment = document.createElement('script');
    scriptElment.src = url + querystring;
    // 注意: 此时还不能将其appendChild到页面上
    

    // 5. 将script标签放到页面中
    document.body.appendChild(scriptElment);
  };

  window.$jsonp = jsonp;

})(window,document,undefined);