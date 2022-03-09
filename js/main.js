//弹窗样式
iziToast.settings({
    timeout: 10000,
    icon: 'Fontawesome',
    closeOnEscape: 'true',
    position: 'topLeft',
    transitionIn: 'bounceInRight',
    transitionOut: 'fadeOutLeft',
    displayMode: 'replace',
    layout: '2',
    titleColor: '#efefef',
    messageColor: '#efefef',
    iconColor: '#efefef',
});

iziToast.info({
    icon: 'fad fa-vial',
    title: '欢迎访问我的主页,这里介绍了我的其它站点链接，可点击访问它们',
    message: '主页：https://noisework.cn，备用地址1:https://noisework.pages.dev，备用地址2：https://noisework-cn.vercel.app，备用地址3:https://noisework.vercel.app'
});

//控制台输出
/*
let date = '2021-09-27 21:32'
let a = 'background: #606060; color: #fff; border-radius: 3px 0 0 3px;'
let b = 'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;'
console.log(`%c Update Time %c ${date} `, a, b)
*/
/* 样式代码 */
var styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`
var styleTitle2 = `
font-style: oblique;
font-size:14px;
color: rgb(244,167,89);
font-weight: 400;
`
var styleContent = `
color: rgb(30,152,255);
`

/* 内容代码 */
var title1 = 'Noiseの主页'
var title2 = 'work.cn'
var content = `


`

//获取一言
fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
        const hitokoto = document.getElementById('hitokoto_text')
        const from = document.getElementById('from_text')
        hitokoto.innerText = data.hitokoto
        from.innerText = data.from
    })
    .catch(console.error)

//获取天气
fetch('https://www.tianqiapi.com/free/day?appid=43986679&appsecret=TksqGZT7')
    .then(response => response.json())
    .then(data => {
        const wea = document.getElementById('wea_text')
        const city = document.getElementById('city_text')
        const tem_night = document.getElementById('tem_night')
        const tem_day = document.getElementById('tem_day')
        const win = document.getElementById('win_text')
        const win_speed = document.getElementById('win_speed')
        wea.innerText = data.wea
        city.innerText = data.city
        tem_night.innerText = data.tem_night
        tem_day.innerText = data.tem_day
        win.innerText = data.win
        win_speed.innerText = data.win_speed
    })
    .catch(console.error)

//获取时间
var t = null;
t = setTimeout(time, 1000);

function time() {
    clearTimeout(t);
    dt = new Date();
    var y = dt.getYear() + 1900;
    var mm = dt.getMonth() + 1;
    var d = dt.getDate();
    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var day = dt.getDay();
    var h = dt.getHours();
    var m = dt.getMinutes();
    var s = dt.getSeconds();
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    document.getElementById("time").innerHTML = y + "&nbsp;年&nbsp;" + mm + "&nbsp;月&nbsp;" + d + "&nbsp;日&nbsp;" + "<span class='weekday'>" + weekday[day] + "</span><br>" + "<span class='time-text'>" + h + ":" + m + ":" + s + "</span>";
    t = setTimeout(time, 1000);
}


//加载动画
window.addEventListener('load', function () {
    document.body.style.overflow = 'auto';
    document.getElementById('loading-box').classList.add("loaded")
}, false)

//链接提示文字
$("#social").mouseover(function () {
    $("#social").css({
        "background": "rgb(0 0 0 / 25%)",
        'border-radius': '6px',
        "backdrop-filter": "blur(5px)"
    });
    $("#link-text").css({
        "display": "block",
    });
}).mouseout(function () {
    $("#social").css({
        "background": "none",
        "border-radius": "6px",
        "backdrop-filter": "none"
    });
    $("#link-text").css({
        "display": "none"
    });
});

$("#github").mouseover(function () {
    $("#link-text").html("来微信联系我吧");
}).mouseout(function () {
    $("#link-text").html("通过这里联系我");
});
$("#qq").mouseover(function () {
    $("#link-text").html("有什么事吗");
}).mouseout(function () {
    $("#link-text").html("通过这里联系我");
});
$("#email").mouseover(function () {
    $("#link-text").html("来封 Email");
}).mouseout(function () {
    $("#link-text").html("通过这里联系我");
});
$("#telegram").mouseover(function () {
    $("#link-text").html("你懂的 ~");
}).mouseout(function () {
    $("#link-text").html("通过这里联系我");
});
$("#twitter").mouseover(function () {
    $("#link-text").html("你懂的 ~");
}).mouseout(function () {
    $("#link-text").html("通过这里联系我");
});

//更多页面切换
var shoemore = false;
$('#switchmore').on('click', function () {
    shoemore = !shoemore;
    if (shoemore && $(document).width() >= 990) {
        $('#container').attr('class', 'container mores');
        $("#change").html("Oops&nbsp;!");
        $("#change1").html("哎呀，这都被你发现了（ 再点击一次可关闭 ）");
    } else {
        $('#container').attr('class', 'container');
        $("#change").html("你好&nbsp;欢迎访问&nbsp;!");
        $("#change1").html("比你优秀的人都在努力，你还有什么理由去放弃");
    }
});

//更多页面关闭按钮
$('#close').on('click', function () {
    $('#container').attr('class', 'container');
    $("#change").html("你好&nbsp;欢迎访问d&nbsp;!");
    $("#change1").html("比你优秀的人都在努力，你还有什么理由去放弃");
});

//菜单栏切换
var switchmenu = false;
$('#switchmenu').on('click', function () {
    switchmenu = !switchmenu;
    if (switchmenu) {
        $('#row').attr('class', 'row menus');
        $("#menu").html("<i class='fad fa-times'></i>");
    } else {
        $('#row').attr('class', 'row');
        $("#menu").html("<i class='fad fa-bars'></i>");
    }
});

//更多弹窗页面
$('#openmore').on('click', function () {
    $('#box').css("display", "block");
    $('#row').css("display", "none");
    $('#more').css("cssText", "display:none !important");
});
$('#closemore').on('click', function () {
    $('#box').css("display", "none");
    $('#row').css("display", "flex");
    $('#more').css("display", "flex");
});

//监听网页宽度
window.addEventListener('load', function () {
    window.addEventListener('resize', function () {
        //关闭移动端样式
        if (window.innerWidth >= 600) {
            $('#row').attr('class', 'row');
            $("#menu").html("<i class='fad fa-bars'></i>");
            //移除移动端切换功能区
            $('#rightone').attr('class', 'row rightone');
        }

        if (window.innerWidth <= 990) {
            //移动端隐藏更多页面
            $('#container').attr('class', 'container');
            $("#change").html("你好&nbsp;欢迎访问&nbsp;!");
            $("#change1").html("比你优秀的人都在努力，你还有什么理由去放弃");

            //移动端隐藏弹窗页面
            $('#box').css("display", "none");
            $('#row').css("display", "flex");
            $('#more').css("display", "flex");
        }
    })
})
/*
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.className.includes("dark") ? (document.body.classList.remove('dark'),
        localStorage.setItem("pref-theme", 'light')) : (document.body.classList.add('dark'),
        localStorage.setItem("pref-theme", 'dark'))
})
*/
//移动端切换功能区
var changemore = false;
$('#changemore').on('click', function () {
    changemore = !changemore;
    if (changemore) {
        $('#rightone').attr('class', 'row menus mobile');
    } else {
        $('#rightone').attr('class', 'row menus');
    }
});

//更多页面显示关闭按钮
$("#more").hover(function () {
    $('#close').css("display", "block");
}, function () {
    $('#close').css("display", "none");
})

