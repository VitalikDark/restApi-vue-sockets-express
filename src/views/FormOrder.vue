<template>
	<v-card>
		<v-card-text>
			<h3 class="display-1 text--primary">Форма создания ордера</h3>
			<v-form v-model="valid" :disabled="!activeInstrument">
				<v-text-field
								v-model="volume"
								:rules="volumeRules"
								label="Объем"
								required/>
				
				<v-btn color="error"
							 :disabled="!activeInstrument"
							 class="mr-4 mt-4"
							 @click="handleSendOrder('Buy')">
					Купить
				</v-btn>
				<v-btn color="warning"
							 class="mt-4"
							 :disabled="!activeInstrument"
							 @click="handleSendOrder('Sell')">
					Продать
				</v-btn>
			</v-form>
		</v-card-text>
		<v-snackbar v-model="snackbar"
								multi-line>
			{{ text }}
			<template v-slot:action="{ attrs }">
				<v-btn color="red" text v-bind="attrs"
							 @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</v-card>

</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import * as types from '../store/types'

    export default {
        name: 'FormOrder',
        data: () => ({
            valid: false,
            volume: 1,
            volumeRules: [
                v => !!v || 'Заполните поле',
                v => !isNaN(v) || 'Введите число',
                v => Number(v) > 0 || 'Введите число больше 0'
            ],
            //    error message
            snackbar: false,
            text: ''
        }),
        computed: {
            ...mapState({
                activeInstrument: state => state.activeInstrument
            })
        },
        methods: {
            ...mapActions({
                loadHistoryOrders: types.LOAD_HISTORY_ORDERS
            }),
            handleSendOrder(type) {
                if (!this.valid) return

                this.$api.post('/order', {
                    ordType: 'Market',
                    symbol: this.activeInstrument,
                    orderQty: this.volume,
                    side: type
                }).then(() => {
                    // this.$vToastify.success('Ордер успешно создан')
                    this.loadHistoryOrders()
                }).catch(e => {
                    this.snackbar = true
                    this.text = e.message
                })
            }
        }
    }
</script>
