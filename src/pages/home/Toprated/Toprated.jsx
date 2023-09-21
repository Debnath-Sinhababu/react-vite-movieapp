import React from 'react'
import ContentWrapper from '../../../../component/contentwrapper/Contentwrapper'
import Switchtab from '../../../../component/Switchtabs/Switchtab'
import useFetch from '../../../../hooks/useFetch'
import { useState } from 'react'
import Carousel from '../../../../component/Carousel/Carousel'
const Toprated = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/top_rated`);
  const onTabChange = (tab) => {
    setEndpoint(tab === "Movie" ? "movie" : "tv");
};
  return (
    <div className="carouselSection">
    <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <Switchtab data={['Movie','TV Shows']} onTabChange={onTabChange}/>
    </ContentWrapper>
    <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
</div>
  )
}

export default Toprated
