export interface MarkersDTO {
  'form.Latlng': {
    lat: number;
    lng: number;
  };
  'form.Address': string;
  'form.Name': string;
  'form.Image': string;
  reviewIds: {[key: string]: string};
  mapType: string;
};

export interface ReviewsDTO {
  'location': {lat: number, lng: number},
  'form.Name': string,
  'form.Date': string,
  'form.Time': string,
  'form.BeginnerFriendly': number,
  'form.AdvancedFriendly': number,
  'form.Safety': number,
  'form.Busy': number,
  'form.Ramps': string,
  'form.DropIns': string,
  'form.PumpTrack': string,
  'form.Bowl': string,
  'form.OverallRating': number,
};
