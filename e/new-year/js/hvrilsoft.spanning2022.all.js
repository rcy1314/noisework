function Loading() {
    let Loading = document.querySelector(".loader");
    let Main = document.querySelector(".front-page");
    setTimeout(function () {
      Loading.classList.add("hidden");
      Main.classList.remove("hidden");
    }, 2000);
  }
  
  Loading();
  
  window.onload = function starttime() {
    time(TimeChange, '2024/2/09');
    ptimer = setTimeout(starttime, 1000);
  };
  
  function time(obj, futimg) {
    var nowtimehh = new Date().getTime();
    var futruetimehh = new Date(futimg).getTime();
    var msechh = futruetimehh - nowtimehh;
    var timehh = msechh / 1000;
    var dayhh = parseInt(timehh / 86400);
    var hourhh = parseInt(timehh / 3600) - 24 * dayhh;
    var minutehh = parseInt((timehh % 3600) / 60);
    var secondhh = parseInt(timehh % 60);
    obj.innerHTML =
      "Now距离<span BLUE>除夕</span>还有:<br />" +
      "<span BLUE>" +
      dayhh +
      "</span>" +
      "<span YELLOW>天</span>" +
      "<span BLUE>" +
      hourhh +
      "</span>" +
      "<span YELLOW>时</span>" +
      "<span BLUE>" +
      minutehh +
      "</span>" +
      "<span YELLOW>分</span>" +
      "<span BLUE>" +
      secondhh +
      "</span>" +
      "<span YELLOW>秒</span>";
  }
  
  let buttonun = 0;
  
  let FrontPage = document.querySelector("#box-shadow");
  let FrontPageContent = document.querySelector(".front-page-content");
  let FrontPageContentTime = document.querySelector(".front-page-content-time");
  function FunctionFrontPageToHidden() {
    FrontPage.classList.add("hidden-animation");
    FrontPage.classList.add("hidden");
    FrontPageContent.classList.add("go-top");
    FrontPageContent.style.height = "40px";
    FrontPageContentTime.classList.add("go-top-zero");
    FrontPageContentTime.style.height = "40px";
    buttonun = 1;
    var disabledElement = document.getElementById("Body");
    disabledElement.removeAttribute("onclick");
    if (key == 0 && buttonun == 1) {
      audio.play();
      setTimeout(function () {
        StartTyping();
      }, 2000);
    } else {
      console.log("Start Error");
      return false;
    }
  }
  
  var audio = document.createElement("audio");
  audio.src = "好日子.mp3";
  audio.autoplay = true; // 自动播放音乐
  audio.addEventListener(
    "canplaythrough",
    function () {
      console.log("BGM.ready = 'true'");
    },
    false
  );
  
  let key = 0;
  
  function StartTyping() {
    class Typing {
      constructor(opts) {
        this.opts = opts || {};
        this.source = opts.source;
        this.output = opts.output;
        this.delay = opts.delay || 1;
        this.chain = {
          parent: null,
          dom: this.output,
          val: [],
        };
        if (typeof this.opts.done !== "function")
          this.opts.done = function () {};
      }
  
      init() {
        this.chain.val = this.convert(this.source, this.chain.val);
      }
  
      convert(dom, arr) {
        let children = Array.from(dom.childNodes);
        for (let i = 0; i < children.length; i++) {
          let node = children[i];
          if (node.nodeType === 3) {
            arr = arr.concat(node.nodeValue.split(""));
          } else if (node.nodeType === 1) {
            let val = [];
            val = this.convert(node, val);
            arr.push({
              dom: node,
              val: val,
            });
          }
        }
        return arr;
      }
  
      print(dom, val, callback) {
        setTimeout(function () {
          dom.appendChild(document.createTextNode(val));
          callback();
        }, this.delay);
      }
  
      play(ele) {
        if (!ele.val.length) {
          if (ele.parent) this.play(ele.parent);
          else this.opts.done();
          return;
        }
        let current = ele.val.shift();
        if (typeof current === "string") {
          this.print(ele.dom, current, () => {
            this.play(ele);
          });
        } else {
          let dom = current.dom.cloneNode();
          ele.dom.appendChild(dom);
          this.play({
            parent: ele,
            dom,
            val: current.val,
          });
        }
      }
  
      start() {
        this.init();
        this.play(this.chain);
      }
    }
    let source = document.getElementById("source");
    let output = document.getElementById("output");
    let typing = new Typing({
      source,
      output,
    });
    typing.start();
    key = 1;
  }
  
  var canvas = document.createElement("canvas"),
    c = canvas.getContext("2d");
  var w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight);
  
  particles = {};
  particleIndex = 0;
  particleNum = 30;
  
  document.body.appendChild(canvas);
  function particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * (canvas.height / 3) + (2 * canvas.height) / 3 - 100;
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;
    this.gravity = 0.3;
    particleIndex++;
    particles[particleIndex] = this;
    this.id = particleIndex;
    this.life = 0;
    this.maxLife = Math.random() * 90;
    this.shadeR = Math.floor(Math.random() * 255 + 150) + 50;
    this.shadeG = Math.floor(Math.random() * 150) + 50;
    this.shadeB = Math.floor(Math.random() * 0);
    this.color =
      "rgba(" +
      this.shadeR +
      "," +
      this.shadeG +
      "," +
      this.shadeB +
      "," +
      Math.random() * 0.7 +
      ")";
    this.size = Math.random() * 3;
  }
  particle.prototype.draw = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (Math.random() < 0.1) {
      this.vx = Math.random() * 10 - 5;
      this.vy = -2;
    }
  
    this.life++;
    if (this.life >= this.maxLife) {
      delete particles[this.id];
    }
  
    c.beginPath();
    c.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    c.fillStyle = this.color;
    c.fill();
  };
  
  function drawParticle() {
    c.clearRect(0, 0, w, h);
    for (var i = 0; i < particleNum; i++) {
      new particle();
    }
    for (var i in particles) {
      particles[i].draw();
    }
  }
  
  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
  
  function loop() {
    window.requestAnimFrame(loop);
    drawParticle();
  }
  
  loop();
  