const ws = require("nodejs-websocket");
console.log("开始建立连接...")

const socket = ws.createServer(function(conn){
    conn.on("text", function (str) {
        console.log(str, 1122);
        // setInterval(() => {
        //     conn.sendText('哈哈哈');
        // }, 3000);

        conn.sendText('请问，有什么问题吗？');
    })
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭", code, reason)
    });
}).listen(8666)
console.log("WebSocket建立完毕")

// module.exports = socket

