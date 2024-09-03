function handlePress(event) {
    this.classList.add('pressed');
}

function handleRelease(event) {
    this.classList.remove('pressed');
}

function handleCancel(event) {
    this.classList.remove('pressed');
}

var buttons = document.querySelectorAll('.projectItem');
buttons.forEach(function (button) {
    button.addEventListener('mousedown', handlePress);
    button.addEventListener('mouseup', handleRelease);
    button.addEventListener('mouseleave', handleCancel);
    button.addEventListener('touchstart', handlePress);
    button.addEventListener('touchend', handleRelease);
    button.addEventListener('touchcancel', handleCancel);
});

function toggleClass(selector, className) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.classList.toggle(className);
    });
}

function setCookie(name, value, days) {
    var expires = days ? "; expires=" + (new Date(Date.now() + days * 24 * 60 * 60 * 1000)).toUTCString() : "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(nameEQ)) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}
const projectItemRightimg = document.querySelector('.projectItemRightimg');
const img = document.getElementById('img-1');

// 克隆第一张图片并添加到末尾以实现循环效果
const firstImg = projectItemRightimg.firstElementChild.cloneNode(true);
projectItemRightimg.appendChild(firstImg);

let startX = 0;
let scrollLeft = 0;
let autoScrollInterval = null;
const autoScrollSpeed = 0.5; // 调整自动滑动的速度，值越小滑动越慢

function handleMouseDown(e) {
    e.preventDefault();
    startX = e.pageX - projectItemRightimg.offsetLeft;
    scrollLeft = projectItemRightimg.scrollLeft;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);
    stopAutoScroll(); // 当用户开始手动滑动时，停止自动滑动
}

function handleMouseMove(e) {
    const x = e.pageX - projectItemRightimg.offsetLeft;
    const walk = (x - startX) * 3; // 滑动速度
    projectItemRightimg.scrollLeft = scrollLeft - walk;
}

function handleMouseUp() {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mouseleave', handleMouseUp);
    startAutoScroll(); // 当用户停止手动滑动时，重新开始自动滑动
}

function handleTouchStart(e) {
    startX = e.touches[0].pageX - projectItemRightimg.offsetLeft;
    scrollLeft = projectItemRightimg.scrollLeft;
    stopAutoScroll(); // 当用户开始触摸滑动时，停止自动滑动
}

function handleTouchMove(e) {
    e.preventDefault();
    const x = e.touches[0].pageX - projectItemRightimg.offsetLeft;
    const walk = (x - startX) * 3; // 滑动速度
    projectItemRightimg.scrollLeft = scrollLeft - walk;
}

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        projectItemRightimg.scrollLeft += autoScrollSpeed;
        // 检查是否滚动到了克隆的图片区域，这里减去2是位移的缓冲
        if (projectItemRightimg.scrollLeft >= projectItemRightimg.scrollWidth - projectItemRightimg.clientWidth - 2) {
            // 如果滚动到了克隆的图片，立即返回到正确的位置
            projectItemRightimg.scrollLeft = 0;
        }
    }, 16); //大约每秒60帧
}

function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

// 懒加载功能
function lazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const config = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    let observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                self.unobserve(img);
            }
        });
    }, config);

    lazyImages.forEach(image => {
        observer.observe(image);
    });
}

// 初始化懒加载
document.addEventListener('DOMContentLoaded', lazyLoad);

// 添加事件监听器
projectItemRightimg.addEventListener('mousedown', handleMouseDown);
projectItemRightimg.addEventListener('touchstart', handleTouchStart);
projectItemRightimg.addEventListener('touchmove', handleTouchMove);

// 开始自动滑动
startAutoScroll();

// 图片弹出监听
function pop(imgPath) {
    document.getElementById('popupImage').src = imgPath;
    document.getElementById('imagePopup').style.display = 'block';
    document.getElementById('imagePopup').addEventListener('click', closePopup);
}

function closePopup() {
    document.getElementById('imagePopup').style.display = 'none';
    document.getElementById('imagePopup').removeEventListener('click', closePopup);
}
// 添加一个遮罩层来监听点击事件
var mask = document.createElement('div');
mask.className = 'mask';
document.body.appendChild(mask);

mask.addEventListener('click', function() {
  noiseLeft.style.display = 'none';
  mask.remove(); // 移除遮罩层
});

