
// 展开/收起卡片交互逻辑
document.addEventListener('DOMContentLoaded', function() {
    var expandBtn = document.getElementById('expand-toggle-btn');
    var expandContent = document.getElementById('expand-content');
    var expandArrow = expandBtn.querySelector('.expand-arrow');
    var stack = document.getElementById('expand-card-stack');
    var expanded = false;
    expandBtn.addEventListener('click', function() {
        expanded = !expanded;
        if (expanded) {
            expandContent.style.display = 'block';
            expandBtn.innerHTML = '收起 <span class="expand-arrow">▲</span>';
            stack.classList.add('expanded');
        } else {
            expandContent.style.display = 'none';
            expandBtn.innerHTML = '展开 <span class="expand-arrow">▼</span>';
            stack.classList.remove('expanded');
        }
    });
});
// 确保所有链接在新标签页打开
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a');
        if (target && !target.hasAttribute('target')) {
            target.setAttribute('target', '_blank');
        }
    });
});
function hideCardPermanently() {
    const card = document.getElementById('note-expand-card');
    const content = document.getElementById('expand-content');
    
    // 添加hidden类来隐藏元素
    card.classList.add('hidden');
    content.classList.add('hidden');
    
    // 存储隐藏状态到localStorage
    // localStorage.setItem('cardHidden', 'true');
}

// 页面加载时检查隐藏状态
document.addEventListener('DOMContentLoaded', function() {
    // if (localStorage.getItem('cardHidden') === 'true') {
    //     hideCardPermanently();
    // }
    // 确保卡片默认显示
    const card = document.getElementById('note-expand-card');
    const content = document.getElementById('expand-content');
    card.classList.remove('hidden');
    content.classList.remove('hidden');
});
