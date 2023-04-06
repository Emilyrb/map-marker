export interface GenericMarkersDTO {
  lat: number;
  lng: number;
  name: string;
  // image: string;
};

export interface SkateMarkersDTO extends GenericMarkersDTO {
  ramps: number;
  dropIns: number;
  pumpTrack: string,
  bowl: string,
};

export type AllMarkersDTO = GenericMarkersDTO | SkateMarkersDTO;

export interface FetchMarkersDTO{
  id: string;
  data: AllMarkersDTO;
}
export interface GenericReviewsDTO {
  username: string,
  date: string,
  time: string,
  comment: string,
  overallRating: number,
};

export interface SkateReviewsDTO extends GenericReviewsDTO {
  beginnerFriendly: number,
  advancedFriendly: number,
  safety: number,
  busy: number,
};

export type AllReviewsDTO = GenericReviewsDTO | SkateReviewsDTO;

export interface FetchReviewsDTO{
  id: string;
  data: AllReviewsDTO;
}