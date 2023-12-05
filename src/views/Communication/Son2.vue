<template>
    <div id="son2" class="zh-padding">
        双向绑定2：v-model方式
        <el-input v-model="sonName"></el-input>
    </div>
</template>

<script lang="ts">
import {Component, Model, Prop, Vue, Watch} from "vue-property-decorator";

@Component({
    name: 'Son2',
    watch: {
        sonName(newValue, oldValue) {
            this.$emit('changeParentName', newValue);
        }
    }
})
export default class Son2 extends Vue {

    @Model('changeParentName', { type: String }) readonly parentName!: string;

    @Watch('parentName')
    parentNameChange(newValue: string, oldVal: string) {
        this.sonName = this.parentName;
    }

    sonName = '';

    create() {
    }

    mounted() {
        this.sonName = this.parentName;
    }

}
</script>

<style scoped lang="less">
#son2 {
    //width: 100%;
    //height: 100%;
    background-color: lightblue;
}
</style>
