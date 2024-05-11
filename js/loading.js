window.addEventListener('DOMContentLoaded', function() {
  var spinnerContainer = document.getElementById('spinner-container');

  // 设置一个定时器，在3秒后隐藏加载指示器
  setTimeout(function() {
    spinnerContainer.style.display = 'none';
  }, 3000); // 3000毫秒即3秒
});