/* 双击启动 */
document.getElementById('clear').ondblclick = change;
let state = 'a';
const avatar = document.getElementById('avatar');
const persontag = document.getElementById('persontag');
const terminal = document.getElementById('terminal');

function change() {
    if (state === 'a') {
        avatar.classList.add('dap');
        persontag.classList.add('dap');
        setTimeout(() => {
            avatar.style.display = 'none';
            persontag.style.display = 'none';
            terminal.style.display = 'block';
            terminal.classList.add('ap');
            state = 't';
        }, 300);
    } else {
        terminal.classList.add('dap');
        setTimeout(() => {
            terminal.style.display = 'none';
            avatar.style.display = 'block';
            persontag.style.display = 'block';
            avatar.classList.add('ap');
            persontag.classList.add('ap');
            state = 'a';
        }, 300);
    }
}


/*imform*/
console.log(" %c Islet %c v1.0.0 ", "color: #FFFFFF !important; background: #FF6666; padding:5px;", "background: #1c2b36; padding:5px;color:white !important");

/* 移除视觉差效果 */
const sence = document.getElementById('sence');

/* footer */
const startDate = new Date('2020/12/09');
const daysElement = document.getElementById('days');
const days = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));
daysElement.textContent = `${days}天`;

document.addEventListener('mousemove', (event) => {
    const footer = document.getElementById('footer');
    footer.style.display = (event.clientY >= window.innerHeight - 50) ? 'block' : 'none';
});

/* 页面重定向 */
window.addEventListener('DOMContentLoaded', function() {
    const pathname = window.location.pathname;
    if (pathname === '/index.html') {
        const newUrl = `${window.location.protocol}//${window.location.host}`;
        window.history.replaceState({ path: newUrl }, '', newUrl);
    } else if (pathname.endsWith('/')) {
        const newUrl = pathname.replace(/\/$/, '');
        window.history.replaceState({ path: newUrl }, '', newUrl);
    }
});

/* 在主线程中 */
function sendDataToWorker(data) {
    const worker = new Worker('worker.js');
    worker.onmessage = (event) => console.log('Worker 计算结果是:', event.data);
    worker.onerror = (error) => console.error('Worker 错误:', error);
    worker.postMessage(data);
    worker.terminate();
}

// 调用函数发送数据
sendDataToWorker('3');
