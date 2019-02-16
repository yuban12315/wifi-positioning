import Feature from 'ol/Feature.js'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import Circle from 'ol/geom/Circle.js'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js'
import {OSM, Vector as VectorSource} from 'ol/source.js'
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js'

class myMap {
    constructor (data) {
        this.data = data
        this.map = null
        this.initMap()
    }
    initMap () {
        const jsonData = this.data
        const vectorSource = new VectorSource({
            features: (new GeoJSON()).readFeatures(jsonData)
        })
        console.log(vectorSource)

        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: this.$getStyle()
        })
        const map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                vectorLayer
            ],
            target: 'map',
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        })
    }

    $getStyle () {
        const image = new CircleStyle({
            radius: 5,
            fill: null,
            stroke: new Stroke({color: 'red', width: 1})
        })
        const styles = {
            Point: new Style({
                image
            }),
            LineString: new Style({
                stroke: new Stroke({
                    color: 'green',
                    width: 1
                })
            }),
            MultiLineString: new Style({
                stroke: new Stroke({
                    color: 'green',
                    width: 1
                })
            }),
            MultiPoint: new Style({
                image
            }),
            MultiPolygon: new Style({
                stroke: new Stroke({
                    color: 'yellow',
                    width: 1
                }),
                fill: new Fill({
                    color: 'rgba(255, 255, 0, 0.1)'
                })
            }),
            Polygon: new Style({
                stroke: new Stroke({
                    color: 'blue',
                    lineDash: [4],
                    width: 3
                }),
                fill: new Fill({
                    color: 'rgba(0, 0, 255, 0.1)'
                })
            }),
            GeometryCollection: new Style({
                stroke: new Stroke({
                    color: 'magenta',
                    width: 2
                }),
                fill: new Fill({
                    color: 'magenta'
                }),
                image: new CircleStyle({
                    radius: 10,
                    fill: null,
                    stroke: new Stroke({
                        color: 'magenta'
                    })
                })
            }),
            Circle: new Style({
                stroke: new Stroke({
                    color: 'red',
                    width: 2
                }),
                fill: new Fill({
                    color: 'rgba(255,0,0,0.2)'
                })
            })
        }
        const styleFunction = function (feature) {
            return styles[feature.getGeometry().getType()]
        }
    }

    getMap () {
        return this.map
    }
}

export default myMap