// 手机左侧弹出
document.addEventListener('DOMContentLoaded', function() {
    var mobileNavButton = document.querySelector('.mobile-nav-button');
    var noiseLeft = document.querySelector('.noise-left');
    var mask = document.createElement('div');
    mask.className = 'mask';
    document.body.appendChild(mask);

    mobileNavButton.addEventListener('click', function() {
      if (noiseLeft.style.display === 'block') {
        noiseLeft.style.display = 'none';
        mask.style.display = 'none'; // 同时隐藏遮罩层
      } else {
        noiseLeft.style.display = 'block';
        mask.style.display = 'block'; // 显示遮罩层
      }
    });

    // 遮罩层上的点击事件，用于关闭侧边栏
    mask.addEventListener('click', function() {
      noiseLeft.style.display = 'none';
      mask.style.display = 'none'; // 同时隐藏遮罩层
    });
});

// 视频播放组件
var videos = [
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/f83b646a4cee41e588ca023e2a114e2f.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/bc6473e95d7f4bd1ba2f91d1cf632dfe.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/914f70446ab3414a8b2d2c75be8135a4.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/9e782b9469e04a67a64022a3cb964c83.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/fd1d5b76283f424ab83cd040f15feb3b.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/c570029d2db34069ab3009f779ccf41f.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/f722dfc4481347f1b9df0572bf8bd6a5.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/1719a2f412cb4c57a0264a4c06e72f5d.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/4cff93ffad0542af96e78f0b47a6c13b.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/77e10d9cf3884d21b443f94ce01c4bb9.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/439381abd4b14efa98960e55f6073609.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/f3fc238bd9d94a489e5a060c18733fbf.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/6845544115af4e42b919c53721688aff.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/6af08f9efc454e69b2f37e438279d7ea.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/e26f5c41a7bc4d42b6af0c7d20f22ce2.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/w0kRrJ.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/4535fe8ade84441085e5604db4f589ed.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/%E4%B8%8B%E8%BD%BD.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/20240812_164231.MP4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/20240812_164742.MP4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/ocDBeQ6Avp8zDaGjQCB9VRNnAAAf1NhlgI9EDM%20-%2001.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/osbAADGCxEASJEUiWgUcatQ0vghB4BzkzIceuf%20-%2001.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/oEWaQDEDf3fA29igEmmHAq4IlEFhB9AhLRBDWg%20-%2001.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/oIQFErG7qBmfVoneBBAekQ8cIb9HMZDC7QZEhA%20-%2001.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/oYZZiIwTMFmA0kRm6yDfBeJA9AOn1g4NbQbxsK%20-%2001.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/ocf2RDOy9AXXAvQBC.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/o8CVABWheDHtvi2rmgQ0JEsyIAjy3HzOyn3AfB%20-%2001.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/oYYsgHYNIwzJBgeDW5JfQpfaA7ywExA2Bkfoec%20-%2001.mp4",
    "https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/50b8d286b4104a78b8db00ee85296516.mp4"
];  // 视频链接数组
var currentVideoIndex = 0; // 当前视频索引

// 播放视频
function playVideo() {
    var video = document.getElementById("random-video");
    video.play();
}

// 切换播放/暂停
function togglePlay() {
    var video = document.getElementById("random-video");
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
// 获取视频元素和播放/暂停按钮
var video = document.getElementById("random-video");
var playPauseBtn = document.getElementById("play-pause-btn");

// 切换播放和暂停的函数
function togglePlay() {
    if (video.paused || video.ended) {
        video.play();
        playPauseBtn.textContent = "⏸"; // 播放时显示暂停图标
    } else {
        video.pause();
        playPauseBtn.textContent = "▶"; // 暂停时显示播放图标
    }
}
// 随机选择一个视频
function randomVideo() {
    currentVideoIndex = Math.floor(Math.random() * videos.length);
    updateVideo();
}

// 播放下一个视频
function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    updateVideo();
    playVideo();
}

// 播放上一个视频
function prevVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    updateVideo();
    playVideo();
}

// 更新视频
function updateVideo() {
    var video = document.getElementById("random-video");
    video.src = videos[currentVideoIndex];
    video.load();
}

// 监听视频错误事件，自动跳过失效视频
document.getElementById("random-video").addEventListener('error', function () {
    console.log("视频加载失败，尝试下一个视频");
    nextVideo(); // 直接调用nextVideo()来尝试下一个视频
});

// 监听视频结束事件，自动播放下一个视频
// document.getElementById("random-video").addEventListener('ended', function() {
//     nextVideo(); // 直接调用nextVideo()来播放下一个视频
// });

// 初始化，随机选择一个视频进行播放
randomVideo();
var MyVideoPlayer = MyVideoPlayer || {};
MyVideoPlayer.preloadVideos = function () {
    // 预加载当前视频
    var currentVideo = new Video();
    currentVideo.src = MyVideoPlayer.videos[MyVideoPlayer.currentVideoIndex];

    // 预加载接下来的几个视频
    var nextVideosToPreload = 3; // 预加载的视频数量
    for (var i = 1; i <= nextVideosToPreload; i++) {
        var nextVideo = new Video();
        nextVideo.src = MyVideoPlayer.videos[(MyVideoPlayer.currentVideoIndex + i) % MyVideoPlayer.videos.length];
    }
};

