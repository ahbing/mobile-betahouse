/*
开发时的入口文件
 */
// import './main.scss';   // sass 文件入口
// import './js/init.js';     //屏幕初始化

// import loaderIndex from './js/index.js';    // 首页js
// import loaderMem from './js/members.js';  // 成员js
function getLoader() {
    let pathname = window.location.pathname;
    let url = location.href;
		let mDomain = 'm.betahouse.us';
    if ( (url.indexOf(mDomain) != -1) && ! navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i) ) {
        var newUrl = url.replace('http://m', 'http://www');
        location.href = newUrl;
    }
    if (window.location.pathname === '/'||window.location.pathname === '/index.html') {
      require.ensure([], function() {
        require('./js/index.js')();
      });
    } else if (window.location.pathname === '/members.html') {
      require.ensure([], function() {
        require('./js/members.js')();
      });
    }
}
getLoader();
