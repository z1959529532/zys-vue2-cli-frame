<template>
    <div id="BigFile">
        <div class="zh-flex-center-v zh-margin-top">
            <div class="form-label">文件类型：</div>
            <el-select v-model="formData.fileType"
                       placeholder=" ">
                <el-option label="图片"
                           :value="'1'"></el-option>
                <el-option label="视频"
                           :value="'2'"></el-option>
                <el-option label="文本"
                           :value="'3'"></el-option>
            </el-select>
        </div>

        <el-upload class="zh-margin-top  upload-file"
                   :action="uploadMediaUrl"
                   :data="getUploadMediaParam"
                   :multiple="false"
                   :limit="2"
                   :accept="acceptFileType"
                   :on-exceed="mediaNumExceed"
                   :before-upload="(file) => beforeUploadMedia(file)"
                   :on-success="(response, file, uploadFileList) => mediaUploadSuccess(response, file, uploadFileList)"
                   :on-remove="(file, uploadFileList) => mediaRemove(file, uploadFileList)"
                   :file-list="formData.fileList"
                   :http-request="handleFileUpload">
            <el-button size="small"
                       type="primary" :disabled="uploadPercent!==0">点击上传
            </el-button>
            <div slot="tip"
                 class="el-upload__tip">
                <div v-if="formData.fileList.length===0&&uploadPercent===0" class="zh-margin-left-small">未上传文件！</div>
                <el-progress v-if="uploadPercent!==0&&uploadPercent!==100" :percentage="uploadPercent"
                             style="width: 100%"></el-progress>
            </div>
        </el-upload>

        <el-upload class="zh-margin-top  upload-file"
                   action=""
                   :limit="1"
                   :accept="acceptFileType"
                   :before-upload="(file) => beforeUploadMedia(file)"
                   :auto-upload="false"
                   :file-list="formData.fileList"
                   :on-remove="(file, uploadFileList) => mediaRemove(file, uploadFileList)"
                   :on-change="onFileChange">
            <el-button size="small"
                       type="primary" :disabled="uploadPercent!==0">点击上传
            </el-button>
            <div slot="tip"
                 class="el-upload__tip">
                <div v-if="formData.fileList.length===0&&uploadPercent===0"
                     class="zh-margin-left-small">未上传文件！
                </div>
                <el-progress v-if="uploadPercent!==0&&uploadPercent!==100"
                             :percentage="uploadPercent"
                             style="width: 100%"></el-progress>
            </div>
        </el-upload>
    </div>
</template>

<script lang="ts">
import {Component, Model, Prop, Vue, Watch} from "vue-property-decorator";

const SparkMD5 = require('spark-md5')

class FileData {
    /** 记录id */
    id: string = '';
    /** 文件类型 '1'图片 '2'视频 '3'文本 */
    fileType: string = '';

    /** 文件列表 */
    fileList: File[] = [];
}

/**
 * 大文件上传
 *
 * @author zys
 * @since
 */
@Component({
    name: "BigFile",
    computed: {
        /** 上传文件携带参数 */
        getUploadMediaParam() {
            // @ts-ignore
            return {countryCode: this.countryCode, fileType: this.formData.fileType};
        },
        /** 上传文件可接受的类型 */
        acceptFileType() {
            // @ts-ignore
            if (this.formData.fileType === this.fileTypeData[0]) {
                return '.png,.jpg';
            }
            // @ts-ignore
            if (this.formData.fileType === this.fileTypeData[1]) {
                return '.mp4,.avi,.wmv';
            }
            // @ts-ignore
            if (this.formData.fileType === this.fileTypeData[2]) {
                return '.txt,.doc,.docx,.xls,.xlsx,.pdf,.ppt';
            }
        }
    },
    watch: {}
})
export default class BigFile extends Vue {

    cacheFileList: File[] = [];
    /** 当前表单 */
    formData = new FileData();

    /** 上传文件地址 */
    uploadMediaUrl = '/upload';
    /** 上传文件参数 */
    countryCode = '0031';
    /** 文件类型 '1'图片  '2'视频  '3'文本 */
    fileTypeData = ['1', '2', '3'];

    uploadPercent = 0;

    create() {
    }

    mounted() {
        this.formData = Object.assign(new FileData(), {fileType: this.fileTypeData[1]});
    }

    /**
     * 上传超出限制个数调用-添加多媒体表单
     */
    mediaNumExceed() {
        this.$message.warning('最多上传1个文件！');
    }

