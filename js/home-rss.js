// 目前已修改为私有的rss2json的api key进行监测更新，除本站外这个key无法加入到其它域名，请修改为自己的key，默认每1小时更新限制
// 要使用完全免费的rss2json的api调用获取代码请查看https://www.noiseblogs.top/posts/fcbd92b4或访问https://noisevip.cn/17001.html
// JavaScript代码-rss
var rssContainer = document.querySelector('.rss-container');
var rssItem = document.getElementById('rss-item');
var rssSources = [
  'https://www.noiseblogs.top/atom.xml',
  'https://noisevip.cn/feed',
  // 添加更多的RSS信息源
];
var currentRssIndex = 0;
var currentRssItemIndex = 0;
var apiKey = 'iaizwlvnlvypvn1qcjnossrguhsckfdsxlqppbur'; // 替换为你的API密钥
var lastUpdateTimes = {}; // 记录每个RSS源的最后更新时间

function fetchRssItems(url) {
  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      rssItem.innerHTML = ''; // 清空之前的RSS项
      var rssLink = document.createElement('div');
      rssLink.classList.add('rss-link');
      var item = data.items[currentRssItemIndex];
      var pubDate = new Date(item.pubDate);
      var formattedDate = pubDate.toLocaleDateString();
      rssLink.innerHTML = `<a href="${item.link}" target="_blank">${item.title} - ${formattedDate}</a>`;
      rssItem.appendChild(rssLink);
      currentRssItemIndex = (currentRssItemIndex + 1) % data.items.length;
      if (currentRssItemIndex === 0) {
        currentRssIndex = (currentRssIndex + 1) % rssSources.length;
      }
    });
}

// 获取并解析所有RSS信息源的数据
rssSources.forEach(source => {
  fetchRssItems(source);
});


// 每隔8秒变换一次信息
setInterval(function() {
  currentRssIndex = (currentRssIndex + 1) % rssSources.length;
  fetchRssItems(rssSources[currentRssIndex]);
}, 8000);

// 定时检查RSS源是否有更新
setInterval(function() {
  rssSources.forEach(source => {
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source)}&api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        var latestItem = data.items[0];
        var pubDate = new Date(latestItem.pubDate);
        if (!lastUpdateTimes[source] || pubDate > lastUpdateTimes[source]) {
          // 有新的更新，立即刷新显示最新信息
          fetchRssItems(source);
          // 更新最后更新时间
          lastUpdateTimes[source] = pubDate;
        }
      });
  });
}, 3600000); // 每隔1小时检查一次RSS源是否有更新
