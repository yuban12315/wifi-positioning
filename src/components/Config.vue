<template>
    <div class="upload_demo">
        <el-upload
                   drag
                   :auto-upload=false
                   action=""
                   accept="shp"
                   :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   :limit="1"
                   :file-list="files"
                   :on-change="bind"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将shp文件拖到此处，或<em>点击配置</em></div>

            <div class="el-upload__tip" slot="tip">必须是shp文件</div>
        </el-upload>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="config">配置地图</el-button>
    </div>
</template>

<script>
    export default {
        name: "Config",
        data(){
            return{
                checkTag:true,
                file:{}
            }
        },
        methods:{
            config() {
                const name=this.file.name
                const extension=name.split('.')[1]
                console.log(extension)
                if('shp'!==extension){
                    this.$alert('文件不是shp文件！请重新选择文件', {
                        confirmButtonText: '确定'
                    })
                }else {
                    const reader=new FileReader()
                    reader.readAsBinaryString(this.file.raw)
                    reader.onload = function(e){
                        console.log(this.result)//图片的base64数据
                    }
                }

            },
            handleRemove(file, fileList) {
                //console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            bind(files, fileList){
                //绑定文件
                this.file=fileList[0]
                console.log(this.file)
            }

        }
    }
</script>

<style scoped>
    .upload_demo{
        text-align: center;
        margin-top: 50px;
    }
    .el-button{
       margin-top: 10px;
    }
</style>