import axios from "axios";

const DOMAIN = 'http://localhost:9999';
//쿠키 데이터 받기위해
axios.defaults.withCredentials = true;

const request = (method:string, url:string, data:object) => {
    // axios 형태
    // axios({
    //     method: 'post',
    //     url: '/user/12345',
    //     data: {
    //       firstName: 'Fred',
    //       lastName: 'Flintstone'
    //     }
    // });

    return axios({
        method,
        url : DOMAIN + url,
        data,
    })
    .then(res=> res.data)
    .catch(err => console.log(err))
}

export default request;