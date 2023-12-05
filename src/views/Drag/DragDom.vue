<template>
    <div id="drag_dom" class="zh-flex-center">
        <div class="drag_div" v-drag-dom></div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class DragDialog extends Vue {

    mounted() {
    }

}
</script>

<style scoped lang="less">
#drag_dom {
    width: 100%;
    height: 100%;
    position: relative;

    .drag_div {
        width: 200px;
        height: 200px;
        background-color: lightblue;
        border: 5px solid red;
    }
}
</style>
