import axios from 'axios';
import '@babel/polyfill';

const uploadBaseUrl = 'http://roommatepeace.ap-northeast-1.elasticbeanstalk.com/uploadimage';
// const uploadBaseUrl = 'http://localhost:3000/uploadimage';

export function uploadImage(user, file){
    let url = `${uploadBaseUrl}`;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = function () {
        axios.post(url, {
            user: user,
            file: reader.result.replace(/.*base64,/, "")
        })
    }
}
