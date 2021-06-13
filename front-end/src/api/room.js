import axios from 'axios';
import '@babel/polyfill';

const userBaseUrl = 'http://localhost:3000/room';
const service = axios.create({
    baseURL: userBaseUrl
})
export function createRoom(name){
    let url = `${userBaseUrl}/create`
    return axios.post(url,{
        name:name,
    });
}