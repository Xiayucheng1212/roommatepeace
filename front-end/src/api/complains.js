import axios from 'axios';
import '@babel/polyfill';

const complainBaseUrl = 'http://localhost:3000/complain';
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