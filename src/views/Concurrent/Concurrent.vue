<template>
    <div id="Concurrent">
        <el-button type="primary" @click="send">开始请求</el-button>
        <el-button type="danger" @click="stop">停止</el-button>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import {Component, Model, Prop, Vue, Watch} from "vue-property-decorator";
import {CancelTokenSource} from "axios";

class Request {
    url: string = '';
    source: CancelTokenSource | undefined;
}

/**
 * 并发处理
 *
 * @author zys
 * @since
 */
@Component({
    name: "Concurrent",
    watch: {}
})
export default class Concurrent extends Vue {

    maxConcurrentNum = 10;
    requestData: Request[] = [];

    mounted() {
    }

    chunk(arr: Request[], chunk: number) {
        let result = [];
        for (let i = 0, len = arr.length; i < len; i += chunk) {
            result.push(arr.slice(i, i + chunk));
        }
        return result;
    }

    // Promise.all
    async send() {
        // axios.CancelToken.source()
        this.requestData = Array(50).fill('').map((val, index) => {
            return Object.assign(new Request(), {url: `url${index+1}`, source: axios.CancelToken.source()});
        });
        const chunkedRequestData: Request[][] = this.chunk(this.requestData, this.maxConcurrentNum);

        for (let requestGroup of chunkedRequestData) {
            const requests = requestGroup
                .map(val => this.$allApi.getUsers({}, (val.source as CancelTokenSource).token));
            try {
                const results = await Promise.all(requests);
                console.log('results:', results);
            } catch (e) {
                console.log('error：', e);
            }
        }
    }

    stop() {
        this.requestData.forEach(val => {
            (val.source as CancelTokenSource).cancel('');
        })
    }

}
</script>

<style scoped lang="less">
#Concurrent {
    height: 100%;
    width: 100%;
}
</style>
