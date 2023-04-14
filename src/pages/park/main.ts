import "mars3d-cesium/Build/Cesium/Widgets/widgets.css"
import "mars3d/dist/mars3d.css"
import "./assets/css/main.css"
import "./assets/css/common.css"

import "./assets/lib/flexible"
import { createApp } from "vue"
import Application from "./pages/App.vue"
import { injectState, key } from "@mars/common/store/widget"
import store from "./widget-store"
import MarsUIInstall from "@mars/components/mars-ui"
import "@mars/components/mars-ui/common"
import { router } from "./router/index"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import DataVVue3 from "@kjgl77/datav-vue3"
import "video.js/dist/video-js.css"
import Video from "video.js"
import video_zhCN from "video.js/dist/lang/zh-CN.json"
import video_en from "video.js/dist/lang/en.json"
import components from "@mars/components"



Video.addLanguage("zh-CN", video_zhCN)
Video.addLanguage("en", video_en)

const app = createApp(Application)

MarsUIInstall(app)

app.use(injectState(store), key)
app.use(components)
app.use(DataVVue3)
app.use(router)
app.use(ElementPlus)
app.mount("#app")