    /**
     * 上传前调用-添加多媒体表单
     * @param file 文件信息
     */
    beforeUploadMedia(file: File) {
        console.log(file, 1122);
        const isPicture = file.type === 'image/jpeg' || file.type === 'image/png';
        const isVideo = file.type === 'video/mp4' || file.type === 'video/x-msvideo' || file.type === 'video/x-ms-wmv';
        const isText = file.type === 'text/plain' || file.type === 'application/msword' || file.type ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type ===
            'application/vnd.ms-excel' || file.type ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/pdf' ||
            file.type === 'application/vnd.ms-powerpoint';

        if (this.formData.fileType === this.fileTypeData[0] && !isPicture) {
            this.$message.error('上传图片只能是 PNG、JPG 格式!');
            return false;
        }
        if (this.formData.fileType === this.fileTypeData[1] && !isVideo) {
            this.$message.error('请选择正确的视频文件格式!');
            return false;
        }
        if (this.formData.fileType === this.fileTypeData[2] && !isText) {
            this.$message.error('请选择正确的文本文件格式!');
            return false;
        }
        if (file.size / 1024 / 1024 > 50) {
            this.$message.error('上传文件大小不能超过 50MB!');
            return false;
        }
        return true;
    }

    /**
     * 上传成功-添加多媒体表单
     * @param response 响应结果
     * @param file 文件信息
     * @param fileList 文件列表
     */
    mediaUploadSuccess(response: any, file: File, fileList: File[]) {
        // this.formData.id = response.data;
        // this.formData.fileList.push(file);
    }

    /**
     * 删除上传文件-添加多媒体表单
     * @param file 文件信息
     * @param fileList 文件列表
     */
    mediaRemove(file: File, fileList: File[]) {
        this.formData.fileList = fileList;
    }

    async handleFileUpload(headers: any) {
        this.formData.fileList.push(headers.file);

        this.formData.fileList.pop();
        const timer = setInterval(() => {
            if (this.uploadPercent >= 100) {
                clearInterval(timer);
                this.uploadPercent = 0;
                this.formData.fileList.push(headers.file);
                return;
            }
            this.uploadPercent += 20;
        }, 500);

        // // step1 获取文件切片
        // const initChunks = this.createFileChunk(headers.file);
        // console.log(initChunks);
        // // step2 获取文件 md5 值
        // const md5 = await this.calculateFileMd5ByDefaultChunkSize(headers.file);
        // console.log(md5);
    }

    onFileChange(file: any) {
        // file.raw: File
        this.formData.fileList.push(file.raw);
        this.formData.fileList.pop();
        if (!this.beforeUploadMedia(file.raw)) {
            return;
        }
        // file.percentage = 100;
        // file.status = 'success';
        const timer = setInterval(() => {
            if (this.uploadPercent >= 100) {
                clearInterval(timer);
                this.uploadPercent = 0;
                this.formData.fileList.push(file.raw);
                return;
            }
            this.uploadPercent += 20;
        }, 500);
    }

    // CHUNK_SIZE = 5 * 1024 * 1024;
    CHUNK_SIZE = 100 * 1024;

    /**
     * @description: 文件切片
     * @param {*} file
     * @param {*} size 切片大小
     * @returns [{file}]
     */
    createFileChunk(file: File, size = this.CHUNK_SIZE) {
        const chunks = []
        let cur = 0
        while (cur < file.size) {
            chunks.push({file: file.slice(cur, cur + size)})
            cur += size
        }
        return chunks
    }

    calculateFileMd5ByDefaultChunkSize(file: File) {
        return this.calculateFileMd5(file, this.CHUNK_SIZE)
    }

    /**
     * @description: 分块计算文件的md5值
     * @param {*} file 文件
     * @param {*} chunkSize 分片大小
     * @returns {*}
     */
    calculateFileMd5(file: any, chunkSize: any) {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
            const chunks = Math.ceil(file.size / chunkSize)
            let currentChunk = 0
            const spark = new SparkMD5.ArrayBuffer();
            const fileReader = new FileReader()

            fileReader.onload = function (e) {
                // @ts-ignore
                spark.append(e.target.result)
                currentChunk++
                if (currentChunk < chunks) {
                    loadNext()
                } else {
                    const md5 = spark.end()
                    resolve(md5)
                }
            }

            fileReader.onerror = function (e) {
                reject(e)
            }

            function loadNext() {
                const start = currentChunk * chunkSize
                let end = start + chunkSize
                if (end > file.size) {
                    end = file.size
                }
                fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
            }

            loadNext()
        })
    }

}
</script>

<style scoped lang="less">
#BigFile {
    height: 100%;
    width: 100%;

    .upload-file {
        width: 100%;

        // 提示信息
        .el-upload__tip {
            width: 50%;
            //color: rgba(255, 255, 255, .5);
            margin-top: 0;
            display: flex;
            align-items: center;
        }

        /deep/ .el-upload-list__item-name {
            color: var(--zh-text);
        }

        // 文件列表
        /deep/ .el-upload-list__item {
            width: 50%;
            border: 1px solid rgba(255, 255, 255, .2);
            background-color: rgba(0, 0, 0, .2);
            margin-top: 0;
        }

        /deep/ .el-upload-list__item .el-icon-close {
            color: var(--zh-text);
        }
    }

}
</style>
