## 使用配置文档

![1722256547263](https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/1722256547263.png)

  


配置请访问：https://docs.noisework.cn

[GitHub](https://github.com/rcy1314/noisework-docs)

## 说明

js及css已本地化，根据功能分类，请勿合并，觉得加载过慢再合并或套用CDN

需要主题模版请[下载](https://github.com/rcy1314/noisework/releases)

## 更新

- 8.20-调整首页头像右下角图标为切换背景前景的控制按钮
- 8.19-调整home页背景及切换逻辑，去除多余的css
- 增加home页面手机尺寸下对背景图的切换控制
- 8.18-调整home页组件css类名称及首页时钟样式
- 调整优化载入音效播放逻辑，在页面退出后才会再触发
- 增加home页监听某些组件功能，请求失败时自动隐藏失效组件
- 24.8.16-增加页面全局音效，包含鼠标点击及指定元素音效
- 24.8.15-修复home页手机尺寸下背景图片挤压情况【手机端背景图参考尺寸：736 × 1308】，增加向下滑动提示
- 优化首页模块视觉效果，调整网站模块滑动缩放
- 24.8.14-增加首页图片未加载时的背景底色，使其载入过渡更自然
- 调整修复首页点击及右键全局弹出图片效果，再点击可关闭图片
- 24.8.13-调整home页头像部分为动态可切换效果，增加标题处打字机效果文字
- 24.8.12-调整home页侧边背景布局效果（解决元素居中问题）
- 24.8.11-添加home页侧边视频播放效果组件
- 24.8.07更改抖音去水印接口，修改摸鱼日历API
- 24.7.27-添加home页手机尺寸侧边弹出栏
- 23.12.29-添加右键菜单【Right.js，Right.css】
- 添加聊天室组件【emb.js】https://noise.zhubai.love/posts/2212598888907571200
- 添加图标引用：https://fontawesome.com
- 添加loading载入效果【loading.css;loading.js]
- 添加随机背景+随机前景【suiji-picture.js】
- 添加主页问候提醒弹窗【时间分类】
- 添加侧边圈形按钮菜单【tb.css;tab.js】
- 更新双击头像终端菜单【引入抖音、tiktok去水印下载命令】
- 引入PWA【service-worker.js】
- 更换切换风格页【home.html】
- 添加广告位图文弹窗，自动轮询播放，点击可关闭，仅在电脑端尺寸下显示【AD.css;AD.js】
- 添加弹入弹出式侧边文字【Text.css;Text.js】
- 更新公共服务页【增加单页播放室、N8N实例、RSSHUB实例】
- 添加手机端向下滑动提示
- 修改主界面css布局
- 添加RSS信息动态展示,手机端尺寸不显示【rss.css;rss.js】
- 添加隐藏式数字时钟及隐藏式底部页脚

## 清除PWA缓存

添加了两个缓存方案

1、service-worker.js文件内更换cacheName版本号会自动清除上个版本设置的缓存文件

2、主页index.html文件内，找到注释<!-- 添加版本号-每次更新要改版本号才会刷新缓存 -->更新下面自己设置缓存的文件的版本号

3、清除本地浏览器缓存

## 预览

### 首页

![666](https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/666.png)

### home页

![777](https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/777.png)



![home-2](https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/home-2.png)

<details>
<summary>✅ 【点击展开】</summary>

![233](https://jsd.cdn.noisework.cn/gh/rcy1314/tuchuang@main/uPic/233.png)
