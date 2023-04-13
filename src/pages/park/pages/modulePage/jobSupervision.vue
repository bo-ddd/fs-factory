<template>
        <div class="job-supervision">
                <div class="item">
                        <dv-border-box-12 class="datav">
                             
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
                <div class="item">
                        <dv-border-box-12 class="datav">

                        </dv-border-box-12>
                </div>
        </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
.job-supervision {
        height: 100%;
        display: grid;
        background-color: black;
        grid-template-columns: 1fr 3fr;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-areas:
                'a d'
                'b d'
                'c d'
        ;

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
