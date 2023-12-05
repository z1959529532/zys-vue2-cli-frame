<template>
    <div id="IframeParent">
        <el-button type="primary"
                   size="mini"
                   @click="showIframe">iframe显示子页面
        </el-button>
        <iframe id="ifr"
                ref="ifr"
                class="ifr"
                :src="iframeUrl"
                frameborder="0" style="width: 100%;height: 80%"></iframe>
<!--        <el-dialog :visible="showDialog"-->
<!--                   v-dialog-drag-->
<!--                   title="弹窗"-->
<!--                   :modal="false"-->
<!--                   @close="showDialog=false">-->
<!--            <iframe id="ifr"-->
<!--                    ref="ifr"-->
<!--                    class="ifr"-->
<!--                    :src="iframeUrl"-->
<!--                    frameborder="0" scrolling="no" style="width: 100%"></iframe>-->
<!--        </el-dialog>-->
    </div>
</template>

<script lang="ts">
import {Component, Model, Prop, Vue, Watch} from "vue-property-decorator";
import IframeSon from "./IframeSon.vue";

/**
 * iframe父组件
 *
 * @author zys
 * @since
 */
@Component({
    name: "IframeParent",
    watch: {},
    components: {
        IframeSon
    }
})
export default class IframeParent extends Vue {

    showDialog = false;
    iframeUrl = '';

    create() {
    }

    mounted() {
        window.addEventListener("message", (e) => {
            if (e.data?.type && e.data.type == 'zys') {
                this.showReply(e.data.data);
            }
        });
    }

    showIframe() {
        this.showDialog = true;
        this.iframeUrl = 'https://juejin.cn/';

        // this.iframeUrl = location.origin + `/#/iframeSon`;
        // this.$nextTick(() => {
        //     const iframe = document.getElementById('ifr') as any;
        //     // iframe.contentWindow.location.reload();
        //     iframe.onload = () => {
        //         // 非跨域
        //         // iframe.contentWindow.document.getElementById('abc');
        //         // iframe.contentWindow.showGreet('hello 在吗？');
        //         // 跨域
        //         iframe.contentWindow.postMessage(
        //             {data: '在工位吗？过来一下', type: 'zys', parentUrl: location.href},
        //             this.iframeUrl
        //             // '*'
        //         )
        //     }
        // })
    }

    showReply(data: string) {
        this.showDialog = false;
        setTimeout(() => {
            alert('员工回复：' + data);
        }, 1000)
    }

}
</script>

<style scoped lang="less">
#IframeParent {
    height: 100%;
    width: 100%;
    position: relative;
}
</style>
