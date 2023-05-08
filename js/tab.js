// 要操作的元素
const menu_box=document.querySelector('.menu-box');
const menu_button=document.querySelector('.menu-button');

// 为菜单按钮绑定点击事件
menu_button.addEventListener('click',function(){
    menu_box.classList.toggle('active');
})