import alkemyClient from './alkemyClient';
import AsyncStorage from '@react-native-async-storage/async-storage';




export const enterlogin = async (userState) => {
  console.log(userState)
  return alkemyClient
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







