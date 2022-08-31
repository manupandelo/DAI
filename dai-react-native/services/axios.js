import axios from 'axios';

export const searchRecipe = async (Plato) => {
    console.log(Plato)
    return axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4412dd03082e4e76929bf09da5187843&query=${Plato}`,{})
    .then(async(res) => {
        console.log(res.data.results)
        return res.data.results
    })
    .catch(() => {
      throw "error" //propagar error
    });
};

export const getRecipeInformation = async (id) => {
    console.log(id);
    return axios.get(`https://api.spoonacular.com/recipes/${id}/information`,{params:{apiKey:'4412dd03082e4e76929bf09da5187843'}})
    .then(function(res){
        return res.data
    })
    .catch(() => {
        throw "Error"
    });
};

export const enterlogin = async (user) => {
    console.log(user)
    return axios.post(`http://challenge-react.alkemy.org`, {
        ...user
      })
      .then(() => {
        return true
      })
      .catch(() => {
        throw "error" //propagar error
      });
  };