// 使用事件监听器来添加页面加载时的处理函数
window.addEventListener('load', function () {
    MyVideoPlayer.preloadVideos();
});

//pc头像logo
let images = ['https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo10.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo9.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo7.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo6.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo5.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo4.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo3.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo2.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo1.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo11.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo12.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo13.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo15.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo14.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo8.gif',
]; // 图片数组
let currentImageIndex = -1; // 初始化为-1，表示还没有选择图片
const logoDiv = document.getElementById('logoDiv');
const defaultImage = 'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/logo10.gif'; // 默认图片路径

function setDefaultImage() {
    logoDiv.style.backgroundImage = `url(${defaultImage})`;
}

function loadImage(index) {
    let img = new Image();
    img.onload = function () {
        logoDiv.style.backgroundImage = `url(${images[index]})`;
        currentImageIndex = index; // 更新当前图片索引
    };
    img.onerror = function () {
        // 如果图片加载失败，尝试下一张
        if (index < images.length - 1) {
            loadImage(index + 1);
        } else {
            // 如果所有图片都尝试过，则使用默认图像
            setDefaultImage();
        }
    };
    img.src = images[index];
}

// 初始化，随机选择一个图片进行加载
loadImage(Math.floor(Math.random() * images.length));

// 添加点击事件监听器
logoDiv.addEventListener('click', () => {
    // 重置当前图片索引，以便重新随机选择
    currentImageIndex = -1;
    loadImage(Math.floor(Math.random() * images.length));
});

// 使用IntersectionObserver来实现懒加载
let observer = new IntersectionObserver((entries, observer) => {
    // 检查元素是否可见
    if (entries[0].isIntersecting) {
        // 如果已经加载过图片，不再重新加载
        if (currentImageIndex === -1) {
            loadImage(Math.floor(Math.random() * images.length));
        }
    }
}, { threshold: [0] });

observer.observe(logoDiv);

// 手机页面头部logo
let mobileImages = ['https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo7.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo1.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo2.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo3.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo4.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo8.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo9.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo10.gif',
    'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo11.gif',
]; // 图片数组
let currentMobileImageIndex = -1; // 初始化为-1，表示还没有选择图片
const mobileLogoDiv = document.getElementById('mobileLogoDiv');
const defaultMobileImage = 'https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/mobileLogo7.gif'; // 默认手机图片路径

function setDefaultMobileImage() {
    mobileLogoDiv.style.backgroundImage = `url(${defaultMobileImage})`;
}

function loadMobileImage(index) {
    let img = new Image();
    img.onload = function () {
        mobileLogoDiv.style.backgroundImage = `url(${mobileImages[index]})`;
        currentMobileImageIndex = index; // 更新当前手机图片索引
    };
    img.onerror = function () {
        // 如果图片加载失败，尝试下一张
        if (index < mobileImages.length - 1) {
            loadMobileImage(index + 1);
        } else {
            // 如果所有图片都尝试过，则使用默认图像
            setDefaultMobileImage();
        }
    };
    img.src = mobileImages[index];
}
loadMobileImage(Math.floor(Math.random() * mobileImages.length));
mobileLogoDiv.addEventListener('click', () => {
    currentMobileImageIndex = -1;
    loadMobileImage(Math.floor(Math.random() * mobileImages.length));
});

// 使用IntersectionObserver来实现懒加载
let mobileObserver = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
        if (currentMobileImageIndex === -1) {
            loadMobileImage(Math.floor(Math.random() * mobileImages.length));
        }
    }
}, { threshold: [0] });
mobileObserver.observe(mobileLogoDiv);

/*scroll向下滑动*/
let container = document.querySelector('.workbox');
if (window.innerWidth >720) {
	container.addEventListener('wheel',(event) => {
	event.preventDefault();
	for (var i=0;i<100;i++){
		setTimeout(() => container.scrollLeft += event.deltaY/100,i);
}})};

