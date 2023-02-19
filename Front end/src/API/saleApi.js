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

export const getInvoices = async(query="") => {
    try {
      const cookie = cookie2Json();
      const authConfig = authBearer(cookie.SMS_token);
      const response = await client.get(`/sale${query}`, authConfig);
      const {invoices} = response.data;
      return invoices;
    } catch (error) {
      console.log(error);
    }
}

export const createNewInvoice = async(body)=>{
    try {
        const cookie = cookie2Json();
        const authConfig = authBearer(cookie.SMS_token);
        const response = await client.post('/sale', body, authConfig)
        return response
      } catch (error) {
        console.log(error);
      }
}

export const updateInvoice = async(body, id)=>{
    try {
        const cookie = cookie2Json();
        const authConfig = authBearer(cookie.SMS_token);
        const response = await client.patch(`/sale/${id}`, body, authConfig)
        return response
      } catch (error) {
        console.log(error);
      }
}

export const removeInvoice = async(id)=>{
    try {
      const cookie = cookie2Json();
      const authConfig = authBearer(cookie.SMS_token);
      const response = await client.delete(`/sale/${id}`, authConfig)
      return response
    } catch (error) {
      console.log(error);
    }
}