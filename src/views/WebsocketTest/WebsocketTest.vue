<template>
    <div id="websocket_test">
        <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="message">
        </el-input>
        <el-button @click="openWebSocket">打开连接</el-button>
        <el-button @click="sendMessage">发送消息</el-button>
        <el-button @click="closeWebSocket">关闭连接</el-button>
    </div>
</template>

<script>
import {Component, Vue} from "vue-property-decorator";

@Component({
    name: 'WebsocketTest'
})
export default class WebsocketTest extends Vue {

    message = '';
    /** websocket对象 */
    ws = null;
    /** 是否手动关闭 */
    close = false;
    /** 心跳检测状态值 */
    pingPong = '';
    pingInterval = null;
    pongInterval = null;

    mounted() {
    }

    openWebSocket() {
        if (window.WebSocket) {
            if (!this.ws) {
                this.ws = new WebSocket('ws://localhost:8666');
            }

            // 成功
            this.ws.onopen = function (e) {
                console.log("websocket连接成功！");
                // this.heartCheck();
            }
            // 关闭
            this.ws.onclose = this.closeHandle;
            // 连接出错
            this.ws.onerror = this.closeHandle;
            // 接收服务器的消息
            this.ws.onmessage = this.receiveMessage;
        }
    }

    sendMessage() {
        if (!this.message) {
            this.$message.warning('请输入消息内容！');
            return;
        }
        console.log(this.ws ? this.ws.readyState : '');
        if (this.ws && this.ws.readyState === 1) {
            this.ws.send(this.message);
        }
        // readyState
        // 0 表示正在连接
        // 1 表示连接成功，可以通信
        // 2 表示连接正在关闭
        // 3 表示连接已经关闭，或者打开连接失败
    }

    /**
     * 心跳检测
     */
    heartCheck() {
        this.pingPong = 'ping';
        this.pingInterval = setInterval(() => {
            if (this.ws && this.ws.readyState === 1) {
                // 客户端发送ping
                this.ws.send('ping');
            }
        }, 10000)
        this.pongInterval = setInterval(() => {
            // 没有返回pong 重连webSocket
            if (this.pingPong === 'ping') {
                this.closeHandle('pingPong没有改变为pong');
            }
            // 重置ping 未返回pong重连
            this.pingPong = 'ping'
        }, 20000)
    }

    receiveMessage(e) {
        console.log(e.data, 3344);
        // 服务器端返回pong,修改pingPong的状态
        if (e.data === 'pong') {
            this.pingPong = 'pong';
        }
    }

    closeHandle(e) {
        console.log('处理关闭或出错');
        if (!this.close) {
            if (this.pingInterval && this.pongInterval) {
                clearInterval(this.pingInterval);
                clearInterval(this.pongInterval);
                this.pingInterval = null;
                this.pongInterval = null;
            }

            this.ws = null;
            // 重连websocket
            this.openWebSocket();
        } else {
            // 手动关闭
        }
    }

    /**
     * 手动关闭
     */
    closeWebSocket() {
        this.close = true;
        this.ws.close();
        this.ws = null;
    }

}
</script>

<style scoped>
#websocket_test {
    width: 100%;
    height: 100%;
}
</style>
