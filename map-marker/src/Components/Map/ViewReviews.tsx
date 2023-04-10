import { useContext, useState } from "react";
import { FetchReviewsDTO } from "../../Types";
import { MapContext } from "../../MapContext";

interface Props{
  data: FetchReviewsDTO[];
}

export function ViewReviews(props: Props){
    const { data } = props;
    const { setRefetchReviews } = useContext(MapContext);
    const [ showReviews, setShowReviews ] = useState(false);

    console.log('reviews are', data);
    return (
      <>
        <a href='#' onClick={() => {
          setShowReviews(!showReviews);
          setRefetchReviews(true);
        }}>View {data.length} reviews</a>
        {showReviews ?
          data.map(marker => (
            <p>{marker.data.overallRating} stars by {marker.data.username}</p>
          ))
          : null /* loading screen */
        }
      </>
    );
}
