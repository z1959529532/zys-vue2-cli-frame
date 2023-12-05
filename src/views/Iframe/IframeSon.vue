<template>
    <div id="IframeSon">
        <div id="message">老板：{{ message.data }}</div>
        <el-button type="primary"
                   size="mini" style="position: absolute;bottom: 10px;right: 10px"
                   @click="reply">回复
        </el-button>
    </div>
</template>

<script lang="ts">
import {Component, Model, Prop, Vue, Watch} from "vue-property-decorator";

class TestData {
    data: string = '';
    type: string = '';
    parentUrl: string = '';
}

/**
 * iframe子组件
 *
 * @author zys
 * @since
 */
@Component({
    name: "IframeSon",
    watch: {}
})
export default class IframeSon extends Vue {

    message = new TestData();

    create() {
    }

    mounted() {
        window.addEventListener("message", (e) => {
            if (e.data?.type && e.data.type == 'zys') {
                this.message = e.data;
                this.showGreet(e.data.data);
            }
        })
    }

    showGreet(data: string) {
        this.message.data = data;
    }

    reply() {
        // 非跨域
        // window.parent.showReply()
        // window.top
        // 跨域
        window.parent.postMessage(
            {data: '好的', type: 'zys', parentUrl: ''},
            this.message.parentUrl
            // '*'
        )
    }

}
</script>

<style scoped lang="less">
#IframeSon {
    height: 100%;
    width: 100%;
}
</style>
