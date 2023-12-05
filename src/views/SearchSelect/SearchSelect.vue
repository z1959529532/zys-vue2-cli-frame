<template>
    <div id="search_select">
        <el-select
            v-model="newValue"
            :filterable="filterable"
            :multiple="multiple"
            :filter-method="filterMethod"
            v-bind="$attrs"
            :value-key="props.value"
            :disabled="disabled"
            :clearable="clearable"
            v-on="$listeners"
            @focus="onFocus"
        >
            <el-option
                v-for="item in optionsData"
                :key="item[props.value]"
                v-bind="$attrs"
                :disabled="optionDisabled"
                :label="item[props.label]"
                :value="row ? item : item[props.value]"
            />
        </el-select>
    </div>
</template>

<script>
import PinyinMatch from 'pinyin-match'

export default {
    name: 'SearchSelect',
    props: {
        value: {
            type: [String, Number, Array, Object],
            default: ''
        },
        multiple: {
            type: Boolean,
            default: false
        },
        filterable: {
            type: Boolean,
            default: true
        },
        clearable: {
            type: Boolean,
            default: false
        },
        // select禁用
        disabled: {
            type: Boolean,
            default: false
        },
        // option是否禁用
        optionDisabled: {
            type: Boolean,
            default: false
        },
        // 列表数据
        options: {
            type: Array,
            default: _ => [],
            required: true
        },
        // option属性
        props: {
            type: Object,
            default: _ => {
                return {
                    value: 'value',
                    label: 'label'
                }
            },
            required: true
        },
        // value是否为对象
        row: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            copyOptions: [],
            optionsData: []
        }
    },
    computed: {
        newValue: {
            set(val) {
                this.$emit('input', val)
            },
            get() {
                return this.value
            }
        }
    },
    watch: {
        options(val) {
            this.optionsData = val
            this.copyOptions = JSON.parse(JSON.stringify(val))
        }
    },
    mounted() {


    },
    methods: {
        onFocus(e) {
            this.optionsData = this.copyOptions
        },
        filterMethod(val) {
            this.optionsData = this.copyOptions
            this.optionsData = this.optionsData.filter(item => PinyinMatch.match(item[this.props.label], val))
        },
        onChange(val) {
            this.$emit('change', val)
        }
    }
}
</script>

<style scoped lang="less">
#search_select {

}
</style>
