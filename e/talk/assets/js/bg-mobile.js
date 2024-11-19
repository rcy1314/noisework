// 随机数组生成函数
function getRandomMobileBackgroundImage() {
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
    const randomIndex = Math.floor(Math.random() * mobileImages.length);
    return mobileImages[randomIndex];
}

// 设置背景图
document.addEventListener('DOMContentLoaded', () => {
    const randomImage = getRandomMobileBackgroundImage();
    document.body.style.setProperty('--mobile-image', `url('${randomImage}')`);
});