// 切换背景时旋转图标的函数
function rotateIcon() {
    var icon = document.getElementById('rotateIcon');
    icon.style.transition = 'transform 0.3s ease';
    icon.style.transform += 'rotate(360deg)';
    setTimeout(function() {
        icon.style.transition = 'none';
        icon.style.transform = 'rotate(0deg)';
    }, 300);
}
// PC更换背景
function bg() {
    // 背景图片数组
    var bgImages = [
        '../assets/mobilebg/bg1.png',
        '../assets/bg/bg2.png',
        '../assets/bg/bg3.png',
        '../assets/bg/bg4.png',
        '../assets/bg/bg5.png',
        '../assets/bg/bg6.png',
        '../assets/bg/bg7.png',
        '../assets/bg/bg8.png',
        '../assets/bg/bg9.png',
        '../assets/bg/bg10.png',
        '../assets/bg/bg11.png',
        '../assets/bg/bg12.png',
        '../assets/3.png',
    ];
    var shownImages = [];
    var currentBg = getComputedStyle(document.documentElement).getPropertyValue('--main_bg_color');
    var currentBgUrl = currentBg.slice(4, -1).replace(/"/g, '');
    var currentIndex = bgImages.indexOf(currentBgUrl);
    if (currentIndex !== -1) {
        shownImages.push(currentIndex);
    }
    if (shownImages.length === bgImages.length) {
        shownImages = [];
    }
    var remainingImages = bgImages.filter((img, index) => !shownImages.includes(index));
    var randomIndex = Math.floor(Math.random() * remainingImages.length);
    var nextBg = remainingImages[randomIndex];
    document.documentElement.style.setProperty('--main_bg_color', 'url(' + nextBg + ')');
    rotateIcon();
}
window.onload = bg;
// PC背景切换结束
// 手机尺寸背景切换
var canToggleBg = true;
// 背景图片数组
const bgImages = [
    '../assets/mobilebg/bg1.png',
    '../assets/mobilebg/bg2.png',
    '../assets/mobilebg/bg3.png',
    '../assets/mobilebg/bg4.png',
    '../assets/mobilebg/bg5.png',
    '../assets/mobilebg/bg6.png',
    '../assets/mobilebg/bg7.png',
    '../assets/mobilebg/bg8.png',
    '../assets/mobilebg/bg9.png',
    '../assets/mobilebg/bg10.png'
   ];


// 设置默认背景图
document.documentElement.style.setProperty('--background-image', `url(${bgImages[0]})`);

// 预加载图片
const imageCache = {};
function preloadImages(images) {
    images.forEach(imgSrc => {
        const img = new Image();
        img.onload = () => {
            imageCache[imgSrc] = img;
        };
        img.onerror = () => {
            console.error(`无法加载图片: ${imgSrc}`);
        };
        img.src = imgSrc;
    });
}

// 从localStorage获取已显示的图片索引
let shownImages = JSON.parse(localStorage.getItem('shownImages')) || [];
let currentIndex = 0; 

// 设置随机背景图
function setRandomBackground() {
    currentIndex = Math.floor(Math.random() * bgImages.length);
    setBackgroundImage(bgImages[currentIndex]);
}

// 更新localStorage
function updateLocalStorage() {
    localStorage.setItem('shownImages', JSON.stringify(shownImages));
}

// 设置背景图片
function setBackgroundImage(imgUrl) {
    document.documentElement.style.setProperty('--background-image', `url(${imgUrl})`);
    shownImages.push(currentIndex);
    updateLocalStorageIfNecessary();
}

// 如果需要，更新localStorage
function updateLocalStorageIfNecessary() {
    if(shownImages.length === bgImages.length) {
        updateLocalStorage();
        shownImages = []; // 重置数组，避免重复
    }
}

// 切换背景【按顺序】
function toggleMobileBg() {
    if (!canToggleBg) return; 
    currentIndex = (currentIndex + 1) % bgImages.length;   
    setBackgroundImage(bgImages[currentIndex]);
    mobilerotateIcon();
}

// 旋转图标动画
function mobilerotateIcon() {
    const icon = document.getElementById('mobilerotateIcon');
    icon.style.transition = 'transform 0.3s ease';
    icon.style.transform += 'rotate(360deg)';
    setTimeout(() => {
        icon.style.transition = 'none';
        icon.style.transform = 'rotate(0deg)';
    }, 300);
}

// 页面加载时预加载图片
window.onload = () => {
    preloadImages(bgImages);
    setRandomBackground(); // 设置随机背景图
};
// 页面重定向
window.addEventListener('DOMContentLoaded', function() {
    var pathname = window.location.pathname;
    // 检查路径是否为 /home.html，如果是，则替换为 /home
    if (pathname === '/home.html') {
      var newUrl = window.location.protocol + '//' + window.location.host + '/home';
      window.history.replaceState({ path: newUrl }, '', newUrl);
    }
    else if (pathname.endsWith('/')) {
      var newUrl = pathname.replace(/\/$/, '');
      window.history.replaceState({ path: newUrl }, '', newUrl);
    }
  });
  
  