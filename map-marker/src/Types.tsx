export interface MarkersDTO {
  lat: number;
  lng: number;
  name: string;
  address: string;
  ramps: number;
  dropIns: number;
  pumpTrack: string,
  bowl: string,
  // image: string;
};

export interface FetchMarkersDTO{
  id: string;
  data: MarkersDTO;
}

export interface ReviewsDTO {
  username: string,
  date: string,
  time: string,
  beginnerFriendly: number,
  advancedFriendly: number,
  safety: number,
  busy: number,
  comment: string,
  overallRating: number,
};

export interface FetchReviewsDTO{
  id: string;
  data: ReviewsDTO;
}