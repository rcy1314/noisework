;(function (win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;

    var devicePixelRatio = win.devicePixelRatio;
    var dpr = 1; // 物理像素与逻辑像素的对应关系
    var scale = 1; // css像素缩放比率
    // 设置viewport
    function setViewport() {
        var isIPhone = !!win.navigator.appVersion.match(/iphone/gi);
        if (isIPhone) {
            if (devicePixelRatio >= 3) {
                dpr = 3;
            }
            else if (devicePixelRatio === 2) {
                dpr = 2;
            }
            else {
                dpr = 1;
            }
        }
        win.devicePixelRatioValue = dpr;
        //win.devicePixelRatio = win.devicePixelRatio*win.devicePixelRatio;
        scale = 1 / dpr;
        var metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        }
        else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }
    setViewport();
    var newBase = 100;

    function setRem() {
        var visualView = docEl.getBoundingClientRect().width; // visual viewport
        newBase = 100 * visualView / lib.desinWidth;
        docEl.style.fontSize = newBase + 'px';
    }
    var tid;
    lib.desinWidth = 640;
    lib.baseFont = 18;
    lib.init = function () {
        win.addEventListener('resize', function () {
            clearTimeout(tid);
            tid = setTimeout(setRem, 300);
        }, false);
        /*win.addEventListener('onorientationchange', function () {
            clearTimeout(tid);
            tid = setTimeout(setRem, 300);
        }, false);*/
        win.addEventListener('pageshow', function (e) {
            if (e.persisted) {
                clearTimeout(tid);
                tid = setTimeout(setRem, 300);
            }
        }, false);
        if (doc.readyState === 'complete') {
            doc.body.style.fontSize = lib.baseFont * dpr + 'px';
        }
        else {
            doc.addEventListener('DOMContentLoaded', function (e) {
                doc.body.style.fontSize = lib.baseFont * dpr + 'px';
            }, false);
        }
        setRem();
        docEl.setAttribute('data-dpr', dpr);
    };
})(window, window['adaptive'] || (window['adaptive'] = {}));
