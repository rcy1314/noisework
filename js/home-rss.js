// 目前已修改为私有的rss2json的api key进行监测更新，除本站外这个key无法加入到其它域名，请修改为自己的key，默认每1小时更新限制
// 要使用完全免费的rss2json的api调用获取代码请查看https://www.noiseblogs.top/posts/fcbd92b4或访问https://noisevip.cn/17001.html
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

      if (data.items && data.items.length > 0) {
        var item = data.items[currentRssItemIndex];
        var pubDate = new Date(item.pubDate);
        var formattedDate = pubDate.toLocaleDateString();

        var imgRegex = /<img[^>]+src="([^">]+)"/g;
        var match;
        var thumbnails = [];
        while ((match = imgRegex.exec(item.content)) !== null) {
          thumbnails.push(match[1]);
          if (thumbnails.length === 3) break;
        }

        var thumbnailUrl = thumbnails.length > 0 ? thumbnails[0] : '';

        var rssLink = document.createElement('div');
        rssLink.classList.add('rss-link');
        rssLink.innerHTML = `
          <a href="${item.link}" target="_blank">
            ${item.title} - ${formattedDate}
            ${thumbnailUrl ? `<img src="${thumbnailUrl}" alt="缩略图" width="50" height="50">` : ''}
          </a>
        `;

        rssItem.appendChild(rssLink);

        // 递增当前项目索引
        currentRssItemIndex = (currentRssItemIndex + 1) % data.items.length;
        if (currentRssItemIndex === 0) {
          currentRssIndex = (currentRssIndex + 1) % rssSources.length;
        }
      } else {
        showError();
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      showError();
    });
}

function showError() {
  rssItem.innerHTML = '<p>错误！请检查您的RSS源或Api-key配置是否正确！</p>';
}

// 初始加载时显示第一个RSS项
fetchRssItems(rssSources[currentRssIndex]);

// 每隔8秒变换一次信息
setInterval(function() {
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
      })
      .catch(error => {
        console.error('Update check error:', error);
      });
  });
}, 3600000); // 每隔1小时检查一次RSS源是否有更新

// 点击关闭按钮后隐藏容器
var closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', function() {
  rssContainer.style.display = 'none';
});
