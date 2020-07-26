'use strict';
import {LOCATION} from '../actions/actionTypes';
import {Location} from 'src/types';

const initialState = {
  locations: [] as any,
};

export default function locationsReducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case LOCATION.FETCH_SUCCESS:
      return {
        ...state,
        locations: [action.payload, ...state.locations.slice(0, 29)],
      };
    case LOCATION.REMOVE:
      return {
        ...state,
        locations: state.locations.filter(
          (location: Location) => location.timestamp !== action.payload,
        ),
      };
    case LOCATION.CLEAR_ALL:
      return {
        ...state,
        locations: [],
      };
    default:
      return state;
  }
}
