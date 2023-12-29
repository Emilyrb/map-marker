import { useContext, useState } from "react";
import { AllReviewsDTO, FetchReviewsDTO } from "../../Types";
import { MapContext } from "../../MapContext";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

interface Props{
  data: FetchReviewsDTO[];
}

const ReviewText = styled.p`
  margin: 0;
  padding: 0;
`;

const ReviewQuote = styled.p`
  margin: 0;
  padding: 0;
  font-style: italic;
`;

export function ViewReviews(props: Props){
  const { data } = props;
  const { setRefetchReviews } = useContext(MapContext);
  const [ showReviews, setShowReviews ] = useState(false);

  console.log('reviews are', data);
  return (
    <>
      <Button onClick={() => {
        setShowReviews(!showReviews);
        setRefetchReviews(true);
      }}>View {data.length} reviews</Button>
      {showReviews ?
        data.map((marker, index) => (renderReviews(marker.data, index)))
        : null /* loading screen */
      }
    </>
  );
}

function renderReviews(data: AllReviewsDTO, index: number){
  return (
    <>
      { index === 0 && <hr />}
      <ReviewText>{data.username || 'anonymous'} on {data.date || 'N/A'} {data.time || ''} voted {data.overallRating || '?'} ★ </ReviewText>
      <ReviewQuote>{data.comment ? `"${data.comment}"` : ''}</ReviewQuote>
      <hr />
    </>
  )
}