<template>
    <v-app>
       <v-container>
           <v-row>
               <v-col>
                   <v-card><h3>Список торговых пар (обновляется онлайн)</h3></v-card>
                   <Instruments/>
               </v-col>
               <v-col>
                   <h3>Список котировок (обновляется онлайн)</h3>
                   <Rates/>
               </v-col>
               <v-col>
                   <FormOrder/>
               </v-col>
           </v-row>
           <v-row>
               <HistoryOrders/>
           </v-row>
       </v-container>
    </v-app>
</template>

<script>
    import Instruments from './views/Instruments'
    import Rates from './views/Rates'
    import FormOrder from './views/FormOrder'
    import HistoryOrders from './views/HistoryOrders'

    export default {
        name: 'App',

        components: {
            Instruments,
            Rates,
            FormOrder,
            HistoryOrders
        },

        data: () => ({
            //
        })
    }
</script>
