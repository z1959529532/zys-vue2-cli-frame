<template>
    <div id="show_pdf">
        <!--        <object data="./abc.pdf"-->
        <!--                type="application/pdf"></object>-->
        <!--        <embed src="./abc.pdf"-->
        <!--               type="application/pdf">-->

        <iframe src="abc.pdf"
                frameborder="0" style="width: 100%;height: 100%"></iframe>
<!--        <iframe src="diff.pdf"-->
<!--                frameborder="0" style="width: 100%;height: 100%"></iframe>-->

<!--        <div class="pagination">-->
<!--            <div>{{ pdfParams.pageNumber }} / {{ pdfParams.total }}</div>-->
<!--            <el-button type="primary"-->
<!--                       size="mini"-->
<!--                       :disabled="pdfParams.pageNumber===1" @click="prevPage">上一页-->
<!--            </el-button>-->
<!--            <el-button type="primary"-->
<!--                       size="mini"-->
<!--                       :disabled="pdfParams.pageNumber===pdfParams.total" @click="nextPage">下一页-->
<!--            </el-button>-->
<!--        </div>-->
<!--        <canvas id="pdf-render"></canvas>-->
    </div>
</template>

<script lang="ts">

/**
 * 预览pdf
 *
 * @author zys
 * @since
 */
import {Component, Model, Prop, Vue, Watch} from "vue-property-decorator";
import * as PDFJS from 'pdfjs-dist/es5/build/pdf.js'
import * as workerSrc from 'pdfjs-dist/build/pdf.worker.entry.js'

@Component({
    name: '',
    watch: {},
    computed: {},
})
export default class ShowPdf extends Vue {

    pdfDoc: any;
    pdfParams = {
        pageNumber: 1,  // 当前页
        total: 0,  // 总页数
    }

    create() {
    }

    mounted() {
        // this.pdfJsToShowPdf();
    }

    pdfJsToShowPdf() {
        const canvas: any = document.getElementById('pdf-render');
        // canvas.width = '100%';
        // canvas.height = '100%';

        PDFJS.GlobalWorkerOptions.workerSrc = workerSrc
        const pdfUrl = './diff.pdf';
        PDFJS.getDocument(pdfUrl).promise.then((pdfDoc: any) => {
            this.pdfDoc = pdfDoc
            this.pdfParams.total = pdfDoc.numPages
            this.getPdfPage(1)
        })
    }


    getPdfPage(number: number) {
        this.pdfDoc.getPage(number).then((page: any) => {
            // viewport里事pdf本身宽高
            const viewport = page.getViewport();
            const canvas: any = document.getElementById('pdf-render')
            const context = canvas.getContext('2d') as CanvasRenderingContext2D;
            // canvas.width = viewport.viewBox[2]
            // canvas.height = viewport.viewBox[3]
            // viewport.width = viewport.viewBox[2]
            // viewport.height = viewport.viewBox[3]
            // canvas.style.width = Math.floor(viewport.width) + 'px'
            // canvas.style.height = Math.floor(viewport.height) + 'px'

            const content: any = document.getElementById('show_pdf');
            canvas.width = content.offsetWidth;
            canvas.height = content.offsetHeight;
            viewport.width = content.offsetWidth;
            viewport.height = content.offsetHeight;

            let renderContext = {
                canvasContext: context,
                viewport: viewport,
                // 这里transform的六个参数，使用的是transform中的Matrix(矩阵)
                transform: [1, 0, 0, -1, 0, viewport.height]
            }
            // 进行渲染
            page.render(renderContext)
        })
    }


    prevPage() {
        if (this.pdfParams.pageNumber > 1) {
            this.pdfParams.pageNumber -= 1
        } else {
            this.pdfParams.pageNumber = 1
        }
        this.getPdfPage(this.pdfParams.pageNumber)
    }

    nextPage() {
        if (this.pdfParams.pageNumber < this.pdfParams.total) {
            this.pdfParams.pageNumber += 1
        } else {
            this.pdfParams.pageNumber = this.pdfParams.total
        }
        this.getPdfPage(this.pdfParams.pageNumber)
    }
}
</script>

<style scoped lang="less">
#show_pdf {
    width: 100%;
    height: 100%;
    position: relative;

    .pagination {
        position: absolute;
        top: 10px;
        right: 10px;
    }
}
</style>
