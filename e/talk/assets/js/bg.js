// 随机数组生成函数
function getRandomBackgroundImage(isMobile) {
    const desktopImages = [
        '../img/bgx/bg1.webp',
        '../img/bgx/bg2.webp',
        '../img/bgx/bg3.webp',
        '../img/bgx/bg4.webp',
        '../img/bgx/bg5.webp',
        '../img/bgx/bg6.webp',
        '../img/bgx/bg7.webp',
        '../img/bgx/bg8.webp'
    ];

    const mobileImages = [
        '../../../../assets/mobilebg/bg1.png',
        '../../../../assets/mobilebg/bg2.png',
        '../../../../assets/mobilebg/bg3.png',
        '../../../../assets/mobilebg/bg4.png',
        '../../../../assets/mobilebg/bg5.png',
        '../../../../assets/mobilebg/bg6.png',
        '../../../../assets/mobilebg/bg7.png',
        '../../../../assets/mobilebg/bg8.png',
        '../../../../assets/mobilebg/bg9.png',
        '../../../../assets/mobilebg/bg10.png'
    ];

    const images = isMobile ? mobileImages : desktopImages;
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

// 检测窗口大小
function isMobileViewport() {
    return window.innerWidth <= 800; // 800px 及以下为手机视口
}

// 设置背景图
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = isMobileViewport();
    const randomImage = getRandomBackgroundImage(isMobile);
    document.body.style.setProperty('--bg-image', `url('${randomImage}')`);
});

// 监听窗口大小变化
window.addEventListener('resize', () => {
    const isMobile = isMobileViewport();
    const randomImage = getRandomBackgroundImage(isMobile);
    document.body.style.setProperty('--bg-image', `url('${randomImage}')`);
});
