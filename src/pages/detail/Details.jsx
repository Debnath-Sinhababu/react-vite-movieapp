import React from 'react'
import Detailbanner from './Detailbanner/Detailbanner'
import useFetch from '../../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import Cast from './cast/Cast';
import VideosSection from './videosection/Videosection';
import Similar from './Carousel/Similar';
import Recommendation from './Carousel/Recommendation';
const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
      `/${mediaType}/${id}/credits`
  );
  
  return (
    <div>
      <Detailbanner video={data?.results?.[0]}  crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data?.results} loading={loading} />
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details
