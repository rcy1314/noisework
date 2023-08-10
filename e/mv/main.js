window.addEventListener('DOMContentLoaded', function() {
  playVideo(videoList[currentIndex].getAttribute('onclick').match(/'(.*?)'/)[1]);
});

var video = document.getElementById('video');
var videoList = document.querySelectorAll('.video-list li');
var currentIndex = 0;
var autoRandomPlay = false;
var danmuContainer = document.createElement('div');
danmuContainer.classList.add('danmu-container');
document.body.appendChild(danmuContainer);

function playVideo(src) {
  if (video.canPlayType) {
    var canPlay = video.canPlayType('video/mp4');
    if (canPlay === 'maybe' || canPlay === 'probably') {
      video.src = src;
      video.play();
      currentIndex = Array.from(videoList).findIndex(function(li) {
        return li.getAttribute('onclick').match(/'(.*?)'/)[1] === src;
      });
      video.addEventListener('ended', function() {
        playNextVideo();
      });
    } else {
      console.log('该浏览器不支持播放该视频格式');
      playNextVideo();
    }
  } else {
    console.log('该浏览器不支持HTML5视频播放');
    playNextVideo();
  }
}

function togglePlayPause() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function toggleAutoRandomPlay() {
  autoRandomPlay = !autoRandomPlay;
  if (autoRandomPlay) {
    playRandomVideo();
  }
}

function playRandomVideo() {
  var randomIndex = Math.floor(Math.random() * videoList.length);
  playVideo(videoList[randomIndex].getAttribute('onclick').match(/'(.*?)'/)[1]);
}

function playPreviousVideo() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = videoList.length - 1;
  }
  playVideo(videoList[currentIndex].getAttribute('onclick').match(/'(.*?)'/)[1]);
}

function playNextVideo() {
  currentIndex++;
  if (currentIndex >= videoList.length) {
    currentIndex = 0;
  }
  playVideo(videoList[currentIndex].getAttribute('onclick').match(/'(.*?)'/)[1]);
}

document.addEventListener('DOMContentLoaded', function() {
  playVideo(videoList[currentIndex].getAttribute('onclick').match(/'(.*?)'/)[1]);
});

function toggleDarkMode() {
  var body = document.body;
  body.classList.toggle('dark-mode');
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}

document.addEventListener('fullscreenchange', function() {
  if (document.fullscreenElement) {
    createDanmu('全屏模式已开启');
  } else {
    createDanmu('全屏模式已关闭');
  }
});

function createDanmu(text) {
  var danmuItem = document.createElement('div');
  danmuItem.classList.add('danmu-item');
  danmuItem.textContent = text;
  danmuContainer.appendChild(danmuItem);

  setTimeout(function() {
    danmuItem.remove();
  }, 5000);
}
