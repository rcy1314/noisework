

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

document.addEventListener('DOMContentLoaded', function () {
    var html = document.querySelector('html');
    var themeState = getCookie("themeState") || "Light";
    var Checkbox = document.getElementById('myonoffswitch');

    function changeTheme(theme) {
        html.dataset.theme = theme;
        setCookie("themeState", theme, 365);
        themeState = theme;
    }

    Checkbox.addEventListener('change', function () {
        if (themeState == "Dark") {
            changeTheme("Light");
        } else {
            changeTheme("Dark");
        }
    });

    if (themeState == "Dark") {
        Checkbox.checked = false;
    }

    changeTheme(themeState);
});

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
//手机左侧弹出
document.addEventListener('DOMContentLoaded', function() {
    var mobileNavButton = document.querySelector('.mobile-nav-button');
    var noiseLeft = document.querySelector('.noise-left');
    mobileNavButton.addEventListener('click', function() {
      if (noiseLeft.style.display === 'block') {
        noiseLeft.style.display = 'none';
      } else {
        noiseLeft.style.display = 'block';
      }
  // 切换侧边栏的显示状态
  if (noiseLeft.classList.contains('show')) {
    noiseLeft.classList.remove('show');
    mobileNavButton.style.left = '10px'; 
  } else {
    noiseLeft.classList.add('show');
    mobileNavButton.style.left = '20%'; 
 
  }
});
});
  