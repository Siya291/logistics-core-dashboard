export interface Courier {
  id: number;
  name: string;
  status: string;
  currentLocation: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
}
