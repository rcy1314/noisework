const menu_box = document.querySelector('.menu-box');
const menu_button = document.querySelector('.menu-button');

menu_button.addEventListener('click', function() {
    menu_box.classList.toggle('active');
});

let isDragging = false;
let startX, startY, initialX, initialY;

menu_box.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = menu_box.offsetLeft;
    initialY = menu_box.offsetTop;
    menu_box.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        menu_box.style.left = `${initialX + dx}px`;
        menu_box.style.top = `${initialY + dy}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    menu_box.style.cursor = 'grab';
});