function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function parseCDATA(content) {
    if (content.startsWith("<![CDATA[")) {
        content = content.slice(9, -3); // 去掉开头的 <![CDATA[ 和结尾的 ]]>
    }
    return content;
}

function removeSpecialChars(content) {
    return content
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'");
}

async function fetchRSS() {
    try {
        const response = await fetch('https://www.noisedh.link/rssmerge.xml');
        if (!response.ok) throw new Error('网络错误');

        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        const items = xmlDoc.getElementsByTagName('item');
        
        const cardsContainer = document.getElementById('rss-cards');

        if (items.length === 0) {
            cardsContainer.innerHTML = '<p>没有找到RSS内容。</p>';
            return;
        }

        Array.from(items).forEach(item => {
            const title = parseCDATA(item.getElementsByTagName('title')[0]?.textContent || '无标题');
            const link = escapeHtml(item.getElementsByTagName('link')[0]?.textContent || '#');
            const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || new Date().toISOString();
            const source = item.getElementsByTagName('source')[0]?.textContent || '未知来源';

            // 解析内容
            let description = '';
            const contentEncoded = item.getElementsByTagName('content:encoded')[0]?.textContent;
            const contentHtml = item.getElementsByTagName('content')[0]?.textContent;
            const descriptionElement = item.getElementsByTagName('description')[0]?.textContent;

            if (contentEncoded) {
                description = parseCDATA(contentEncoded);
            } else if (contentHtml) {
                description = parseCDATA(contentHtml);
            } else if (descriptionElement) {
                description = parseCDATA(descriptionElement);
            } else {
                description = '无描述';
            }

            const cleanedDescription = removeSpecialChars(description);

            const rssmergecard = document.createElement('div');
            rssmergecard.className = 'rssmergecard';

            // 创建一个临时的 div 来解析 HTML 内容
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = cleanedDescription;

            const rssmergecardContent = document.createElement('div');
            rssmergecardContent.className = 'rssmergecard-content';
            rssmergecardContent.innerHTML = `
                <a href="${link}" target="_blank" class="rssmergecard-title">${title}</a>
                <div class="rssmergecard-description">${tempDiv.innerHTML}</div>
                <div class="rssmergecard-meta">
                    <p class="rssmergecard-time">${new Date(pubDate).toLocaleString()}</p>
                    <p class="rssmergecard-source">来源: ${source}</p>
                </div>
            `;
            rssmergecard.appendChild(rssmergecardContent);
            cardsContainer.appendChild(rssmergecard);
        });
    } catch (error) {
        console.error('获取RSS失败:', error);
        document.getElementById('rss-cards').innerHTML = '<p>加载内容失败，请稍后再试。</p>';
    }
}

document.addEventListener('DOMContentLoaded', fetchRSS);