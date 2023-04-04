import { useState } from "react";
import { FetchReviewsDTO } from "../../Types";

interface Props{
  data: FetchReviewsDTO[];
}

export function ViewReviews(props: Props){
    const { data } = props;
    const [ showReviews, setShowReviews ] = useState(false);

    console.log('reviews are', data);
    return (
      <>
        <a href='#' onClick={() => {setShowReviews(!showReviews)}}>View {data.length} reviews</a>
        {showReviews && 
          data.length > 0 ? 
          data.map(marker => (
            <p>{marker.data.overallRating} stars by {marker.data.username}</p>
          ))
          : null /* loading screen */
        }
      </>
    );
}
