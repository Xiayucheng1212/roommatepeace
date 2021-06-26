import axios from 'axios';
import '@babel/polyfill';

const userBaseUrl = 'http://localhost:3000/log';
const service = axios.create({
    baseURL: userBaseUrl
})

export function checkLogin(email,password){
    // let url = `${userBaseUrl}/checklogin?email=${email}&password=${password}`
    // return service.get('/getroom', {params:{room_id}})
    let url = `${userBaseUrl}/checklogin`
    return axios.post(url,{
        email: email,
        password: password,
        // islogged: true
    });
}
