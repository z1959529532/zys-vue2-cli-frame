<template>
    <div id="practice">
        <div class="div1 zh-text-ellipsis-3">
            123456789123456789123456789123456789
            123456789123456789123456789123456789
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {TypeUtil} from "@/utils/type.util";

@Component({
    name: 'Practice'
})
export default class Practice extends Vue {

    person = {
        name: '张三',
        age: 20
    };

    mounted() {
        console.log(this.person, 1122);

        // const p = this.person;
        // p.name = '李四';
        // console.log(p);

        // const p1 = this.shallowClone(this.person);
        // (p1 as any).name = '李四';
        // console.log(p1);
        // let p2 = Object.assign({}, person);
        // p2.name = '李四';
        // console.log(p2);
        // let p3 = {...this.person};
        // p3.name = '王五';
        // console.log(p3);
    }

    shallowClone(obj: any) {
        const newObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                // @ts-ignore
                newObj[key] = obj[key];
            }
        }
        return newObj;
    }

    deepClone(obj: any, hash = new WeakMap()) {
        if (obj == null) return obj;
        if (obj instanceof Date) return new Date(obj);
        if (obj instanceof RegExp) return RegExp(obj);
        if (typeof obj !== 'object') return obj;
        if (hash.get(obj)) return hash.get(obj);
        let cloneObj = new obj.constructor();
        hash.set(obj, cloneObj);
        for (let key in cloneObj) {
            if (obj.hasOwnProperty(key)) {
                cloneObj[key] = this.deepClone(obj[key], hash);
            }
        }
        return cloneObj;
    }

}
</script>

<style scoped lang="less">
#practice {
    height: 100%;
    width: 100%;
    position: relative;

    .div1 {
        width: 200px;
        background-color: rgba(255, 0, 0, .5);
    }
}
</style>
