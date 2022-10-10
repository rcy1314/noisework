// input

function confirm() {
  const inputValue = document.getElementsByClassName('chat-input')[0].value;
  const chatBotBox = document.getElementsByClassName('chatbot-box')[0];

  if (inputValue == '你好') {
    chatBotBox.innerHTML = '很高兴见到你!';
  } else if (inputValue == '你叫什么名字?') {
    chatBotBox.innerHTML = '我是电系精灵皮卡丘!';
  } else if (inputValue == '百万伏特') {
    document.getElementsByClassName(
      'chatbot-change-image'
    )[0].style.visibility = 'visible';
    // document.getElementsByClassName('chatbot-box')[0].innerHTML = '皮卡~丘!';
  } else if (inputValue == '今天感觉怎么样?') {
    chatBotBox.innerHTML = '很好!😊';
  } else if (inputValue == '我爱你') {
    chatBotBox.innerHTML = '我好喜欢 ❤️❤️❤️';
  } else {
    chatBotBox.innerHTML = '我还没学过呢。教教我!';
  }
}
