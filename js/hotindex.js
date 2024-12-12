const encryptedApiEndpoints = {
  zhihu: 'U2FsdGVkX18Gvv8yhSaN5wmW8b0mgc+9UIMlDY8IPIdQYdW2ZGiJpQH3bzZ0ZaHfBweJ58Tg9gnNPSXl1LnOJg==',
  weibo: 'U2FsdGVkX18pW39V0DNa+PnuekNvtR+guTUl+cFpnrnfnqAgQH378meBzkWK1tX9uFAP4gME3kCeP6P8g2CeQg==',
  bilibili: 'U2FsdGVkX19uiAsvVfyH1vDTcWtDnNnU+bc1ELKImtJk50Y0hVL1l4+h1TWzbBR9+8+AU9RekKPO++RWWGhVMA==',
  douyin: 'U2FsdGVkX1+AoY93cWAPSJnVMS7awb0/nBtKeU991Y/A0hV2dl3u5o6mo2HaNY2uy7fG4610xfZEp5TCfO2yvQ==',
  baidu: 'U2FsdGVkX1+pZvqxFc2dmyh8U62yKsKuOKt4OMB5w008MnO8tmrJj4ueeeCatzArDtTfMFdb8tDRX7DJhoLZxQ==',
  toutiao: 'U2FsdGVkX1+CNdJ9T/GfsPS7KfxaWM9Pe+ZLl7k+kSh8paV1gcurCcf323CLb61YPpLEZAUD0IXoxnYxkaQeog==',
  v2ex: 'U2FsdGVkX19222d2VHCM2iE7ePXi01rHuWR6GjEOloNhIo0oFnMZv3+tmM/k8+Z4vq7ndRkKbFSlUnnwHaQ1Jg==',
  hellogithub: 'U2FsdGVkX197BLSzQPts30tMTd+4Me/9rG/wtOAeIvujAJv+xqWPWMeg0AIolzTJbbcH4FPLlngPaSj313pENw=='
};
function decryptApi(encryptedApi) {
  const decrypted = CryptoJS.AES.decrypt(encryptedApi, 'noise'); 
  return decrypted.toString(CryptoJS.enc.Utf8);
}
const apiEndpoints = {};
for (const [key, value] of Object.entries(encryptedApiEndpoints)) {
  apiEndpoints[key] = decryptApi(value);
}
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
      saveDataToLocalStorage(target, data.data); 
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