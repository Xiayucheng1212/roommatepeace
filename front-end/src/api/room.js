import axios from 'axios';
import '@babel/polyfill';

const userBaseUrl = 'http://roommatepeace.ap-northeast-1.elasticbeanstalk.com/room';
// const userBaseUrl = 'http://localhost:3000/room';
const service = axios.create({
    baseURL: userBaseUrl
})
export function createRoom(name){
    let url = `${userBaseUrl}/create`
    return axios.post(url,{
        name:name,
    });
}

export function getRoomname(room_id){
    console.log("lololol");
    let url = `${userBaseUrl}/getroomname?room_id=${room_id}`
    return axios.get(url);
}