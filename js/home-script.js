

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

function pop(imageURL) {
    var tcMainElement = document.querySelector(".tc-img");
    if (imageURL) {
        tcMainElement.src = imageURL;
    }
    toggleClass(".tc-main", "active");
    toggleClass(".tc", "active");
}

var tc = document.getElementsByClassName('tc');
var tc_main = document.getElementsByClassName('tc-main');
tc[0].addEventListener('click', function (event) {
    pop();
});
tc_main[0].addEventListener('click', function (event) {
    event.stopPropagation();
});

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function () {

    var html = document.querySelector('html');
    var themeState = getCookie("themeState") || "Light";
    var tanChiShe = document.getElementById("tanChiShe");

    function changeTheme(theme) {
        tanChiShe.src = "../assets/svg/snake-" + theme + ".svg";
        html.dataset.theme = theme;
        setCookie("themeState", theme, 365);
        themeState = theme;
    }


    var Checkbox = document.getElementById('myonoffswitch')
    Checkbox.addEventListener('change', function () {
        if (themeState == "Dark") {
            changeTheme("Light");
        } else if (themeState == "Light") {
            changeTheme("Dark");
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

// 添加事件监听器
projectItemRightimg.addEventListener('mousedown', handleMouseDown);
projectItemRightimg.addEventListener('touchstart', handleTouchStart);
projectItemRightimg.addEventListener('touchmove', handleTouchMove);

// 开始自动滑动
startAutoScroll();
