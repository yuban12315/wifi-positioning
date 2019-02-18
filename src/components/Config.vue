<template>
  <div class="upload_demo">
    <el-upload
      drag
      :auto-upload="false"
      action=""
      accept="shp"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :limit="1"
      :on-change="bind"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将shp文件拖到此处，或<em>点击配置</em>
      </div>

      <div
        slot="tip"
        class="el-upload__tip"
      >
        必须是shp文件
      </div>
    </el-upload>
    <el-button
      style="margin-left: 10px;"
      size="small"
      type="success"
      @click="config"
    >
      配置地图
    </el-button>
  </div>
</template>

<script>
import {open} from 'shapefile'
export default {
    name: 'Config',
    data () {
        return {
            file: {}
        }
    },
    methods: {
        config () {
            // 判断文件是否为shp文件
            const name = this.file.name
            const extension = name.split('.')[1]
            // console.log(extension)
            if (extension !== 'shp') {
                this.$alert('文件不是shp文件！请重新选择文件', {
                    confirmButtonText: '确定'
                })
            } else {
                const reader = new FileReader()
                const fileData = this.file.raw
                reader.readAsArrayBuffer(fileData)
                const GeoJson = {type: 'FeatureCollection', features: []}
                let count = 0
                const LocalStorage = this.$localStorage
                // 从el-upload看，第一层parent是Config，第二层parent才是MainPage
                const parent = this.$parent.$parent
                reader.onload = function (e) {
                    open(this.result)
                        .then((source) => source.read()
                            .then(function log (result) {
                                if (result.done) return
                                GeoJson.features[count++] = result.value
                                // console.log(result.value);
                                return source.read().then(log)
                            }))
                        .catch((error) => console.error(error.stack)).then(() => {
                            LocalStorage.set('data', JSON.stringify(GeoJson))
                            parent.emit()
                        })
                }
            }
        },
        handleRemove (file, fileList) {
            // console.log(file, fileList);
        },
        handlePreview (file) {
            console.log(file)
        },
        bind (files, fileList) {
            // 绑定文件
            this.file = fileList[0]
            // console.log(this.file)
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
