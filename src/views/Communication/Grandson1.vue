<template>
    <div id="Grandson1">
        <br/>
        孙组件Provide/Inject：{{grandpaName}}
        <br/>
        <br/>
    </div>
</template>

<script lang="ts">
import {Component, Model, Prop, Vue, Watch, Inject} from "vue-property-decorator";
import bus from '../../Rxbus/bus'

/**
 *
 *
 * @author zys
 * @since
 */
@Component({
    name: "Grandson1",
    watch: {},
})
export default class Grandson1 extends Vue {

    @Inject('grandpaName') grandpaName!: string

    create() {
    }

    mounted() {
        bus.$on("grandSonEvent", (data: any) => {
            alert(data);
        })
    }

}
</script>

<style scoped lang="less">
#Grandson1 {
    height: 100%;
    width: 100%;
    background-color: lightcoral;
}
</style>
