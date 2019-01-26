<template>
    <div>2222222</div>
</template>

<script>
    import Map from "ol/Map";
    import View from "ol/View";
    import TileLayer from "ol/layer/Tile";
    import XYZ from "ol/source/XYZ";
    import 'ol/ol.css'
    export default {
        name: "Map",
        initMap() {
            new Map({
                target: "map",
                layers: [
                    new TileLayer({
                        source: new XYZ({
                            url: "http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
                        })
                    }),
                    new TileLayer({
                        source: new XYZ({
                            url: "http://t2.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}"
                        }),
                        isGroup: true,
                        name: "天地图文字标注"
                    })
                ],
                view: new View({
                    zoom: 4
                })
            });
        }
    }
</script>

<style scoped>

</style>