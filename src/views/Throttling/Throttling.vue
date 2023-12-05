<template>
    <div id="throttling">
        <el-button @click="debounce">防抖</el-button>
        <el-button @click="throttle">节流</el-button>
        <el-button v-prevent-repeat-click @click="throttleB">指令节流测试</el-button>
    </div>
</template>

<script lang="ts">
import { ThrottleDebounceUtil } from "@/utils/throttleDebounce.util";
import {Component, Vue} from "vue-property-decorator";

@Component({
    name: 'Throttling'
})
export default class Throttling extends Vue {


    debounce() {
        ThrottleDebounceUtil.debounce(() => console.log('我是防抖'), 1500);
    }

    throttle() {
        ThrottleDebounceUtil.throttle(() => console.log('我是节流'), 1500);
    }

    throttleB() {
        console.log('指令节流');
    }

}
</script>

<style scoped lang="less">
#throttling {
    width: 100%;
    height: 100%;
}
</style>
