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
    </v-card>
</template>

<script>
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
            ]
        }),
        computed: {
            activeInstrument() {
                return this.$store.state.activeInstrument
            }
        },
        methods: {
            handleSendOrder(type) {
                if (!this.valid) return

                this.$api.post('/order', {
                    ordType: 'Market',
                    symbol: this.activeInstrument,
                    orderQty: this.volume,
                    side: type
                }).then(() => {
                    this.$vToastify.success('Ордер успешно создан')
                    this.$store.dispatch(types.LOAD_HISTORY_ORDERS)
                }).catch(e => this.$vToastify.error(e.message))
            }
        }
    }
</script>
