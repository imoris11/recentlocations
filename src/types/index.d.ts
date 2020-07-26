declare module 'redux-persist/lib/*';

export interface BaseAction {
  type: string;
  payload: any;
}

export interface User {
  id?: string;
  name: string;
  username: string;
  company: string;
}

export interface SingleItem {
  item: Location;
}

export interface ListItem {
  item: Location;
  removeListItem: Function;
}

export interface Location {
  formattedAddress?: string;
  timestamp: number;
  lat: number;
  lng: number;
}

export interface CurrentLocationType {
  formattedAddress?: string;
  timestamp?: string;
  username: string;
}
