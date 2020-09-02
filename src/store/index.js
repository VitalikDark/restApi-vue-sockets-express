import Vue from 'vue'
import Vuex from 'vuex'

import api from '../plugins/axios'

import * as types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        instruments: {},
        activeInstrument: null,
        ordersHistory: []
    },
    mutations: {
        // сохраняем весь список
        [types.SET_INSTRUMENTS_ACTIVE](state, payload) {
            state.instruments = payload
        },
        // обновляем спискок
        [types.UPDATE_INSTRUMENTS_ACTIVE](state, payload) {
            state.instruments = {
                ...state.instruments,
                ...payload
            }
        },
        // сохраняем выбраный элемент со списка
        [types.SET_ACTIVE_INSTRUMENT](state, payload) {
            state.activeInstrument = payload
        },
        //save order
        [types.SET_HISTORY_ORDERS](state, payload) {
            state.ordersHistory = payload
        }
    },
    actions: {
        [types.LOAD_HISTORY_ORDERS]({commit}) {
            api.get('/order').then(({data}) => {
                commit(types.SET_HISTORY_ORDERS, data)
            })
        }
    }
})
