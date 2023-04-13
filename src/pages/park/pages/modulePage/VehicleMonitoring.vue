<template>
    <div class="vehicle-monitoring">
        <div class="container">
            <div class="item">
                <dv-border-box-10>
                    <div class="box-item">
                        <dv-decoration-11 class="title" style="width:200px;height:60px;">dv-decoration-11</dv-decoration-11>
                    </div>
                </dv-border-box-10>
            </div>
            <div class="item">
                <dv-border-box-10>
                    <div class="box-item">dv-border-box-10</div>
                </dv-border-box-10>
            </div>
            <div class="item">
                <dv-border-box-10>
                    <div class="box-item">dv-border-box-10</div>
                </dv-border-box-10>
            </div>
            <div class="item">
                <dv-border-box-10>
                    <div class="box-item">dv-border-box-10</div>
                </dv-border-box-10>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.vehicle-monitoring {
    height: calc(100vh - 9rem);
    background-color: black;

    .container {
        height: calc(100vh - 9rem);
        display: grid;
        padding-top: 3rem;
        box-sizing: border-box;
        grid-template-rows: 1fr 1fr 1fr;
        gap: 3rem;
        grid-template-columns: 1fr 3fr;
        grid-template-areas:
            'a b'
            'c b'
            'd b'
        ;

        .box-item{
            height: 100%;
            box-sizing: border-box;
            padding: 2rem;
            display: flex;
            justify-content: center;
            .title{
                top: -29px;
                position: absolute;
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
}
</style>
