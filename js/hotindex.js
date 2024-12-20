// 定义API接口,请自己部署自己的借口，不要使用我的
const apiEndpoints = {
  zhihu: 'https://hot.noisework.cn/zhihu',
  weibo: 'https://hot.noisework.cn/sina',
  bilibili: 'https://hot.noisework.cn/bilibili',
  douyin: 'https://hot.noisework.cn/douyin',
  baidu: 'https://hot.noisework.cn/tieba',
  toutiao: 'https://hot.noisework.cn/toutiao',
  v2ex: 'https://hot.noisework.cn/v2ex',
  hellogithub: 'https://hot.noisework.cn/hellogithub'
};

// 使用 fetch API 从不同的API端点请求数据
function fetchData(url, target) {
  const updateTimeElement = document.getElementById(target).querySelector('.update-time');
  updateTimeElement.textContent = '数据更新时间: 加载中...';
  
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received from', url, data);
      loadData(data.data, target);
      updateTimeElement.textContent = `数据更新时间: ${new Date().toLocaleString()}`;
      saveDataToLocalStorage(target, data.data); // 保存数据到本地存储
    })
    .catch(error => {
      console.error('Error fetching data from', url, error);
      updateTimeElement.textContent = `数据更新时间: 错误`;
      const list = document.getElementById(target + '-list');
      const li = document.createElement('li');
      li.textContent = `Error: ${error.message}`;
      list.appendChild(li);
    });
}

function loadData(data, target) {
  const list = document.getElementById(target + '-list');
  list.innerHTML = ''; // 清空列表
  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = item.title || 'No title';
      li.setAttribute('data-index', `${index + 1}.`);
      const url = (window.innerWidth > 768) ? item.url : item.mobileUrl || '#';
      li.addEventListener('click', () => {
        window.open(url, '_blank');
      });
      list.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = 'No data received';
    list.appendChild(li);
  }
}

function saveDataToLocalStorage(target, data) {
  localStorage.setItem(target, JSON.stringify(data));
}

function loadFromLocalStorage(target) {
  const storedData = localStorage.getItem(target);
  if (storedData) {
    const data = JSON.parse(storedData);
    const updateTimeElement = document.getElementById(target).querySelector('.update-time');
    updateTimeElement.textContent = `数据更新时间: ${new Date().toLocaleString()}`;
    loadData(data, target);
  }
}

function refreshData(target) {
  const url = apiEndpoints[target];
  if (url) {
    fetchData(url, target);
  } else {
    console.error('Unknown target:', target);
  }
}

// 页面加载时初始化数据
document.addEventListener('DOMContentLoaded', () => {
  const targets = ['zhihu', 'weibo', 'bilibili', 'douyin', 'baidu', 'toutiao', 'v2ex', 'hellogithub'];
  targets.forEach(target => {
    loadFromLocalStorage(target);
    // 初始加载数据
    fetchData(apiEndpoints[target], target);
  });
});

// 每小时自动刷新页面
setInterval(() => {
  location.reload();
}, 3600000); // 3600000 毫秒 = 1 小时