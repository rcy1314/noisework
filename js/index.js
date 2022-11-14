console.log('123')
addEventListener('load', function () {
    bg_video_size()
    this.window.addEventListener('resize', function () {
        bg_video_size()
    })
    loadIcons()
    var btn = this.document.querySelector('.msg-box')
    setTimeout(() => {
        if (!document.querySelector('audio').played.length) {
            btn.style.display = 'block'
            btn.addEventListener('click', function () {
                document.querySelector('audio').play()
                this.style.display = 'none'
            })
        }
    }, 1000);

})

function bg_video_size() {
    var ele = document.querySelector('.bg-video')
    if (window.innerHeight / window.innerWidth > 0.563) {
        ele.style.height = '100%'
        ele.style.width = 'auto'
    } else {
        ele.style.height = 'auto'
        ele.style.width = '100%'
    }
}

function loadIcons() {
    var eles = ['&#xe65e;', '&#xe608;', '&#xf012a;', '&#xe68e;']
    for (var i = 0, html = ''; i < 3; i++) {
        eles.forEach(item => {
            html += '<a href="#"><i class="icon iconfont">' + item + '</i></a>'
        })
    }
    document.querySelector('.menu').innerHTML = html
}