import React from 'react'
import Herobanner from './Herobanner/Herobanner'
import Trending from './trending/Trending'
import './Home.scss'
import Popular from './popular/Popular'
import Toprated from './Toprated/Toprated'
Toprated
const Home = () => {
  return (
    <div className="homePage">
    <Herobanner />
    <Trending/>
    <Popular/>
    <Toprated/>
</div>
  )
}

export default Home
