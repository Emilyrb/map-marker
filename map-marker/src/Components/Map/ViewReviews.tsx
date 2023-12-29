import { useContext, useEffect, useState } from "react";
import { AllReviewsDTO, FetchReviewsDTO, SkateReviewsDTO } from "../../Types";
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

const ReviewHeader = styled(ReviewText)`
  margin: 0;
  padding: 0;
  font-weight: bold;
`;

const ReviewQuote = styled.p`
  margin: 0;
  padding: 0;
  font-style: italic;
`;

export function ViewReviews(props: Props){
  const { data } = props;
  const { setRefetchReviews, selectedMarkerId, mapName } = useContext(MapContext);
  const [ showReviews, setShowReviews ] = useState(false);

  // minimise reviews when swapping markers
  useEffect(() => {
    setShowReviews(false);
  }, [selectedMarkerId]);
  
  console.log('reviews are', data);
  return (
    <>
      <Button onClick={() => {
        setShowReviews(!showReviews);
        setRefetchReviews(true);
      }}>View {data.length} reviews</Button>
      {showReviews ?
        data.map((marker, index) => (
          mapName === 'skate' ? renderSkateReviews(marker.data as SkateReviewsDTO, index) : 
          renderReviews(marker.data, index)
        ))
        : null /* loading screen */
      }
    </>
  );
}

function renderReviews(data: AllReviewsDTO, index: number){
  return (
    <>
      { index === 0 && <hr />}
      <ReviewHeader>{data.username || 'anonymous'} on {data.date || 'N/A'} {data.time || ''} voted {data.overallRating || '?'} ★ </ReviewHeader>
      <ReviewQuote>{data.comment ? `"${data.comment}"` : ''}</ReviewQuote>
      <hr />
    </>
  )
}

function renderSkateReviews(data: SkateReviewsDTO, index: number){
  return (
    <>
      { index === 0 && <hr />}
      <ReviewHeader>{data.username || 'anonymous'} on {data.date || 'N/A'} {data.time || ''} voted {data.overallRating || '?'} ★ </ReviewHeader>
      <ReviewText>{data.safety || '?'} ★ safety | {data.advancedFriendly || '?'} ★ advanced friendly | {data.beginnerFriendly || '?'} ★ beginner friendly | {data.busy || '?'} ★ busy-ness</ReviewText>
      <ReviewQuote>{data.comment ? `"${data.comment}"` : ''}</ReviewQuote>
      <hr />
    </>
  )
}
      <ReviewQuote>{data.comment ? `"${data.comment}"` : ''}</ReviewQuote>
      <hr />
    </>
  )
}