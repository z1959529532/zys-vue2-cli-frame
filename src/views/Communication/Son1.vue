<template>
    <div id="son1" class="zh-padding">
        双向绑定1：.sync方式
        <el-input v-model="sonName"></el-input>
        <Grandson1></Grandson1>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import Grandson1 from '@/views/Communication/Grandson1.vue';

@Component({
    name: 'Son1',
    watch: {
        sonName(newValue, oldValue) {
            this.$emit('update:parentName', newValue);
        }
    },
    components: {
        Grandson1
    }
})
export default class Son1 extends Vue {

    @Prop(String) readonly parentName!: string;

    // @Watch('parentName')
    // parentNameChange(newValue: string, oldVal: string) {
    //     this.sonName = this.parentName;
    // }

    sonName = '';

    create() {
    }

    mounted() {
        this.sonName = this.parentName;
    }

}
</script>

<style scoped lang="less">
#son1 {
    //width: 100%;
    //height: 100%;
    background-color: lightblue;
}
</style>
