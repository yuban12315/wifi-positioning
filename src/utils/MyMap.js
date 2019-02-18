import View from 'ol/View.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import {Vector as VectorLayer} from 'ol/layer.js'
import {Vector as VectorSource} from 'ol/source.js'
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js'
import Map from 'ol/Map'

class MyMap {
    constructor (data) {
        this.data = data// GeoJSON数据
        this.map = null // Map实体
        this.view = null
        this.upperLeft = null// 地图左上角
        this.center = null // 地图中心位置
        this.lowerRight = null// 地图右下角

        this.initMap()
    }
    initMap () {
        const indexList1 = []
        const indexList2 = []
        for (const Feature of this.data.features) {
            indexList1.push(Feature.geometry.coordinates[0][0][0])
            indexList2.push(Feature.geometry.coordinates[0][0][1])
        }
        // 排序
        function sortNumber (a, b) {
            return a - b
        }
        indexList1.sort(sortNumber)
        indexList2.sort(sortNumber)
        const length = indexList1.length
        this.upperLeft = [indexList1[0], indexList2[0]]
        this.center = [indexList1[length / 2], indexList2[length / 2]]
        this.lowerRight = [indexList1[length - 1], indexList2[length - 1]]
        console.log(this.upperLeft, this.lowerRight)
        this.view = new View({
            center: this.center,
            zoom: 11
        })

        const vectorSource = new VectorSource({
            features: (new GeoJSON()).readFeatures(this.data)
        })
        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: this.$getStyle()
        })
        this.map = new Map({
            layers: [
                vectorLayer
            ],
            target: 'map',
            view: this.view
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
        return function (feature) {
            return styles[feature.getGeometry().getType()]
        }
    }

    getMap () {
        return this.map
    }
}

export default MyMap
