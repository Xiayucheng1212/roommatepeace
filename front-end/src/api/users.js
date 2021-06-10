import axios from 'axios';
import '@babel/polyfill';

const userBaseUrl = 'http://localhost:3000/user';
const service = axios.create({
    baseURL: userBaseUrl
})

export function getUsers(room_id){
    let url = `${userBaseUrl}/getroom?room_id=${room_id}`
    // return service.get('/getroom', {params:{room_id}})
    return axios.get(url);
}

export function getSingleUser(id){
    let url = `${userBaseUrl}/getsingle?id=${id}`
    // return service.get('/getroom', {params:{room_id}})
    return axios.get(url);
}
export function creatUser(name,email,password,color,reminder){
    let url = `${userBaseUrl}/create`
    // return service.get('/getroom', {params:{room_id}})
    const newuser = {
        email:email,
        name:name,
        password:password,
        reminder:reminder,
        color:color,
        photo:"uuu"
    };
    return axios.post(url,{
        email:email,
        name:name,
        password:password,
        reminder:reminder,
        color:color,
        photo:"uuu"
    });
    //return newuser;
}