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
			<tr v-for="item in Object.keys(instruments)"
					:class="{ 'red lighten-3': activeInstrument === item}"
					:key="item"
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
    import {mapMutations, mapState} from 'vuex'
    import * as types from '../store/types'

    export default {
        name: 'Instruments',
        computed: {
            ...mapState({
                instruments: state => state.instruments,
                activeInstrument: state => state.activeInstrument
            })
        },
        mounted() {
            this.sockets.subscribe('instrument', (data) => {
                if (data[0].symbol in this.instruments) {
                    this.updateInstrumentsActive({
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
                    this.setInstrumentsActive(instruments)
                })
        },
        beforeDestroy() {
            this.sockets.unsubscribe('instrument')
        },
        methods: {
            ...mapMutations({
                setActiveInstrument: types.SET_ACTIVE_INSTRUMENT,
                setInstrumentsActive: types.SET_INSTRUMENTS_ACTIVE,
                updateInstrumentsActive: types.UPDATE_INSTRUMENTS_ACTIVE
            }),
            handleRowClick(item) {
                if (this.activeInstrument === item) {
                    this.setActiveInstrument(null)//toggle click
                } else {
                    this.setActiveInstrument(item)
                }
            }
        }
    }
</script>
