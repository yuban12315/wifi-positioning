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
        return {}
    },
    created () {
        const data = this.$localStorage.get('data')
        if (data !== null || data !== undefined) {
            this.initMap()
        }
    },
    methods: {
        initMap () {
            const jsonData = JSON.parse(this.$localStorage.get('data'))
            const myMap = new MyMap(jsonData)
            const map = myMap.getMap()
            // console.log(map)
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
