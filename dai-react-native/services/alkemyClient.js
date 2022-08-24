import axios from 'axios';
import {BASE_URL2} from '../config.js'

const Client = axios.create({
    baseURL: BASE_URL2,
    
})

//instance.interceptors.request.use(function (config) {

   /* AsyncStorage.gettItem
    return{
        ...config, headers:{
            authorization: "Bearer "+ token
        }
    }
});/*/

export const enterlogin = async (userState) => {
    console.log(userState)
    return Client
      .post(``, {
        ...userState
      })
      .then(async(res) => {
        
      })
      .catch((e) => {
        console.log(`register error`, e.response);
        throw "error" //propagar error
      });
  };



