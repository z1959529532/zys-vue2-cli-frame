<template>
    <div id="preload_img">
        <div class="loading"
             v-loading="isLoading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"></div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({
    name: "PreloadImg"
})
export default class PreloadImg extends Vue {
    imgData: string[] = [];
    isLoading = true;

    mounted() {
        this.imgData = Array(50).fill('aaa.png');
        this.preload().then(res => {
            console.log(res);
            this.isLoading = false;
        }, err => {
        })
    }

    preload() {
        return new Promise((resolve, reject) => {
            let count = 0;
            for (let i = 0; i < this.imgData.length; i++) {
                let image = new Image();
                image.src = require(`@assets/${this.imgData[i]}`);
                image.onload = () => {
                    count++;
                    if (count == this.imgData.length) {
                        setTimeout(() => {
                            resolve(count)
                        }, 2000);
                    }
                }
                image.onerror = (e) => reject(e);
            }
        });
    }

}
</script>

<style scoped lang="less">
#preload_img {
    width: 100%;
    height: 100%;

    .loading {
        width: 100%;
        height: 100%;
    }
}
</style>
