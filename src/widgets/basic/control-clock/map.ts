import * as mars3d from "mars3d"

let map: mars3d.Map // 地图对象
let clockAnimate: mars3d.control.ClockAnimate
let timeline: mars3d.control.Timeline

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars3d.BaseClass()

// 初始化当前业务
export function onMounted(mapInstance: mars3d.Map): void {
  map = mapInstance // 记录map

  if (map) {
    mapClock()
  }
}

// 释放当前业务
export function onUnmounted(): void {
  closeClock()
  map = null
}

function mapClock() {
  // 时钟控制（可替代cesium本身的animation）
  clockAnimate = new mars3d.control.ClockAnimate({
    format: "yyyy-MM-dd HH:mm:ss"
  })
  map.addControl(clockAnimate)

  timeline = new mars3d.control.Timeline({
    style: {
      bottom: "0px"
    }
  })
  map.addControl(timeline)

  timeline.zoomTo(map.clock.startTime, map.clock.stopTime)
  if (map) {
    map.controls.locationBar.show = false
  }
}

function closeClock() {
  map.removeControl(clockAnimate)
  map.removeControl(timeline)
  if (map) {
    map.controls.locationBar.show = true
  }
}
