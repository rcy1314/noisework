// 只适配游戏手柄  比如八位堂的迷你手柄

function Joystick(opts) {
    //默认配置
    var position = { left: "50%", top: "50%" }
    //保存传入的配置信息
    //  this.el = opts && opts.el
    this.color = opts && opts.color || 'white'
    this.size = opts && opts.size || 100

    this.isFourBtn = opts && opts.isFourBtn ? true : false //默认4键模式 否则8键模式（左上/左下/右上/右下）
    this.keyCodes = opts && opts.keyCodes || [87, 83, 65, 68]    //按顺序是上下左右 默认WSAD
    this.keyCodes2 = opts && opts.keyCodes2 || [104, 98, 100, 102]    //玩家2
    this.btn_down_fn = opts && opts.btn_down_fn //fn 按下时的回调
    this.btn_up_fn = opts && opts.btn_up_fn //fn 释放时的回调
    this.relative = opts && opts.relative || true //默认将容器设置为相对定位

    //生成配置信息 这里配置的参数将传给nipplejs.min.js
    this.opts = {
        // zone: this.el, //用户设置的容器
        mode: 'static',//模式，static就是摇杆中心固定
        position: { left: '50%', top: '50%' },//让摇杆容器定位到用户设置容器的正中心
        color: this.color,//摇杆的颜色 包括back和front nipplejs默认白色，通过背景色实现
        size: this.size,//摇杆容器back元素的大小，front是他的一半,默认100
    }

    //记录上一次按键方向
    this.directions = [null, null]  //手势释放时重新设为null
}

Joystick.prototype.init = function () {
    //外置手柄 监听
    this.gamePadKeys = [];
    this.gamePadKeys[0] = { 0: { k: 75, btn: 0 }, 1: { k: 74, btn: 0 }, 8: { k: 17, btn: 0 }, 9: { k: 13, btn: 0 } };
    //连跳
    this.gamePadKeys[0][2] = {k:73, btn:0};
    //连发
    this.gamePadKeys[0][3] = {k:85, btn:0};
    this.listenGamePad(0);
    //手柄2 
    //select 8 --> 99
    //select 9 --> 97
    this.gamePadKeys[1] = { 0: { k: 103, btn: 0 }, 1: { k: 105, btn: 0 } };
    //连跳
    this.gamePadKeys[1][2] = {k:101, btn:0};
    //连发
    this.gamePadKeys[1][3] = {k:96, btn:0};
    this.listenGamePad(1);
}

//监听 外接手柄
Joystick.prototype.listenGamePad = function (idx) {
    const gamepad = navigator.getGamepads()[idx];
    var me = this;

    if (gamepad) {
        //获取最新方向信息
        let now_direction = "";
        //方向键
        if (gamepad.axes[0] > .85) {
            now_direction = "right";
        }
        if (gamepad.axes[0] < -.85) {
            now_direction = "left";
        }
        if (gamepad.axes[1] > .85) {
            now_direction += "down";
        }
        if (gamepad.axes[1] < -.85) {
            now_direction += "up";
        }

        if (now_direction) {
            now_direction = now_direction + idx;
            //处理方向信息
            me.handleDirection(now_direction, me.directions[idx]); //新方向 上一个方向
            //更新按键方向
            me.directions[idx] = now_direction;
        } else if (me.directions[idx]) {
            //表示按键弹起
            me.onEnd(idx);
        }

        for (let k1 in me.gamePadKeys[idx]) {
            let objBtn1 = me.gamePadKeys[idx][k1];
            if (gamepad.buttons[k1].pressed) {
                //当按钮按住时 判断按了多长时间
                if (me.buttonPressed(objBtn1) == "up") {
                    objBtn1.btn = 0;
                }
            } else if (objBtn1.btn > 0) {
                //如果已经按过了
                me.btn_up_fn(me.package(objBtn1.k));
                objBtn1.btn = 0;
            }
        }

    }

    setTimeout(() => this.listenGamePad(idx), 100);
}

Joystick.prototype.onEnd = function (idx) {
    var me = this;
    //1.获取要处理的keyCode数组 并调用方法将相关按键释放
    me.handleCodeArr('up', me.getCodeArr(me.directions[idx])) //up or down
    //2.重置方向信息
    me.directions[idx] = null
}
 
