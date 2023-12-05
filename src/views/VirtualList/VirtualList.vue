<template>
    <div id="VirtualList"
         ref="content"
         @scroll="(e) => updateVisibleData(e.target)">
        <!--可视区，绝对定位给高度-->
        <div class="show-content" :style="{top: listTop}">
            <div v-for="(item, index) in showItems"
                 :key="item.name+index"
                 class="item"
                 :style="{ height: itemHeight + 'px' }">
                <div class="zh-flex-center" style="background: lightblue;width: 100%;height: 100%">{{ item.name }}</div>
            </div>
        </div>
        <!--撑开滚动条-->
        <div class="bar" :style="{height: barContentHeight}"></div>
    </div>
</template>

<script lang="ts">
import {CloneUtil} from "@/utils/clone.util";
import {TypeUtil} from "@/utils/type.util";
import {Component, Model, Prop, Vue, Watch} from "vue-property-decorator";

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
 * 容器高度自适应，给定每一项高度
 *
 * @author zys
 * @since
 */
@Component({
    name: "VirtualList",
    watch: {},
    computed: {}
})
export default class VirtualList extends Vue {

    allItems: NameId[] = [];
    itemHeight = 100;
    startIndex = 0;
    endIndex = 0;
    showItems: NameId[] = [];
    top = 0;

    create() {
    }

    mounted() {
        this.allItems = Array(50).fill('')
            .map((val, index) => new NameId('item' + (index + 1), '123'));
        this.$nextTick(() => {
            this.updateVisibleData(this.$refs.content as HTMLElement);
        })
    }

    get barContentHeight() {
        return this.allItems.length * this.itemHeight + 'px';
    }

    get listTop() {
        // return this.top + 'px';
        return this.startIndex * this.itemHeight + 'px';
    }

    updateVisibleData(content: HTMLElement) {
        this.top = content.scrollTop;
        this.startIndex = Math.floor(content.scrollTop / this.itemHeight);
        this.endIndex = this.startIndex + Math.ceil(content.offsetHeight / this.itemHeight) + 1;
        this.showItems = CloneUtil.deepClone(this.allItems).slice(this.startIndex, this.endIndex);
        console.log(content.scrollTop + '---' + this.startIndex + '---' + this.endIndex);
    }

}
</script>

<style scoped lang="less">
#VirtualList {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    position: relative;
    //background-color: rgb(51, 50, 50);

    .show-content {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;

        .item {
            box-sizing: border-box;
            width: 100%;
            padding-bottom: 2px;
        }
    }
}
</style>
