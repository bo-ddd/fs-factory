<template>
    <div class="vehicle-monitoring">
        <div class="container">
            <div class="title"></div>
            <div class="item">
                <dv-border-box10>
                    <div class="box-item">
                        <dv-decoration-11 class="title" style="width:200px;height:55px;">人员出入记录</dv-decoration-11>
                        <dv-scroll-board :config="config" style="width:100%;height:100%" />
                    </div>
                </dv-border-box10>
            </div>
            <div class="item">
                <dv-border-box10>
                    <div class="box-item">
                        <dv-decoration-11 class="title" style="width:200px;height:55px;">人员车辆分布</dv-decoration-11>
                        <div class="min">
                            <!-- <main-view @mapLoaded="load" /> -->

                            <div class="load" v-if="flag">
                                <div class="loaderbg">
                                    <div class="spinner">
                                        <div class="double rect1"></div>
                                        <div class="double rect2"></div>
                                        <div class="double rect3"></div>
                                        <div class="double rect4"></div>
                                        <div class="double rect5"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <dv-border-box10>
                                    <div class="box-item">
                                        <dv-decoration-11 class="title"
                                            style="width:250px;height:55px;">人员车辆分布</dv-decoration-11>
                                        <div class="min">
                                            <main-view @mapLoaded="load" />
                                            <div class="load" v-if="flag">
                                                <div class="loaderbg">
                                                    <div class="spinner">
                                                        <div class="double rect1"></div>
                                                        <div class="double rect2"></div>
                                                        <div class="double rect3"></div>
                                                        <div class="double rect4"></div>
                                                        <div class="double rect5"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </dv-border-box10>
                            </div>
                            <div class="item">
                                <dv-border-box10>
                                    <div class="box-item">
                                        <dv-decoration-11 class="title"
                                            style="width:250px;height:55px;">有害物质统计</dv-decoration-11>
                                        <div id="main2" class="main"></div>
                                    </div>
                                </dv-border-box10>
                            </div>
                            <div class="item">
                                <dv-border-box10>
                                    <div class="box-item">
                                        <dv-decoration-11 class="title"
                                            style="width:250px;height:55px;">车辆出入记录</dv-decoration-11>
                                        <dv-scroll-board :config="config2" style="width:100%;height:100%" />
                                    </div>
                                </dv-border-box10>
                            </div>
                            <div class="item">
                                <dv-border-box10>
                                    <div class="box-item">
                                        <dv-decoration-11 class="title" style="width:250px;height:55px;">
                                            厂区外泄事故表
                                        </dv-decoration-11>
                                        <dv-scroll-board :config="config3" style="width:100%;height:100%" />

                                    </div>
                                </dv-border-box10>
                            </div>
                            <div class="item">
                                <dv-border-box10>
                                    <div class="box-item">
                                        <dv-decoration-11 class="title"
                                            style="width:250px;height:55px;">卡口出入统计</dv-decoration-11>
                                        <div id="main" class="main"></div>
                                    </div>
                                </dv-border-box10>
                            </div>
                            <div class="item">
                                <dv-border-box10>
                                    <div class="box-item">
                                        <dv-decoration-11 class="title"
                                            style="width:250px;height:55px;">视频监控</dv-decoration-11>
                                        <el-button class="btn border" type="primary"
                                            @click="toBayonetMonitor()">卡口监控</el-button>
                                        <el-button class="btn disable" type="primary" @click="open1">华辉捷厂区监控</el-button>
                                    </div>
                                </dv-border-box10>
                            </div>
                        </div>
                    </div>
                </dv-border-box10>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import MainView from "@mars/components/mars-work/main-view.vue"
