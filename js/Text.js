// 获取弹出框元素
var popup = document.querySelector(".popup");
var popupText = document.getElementById("popupText");
   
// 定义要显示的文字列表
var texts = ["📢：主页已更新", "😃", "😯", "🤔", "🥳", "🥺"];
   
// 定义当前文字索引
var currentIndex = 0;

// 更新弹出框文字内容
function updatePopupText() {
  popupText.innerHTML = texts[currentIndex];
  
  // 更新当前文字索引
  currentIndex = (currentIndex + 1) % texts.length;
}

// 初始更新文字内容
updatePopupText();

// 弹出框弹入
function showPopup() {
  popup.style.top = "20px";
}

// 弹出框弹出
function hidePopup() {
  popup.style.top = "-100px";
}

// 每隔6秒更新文字内容并弹出
setInterval(function() {
 popup.style.top = "20px";
setTimeout(function() {
popup.style.top = "-100px";
}, 5000); // 弹出时间为3秒
 updatePopupText();
 }, 6000);