import { GET_DATA_BRAND } from "./actions.type";
import { brand } from "@/service/brand";

function initState() {
    return {}
}

const state = initState();

const actions = {
    async [GET_DATA_BRAND](_, lang) {
        const response = await brand.getDataBrand(lang);
        return response;
    }
};

const mutations = {};
const getters = {};

export default {
    namespaced: true, // ✅ เพิ่มตรงนี้
    state,
    actions,
    mutations,
    getters
};
