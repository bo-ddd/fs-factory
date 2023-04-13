import "mars3d-cesium/Build/Cesium/Widgets/widgets.css"
import "mars3d/dist/mars3d.css"
import "./assets/css/main.css"

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

const app = createApp(Application)

// MarsUIInstall(app)

app.use(injectState(store), key)
app.use(DataVVue3)
app.use(router)
app.use(ElementPlus)
app.mount("#app")
