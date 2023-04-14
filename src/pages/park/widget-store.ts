import { defineAsyncComponent, markRaw } from "vue"
import { WidgetState } from "@mars/common/store/widget"
import { StoreOptions } from "vuex"

const store: StoreOptions<WidgetState> = {
  state: {
    widgets: [
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/mycar2/index.vue"))),
        name: "mycar2"
      }
    ],
    openAtStart: ["mycar2"]
  }
}

export default store
