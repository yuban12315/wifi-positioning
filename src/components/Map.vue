<template>
    <div >2222222</div>
</template>

<script>
    import Map from "ol/Map";
    import View from "ol/View";
    import TileLayer from "ol/layer/Tile";
    import XYZ from "ol/source/XYZ";
    import Source from 'ol/source/Vector'
    import GeoJson from 'ol/format/GeoJSON'
    import 'ol/ol.css'
    import ol from 'ol'
    export default {
        name: "Map",
        data(){
            return{

            }
        },
        methods:{
            initMap(){
                const jsonData=JSON.parse(this.$localStorage.get('data'))
                const vectorSource=new Source({
                    features: (new GeoJson()).readFeatures(jsonData)
                })
                console.log(vectorSource)
            }
        },
        created() {
            const data=this.$localStorage.get('data')
            if (data!==null||data!==undefined) {
                this.initMap()
            }
        }
    }
</script>

<style scoped>

</style>