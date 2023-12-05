<template>
    <div id="ChangeSkin">
        <el-switch v-model="isLight"
                   :active-color="switchColor"
                   :inactive-color="switchColor"
                   style="margin-top: var(--zh-margin)"
                   @change="changeTheme">
        </el-switch>
        <el-input v-model="name"></el-input>
    </div>
</template>

<script lang="ts">
import {Component, Model, Prop, Vue, Watch} from "vue-property-decorator";
import {ThemeUtil} from "@/utils/theme.util";

/**
 * 换肤
 *
 * @author zys
 * @since
 */
@Component({
    name: "ChangeSkin",
    watch: {},
    computed: {
        switchColor() {
            // @ts-ignore
            return this.isLight ? ThemeUtil.lightTheme : ThemeUtil.darkTheme;
        },
    }
})
export default class ChangeSkin extends Vue {

    isLight = true;
    name = '';

    create() {
    }

    mounted() {
        this.changeTheme(this.isLight);
    }

    changeTheme(ok: boolean) {
        ThemeUtil.setTheme(ok);
    }

}
</script>

<style scoped lang="less">
#ChangeSkin {
    height: 100%;
    width: 100%;

    /deep/ .el-switch.is-checked .el-switch__core {
        border: 1px solid var(--theme-boder-color) !important;
    }
    /deep/ .el-switch__core {
        border: 1px solid var(--theme-boder-color) !important;
    }
    /deep/ .el-switch__core:after {
        background-color: var(--theme-boder-color) !important;
    }
}
</style>
