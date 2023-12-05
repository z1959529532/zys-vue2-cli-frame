<template>
    <div id="ChartTest">
        <chart-view :ref="chartId1+'Ref'" :chart-id="chartId1" :auto-resize="true" :play-highlight="true" :height="'30%'"
               @click="clickChart" />
        <chart-view :ref="chartId2+'Ref'" :chart-id="chartId2" :auto-resize="true" :play-highlight="true" :height="'30%'" />

        <chart-view :ref="chartId3+'Ref'" :chart-id="chartId3" :auto-resize="true" :play-highlight="true" :height="'30%'" />
    </div>
</template>

<script lang="ts">
import ChartView from "@/components/chart/index.vue"
import {Component, Model, Prop, Vue, Watch} from "vue-property-decorator";

/**
 *
 *
 * @author zys
 * @since
 */
@Component({
    name: "ChartTest",
    watch: {},
    components: {
        ChartView
    }
})
export default class ChartTest extends Vue {

    sonName = '';

    @Prop(String) readonly parentName!: string;

    @Watch('parentName')
    parentNameChange(newValue: string, oldVal: string) {
        this.sonName = this.parentName;
    }

    chartId1 = 'chart1';
    chartId2 = 'chart2';
    chartId3 = 'chart3';
    // chartOpt = {};  // 传入option要考虑响应式

    create() {
    }

    mounted() {
        (this.$refs[`${this.chartId1}Ref`] as any).chartOption = this.$eChartsFn.testBar();
        (this.$refs[`${this.chartId2}Ref`] as any).chartOption = this.$eChartsFn.testBar2();

        (this.$refs[`${this.chartId3}Ref`] as any).chartOption =
            this.$eChartsFn.getPieChart([100, 23, 43, 65], ['#36CBCB', '#FAD337', '#F2637B', '#975FE4'])
    }

    clickChart(params: Event) {
        console.log(params, 3344);
    }

}
</script>

<style scoped lang="less">
#ChartTest {
    width: 100%;
    height: 100%;
}
</style>