import { reactive, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import * as echarts from "echarts"
import { BorderBox10 as DvBorderBox10, Decoration11 as DvDecoration11, ScrollBoard as DvScrollBoard } from "@kjgl77/datav-vue3"
import { ElMessage } from 'element-plus'
const router = useRouter()
let flag = ref(true);
let load = function () {
    flag.value = false
}
const config = reactive({
    header: [
        '<span style="color:#02e4f2">日期</span>',
        '<span style="color:#02e4f2">姓名</span>',
        '<span style="color:#02e4f2">职位</span>',
        '<span style="color:#02e4f2">联系方式</span>'
    ],
    data: [
        ["2023-04-07", "陈甩甩", "活化班长", "18735772233"],
        ["2023-04-08", "张荣荣", "化验员", "14735771188"],
        ["2023-04-09", "张顺业", "搅拌工", "14735771100"],
        ["2023-04-10", "赵少飞", "电工", "18335779900"],
        ["2023-04-11", "赵阳升", "出料皮带工", "18834226644"],
        ["2023-04-12", "郑康康", "搅拌工", "18834225544"],
        ["2023-04-13", "范芝鸽", "化验员", "18834224466"],
        ["2023-04-14", "杨洋", "会计", "18834224411"]
    ],
    headerBGC: "none",
    oddRowBGC: "none",
    evenRowBGC: "none",
    align: ["center", "center", "center", "center"]
})
const config2 = reactive({
    header: [
        '<span style="color:#02e4f2">时间</span>',
        '<span style="color:#02e4f2">车牌号</span>',
        '<span style="color:#02e4f2">车主</span>',
        '<span style="color:#02e4f2">备注</span>'
    ],
    data: [
        ["2022-05-02 9:00", "湘A12345", "周兴旺", "携带原材料(进厂)"],
        ["2022-05-05 10:30", "湘B56789", "邓峰", "维护设备(进厂)"],
        ["2022-05-09 12:00", "苏C24680", "郑康康", "无(出厂)"],
        ["2022-05-11 14:30", "皖D13579", "郑凯", "工作餐(进厂)"],
        ["2022-05-12 15:45", "皖D24680", "赵阳升", "携带成品(出厂)"],
        ["2022-05-15 7:30", "苏E13579", "赵少飞", "无(进厂)"],
        ["2022-05-18 9:00", "苏E24680", "张忠康", "实习生(出厂)"],
        ["2022-05-20 11:00", "鲁F24680", "张顺业", "维修(进厂)"],
        ["2022-05-22 12:00", "鲁F13579", "张荣荣", "加油(出厂)"],
        ["2022-05-28 15:00", "皖G12345", "张林", "携带成品(出厂)"]
    ],
    headerBGC: "none",
    oddRowBGC: "none",
    evenRowBGC: "none",
    columnWidth: ["150", "100", "100", "150"],
    align: ["center", "center", "center", "center", "center", "center", "center"]
})
const config3 = reactive({
    header: [
        '<span style="color:#02e4f2">日期</span>',
        '<span style="color:#02e4f2">类型</span>',
        '<span style="color:#02e4f2">原因</span>',
        '<span style="color:#02e4f2">地点</span>',
        '<span style="color:#02e4f2">泄露量(T)</span>',
    ],
    data: [
        ["2020-04-02", "活性碳物质", "管道泄漏", "厂区A", "2"],
        ["2020-06-10", "活性碳粉末", "防护罩受损", "厂区C", "5"],
        ["2020-07-22", "溶剂", "未关闭阀门", "厂区E", "2"],
        ["2020-08-17", "二氧化碳", "系统故障", "厂区D", "3"],
        ["2020-09-03", "废水", "排水故障", "厂区B", "6"],
        ["2021-01-06", "活性碳气体", "温度过高", "厂区F", "2"],
    ],
    headerBGC: "none",
    oddRowBGC: "none",
    evenRowBGC: "none",
    align: ["center", "center", "center", "center", "center"]
})
const open1 = () => {
    ElMessage('该摄像头暂未接入！')
}
onMounted(() => {
    barChart()
    pieChart()
})
const toBayonetMonitor = function () {
    router.push("securityMonitoringManagement")
}
const barChart = function () {
    const chartDom = document.getElementById("main")
    const myChart = echarts.init(chartDom)
    type EChartsOption = echarts.EChartsOption
    const app: any = {}
    const posList = [
        "left",
        "right",
        "top",
        "bottom",
        "inside",
        "insideTop",
        "insideLeft",
        "insideRight",
        "insideBottom",
        "insideTopLeft",
        "insideTopRight",
        "insideBottomLeft",
        "insideBottomRight"
    ]
    app.configParameters = {
        rotate: {
            min: -90,
            max: 90
        },
        align: {
            options: {
                left: "left",
                center: "center",
                right: "right"
            }
        },
        verticalAlign: {
            options: {
                top: "top",
                middle: "middle",
                bottom: "bottom"
            }
        },
        position: {
            options: posList.reduce(function (map, pos) {
                map[pos] = pos
                return map
            }, {})
        },
        distance: {
            min: 0,
            max: 100
        }
    }
    app.config = {
        rotate: 90,
        align: "left",
        verticalAlign: "middle",
        position: "insideBottom",
        distance: 15,
        onChange: function () {
            const labelOption = {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
            }
            myChart.setOption({
                series: [
                    {
                        label: labelOption
                    },
                    {
                        label: labelOption
                    },
                    {
                        label: labelOption
                    },
                    {
                        label: labelOption
                    }
                ]
            })
        }
    }
    const labelOption = {
        show: false,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: "{c}  {name|{a}}",
        fontSize: 16,
        rich: {
            name: {}
        }
    }
    const option: EChartsOption = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            }
        },
        grid: {
            left: "5%",
            right: "5%",
            top: "20%",
            bottom: "5%",
            containLabel: true
        },
        legend: {
            data: ["人员", "车辆", "事件", "预警"],
            textStyle: {
                color: "#fff"
            }
        },
        textStyle: { color: "#fff" },
        xAxis: [
            {
                type: "category",
                axisTick: { show: false },
                data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
            }
        ],
        yAxis: [
            {
                type: "value"
            }
        ],
        series: [
            {
                name: "人员",
                type: "bar",
                barGap: 0,
                label: labelOption,
                emphasis: {
                    focus: "series"
                },

                data: [120, 132, 101, 134, 125, 167, 131]
            },
            {
                name: "车辆",
                type: "bar",
                label: labelOption,
                emphasis: {
                    focus: "series"
                },
                data: [130, 102, 111, 144, 111, 102, 132]
            },
            {
                name: "事件",
                type: "bar",
                label: labelOption,
                emphasis: {
                    focus: "series"
                },
                data: [2, 5, 4, 3, 5, 1, 4, 8]
            },
            {
                name: "预警",
                type: "bar",
                label: labelOption,
                emphasis: {
                    focus: "series"
                },
                data: [0, 0, 0, 0, 0, 0, 0]
            }
        ]
    }

    option && myChart.setOption(option)
    window.addEventListener("resize", function () {
        myChart.resize()
    })
}
const pieChart = function () {
    const chartDom = document.getElementById("main2")
    const myChart = echarts.init(chartDom)
    type EChartsOption = echarts.EChartsOption

    const option: EChartsOption = {
        tooltip: {
            trigger: "item"
        },
        legend: {
            orient: "vertical",
            left: 'right',
            textStyle: {
                color: "#fff"
            }
        },
        series: [
            {
                name: "来源",
                type: "pie",
                radius: "50%",
                data: [
                    { value: 4, name: "活性炭" },
                    { value: 8, name: "溶剂" },
                    { value: 3, name: "二氧化碳" },
                    { value: 2, name: "废水" },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                }
            }
        ]
    }

    option && myChart.setOption(option)
    window.addEventListener("resize", function () {
        myChart.resize()
    })
}
</script>

