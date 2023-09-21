import React from 'react'
import { useState } from 'react'
 import './style.scss'
const Switchtab = ({data,onTabChange}) => {
   
    const [left,setleft]=useState(0)
    const [selectedTab,setselectedTab]=useState(0)
    function activeTab(index,tab){
       
      let  updateleft=index*100;
      
      setleft(updateleft)
      setTimeout(() => {
         setselectedTab(index)
       
      },300);
     onTabChange(tab)
    }
   
  return (
    <div className='switchingTabs'>
        <div className="tabItems">
            {
                data.map((tab,index)=>(
                   <span
                     key={index}
                     className={`tabItem ${selectedTab==index?'active':''}`}
                     onClick={()=>{
                        activeTab(index,tab)
                     }}
                   >{tab}</span>
                ))
            }
            <span className='movingBg' style={{left:left}}></span>
            </div> 
    </div>
  )
}

export default Switchtab
