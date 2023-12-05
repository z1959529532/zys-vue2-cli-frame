<template>
    <div id="index">
        <zys-tree :list="treeData"></zys-tree>
    </div>
</template>

<script lang="ts">
import {Component, Model, Prop, Vue, Watch} from "vue-property-decorator";
import ZysTree from "./ZysTree.vue";

/**
 *
 *
 * @author zys
 * @since
 */
@Component({
    name: "index",
    watch: {},
    components: {
        ZysTree
    }
})
export default class index extends Vue {

    sonName = '';

    @Prop(String) readonly parentName!: string;

    @Watch('parentName')
    parentNameChange(newValue: string, oldVal: string) {
        this.sonName = this.parentName;
    }

    treeData = [
        {
            name: "22",
            id: 1,
            children: [
                {
                    name: "33", id: 11, children: [
                        {
                            name: "44", id: 111, children: [
                                {name: "55", id: 1111},
                                {name: "56", id: 1112},
                            ],
                        },
                        {name: "44", id: 222, children: []},
                    ],
                },
                {
                    name: "34", id: 12, children: [
                        {name: "45", id: 112}
                    ]
                },
            ],
        },
    ];

    create() {
    }

    mounted() {

    }
}
</script>

<style scoped lang="less">
#index {
    height: 100%;
    width: 100%;
}
</style>
