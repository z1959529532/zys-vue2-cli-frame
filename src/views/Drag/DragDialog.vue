<template>
    <div id="drag_dialog">
        <el-button @click="showDialog=true">打开弹窗</el-button>
        <el-dialog title="提示"
                   v-dialog-drag
                   :visible.sync="showDialog"
                   width="30%"
                   :before-close="closeDialog">
            <span>这是一段信息</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog" size="mini">取 消</el-button>
                <el-button type="primary" @click="ok" v-prevent-repeat-click size="mini">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class DragDialog extends Vue {

    showDialog = false;

    mounted() {
    }

    closeDialog() {
        this.showDialog = false;
    }

    ok() {
        console.log('点了ok');
    }
}
</script>

<style scoped lang="less">
#drag_dialog {

}
</style>
