import axios from 'axios';
import '@babel/polyfill';

const userBaseUrl = 'http://roommatepeace.ap-northeast-1.elasticbeanstalk.com/user';
// const userBaseUrl = 'http://localhost:3000/user';
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
export function createUser(name,email,password,color,reminder){
    let url = `${userBaseUrl}/create`
    // return service.get('/getroom', {params:{room_id}})
    return axios.post(url,{
        email:email,
        name:name,
        password:password,
        reminder:reminder,
        color:color,
        photo: "images/user.png"
    });
    //return newuser;
}
export function updateUserRoom(user_id,room_id){
    let url = `${userBaseUrl}/updateuserroom`
    // return service.get('/getroom', {params:{room_id}})
    return axios.post(url,{
        id:user_id,
        room_id:room_id
    });
    //return newuser;
}
export function updateUser(user){
    console.log(user.id);
    let url = `${userBaseUrl}/update`
    return axios.post(url,{
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        color: user.color,
        reminder: user.reminder,
        state: user.state,
        expect: user.expect,
        photo: user.photo,
    });
    //return newuser;
}