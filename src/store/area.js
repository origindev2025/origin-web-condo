import { GET_DATA_AREA } from "./actions.type";
import { area } from "@/service/area";

function initState() {
    return {}
}

const state = initState();

const actions = {
    async [GET_DATA_AREA](_, lang) {
        const response = await area.getDataArea(lang);
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