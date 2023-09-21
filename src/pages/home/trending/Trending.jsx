import React from 'react'
import ContentWrapper from '../../../../component/contentwrapper/Contentwrapper'
import Switchtab from '../../../../component/Switchtabs/Switchtab'
import useFetch from '../../../../hooks/useFetch'
import { useState } from 'react'
import Carousel from '../../../../component/Carousel/Carousel'
const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const { data, loading } = useFetch(`/trending/movie/${endpoint}`);
  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
};
  return (
    <div className="carouselSection">
    <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <Switchtab data={['Day','Week']} onTabChange={onTabChange}/>
    </ContentWrapper>
    <Carousel data={data?.results} loading={loading} />
</div>
  )
}

export default Trending
