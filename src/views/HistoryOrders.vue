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
					<td>{{formatDate(item.timestamp)}}</td>
					<td>{{item.side}}</td>
					<td>{{item.ordStatus}}</td>
				</tr>
				</tbody>
			</template>
		</v-simple-table>
	</v-container>

</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import * as types from '../store/types'
    import {formatDate} from '../helpers'

    export default {
        name: 'HistoryOrders',
        computed: {
            ...mapState({
                orders: state => state.ordersHistory
            })
        },
        mounted() {
            this.loadHistoryOrders()
        },
        methods: {
            formatDate: formatDate,
            ...mapActions({
                loadHistoryOrders: types.LOAD_HISTORY_ORDERS
            })
        }
    }
</script>
