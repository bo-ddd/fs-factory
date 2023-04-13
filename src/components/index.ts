import type { App } from "vue";
import EnergyManagementView from "@/components/EnergyManagementView.vue"
export default {
    install(app:App<Element>){
        app.component('EnergyManagementView',EnergyManagementView);
    }
}