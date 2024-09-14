(function() {
    /* 配置区首 */
    /* 文件结构 */
    let index = {
        'games': {
            'newGame.js': '正在准备中。'
        },
        'home': {
            'docs': {
                'easterEgg.txt': '很高兴你在这里找到了它。'
            }
        }
    };
    
    function base64Encode(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }

    function base64Decode(str) {
        return decodeURIComponent(escape(atob(str)));
    }

    /* 关键词和回复 */
    const keywordResponses = {
        '关键词': '5qyi6L+O5L2/55So5YWz6ZSu6K+N5Zue5aSN5Yqf6IO977yM6K+36L6T5YWl5Lul5LiL5oyH5a6a5YWz6ZSu6K+N5p+l55yL5Zue5aSN77yM5aSN5Yi26K+36YCJ5oup5ZCOY29tbWFuZC9jdHJs77yLQyDlhbblroPor7flvq7kv6Hnp4Hkv6HvvIEK4oCc56eR5a2m5LiK572R4oCd4oCU4oCU5LiA5Lqb56eR5a2m5LiK572R5pa55byP6IqC54K577yBIOKAnENBTlZB5YWN6LS54oCd4oCU4oCUQ2FudmEgcHJv5Zu96ZmF5YWN6LS55Zui6Zif54mI77yBIOKAnOWJquaYoOKAneKAlOKAlFBD5Ymq5pig56C06Kej54mI77yB',
        '剪映': '5Ymq5pigcHJvLXY2LjAuMee7v+iJsuWFjeWuieijheeJiDpodHRwczovL3Bhbi5xdWFyay5jbi9zL2M4NWRlYzMwZGJjNArliarmmKBwcm8tdjYuMOaPkuS7tueJiDpodHRwczovL3Bhbi5xdWFyay5jbi9zL2QyYjZhZjlhMzY2MwrliarmmKBwcm8tdjMuMijkuI3pnIBWSVDkvJrlkZjmnIDpq5jniYgpOmh0dHBzOi8vcGFuLnF1YXJrLmNuL3MvMWU5NDNiNzc2M2E3CjEyM+ebmOmTvuaOpe+8mmh0dHBzOi8vd3d3LjEyM3Bhbi5jb20vcy85VDZBLXo2RXhkLmh0bWwK5Lul5LiK77yM5LuF6ZmQV0lO57O757uf',
        '科学上网': '6K6i6ZiF6IqC54K5MTpodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vTWVtb3J5MjMxNC9WTWVzc2xpbmtzL21haW4vbGlua3Mvdm1lc3MK6K6i6ZiF6IqC54K5MjpodHRwczovL21pcnJvci5naHByb3h5LmNvbS9odHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vQmFyYWJhbWEvRnJlZU5vZGVzL21hc3Rlci9ub2Rlcy95dWRvdTY2LnR4dArorqLpmIXoioLngrkzOmh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9wZWFzb2Z0L05vTW9yZVdhbGxzL21hc3Rlci9saXN0LnR4dArorqLpmIXoioLngrk0Omh0dHBzOi8vbWlycm9yLmdocHJveHkuY29tL2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9CYXJhYmFtYS9GcmVlTm9kZXMvbWFzdGVyL25vZGVzL2trenVpLnR4dArorqLpmIXoioLngrk1Omh0dHBzOi8vbWlycm9yLmdocHJveHkuY29tL2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9CYXJhYmFtYS9GcmVlTm9kZXMvbWFzdGVyL25vZGVzL2JsdWVzLnR4dArkvb/nlKjku6PnkIYx77yaaHR0cHM6Ly9nZW9wcm94eS5pbgrkvb/nlKjku6PnkIYy77yaaHR0cHM6Ly9vcGVucHJveHlsaXN0LmNvbQrluLjop4TlrqLmiLfnq6/lj4rnp5Hmma7or7forr/pl67vvJpodHRwczovL3d3dy5ub2lzZWJsb2dzLnRvcC92cG4vCuaIlmh0dHBzOi8vd3d3LnYycmF5LmNvbS9hd2Vzb21lL3Rvb2xzLmh0bWwKUGFuZG9yYS1Cb3joh6rluKborqLpmIXnur/ot6/vvJpodHRwczovL2dpdGh1Yi5jb20vc25ha2VtOTgyL1BhbmRvcmEtQm94',
        'CANVA免费': 'Q2FudmEgcHJv5Zu96ZmF5YWN6LS55Zui6Zif54mICuacieabtOaWsOa4oOmBk+eahFRH6aKR6YGTMe+8mmh0dHBzOi8vdC5tZS9NYW5pVGVjaGlUZWNoCuacieabtOaWsOa4oOmBk+eahFRH6aKR6YGTMu+8mmh0dHBzOi8vdC5tZS9DYW52YXByb2ZyZWVzZQrlj6/nlKjlub/lkYrpk77mjqXliqDlhaXvvJpodHRwczovL2p1c3RjdXQuaW8vOEdIY1FYCuazqOaEj++8muivt+eVmeaEj+aXtumXtOWPmOWKqA==',
        'NAV扩展': 'TmF2LU1hbmFnZeaJqeWxleiOt+WPlu+8mlYx6ZO+5o6l77yaaHR0cHM6Ly9wYW4ucXVhcmsuY24vcy9jN2UwZDc4NjBkMjEK5LiL6L296Kej5Y6L5ZCO5byA5ZCv5byA5Y+R6ICF5qih5byP5YaN5a+85YWl5rWP6KeI5Zmo5a6J6KOF77yM5LiA6ZSu6YOo572y5ZCO56uv77yaaHR0cHM6Ly9naXRodWIuY29tL3JjeTEzMTQvbmF2LW1hbmFnZQ==',
        '你好': base64Encode('你好！很高兴见到你。'),
        '帮助': base64Encode('你可以输入 <span style="color: #ffbc00">help</span> 查看常规命令列表。'),
        '彩蛋': base64Encode('这是一个彩蛋版本！希望你喜欢！')
    };

    /* 命令历史 */
    let line = 0;
    let his = ['哈哈，你找到了。'];
    /* 命令行元素 */
    let container = document.getElementById('terminal');
    /* 初始路径和初始当前文件夹 */
    let route = '~';
    let folder = index;
    /* 命令定义 */
    let command = {
        'test': {
            'fun': test,
            'help': '用法: test [-a] [-b] [-c] [-h]<br>-a -b -c: 测试参数<br>-h: 显示帮助信息。',
            'parameters': ['-h', '-a', '-b', '-c'],
            'nap': 0
        },
        'cd': {
            'fun': cmcd,
            'help': '用法: cd [目录] [-h]<br>目录: 文件或文件夹的路径。<br>-h: 显示帮助信息。',
            'parameters': ['-h'],
            'nap': 1
        },
        'help': {
            'fun': cmhelp,
            'help': '',
            'parameters': [],
            'nap': 0
        },
        'visit': {
            'fun': cmvisit,
            'help': '用法: visit [网址] [-h]<br>网址: 要访问的网址。<br>-h: 显示帮助信息。',
            'parameters': ['-h'],
            'nap': 1
        },
        'douyin': {
            'fun': cmdouyin,
            'help': '用法: douyin [链接] [-h]<br>链接: 抖音/快手客户端分享连接、抖音Web直播连接。<br>-h: 显示帮助信息。',
            'parameters': ['-h'],
            'nap': 1
        },
        'AI': {
            'fun': aiResponse,
            'help': '用法: /AI [你的问题]',
            'parameters': [],
            'nap': 0
        }
    };
    /* 配置区尾 */
    
    function enter() {
        terminal.scrollTop = 10000;
        var event = window.event || event;
        if (event.keyCode == 13) {
            print(head.innerHTML + input.value);
            var com = input.value.split(' ').filter(i => i != '');
    
            // 检查以 / 开头的命令
            if (com[0].startsWith('/')) {
                const commandName = com[0].substring(1); // 去掉前面的 '/'
                if (commandName in command) {
                    command[commandName]['fun'](com.slice(1));
                } else {
                    print('未找到命令: ' + input.value, 'error');
                }
            } else if (keywordResponses[com[0]]) {
                // 解码Base64
                const response = base64Decode(keywordResponses[com[0]]);
                print(response, 'message');
            } else {
                print('未找到命令: ' + input.value, 'error');
            }
            update();
        } else if (event.keyCode == 38 && line > 0) {
            line -= 1;
            input.value = his[line];
        } else if (event.keyCode == 40 && line < his.length - 1) {
            line += 1;
            input.value = his[line];
        }
    }
    

    /* 打印内容 */
    function print(text, type = 'normal') {
        var p = document.createElement('p');
        p.innerHTML = text;
        p.className = type;
        context.appendChild(p);
    }

    /* 更新头部信息 */
    function update() {
        his.splice(his.length - 2, 0, input.value);
        head.innerHTML = headb + route + heada;
        line = his.length - 2;
        input.value = his[line];
        terminal.scrollTop = 10000;
    }

    /* 解析参数 */
    function analysis(array, com) {
        var parameters = command[com]['parameters'];
        var result = [];
        var arr = [];
        for (i in parameters) {
            result[i] = 0;
        }
        if (array[0] == undefined) {
            return false;
        }
        var num = command[com]['nap'];
        for (let i = 0; i < array.length; i++) {
            if (parameters.includes(array[i])) {
                result[parameters.indexOf(array[i])] = 1;
            } else if (0 != num) {
                num -= 1;
                arr[arr.length] = array[i];
            } else {
                print('未知参数: ' + array[i], 'error');
                return 'error';
            }
        }
        return [result, array];
    }

    /* 路径查找 */
    function find(rou) {
        if (rou.split('/')[0] in index) {
            if (rou[0] != '~') {
                rou = '~/' + rou;
            }
        } else {
            rou = route + '/' + rou;
        }
        var ind = index;
        var router = rou.split('/');
        for (var i = 1; i < router.length; i++) {
            if (router[i] in ind) {
                ind = ind[router[i]];
            } else {
                return [false, rou];
            }
        }
        return [ind, rou];
    }

    /* 遍历打印 */
    function printObj(obj, type = 'o') {
        var text = '';
        if (type == 'o') {
            for (i in obj) {
                text += i + '&nbsp;';
            }
        } else {
            for (i in obj) {
                console.log(obj[i]);
                text += obj[i] + '&nbsp;';
            }
        }
        return text;
    }

    /* 执行函数 */
    function test(text) {
        var result = analysis(text, 'test');
        if (result == false) {
            print('Hello, world!', 'italic');
        } else if (result != 'error') {
            if (result[0][0] == 1) {
                print(command['test']['help'], 'message');
            } else {
                print(printObj(result[0], 'a'), 'message');
            }
        }
    }

    function cmhelp(text) {
        var result = analysis(text, 'help');
        if (result == false) {
            print(printObj(command), 'message');
        }
    }

    function cmcd(text) {
        var res1 = analysis(text, 'cd');
        if (res1 == false) {
            route = '~';
            folder = index;
        } else if (res1 != 'error') {
            if (res1[0][0] == 1) {
                print(command['cd']['help'], 'message');
            } else {
                var res2 = find(res1[1][0]);
                if (res2[0] == false) {
                    print('没有这个文件或目录: ' + res2[1], 'error');
                } else if (typeof (res2[0]) == 'string') {
                    print('这是一个文件: ' + res2[1], 'error');
                } else {
                    route = res2[1];
                    folder = res2[0];
                }
            }
        }
    }

    function cmvisit(text) {
        var res1 = analysis(text, 'visit');
        if (res1[0] == -3) {
            print('没有提供参数', 'error');
        } else if (res1 != 'error') {
            if (res1[0][0] == 1) {
                print(command['visit']['help'], 'message');
            } else {
                var url = res1[1][0];
                print('正在访问网址: ' + url);
                window.open(url, '_blank');
            }
        }
    }

    function enter() {
        terminal.scrollTop = 10000;
        var event = window.event || event;
        if (event.keyCode == 13) {
            print(head.innerHTML + input.value);
            var com = input.value.split(' ').filter(i => i != '');
            if (com[0].startsWith('/')) {
                const commandName = com[0].substring(1); 
                if (commandName in command) {
                    command[commandName]['fun'](com.slice(1));
                } else {
                    print('未找到命令: ' + input.value, 'error');
                }
            } else if (com[0] in command) {          
                command[com[0]]['fun'](com.slice(1));
            } else if (keywordResponses[com[0]]) {
                const response = base64Decode(keywordResponses[com[0]]);
                print(response, 'message');
            } else {
                print('未找到命令: ' + input.value, 'error');
            }
            update();
        } else if (event.keyCode == 38 && line > 0) {
            line -= 1;
            input.value = his[line];
        } else if (event.keyCode == 40 && line < his.length - 1) {
            line += 1;
            input.value = his[line];
        }
    }
    
    
    function cmdouyin(text) {
        if (!text || text.length === 0) {
            print('没有提供参数', 'error');
            return;
        }
    
        // 合并输入数组为单个字符串
        var inputText = text.join(' ');
    
        // 正则表达式匹配 Douyin 链接
        var douyinLinkRegex = /https:\/\/v\.douyin\.com\/[^\s]+/;
        var match = inputText.match(douyinLinkRegex);
    
        if (!match) {
            print('未找到有效的抖音链接', 'error');
            return;
        }
    
        var url = match[0]; // 提取到的抖音链接
        print('识别到的抖音链接: ' + url);
    
        // 构建 API 请求 URL
        var apiUrl = 'https://api.pearktrue.cn/api/video/douyin?url=' + encodeURIComponent(url);
        print('正在获取抖音视频: ' + apiUrl);
    
        fetch(apiUrl, {
            method: 'GET', // 使用 GET 请求
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
    

    /* AI 响应函数 */
    function decryptApiKey(encryptedKey, passphrase) {
        const decrypted = CryptoJS.AES.decrypt(encryptedKey, passphrase);
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    
    // 使用解密后的 API 密钥
    async function aiResponse(text) {
        if (text.length === 0) {
            print("请问你想问什么？", 'message');
            return;
        }
        
        const userInput = text.join(' ');
        print("正在获取AI回复...", 'message');
    
        // 解密 API 密钥
        const encryptedApiKey = 'U2FsdGVkX19nRs3Jonb49td5o0TW/nlkM1K2HV48yWRKCjquQ1NrDmjdmf6V6Se6YyQ0Mw1DJNCG5u46hKGHsPvWsYOn5Ie+d0zIKK2qVwY=';
        const passphrase = 'rcy1314';
        const apiKey = decryptApiKey(encryptedApiKey, passphrase);
    
        const apiUrl = 'https://www.noiseapi.top/v1/chat/completions';
    
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // 或者使用其他模型
                messages: [{ role: 'user', content: userInput }]
            })
        });
    
        if (!response.ok) {
            print('AI 请求失败: ' + response.statusText, 'error');
            return;
        }
    
        const data = await response.json();
        const aiReply = data.choices[0].message.content;
        print(aiReply, 'message');
    }
    

    /* 初始化 */
    let headb = '[<span class="g">guest</span>@浏览器<span class="b">';
    let heada = '</span>]<span class="d">$</span> ';
    let terminal = document.createElement('div');
    terminal.className = 'terminal';
    let context = document.createElement('div');
    context.className = 'context';
    let head = document.createElement('span');
    head.className = 'head';
    head.innerHTML = '错误';
    let input = document.createElement('input');
    input.className = 'input';
    input.onkeydown = enter;
    terminal.appendChild(context);
    terminal.appendChild(head);
    terminal.appendChild(input);
    container.appendChild(terminal);
    update();
    print("欢迎来到模拟终端！（彩蛋版本 :2.2）", 'warning');
    print('输入 <span style="color: #ffbc00">help</span> 查看常规命令列表。增加输入 <span style="color: #ffbc00">关键词</span> 可查看指定关键词回复列表，输入 <span style="color: #ffbc00">douyin（必须有空格）视频地址</span> 可解析该视频。输入 <span style="color: #ffbc00">/AI（必须为大写且有空格）你的问题</span> 可进行AI问答，输入 <span style="color: #ffbc00">visit 空格 网址</span> 可前往该地址（必须包含https://）', 'warning');
})();
