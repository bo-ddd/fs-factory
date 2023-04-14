import type { App } from "vue"
import EnergyManagementView from "./EnergyManagementView.vue"
import lxsbox from "./lxs/lxsBox.vue"
import LineChart from "./HiddenTrouble/HiddenLineChart/HiddenLineChart.vue"
import Histogram from './HiddenTrouble/HiddenHistogram/HiddenHistogram.vue'
export default {
  install(app: App<Element>) {
    app.component("EnergyManagementView", EnergyManagementView)
    app.component("lxsBox", lxsbox)
    app.component("LineChart", LineChart)
    app.component("Histogram", Histogram)
  }
}
