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
      video.addEventListener('error', function() {
        playNextVideo();
      });
      var currentVideoName = videoList[currentIndex].textContent;
      createDanmu('正在播放视频：' + currentVideoName, 2000);
      updateVideoListScroll();
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

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}

document.addEventListener('fullscreenchange', function() {
  if (document.fullscreenElement) {
    createDanmu('全屏模式已开启', 1000);
  } else {
    createDanmu('全屏模式已关闭', 1000);
  }
});

function createDanmu(text, duration) {
  var danmuItem = document.createElement('div');
  danmuItem.classList.add('danmu-item');
  danmuItem.textContent = text;
  danmuContainer.appendChild(danmuItem);

  setTimeout(function() {
    danmuItem.remove();
  }, duration);
}

// 添加滚动视频列表的代码
var videoListContainer = document.querySelector('.video-list');
var videoListHeight = videoListContainer.offsetHeight;
var videoItemHeight = videoList[0].offsetHeight;
var selectedIndex = currentIndex;

function updateVideoListScroll() {
  var scrollOffset = selectedIndex * videoItemHeight;
  var centerOffset = Math.floor(videoListContainer.offsetHeight / 2) - Math.floor(videoItemHeight / 2);
  var targetOffset = scrollOffset - centerOffset;
  videoListContainer.scrollTo({ top: targetOffset, behavior: 'smooth' });
}

function selectVideo(index) {
  selectedIndex = index;
  updateVideoListScroll();
}

videoList.forEach(function(videoItem, index) {
  videoItem.addEventListener('click', function() {
    selectVideo(index);
    playVideo(videoItem.getAttribute('onclick').match(/'(.*?)'/)[1]);
  });
});

// 监听视频播放事件，自动滑动到正在播放的视频
video.addEventListener('play', function() {
  var currentVideoSrc = video.src;
  var currentVideoIndex = Array.from(videoList).findIndex(function(li) {
    return li.getAttribute('onclick').match(/'(.*?)'/)[1] === currentVideoSrc;
  });
  selectVideo(currentVideoIndex);
});
// 自动播放下一首视频
video.addEventListener('ended', function() {
  playNextVideo();
});

// 添加上一首和下一首按钮
var previousButton = document.getElementById('previous-button');
var nextButton = document.getElementById('next-button');

previousButton.addEventListener('click', function() {
  playPreviousVideo();
});

nextButton.addEventListener('click', function() {
  playNextVideo();
});
