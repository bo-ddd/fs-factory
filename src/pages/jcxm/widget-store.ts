/**
 * index页面的widget配置
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2022-02-19
 */
import { defineAsyncComponent, markRaw } from "vue"
import { WidgetState } from "@mars/common/store/widget"
import { StoreOptions } from "vuex"

const store: StoreOptions<WidgetState> = {
  state: {
    widgets: [
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/query-poi/index.vue"))),
        name: "query-poi",
        autoDisable: true
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/toolbar/index.vue"))),
        name: "toolbar",
        autoDisable: true
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-basemap/index.vue"))),
        name: "manage-basemap",
        group: "manage"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/index.vue"))),
        name: "manage-layers",
        group: "manage",
        disableOther: ["roamLine"]
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/layer-tree.vue"))),
        name: "layer-tree"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/layer-picture-heatmap.vue"))),
        name: "layer-picture-heatmap"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/layer-picture-guihua.vue"))),
        name: "layer-picture-guihua"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/location-point/index.vue"))),
        name: "location-point",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/map-compare/index.vue"))),
        name: "map-compare",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/map-split/index.vue"))),
        name: "map-split",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/query-route/index.vue"))),
        name: "query-route",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/roamLine-list/index.vue"))),
        name: "roamLine-list",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/roamLine/index.vue"))),
        name: "roamLine",
        group: "tools",
        disableOther: ["manage-layers"]
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/plot/index.vue"))),
        name: "plot",
        group: "tools",
        meta: {
          hasClear: true // 关闭标绘是否清除数据
        }
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/plot/add-plot-tree.vue"))),
        name: "addPlotTree"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/bookmark/index.vue"))),
        name: "bookmark",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/measure/index.vue"))),
        name: "measure",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/location-region/index.vue"))),
        name: "location-region",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/addmarker/index.vue"))),
        name: "addmarker",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/graphic-editor/index.vue"))),
        name: "graphic-editor"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/analysis/index.vue"))),
        name: "analysis",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/street-view/index.vue"))),
        name: "street-view",
        autoDisable: true,
        disableOther: true
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/print/index.vue"))),
        name: "print",
        autoDisable: true,
        disableOther: true
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/graphic-editor/index.vue"))),
        name: "graphic-editor",
        group: "tools"
      },

      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/control-clock/index.vue"))),
        name: "control-clock",
        group: "tools"
      }
    ],
    openAtStart: ["query-poi", "toolbar"]
  }
}

export default store

// src\widgets\basic\toolbar\index.vue 中使用的菜单数组
window.toolBarMenuData = [
  { name: "底图", icon: "international", widget: "manage-basemap" },
  { name: "图层", icon: "layers", widget: "manage-layers" },
  {
    name: "工具",
    icon: "tool",
    children: [
      { name: "图上量算", icon: "ruler", widget: "measure" },
      { name: "空间分析", icon: "analysis", widget: "analysis" },
      { name: "坐标定位", icon: "local", widget: "location-point" },
      { name: "地区导航", icon: "navigation", widget: "location-region" },
      { name: "我的标记", icon: "mark", widget: "addmarker" },
      { name: "视角书签", icon: "bookmark", widget: "bookmark" },
      { name: "地图打印", icon: "printer", widget: "print" },
      { name: "飞行漫游", icon: "take-off", widget: "roamLine-list" },
      { name: "图上标绘", icon: "hand-painted-plate", widget: "plot" },
      { name: "路线导航", icon: "connection", widget: "query-route" },
      { name: "卷帘对比", icon: "switch-contrast", widget: "map-split" },
      { name: "分屏对比", icon: "full-screen-play", widget: "map-compare" }
      // { name: "百度街景", icon: h(City, { theme: "outline", size: "18" }), widget: "street-view" }
    ]
  }
]