<style lang="scss" scoped>
.disable {
    background: #ccc;
    border: none;
}

.min {
    width: 100%;
    height: 100%;
    position: relative;
}

.load {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
}

.loaderbg {
    background-color: #06192c;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999;
}

.spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -25px;
    margin-top: -30px;
    width: 50px;
    height: 60px;
    text-align: center;
    font-size: 10px;
}

.spinner>.double {
    background: #49a9ee;
    height: 100%;
    width: 6px;
    display: inline-block;
    -webkit-animation: stretchDelay 1.2s infinite ease-in-out;
    animation: stretchDelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.spinner .rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
}

.spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}

@-webkit-keyframes stretchDelay {

    0%,
    40%,
    100% {
        -webkit-transform: scaleY(0.4);
    }

    20% {
        -webkit-transform: scaleY(1);
    }
}

@keyframes stretchDelay {

    0%,
    40%,
    100% {
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
    }

    20% {
        transform: scaleY(1);
        -webkit-transform: scaleY(1);
    }
}

.vehicle-monitoring {
    height: 100vh;
    background: url("https://unier.oss-cn-beijing.aliyuncs.com/avatar/bg.gif");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;

    .container {
        height: calc(100% - 1rem);
        display: grid;
        box-sizing: border-box;
        grid-template-rows: 6rem 1fr 1fr 1fr;
        gap: 3rem;
        grid-template-columns: 2fr 3fr 2fr;
        grid-template-areas:
            "title title title"
            "a b c"
            "d b e"
            "f b g";

        .dv-border-box10 {
            background-color: rgba(0, 0, 0, 0.1);
        }

        .box-item {
            height: 100%;
            box-sizing: border-box;
            padding: 3rem 2rem;
            display: flex;
            justify-content: center;
            align-items: center;

            .text {
                height: 100%;
                color: #fff;
                font-size: 3rem;
                display: flex;
                align-items: center;
            }

            .main {
                width: 100%;
                height: 100%;
            }

            .title {
                font-size: 2rem;
                font-weight: 700;
                color: rgb(2, 175, 215);
                top: -27px;
                position: absolute;
            }
        }

        .title {
            grid-area: title;
        }

        .item:nth-of-type(2) {
            grid-area: a;
        }

        .item:nth-of-type(3) {
            grid-area: b;
        }

        .item:nth-of-type(4) {
            grid-area: c;
        }

        .item:nth-of-type(5) {
            grid-area: d;
        }

        .item:nth-of-type(6) {
            grid-area: e;
        }

        .item:nth-of-type(7) {
            grid-area: f;
        }

        .item:nth-of-type(8) {
            grid-area: g;
        }
    }
}

.border {
    animation: border 5s infinite linear;

}

:deep(.btn) {
    height: 4rem;
}

@keyframes border {
    0% {
        border: .3rem solid #7700ff;
    }

    40% {
        border: .3rem solid #874ed1;
    }

    60% {
        border: .3rem solid #003380;
    }

    100% {
        border: .3rem solid #031cff;
    }
}
</style>