//将相关方式信息转换为keyCode，并放入数组中
Joystick.prototype.handleDirection = function (new_direction, old_direction) {
    var me = this;
    //old_direction可能为null 但new_direction绝对有值
    //当old_direction时，说明用户刚开始点击，此时需要将相应的keyCode传给btn_down_fn执行
    if (old_direction === null) {
        var code_arr = me.getCodeArr(new_direction)
        me.handleCodeArr('down', code_arr)
    }
    //当old_direction不为null，说明用户正在滑动 如果此时新旧方向不一致，则要更新按键状态
    if (old_direction !== null && new_direction !== old_direction) {
        var old_arr = me.getCodeArr(old_direction)
        var new_arr = me.getCodeArr(new_direction)
        //找出已经发生改变的方向 例如 右上 -> 右下 需要将'上'取消掉，同时将'下'按下

        //遍历新数组的元素，对比该元素是否存在旧数组中，如果不存在，即可得到 按下的 code_arr
        var down_arr = new_arr.filter(code => {
            return !old_arr.includes(code)
        })
        me.handleCodeArr('down', down_arr)
        //遍历旧数组的元素，对比该元素是否存在新数组中，如果不存在，即可得到 释放的 code_arr
        var up_arr = old_arr.filter(code => {
            return !new_arr.includes(code)
        })
        me.handleCodeArr('up', up_arr)
    }
}

//将方向信息转换为keyCode后，以数组形式返回
Joystick.prototype.getCodeArr = function (direction) {
    var me = this;
    switch (direction) {
        case 'up0': return [me.keyCodes[0]]; break;
        case 'down0': return [me.keyCodes[1]]; break;
        case 'left0': return [me.keyCodes[2]]; break;
        case 'right0': return [me.keyCodes[3]]; break;
        case 'rightup0': return [me.keyCodes[3], me.keyCodes[0]]; break;
        case 'rightdown0': return [me.keyCodes[3], me.keyCodes[1]]; break;
        case 'leftup0': return [me.keyCodes[2], me.keyCodes[0]]; break;
        case 'leftdown0': return [me.keyCodes[2], me.keyCodes[1]]; break;
        case 'up1': return [me.keyCodes2[0]]; break;
        case 'down1': return [me.keyCodes2[1]]; break;
        case 'left1': return [me.keyCodes2[2]]; break;
        case 'right1': return [me.keyCodes2[3]]; break;
        case 'rightup1': return [me.keyCodes2[3], me.keyCodes2[0]]; break;
        case 'rightdown1': return [me.keyCodes2[3], me.keyCodes2[1]]; break;
        case 'leftup1': return [me.keyCodes2[2], me.keyCodes2[0]]; break;
        case 'leftdown1': return [me.keyCodes2[2], me.keyCodes2[1]]; break;
        default: break;
    }
}

//方向键
Joystick.prototype.handleCodeArr = function (type, arr) {
    //type为up or down
    //arr为需要处理的包含keyCode的数组

    var me = this;
    var fn = me.btn_down_fn //默认为按下时的回调
    if (type !== 'down') {
        //如果不是down 说明是手势释放 需要调用释放按键的回调
        fn = me.btn_up_fn
    }

    //遍历数组中的keyCode 逐个处理
    for (var i = 0, len = arr.length; i < len; i++) {
        //对keyCode进行包裹后
        fn && fn(me.package(arr[i]))
    }
}

//对keyCode进行封装
Joystick.prototype.package = function (keyCode) {
    var evt = {}
    evt.keyCode = keyCode
    return evt
}

//对长按键进行封装 从开始按就开始计时 时间控制在 500 ms
Joystick.prototype.buttonPressed = function (objBtn) {
    if (objBtn) {
        //需要依次执行 为了连续射击
        let actType = "";
        if (objBtn.btn % 5 == 4) {
            this.btn_up_fn(this.package(objBtn.k));
            actType = "up";
        } else if (objBtn.btn % 5 == 0) {
            this.btn_down_fn(this.package(objBtn.k));
            actType = "down";
        }
        //记录按键次数
        ++objBtn.btn;
        return actType;
    }

    return "";
}