const currentTimeElement = document.getElementById('current-time');

function updateCurrentTime() {
  const currentTime = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedTime = currentTime.toLocaleString('en-US', options);
  currentTimeElement.textContent = formattedTime;
}

// 更新当前时间
updateCurrentTime();
// 每秒钟更新一次当前时间
setInterval(updateCurrentTime, 1000);
