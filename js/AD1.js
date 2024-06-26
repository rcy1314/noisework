function addDynamicContent() {
  var css = `
      .studytextgzbox {
        background:   #F9F9F9; 
        border: 1px solid #999999;
        margin: 1px;
        text-align:center;  
        float: left;
        line-height: 18px;
        height: 18px;
        overflow: hidden;
        width: 206px;
      }
      .zzbuluoled:after {
          content: ".";
          display: block;
          height: 0;
          clear: both;
          visibility: hidden;
      }
      @media (max-width: 568px) {
          .zzbuluoled {
              display: none;
          }
      }
  `;
  var style = document.createElement("style");
  style.type = 'text/css';
  style.innerHTML = css;
  document.head.appendChild(style);


  var html = `
      <div class="wp zzbuluoled" style="margin-top:0px;">   
          <div style="background:url('https://jsd.cdn.zzko.cn/gh/rcy1314/tuchuang@main/uPic/222.png'); text-align: center; height:80px; border: 0px solid #E8EFF5;">
              <div id="zzbuluoled_sx" style="width:auto;overflow:hidden;height:80px;line-height:80px;text-align:left;">
                  <div id="zzbuluoled_sx1">
                      <p style="padding:0px 10px 0px 16px;vertical-align:middle;height:80px;overflow:hidden;">
                          <marquee direction="lelf" scrollamount="5">
                              <strong>
                              <a href="https://hk.yunhaoka.cn/#/pages/micro_store/index?agent_id=422648" target="_black" >
                              <span style="font-family: 'Tahoma';font-weight:900; color: #FF0000; font-size: 30px;line-height:80px;">👏欢迎访问本站，点击可查看👉
                              </span>
                              </a>   
                                  <a href="https://simhaoka.com/phone/index?id=A7BA17EFD6DC47F6826F0C67B898725A" target="_black" >
                              <span style="font-family: 'Tahoma';font-weight:900; color: #33a4e5; font-size: 30px;line-height:80px;">📢①：全国正规流量手机卡优惠渠道一
                              </span>
                              </a>
                                  <a href="https://hk.yunhaoka.cn/#/pages/micro_store/index?agent_id=422648" target="_black" >
                                      <span style="font-family: 'Tahoma';font-weight:900; color: #e56e33; font-size: 30px;line-height:80px;">📢②：全国正规流量手机卡优惠渠道二
                                      </span>
                                      </a>
                                      <a href="https://sourl.cn/teYqxt" target="_black" >
                                          <span style="font-family: 'Tahoma';font-weight:900; color: #b333e5ce; font-size: 30px;line-height:80px;">📢③：夸克云盘内部合作联系方式
                                          </span>
                                          </a>
                                  <a href="https://simhaoka.com/pc/index?id=A7BA17EFD6DC47F6826F0C67B898725A" target="_black" >
                              <span style="font-family: 'Tahoma';font-weight:900; color: #FFFFFF; font-size: 30px;line-height:80px;">  公告已更新，欢迎随时回来👏
                              </span>
                              </a>
                              </strong>
                          </marquee>
                      </p>
                  </div>
              </div>
          </div>
      </div>
  `;
  var container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);

  jQuery(function() {
      var masonryContainer = jQuery('#masonry');
      masonryContainer.imagesLoaded(function() {
          masonryContainer.masonry({
              itemSelector: '.studytextgzbox',
              gutter: 0,
              isAnimated: true,
          });
      });
  });
}

addDynamicContent();