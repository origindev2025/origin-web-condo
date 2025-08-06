import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import brand from './brand.js'
import location from './location';
import project_recommend from './project_recommend';



export default new Vuex.Store({
    modules: {
        brand,
        location,
        project_recommend
    }
})
