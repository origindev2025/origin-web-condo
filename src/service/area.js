import axios from 'axios';

export const area = {
    getDataArea(lang = 'th') {
        return axios({
            method: 'get',
            url: 'http://localhost:4000/api/project_area/home',
            params: { lang },
            maxBodyLength: Infinity
        })
            .then(response => response.data)
            .catch(() => false);
    }
};