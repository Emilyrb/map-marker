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

const StarRatingBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  width: 80px;
  font-size: 12px;
`;

const StarRatingGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px 0;
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
      }}>{showReviews ? 'Hide' : 'View'} {data.length} reviews</Button>
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
      <StarRatingGroup>
        {renderStarReview(data.safety, 'safety')}
        {renderStarReview(data.advancedFriendly, 'for advanced')}
        {renderStarReview(data.beginnerFriendly, 'for beginners')}
        {renderStarReview(data.busy, 'busy-ness')}
      </StarRatingGroup>
      <ReviewQuote>{data.comment ? `"${data.comment}"` : ''}</ReviewQuote>
      <hr />
    </>
  )
}

function renderStarReview(rating: number, label: string) {
  return (
    <StarRatingBlock>
      <div>{rating || '?'} ★</div>
      <div>{label}</div>
    </StarRatingBlock>
  )
}