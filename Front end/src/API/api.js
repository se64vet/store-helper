import axios from "axios";
import { cookie2Json } from "./cookie";
export const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const authBearer = (token)=> {
    return {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }
}

export const getProducts = async(query="") => {
    try {
      const cookie = cookie2Json();
      const authConfig = authBearer(cookie.SMS_token);
      const response = await client.get(`/shop?${query}`, authConfig);
      const {result} = response.data;
      return result;
    } catch (error) {
      console.log(error);
    }
}

export const createProduct = async(body) => {
  if(!body || body.name.trim() === "" || !body.price){
    return "Please fill all the field before submiting!"
  }
  try {
    const cookie = cookie2Json();
    const authConfig = authBearer(cookie.SMS_token);
    const response = await client.post('/shop', body, authConfig)
    return response
  } catch (error) {
    console.log(error);
  }
}

export const updateProduct = async(id, body) => {
  if(!body || !id){
    return "Please fill all the field before submiting!"
  }
  if(body.name.trim() === ""){
    delete body.name;
  }
  try {
    const cookie = cookie2Json();
    const authConfig = authBearer(cookie.SMS_token);
    const response = await client.patch(`/shop/${id}`, body, authConfig)
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const deleteProduct = async(id) => {
  try {
    const cookie = cookie2Json();
    const authConfig = authBearer(cookie.SMS_token);
    const response = await client.delete(`/shop/${id}`, authConfig)
    return response
  } catch (error) {
    console.log(error);
  }
}