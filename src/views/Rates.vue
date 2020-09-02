<template>
    <v-container>
        <v-simple-table class="elevation-4" fixed-header :height="500">
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">Время свечи</th>
                    <th class="text-left">Цена открытия</th>
                    <th class="text-left">Максимальная цена свечи</th>
                    <th class="text-left">Минимальная цена свечи</th>
                    <th class="text-left">Цена закрытия свечи</th>
                    <th class="text-left">Объем сделок</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in historyList" :key="item.timestamp">
                    <td>{{item.timestamp}}</td>
                    <td>{{item.open}}</td>
                    <td>{{item.high}}</td>
                    <td>{{item.low}}</td>
                    <td>{{item.close}}</td>
                    <td>{{item.volume}}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>

<script>
    // котировки
    export default {
        name: 'Rates',
        data: () => ({
            historyList: []
        }),
        computed: {
            activeInstrument() {
                return this.$store.state.activeInstrument
            }
        },
        watch: {
            activeInstrument(newValue) {
                this.handleNewItemInstrument(newValue)
            }
        },
        methods: {
            handleNewItemInstrument(item) {
                this.$api.get('trade/bucketed', {
                    params: {
                        binSize: '1m',
                        partial: false,
                        count: 100,
                        reverse: true,
                        symbol: item
                    }
                }).then(({data}) => {
                    this.historyList = data
                })
            }
        }
    }
</script>
