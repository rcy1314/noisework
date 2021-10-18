/*
 * @xkx
 */
$(() => {
    /* 临时粘贴上传 */
    $(document).on('paste', event => {
        let clipboardData = event.clipboardData || window.clipboardData || event.originalEvent.clipboardData;
        /* 判断是否支持粘贴上传 */
        if (!clipboardData || !clipboardData.items) return alert('当前浏览器不支持粘贴上传');
        let items = clipboardData.items;
        let file = null;
        /* 判断剪切板的内容是否是桌面类型的文件 */
        if (items.length === 0) return alert('剪切板内无内容或不支持桌面文件');
        /* 开始循环剪切板的内容，判断是否是文件类型，如果是文件类型，则push */
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                file = items[i].getAsFile();
            }
        }
        if (!file) return alert('剪切板内无内容或不支持桌面文件');
        upload(new Array(file));
    });
    /* 点击上传 */
    $('.upload .content').on('click', function () {
        $('#file').click();
    });
    /* 监听点击上传 */
    $('#file').on('change', () => {
        upload($('#file')[0].files);
    });
    /* 拖拽上传 */
    $('#dragbox').on('dragover', e => {
        e.preventDefault();
    });
    $('#dragbox').on('dragenter', e => {
        e.preventDefault();
        $('.upload').addClass('dragenter');
    });
    $('#dragbox').on('dragleave', e => {
        e.preventDefault();
        $('.upload').removeClass('dragenter');
    });
    $('#dragbox').on('drop', e => {
        e.preventDefault();
        $('.upload').removeClass('dragenter');
        let files = e.originalEvent.dataTransfer.files;
        upload(files);
    });
    /* 上传函数 */
    function upload(files) {
        //if ($('#type').val().trim() === '') return alert('请输入');
        for (let i = 0; i < files.length; i++) {
            var animateimg = files[i].name;
 	        var imgarr=animateimg.split('\\');
 	        var myimg=imgarr[imgarr.length-1];
            var houzui = myimg.lastIndexOf('.');
 	        var ext = myimg.substring(houzui, myimg.length).toUpperCase();  
 	        var file = files[i];
 	        if(!file){return false;}
 	        var fileSize = file.size;
            var maxSize = 5242880;
            if(ext !='.PNG' && ext !='.GIF' && ext !='.JPG' && ext !='.JPEG' && ext !='.BMP'){  
 		        parent.alert('文件类型错误,请上传图片类型');
 		        $('#file').val(null);return false;  
 	        }else if(parseInt(fileSize) >= parseInt(maxSize)){  
 		        parent.alert('上传的文件不能超过'+maxSize/1024/1024+'MB');return false;  
 	        }else{
 	        document.querySelector('.container').classList.add('start')
 	        var type = $('#type').val();
 	        if(type =='qihoo'|type =='muke'|type =='gtimg'|type =='catbox'|type =='vxichina'){var api = 'https://www.hualigs.cn/api/upload?token=8ff730a4dc52360c26854111c794742b&apiType='}else{var api = 'https://image.kieng.cn/upload.html?type='};
            let formData = new FormData();
            formData.append('image', files[i]);
            let randomClass = Date.now().toString(36);
            $('.filelist .list').append(`
                <div class="item ${randomClass}">
                    <div class="file">
                        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M961.536 531.251c-0.614-3.481-1.843-7.168-3.891-10.445L827.392 306.79v-28.876c0-10.445 0-20.276 0.205-29.901 0.819-89.703 1.433-174.285-101.376-179.2H303.923c-33.587 0-58.368 8.601-76.185 26.624-30.72 30.925-30.31 79.257-29.696 140.288 0 8.601 0.204 17.408 0.204 26.419v38.093c-2.867 2.253-5.324 4.915-7.168 8.192L64.717 523.879c-1.639 2.867-2.663 5.734-3.277 8.806-6.144 12.288-9.626 26.01-9.626 40.345v290.407c0 50.585 41.984 91.75 93.594 91.75h733.184c51.61 0 93.594-41.165 93.594-91.75V573.03c-0.205-14.95-4.096-29.286-10.65-41.779zM861.389 481.28h-33.997v-55.91l33.997 55.91zM271.565 138.65c5.53-5.53 16.384-8.397 32.358-8.397h420.045c36.25 1.843 42.803 11.264 41.78 117.145 0 9.83-0.206 19.866-0.206 30.516V481.28H664.576c-16.998 0-30.925 13.722-30.925 30.925 0 64.307-54.681 116.736-122.06 116.736S389.53 576.512 389.53 512.205c0-16.999-13.722-30.925-30.925-30.925H259.89V262.144c0-9.42 0-18.432-0.205-27.034-0.41-43.008-0.819-83.558 11.879-96.46z m-73.523 279.552v63.078h-36.864l36.864-63.078z m712.294 445.44c0 16.179-14.54 30.105-31.949 30.105H145.203c-17.203 0-31.949-13.721-31.949-30.105V573.03c0-16.179 14.541-30.105 31.95-30.105h185.548c15.155 83.763 90.522 147.456 181.043 147.456s165.888-63.898 181.043-147.456h185.55c17.202 0 31.948 13.721 31.948 30.105v290.612z" p-id="14163" fill="#909399"></path>
                            <path d="M385.638 278.528H655.77c16.998 0 30.924-13.722 30.924-30.925s-13.721-30.925-30.924-30.925H385.638c-16.998 0-30.924 13.722-30.924 30.925s13.926 30.925 30.924 30.925z m-30.924 70.451c0 16.999 13.721 30.925 30.924 30.925H655.77c16.998 0 30.924-13.722 30.924-30.925 0-17.203-13.721-30.925-30.924-30.925H385.638c-16.998 0-30.924 13.927-30.924 30.925z" p-id="14164" fill="#909399"></path>
                        </svg>
                        <div class="desc">
                            <div class="desc__name">${files[i].name}</div>
                            <div class="desc__size">SIZE:${formatBytes(files[i].size)}</div>
                        </div>
                        <a href="javascript: void(0);" class="link">
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M82.603621 941.396379A280.234044 280.234044 0 0 1 0.001138 742.001267a280.063378 280.063378 0 0 1 82.659372-199.110669l145.919675-145.919676a46.535008 46.535008 0 0 1 65.820299 0 46.535008 46.535008 0 0 1 0 65.820298L148.480808 608.710896a187.732916 187.732916 0 0 0-55.352766 133.574814 187.732916 187.732916 0 0 0 55.352766 133.517926 187.732916 187.732916 0 0 0 133.574814 55.352766A187.732916 187.732916 0 0 0 415.289104 875.519192l145.919676-145.919676a46.535008 46.535008 0 0 1 65.820298 0 46.535008 46.535008 0 0 1 0 65.820299l-145.862787 145.919675A280.347821 280.347821 0 0 1 281.998733 1023.998862a280.120266 280.120266 0 0 1-199.395112-82.602483z m292.408239-292.465128a46.42123 46.42123 0 0 1 0-65.820298l208.099093-208.042204a46.478119 46.478119 0 0 1 65.820298 0 46.535008 46.535008 0 0 1 0 65.820298l-208.099093 208.042204a46.42123 46.42123 0 0 1-32.938593 13.653303 46.307453 46.307453 0 0 1-32.824816-13.653303z m354.587656-21.674618a46.535008 46.535008 0 0 1 0-65.820298L875.576081 415.289104a187.732916 187.732916 0 0 0 55.352766-133.517926 187.732916 187.732916 0 0 0-55.352766-133.517925 187.732916 187.732916 0 0 0-133.574814-55.352766 187.334695 187.334695 0 0 0-133.517926 55.352766L462.506777 294.172929a46.591896 46.591896 0 0 1-65.820299 0 46.591896 46.591896 0 0 1 0-65.820299l145.976565-145.919675A279.9496 279.9496 0 0 1 742.001267 0.001138a280.120266 280.120266 0 0 1 199.110668 82.602483A280.290933 280.290933 0 0 1 1023.998862 281.998733a280.120266 280.120266 0 0 1-82.602483 199.110669l-145.919676 145.919676a46.42123 46.42123 0 0 1-32.881704 13.596414 46.535008 46.535008 0 0 1-32.938594-13.368859z" p-id="8129" fill="#909399"></path>
                            </svg>
                        </a>
						<a title="删除" href="#" class="link" onclick="del(this);return false;">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50.13 50.13" style="enable-background:new 0 0 50.13 50.13;" xml:space="preserve">
								<g>
								<path style="fill:#010002;" d="M4.574,13.902h40.982c0.345,0,0.625-0.28,0.625-0.625V8.952c0-0.345-0.28-0.625-0.625-0.625H33.315		V0.625C33.315,0.28,33.035,0,32.69,0H17.442c-0.345,0-0.625,0.28-0.625,0.625v7.702H4.574c-0.345,0-0.625,0.28-0.625,0.625v4.325 C3.949,13.622,4.23,13.902,4.574,13.902z M5.199,9.577h12.242c0.345,0,0.625-0.28,0.625-0.625V1.25h13.998v7.702		c0,0.345,0.28,0.625,0.625,0.625h12.242v3.075H5.199V9.577z"/>
								<path style="fill:#010002;" d="M11.006,18.06H7.17c-0.345,0-0.625,0.28-0.625,0.625v30.82c0,0.345,0.28,0.625,0.625,0.625h35.791	c0.345,0,0.625-0.28,0.625-0.625v-30.82c0-0.345-0.28-0.625-0.625-0.625h-3.836c-0.345,0-0.625,0.28-0.625,0.625v24.68h-2.537	v-24.68c0-0.345-0.28-0.625-0.625-0.625h-4.324c-0.345,0-0.625,0.28-0.625,0.625v24.68h-2.535v-24.68	c0-0.345-0.28-0.625-0.625-0.625h-4.324c-0.345,0-0.625,0.28-0.625,0.625v24.68h-2.537v-24.68c0-0.345-0.28-0.625-0.625-0.625	h-4.325c-0.345,0-0.625,0.28-0.625,0.625v24.68h-2.537v-24.68C11.631,18.34,11.351,18.06,11.006,18.06z M14.793,44.614	c0.345,0,0.625-0.28,0.625-0.625V19.31h3.074v24.68c0,0.345,0.28,0.625,0.625,0.625h3.787c0.345,0,0.625-0.28,0.625-0.625V19.31	h3.074v24.68c0,0.345,0.28,0.625,0.625,0.625h3.785c0.345,0,0.625-0.28,0.625-0.625V19.31h3.074v24.68	c0,0.345,0.28,0.625,0.625,0.625h3.787c0.345,0,0.625-0.28,0.625-0.625V19.31h2.586v29.57H7.795V19.31h2.586v24.68 c0,0.345,0.28,0.625,0.625,0.625L14.793,44.614L14.793,44.614z"/>
								</g>
								</svg>
                        </a>
                    </div>
                    <div class="progress">
                        <div class="progress-bar">
                            <div class="progress-inner"></div>
                        </div>
                        <div class="progress-status">
                            <svg class="icon status-success" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M310.710857 768.292571z m402.578286 0z" p-id="11696" fill="#67C23A"></path>
                                <path d="M512 0C229.376 0 0 229.376 0 512S229.376 1024 512 1024 1024 794.624 1024 512 794.624 0 512 0z m300.178286 373.321143l-354.011429 354.011428c-21.065143 21.065143-55.588571 21.065143-76.653714 0l-169.691429-169.106285c-21.065143-21.065143-21.065143-55.588571 0-76.653715 21.065143-21.065143 55.588571-21.065143 76.653715 0l131.072 131.072 315.392-315.392c21.065143-21.065143 55.588571-21.065143 76.653714 0 21.650286 20.48 21.650286 55.003429 0.585143 76.068572z" p-id="11697" fill="#67C23A"></path>
                            </svg>
                            <svg class="icon status-error" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M733.678921 290.121702c22.43209 22.531789 22.43209 58.921624 0 81.353714L593.403583 511.850453 733.678921 652.125791c20.537825 20.537825 22.531789 53.13913 4.785513 76.069711l-4.785513 5.4834c-22.531789 22.531789-58.921624 22.531789-81.453412 0L511.95017 593.204167 371.674832 733.579204c-20.537825 20.537825-53.13913 22.531789-76.069711 4.785512l-5.383702-4.785512c-22.531789-22.531789-22.531789-58.921624 0-81.453413l140.275339-140.275338L290.321118 371.674813c-20.637523-20.537825-22.731185-53.13913-4.885211-76.169409l4.785512-5.383702c22.531789-22.43209 58.921624-22.43209 81.353715 0l140.275338 140.17564L652.225509 290.121702c20.537825-20.537825 53.039431-22.531789 75.970012-4.785513l5.4834 4.785513zM0.000019 511.850453c0 282.744037 229.206114 511.950151 511.950151 511.950151s511.950151-229.206114 511.950151-511.950151S794.694207 0 511.95017 0 0.000019 229.206114 0.000019 511.850453z" p-id="14360" fill="#F56C6C"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="result" style="display:none">
                    <input value="" id="Imgs_url" >URL</input>
				    <input value="" id="Imgs_html">HTML</input>
				    <input value="" id="Imgs_Ubb">BBCode</input>
				    <input value="" id="Imgs_markdown">Markdown</input>
                    </div>
                    <input id="show" name="show" onclick="oCopy(this)" type="text" value="" readonly style="display:none">
                </div>
            `);
            $.ajax({
                url: api + $('#type').val(),
                type: 'post',
                dataType: 'json',
                processData: false,
                contentType: false,
                
                data: formData,
                xhr: () => {
                    let xhr = $.ajaxSettings.xhr();
                    if (!xhr.upload) return;
                    xhr.upload.addEventListener(
                        'progress',
                        e => {
                            let percent = Math.floor((e.loaded / e.total) * 100);
                            $('.' + randomClass)
                                .find('.progress-inner')
                                .css('width', percent + '%');
                        },
                        false
                    );
                    return xhr;
                },
                success: res => {
                    if(type =='muke'){var imgSrc = res.data.url.muke}else if(type =='vxichina'){var imgSrc = res.data.url.vxichina}else if(type =='qihoo'){ var imgSrc = res.data.url.qihoo}else if(type =='catbox'){var imgSrc = res.data.url.catbox}else if(type =='gtimg'){var imgSrc = res.data.url.gtimg}else{var imgSrc = res.data.url}
                    /* 清除input框 */
                    $('#file').val(null);
                    if (res.code === -1) {
                        $('.' + randomClass).fadeOut();
                        alert(res.data.url);
                    } else {
                        if (res.code === 200) {
                            $('.' + randomClass)
                                .find('.progress-inner')
                                .addClass('success');
                            $('.' + randomClass)
                                .find('.status-success')
                                .show();
                            $('.' + randomClass)
                                .find('.link')
                                .attr({
                                    href: imgSrc,
                                    target: '_blank'
                                });
                            //代码链接xkx
                            $('.' + randomClass)
                                .find('#Imgs_url')
                                .attr({
                                    value: imgSrc
                                }); 
                            $('.' + randomClass)
                                .find('#Imgs_html')
                                .attr({
                                    value: '<img src="'+imgSrc+'"/>'
                                }); 
                            $('.' + randomClass)
                                .find('#Imgs_Ubb')
                                .attr({
                                    value: '[img]'+imgSrc+'[/img]'
                                }); 
                            $('.' + randomClass)
                                .find('#Imgs_markdown')
                                .attr({
                                    value: '![]('+imgSrc+')'
                                });
                            //显示链接xkx
                            $('.' + randomClass)
                                .find('#show')
                                .show();
                            $('.' + randomClass)
                                .find('#show')
                                .attr({
                                    value: imgSrc
                                });
                            //复制所有xkx
                            $('.copyall')
                                .show();
                            var tt = $('.filelist .title').html().replace('上传列表', '');
                            $('.filelist .title').html(tt);
                        } else {
                            $('.' + randomClass)
                                .find('.progress-inner')
                                .addClass('error');
                            $('.' + randomClass)
                                .find('.status-error')
                                .show();
                            $('.' + randomClass)
                                .find('#show')
                                .show();
                            $('.' + randomClass)
                                .find('#show')
                                .attr({
                                    value: "上传出错！"
                                });
                        }
                    }
                },
                fail: () => {
                    $('.' + randomClass).fadeOut();
                }
            });
 	        }
        }
    }
    /* 获取文件大小 */
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
    }
});
function del(obj){
	var item = obj.parentNode.parentNode;
	item.parentNode.removeChild(item);
}
function sel(obj){
	for(var i=0;i<document.querySelectorAll('#Imgs'+obj.id).length;i++){; 
		document.querySelectorAll('#Imgs'+obj.id)[i].parentElement.nextElementSibling.value = document.querySelectorAll('#Imgs'+obj.id)[i].value;
	}
}
function copyAll(obj){
	var xkx = "";
	for(var i=0;i<document.querySelectorAll('#show').length;i++){; 
		var xkx = xkx + document.querySelectorAll('#show')[i].value + '\n';
	}
	var txa = document.createElement('textarea');
	txa.value = xkx;
    document.body.appendChild(txa);
	txa.select();
	var res = document.execCommand('copy');
	document.body.removeChild(txa);
	console.log('copy success');
	console.log(xkx);
	if (browserRedirect()) {alert('设备类型为手机，有一定几率复制失败！请查看剪切板是否成功复制');}
}
function oCopy(obj){
	obj.select();
	document.execCommand("Copy");
	console.log(obj.value);
	if (browserRedirect()) {alert('设备类型为手机，有一定几率复制失败！请查看剪切板是否成功复制');}
}
function browserRedirect(){
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
   	var bIsIphone = sUserAgent.match(/iphone os/i) == 'iphone os';
   	var bIsMidp = sUserAgent.match(/midp/i) == 'midp';
   	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
   	var bIsUc = sUserAgent.match(/ucweb/i) == 'web';
   	var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
   	var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
   	var bIsAndroid = sUserAgent.match(/android/i) == 'android';
   	if(bIsIpad || bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsCE || bIsWM || bIsAndroid ){
 	    return 1;}
}