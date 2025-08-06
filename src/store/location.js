import { GET_DATA_LOCATION } from "./actions.type";
import { location } from "@/service/location";

function initState() {
    return {}
}

const state = initState();

const actions = {
    async [GET_DATA_LOCATION](_, lang) {
        const response = await location.getDataLocation(lang);
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
