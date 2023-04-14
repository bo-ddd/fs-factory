<template>
    <div class="home">
        <div class="home_box">
            <div class="item">
                <lxsBox class="lxsBox" :lxsBoxData="left1Data">
                    <div class="inspection_records">
                        <dv-scroll-board :config="config" style="width:100%;height:100%" @click="clickHandler" />
                    </div>
                </lxsBox>
            </div>
            <div class="item">
                <video :id='video.idName' class="video-js vjs-fluid vjs-big-play-centered" autoplay="false">
                    <source :src=video.url style="width: 100%; height: 100% !important;" type="application/x-mpegURL">
                </video>
            </div>
            <div class="item">
                <lxsBox class="lxsBox" :lxsBoxData="right1Data">
                    <!-- 这是右边top的数据 -->
                    <div class="reminder-alarm">

                        <div class="empty-state" v-for="emptyStateItem in right1DomData" :key="emptyStateItem.id">
                            <div class="title">
                                {{ emptyStateItem.title + emptyStateItem.id }}
                            </div>
                            <div class="set">
                                <div @click="nav(emptyStateItem.title + emptyStateItem.id + '查看')">查看</div>
                                <div @click="nav(emptyStateItem.title + emptyStateItem.id + '忽略')">忽略</div>
                                <div @click="nav(emptyStateItem.title + emptyStateItem.id + '处理')">去处理</div>
                            </div>
                        </div>

                    </div>
                </lxsBox>
            </div>
            <div class="item">
                <lxsBox class="lxsBox" :lxsBoxData="left2Data">
                    <!-- <div id="left-main" style="width: 100%; height: 99%;"></div> -->
                    <div id="init-lift-top"></div>
                </lxsBox>
            </div>
            <div class="item">
                <lxsBox class="lxsBox" :lxsBoxData="right2Data">
                    <div class="info">
                        <div class="info_box">
                            <div>
                                <b>报警信息：</b>
                                <span>某某某某某 报警！</span>
                            </div>
                            <div>
                                <b>报警时间：</b>
                                <span>04月02日 12:30</span>
                            </div>
                            <div>
                                <b>报警地点：</b>
                                <span>1号仓库西北角xxx机器</span>
                            </div>
                            <div>
                                <b>报警类型：</b>
                                <span>失火！</span>
                            </div>
                        </div>
                        <div class="info_box">
                            <div>
                                <b>报警级别：</b>
                                <span>紧急！</span>
                            </div>
                            <div>
                                <b>值班人员：</b>
                                <span>某某某</span>
                            </div>
                            <div>
                                <b>联系电话：</b>
                                <span>13111112032</span>
                            </div>
                        </div>
                    </div>
                </lxsBox>
            </div>
            <div class="item">
                <lxsBox class="lxsBox" :lxsBoxData="left3Data">
                    <div id="init-right-top"></div>
                    <!-- <div id="left3-main" style="width: 100%; height: 100%;"></div> -->
                </lxsBox>
            </div>
            <div class="item">
                <lxsBox class="lxsBox" :lxsBoxData="center2Data">
                    <div class="video_list">
                        <div class="video_item video_left">
                            <video id='lxs_myvideo2' class="video-js vjs-fluid vjs-big-play-centered" autoplay="false">
                                <source
                                    src='https://cmgw-vpc.lechange.com:8890/LCO/7C0C9D0PAZA5DDA/0/1/20220330T143518/55d0d87f67c0f0225c97aec0b3eb4fa6.m3u8?proto=https'
                                    style="width: 100%; height: 100%;" type="application/x-mpegURL">
                            </video>
                        </div>
                        <div class="video_item video_right">
                            <video id="lxs_myvideo3" class="video-js vjs-fluid vjs-big-play-centered" autoplay="false">
                                <source
                                    src='https://cmgw-vpc.lechange.com:8890/LCO/7C0C9C9RAZ53814/0/1/20220330T143455/0d365f3d47ca04c359b83b945d5d8162.m3u8?proto=https'
                                    style="width: 100%; height: 100%;" type="application/x-mpegURL">
                            </video>
                        </div>
                    </div>
                </lxsBox>
            </div>
            <div class="item">
                <lxsBox class="lxsBox" :lxsBoxData="right3Data">
                    <div class="right3_title flex-just-between">
                        <div>报警事件</div>
                        <div>处理时间</div>
                        <div>是否处理</div>
                        <div>处理人员</div>
                    </div>
                    <div class="right3_box">
                        <div class="right3_item flex-just-between">
                            <div class="right3-div">假数据</div>
                            <div class="right3-div">假数据</div>
                            <div class="right3-div">已处理</div>
                            <div class="right3-div">李先森</div>
                        </div>
                        <div style="text-align: center; margin: top: 2rem; color:#ccc;">没有更多了！</div>
                    </div>
                </lxsBox>
            </div>
        </div>
    </div>
