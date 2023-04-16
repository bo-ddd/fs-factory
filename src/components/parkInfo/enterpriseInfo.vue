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
                let area = '';
                let describe = '';
                info.data.children.forEach(element => {
                    name = element.name;
                    address = element.address;
                    contacts = element.contacts;
                    phone = element.phone;
                    area = element.area;
                    describe = element.describe;
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
                    '名称: ' + echarts.format.addCommas(name) + '</br>',
                    '地址: ' + echarts.format.addCommas(address) + '</br>',
                    '联系人: ' + echarts.format.addCommas(contacts) + '</br>',
                    '联系电话: ' + echarts.format.addCommas(phone) + '</br>',
                    '面积: ' + echarts.format.addCommas(area) + '</br>',
                    '描述: ' + echarts.format.addCommas(describe) + '</br>',
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
                        value: 3,
                        children: [
                            {
                                name: '浮山县华辉捷环保有限公司',
                                address: '临汾市浮山县天坛镇平里村西部',
                                contacts: '杨瑞强',
                                area:'90余亩',
                                describe:'一家以从事石油、煤炭及其他燃料加工业为主的企业',
                                phone: '13888888888'
                            }
                        ]
                    },
                    {
                        name: '园区内企业数',
                        value: 2,
                        children: [
                            {
                                name: '临汾万鑫达焦化有限责任公司',
                                address: '襄汾县河东冶金焦化工业园',
                                contacts: '',
                                area:'1800余亩',
                                describe:'年产210万吨焦炭、8万吨焦油、2.1万吨粗苯、2万吨硫铵，配套年产20万吨甲醇、6万吨合成氨等煤化工产品',
                                phone: ''
                            }
                        ]
                    },
                    {
                        name: '园区外企业数',
                        value: 1,
                        children: [
                            {
                                name: '山西恒锦盛科技有限公司',
                                address: '山西省临汾市浮山县北王乡双新产业园区',
                                contacts: '',
                                area:'506.28亩',
                                describe:'主体已建成：硝化车间（面积2720㎡，生产2.4二硝基氯苯）；废酸浓缩工段（面积2025㎡，浓缩废硫酸）；桃红车间（面积7200㎡，生产桃红染料）；硫化车间（面积3996㎡，生产硫化黑染料）',
                                phone: ''
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
