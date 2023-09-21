import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import ContentWrapper from '../../../../component/contentwrapper/Contentwrapper'
import Img from '../../../../component/lazyloadimage/img'
import './style.scss'
const Herobanner = () => {
  let [query,setquery]=useState('')
  let [background,setbackground]=useState("")
  const navigate=useNavigate()
      const {url}=useSelector((state)=>state.homeval)
      console.log(url)
      let {data,loading}=useFetch('/movie/upcoming')

     function searchqueryhandler(e){
      console.log(e.key)
          if(e.key=='Enter'&& query.length!=null){
              navigate(`/search/${query}`)
              
          }
     }
     useEffect(()=>{
       const bg= url?.backdrop+data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path
      
        setbackground(bg)
        
     },[data])
     
     console.log(background)
  return (
    <div className='herobanner'>
      {
        !loading && (
           <div className='backdrop-img'>
        <Img src={background}/>
          </div>
        )
      }
      <div className='opacity-layer'></div>
      <ContentWrapper>
     
        <div className='herobannercontent'>
            <span className='title'>Welcome</span>
            <span className='subtitle'> Millions of movies, TV shows and people to discover.
                        Explore now.</span>
                        <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e)=>{
                              setquery(e.target.value)
                            }}
                            onKeyPress={(e)=>{
                                searchqueryhandler(e)
                            }}
                        />
                        <button 
                         
                        >Search</button>
                    </div>
        </div>
    
      </ContentWrapper>
    </div>
  )
}

export default Herobanner
