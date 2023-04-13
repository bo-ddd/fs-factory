import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHashHistory } from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        name: "login",
        path: "/login",
        component: () => import("../pages/login/login.vue")
    },
    {
        name: "layout",
        path: "/layout",
        component: () => import("../pages/layout/layout.vue"),
        children: [
            {
                name: "MajorHazard",
                path: "/MajorHazard",
                component: () => import("../pages/modulePage/MajorHazard.vue")
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
