
/*双击启动*/
document.getElementById('clear').ondblclick = change
let state = 'a'
function change(){
    if (state == 'a'){   
    document.getElementById('avatar').className = 'dap';
    document.getElementById('persontag').className = 'dap';
    setTimeout(() => {document.getElementById('avatar').style.display = 'none';
    document.getElementById('persontag').style.display = 'none';
    document.getElementById('terminal').style.display = 'block';
    document.getElementById('terminal').className = 'ap';
    state = 't'},300)
    }else{
    document.getElementById('terminal').className = 'dap'
    setTimeout(() => {document.getElementById('terminal').style.display = 'none';
    document.getElementById('avatar').style.display = 'block';
    document.getElementById('persontag').style.display = 'block';
    document.getElementById('avatar').className = 'ap';
    document.getElementById('persontag').className = 'ap';
    state = 'a'},300)}}

/*scroll*/
let container = document.querySelector('.workbox');
if (window.innerWidth >720) {
	container.addEventListener('wheel',(event) => {
	event.preventDefault();
	for (var i=0;i<100;i++){
		setTimeout(() => container.scrollLeft += event.deltaY/100,i);
}})};
/*imform*/
console.log(" %c Islet %c v1.0.0 ", "color: #FFFFFF !important; background: #FF6666; padding:5px;", "background: #1c2b36; padding:5px;color:white !important");
console.log(` %c
　　　　　　　　　　　　　＿＿＿　　 ~ヽ
　　　　　　，‘　 ...::::::::::::::::::::::::::::｀丶
 　 　 　 　 ／::::::::::::::::::::::::::::::::::::::::::::::＼　’
　　　　　 /:::::::::/|:::∧:::|Χ:::::::::::::::::::::::::::.　；
       ｛　 |:::::: /＼/　'V⌒Y＼ :::::::::::::::: |
        ；　N:::ｲ,'⌒}　　{　　|　 |::::::::::::::::: |　｝
　　　　　　| ::| ､_,ﾉ　　 ､__ﾉ　 |::::::::::::::::: |
　      :　　|::ﾘ　　　　　　 　 ｕ|::::::::::::::::: |　{
  　 　 ｝ 　|（ｕ　r　　 ￣＼ ｕ::::::::::::::::::: |　；
　　　　　　|:::＞ ゝ,　＿＿_）│::::::/:∧:::|
　　　　　　∨∨∨ﾚ:ｧャ　ア |人〃⌒∨　:
    　 　 ~''　　　 　 人_{／／／ﾍ（⌒) ）　．
　　　　　　　　　　/　〈__>ｰく　 　 ﾏ二二7
 　 ，'~　　　｀；　/│/　|　~｀∨　　Y⌒)ヽ
　　　　 (ヽ　　 〈ーl/　(⌒ヽ ├ー‐仁＿ﾉ ，
  ｛　（￣　　ｰ-/￣|　　,>､　　ｰ＜｀ＹV　 ノ
   ' 　 ｀ー- 、　｀　|＼/　 丶、　 　 |│　；
　 　 　 　 　 ＼ 　_!　　　　　 ＼　　|│　;
`,'font-family: "MS PGothic", "ＭＳ Ｐゴシック", "Trebuchet MS", Verdana, Futura, Arial, Helvetica, sans-serif;line-height: 1;font-size: 12pt;');
var sence = document.getElementById('sence')
if(window.innerWidth > 720){
var parallaxInstance = new Parallax(sence, {
  relativeInput: true,
  clipRelativeInput: false,
  hoverOnly:false
});
$( function() {
  // init plugin
  NodeCursor({
    cursor : true, 
    node : true, 
    cursor_velocity : 1, 
    node_velocity : 0.15, 
    native_cursor : 'none', 
    element_to_hover : 'a', 
    cursor_class_hover : 'expand', 
    node_class_hover : 'expand', 
    hide_mode : true, 
    hide_timing : 2000, 
  });
})}
else {
  if (window.DeviceOrientationEvent) {
    var bg = document.getElementById('bg')
    window.addEventListener("deviceorientation", 
    function(event) {
      bg.style.translate = (-event.beta) +'px '+(-event.alpha)+'px';
  })}
  else{
    console.log("DeviceOrientationEvent is not supported");
  }
}
 //*数字时钟*//
window.addEventListener('DOMContentLoaded', () => {
  const clock = document.getElementById('clock');
  let isMouseOver = false;
  let isMobile = false;
  let isClicked = false;

  // 检测是否为手机端尺寸
  const checkMobile = () => {
    if (window.innerWidth <= 600) {
      isMobile = true;
      clock.classList.remove('show');
    } else {
      isMobile = false;
      if (isClicked) {
        clock.classList.add('show');
      }
    }
  };

  // 监听窗口大小变化
  window.addEventListener('resize', checkMobile);
  
  // 初始检测一次窗口大小
  checkMobile();

  clock.addEventListener('mouseover', () => {
    isMouseOver = true;
    if (!isMobile) {
      clock.classList.add('show');
    }
  });

  clock.addEventListener('mouseout', () => {
    isMouseOver = false;
    if (!isMobile && !isClicked) {
      setTimeout(() => {
        if (!isMouseOver) {
          clock.classList.remove('show');
        }
      }, 2000);
    }
  });

  clock.addEventListener('click', () => {
    isClicked = true;
    clock.classList.add('show');
  });

  setInterval(() => {
    if ((isMouseOver || isClicked) && !isMobile) {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      const time = `${hours}:${minutes}:${seconds}`;
      clock.textContent = time;
    }
  }, 1000);
});

 //*footer*//
 // 计算站点运行天数
 var startDate = new Date('2020/12/09');
 var currentDate = new Date();
 var daysElement = document.getElementById('days');
 var days = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
 daysElement.textContent = days + '天';

 // 监听鼠标移动事件
 document.addEventListener('mousemove', function(event) {
   var footer = document.getElementById('footer');
   var windowHeight = window.innerHeight;
   var y = event.clientY;

   // 判断鼠标位置是否在页面底部
   if (y >= windowHeight - 50) {
     footer.style.display = 'block'; // 显示footer
   } else {
     footer.style.display = 'none'; // 隐藏footer
   }
 });
