<template>
    <div id="page404">
        <div class="tip">404</div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({
    name: 'Page404'
})
export default class Page404 extends Vue {

}
</script>

<style scoped lang="less">
#page404 {
    width: 100%;
    height: 100%;

    .tip {
        font-size: 40px;
    }
}
</style>
