<template>
    <div id="parent" class="zh-padding">
        父组件数据：{{ name }}
        <el-button type="primary" size="mini" @click="sendGrandSon">event-bus向孙子发事件</el-button>
        <br/>
        <br/>
        <Son1 :parentName.sync="name"></Son1>
        <br/>
        <br/>
        <Son2 v-model="name"></Son2>
    </div>
</template>

<script>
import {Component, Vue, Provide} from "vue-property-decorator";
import Son1 from '@views/Communication/Son1.vue'
import Son2 from '@views/Communication/Son2.vue'
import bus from '../../Rxbus/bus'

@Component({
    name: 'Parent',
    components: {
        Son1,
        Son2
    }
})
export default class Parent extends Vue {

    name = '123';

    create() {
    }

    mounted() {
    }

    @Provide('grandpaName') grandpaName = this.name;

    sendGrandSon() {
        bus.$emit("grandSonEvent", this.name);
    }

}
</script>

<style scoped lang="less">
#parent {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
</style>
