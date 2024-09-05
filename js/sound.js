document.addEventListener('DOMContentLoaded', function() {
    // 预加载音效
    var leftClickSound = new Audio('../assets/sound/鼠点左2.mp3'); // 鼠标左
    var rightClickSound = new Audio('../assets/sound/风铃.mp3'); // 鼠标右
    var hoverSoundlogoDiv = new Audio('../assets/sound/门铃.mp3'); // 头像logo
    var hoverSoundavatar = new Audio('../assets/sound/门铃.mp3'); // 头像logo
    var hoverSoundfirst = new Audio('../assets/sound/开瓶.mp3'); // 首页切换风格文字
    var hoverSoundclock = new Audio('../assets/sound/叮.mp3'); // 时钟
    var hoverSounddescriptiontext1 = new Audio('../assets/sound/开瓶.mp3'); // home切换模式文字
    var hoverSounddescriptiontext3 = new Audio('../assets/sound/滴滴.mp3'); // home运行文字
    var hoverSoundcheck1 = new Audio('../assets/sound/开瓶.mp3'); // 首页右侧切换模式文字
    var hoverSoundtypingText = new Audio('../assets/sound/打字.mp3'); // home页打字机文字

    leftClickSound.preload = 'auto';
    rightClickSound.preload = 'auto';
    hoverSoundlogoDiv.preload = 'auto'; 
    hoverSoundavatar.preload = 'auto'; 
    hoverSoundfirst.preload = 'auto'; 
    hoverSoundclock.preload = 'auto'; 
    hoverSounddescriptiontext1.preload = 'auto'; 
    hoverSounddescriptiontext3.preload = 'auto'; 
    hoverSoundcheck1.preload = 'auto'; 
    hoverSoundtypingText.preload = 'auto'; 

    // 尝试播放音频，以确保它们被加载到缓存中
    leftClickSound.load();
    rightClickSound.load();
    hoverSoundlogoDiv.load(); 
    hoverSoundavatar.load(); 
    hoverSoundfirst.load(); 
    hoverSoundclock.load(); 
    hoverSounddescriptiontext1.load(); 
    hoverSounddescriptiontext3.load(); 
    hoverSoundcheck1.load(); 
    hoverSoundtypingText.load(); 

    // 鼠标点击音效函数
    function playSound(audioObject) {
        audioObject.currentTime = 0; // 重置音频到开始
        audioObject.play();
    }

    // 检测设备类型
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // 监听鼠标点击事件
    document.addEventListener('mousedown', function(event) {
        if (!isMobileDevice()) { // 如果不是移动设备
            if (event.button === 0) { // 左键点击
                playSound(leftClickSound); 
            } else if (event.button === 2) { 
                playSound(rightClickSound); // 播放右键点击音效
            }
        }
    });

    // 获取logoDiv元素
    var logoDiv = document.getElementById('logoDiv');
    if (logoDiv) {
        // 监听鼠标悬停事件
        logoDiv.addEventListener('mouseenter', function() {
            playSound(hoverSoundlogoDiv); // 播放logoDiv悬停音效
        });
    } else {
        console.warn('没有找到ID为logoDiv的元素');
    }

    // 获取first元素
    var first = document.getElementById('first');
    if (first) {
        // 监听鼠标悬停事件
        first.addEventListener('mouseenter', function() {
            playSound(hoverSoundfirst); // 播放first悬停音效
        });
    } else {
        console.warn('没有找到ID为first的元素');
    }

    // 获取avatar元素
    var avatar = document.getElementById('avatar');
    if (avatar) {
        // 监听鼠标悬停事件
        avatar.addEventListener('mouseenter', function() {
            playSound(hoverSoundavatar); // 播放avatar悬停音效
        });
    } else {
        console.warn('没有找到ID为avatar的元素');
    }

    // 获取logoDiv元素
    var clock = document.getElementById('clock');
    if (clock) {
        // 监听鼠标悬停事件
        clock.addEventListener('mouseenter', function() {
            playSound(hoverSoundclock); // 播放clock悬停音效
        });
    } else {
        console.warn('没有找到ID为clock的元素');
    }

    // 获取descriptiontext1元素
    var descriptiontext1 = document.getElementById('descriptiontext1');
    if (descriptiontext1) {
        // 监听鼠标悬停事件
        descriptiontext1.addEventListener('mouseenter', function() {
            playSound(hoverSounddescriptiontext1); // 播放descriptiontext1悬停音效
        });
    } else {
        console.warn('没有找到ID为descriptiontext1的元素');
    }

    // 获取descriptiontext3元素
    var descriptiontext3 = document.getElementById('descriptiontext3');
    if (descriptiontext3) {
        // 监听鼠标悬停事件
        descriptiontext3.addEventListener('mouseenter', function() {
            playSound(hoverSounddescriptiontext3); // 播放descriptiontext3悬停音效
        });
    } else {
        console.warn('没有找到ID为descriptiontext3的元素');
    }

    // 获取check1元素
    var check1 = document.getElementById('check1');
    if (check1) {
        // 监听鼠标悬停事件
        check1.addEventListener('mouseenter', function() {
            playSound(hoverSoundcheck1); // 播放check1悬停音效
        });
    } else {
        console.warn('没有找到ID为check1的元素');
    }

    // 获取typingText元素
    var typingText = document.getElementById('typingText');
    if (typingText) {
        // 监听鼠标悬停事件
        typingText.addEventListener('mouseenter', function() {
            playSound(hoverSoundtypingText); // 播放typingText悬停音效
        });
    } else {
        console.warn('没有找到ID为typingText的元素');
    }

// 元素音效
// 网址过渡音
var websiteHoverSound = new Audio('https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/%E4%BC%A0%E9%80%817.mp3');
websiteHoverSound.preload = 'auto';

// 广告位音
var adHoverSound = new Audio('../assets/sound/滴滴.mp3');
adHoverSound.preload = 'auto';

function playSound(audioObject) {
    // 重置音频到开始并播放
    audioObject.currentTime = 0;
    audioObject.play();
}

// 为每个选择器添加音效
function addSoundToElements(selectors, sound) {
    selectors.forEach(function(selector) {
        document.querySelectorAll(selector).forEach(function(element) {
            element.addEventListener('mouseenter', function() {
                // 只有在音频暂停或结束时才播放
                if (sound.paused || sound.ended) {
                    playSound(sound);
                }
            });
        });
    });
}

// 网址过渡音数组
var elementsSelectors = ['.iconItem', '.item', '.projectItem','.project','.switchbg','.mobileswitchbg','.friendlinks-card','.bilibilititle-left','.bilibilititle-right','.menu-item','.menu-list li'];
addSoundToElements(elementsSelectors, websiteHoverSound);

// 广告位元素选择器数组
var adElementsSelectors = ['.ad-container','.friendname','.rss-container'];
addSoundToElements(adElementsSelectors, adHoverSound);

// home配置文档文字音
var hoverSoundescriptiontext2 = new Audio('../assets/sound/滴滴.mp3'); // 请替换为您的音效文件路径
hoverSoundescriptiontext2.preload = 'auto';
var escriptiontext2 = document.getElementById('descriptiontext2');
if (escriptiontext2) {
    escriptiontext2.addEventListener('mouseenter', function() {
        playSound(hoverSoundescriptiontext2); 
    });
} else {
    console.warn('没有找到ID为descriptiontext2的元素');
}

// 配置音乐菜单选择音效
var hoverSoundPath = '../assets/sound/缓慢1.mp3';
var hoverSound = new Audio(hoverSoundPath);

// 选择所有li元素并添加mouseover事件监听器
document.querySelectorAll('.aplayer-list ol li').forEach(function(li) {
    li.addEventListener('mouseover', function() {
        // 当鼠标悬停时播放音效
        hoverSound.play();
    });
});

// 防止音频自动播放时出现用户交互问题
hoverSound.addEventListener('ended', function() {
    hoverSound.currentTime = 0; // 重置音频播放位置
});


// 浮动文字
var floatingTextSoundPath = '../assets/sound/jump.mp3';

// 创建floating-text元素的音效对象
var floatingTextHoverSound = new Audio(floatingTextSoundPath);
floatingTextHoverSound.preload = 'auto';

// 创建播放音效的函数
function playSound(audioObject) {
    // 重置音频到开始并播放
    audioObject.currentTime = 0;
    audioObject.play();
}

// 为指定选择器的元素添加音效
function addSoundToElements(selectors, sound) {
    selectors.forEach(function(selector) {
        document.querySelectorAll(selector).forEach(function(element) {
            element.addEventListener('mouseenter', function() {
                // 只有在音频暂停或结束时才播放
                if (sound.paused || sound.ended) {
                    playSound(sound);
                }
            });
        });
    });
}

// 要为floating-text类元素添加音效的选择器
var floatingTextSelectors = ['.floating-text'];
addSoundToElements(floatingTextSelectors, floatingTextHoverSound);

// 页面加载音效
soundFiles = [
    '../assets/sound/载入1.mp3',
    '../assets/sound/载入2.mp3',
    '../assets/sound/载入3.mp3',
    '../assets/sound/载入4.mp3',
    '../assets/sound/载入5.mp3',
    '../assets/sound/载入6.mp3',
    '../assets/sound/载入7.mp3',
    '../assets/sound/载入8.mp3',
    '../assets/sound/载入9.mp3',
    // 添加更多音效路径...
];

// 随机排列数组并返回
function shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // 当还剩有元素待洗牌时继续
    while (currentIndex !== 0) {
        // 取一个待洗牌的元素
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // 与当前元素进行交换
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// 页面加载音效
function playLoadSound() {
    // 随机排列音效数组
    var shuffledSoundFiles = shuffleArray(soundFiles.slice());
    // 选择第一个音效
    var randomSoundFile = shuffledSoundFiles[0];
    var pageLoadSound = new Audio(randomSoundFile);
    pageLoadSound.preload = 'auto';

    pageLoadSound.currentTime = 0; // 重置音频到开始
    pageLoadSound.play().then(function() {
        console.log('音效开始播放');
        // 设置已播放标记
        localStorage.setItem('hasPlayed', 'true');
    }).catch(function(error) {
        console.error('播放失败，可能被浏览器阻止', error);
        // 如果播放失败，尝试在用户交互后播放
        document.body.addEventListener('click', function() {
            playLoadSound();
            // 移除事件监听，避免重复播放
            document.body.removeEventListener('click', arguments.callee);
        });
    });
}

// 当页面加载完成时尝试播放音效
window.addEventListener('load', function() {
    // 清除已播放标记，确保每次刷新都能播放
    localStorage.removeItem('hasPlayed');
    // 尝试播放音效
    playLoadSound();
});



    });



