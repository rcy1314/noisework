// worker.js
onmessage = function(event) {
    // 加载多个依赖
    importScripts('suiji-picture.js', 'home-script.js', 'main.js');

    // 这里可以进行长时间运行的计算
    var data = doSomeComplexCalculation(event.data);
    postMessage(data); // 将结果发送回主线程
};

function doSomeComplexCalculation(input) {
    // 示例计算
    var result = input * 2;
    return result;
}
