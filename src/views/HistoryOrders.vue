<template>
    <v-container>
        <v-simple-table class="elevation-4" fixed-header :height="500">
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">id</th>
                    <th class="text-left">валютная пара</th>
                    <th class="text-left">объем</th>
                    <th class="text-left">тип</th>
                    <th class="text-left">Цена</th>
                    <th class="text-left">Состояние</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in orders">
                    <td>{{item.orderId}}</td>
                    <td>{{item.symbol}}</td>
                    <td>{{item.orderQty}}</td>
                    <td>{{item.timestamp}}</td>
                    <td>{{item.side}}</td>
                    <td>{{item.ordStatus}}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>

</template>

<script>
    import * as types from '../store/types'

    export default {
        name: 'HistoryOrders',
        computed: {
            orders() {
                return this.$store.state.ordersHistory
            }
        },
        mounted() {
            this.$store.dispatch(types.LOAD_HISTORY_ORDERS)
        }
    }
</script>
