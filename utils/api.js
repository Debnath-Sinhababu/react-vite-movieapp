import axios from "axios";
import { Await } from "react-router-dom";
const baseurl= 'https://api.themoviedb.org/3'
const accesstoken= import.meta.env.VITE_ACCESS_TOKEN
export const   Fetch_datafrom_api=async(url,params)=>{
   
   
      try{
        const headers = { Authorization: `Bearer ${accesstoken}` };
      let {data}= await axios.get(`${baseurl}${url}`, { headers,params })
           
            return data
      } 
      catch(error){
           
             return error
      }
}