<template>
    <div class="main">
        <div class="nav">
            
        </div>
        <div class="duty-personnel">
            <borderBox title="hhh">
                北荣
            </borderBox>
        </div>
        <div class="meet-car_setout">
        </div>
        <div class="police-situation">
        </div>
        <div class="police-situation_num">4</div>
        <div class="safe-state">5</div>
        <div class="duty-police_strength">6</div>
        <div class="map"></div>
        <div class="police-strength_into">
        </div>
        <div class="handle-circumstances">
        </div>
        <div class="carry-out_trend">
        </div>
    </div>
</template>

<script lang="ts" setup>
import borderBox from "../../../../components/EnergyManagementView.vue";
</script>

<style scoped lang="less">
.main {
    height: 100vh;
    background-image: url("../../../../../public/img/parkInfo/bj-4.gif");
    background-size: cover;
    background-repeat: no-repeat;
    display: grid;
    gap: 1rem;
    box-sizing: border-box;
    grid-template-columns: 3fr 2fr 2fr 2fr 3fr;
    grid-template-rows: 1fr 4fr 4fr 4fr;
    grid-template-areas:
        'title title title title title'
        'duty-personnel police-situation_num safe-state duty-police_strength police-strength_into'
        'meet-car_setout map map map handle-circumstances'
        'police-situation map map map carry-out_trend'
    ;
    color: #fff;
}
.main .title {
    grid-area: title;
    margin: 0 auto;
    text-align: center;
    font-size: 2rem;
    /* -webkit-text-stroke: .1rem rgb(94, 94, 218); */
    /* color: transparent; */
    font-weight: 550;
}

.main .duty-personnel {
    background: rgba(18, 33, 64, .5);
    padding: 2rem;
    box-sizing: border-box;
    grid-area: duty-personnel;
}

.main .police-situation_num {
    grid-area: police-situation_num;
}

.main .handle-circumstances {
    padding: 2rem;
    box-sizing: border-box;
    grid-area: handle-circumstances;
    background: rgba(18, 33, 64, .5);
}

.main .safe-state {
    grid-area: safe-state;
}

.main .duty-police_strength {
    grid-area: duty-police_strength;
}

.main .police-strength_into {
    grid-area: police-strength_into;
    background: rgba(18, 33, 64, .5);
    padding: 2rem;
    box-sizing: border-box;
}

.main .meet-car_setout {
    padding: 2rem;
    box-sizing: border-box;
    grid-area: meet-car_setout;
    background: rgba(18, 33, 64, .5);
}

.main .map {
    grid-area: map;
}

.main .carry-out_trend {
    grid-area: carry-out_trend;
    padding: 2rem;
    box-sizing: border-box;
    background: rgba(18, 33, 64, .5);
}

.main .police-situation {
    padding: 2rem;
    box-sizing: border-box;
    grid-area: police-situation;
    background: rgba(18, 33, 64, .5);
}
</style>
