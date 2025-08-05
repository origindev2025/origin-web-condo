import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import brand from './brand.js'




export default new Vuex.Store({
    modules: {
        brand
    }
})
