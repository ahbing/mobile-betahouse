
function hideLoadingState(){
  let loading = document.querySelector('.loading');
  loading.style.display='none';
}

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
        hideLoadingState();
        require('./js/index.js')();
      });
    } else if (window.location.pathname === '/members.html') {
      require.ensure([], function() {
        hideLoadingState();
        require('./js/members.js')();
      });
    }
}
getLoader();
