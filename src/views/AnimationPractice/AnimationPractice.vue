<template>
    <div id="animationPractice">
        <el-button type="primary" @click="startAnimation">显示</el-button>
        <el-button type="primary" @click="stopAnimation">隐藏</el-button>
        <div id="animation1">
            <div class="animation1-div" :class="{'div-show': isStart, 'div-hidden': !isStart}"></div>
        </div>
        <div id="animation2">
            <div class="animation2-div" :class="{'move-right': isStart, 'move-left': !isStart}"></div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
    name: 'AnimationPractice'
})
export default class AnimationPractice extends Vue {

    isStart = false;

    mounted() {}

    startAnimation() {
        (document.getElementById('animation1') as any).style.visibility = 'visible';
        (document.getElementById('animation2') as any).style.visibility = 'visible';
        this.isStart = true;
    }
    stopAnimation() {
        this.isStart = false;
    }

}
</script>

<style scoped lang="less">
#animationPractice {

    #animation1 {
        width: 100%;
        visibility: hidden;
        .animation1-div {
            height: 100px;
            background-color: rgba(0, 0, 0, .2);
        }
        .div-show {
            animation: show-content 3s ease forwards;
        }
        .div-hidden {
            animation: hidden-content 3s ease forwards;
        }
        @keyframes show-content {
            from {width: 0}
            to {width: 100%}
        }
        @keyframes hidden-content {
            from {width: 100%}
            to {width: 0}
        }
    }

    #animation2 {
        width: 100%;
        visibility: hidden;
        .animation2-div {
            height: 100px;
            width: 100px;
            position: relative;
            background-color: rgba(255, 0, 0, .4);
        }
        .move-right {
            animation: to-right 3s linear 1 forwards;
        }
        @keyframes to-right {
            from {left: 0}
            to {left: calc(100% - 100px)}
            50% {background-color: rgba(255, 0, 0, 1)}
        }
        .move-left {
            animation: to-left 3s linear 1 forwards;
        }
        @keyframes to-left {
            from {left: calc(100% - 100px)}
            to {left: 0}
            50% {background-color: rgba(255, 0, 0, 1)}
        }
    }

}
</style>