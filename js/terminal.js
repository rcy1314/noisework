(function(){
    /*配置区首 */
    /*文件结构 */
    /*
    文件夹名:{
        文件名:文件内容,
        文件夹名:{}
    } 
    */
    let index ={
        'games':{
            'newGame.js':'正在准备中。'
        },
        'home':{
            'docs':{
                'easterEgg.txt':'很高兴你在这里找到了它。'
            }
        }
    };
    /*命令历史 */
    let line = 0
    let his = ['哈哈，你找到了。']
    /*命令行元素 */
    let container = document.getElementById('terminal');
    /*初始路径和初始当前文件夹 */
    let route = '~';
    let folder = index;
    /*命令定义*/
    /*
    命令名:{
        'fun':调用函数,
        'help':帮助信息,
        'parameter':[参数1，参数2，参数3],
        'nap':额外参数数量(-1为不限)
    }
    */
    let command ={
        'test':{
            'fun':test,
            'help':'用法: test [-a] [-b] [-c] [-h]<br>-a -b -c: 测试参数<br>-h: 显示帮助信息。',
            'parameters':['-h','-a','-b','-c'],
            'nap':0
        },
        'cd':{
            'fun' :cmcd,
            'help' :'用法: cd [目录] [-h]<br>目录: 文件或文件夹的路径。<br>-h: 显示帮助信息。',
            'parameters':['-h'],
            'nap':1
        },
        'help':{
            'fun':cmhelp,
            'help':'',
            'parameters':[],
            'nap':0
        },
        'visit':{
            'fun' :cmvisit,
            'help' :'用法: visit [网址] [-h]<br>网址: 要访问的网址。<br>-h: 显示帮助信息。',
            'parameters':['-h'],
            'nap':1
        },
        'douyin':{
            'fun' :cmdouyin,
            'help' :'用法: douyin [链接] [-h]<br>链接: 抖音/快手客户端分享连接、抖音Web直播连接。<br>-h: 显示帮助信息。',
            'parameters':['-h'],
            'nap':1
        }
    };
    /*配置区尾 */
    /*检查输入事件 解析命令*/
    function enter(){
        terminal.scrollTop = 10000;
        var event = window.event || event;
        if (event.keyCode == 13){
            print(head.innerHTML + input.value);
            var com = input.value.split(' ').filter(i => i !='')
            if (com[0] in command){
                command[com[0]]['fun'](com.slice(1));
            }
            else{
                print('未找到命令: ' + input.value,'error');
            };
            update();
        }
        else if (event.keyCode == 38 && line > 0){
            line -= 1;
            input.value = his[line];
        }
        else if (event.keyCode == 40 && line < his.length - 1){
            line += 1;
            input.value = his[line];
        }
    }
    /*打印内容 */
    function print(text,type = 'normal'){
        var p = document.createElement('p');
        p.innerHTML = text;
        p.className = type;
        context.appendChild(p);
    }
    /*更新头部信息 */
    function update(){
        his.splice(his.length -2,0,input.value);
        head.innerHTML = headb + route + heada;
        line = his.length - 2;
        input.value = his[line];
        terminal.scrollTop = 10000;
    }
    /*解析参数 */
    /*
    array:由参数组成的数组
    com:命令
    返回值：-3:没有参数
            -2:未知参数
            -1:-h --help
            ...
    */
    function analysis(array,com){
        var parameters = command[com]['parameters']
        var result = []
        var arr = []
        for(i in parameters){
            result[i] = 0
        }
        if (array[0] == undefined){
            return false
        }
        var num = command[com]['nap']
        for(let i = 0;i < array.length;i++){
            if (parameters.includes(array[i])){
                result[parameters.indexOf(array[i])] = 1
            }
            else if(0 != num){
                num -= 1;
                arr[arr.length] = array[i]
            }
            else{
                print('未知参数: '+array[i],'error')
                return 'error';
            }
        }
        return [result,array]
    }
    /*路径查找 */
    function find(rou){
        if (rou.split('/')[0] in index){
            if (rou[0] != '~'){
                rou = '~/' + rou
            }
        }
        else{
            rou = route + '/' + rou
        }
        var ind = index
        var router = rou.split('/')
        for(var i = 1; i < router.length;i++){
            if (router[i] in ind){
                ind = ind[router[i]]
            }
            else{
                return [false,rou]
            }
        }
        return [ind,rou]
    }
    /*遍历打印 */
    function printObj(obj,type = 'o'){
        var text = '';
        if(type == 'o'){
            for (i in obj){
                text += i + '&nbsp;';
            }
        }
        else{
            for (i in obj){
                console.log(obj[i])
                text += obj[i] + '&nbsp;';
            }
        }
        return text;
    }
    /*执行函数 */
    function test(text){
        var result = analysis(text,'test')
        if (result == false){
            print('Hello,world!','italic');
        }
        else if(result != 'error'){
            if (result[0][0] == 1){
                print(command['test']['help'],'message')
            }
            else{
                print(printObj(result[0],'a'),'message');
            }
        }
    }
    function cmhelp(text){
        var result = analysis(text,'help')
        if (result == false){
            print(printObj(command),'message');
        }
    }
    function cmcd(text){
        var res1 = analysis(text,'cd')
        if (res1 == false){
            route = '~';folder = index;
        }
        else if (res1 != 'error'){
            if (res1[0][0] == 1){
                print(command['cd']['help'],'message')
            }
            else{
            var res2 = find(res1[1][0])
            if (res2[0] == false){
                print('没有这个文件或目录: '+res2[1],'error');
            }
            else if(typeof(res2[0]) == 'string'){
                print('这是一个文件: '+ res2[1],'error');
            }
            else{
                route = res2[1];folder = res2[0];
            }}
        }
    }

    function cmvisit(text){
        var res1 = analysis(text,'visit')
        if (res1[0] == -3){
            print('没有提供参数','error');
        }
        else if (res1 != 'error'){
            if (res1[0][0] == 1){
                print(command['visit']['help'],'message')
            }
            else{
            var url = res1[1][0]
            print('正在访问网址: '+ url)
            window.open(url, '_blank');
            }
        }
    }
    function cmdouyin(text) {
        var res1 = analysis(text, 'douyin');
        if (res1[0] == -3) {
            print('没有提供参数', 'error');
        } else if (res1 != 'error') {
            if (res1[0][0] == 1) {
                print(command['douyin']['help'], 'message');
            } else {
                var url = 'https://douyin.wtf/api/hybrid/video_data?url=' + res1[1][0];
                var fetchUrl = url; // 保存url
                print('正在获取抖音视频: ' + url);
                fetch(fetchUrl, {
                    method: 'GET', // 使用GET请求方式
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.code === 200) {
                            var videoUrl = data.data.url;
                            print('获取到的视频地址: ' + videoUrl);
                            window.open(videoUrl, '_blank');
                        } else {
                            print('获取视频失败: ' + data.msg, 'error');
                        }
                    })
                    .catch(error => {
                        print('获取视频失败: ' + error, 'error');
                    });
            }
        }
    }
    
    /*初始化 */
    let headb = '[<span class="g">guest</span>@浏览器 <span class="b">'
    let heada = '</span>]<span class="d">$</span> '
    let terminal = document.createElement('div');
    terminal.className = 'terminal'
    let context = document.createElement('div');
    context.className = 'context'
    let head = document.createElement('span');
    head.className ='head'
    head.innerHTML ='错误'
    let input = document.createElement('input');
    input.className = 'input'
    input.onkeydown = enter
    terminal.appendChild(context)
    terminal.appendChild(head)
    terminal.appendChild(input)
    container.appendChild(terminal)
    update()
    print("欢迎来到模拟终端！（彩蛋版本 :1.1）",'warning')
    print('输入 <span style="color: #ffbc00">help</span> 查看可用命令列表。增加输入 <span style="color: #ffbc00">visit</span> 空格 网址可前往该地址（必须包含https://），输入 <span style="color: #ffbc00">douyin</span> 空格 视频地址。</span> 可解析该视频。','warning')
})()
