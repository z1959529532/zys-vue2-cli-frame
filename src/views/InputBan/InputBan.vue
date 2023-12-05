<template>
    <div id="input-ban">
        <div>{{ name }}</div>
        <div>
            <el-input v-model="name"
                      @input="e => name=$validForbid(e)"
                      style="width: 120px"
                      maxlength="20"
                      show-word-limit
                      @change="changeName"></el-input>
        </div>
        <el-input v-model="iCard"
                  @input="e => iCard=$idCardValid(e)"
                  style="width: 250px"
                  show-word-limit></el-input>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class InputBan extends Vue {

    name = '';
    iCard = '';
    a = '';

    mounted() {
    }

    changeName(e: any) {
        console.log(this.name);
    }

}
</script>

<style scoped lang="less">
#input-ban {
    /deep/ .el-input__inner {
        padding: 0 50px 0 10px;
    }
}
</style>
