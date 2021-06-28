import axios from 'axios';
import '@babel/polyfill';

const complainBaseUrl = 'http://roommatepeace.ap-northeast-1.elasticbeanstalk.com/complain';
const service = axios.create({
    baseURL: complainBaseUrl
})


export function createComplain(data){
    let url = `${complainBaseUrl}/create`;
    return axios.post(url,{
        from_user: data.from_user,
        to_user: data.to_user,
        problem: data.problem,
        reason: data.reason,
        expect: data.expect
    });

}

export function getcomplain(user){
    let url = `${complainBaseUrl}/getcomplain?to_user=${user}`
    // return service.get('/getroom', {params:{room_id}})
    return axios.get(url);
}

export function deleteComplain(data){
    let url = `${complainBaseUrl}/delete`;
    return axios.post(url,{
        id:data.id,
        userID: data.userID
    });

}