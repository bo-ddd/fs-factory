<template>
    <div class="enterprise"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';

onMounted(() => {
    enterprise();
});
const enterprise = function () {
    const myChart2 = echarts.init(document.getElementsByClassName('enterprise')[0] as any);

    const option2 = {
        tooltip: {
            formatter: function (info) {
                const value = info.value;
                let name = '';
                let address = '';
                let contacts = '';
                let phone = '';
                info.data.children.forEach(element => {
                    name = element.name;
                    address = element.address;
                    contacts = element.contacts;
                    phone = element.phone;
                });
                const treePathInfo = info.treePathInfo;
                const treePath = [];
                for (let i = 1; i < treePathInfo.length; i++) {
                    treePath.push(treePathInfo[i].name);
                }
                return [
                    '<div class="tooltip-title">' +
                    echarts.format.encodeHTML(treePath.join('/')) +
                    '</div>',
                    '总数: ' + echarts.format.addCommas(value) + '</br>',
                    '名称: ' + echarts.format.addCommas(name) + '</br>',
                    '地址: ' + echarts.format.addCommas(address) + '</br>',
                    '联系人: ' + echarts.format.addCommas(contacts) + '</br>',
                    '联系电话: ' + echarts.format.addCommas(phone) + '</br>',
                    // 'Disk Usage: ' + echarts.format.addCommas(value) + ' KB'
                ].join('');
            },
            extraCssText: 'display:block;'
        },
        series: [
            {
                name:'园区企业总数',
                type: 'treemap',
                label: {
                    show: true,
                    formatter: '{b}'
                },
                data: [
                    {
                        name: '企业总数',
                        value: 15,
                        children: [
                            {
                                name: '企业1',
                                address: '北京市朝阳区XX路XX号',
                                contacts: '张三',
                                phone: '13888888888'
                            }
                        ]
                    },
                    {
                        name: '园区内企业数',
                        value: 8,
                        children: [
                            {
                                name: '企业2',
                                address: '北京市海淀区XX路XX号',
                                contacts: '李四',
                                phone: '13999999999'
                            }
                        ]
                    },
                    {
                        name: '园区外企业数',
                        value: 4,
                        children: [
                            {
                                name: '企业3',
                                address: '北京市通州区XX路XX号',
                                contacts: '王五',
                                phone: '13000000000'
                            }
                        ]
                    },
                ]

            }
        ]
    };

    option2 && myChart2.setOption(option2);

}
</script>

<style scoped>
.enterprise {
    width: 100%;
    height: 100%;
}
</style>
