import * as mars3d from "mars3d"
export let map // mars3d.Map三维地图对象
export let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
    scene: {
        fxaa: true,
        center: { lat: 36.020720, lng: 111.843592, alt: 1000, heading: 13, pitch: -37 },
    }
}

export const eventTarget = new mars3d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
    map = mapInstance // 记录map
    // map.basemap = 2017 // 蓝色底图
    map.fixedLight = true // 固定光照，避免gltf模型随时间存在亮度不一致。

    // 创建矢量数据图层
    graphicLayer = new mars3d.layer.GraphicLayer()
    map.addLayer(graphicLayer)

    // 在layer上绑定监听事件
    graphicLayer.on(mars3d.EventType.click, function (event) {
        // console.log("监听layer，单击了矢量对象", event)
    })

    bindLayerPopup() // 在图层上绑定popup,对所有加到这个图层的矢量数据都生效

    // 加一些演示数据
    addDemoGraphic3(graphicLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
    map = null
    graphicLayer.remove()
    graphicLayer = null
}


function addDemoGraphic3(graphicLayer) {
    const graphic = new mars3d.graphic.ModelEntity({
        name: "汽车",
        position: [111.8444, 36.02393333333333, 788],
        style: {
            url: "http://data.mars3d.cn/gltf/mars/qiche.gltf",
            heading: 101,
            scale: 0.4,
            minimumPixelSize: 10,
            silhouette: false,
            distanceDisplayCondition: true,
            clampToGround: true,
            label: {
                text: "晋L10X79",
                font_size: 18,
                color: "#0033ff",
                pixelOffsetY: -5,
                distanceDisplayCondition: true,
                distanceDisplayCondition_far: 10000,
                distanceDisplayCondition_near: 100
            }
        }
    })

    graphicLayer.addGraphic(graphic)
    setTimeout(() => {
        graphic.moveTo({
            position: [111.8418, 36.01393333333333, 788],
            time: 300
        })
    }, 3000)
}


export function addRandomGraphicByCount(count) {
    graphicLayer.clear()
    graphicLayer.enabledEvent = false

    const bbox = [116.984788, 31.625909, 117.484068, 32.021504]
    const result = mars3d.PolyUtil.getGridPoints(bbox, count, 30)
    console.log("生成的测试网格坐标", result)

    for (let j = 0; j < result.points.length; ++j) {
        const position = result.points[j]
        const index = j + 1

        const graphic = new mars3d.graphic.ModelEntity({
            position: position,
            style: {
                url: "http://data.mars3d.cn/gltf/mars/qiche.gltf",
                scale: 10
            },
            attr: { index: index }
        })
        graphicLayer.addGraphic(graphic)
    }

    graphicLayer.enabledEvent = true
    return result.points.length
}

export function startDrawGraphic() {
    graphicLayer.startDraw({
        type: "model",
        style: {
            scale: 10,
            url: "http://data.mars3d.cn/gltf/mars/firedrill/xiaofangche.gltf",
            label: {
                text: "可以同时支持文字",
                font_size: 20,
                color: "#ffffff",
                outline: true,
                outlineColor: "#000000",
                pixelOffsetY: -20
            }
        }
    })
}

export function bindLayerPopup() {
    graphicLayer.bindPopup(function (event) {
        const attr = event.graphic.attr || {}
        attr["类型"] = "宝马"
        attr["驾驶人"] = "周永峰"
        attr["车牌"] = "晋L10X79"

        return mars3d.Util.getTemplateHtml({ title: "车辆信息", template: "all", attr: attr })
    })
}
