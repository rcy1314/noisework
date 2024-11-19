// 随机数组生成函数
function getRandomBackgroundImage() {
    const images = [
        '../img/bgx/bg1.webp',
        '../img/bgx/bg2.webp',
        '../img/bgx/bg3.webp',
        '../img/bgx/bg4.webp',
        '../img/bgx/bg5.webp',
        '../img/bgx/bg6.webp',
        '../img/bgx/bg7.webp',
        '../img/bgx/bg8.webp'
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

// 设置背景图
document.addEventListener('DOMContentLoaded', () => {
    const randomImage = getRandomBackgroundImage();
    document.body.style.setProperty('--bg-image', `url('${randomImage}')`);
});
