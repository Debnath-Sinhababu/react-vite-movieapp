import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentwrapper/Contentwrapper";
import Img from "../lazyloadimage/img";
import PosterFallback from '../../src/assets/Moviex-images/no-poster.png'
 import CircleRating from "../CircleRating/CircleRating";
import "./style.scss";

 import Genre from "../genres/Genre";
const Carousel = ({data,loading,endpoint,title}) => {
    const navigate=useNavigate()
    const { url } = useSelector((state) => state.homeval);
    const carouselcontainer=useRef()
  
    
    function navigation(dir){
        const container=carouselcontainer.current
       
      const scrollAmount =
            dir === "left"
                ? container?.scrollLeft - (container?.offsetWidth + 20)
                : container?.scrollLeft + (container?.offsetWidth + 20);
             

        container.scrollTo({
            left:scrollAmount,
            behavior:'smooth'
        });
        console.log(scrollAmount)
    }
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };
  return (
    <div className="carousel">
      <ContentWrapper>
        {
          title && <div className="carouselTitle">{title}</div>
        }
      <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                 <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {
                    !loading?(<div className="carouselItems" ref={carouselcontainer}>
                         {
                            data?.map((item)=>{
                                const posterUrl = item.poster_path
                                ? url.poster + item.poster_path
                                : PosterFallback;
                                return (
                                    <div key={item.id} className='carouselItem'
                                      onClick={()=>{
                                        navigate(`/${item?.media_type?item?.media_type:endpoint}/${item?.id}`)
                                      }}
                                    >
                                    
                                      <div className="posterBlock">
                                        <Img src={posterUrl}/>
                                        <CircleRating rating={item?.vote_average.toFixed(1)}/>
                                        <Genre data={item?.genre_ids.slice(0,2)}/>
                                      </div>
                                      <div className="textBlock">
                                        <span className="title">
                                            {item.title}
                                        </span>
                                        <span className="data">
                                            {
                                                dayjs(item.release_date).format('MMM, D YYYY')
                                            }
                                        </span>
                                      </div>
                                    </div>
                                )
                            })
                         }
                    </div>
                        ):(<div className="loadingSkeleton">
                             {skItem()}
                             {skItem()}
                             {skItem()}
                             {skItem()}
                        </div>)
                }
      </ContentWrapper>
    </div>
  )
}

export default Carousel
