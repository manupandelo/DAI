import axios from 'axios';
import {BASE_URL} from '../config.js'

const PlatosClient = axios.create({
    baseURL: BASE_URL 
})

export const searchRecipe = async (Plato) => {
    console.log(Plato)
    return PlatosClient
    .get(`recipes/complexSearch?apiKey=4412dd03082e4e76929bf09da5187843&query=${Plato}`,{})
    .then(async(res) => {
        const info=res.data.results
        console.log(info)
        return info
    })
    .catch(() => {
      throw "error" //propagar error
    });
};

export const getRecipeInformation = async (id) => {
    console.log(id);
    return PlatosClient.get(`recipes/${id}/information`,{params:{apiKey:'4412dd03082e4e76929bf09da5187843'}})
    .then(function(res){
        return res.data
    })
    .catch(() => {
        throw "Error"
    });
};



