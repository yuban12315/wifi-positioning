<template>
  <vue-drawer-layout
          ref="drawer"
          :content-drawable="true"
          :drawer-width="400">
    <div class="drawer-content" slot="drawer">
      <!-- drawer-content -->
      <Config></Config>
    </div>
    <div slot="content">
      <!-- main-content -->
     <Map></Map>
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
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