</template>
  
<script>
import videojs from 'video.js'
import * as echarts from 'echarts';
export default {
    data() {
        return {
            left1Data: {
                title: '巡检记录',
                isOpenCartoon: true,
                headerFS: '1.8rem',
                isCenter: 'center'
            },
            config: {},
            right1Data: {
                title: '提示告警',
                isOpenCartoon: true,
                headerFS: '1.6rem',
                isCenter: 'center'
            },
            left2Data: {
                title: '重危点分析表',
                isOpenCartoon: true,
                headerFS: '1.6rem',
                isCenter: 'center'
            },
            right1DomData: [
                {
                    id: 1,
                    title: '测试数据',
                },
                {
                    id: 2,
                    title: '测试数据',
                },
                {
                    id: 3,
                    title: '测试数据',
                },
                {
                    id: 4,
                    title: '测试数据',
                },
            ],
            right2Data: {
                title: '报警详细信息',
                isOpenCartoon: true,
                headerFS: '1.6rem',
                isCenter: 'center'
            },
            left3Data: {
                isOpenCartoon: true,
            },
            center2Data: {
                isOpenCartoon: true,
            },
            buttonData: [
                {
                    id: 1,
                    text: '播放'
                },
                {
                    id: 2,
                    text: '快退'
                },
                {
                    id: 3,
                    text: '暂停'
                },
                {
                    id: 4,
                    text: '快进'
                },
                {
                    id: 5,
                    text: '倍速'
                },
                {
                    id: 6,
                    text: '录像'
                },
                {
                    id: 7,
                    text: '切换'
                },
                {
                    id: 8,
                    text: '设置'
                },
                {
                    id: 9,
                    text: '音量'
                },
                {
                    id: 10,
                    text: '清晰度'
                },
            ],
            right3Data: {
                title: '处理记录',
                isOpenCartoon: true,
                headerFS: '1.6rem',
                isCenter: 'center'
            },
            tableData: [
                {
                    date: '2016-05-03',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-02',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-04',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-08',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-06',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-07',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
            ],
            date: '',
            time: '',
            video: {},
        }
    },
    created() {
        this.left1DataFn();// 走left1Data的逻辑
        const giveTacitConsentTodata = [
            {
                id: 1,
                isActive: true,
                idName: 'lxs_myvideo1',
                url: 'https://cmgw-vpc.lechange.com:8890/LCO/7C0C9C9RAZ1C0AF/0/1/20220330T143454/5e7ed935e38989a507d1bfcf0d6016ee.m3u8?proto=https'
            },
            {
                id: 2,
                isActive: false,
                idName: 'lxs_myvideo2',
                url: 'https://cmgw-vpc.lechange.com:8890/LCO/7C0C9D0PAZA5DDA/0/1/20220330T143518/55d0d87f67c0f0225c97aec0b3eb4fa6.m3u8?proto=https'
            },
            {
                id: 3,
                isActive: false,
                idName: 'lxs_myvideo3',
                url: 'https://cmgw-vpc.lechange.com:8890/LCO/7C0C9C9RAZ53814/0/1/20220330T143455/0d365f3d47ca04c359b83b945d5d8162.m3u8?proto=https'
            },
            {
                id: 4,
                isActive: false,
                idName: 'lxs_myvideo4',
                url: 'http://cmgw-vpc.lechange.com:8888/LCO/7C0C9D0PAZCBF04/0/1/20220330T143522/4ca74d947c6632a68d6098cdb81edccc.m3u8'
            },
            {
                id: 5,
                isActive: false,
                idName: 'lxs_myvideo5',
                url: 'http://cmgw-vpc.lechange.com:8888/LCO/7C0C9D0PAZF9E52/0/1/20220330T143525/ffaf69b9650e206129e66a51764bf46e.m3u8'
            },
            {
                id: 6,
                isActive: false,
                idName: 'lxs_myvideo6',
                url: 'http://cmgw-vpc.lechange.com:8888/LCO/7C0C9D0PAZF8534/0/1/20220330T143525/290fab874d979672ebc970f4f9124df6.m3u8'
            },
            {

                id: 7,
                isActive: false,
                idName: 'lxs_myvideo7',
                url: 'http://cmgw-vpc.lechange.com:8888/LCO/7C0C9D0PAZ7BBB3/0/1/20220330T143511/919e3bd8f434af588d83d801c22280d7.m3u8'
            },
            {
                id: 8,
                isActive: false,
                idName: 'lxs_myvideo8',
                url: 'http://cmgw-vpc.lechange.com:8888/LCO/7C0C9D0PAZCBF04/0/1/20220330T143522/4ca74d947c6632a68d6098cdb81edccc.m3u8'
            },
            {
                id: 9,
                isActive: false,
                idName: 'lxs_myvideo9',
                url: 'http://cmgw-vpc.lechange.com:8888/LCO/7C0C9C7RAZF87CB/0/1/20220330T143454/224a3a865ea07949de88c6ebc6ae451b.m3u8'
            },
        ];
        const videoData = JSON.parse(JSON.stringify(giveTacitConsentTodata))
        videoData[0].idName = 'lxs_major';
        this.video = videoData[0];
        this.newDate();
    },
    mounted() {
        this.initVideoDom()
        this.initLiftTop();
        this.initRightTop();
    },
    methods: {
        left1DataFn() {
            // left1Data 的 dataV 的逻辑部分
            this.config = {
                header: ['列1', '列2', '列3'],
                data: [
                    ['行1列1', '行1列2', '行1列3'],
                    ['行2列1', '行2列2', '行2列3'],
                    ['行3列1', '行3列2', '行3列3'],
                    ['行4列1', '行4列2', '行4列3'],
                    ['行5列1', '行5列2', '行5列3'],
                    ['行6列1', '行6列2', '行6列3'],
                    ['行7列1', '行7列2', '行7列3'],
                    ['行8列1', '行8列2', '行8列3'],
                    ['行9列1', '行9列2', '行9列3'],
                    ['行10列1', '行10列2', '行10列3'],
                ],
                index: false,
                align: ['center', 'center', 'center'],
            }
        },
        newDate() {
            const T = new Date();// 创建一个日期对象
            const n = T.getFullYear();// 获取当前年份
            let y = T.getMonth() + 1;// 获取当前月份，月份从0开始计算，0代表1月份；
            let r = T.getDate();// 获取当前是几号
            // let day = T.getDay();//获取当前是星期几，返回的其实是国内第几天0代表周日
            const h = T.getHours();// 获取当前的小时
            let m = T.getMinutes();// 获取当前的分钟
            let s = T.getSeconds();// 获取当前的秒钟
            y = this.checkTime(y);
            r = this.checkTime(r);
            m = this.checkTime(m);
            s = this.checkTime(s)
            const date = n + '年' + y + '月' + r + '日';
            const time = h + ':' + m + ':' + s;
            this.date = date;
            this.time = time;
            setTimeout(() => {
                this.newDate();
            }, 1000)
        },
        initRightTop() {
            const chartDom = document.getElementById('init-right-top');
            const myChart = echarts.init(chartDom, 'dark');
            const data = [];
            for (let i = 0; i < 5; ++i) {
                data.push(Math.round(Math.random() * 200));
            }
            const option = {
                xAxis: {
                    max: 'dataMax'
                },
                yAxis: {
                    type: 'category',
                    data: ['A', 'B', 'C', 'D', 'E'],
                    inverse: true,
                    animationDuration: 300,
                    animationDurationUpdate: 300,
                    max: 2 // only the largest 3 bars will be displayed
                },
                series: [
                    {
                        realtimeSort: true,
                        name: 'X',
                        type: 'bar',
                        data: data,
                        label: {
                            show: true,
                            position: 'right',
                            valueAnimation: true
                        }
                    }
                ],
                legend: {
                    show: true
                },
                animationDuration: 0,
                animationDurationUpdate: 3000,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear'
            };
            function run() {
                for (let i = 0; i < data.length; ++i) {
                    if (Math.random() > 0.9) {
                        data[i] += Math.round(Math.random() * 2000);
                    } else {
                        data[i] += Math.round(Math.random() * 200);
                    }
                }
                myChart.setOption({
                    series: [
                        {
                            type: 'bar',
                            data
                        }
                    ]
                });
            }
            setTimeout(function () {
                run();
            }, 0);
            setInterval(function () {
                run();
            }, 3000);

            option && myChart.setOption(option);
        },
        clickHandler(e) {
            console.log(e)
        },
        initLiftTop() {
            const chartDom = document.getElementById('init-lift-top');
            const myChart = echarts.init(chartDom, 'dark');
            const option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]
                    }
                ]
            };

            option && myChart.setOption(option);
        },
        // 初始化video的配置
        initVideo(id) {
            let init;
            if (id === 'lxs_major') {
                init = {
                    controls: true, // 是否显示控制条
                    preload: 'auto',
                    autoplay: false,
                    fluid: true, // 自适应宽高
                    language: 'zh-CN', // 设置语言
                    muted: true, // 是否静音
                    inactivityTimeout: false,
                    controlBar: { // 设置控制条组件
                        /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
                        children: [
                            { name: 'playToggle' }, // 播放按钮
                            {
                                name: 'volumePanel', // 音量控制
                                inline: false, // 不使用水平方式
                            },
                            { name: 'FullscreenToggle' } // 全屏
                        ]
                    }
                }
            } else {
                init = {
                    controls: false, // 是否显示控制条
                    preload: 'auto',
                    muted: true, // 是否静音
                }
            }
            this.videoInstance = videojs(id, init, () => {
                this.videoInstance.play();
            });
        },
        initVideoDom() {
            this.$nextTick(() => {
                this.initVideo('lxs_major');
                this.initVideo('lxs_myvideo2');
                this.initVideo('lxs_myvideo3');
            })
        },
        checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        },
        nav(name) {
            console.log('跳转到 ' + name + ' 的页面');
        }
    },
}
</script>
  
