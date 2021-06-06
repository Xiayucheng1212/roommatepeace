import axios from 'axios';
import '@babel/polyfill';

const userBaseUrl = 'http://localhost:3000/user';
const service = axios.create({
    baseURL: userBaseUrl
})

export function getUsers(room_id){
    return service.get('/getroom', {params:{room_id}})

}