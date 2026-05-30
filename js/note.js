// Note Widget Configuration and Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Default configuration
    const config = window.note || {
        host: 'https://note.noisework.cn', //修改为你的域名
        limit: '10',
        domId: '#note'
    };
    
    const container = document.querySelector('#note .note-container');
    const searchInput = document.querySelector('#tag-search');
    const searchBtn = document.querySelector('#search-btn');
    
    let currentPage = 1;
    let isLoading = false;
    let hasMore = true;
    let currentTag = '';
    
    // Create UI elements
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.id = 'load-more-note';
    loadMoreBtn.className = 'load-more';
    loadMoreBtn.textContent = '加载更多';
    loadMoreBtn.style.display = 'none';
    
    const loadedAll = document.createElement('div');
    loadedAll.id = 'loaded-all-note';
    loadedAll.className = 'loaded-all';
    loadedAll.textContent = '已加载全部';
    loadedAll.style.display = 'none';
    
    // 在文件开头的 UI 元素创建部分添加
    const backToListBtn = document.createElement('button');
    backToListBtn.id = 'back-to-list';
    backToListBtn.className = 'back-to-list';
    backToListBtn.textContent = '返回列表';
    backToListBtn.style.display = 'none';
    
    container.appendChild(loadMoreBtn);
    container.appendChild(loadedAll);
    container.appendChild(backToListBtn);

    // 修改 handleSearch 函数
    function handleSearch() {
        const searchValue = searchInput.value.trim();
        currentTag = searchValue.startsWith('#') ? searchValue.substring(1) : '';
        resetState();
        // 确保在搜索时显示加载状态
        container.querySelector('.loading-wrapper').style.display = 'block';
        loadInitialContent();
        if (searchValue !== '') {
            backToListBtn.style.display = 'block';
        } else {
            backToListBtn.style.display = 'none';
        }
    }

    // 修改 resetState 函数
    function resetState() {
        currentPage = 1;
        hasMore = true;
        isLoading = false;
        loadMoreBtn.style.display = 'none';
        loadedAll.style.display = 'none';
        clearMessages();
        // 重置时显示加载状态
        container.querySelector('.loading-wrapper').style.display = 'block';
    }

    // 修改 loadInitialContent 函数中的错误处理
    async function loadInitialContent() {
        try {
            const url = buildApiUrl();
            console.log('请求URL:', url);
            const controller = new AbortController();
            const timer = setTimeout(function(){ controller.abort(); }, (window.note && window.note.loadingTimeout) || 8000);
            const response = await fetch(url, { signal: controller.signal });
            if (!response.ok) {
                throw new Error(`HTTP错误! 状态码: ${response.status}`);
            }
            clearTimeout(timer);
            const result = await response.json();
            console.log('API响应数据:', result);
            
            if (result && result.code === 1 && result.data) {
                // 修改这里以适应新的响应格式
                const items = Array.isArray(result.data) ? result.data : (result.data.items || []);
                const sortedData = items.sort((a, b) => 
                    new Date(b.created_at) - new Date(a.created_at)
                );
                renderMessages(sortedData);
                
                updateLoadMoreState(items.length);
            } else {
                console.error('API返回数据格式不符:', result);
                showNoContent();
            }
        } catch (error) {
            console.error('加载内容失败:', error);
            showLoadError();
        } finally {
            // 确保无论成功失败都隐藏加载状态
            const lw = container.querySelector('.loading-wrapper');
            if (lw) lw.style.display = 'none';
        }
    }

    // 添加返回列表的处理函数
    // Event listeners
    loadMoreBtn.addEventListener('click', loadMoreContent);
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    backToListBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentTag = '';
        backToListBtn.style.display = 'none';
        resetState();
        loadInitialContent();
    });
    
    // Lazy load: only fetch when #note enters viewport
    var noteRoot = document.querySelector('#note');
    var initialLoaded = false;
    if ('IntersectionObserver' in window && noteRoot) {
        var io = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if (entry.isIntersecting && !initialLoaded) {
                    initialLoaded = true;
                    loadInitialContent();
                    io.disconnect();
                }
            });
        }, {root: null, threshold: 0.15});
        io.observe(noteRoot);
    } else {
        loadInitialContent();
    }
    
    function handleSearch() {
        const searchValue = searchInput.value.trim();
        currentTag = searchValue.startsWith('#') ? searchValue.substring(1) : '';
        resetState();
        loadInitialContent();
        if (searchValue !== '') {
            backToListBtn.style.display = 'block';
        } else {
            backToListBtn.style.display = 'none';
        }
    }
    
    function filterByTag(tag) {
        searchInput.value = `#${tag}`;
        currentTag = tag;
        backToListBtn.style.display = 'block';
        resetState();
        loadInitialContent();
    }
    
    function resetState() {
        currentPage = 1;
        hasMore = true;
        isLoading = false;
        loadMoreBtn.style.display = 'none';
        loadedAll.style.display = 'none';
        clearMessages();
        const loadingWrapper = container.querySelector('.loading-wrapper');
        if (loadingWrapper) {
            loadingWrapper.style.display = 'block';
        }
    }
    
    function clearMessages() {
        const messages = container.querySelectorAll('.notecard');
        messages.forEach(msg => msg.remove());
    }
    
    function buildApiUrl() {
        let url;
        if (currentTag) {
            // 使用标签搜索路由
            url = `${config.host}/api/messages/tags/${encodeURIComponent(currentTag)}?page=${currentPage}&pageSize=${config.limit}`;
        } else if (searchInput.value.trim() !== '') {
            // 使用普通搜索路由
            url = `${config.host}/api/messages/search?keyword=${encodeURIComponent(searchInput.value.trim())}&page=${currentPage}&pageSize=${config.limit}`;
        } else {
            // 无搜索词时使用普通分页路由
            url = `${config.host}/api/messages/page?page=${currentPage}&pageSize=${config.limit}`;
        }
        return url;
    }

    async function loadInitialContent() {
        try {
            const url = buildApiUrl();
            console.log('请求URL:', url);
            const controller = new AbortController();
            const timer = setTimeout(function(){ controller.abort(); }, (window.note && window.note.loadingTimeout) || 8000);
            const response = await fetch(url, { signal: controller.signal });
            if (!response.ok) {
                throw new Error(`HTTP错误! 状态码: ${response.status}`);
            }
            clearTimeout(timer);
            const result = await response.json();
            console.log('API响应数据:', result);
            
            if (result && result.code === 1 && result.data) {
                // 修改这里以适应新的响应格式
                const items = Array.isArray(result.data) ? result.data : (result.data.items || []);
                const sortedData = items.sort((a, b) => 
                    new Date(b.created_at) - new Date(a.created_at)
                );
                renderMessages(sortedData);
                
                updateLoadMoreState(items.length);
            } else {
                console.error('API返回数据格式不符:', result);
                showNoContent();
            }
        } catch (error) {
            console.error('加载内容失败:', error);
            showLoadError();
        } finally {
            const lw2 = container.querySelector('.loading-wrapper');
            if (lw2) lw2.style.display = 'none';
        }
    }

    async function loadMoreContent() {
        if (isLoading || !hasMore) return;
        
        isLoading = true;
        loadMoreBtn.textContent = '加载中...';
        currentPage++;
        
        try {
            const url = buildApiUrl();
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result && result.code === 1 && result.data) {
                const items = Array.isArray(result.data) ? result.data : (result.data.items || []);
                const sortedData = items.sort((a, b) => 
                    new Date(b.created_at) - new Date(a.created_at)
                );
                renderMessages(sortedData);
                
                updateLoadMoreState(items.length);
            }
        } catch (error) {
            console.error('加载更多内容失败:', error);
            currentPage--;
        } finally {
            isLoading = false;
            loadMoreBtn.textContent = '加载更多';
        }
    }

    // 首先引入 marked 库
    const marked = window.marked || {
        parse: (text) => text
    };

    function parseContent(content) {
        // 先解析 Markdown
        content = marked.parse(content);

        // 为所有图片添加 zoom-image 类
        content = content.replace(/<img/g, '<img class="zoom-image"');

        // 定义媒体平台的正则表达式
        const BILIBILI_REG = /<a href="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?">.*?<\/a>/g;
        const QQMUSIC_REG = /<a href="https:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?">.*?<\/a>/g;
        const QQVIDEO_REG = /<a href="https:\/\/v\.qq\.com\/.*\/([a-zA-Z0-9]+)\.html">.*?<\/a>/g;
        const SPOTIFY_REG = /<a href="https:\/\/open\.spotify\.com\/(track|album)\/([\s\S]+)">.*?<\/a>/g;
        const YOUKU_REG = /<a href="https:\/\/v\.youku\.com\/.*\/id_([a-zA-Z0-9=]+)\.html">.*?<\/a>/g;
        const YOUTUBE_REG = /<a href="https:\/\/(www\.youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})">.*?<\/a>/g;
        const NETEASE_MUSIC_REG = /<a href="https:\/\/music\.163\.com\/.*?id=(\d+)">.*?<\/a>/g;
        // 修改正则，避免匹配图片链接
        const GITHUB_REPO_REG = /<a href="https:\/\/github\.com\/([\w-]+)\/([\w.-]+)(?:\/[^\s"]*)?"[^>]*>(?!<img)[\s\S]*?<\/a>/g;

        // 处理标签（在 Markdown 解析后）
        // 使用DOM方式处理，避免正则嵌套问题
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        
        // 遍历所有文本节点，替换#标签
        const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT, null, false);
        const nodesToReplace = [];
        let node;
        while (node = walker.nextNode()) {
            const text = node.textContent;
            if (text.match(/#[^\s#]+/)) {
                nodesToReplace.push(node);
            }
        }
        
        nodesToReplace.forEach(textNode => {
            const text = textNode.textContent;
            const newText = text.replace(/#([\u4e00-\u9fff\w]+)/g, function(match, tag) {
                return '<span class="tag" onclick="filterByTag(\'' + tag + '\')">#' + tag + '</span>';
            });
            if (newText !== text) {
                const span = document.createElement('span');
                span.innerHTML = newText;
                textNode.parentNode.replaceChild(span, textNode);
            }
        });
        
        content = tempDiv.innerHTML;

        // 处理各种媒体链接
        content = content
        .replace(BILIBILI_REG, function (match, videoId) {
            var base = "https://player.bilibili.com/player.html?isOutside=true&autoplay=0&high_quality=1&danmaku=0";
            var src = "";
            if (/^av\d+$/i.test(videoId)) {
                src = base + "&aid=" + videoId.slice(2);
            } else if (/^BV[\w]{10}$/i.test(videoId)) {
                src = base + "&bvid=" + videoId;
            } else {
                return match;
            }
            return "<div class='video-wrapper'><iframe src='" + src + "' frameborder='0' allowfullscreen allow='fullscreen; picture-in-picture; encrypted-media' style='position:absolute;height:100%;width:100%;'></iframe></div>";
        })
        .replace(YOUTUBE_REG, "<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$2' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div>")
        .replace(NETEASE_MUSIC_REG, "<div class='music-wrapper'><meting-js auto='https://music.163.com/#/song?id=$1'></meting-js></div>")
        .replace(QQMUSIC_REG, "<div class='music-wrapper'><meting-js auto='https://y.qq.com/n/yqq/song$1.html'></meting-js></div>")
        .replace(QQVIDEO_REG, "<div class='video-wrapper'><iframe src='//v.qq.com/iframe/player.html?vid=$1' allowFullScreen='true' frameborder='no'></iframe></div>")
        .replace(SPOTIFY_REG, "<div class='spotify-wrapper'><iframe style='border-radius:12px' src='https://open.spotify.com/embed/$1/$2?utm_source=generator&theme=0' width='100%' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe></div>")
        .replace(YOUKU_REG, "<div class='video-wrapper'><iframe src='https://player.youku.com/embed/$1' frameborder=0 'allowfullscreen'></iframe></div>")
        // github卡片渲染
        /*
        .replace(GITHUB_REPO_REG, (match, owner, repo) => {
            const cardId = `github-card-${owner}-${repo}-${Math.random().toString(36).slice(2, 8)}`;
            setTimeout(() => fetchGitHubRepoInfo(owner, repo, cardId), 0);
            return `<div class="github-card" id="${cardId}" data-owner="${owner}" data-repo="${repo}">
                <div class="github-card-loading">Loading GitHub Repo...</div>
            </div>`;
        });
        */

    return content;
}
    
    function updateLoadMoreState(itemCount) {
        if (itemCount >= config.limit) {
            loadMoreBtn.style.display = 'block';
            loadedAll.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'none';
            loadedAll.style.display = 'block';
            hasMore = false;
        }
    }
    
    function showNoContent() {
        container.querySelector('.loading-wrapper').textContent = '暂无内容';
        hasMore = false;
    }
    
    function showLoadError() {
        container.querySelector('.loading-wrapper').textContent = '加载失败，请刷新重试';
    }
    
    function renderMessages(messages) {
        const loadingWrapper = container.querySelector('.loading-wrapper');
        if (loadingWrapper) {
            loadingWrapper.style.display = 'none';
        }
        
        messages.forEach(message => {
            const messageElement = createMessageElement(message);
            container.insertBefore(messageElement, loadMoreBtn);
        });
    }
    
    // 将 toggleCommentBox 和 initWaline 函数暴露到全局作用域
    window.toggleCommentBox = function(host) {
        const commentBox = document.getElementById(`comment-box-${host}`);
        if (commentBox) {
            if (commentBox.style.display === "none") {
                commentBox.style.display = "block";
                initWaline(commentBox, host);
            } else {
                commentBox.style.display = "none";
            }
        }
    };

    window.initWaline = function(container, host) {
        const commentId = `waline-${host}`;
        container.innerHTML = `<div id="${commentId}"></div>`;
        import('https://unpkg.com/@waline/client@v3/dist/waline.js').then(({ init }) => {
            const uid = host.split('-').pop();
            init({
                el: `#${commentId}`,
                serverURL: window.note.commentServer || 'https://ment.noisework.cn', // 使用配置中的评论服务器地址
                reaction: 'true',
                meta: ['nick', 'mail', 'link'],
                requiredMeta: ['mail', 'nick'],
                pageview: true,
                search: false,
                wordLimit: 200,
                pageSize: 5,
                avatar: 'monsterid',
                emoji: [
                    'https://unpkg.com/@waline/emojis@1.2.0/tieba',
                ],
                imageUploader: false,
                copyright: false,
                path: `${config.host}/#/messages/${uid}`,
            });
        });
    };
    
    function createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'notecard';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'notecard-content';
        
        const title = document.createElement('h3');
        title.className = 'notecard-title';
        title.innerHTML = `${message.username || '匿名用户'}<i class="fas fa-certificate" style="color: rgb(26, 81, 232) font-size: 0.8em;"></i>`;
        
        const description = document.createElement('div');
        description.className = 'notecard-description';
        
        let processedContent = message.content || '无内容';
        processedContent = parseContent(processedContent);
        description.innerHTML = processedContent;

        buildImageGrids(description);

        // 初始化图片灯箱效果
        const zoomImages = description.querySelectorAll('.zoom-image');
        mediumZoom(zoomImages, {
            margin: 24,
            background: 'rgba(0, 0, 0, 0.9)',
            scrollOffset: 0,
        });

        // 添加渐变遮罩
        const contentMask = document.createElement('div');
        contentMask.className = 'content-mask';
        description.appendChild(contentMask);
        
        // 添加展开按钮
        const expandBtn = document.createElement('button');
        expandBtn.className = 'expand-btn';
        expandBtn.textContent = '展开全文';
        
        // 修改展开按钮的检测逻辑
        const checkHeight = () => {
            const images = description.getElementsByTagName('img');
            const allImagesLoaded = Array.from(images).every(img => img.complete);
            
            if (allImagesLoaded) {
                const actualHeight = description.scrollHeight;
                if (actualHeight > 680) {
                    description.style.maxHeight = '680px';  // 添加这行
                    contentMask.style.display = 'block';
                    expandBtn.style.display = 'block';
                } else {
                    description.style.maxHeight = 'none';   // 添加这行
                    contentMask.style.display = 'none';
                    expandBtn.style.display = 'none';
                }
            } else {
                // 如果图片未加载完，等待所有图片加载完成后再次检查
                Promise.all(Array.from(images).map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise(resolve => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                })).then(checkHeight);
            }
        };

        // 初始检查（处理无图片的情况）
        setTimeout(checkHeight, 100);
        
        // 展开按钮点击事件
        expandBtn.addEventListener('click', () => {
            if (description.classList.contains('expanded')) {
                description.classList.remove('expanded');
                description.style.maxHeight = '680px';      // 添加这行
                expandBtn.textContent = '展开全文';
                contentMask.style.display = 'block';
                // 滚动到卡片顶部
                messageDiv.scrollIntoView({ behavior: 'smooth' });
            } else {
                description.classList.add('expanded');
                description.style.maxHeight = 'none';       // 添加这行
                expandBtn.textContent = '收起全文';
                contentMask.style.display = 'none';
            }
        });
        
        if (message.image_url) {
            const img = document.createElement('img');
            img.src = message.image_url.startsWith('http') ? 
                message.image_url : 
                config.host + message.image_url;
            img.style.maxWidth = '100%';
            img.style.borderRadius = '2px';
            img.style.marginTop = '2px';
            description.appendChild(img);
        }
        
        contentDiv.appendChild(title);
        contentDiv.appendChild(description);
        contentDiv.appendChild(expandBtn);

        // 添加底部分割线和信息
        const footerDiv = document.createElement('div');
        footerDiv.className = 'note-footer';
        
        // 左侧时间和来源
        const timeDiv = document.createElement('small');
        timeDiv.className = 'post-time';
        const date = new Date(message.created_at);
        timeDiv.textContent = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} · 来自 `;
        
        // 修改链接生成逻辑
        const sourceLink = document.createElement('a');
        sourceLink.href = `${config.host}/#/messages/${message.id}`;
        sourceLink.textContent = config.sourceName || '「说说笔记」';
        sourceLink.className = 'source-link';
        sourceLink.target = '_blank'; // 修改为在新标签页打开
        timeDiv.appendChild(sourceLink);
        
        // 右侧评论按钮
        const commentDiv = document.createElement('small');
        commentDiv.className = 'comment-button';
        commentDiv.dataset.host = `note-${message.id}`;
       // commentDiv.innerHTML = '📮 评论';
        commentDiv.onclick = function() {
            window.toggleCommentBox(`note-${message.id}`);
        };
        
        footerDiv.appendChild(timeDiv);
        footerDiv.appendChild(commentDiv);
        
        // 添加评论框容器
        const commentBoxDiv = document.createElement('div');
        commentBoxDiv.id = `comment-box-note-${message.id}`;
        commentBoxDiv.className = 'comment-box';
        commentBoxDiv.style.display = 'none';
        
        contentDiv.appendChild(footerDiv);
        contentDiv.appendChild(commentBoxDiv);
        messageDiv.appendChild(contentDiv);
        
        return messageDiv;
    }

    function buildImageGrids(root) {
        try {
            const nodes = Array.from(root.childNodes);
            let run = [];
            const isWhitespaceText = (n) => n.nodeType === 3 && (!n.textContent || n.textContent.trim() === '');
            const isBr = (n) => n.nodeType === 1 && n.tagName && n.tagName.toLowerCase() === 'br';
            const isImgElement = (el) => el.tagName && el.tagName.toLowerCase() === 'img';
            const isAWithImg = (el) => el.tagName && el.tagName.toLowerCase() === 'a' && !!el.querySelector('img');
            const isPOnlyImages = (el) => {
                if (!(el.tagName && el.tagName.toLowerCase() === 'p')) return false;
                return Array.from(el.childNodes).every((cn) => {
                    if (isWhitespaceText(cn) || isBr(cn)) return true;
                    if (cn.nodeType !== 1) return false;
                    const ct = cn.tagName.toLowerCase();
                    if (ct === 'img') return true;
                    if (ct === 'a') return !!cn.querySelector('img');
                    return false;
                });
            };

            const flush = () => {
                if (run.length < 2) { run = []; return; }
                const grid = document.createElement('div');
                const count = run.length;
                const cols = (count === 2 || count === 4) ? 2 : Math.min(3, count);
                grid.className = `image-grid cols-${cols}`;
                for (const n of run) {
                    const item = document.createElement('div');
                    item.className = 'image-grid-item';
                    let node = null;
                    if (n.nodeType === 1) {
                        if (isImgElement(n) || isAWithImg(n)) {
                            node = n;
                        } else if (isPOnlyImages(n)) {
                            const a = n.querySelector('a');
                            node = a && a.querySelector('img') ? a : (n.querySelector('img') || null);
                        }
                    }
                    if (!node) continue;
                    item.appendChild(node);
                    grid.appendChild(item);
                }

                grid.querySelectorAll('img').forEach((img) => {
                    const item = img.closest('.image-grid-item');
                    const setAR = () => {
                        if (!item) return;
                        const w = img.naturalWidth;
                        const h = img.naturalHeight;
                        item.classList.remove('ar-169','ar-34','ar-11');
                        if (w > h) item.classList.add('ar-169');
                        else if (h > w) item.classList.add('ar-34');
                        else item.classList.add('ar-11');
                    };
                    if (img.complete && img.naturalWidth && img.naturalHeight) setAR();
                    else img.addEventListener('load', setAR, { once: true });
                });

                const firstEl = run.find((n) => n.nodeType === 1);
                if (firstEl) firstEl.replaceWith(grid);
                run.forEach((n) => {
                    if (n !== firstEl && n.nodeType === 1 && n.parentNode) n.parentNode.removeChild(n);
                });
                run = [];
            };

            for (const n of nodes) {
                if (isWhitespaceText(n) || isBr(n)) {
                    continue;
                }
                const el = n;
                const isBlock = (
                    n.nodeType === 1 && (
                        isImgElement(el) || isAWithImg(el) || isPOnlyImages(el)
                    )
                );
                if (isBlock) {
                    run.push(el);
                } else {
                    flush();
                }
            }
            flush();

            if (!root.querySelector('.image-grid')) {
                const candidates = Array.from(root.querySelectorAll(':scope > p > img, :scope > p > a > img, :scope > img, :scope > a > img'))
                    .map((img) => img.closest('a') || img);
                if (candidates.length >= 2) {
                    const grid = document.createElement('div');
                    const count = candidates.length;
                    const cols = (count === 2 || count === 4) ? 2 : Math.min(3, count);
                    grid.className = `image-grid cols-${cols}`;
                    candidates.forEach((node) => {
                        const item = document.createElement('div');
                        item.className = 'image-grid-item';
                        item.appendChild(node);
                        grid.appendChild(item);
                    });
                    const firstNode = candidates[0].closest('p') || candidates[0];
                    if (firstNode && firstNode.parentNode) {
                        firstNode.parentNode.insertBefore(grid, firstNode);
                        candidates.forEach((node) => {
                            const host = node.closest('p') || node;
                            if (host && host.parentNode) host.parentNode.removeChild(host);
                        });
                    }
                }
            }
        } catch (e) {}
    }
    
    // 将filterByTag函数暴露到全局作用域
    window.filterByTag = filterByTag;
});

// 新增：异步拉取GitHub仓库信息并填充卡片
function fetchGitHubRepoInfo(owner, repo, cardId) {
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
            if (!data) return;
            const card = document.getElementById(cardId);
            if (card) {
                card.innerHTML = `
                    <div class="github-card-header">
                        <img src="${data.owner.avatar_url}" class="github-card-avatar" />
                        <div>
                            <a href="${data.html_url}" target="_blank" class="github-card-title">${data.full_name}</a>
                            <div class="github-card-desc">${data.description || ''}</div>
                        </div>
                    </div>
                    <div class="github-card-footer">
                        <span>⭐ ${data.stargazers_count}</span>
                        <span>🍴 ${data.forks_count}</span>
                        <span>🛠️ ${data.language || ''}</span>
                    </div>
                `;
            }
        });
}
