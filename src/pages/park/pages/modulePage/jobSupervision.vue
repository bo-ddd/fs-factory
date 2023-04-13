<template>
        <div class="job-supervision">
            <div class="item">
                <dv-border-box-12 class="datav">
                    <div class="datav-head">
                        厂区特殊作业类型对比
                    </div>
                    <div id="type-comparison" class="datav-content"></div>
                </dv-border-box-12>
            </div>
            <div class="item">
                <dv-border-box-12 class="datav">
                    <div class="datav-head">
                        厂区特殊作业监管
                    </div>
                    <div class="table  datav-content">
                        <dv-scroll-board :config="config" style="width:100%;height:100%; " />
                    </div>
                </dv-border-box-12>
            </div>
            <div class="item">
                <dv-border-box-12 class="datav">
    
                </dv-border-box-12>
            </div>
            <div class="item">
                <dv-border-box-12 class="datav">
    
                </dv-border-box-12>
            </div>
        </div>
    </template>
    <script setup lang="ts">
    import { getCurrentInstance, reactive, onMounted } from 'vue'
    let internalInstance = getCurrentInstance() as any;
    let echarts = internalInstance.appContext.config.globalProperties.$echarts;
    const typeComparison = function () {
        var chartDom = document.getElementById('type-comparison');
        var myChart = echarts.init(chartDom);
        var option;
    
        option = {
            tooltip: {
                trigger: 'item'
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '5%',
                top: '5%',
                containLabel: true
            },
            series: [
                {
                    type: 'pie',
                    radius: ['20%', '47%'],
                    center: ['50%', '50%'],
    
                    data: [
                        { value: 1048, name: '高空作业' },
                        { value: 735, name: '火工品装卸作业' },
                        { value: 580, name: '危险品包装作业' },
                        { value: 484, name: '有毒物质接触作业' },
                        { value: 300, name: '射线处理作业' },
                        { value: 300, name: '水上作业' },
                    ],
                    label: {
                        // show: true,
                        // position: 'top',
                        fontSize: 10,
                        color: '#fff'
    
                    },
    
                }
            ]
    
        };
    
        option && myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize()
        })
    }
    const tableData = reactive([
        {
            id: 1,
            job_type: '危化品装卸',
            job_time: '2022-01-01 08:00:00',
            job_duration: 180,
            job_operator: '张三',
            monitor_time: '2022-01-01 11:00:00',
            parameters: { "品名": "甲酸", "重量": "5吨" },
        }, {
            id: 2,
            job_type: '挖掘机作业',
            job_time: '22022-01-02 09:00:00',
            job_duration: 360,
            job_operator: '李四',
            monitor_time: '2022-01-02 15:00:00',
            parameters: { "挖掘深度": "10米", "开挖宽度": "2米", "挖掘量": "500立方米" },
        }, {
            id: 3,
            job_type: '高空作业',
            job_time: '2022-01-03 10:00:00',
            job_duration: 120,
            job_operator: '王五',
            monitor_time: '2022-01-03 12:00:00',
            parameters: { "高度": "50米", "安全措施": "安装2套安全防护设施" },
        }, {
    
            id: 4,
            job_type: '塔吊安装',
            job_time: '2022-01-04 11:00:00',
            job_duration: 480,
            job_operator: '赵六',
            monitor_time: '2022-01-04 19:00:00',
            parameters: { "吊装高度": "60米", "吊装重量": "20吨", "安装时长": "3天" },
        }, {
            id: 5,
            job_type: '脚手架搭建',
            job_time: '2022-01-05 12:00:00',
            job_duration: 240,
            job_operator: '钱七',
            monitor_time: '2022-01-05 16:00:00',
            parameters: { "搭建高度": "10层", "数量": "1000平方米" },
        }])
    
    const config = reactive({
        header: ['作业类型', '作业时长', '操作人员'],
        data: [
            ['危化品装卸', 180, '张三', ],
            ['挖掘机作业', 360, '李四'],
            ['高空作业', 120, '王五'],
            ['塔吊安装', 480, '赵六'],
            ['脚手架搭建', 240, '钱七'],
            ['脚手架搭建', 240, '钱七'],
            ['脚手架搭建', 240, '钱七']
    
        ],
        waitTime: 1000,
        headerBGC:'none',
        oddRowBGC:'none',
        evenRowBGC:'none',
        // columnWidth:[100,150,80,100,100    ],
        align:['center','center','center']
    })
    onMounted(() => {
        typeComparison()
    })
    </script>
    <style scoped lang="scss">
    .job-supervision {
        height: 100vh;
        display: grid;
        background-color: black;
        grid-template-columns: 1fr 3fr;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-areas:
            'a d'
            'b d'
            'c d'
        ;
    
        .item {
    
            .datav {
                height: 100%;
                padding:0 2rem 2rem 2rem ;
                box-sizing: border-box;
    
                .datav-head {
                    height: 5rem;
                    color: #fff;
                    line-height: 5rem;
                    padding-left: 2rem;
                    box-sizing: border-box;
                    font-size: 1.5rem;
                    font-weight: bold;
                }
    
                .datav-content {
                    height: calc(100% - 5rem);
                }
    
    
            }
        }
    
        .item:nth-of-type(1) {
            grid-area: a;
        }
    
        .item:nth-of-type(2) {
            grid-area: b;
    
    
        }
    
        .item:nth-of-type(3) {
            grid-area: c;
        }
    
        .item:nth-of-type(4) {
            grid-area: d;
        }
    
    
    
    }
    </style>
    