<style scoped lang="scss">
.flex-just-between {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.lxs_major-dimensions.vjs-fluid:not(.vjs-audio-only-mode) {
    padding-top: 0 !important;
    height: 100% !important;
    box-sizing: border-box;
}

#init-right-top {
    width: 100%;
    height: 100%;
}

#init-lift-top {
    width: 100%;
    height: 100%;
}

.home {
    width: 100vw;
    height: 100vh;
    padding-top: 6rem;
    color: #fff;
    background-image: url('../../assets/images/bg.gif');
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;

    .home_box {
        height: calc(100vh - 6rem);
        /* 网格布局 */
        display: grid;
        grid-template-columns: 25% 25% 25% 25%;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-areas:
            'left1 center  center  right1'
            'left2 center  center  right2'
            'left3 center2 center2 right3'
        ;
    }
}

.text_right {
    text-align: right;
}

.mr-5 {
    margin-right: 5rem;
}

.text_center {
    text-align: center;
}

.ml-5 {
    margin-left: 5rem;
}

.header {
    width: 100%;
    height: 6rem !important;
    box-sizing: border-box;
    padding: 1rem;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    font-size: 1.6rem;
}

.home .item {
    margin: .5rem;
}

.home .item:nth-of-type(1) {
    grid-area: left1;
}

