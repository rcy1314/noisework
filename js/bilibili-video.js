// bilibili-video.js

const videoList = [
  'https://www.bilibili.com/video/BV1LL411J7EY/',
  'https://www.bilibili.com/video/BV1TpW3ecE9h/',
  'https://www.bilibili.com/video/BV148sge8E8T/',
  'https://www.bilibili.com/video/BV1V5411m77u/',
  'https://www.bilibili.com/video/BV1uT42197DW/',
  'https://www.bilibili.com/video/BV1ey4y1t7cy/',
  'https://www.bilibili.com/video/BV1764y1D7fD/',
  'https://www.bilibili.com/video/BV1VK411u7vy/',
  'https://www.bilibili.com/video/BV19V411n7L3/',
  'https://www.bilibili.com/video/BV1K4411d7mf/',
  'https://www.bilibili.com/video/BV1wx411v7Rc/',
  'https://www.bilibili.com/video/BV1iH4y1f74s/',
  'https://www.bilibili.com/video/BV12f4y1E7oj/',
  'https://www.bilibili.com/video/BV17K41167Gk/',
  'https://www.bilibili.com/video/BV13f4y1p7W1/',
  'https://www.bilibili.com/video/BV1kv4y1578w/',
  'https://www.bilibili.com/video/BV1M64y1T7CJ/',
  'https://www.bilibili.com/video/BV1eK421C76d/',
  'https://www.bilibili.com/video/BV1gV411J7Ai/',
  'https://www.bilibili.com/video/BV1FJ411C7ju/',
  'https://www.bilibili.com/video/BV1yb411A78Q/',
  'https://www.bilibili.com/video/BV19B4y1X7q1/',
  'https://www.bilibili.com/video/BV18K4y147if/',
  'https://www.bilibili.com/video/BV1g4411c7K6/',
  'https://www.bilibili.com/video/BV1mV4y1r7nk/',
  'https://www.bilibili.com/video/BV1k64y1f7mL/',
  'https://www.bilibili.com/video/BV1cLWYeLEJm/',
  'https://www.bilibili.com/video/BV1iE421F7rs/',
  'https://www.bilibili.com/video/BV1ed4y1W7Fu/',
  'https://www.bilibili.com/video/BV1wc411v7ng/',
  'https://www.bilibili.com/video/BV1bBWgecEAg/',
  'https://www.bilibili.com/video/BV1c4421f7fa/',
  'https://www.bilibili.com/video/BV11i42167hN',
  'https://www.bilibili.com/video/BV1Jr421M7aR/',
  'https://www.bilibili.com/video/BV1pRsEejEaU/',
  'https://www.bilibili.com/video/BV1b6421c73e/',
  'https://www.bilibili.com/video/BV1LF411b7SM/',
  'https://www.bilibili.com/video/BV1h2421F7HR/',
  'https://www.bilibili.com/video/BV1WUWgeWEWu/',
  'https://www.bilibili.com/video/BV1PT421Y72f/',
  'https://www.bilibili.com/video/BV1vW42197AR/',
  'https://www.bilibili.com/video/BV1b6421c73e/',
  'https://www.bilibili.com/video/BV1SG411V7Vh/',
  'https://www.bilibili.com/video/BV1yJ4m1h7Ha/',
  'https://www.bilibili.com/video/BV1ri421a71i/',
  'https://www.bilibili.com/video/BV1bp421Q7yT/',
  'https://www.bilibili.com/video/BV1294y1P7N7/',
  'https://www.bilibili.com/video/BV1gs411Y7ZF/',
  'https://www.bilibili.com/video/BV1we4y1r7ZS/',
  'https://www.bilibili.com/video/BV1KS42197tc/',
  'https://www.bilibili.com/video/BV1Ch411y75c/',
  'https://www.bilibili.com/video/BV1et41177M9/',
  'https://www.bilibili.com/video/BV1bN4y1M7bM/',
  'https://www.bilibili.com/video/BV16e4y1R7Gc/',
  // 添加更多视频链接
];

// 随机选择视频链接
function getRandomVideo() {
  const randomIndex = Math.floor(Math.random() * videoList.length);
  return videoList[randomIndex];
}

// 更新iframe的src属性
function updateVideo() {
  const videoContainer = document.getElementById('videoContainer');
  const randomVideoUrl = getRandomVideo();
  const bvid = randomVideoUrl.split('/').pop(); // 获取BV号
  const iframeSrc = `https://www.bilibili.com/blackboard/html5mobileplayer.html?bvid=${bvid}&as_wide=1&high_quality=1&danmaku=0`;
  
  videoContainer.innerHTML = `<iframe src="${iframeSrc}" scrolling="no" border="0" frameborder="no" allowfullscreen="true" style="position:absolute;height:100%;width:100%;"></iframe>`;
}

// 页面加载时更新视频
window.onload = updateVideo;

// 解析B站视频链接
function parseBilibiliLinks(content) {
  const BILIBILI_REG = /<a\shref="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))/g;
  return content.replace(BILIBILI_REG, "<div class='video-wrapper'><iframe src='https://www.bilibili.com/blackboard/html5mobileplayer.html?bvid=\$1&as_wide=1&high_quality=1&danmaku=0' scrolling='no' border='0' frameborder='no' allowfullscreen='true' style='position:absolute;height:100%;width:100%;'></iframe></div>");
}
