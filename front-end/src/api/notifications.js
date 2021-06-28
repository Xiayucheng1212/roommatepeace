import axios from 'axios';
import '@babel/polyfill';

const userBaseUrl = 'http://roommatepeace.ap-northeast-1.elasticbeanstalk.com/notification';
const service = axios.create({
    baseURL: userBaseUrl
})

export function getroomnotification(room_id){
    let url = `${userBaseUrl}/getroomnotification?room_id=${room_id}`
    // return service.get('/getroom', {params:{room_id}})
    return axios.get(url);
}
export function createNotification(data){
    let url = `${userBaseUrl}/create`;

    // return service.get('/getroom', {params:{room_id}})
    return axios.post(url,{
        room_id:data.room_id,
        text:data.text
    });
}
