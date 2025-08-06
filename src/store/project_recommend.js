import { GET_DATA_RECOMMEND } from "./actions.type";
import { project_recommend } from "@/service/project_recommend";

function initState() {
    return {}
}

const state = initState();

const actions = {
    async [GET_DATA_RECOMMEND](_, lang) {
        const response = await project_recommend.getDataRecommend(lang);
        return response;
    }
};

const mutations = {};
const getters = {};

export default {
    namespaced: true, 
    state,
    actions,
    mutations,
    getters
};
