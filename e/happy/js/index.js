let pageAll = document.getElementsByClassName("page");
var pageH = document.getElementById("box").offsetHeight;//页面高度
let myMusic = document.getElementById("music");
let bgm = document.getElementById("bgm");
let startY, endY, val = 0;
let curPage = 0; //当前页索引
let nextPage = 1;//下一页索引
let ifDown = false;//是否按下鼠标
let ifOK = true;//翻页是否结束
let playBgm = false;//首次点击屏幕播放音乐

//bgm播放暂停
bgm.addEventListener("click", function () {
    if (myMusic.paused) {//已停止
        myMusic.play();
        bgm.style.animationPlayState = "running"
    } else {
        myMusic.pause();
        bgm.style.animationPlayState = "paused"
    }
})
//播放音乐
document.addEventListener("click", function (e) {
    if (!playBgm && myMusic.paused) {//播放音乐
        playBgm = true;
        myMusic.play();
        bgm.style.animationPlayState = "running"
    }

    setTimeout(function () {
        fp();
    }, 800)
    $(".dianhuo").animate({
        left: "34%"
    }, 800)
    $("#dian").hide();

})




//移动端翻页
document.addEventListener("touchstart", function (e) {
    if (ifOK) {
        ifDown = true;
        ifOK = false;
        startY = e.touches[0].pageY;
    }

})
document.addEventListener("touchmove", function (e) {
    if (!ifDown) {
        return;
    }
    endY = e.touches[0].pageY;
    val = startY - endY;
    moveF();
})

document.addEventListener("touchend", function (e) {
    if (!ifDown) {//没按下鼠标
        return;
    }
    console.log("mouseup", val)
    ifDown = false;//鼠标没点击
    pageF();
})

//鼠标点击事件 pc端 翻页
document.addEventListener("mousedown", function (e) {
    if (ifOK) {//上一次翻页已结束
        ifDown = true;
        ifOK = false;
        console.log("mousedown", e.offsetY)
        startY = e.offsetY;
    }
})
document.addEventListener("mousemove", function (e) {

    if (!ifDown) {//没按下鼠标
        return;
    }
    endY = e.offsetY;
    val = startY - endY;
    moveF();
})
document.addEventListener("mouseup", function (e) {
    if (!ifDown) {//没按下鼠标
        return;
    }
    console.log("mouseup", val)
    ifDown = false;//鼠标没点击
    pageF();
})

//判断上翻还是下翻
function pageF() {
    //可以翻了
    if (Math.abs(val) > 60) {
        startF();
    } else {//还原不翻
        pageAll[nextPage].classList.remove("active");
        pageAll[nextPage].style.transform = "translateY(0px)";
        clearF();
    }
}
//还原
function clearF() {
    val = 0;
    startY = 0;
    endY = 0;
    ifOK = true;//翻页结束
    console.log("结束", ifOK)
}
//开始翻页
function startF() {
    if (val > 0) {//上翻
        val += 15;
        let a = pageH - val;
        if (a <= 0) {
            setCur();
        } else {
            pageAll[nextPage].style.transform = "translateY(" + a + "px)";
            window.requestAnimationFrame(startF);
        }
    } else {
        val -= 15;
        let a = -(pageH + val);
        if (a >= 0) {//翻页完成
            setCur();
        } else {
            pageAll[nextPage].style.transform = "translateY(" + a + "px)";
            window.requestAnimationFrame(startF);
        }
    }
}
//翻页完成 设置当前页面
function setCur() {
    pageAll[nextPage].style.transform = "translateY(0px)";
    pageAll[curPage].classList.remove("current");
    curPage = nextPage;//当前页索引修改
    pageAll[nextPage].classList.remove("active");
    pageAll[curPage].classList.add("current");
    clearF();
}
//移动
function moveF() {
    nextPage = curPage;
    let h;//移动
    if (val > 0) {//最后一页 上翻 返回第一页
        if (curPage < pageAll.length - 1) {
            nextPage++;
        } else {
            nextPage = 0;
        }
        h = pageH - val;
    } else {
        //第一页 下翻 返回最后一页
        if (curPage != 0) {
            nextPage--;
        } else {
            nextPage = pageAll.length - 1;
        }
        h = - (pageH + val);
    }
    pageAll[nextPage].classList.add("active");
    pageAll[nextPage].style.transform = "translateY(" + h + "px)";
}
//下雪
//随机数
function randNum(min, max) {
    return min + Math.random() * (max - min);
}
//雪花
class Snowflake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = 0;
        this.alpha = 0;
        this.reset();
    }
    //重置
    reset() {
        this.x = randNum(0, window.innerWidth);
        this.y = randNum(0, -window.innerHeight);
        this.vx = randNum(-3, 3);
        this.vy = randNum(2, 5);
        this.radius = randNum(2, 6);
        this.alpha = randNum(0.4, 0.9);
    }
    //移动
    update() {
        this.x += this.vx;

        this.y += this.vy;
        if (this.y + this.radius > window.innerHeight) {
            this.reset();
        }
    }
}
//雪
class Snow {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        window.addEventListener("resize", () => this.onResize());
        this.onResize();
        this.updateF = this.update.bind(this);
        requestAnimationFrame(this.updateF);

        this.createSnowflakes();
    }

    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    createSnowflakes() {
        const num = window.innerWidth / 3;
        this.snowflakes = [];
        for (let s = 0; s < num; s++) {
            this.snowflakes.push(new Snowflake());
        }
    }

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let flake of this.snowflakes) {
            flake.update();

            this.ctx.save();
            this.ctx.fillStyle = "#FFF";
            this.ctx.beginPath();
            this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.globalAlpha = flake.alpha;
            this.ctx.fill();
            this.ctx.restore();
        }
        requestAnimationFrame(this.updateF);
    }
}

new Snow();


//放炮
var $body = $('body');
var $bp = $body.find('.bianpao');
var $bomb = $body.find('.bomb');
var $bpmp3 = $body.find('#bianpao');


var speed = 20;

var fpFlag = false;
function fp() {
    if (fpFlag) {
        return;
    }
    var end = false;
    var shuang = true;
    fpFlag = true;
    var top = ($bomb.position().top >= 460 || !$bomb.position().top) ? 460 : $bomb.position().top;
    timer = setInterval(function () {
        $(".dianhuo").hide();

        var bombClassName = 'bomb';
        var height = $bp.height();
        

        if (end) {//放炮结束
            clearInterval(timer);
            $bomb.hide();
            $(".bgm").show();
            setTimeout(function () {
                $bpmp3[0].pause();
                $(".bp-box").animate({
                    opacity: '0'
                });
                //翻页放炮
                setTimeout(function () {
                    val = 1;//上翻
                    startF();
                }, 4000)

            }, 500);



        } else {

            if (height % 2 == 0) {
                $bomb.removeClass('bomb2').addClass('bomb1').show();
                $bp.removeClass('bianpao2').addClass('bianpao1');
            } else {
                $bomb.removeClass('bomb1').addClass('bomb2').show();
                $bp.removeClass('bianpao1').addClass('bianpao2');
            }
            top = $bomb.position().top;
            $bomb.css('top', top - speed);
            let h = height - speed;
            if (h < 0) {
                shuang = !shuang;
                h = shuang ? 1 : 0;
                setTimeout(function () {
                    end = true;
                }, 1000)
            }

            $bp.css('height', h);
            $bpmp3[0].play();

        }
    }, 100);

}



