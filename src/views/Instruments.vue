<template>
    <v-simple-table class="elevation-4">
        <template v-slot:default>
            <thead>
            <tr>
                <th class="text-left">Symbol</th>
                <th class="text-left">Last price</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in Object.keys(instruments)" :key="instruments[item].symbol"
                @click="handleRowClick(item)">
                <td>{{ item }}</td>
                <td>{{ instruments[item]}}</td>
            </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>
<!--сокет на lastPrice-->
<!--клик по текущему и показать список из 100c-->
<script>
    import * as types from '../store/types'

    export default {
        name: 'Instruments',
        computed: {
            instruments() {
                return this.$store.state.instruments
            }
        },
        mounted() {
            this.sockets.subscribe('instrument', (data) => {
                if (data[0].symbol in this.instruments) {
                    this.$store.commit(types.UPDATE_INSTRUMENTS_ACTIVE, {
                        [data[0].symbol]: data[0].lastPrice
                    })
                }
            })
            this.$api.get('/instrument/active')
                .then(response => {
                    const instruments = response.data.reduce((acc, curr) => {
                        acc[curr.symbol] = curr.lastPrice
                        return acc
                    }, {})
                    this.$store.commit(types.SET_INSTRUMENTS_ACTIVE, instruments)
                })
        },
        beforeDestroy() {
            this.sockets.unsubscribe('instrument')
        },
        methods: {
            handleRowClick(item) {
                this.$store.commit(types.SET_ACTIVE_INSTRUMENT, item)
            }
        }
    }
</script>
