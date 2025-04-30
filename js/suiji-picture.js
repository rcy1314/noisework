
  var backgroundUrls = [
    'assets/suijpic/191437o3371I8.webp',
    'assets/suijpic/2308hbVHt.webp',
    'assets/suijpic/184324ohb.webp',
    'assets/suijpic/113422owH.webp',
    'assets/suijpic/004Cwsr1.webp',
    'assets/suijpic/023vgGAy.webp',
    'assets/suijpic/004uMVZ9.webp',
    'assets/suijpic/5557j.4leby4kmx5a0.webp',
    'assets/suijpic/Dungeon.86tfxtuodsw.webp',
    'assets/suijpic/09.45yi39hb3xo0.webp',
    'assets/suijpic/3432.1wdm7a7jplb4.webp',
    'assets/suijpic/asfa.yls71bi1eog.webp',
    'assets/suijpic/ffass.omhkiqmx0ww.webp',
    'assets/suijpic/fasfasf.1qt1n1e9q8yo.webp',
    // 这里随机背景壁纸-添加更多图片URL.
];
var foregroundUrls = [
    'assets/suijpic/023.5se6p3kcd840.webp',
    'assets/suijpic/人物5.34tnn2jnn1q0.webp',
    'assets/suijpic/004.47zk9hg17zg0.webp',
    'assets/suijpic/人物4.6u794zv9r5w0.webp',
    'assets/suijpic/人物11.7ldvybjc00s0.webp',
    'assets/suijpic/人物41.1maz1wruetnk.webp',
    'assets/suijpic/人物17.3v6jydd7z4i0.webp',
    'assets/suijpic/人物1.3idck6fcxqo0.webp',
    'assets/suijpic/人物28.32bk8ikwy4a0.webp',
    'assets/suijpic/人物22.6vhc266zg900.webp',
    'assets/suijpic/人物25.5j6k4o4lqa40.webp',
    'assets/suijpic/213d.51b3hpotx9s0.webp',
    'assets/suijpic/028.5teioy5ve2c0.webp',
    'assets/suijpic/人物45.4x3k6s924ns0.webp',
    'assets/suijpic/人物24.1rx0saszu6cg.webp',
    'assets/suijpic/人物48.67uswm33xes0.webp',
    'assets/suijpic/人物49.5elqamd33io0.webp',
    'assets/suijpic/人物50.567n54xp81s0.webp',
    'assets/suijpic/人物34.s8gkq0h3dls.webp',
    'assets/suijpic/029.71q4mgfwdo00.webp',
    'assets/suijpic/011.3eqe3vsal0m0.webp',
    'assets/suijpic/021.4uqonnvv0xw0.webp',
    'assets/suijpic/xiaohuangren.60nxvrux8c80.webp',
    'assets/suijpic/007.4ra12856l3q0.webp',
    'assets/suijpic/006.5fr6malj99o0.webp',
    'assets/suijpic/0052.4nzyymaa8za0.webp',
    'assets/suijpic/003.70upv2n3s9w0.webp',
    'assets/suijpic/001.3jr66nchfja0.webp',
    'assets/suijpic/025.4kt2ai85mx60.webp',
    'assets/suijpic/026.3v8fb37c3i40.webp',
    'assets/suijpic/022.6i76zb73k240.webp',
    'assets/suijpic/001.webp',
    'assets/suijpic/002.webp',
    'assets/suijpic/0003.webp',
    'assets/suijpic/0004.webp',
    'assets/suijpic/0005.webp',
    'assets/suijpic/0006.webp',
    'assets/suijpic/0007.webp',
    'assets/suijpic/0008.webp',
    'assets/suijpic/0010.webp',
    'assets/suijpic/0011.webp',
    'assets/suijpic/人物51.567n54xp81s0.webp',
    'assets/suijpic/人物52.567n54xp81s0.webp',
    // 这里添加随机前景人物图-添加更多图片URL.
];

var shownBackgrounds = [];
var shownForegrounds = [];

function changeBackground() {
    var randomBackgroundIndex = getRandomIndex(backgroundUrls, shownBackgrounds);
    var randomForegroundIndex = getRandomIndex(foregroundUrls, shownForegrounds);

    var backgroundElement = document.getElementById('background');
    var foregroundElement = document.getElementById('bg');

    preloadAndChangeImage(
        'background',
        backgroundUrls[randomBackgroundIndex],
        shownBackgrounds
      );
      preloadAndChangeImage(
        'bg',
        foregroundUrls[randomForegroundIndex],
        shownForegrounds
      );
    
      rotateSVG();
    }

function getRandomIndex(imageUrls, shownImages) {
    var availableImages = imageUrls.filter(function(url) {
        return shownImages.indexOf(url) === -1;
    });

    if (availableImages.length === 0) {
        // 如果所有图片都显示过，重置已显示的图片数组
        shownImages.length = 0;
        availableImages = imageUrls;
    }

    var randomIndex = Math.floor(Math.random() * availableImages.length);
    return imageUrls.indexOf(availableImages[randomIndex]);
}

function rotateSVG() {
    var svgElement = document.querySelector('.bt i');
    svgElement.style.transition = 'transform 0.5s ease-in-out';
    svgElement.style.transform = 'rotate(360deg)';
    // 重置旋转，以便下次点击时再次旋转
    setTimeout(function() {
        svgElement.style.transform = 'rotate(0deg)';
    }, 500);
}

function preloadAndChangeImage(elementId, imageUrl, shownImages) {
    var img = new Image();
    var element = document.getElementById(elementId);
  
    // 显示加载动画
    element.classList.add('loading');
  
    img.onload = function() {
      // 当图片加载完成后，切换图片并移除加载动画
      element.style.backgroundImage = 'url(' + imageUrl + ')';
      element.classList.remove('loading');
      shownImages.push(imageUrl);
    };
  
    img.src = imageUrl; // 开始加载图片
  }
  
  // 初始化背景和前景图
  changeBackground();
