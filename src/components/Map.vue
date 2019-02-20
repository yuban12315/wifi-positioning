<template>
  <div
    id="map"
    class="map"
  />
</template>

<script>
import MyMap from '../utils/MyMap'
export default {
    name: 'Map',
    data () {
        return {
            myMap: ''
        }
    },
    async created () {
        console.log('create')
        const data = await this.$localStorage.get('data')
        if (data !== null || data !== undefined) {
            this.Map()
            this.getPosition()
        }
    },
    methods: {
        // 初始化地图
        Map () {
            const jsonData = JSON.parse(this.$localStorage.get('data'))
            const myMap = new MyMap(jsonData)
            this.myMap = myMap
            const map = myMap.getMap()
            // console.log(map)
        },
        // 获取定位信息
        async getPosition () {
            const res = await this.$axios.get('/api/position/list')
            if (res.status) {
                this.myMap.refreshMap(res.data.data)
            }
        }
    }
}
</script>

<style scoped>
.map{
  border: black 1px  solid;
  padding: 10px;
  height: 600px;
  width: 100%;
}
</style>
