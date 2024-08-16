document.addEventListener('DOMContentLoaded', function() {
    // 预加载音效
    var leftClickSound = new Audio('../assets/sound/鼠点左.mp3');
    var rightClickSound = new Audio('../assets/sound/风铃.mp3');
    var hoverSoundlogoDiv = new Audio('../assets/sound/门铃.mp3'); // logoDiv悬停音效
    var hoverSoundavatar = new Audio('../assets/sound/门铃.mp3'); // avatar悬停音效
    var hoverSoundfirst = new Audio('../assets/sound/开瓶.mp3'); // first悬停音效

    leftClickSound.preload = 'auto';
    rightClickSound.preload = 'auto';
    hoverSoundlogoDiv.preload = 'auto'; // 预加载logoDiv悬停音效
    hoverSoundavatar.preload = 'auto'; // 预加载avatar悬停音效
    hoverSoundfirst.preload = 'auto'; // 预加载first悬停音效

    // 尝试播放音频，以确保它们被加载到缓存中
    leftClickSound.load();
    rightClickSound.load();
    hoverSoundlogoDiv.load(); // 加载logoDiv悬停音效
    hoverSoundavatar.load(); // 加载avatar悬停音效
    hoverSoundfirst.load(); // 加载first悬停音效

    // 鼠标点击音效函数
    function playSound(audioObject) {
        audioObject.currentTime = 0; // 重置音频到开始
        audioObject.play();
    }

    // 监听鼠标点击事件
    document.addEventListener('mousedown', function(event) {
        if (event.button === 0) { // 左键点击
            playSound(leftClickSound); // 播放左键点击音效
        } else if (event.button === 2) { // 右键点击
            playSound(rightClickSound); // 播放右键点击音效
        }
    });

    // 获取logoDiv元素
    var logoDiv = document.getElementById('logoDiv');
    if (logoDiv) {
        // 监听鼠标悬停事件
        logoDiv.addEventListener('mouseover', function() {
            playSound(hoverSoundlogoDiv); // 播放logoDiv悬停音效
        });
    } else {
        console.warn('没有找到ID为logoDiv的元素');
    }

    // 获取first元素
    var first = document.getElementById('first');
    if (first) {
        // 监听鼠标悬停事件
        first.addEventListener('mouseover', function() {
            playSound(hoverSoundfirst); // 播放first悬停音效
        });
    } else {
        console.warn('没有找到ID为first的元素');
    }

    // 获取avatar元素
    var avatar = document.getElementById('avatar');
    if (avatar) {
        // 监听鼠标悬停事件
        avatar.addEventListener('mouseover', function() {
            playSound(hoverSoundavatar); // 播放avatar悬停音效
        });
    } else {
        console.warn('没有找到ID为avatar的元素');
    }
});
