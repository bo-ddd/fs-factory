<template>
    <div class="vehicle-monitoring">
        <div class="container">
            <div class="title"></div>
            <div class="item">
                <dv-border-box-10>
                    <div class="box-item">
                        <dv-decoration-11 class="title" style="width:200px;height:60px;">位置信息</dv-decoration-11>
                        <dv-scroll-board :config="config" style="width:100%;height:100%" />
                    </div>
                </dv-border-box-10>
            </div>
            <div class="item">
                <dv-border-box-10>
                    <div class="box-item">
                        <dv-decoration-11 class="title" style="width:200px;height:60px;">人员车辆分布</dv-decoration-11>
                    </div>
                </dv-border-box-10>
            </div>
            <div class="item">
                <dv-border-box-10>
                    <div class="box-item">
                        <dv-decoration-11 class="title" style="width:200px;height:60px;">公共区域监控</dv-decoration-11>
                    </div>
                </dv-border-box-10>
            </div>
            <div class="item">
                <dv-border-box-10>
                    <div class="box-item">
                        <dv-decoration-11 class="title" style="width:200px;height:60px;">车辆状态统计</dv-decoration-11>
                    </div>
                </dv-border-box-10>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
const config = reactive({
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
        ['行10列1', '行10列2', '行10列3']
    ],
    headerBGC:'none',
    oddRowBGC:'none',
    evenRowBGC:'none'
})
</script>

<style lang="scss" scoped>
.vehicle-monitoring {
    height: 100vh;
    background-color: black;
    .container {
        height: 100vh;
        display: grid;
        box-sizing: border-box;
        grid-template-rows: 6rem 1fr 1fr 1fr;
        gap: 2rem;
        grid-template-columns: 1fr 3fr;
        grid-template-areas:
            'title title'
            'a b'
            'c b'
            'd b'
        ;

        .box-item {
            height: 100%;
            box-sizing: border-box;
            padding: 3rem;
            display: flex;
            justify-content: center;

            .title {
                font-size: 2rem;
                font-weight: 700;
                color: rgb(2, 175, 215);
                top: -30px;
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
    }
}
</style>
