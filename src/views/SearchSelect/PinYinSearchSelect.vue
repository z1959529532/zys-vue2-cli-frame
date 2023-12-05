<template>
    <div id="pin_yin_search_select">
        <el-select v-model="select"
                   filterable
                   :filter-method="pinYinSearch"
                   @focus="onFocus"
                   placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import PinyinMatch from 'pinyin-match'

// 用到 npm install pinyin-match 后导入
@Component({
    name: 'PinYinSearchSelect'
})
export default class PinYinSearchSelect extends Vue {

    select: string = '';
    options = [
        {value: '选项1', label: '黄金糕'},
        {value: '选项2', label: '双皮奶'},
        {value: '选项3', label: '蚵仔煎'},
        {value: '选项4', label: '龙须面'},
        {value: '选项5', label: '北京烤鸭'}
    ];
    copyOptions = [];

    mounted() {
        this.copyOptions = JSON.parse(JSON.stringify(this.options));
    }

    onFocus() {
        this.options = this.copyOptions;
    }

    pinYinSearch(query: string) {
        if (query) {
            this.options = this.options.filter(val => PinyinMatch.match(val.label, query));
        } else {
            this.options = this.copyOptions;
        }
    }

}
</script>

<style scoped lang="less">
#pin_yin_search_select {
    width: 100%;
    height: 100%;
}
</style>
