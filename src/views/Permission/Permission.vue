<template>
    <div id="permission">
        <div>三个按钮，无权限的不显示</div>
        <el-button v-permission-btn>权限按钮1（未设置权限）</el-button>
        <el-button v-permission-btn="'admin'">权限按钮2</el-button>
        <el-button v-permission-btn="['1']">权限按钮2</el-button>
    </div>
</template>

<script>
import {Component, Vue} from "vue-property-decorator";

@Component({
    name: "Permission"
})
export default class Permission extends Vue {

}
</script>

<style scoped lang="less">
#permission {

}
</style>
