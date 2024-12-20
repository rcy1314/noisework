/* 双击启动 */
document.getElementById('clear').ondblclick = change;
let state = 'a';
const avatar = document.getElementById('avatar');
const persontag = document.getElementById('persontag');
const terminal = document.getElementById('terminal');

function change() {
    if (state === 'a') {
        avatar.className = 'dap';
        persontag.className = 'dap';
        setTimeout(() => {
            avatar.style.display = 'none';
            persontag.style.display = 'none';
            terminal.style.display = 'block';
            terminal.className = 'ap';
            state = 't';
        }, 300);
    } else {
        terminal.className = 'dap';
        setTimeout(() => {
            terminal.style.display = 'none';
            avatar.style.display = 'block';
            persontag.style.display = 'block';
            avatar.className = 'ap';
            persontag.className = 'ap';
            state = 'a';
        }, 300);
    }
}

/*scroll*/
/* let container = document.querySelector('.workbox');
if (window.innerWidth > 720) {
    container.addEventListener('wheel',(event) => {
    event.preventDefault();
    for (var i=0;i<100;i++){
        setTimeout(() => container.scrollLeft += event.deltaY/100,i);
}})};
/*imform*/
console.log(" %c Islet %c v1.0.0 ", "color: #FFFFFF !important; background: #FF6666; padding:5px;", "background: #1c2b36; padding:5px;color:white !important");
console.log(` %c
　　　　　　　　　　　　　＿＿＿　　 ~ヽ
　　　　　　，‘　 ...::::::::::::::::::::::::::::｀丶
 　 　 　 　 ／::::::::::::::::::::::::::::::::::::::::::::::＼　’
　　　　　 /:::::::::/|:::∧:::|Χ:::::::::::::::::::::::::::.　；
       ｛　 |:::::: /＼/　'V⌒Y＼ :::::::::::::::: |
        ；　N:::ｲ,'⌒}　　{　　|　 |::::::::::::::::: |　｝
　　　　　　| ::| ､_,ﾉ　　 ､__ﾉ　 |::::::::::::::::: |
　      :　　|::ﾘ　　　　　　 　 ｕ|::::::::::::::::: |　{
  　 　 ｝ 　|（ｕ　r　　 ￣＼ ｕ::::::::::::::::::: |　；
　　　　　　|:::＞ ゝ,　＿＿_）│::::::/:∧:::|
　　　　　　∨∨∨ﾚ:ｧャ　ア |人〃⌒∨　:
    　 　 ~''　　　 　 人_{／／／ﾍ（⌒) ）　．
　　　　　　　　　　/　〈__>ｰく　 　 ﾏ二二7
 　 ，'~　　　｀；　/│/　|　~｀∨　　Y⌒)ヽ
　　　　 (ヽ　　 〈ーl/　(⌒ヽ ├ー‐仁＿ﾉ ，
  ｛　（￣　　ｰ-/￣|　　,>､　　ｰ＜｀ＹV　 ノ
   ' 　 ｀ー- 、　｀　|＼/　 丶、　 　 |│　；
　 　 　 　 　 ＼ 　_!　　　　　 ＼　　|│　;
`,'font-family: "MS PGothic", "ＭＳ Ｐゴシック", "Trebuchet MS", Verdana, Futura, Arial, Helvetica, sans-serif;line-height: 1;font-size: 12pt;');

const sence = document.getElementById('sence');
if (window.innerWidth > 720) {
    const parallaxInstance = new Parallax(sence, {
        relativeInput: true,
        clipRelativeInput: false,
        hoverOnly: false
    });
    $(function() {
        NodeCursor({
            cursor: true,
            node: true,
            cursor_velocity: 1,
            node_velocity: 0.15,
            native_cursor: 'none',
            element_to_hover: 'a',
            cursor_class_hover: 'expand',
            node_class_hover: 'expand',
            hide_mode: true,
            hide_timing: 2000,
        });
    });
} else {
    console.log("视差效果已禁用，设备宽度小于等于720px");
}

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
