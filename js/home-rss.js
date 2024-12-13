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
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
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

        var thumbnailUrl = thumbnails.find(url => url) || '';

        var rssLink = document.createElement('div');
        rssLink.classList.add('rss-link');
        rssLink.innerHTML = `
          <a href="${item.link}" target="_blank">
            ${item.title} - ${formattedDate}
            <span class="thumbnail-container" style="display: none;"></span>
          </a>
        `;

        var thumbnailContainer = rssLink.querySelector('.thumbnail-container');

        if (thumbnailUrl) {
          var img = new Image();
          img.src = thumbnailUrl;
          img.alt = "缩略图";
          img.width = 50;
          img.height = 50;

          img.onload = function() {
            thumbnailContainer.appendChild(img);
            thumbnailContainer.style.display = 'block'; // 仅在图片加载成功后显示
          };

          img.onerror = function() {
            console.error('Image could not be loaded:', thumbnailUrl);
            thumbnailContainer.style.display = 'none'; // 图片加载失败时隐藏
          };
        }

        rssItem.appendChild(rssLink);

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

// 点击关闭按钮后隐藏容器
var closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', function() {
  rssContainer.style.display = 'none';
});

// 每隔8秒变换一次信息
setInterval(function() {
  fetchRssItems(rssSources[currentRssIndex]);
  currentRssItemIndex = (currentRssItemIndex + 1) % 3; // 假设每条RSS最多3个项目
  if (currentRssItemIndex === 0) {
    currentRssIndex = (currentRssIndex + 1) % rssSources.length;
  }
}, 8000);

// 定时检查RSS源是否有更新
setInterval(function() {
  rssSources.forEach(source => {
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source)}&api_key=${apiKey}`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        var latestItem = data.items[0];
        var pubDate = new Date(latestItem.pubDate);
        if (!lastUpdateTimes[source] || pubDate > lastUpdateTimes[source]) {
          fetchRssItems(source);
          lastUpdateTimes[source] = pubDate;
        }
      })
      .catch(error => {
        console.error('Update check error:', error);
      });
  });
}, 3600000);
