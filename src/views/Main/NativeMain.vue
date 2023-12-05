<template>
    <div id="native-main">
        <div id="menu" class="zh-flex-space-between">
            <div>
                <router-link to="/nativeMain/parent">父子组件双向绑定</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/dragDom">拖拽Dom指令</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/dragDialog">拖拽element弹窗指令</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/throttling">节流和防抖</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/iframe">iframe使用</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/websocketTest">websocket测试</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/showPdf">显示预览pdf文件</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/permission">权限指令</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/lazyLoadImag">图片懒加载</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/preloadImag">图片预加载</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/virtualList">虚拟列表</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/virtualList2">虚拟列表2</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/bigFile">大文件上传</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/concurrent">并发请求处理</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/changeSkin">换肤</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/rightClick">右击菜单</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/chartTest">echarts封装使用</router-link>&nbsp;&nbsp;
                <router-link to="/nativeMain/zysTree">递归树组件</router-link>&nbsp;&nbsp;
                <el-button class="button-upload" size="mini" title="生成图片"
                           @click="toPdf()"
                           icon="el-icon-upload el-icon--right">导出页面
                </el-button>
            </div>
            <div class="zh-flex-center-v">
                <el-button size="small" icon="el-icon-circle-close" @click="logout">退出</el-button>
            </div>
        </div>

        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import * as createRouter from "@/router";
import { ThemeUtil } from "@/utils/theme.util";

@Component({
    name: 'NativeMain'
})
export default class NativeMain extends Vue {

    mounted() {
        ThemeUtil.setTheme(true);

        /** 内容区自适应 */
        this.resizeContent();
        window.addEventListener('resize', this.resizeContent);

        // this.validateUser();
        // this.getUsers();
    }

    beforeDestroy() {
        window.removeEventListener('resize', this.resizeContent);
    }

    resizeContent() {
        const menu: any = document.getElementById('menu');
        const content: any = document.getElementsByClassName('content');
        content[0].style.height = `calc(100% - ${menu.offsetHeight}px)`;
    }

    logout() {
        this.$confirm('确定退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            window.localStorage.clear();
            createRouter.addRoleRoutes();
            this.$router.replace('/');
        }).catch(() => {
        });
    }

    validateUser() {
        this.$allApi.userValidate({}).then((res: any) => {
            console.log(res, 3344);
        })
    }

    getUsers() {
        this.$allApi.getUsers({}, null).then((res: any) => {
            // console.log(res, 3344);
        })
    }

    /**
     * 将页面导出pdf
     */
    toPdf() {
        // 先利用html2canvas将HTML网页保存成canvas图片,然后我们在利用jspdf将canvas图片生成pdf文件

        // @ts-ignore
        html2canvas(document.getElementById('native-main'), {
            dpi: 200,  // 导出pdf清晰度
            useCORS: true  //【重要】开启跨域配置
        }).then(function (canvas) {
            // document.body.appendChild(canvas);
            let contentWidth = canvas.width;
            let contentHeight = canvas.height;

            // 一页pdf显示html页面生成的canvas高度;
            let pageHeight = contentWidth / 592.28 * 841.89;
            // 未生成pdf的html页面高度
            let leftHeight = contentHeight;
            // pdf页面偏移
            let position = 0;
            // html页面生成的canvas在pdf中图片的宽高（a4纸的尺寸[595.28,841.89]）
            let imgWidth = 595.28;
            let imgHeight = 592.28 / contentWidth * contentHeight;
            //获取图片的base64数据
            let pageData = canvas.toDataURL('image/jpeg', 1);
            // @ts-ignore
            let pdf = new jspdf('', 'pt', 'a4');

            // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            // 当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < pageHeight) {
                pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
            } else {
                // 分页
                while (leftHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    //避免添加空白页
                    if (leftHeight > 0) {
                        pdf.addPage();
                    }
                }
            }
            // 下载pdf
            pdf.save('TestReport.pdf');
        });


        // // @ts-ignore
        // html2canvas(document.getElementById('main'), {
        //     useCORS: true, // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
        // }).then((canvas) => {
        //     const dataURL = canvas.toDataURL('image/png')
        //     //此处为导出图片方式
        //     // const creatDom = document.createElement('a')
        //     // document.body.appendChild(creatDom)
        //     // creatDom.href = dataURL
        //     // creatDom.download = '图片'
        //     // creatDom.click()
        //
        //     // @ts-ignore
        //     //  将图片转换为pdf文件
        //     var pdf = new jspdf('','pt','a4')
        //     var contentWidth = canvas.width;
        //     // @ts-ignore
        //     //  未生成pdf的html页面高度
        //     var leftHeight = document.getElementById('show_pdf').scrollHeight;
        //     //  一页pdf显示html页面生成的canvas高度;
        //     var pageHeight = contentWidth / 592.28 * 841.89;
        //     //  页面偏移
        //     var position = 0;
        //     while(leftHeight > 0 ){
        //         pdf.addImage(dataURL,"JPEG",0 ,position, 595.28, 841.89)
        //         leftHeight -= pageHeight;
        //         position -= 841.89;
        //         //避免添加空白页
        //         if(leftHeight > 0) {
        //             // pdf.addPage();
        //         }
        //     }
        //     pdf.save("aaa")  //导出及文档名称
        // })
    }

}

</script>

<style scoped lang="less">
#native-main {
    width: 100%;
    height: 100%;

    .content {
        box-sizing: border-box;
        width: 100%;
        border: 1px solid var(--theme-boder-color);
    }

    .router-link-active {
        color: red;
    }

    .zys-active {
        color: red;
    }
}
</style>
