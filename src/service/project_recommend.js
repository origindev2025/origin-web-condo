import axios from 'axios';

export const project_recommend = {
    getDataRecommend(lang = 'th') {
        return axios({
            method: 'get',
            url: 'http://localhost:4000/api/project_recommend',
            params: { lang },
            maxBodyLength: Infinity
        })
            .then(response => response.data)
            .catch(() => false);
    }
};