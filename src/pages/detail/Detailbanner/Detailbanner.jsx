import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";
import Playbutton from "../Playbutton";
import ContentWrapper from "../../../../component/contentwrapper/Contentwrapper";
import useFetch from "../../../../hooks/useFetch";
import Genre from "../../../../component/genres/Genre";
import CircleRating from "../../../../component/CircleRating/CircleRating";
import Img from "../../../../component/lazyloadimage/img";
import PosterFallback from '../../../assets/Moviex-images/no-poster.png'
import VideoPopup from "../../../../component/Videopopup/Videopopup";
const Detailbanner=({video,crew})=>{
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const { url } = useSelector((state) => state.homeval);
    const _genres = data?.genres?.map((g) => g.id);
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
    const director= crew?.filter((item)=>{
         return item.job=='Director'
    })
    const writer= crew?.filter((item)=>{
        return item.job=='Screenplay'|| item.job=='Writer'|| item.job=='Story'
   })

    return(
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={url.backdrop + data.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <Img
                                                className="posterImg"
                                                src={
                                                    url.backdrop +
                                                    data.poster_path
                                                }
                                            />
                                        ) : (
                                            <Img
                                                className="posterImg"
                                                src={PosterFallback}
                                            />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${
                                                data.name || data.title
                                            } (${dayjs(
                                                data?.release_date
                                            ).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>

                                        <Genre data={_genres} />

                                        <div className="row">
                                            <CircleRating
                                                rating={data.vote_average.toFixed(
                                                    1
                                                )}
                                            />
                                            <div
                                                className="playbtn"
                                                onClick={()=>{
                                                    setShow(true)
                                                    setVideoId(video.key)
                                                }}
                                            >
                                                <Playbutton/>
                                                <span className="text">
                                                    Watch Trailer
                                                </span>
                                            </div>
                                        </div>

                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                {data.overview}
                                            </div>
                                        </div>
                                        <div className="info">
                                        {data.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Status:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                        {data.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Release Date:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(
                                                            data.release_date
                                                        ).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                             {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Runtime:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {toHoursAndMinutes(
                                                            data.runtime
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                       
                                        
                                        {director?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Director:{" "}
                                                </span>
                                                <span className="text">
                                                    {director?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {director.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Writer:{" "}
                                                </span>
                                                <span className="text">
                                                    {writer?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {writer.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
        </div>
        <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
       
        </div>
        </ContentWrapper>
       </React.Fragment>
        
    )
}
</>
            ):(<div className="detailsBannerSkeleton">
            <ContentWrapper>
                <div className="left skeleton"></div>
                <div className="right">
                    <div className="row skeleton"></div>
                    <div className="row skeleton"></div>
                    <div className="row skeleton"></div>
                    <div className="row skeleton"></div>
                    <div className="row skeleton"></div>
                    <div className="row skeleton"></div>
                    <div className="row skeleton"></div>
                </div>
            </ContentWrapper>
        </div>)
            
            }
            </div>
    )
        }
        export default Detailbanner