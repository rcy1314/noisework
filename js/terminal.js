// 获取终端容器元素
const terminalContainer = document.getElementById("terminal");

// 创建一个 iframe 元素
const iframeElement = document.createElement("iframe");
iframeElement.src = "./widgets/clock/index.html"; // 替换为您要嵌入的网页的 URL
iframeElement.style.width = "100%";
iframeElement.style.height = "100%";

// 将 iframe 元素添加到容器中
terminalContainer.appendChild(iframeElement);
