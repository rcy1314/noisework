// 定义API接口,请自己部署自己的api，不要使用我的
// 定义API接口
const primaryEndpoints = ['https://hot.noisework.cn', 'https://hot.noisedh.link'];

const apiEndpoints = {
  zhihu: '/zhihu',
  weibo: '/sina',
  bilibili: '/bilibili',
  douyin: '/douyin',
  baidu: '/tieba',
  toutiao: '/toutiao',
  v2ex: '/v2ex',
  hellogithub: '/hellogithub'
};

// 使用 fetch API 从不同的API端点请求数据
function fetchData(target) {
  const updateTimeElement = document.getElementById(target).querySelector('.update-time');
  updateTimeElement.textContent = '数据更新时间: 加载中...';

  const endpointPath = apiEndpoints[target];
  let currentEndpointIndex = 0; // 默认使用第一个API

  const fetchFromEndpoint = (url) => {
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
        currentEndpointIndex++;
        if (currentEndpointIndex < primaryEndpoints.length) {
          fetchFromEndpoint(`${primaryEndpoints[currentEndpointIndex]}${endpointPath}`);
        } else {
          updateTimeElement.textContent = `数据更新时间: 错误`;
          const list = document.getElementById(target + '-list');
          const li = document.createElement('li');
          li.textContent = `Error: ${error.message}`;
          list.appendChild(li);
        }
      });
  };

  fetchFromEndpoint(`${primaryEndpoints[currentEndpointIndex]}${endpointPath}`);
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
  fetchData(target);
}

// 页面加载时初始化数据
document.addEventListener('DOMContentLoaded', () => {
  const targets = Object.keys(apiEndpoints);
  targets.forEach(target => {
    loadFromLocalStorage(target);
    // 初始加载数据
    fetchData(target);
  });
});

// 每小时自动刷新页面
setInterval(() => {
  location.reload();
}, 3600000); // 3600000 毫秒 = 1 小时