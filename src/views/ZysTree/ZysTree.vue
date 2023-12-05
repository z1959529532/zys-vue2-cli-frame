<template>
    <div id="zysTree">
        <ul>
            <div class="tree-item" v-for="(item, index) in list" :key="item.id ? item.id : index">
                <li @click.stop="nodeClick(item, index)">{{ item.name }}</li>
                <ZysTree v-if="item.children?.length"
                         :class="flag[index] ? 'show' : 'hide'"
                         :list="item.children"/>
            </div>
        </ul>
    </div>
</template>

<script lang="ts">
import {Component, Model, Prop, Vue, Watch} from "vue-property-decorator";
import {TypeUtil} from "@/utils/type.util";

/**
 *
 *
 * @author zys
 * @since
 */
@Component({
    name: "ZysTree",
    watch: {}
})
export default class ZysTree extends Vue {

    sonName = '';

    @Prop(String) readonly parentName!: string;

    @Watch('parentName')
    parentNameChange(newValue: string, oldVal: string) {
        this.sonName = this.parentName;
    }

    @Prop(Array) readonly list!: any[];
    flag: any[] = [];

    create() {
    }

    mounted() {
    }

    nodeClick(item: any, i: number) {
        this.flag[i] = !this.flag[i];
    }

}
</script>

<style scoped lang="less">
#zysTree {
    height: 100%;
    width: 100%;

    .show {
        display: block;
    }
    .hide {
        display: none;
    }

}
</style>
