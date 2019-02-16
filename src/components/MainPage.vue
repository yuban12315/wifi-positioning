<template>
  <vue-drawer-layout
    ref="drawer"
    :content-drawable="true"
    :drawer-width="400"
  >
    <div
      slot="drawer"
      class="drawer-content"
    >
      <!-- drawer-content -->
      <Config />
    </div>
    <div slot="content">
      <!-- main-content -->
      <Map ref="map" />
    </div>
  </vue-drawer-layout>
</template>

<script>
import Config from './Config'
import Map from './Map'
export default {
    name: 'HelloWorld',
    components: {Map, Config},
    props: {
        msg: String
    },
    methods: {
        emit () {
            this.$refs.drawer.toggle(false)
            this.$refs.map.initMap()
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
