import axios from 'axios';
import {BASE_URL2} from '../config.js'

const alkemyClient = axios.create({
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

export default alkemyClient;



