import axios from 'axios';
import '@babel/polyfill';

const userBaseUrl = 'http://localhost:3000/notification';
const service = axios.create({
    baseURL: userBaseUrl
})

export function getroomnotification(room_id){
    let url = `${userBaseUrl}/getroomnotification?room_id=${room_id}`
    // return service.get('/getroom', {params:{room_id}})
    return axios.get(url);
}