.home .item:nth-of-type(1) .lxsBox .inspection_records {
    width: 100%;
    height: 100%;
}

.home .item:nth-of-type(2) {
    grid-area: center;
    box-sizing: border-box;
    animation: dynamicBorder 5s infinite linear;

    video {
        overflow: hidden;
        width: 100% !important;
        height: 100% !important;
        background-color: #000;
        box-sizing: border-box !important;
    }
}

.home .item:nth-of-type(3) {
    grid-area: right1;

    .reminder-alarm {
        width: 100%;
        height: 100% !important;
        padding: .5rem;
        box-sizing: border-box;

        .empty-state {
            width: 100%;
            height: 10%;
            padding: 2rem 1.5rem;
            box-sizing: border-box;
            color: #fff;
            background-color: rgba(185, 183, 183, 0.231);
            display: flex;
            align-items: center;
            border-radius: 1.5rem;
            justify-content: space-between;
            margin: .8rem 0;

            .title {
                font-size: 1rem;
                font-family: 微软雅黑;
                color: #9fc2f5;
                font-weight: 900;
            }

            .set {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.4rem;

                div {
                    margin: 0 .6rem;
                    color: #b0b7ff;
                    cursor: pointer;
                }

                div:hover {
                    color: #6471fb;
                }
            }
        }
    }
}

