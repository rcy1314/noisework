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
        'newGame.js':'Preparing.'
    },
    'home':{
        'docs':{
            'easterEgg.txt':'Glad you found it here.'
        }
    }
};
/*命令历史 */
let line = 0
let his = ['Haha,you found it.']
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
    'echo':{
        'fun':cmecho,
        'help':'usage: echo [str] [-h]<br>str: Output content<br>-h: Show the help message.',
        'parameters':['-h'],
        'nap':-1
    },
    'test':{
        'fun':test,
        'help':'usage: test [-a] [-b] [-c] [-h]<br>-a -b -c: test parameter<br>-h: Show the help message.',
        'parameters':['-h','-a','-b','-c'],
        'nap':0
    },
    'cd':{
        'fun' :cmcd,
        'help' :'usage: cd [dir] [-h]<br>dir: Path to file or directory.<br>-h: Show the help message.',
        'parameters':['-h'],
        'nap':1
    },
    'ls':{
        'fun' :cmls,
        'help' :'usage: ls [dir] [-h]<br>dir: Path to file or directory.<br>-h: Show the help message.',
        'parameters':['-h'],
        'nap':1
    },
    'help':{
        'fun':cmhelp,
        'help':'',
        'parameters':[],
        'nap':0
    },
    'cat':{
    'fun' :cmcat,
        'help' :'usage: cat [dir] [-h]<br>dir: Path to file or directory.<br>-h: Show the help message.',
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
            print('command not found: ' + input.value,'error');
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
            print('Unrecognized parameter: '+array[i],'error')
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
function cmecho(text){
    var result = analysis(text,'echo')
    if (result == false){
        print('No parameters provided','error');
    }
    else if(result != 'error'){
        if (result[0][0] == 1){
            print(command['echo']['help'],'message')
        }
        else{
            print(printObj(text,'a'),'italic')
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
            print('No such file or directory: '+res2[1],'error');
        }
        else if(typeof(res2[0]) == 'string'){
            print('Is a file: '+ res2[1],'error');
        }
        else{
            route = res2[1];folder = res2[0];
        }}
    }
}
function cmls(text){
    var res1 = analysis(text,'ls');
    if (res1 == false){
        print(printObj(folder),'message');
    }
    else if (res1 != 'error'){
        if (res1[0][0] == 1){
            print(command['ls']['help'],'message')
        }
        else{
        var res2 = find(res1[1][0]);
        if (res2[0] == false){
            print('No such file or directory: '+res2[1],'error')
        }
        else if(typeof(res2[0]) == 'string'){
            print('Is a file: '+ res2[1],'error');
        }
        else{
            print(printObj(res2[0]),'message');
        }}
    }
}
function cmcat(text){
    var res1 = analysis(text,'cat')
    if (res1[0] == -3){
        print('No parameters provided','error');
    }
    else if (res1 != 'error'){
        if (res1[0][0] == 1){
            print(command['cat']['help'],'message')
        }
        else{
        var res2 = find(res1[1][0])
        if (res2[0] == false){
            print('No such file or directory: '+res2[1],'error');
        }
        else if(typeof(res2[0]) == 'string'){
            print(res2[0],'italic');
        }
        else{
            print('Is a directory: '+ res2[1],'error');
        }}
    }
}
/*初始化 */
let headb = '[<span class="g">guest</span>@Browser <span class="b">'
let heada = '</span>]<span class="d">$</span> '
let terminal = document.createElement('div');
terminal.className = 'terminal'
let context = document.createElement('div');
context.className = 'context'
let head = document.createElement('span');
head.className ='head'
head.innerHTML ='Error'
let input = document.createElement('input');
input.className = 'input'
input.onkeydown = enter
terminal.appendChild(context)
terminal.appendChild(head)
terminal.appendChild(input)
container.appendChild(terminal)
update()
print("Welcome to Zaqueo's Terminal!(Simulation version :D)",'warning')
print('Type <span style="color: #ffbc00">help</span> to list the available commands.','warning')
})()