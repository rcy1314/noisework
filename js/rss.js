    // JavaScript代码-rss
    var rssContainer = document.querySelector('.rss-container');
    var rssItem = document.getElementById('rss-item');
    var rssSources = [
      'https://www.noiseblog.top/atom.xml',
      'https://noisevip.cn/feed',
      // 添加更多的RSS信息源
    ];
    var currentRssIndex = 0;
    var currentRssItemIndex = 0;
    
    function fetchRssItems(url) {
      fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(url))
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
    
    // 页面载入后延迟2.5秒后弹出效果
    setTimeout(function() {
      rssContainer.classList.add('open');
    }, 2500);
    
    // 点击关闭按钮后隐藏容器
    var closeButton = document.getElementById('close-button');
    closeButton.addEventListener('click', function() {
      rssContainer.style.display = 'none';
    });
    
    // 每隔8秒变换一次信息
    setInterval(function() {
      fetchRssItems(rssSources[currentRssIndex]);
    }, 8000);