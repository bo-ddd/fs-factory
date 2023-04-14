<template>
    <div class="vehicle-monitoring">
        <div class="container">
            <div class="title"></div>
            <div class="item">
                <dv-border-box-10>
                    <div class="box-item">
                        <dv-decoration-11 class="title" style="width:200px;height:55px;">人员出入记录</dv-decoration-11>
                        <dv-scroll-board :config="config" style="width:100%;height:100%" />
                    </div>
                </dv-border-box-10>
            </div>
            <div class="item">
                <dv-border-box-10>
                    <div class="box-item">
                        <dv-decoration-11 class="title" style="width:200px;height:55px;">人员车辆分布</dv-decoration-11>
                        <main-view />
                    </div>
                </dv-border-box-10>
            </div>
            <div class="item">
                <dv-border-box-10>
                    <div class="box-item">
                        <dv-decoration-11 class="title" style="width:200px;height:55px;">车辆出入记录</dv-decoration-11>
                        <dv-scroll-board :config="config1" style="width:100%;height:100%" />
                    </div>
                </dv-border-box-10>
            </div>
            <div class="item">
                <dv-border-box-10>
                    <div class="box-item">
                        <dv-decoration-11 class="title" style="width:200px;height:55px;">人员车辆出入数量</dv-decoration-11>
                        <div id="main2" class="main"></div>
                    </div>
                </dv-border-box-10>
            </div>
            <div class="item">
                <dv-border-box-10>
                    <div class="box-item">
                        <dv-decoration-11 class="title" style="width:200px;height:55px;">物流信息记录</dv-decoration-11>
                        <dv-scroll-board :config="config3" style="width:100%;height:100%" />
                    </div>
                </dv-border-box-10>
            </div>
            <div class="item">
                <dv-border-box-10>
                    <div class="box-item">
                        <dv-decoration-11 class="title" style="width:200px;height:55px;">卡口出入统计</dv-decoration-11>
                        <div id="main" class="main"></div>
                    </div>
                </dv-border-box-10>
            </div>
            <div class="item">
                <dv-border-box-10>
                    <div class="box-item">
                        <dv-decoration-11 class="title" style="width:200px;height:55px;">布控预警</dv-decoration-11>
                        <div class="text">暂无预警</div>
                    </div>
                </dv-border-box-10>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import MainView from "@mars/components/mars-work/main-view.vue"