.home .item:nth-of-type(4) {
    grid-area: left2;
}

.home .item:nth-of-type(5) {
    grid-area: right2;
    box-sizing: border-box !important;

    .info {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        align-content: center;
        color: #9fc2f5;
        box-sizing: border-box;
        padding: 0 1rem;

        .info_box {
            width: 50%;
            padding: 0 1rem;
            box-sizing: border-box;

            div {
                margin: 2rem 0;
                display: flex;
                align-items: center;
            }

            b {
                font-size: 1.6rem;
            }

            span {
                font-size: 1.2rem;
            }
        }
    }
}

.home .item:nth-of-type(6) {
    grid-area: left3;
    overflow: hidden !important;
}

.home .item:nth-of-type(7) {
    grid-area: center2;
    overflow: hidden;

    .video_list {
        width: 100% !important;
        height: 100% !important;
        overflow: hidden !important;
        display: flex;
        justify-content: space-between;

        .video_item {
            width: 50% !important; 
            height: 100% !important;
        }
    }
}

.home .item:nth-of-type(8) {
    grid-area: right3;

    .right3_box {
        width: 100%;
        height: 100%;
    }

    .right3_title {
        height: 3rem;
        font-size: 1.8rem;
        color: #c0a2da;
        border-bottom: .1rem solid #c0a2da;
        width: 100%;

        div {
            max-width: 25%;
        }
    }

    .right3_item {
        height: 3rem;
        width: 100%;
        margin: .5rem 0;

        .right3-div {
            color: #ffffff;
            max-width: 25%;
            // box-sizing: border-box;
            text-align: center;
        }
    }
}

.border_right {
    border-right: .1rem solid #c0a2da;
}

.p-05 {
    box-sizing: border-box;
    padding: .5rem;
}

.lxsBox {
    width: 100%;
    height: 100%;
}
</style>
