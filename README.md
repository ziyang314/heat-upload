# codeTest

使用时方法：
```
HeatUpload({
    workerSrc: '/static/wk.js',                       // worker文件地址，worker文件在dist目录中，请拷到项目静态文件夹中
    uploadUrl: 'http://example.com/api',              // 接收数据的接口
    container: 'body',                                // 监听点击事件的容器，位于此容器内的点击事件才会上报，可填写‘#id’之类
    interval: 10000,                                  // 上报间隔，每10秒上报一次
    uploadCount: 5,                                   // 每次上报条数
});
```