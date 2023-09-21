

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Fetch_datafrom_api } from '../utils/api'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../component/Header/Header'
import Footer from '../component/Footer/Footer'
import Home from './pages/home/Home'
import Details from './pages/detail/Details'
import Searchresult from './pages/searchresult/Searchresult'
import Explore from "./pages/explore/Explore";
import Pagenotfound from './pages/404/Pagenotfound'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getApiConfiguration } from '../store/homeslice'
import { getGenres } from '../store/homeslice'
import { ToastContainer, toast } from 'react-toastify';
function App() {
    const dispatch=useDispatch()
     useEffect(()=>{
       
     Fetch_datafrom_api('/configuration').then((res)=>{
     
     
        const url = {
          backdrop: res?.images?.secure_base_url + "original",
          poster: res?.images?.secure_base_url + "original",
          profile: res?.images?.secure_base_url + "original",
      };
         dispatch(getApiConfiguration(url))
     })
       genresCall()
     },[])
     
     const genresCall= async()=>{
        let promises=[];
        let endpoints=['tv','movie'];
        let allgenres={}
         endpoints.forEach((url)=>{
            promises.push(Fetch_datafrom_api(`/genre/${url}/list`))
            
         })
         let data= await Promise.all(promises)
         data.map(({genres})=>{
            genres.map((item)=>{
                  allgenres[item.id]=item
            })
         })
         dispatch(getGenres(allgenres))
     }
   
     const stateval = useSelector((state) =>{
        return state.homeval.url
     })
    
  return (
   
      <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<Searchresult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<Pagenotfound />} />
            </Routes>
            <Footer />
           
        </BrowserRouter> 
  
  )
}

export default App
