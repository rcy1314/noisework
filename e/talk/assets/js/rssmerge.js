function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function parseCDATA(content) {
    return content.startsWith("<![CDATA[") ? content.slice(9, -3) : content;
}

function removeSpecialChars(content) {
    const replacements = {
        '&lt;': '<',
        '&gt;': '>',
        '&amp;': '&', 
        '&quot;': '"',
        '&apos;': "'"
    };
    return content.replace(/&[^;]+;/g, m => replacements[m] || m);
}

async function fetchRSS() {
    try {
        const cardsContainer = document.getElementById('rss-cards');
        cardsContainer.innerHTML = '<p>加载中...</p>';

        const response = await fetch('https://extension.noisework.cn/api/corsmergerss', {
            cache: 'force-cache'
        });
        
        if (!response.ok) throw new Error('网络错误');

        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        const items = xmlDoc.getElementsByTagName('item');
        
        if (items.length === 0) {
            cardsContainer.innerHTML = '<p>没有找到RSS内容。</p>';
            return;
        }

        const fragment = document.createDocumentFragment();

        Array.from(items).forEach(item => {
            const title = parseCDATA(item.getElementsByTagName('title')[0]?.textContent || '无标题');
            const link = escapeHtml(item.getElementsByTagName('link')[0]?.textContent || '#');
            const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || new Date().toISOString();
            const source = item.getElementsByTagName('source')[0]?.textContent || '未知来源';

            let description = '';
            const contentEncoded = item.getElementsByTagName('content:encoded')[0]?.textContent;
            const contentHtml = item.getElementsByTagName('content')[0]?.textContent;
            const descriptionElement = item.getElementsByTagName('description')[0]?.textContent;

            description = parseCDATA(contentEncoded || contentHtml || descriptionElement || '');
            const cleanedDescription = removeSpecialChars(description);

            const rssmergecard = document.createElement('div');
            rssmergecard.className = 'rssmergecard';

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = cleanedDescription;

            rssmergecard.innerHTML = `
                <div class="rssmergecard-content">
                    <a href="${link}" target="_blank" class="rssmergecard-title">${title}</a>
                    <div class="rssmergecard-description">${tempDiv.innerHTML}</div>
                    <div class="rssmergecard-meta">
                        <p class="rssmergecard-time">${new Date(pubDate).toLocaleString()}</p>
                        <p class="rssmergecard-source">来源: ${source}</p>
                    </div>
                </div>
            `;

            fragment.appendChild(rssmergecard);
        });

        cardsContainer.innerHTML = '';
        cardsContainer.appendChild(fragment);

    } catch (error) {
        console.error('获取RSS失败:', error);
        document.getElementById('rss-cards').innerHTML = '<p>加载内容失败，请稍后再试。</p>';
    }
}

// 页面加载完成后延迟加载RSS内容
window.addEventListener('load', () => setTimeout(fetchRSS, 100));