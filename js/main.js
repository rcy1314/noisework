
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
console.log(" %c Zaqueo's Studio %c v1.1.0 ", "color: #FFFFFF !important; background: #FF6666; padding:5px;", "background: #1c2b36; padding:5px;color:white !important");
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

