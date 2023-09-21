import React from 'react'
import Carousel from '../../../../component/Carousel/Carousel';
import useFetch from '../../../../hooks/useFetch';
const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/recommendations`);

    const title = mediaType === "tv" ? "Recommended TV Shows" : "Recommended Movies";

    return (
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
}

export default Recommendation