import { reactive, onMounted } from 'vue';
import * as echarts from 'echarts';
const config = reactive({
    header: ['<span style="color:#02e4f2">日期</span>', '<span style="color:#02e4f2">姓名</span>', '<span style="color:#02e4f2">职位</span>', '<span style="color:#02e4f2">联系方式</span>'],
    data: [
        ['2023-04-07', '马格烜', '经理', '18735772233'],
        ['2023-04-08', '侯鑫茹', '员工', '14735771188'],
        ['2023-04-09', '卫正阳', '员工', '14735771100'],
        ['2023-04-10', '朱鑫鹏', '总经理', '18335779900'],
        ['2023-04-11', '许鹏璞', '员工', '18834226644'],
        ['2023-04-12', '周永峰', '员工', '18834225544'],
        ['2023-04-13', '刘芳建', '员工', '18834224466'],
        ['2023-04-14', '李展鹏', '员工', '18834224411'],
        ['2023-04-15', '杨豪杰', '员工', '18834224477'],
        ['2023-04-16', '张震', '员工', '18834224499']
    ],
    headerBGC: 'none',
    oddRowBGC: 'none',
    evenRowBGC: 'none',
    align: ['center', 'center', 'center', 'center'],

})
const config1 = reactive({
    header: ['<span style="color:#02e4f2">日期</span>', '<span style="color:#02e4f2">车牌号</span>', '<span style="color:#02e4f2">品牌</span>', '<span style="color:#02e4f2">颜色</span>'],
    data: [
        ['2023-04-07', '晋LMX662', '上海大众', '白色'],
        ['2023-04-08', '晋LL8388', '上海大众', '灰色'],
        ['2023-04-09', '晋L00008', '奔驰', '黑色'],
        ['2023-04-10', '晋L8328A', '华晨中华', '棕色'],
        ['2023-04-11', '晋LZ898I', '上汽通用', '黑色'],
        ['2023-04-12', '晋L10X79', '宝马', '白色'],
        ['2023-04-13', '晋LLT290', '奔腾', '白色'],
        ['2023-04-14', '晋LDH720', '吉利帝豪', '棕色'],
        ['2023-04-15', '晋LF6892', '现代', '白色'],
        ['2023-04-16', '晋LY7880', '一汽丰田', '灰色']
    ],
    headerBGC: 'none',
    oddRowBGC: 'none',
    evenRowBGC: 'none',
    align: ['center', 'center', 'center', 'center', 'center', 'center', 'center']
})
const config3 = reactive({
    header: ['<span style="color:#02e4f2">日期</span>', '<span style="color:#02e4f2">物品ID</span>', '<span style="color:#02e4f2">数量</span>', '<span style="color:#02e4f2">重量(T)</span>'],
    data: [
        ['2023-04-07', '1', '150', '10'],
        ['2023-04-08', '2', '132', '12'],
        ['2023-04-09', '3', '101', '15'],
        ['2023-04-10', '4', '154', '8'],
        ['2023-04-11', '5', '142', '9'],
        ['2023-04-12', '6', '132', '4'],
        ['2023-04-13', '7', '135', '14'],
        ['2023-04-14', '8', '132', '12'],
        ['2023-04-15', '9', '111', '11'],
        ['2023-04-16', '10', '102', '20']
    ],
    headerBGC: 'none',
    oddRowBGC: 'none',
    evenRowBGC: 'none',
    align: ['center', 'center', 'center', 'center', 'center', 'center', 'center']
})
onMounted(() => {
    barChart()
    pieChart()
})
const barChart = function () {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    type EChartsOption = echarts.EChartsOption;
    const app: any = {}
    const posList = [
        'left',
        'right',
        'top',
        'bottom',
        'inside',
        'insideTop',
        'insideLeft',
        'insideRight',
        'insideBottom',
        'insideTopLeft',
        'insideTopRight',
        'insideBottomLeft',
        'insideBottomRight'
    ];
    app.configParameters = {
        rotate: {
            min: -90,
            max: 90
        },
        align: {
            options: {
                left: 'left',
                center: 'center',
                right: 'right'
            }
        },
        verticalAlign: {
            options: {
                top: 'top',
                middle: 'middle',
                bottom: 'bottom'
            }
        },
        position: {
            options: posList.reduce(function (map, pos) {
                map[pos] = pos;
                return map;
            }, {})
        },
        distance: {
            min: 0,
            max: 100
        }
    };
    app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
            const labelOption = {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
            };
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
            });
        }
    };
    const labelOption = {
        show: false,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
            name: {}
        }
    };
    const option: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['人员', '车辆', '物品', '事件', '预警'],
            textStyle: {
                color: '#fff'
            }
        },
        textStyle: { color: '#fff' },
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '人员',
                type: 'bar',
                barGap: 0,
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },

                data: [120, 132, 101, 134, 125, 167, 131]
            },
            {
                name: '车辆',
                type: 'bar',
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: [130, 102, 111, 144, 111, 102, 132]
            },
            {
                name: '物品',
                type: 'bar',
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: [150, 132, 101, 154, 142, 132, 135]
            },
            {
                name: '事件',
                type: 'bar',
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: [2, 5, 4, 3, 5, 1, 4, 8]
            },
            {
                name: '预警',
                type: 'bar',
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: [0, 0, 0, 0, 0, 0, 0]
            },
        ]
    };

    option && myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize()
    })
}
const pieChart = function () {
    const chartDom = document.getElementById('main2');
    const myChart = echarts.init(chartDom);
    type EChartsOption = echarts.EChartsOption;

    const option: EChartsOption = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: {
                color: '#fff'
            }
        },
        series: [
            {
                name: '来源',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 910, name: '人员' },
                    { value: 832, name: '车辆' },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    option && myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize()
    })
}
</script>

<style lang="scss" scoped>
.vehicle-monitoring {
    height: 100vh;
    background: url("../../assets/images/bg.gif");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;

    .container {
        height: calc(100% - 1rem);
        display: grid;
        box-sizing: border-box;
        grid-template-rows: 6rem 1fr 1fr 1fr;
        gap: 4rem;
        grid-template-columns: 2fr 3fr 2fr;
        grid-template-areas:
            'title title title'
            'a b c'
            'd b e'
            'f b g'
        ;

        .dv-border-box-10 {
            background-color: rgba(0, 0, 0, 0.1);
        }

        .box-item {
            height: 100%;
            box-sizing: border-box;
            padding: 3rem;
            display: flex;
            justify-content: center;

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
</style>
