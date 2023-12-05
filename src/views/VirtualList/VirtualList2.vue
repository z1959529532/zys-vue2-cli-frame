<template>
    <div id="VirtualList2">
        <h3>已知：每条高度、显示条数，容器高度撑开</h3>
        <div class="content"
             ref="content"
             :style="{height: contentHeight()}"
             @scroll="(e) => updateVisibleData(e.target)">
            <div class="show-content" :style="{top: listTop()}">
                <div v-for="(item, index) in showItems"
                     :key="item.name+index"
                     class="item"
                     :style="{ height: itemHeight + 'px' }">
                    <div class="zh-flex-center" style="background: lightblue;width: 100%;height: 100%">{{ item.name }}</div>
                </div>
            </div>
            <div class="bar" :style="{ height: barContentHeight() }"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Model, Prop, Vue, Watch} from "vue-property-decorator";
import {CloneUtil} from "@/utils/clone.util";

class NameId {
    id: string = '';
    name: string = '';

    constructor(n: string, i: string) {
        this.name = n;
        this.id = i;
    }
}

/**
 * 虚拟列表
 *
 * @author zys
 * @since
 */
@Component({
    name: "VirtualList2",
    watch: {}
})
export default class VirtualList2 extends Vue {

    allItems: NameId[] = [];
    showNum = 4;
    itemHeight = 100;
    startIndex = 0;
    endIndex = 0;
    showItems: NameId[] = [];
    top = 0;

    create() {
    }

    mounted() {
        this.allItems = Array(20).fill('')
            .map((val, index) => new NameId('item' + (index + 1), '123'));
        this.updateVisibleData(this.$refs.content as HTMLElement);
    }

    contentHeight() {
        return this.showNum * this.itemHeight + 'px';
    }

    listTop() {
        return this.startIndex * this.itemHeight + 'px';
    }

    barContentHeight() {
        return this.allItems.length * this.itemHeight + "px";
    }

    updateVisibleData(content: HTMLElement) {
        this.top = content.scrollTop;
        this.startIndex = Math.floor(content.scrollTop / this.itemHeight);
        this.endIndex = this.startIndex + this.showNum + 1;
        this.showItems = CloneUtil.deepClone(this.allItems).slice(this.startIndex, this.endIndex);
        console.log(content.scrollTop + '---' + this.startIndex + '---' + this.endIndex);
    }
}
</script>

<style scoped lang="less">
#VirtualList2 {
    height: 100%;
    width: 100%;

    .content {
        width: 100%;
        overflow-x: hidden;
        border: 1px solid black;
        position: relative;
    }

    .show-content {
        width: 100%;
        position: absolute;
        top: 0;

        .item {
            box-sizing: border-box;
            width: 100%;
            padding-top: 2px;
            padding-bottom: 2px;
        }
    }
}
</style>
