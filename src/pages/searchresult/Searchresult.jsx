import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { Fetch_datafrom_api } from "../../../utils/api";
import ContentWrapper from "../../../component/contentwrapper/Contentwrapper";
import MovieCard from "../../../component/moviecard/Moviecard";
import Spinner from "../../../component/spinner/Spinner";
import noResults from "../../assets/Moviex-images/no-results.png";

const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total_page,total_page_number]=useState(0)
    const { query } = useParams();
      
    const fetchInitialData = () => {
        setLoading(true);
        Fetch_datafrom_api(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                setData(res?.results);
                setPageNum((prev) => prev + 1);
                 total_page_number(res?.total_pages)
                setLoading(false);
            }
        );
    };
     
    const fetchNextPageData = () => {
      console.log(data)
       Fetch_datafrom_api(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                if (data) {
                 
                    setData([
                        ...data,
                        ...res?.results,
                    ]);
                } else {
                    setData(res?.results);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    return (
        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {data?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${
                                    data?.total_results > 1
                                        ? "results"
                                        : "result"
                                } of '${query}'`}
                            </div>
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= total_page}
                                loader={<Spinner />}
                            >
                                {data?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            Sorry, Results not found!
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

export default SearchResult;
