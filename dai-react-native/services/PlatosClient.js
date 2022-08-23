import axios from 'axios';
import {BASE_URL} from '../config.js'

const PlatosClient = axios.create({
    baseURL: BASE_URL 
})

export const searchRecipe = async (Plato) => {
    console.log(Plato)
    return PlatosClient
    .get(`recipes/complexSearch?apiKey=9af60a72368a4775961ea73c41f80fbe&query=${Plato}`,{})
    .then(async(res) => {
        const info=res.data.results
        console.log(info)
        return info
    })
    .catch((e) => {
      console.log(`register error`, e.response);
      throw "error" //propagar error
    });
};

export const getRecipeInformation = async (id) => {
    console.log(id);
    return axiosClient.get(`recipes/${id}/information/complexSearch?apiKey=bb614d1a2cfe4751b4f2aea0a3844a1c`,{})
    .then(function(res){
        const info = res.data.results
        console.log(info)
        return info
    })
    .catch((e) => {
        console.log(`register error`, e.response);
        throw "error"
    });
};



