<template>
    <div id="main" ref="main">
        <div class="zh-flex-space-between">
            <div class="zh-flex-center-v">
                <el-button size="mini" @click="showPage('iframeTest')">ifame测试，发送问候</el-button>
                <span id="reply">收到回复：{{ reply }}</span>
            </div>
            <el-button class="button-upload" size="mini" title="生成图片"
                       @click="toPdf()"
                       icon="el-icon-upload el-icon--right">导出页面</el-button>
        </div>
        <div>
            带拼音搜索的el-select组件：
            <SearchSelect v-model="searchSelectValue"
                          placeholder="请选择"
                          style="width: 150px;"
                          :options="evaluationList"
                          :props="{
                              label: 'strtqmevaluationname',
                              value: 'lngtqmevaluationid'
                          }">
            </SearchSelect>
        </div>
        <el-button size="mini" @click="showPage('showPdf')">显示预览pdf文件</el-button>
        <el-button size="mini" @click="showPage('dragDialog')">显示练习拖拽指令</el-button>
        <el-button size="mini" @click="showPage('pinyinSelect')">显示带拼音搜索el-select</el-button>
        <el-button size="mini" @click="showPage('permission')">权限指令</el-button>
        <el-button size="mini" @click="getFile">获取文件</el-button>
        <iframe id="showChildrenIframe"
                class="showChildrenIframe" :src="iframeUrl" frameborder="0"></iframe>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import SearchSelect from "@/views/SearchSelect/SearchSelect.vue";

@Component({
    components: {SearchSelect}
})
export default class Main extends Vue {

    iframeUrl = '';
    reply = '';

    searchSelectValue = '';
    evaluationList = [
        {strtqmevaluationname: '1', lngtqmevaluationid: '南京'},
        {strtqmevaluationname: '2', lngtqmevaluationid: '苏州'},
        {strtqmevaluationname: '3', lngtqmevaluationid: '上海'},
    ];

    mounted() {
    }

    /**
     * 获取文件
     */
    getFile() {
        // this.$allApi.getFile().then((res: any) => {
        //
        // });
    }

    /**
     * 将页面导出pdf
     */
    toPdf() {
        // @ts-ignore
        html2canvas(document.getElementById('main'),{
            dpi: 200,  // 导出pdf清晰度
            useCORS: true  //【重要】开启跨域配置
        }).then(function(canvas) {
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

            let pageData = canvas.toDataURL('image/jpeg', 1);
            // @ts-ignore
            let pdf = new jspdf('', 'pt', 'a4');

            // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            // 当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < pageHeight) {
                pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
            } else {
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
#main {
    width: 100%;
    height: 100%;

    .showChildrenIframe {
        width: calc(100% - 4px);
        height: calc(100% - 45px);
        border: 2px solid lightblue;
        margin-right: 5px;
    }
}
</style>
