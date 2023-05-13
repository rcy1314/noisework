// 切换按钮
const btn = document.querySelector('.switch');

btn.addEventListener('click', function () {
    let is_dark = document.querySelector('.switch.dark');
    if (!is_dark) {
        // 切换为暗色主题
        btn.classList.add('dark');
        let a = document.createElement('style');
        a.id = 'aa';
        a.innerHTML = 'html{background-color:#fff;filter:invert(1);}img{filter:invert(1);}';
        document.head.appendChild(a);
    } else {
        // 切换为亮色主题
        btn.classList.remove('dark');
        document.head.querySelector('#aa').remove();
    }
})