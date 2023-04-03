export interface MarkersDTO {
  data: {
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
  id: string;
};
