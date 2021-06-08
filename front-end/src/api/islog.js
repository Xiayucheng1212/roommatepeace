import axios from 'axios';
import '@babel/polyfill';

const userBaseUrl = 'http://localhost:3000/log';
const service = axios.create({
    baseURL: userBaseUrl
})

export function checkLogin(email,password){
    let url = `${userBaseUrl}/checklogin?email=${email}&password=${password}`
    // return service.get('/getroom', {params:{room_id}})
    return axios.get(url);
}
