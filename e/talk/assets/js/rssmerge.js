let currentIndex = 0;
const itemsPerPage = 20;
let allItems = [];

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
        content = content.slice(9, -3);
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

function displayItems() {
    const cardsContainer = document.getElementById('rss-cards');
    const itemsToDisplay = allItems.slice(currentIndex, currentIndex + itemsPerPage);
    itemsToDisplay.forEach(item => {
        const rssmergecard = document.createElement('div');
        rssmergecard.className = 'rssmergecard';

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = item.cleanedDescription;

        const rssmergecardContent = document.createElement('div');
        rssmergecardContent.className = 'rssmergecard-content';
        rssmergecardContent.innerHTML = `
            <a href="${item.link}" target="_blank" class="rssmergecard-title">${item.title}</a>
            <div class="rssmergecard-description">${tempDiv.innerHTML.replace(/href="([^"]+)"/g, 'href="$1" target="_blank"')}</div>
            <div class="rssmergecard-meta">
                <p class="rssmergecard-time">${new Date(item.pubDate).toLocaleString()}</p>
                <p class="rssmergecard-source">来源: ${item.source}</p>
            </div>
        `;
        rssmergecard.appendChild(rssmergecardContent);
        cardsContainer.appendChild(rssmergecard);
    });
    currentIndex += itemsPerPage;

    if (currentIndex >= allItems.length) {
        document.getElementById('load-more').style.display = 'none';
        document.getElementById('loaded-all').style.display = 'block';
    } else {
        document.getElementById('load-more').style.display = 'block';
        document.getElementById('loaded-all').style.display = 'none';
    }
}

async function fetchRSS() {
    try {
        const response = await fetch('https://extension.noisework.cn/api/corsmergerss');
        if (!response.ok) throw new Error('网络错误');

        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        const items = xmlDoc.getElementsByTagName('item');

        if (items.length === 0) {
            document.getElementById('rss-cards').innerHTML = '<p>没有找到RSS内容。</p>';
            return;
        }

        allItems = Array.from(items).map(item => {
            const title = parseCDATA(item.getElementsByTagName('title')[0]?.textContent || '');
            const link = escapeHtml(item.getElementsByTagName('link')[0]?.textContent || '#');
            const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || new Date().toISOString();
            const source = item.getElementsByTagName('source')[0]?.textContent || '';

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
                description = '';
            }

            const cleanedDescription = removeSpecialChars(description);
            return { title, link, pubDate, source, cleanedDescription };
        });

        displayItems();
        document.getElementById('load-more').addEventListener('click', displayItems);
    } catch (error) {
        console.error('获取RSS失败:', error);
        document.getElementById('rss-cards').innerHTML = '<p>加载内容失败，请稍后再试。</p>';
    }
}

document.addEventListener('DOMContentLoaded', fetchRSS);