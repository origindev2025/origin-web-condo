import axios from 'axios';

export const brand = {
    getDataBrand(lang = 'th') {
        return axios({
            method: 'get',
            url: 'http://localhost:4000/api/brands',
            params: { lang },
            maxBodyLength: Infinity
        })
            .then(response => response.data)
            .catch(() => false);
    }
};