import axios from 'axios'; // 引入axios

function $http(url, method, params = {}) {
    // 首先判断是get请求还是post请求
    let data = method.toLocaleLowerCase() === "get" ? 'params' : 'data';

    if (process.env.NODE_ENV == 'development') {
        url = 'http://10.30.49.238:8080/CWGX'+url;
    } else if (process.env.NODE_ENV == 'debug') {
        axios.defaults.baseURL = 'http://10.30.49.238:8080/CWGX'+url;
    } else if (process.env.NODE_ENV == 'production') {
        axios.defaults.baseURL = 'http://10.30.49.238:8080/CWGX'+url;
    }

    return axios({
        method,
        url,
        [data]: params // 差异点在于data的值
    })
        .then(res => {
            return Promise.resolve(res.data);
        })
        .catch(err => {
            console.log("err")
            return Promise.reject(err);
        });
}

export default $http;