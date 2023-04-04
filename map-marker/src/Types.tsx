export interface MarkersDTO {
  lat: number;
  lng: number;
  // 'form.Address': string;
  name: string;
  // 'form.Image': string;
  // reviewIds: {[key: string]: string};
  // mapType: string;
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
  ramps: string,
  dropIns: string,
  pumpTrack: string,
  bowl: string,
  overallRating: number,
};

export interface FetchReviewsDTO{
  id: string;
  data: ReviewsDTO;
}