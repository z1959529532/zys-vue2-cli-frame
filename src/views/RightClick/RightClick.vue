<template>
    <div id="RightClick">

    </div>
</template>

<script lang="ts">
import {Component, Model, Prop, Vue, Watch} from "vue-property-decorator";

/**
 *
 *
 * @author zys
 * @since
 */
@Component({
    name: "RightClick",
    watch: {
    }
})
export default class RightClick extends Vue {

    sonName = '';

    @Prop(String) readonly parentName!: string;

    @Watch('parentName')
    parentNameChange(newValue: string, oldVal: string) {
        this.sonName = this.parentName;
    }

    create() {
    }

    mounted() {
    }
}
</script>

<style scoped lang="less">
#RightClick {
    height: 100%;
    width: 100%;
}
</style>
