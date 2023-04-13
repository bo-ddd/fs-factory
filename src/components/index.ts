import type { App } from "vue"
import EnergyManagementView from "./EnergyManagementView.vue"
import lxsbox from "./lxs/lxsBox.vue"
export default {
  install(app: App<Element>) {
    app.component("EnergyManagementView", EnergyManagementView)
    app.component("lxsBox", lxsbox)
  }
}
