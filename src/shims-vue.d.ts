declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
  import allApi from '@/api/allRequest';
  import eChartsFn from '@/components/chart/index.js'

  /**
   * ts代码不识别的声明
   */
  module 'vue/types/vue' {
    interface Vue {
      $validForbid: any,
      $idCardValid: any,
      $allApi: allApi,
      $eChartsFn: eChartsFn
    }
  }
}

declare module 'pdfjs-dist/es5/build/pdf.js'
declare module 'pdfjs-dist/build/pdf.worker.entry.js'
declare module 'rxjs/internal/Subject'
