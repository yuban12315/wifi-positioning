<template>
  <div
    id="map"
    class="map"
  />
</template>

<script>
import MyMap from './../utils/myMap'
export default {
    name: 'Map',
    data () {
        return {

        }
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
        }
    }
}
</script>

<style scoped>

</style>
