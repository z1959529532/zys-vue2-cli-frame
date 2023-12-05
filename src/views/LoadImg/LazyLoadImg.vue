<template>
    <div id="lazy_load_img">
        <!--        <div class="zh-flex img_content">-->
        <!--            <img class="bg_css1" src="../../assets/aaa.png">-->
        <!--            <img class="bg_css2" :src="require('@/assets/aaa.png')">-->
        <!--        </div>-->

        <!--        <div class="zh-flex img_content">-->
        <!--            <div class="bg_css1"></div>-->
        <!--            <div class="bg_css2"></div>-->
        <!--        </div>-->

        <!--        <img src="../../assets/aaa.png">-->
        <!--        <img :src="require('@/assets/aaa.png')">-->
        <!--        <img :src="require('@/assets/'+imgUrl+'.png')">-->

<!--        <img v-for="url in imgData" :data-src="url" v-lazy-load-img>-->
        <img v-for="url in imgData" :data-src="url">
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({
    name: 'LazyLoadImg'
})
export default class LazyLoadImg extends Vue {
    imgData: string[] = [];
    imgContent: any = null;
    timer: any = null;

    mounted() {
        this.imgData = Array(50).fill('aaa.png');
        this.$nextTick(() => {
            this.imgContent = document.getElementById('lazy_load_img');
            this.lazyLoad();
            this.imgContent.addEventListener("scroll", this.lazyLoad);
            // content.scrollTop = 200;
        })
    }

    lazyLoad() {
        if (this.timer) {
            return;
        }
        this.timer = setTimeout(() => {
            const imgs = document.querySelectorAll('#lazy_load_img img');
            for (let i = 0; i < imgs.length; i++) {
                if (i == 4) {
                    console.log(imgs[i].getBoundingClientRect().top);
                    console.log(this.imgContent.offsetTop);
                    console.log(this.imgContent.clientHeight);
                }
                const offsetTop = imgs[i].getBoundingClientRect().top - this.imgContent.offsetTop;
                if (offsetTop < this.imgContent.clientHeight) {
                    (imgs[i] as any).src = require(`@/assets/${imgs[i].getAttribute('data-src')}`);
                }
            }
            clearTimeout(this.timer);
            this.timer = null;
        }, 200);
    }

}
</script>

<style scoped lang="less">
#lazy_load_img {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-x: hidden;

    //.img_content div, img {
    //    margin-top: 10px;
    //    margin-left: 20px;
    //}
    img {
        display: block;
        height: 200px;
    }

    .bg_css1 {
        width: 300px;
        height: 200px;
        background: url('../../assets/aaa.png') no-repeat;
        background-size: 100% 100%;
    }

    .bg_css2 {
        width: 300px;
        height: 300px;
        //background: url("@/assets/aaa.png") no-repeat;
        background: url(~@/assets/aaa.png) no-repeat;
        background-size: 100% 100%;
    }
}
</style>
