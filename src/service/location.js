import axios from 'axios';

export const location = {
    getDataLocation(lang = 'th') {
        return axios({
            method: 'get',
            url: 'http://localhost:4000/api/location',
            params: { lang },
            maxBodyLength: Infinity
        })
            .then(response => response.data)
            .catch(() => false);
    }
};