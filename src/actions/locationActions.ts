import {Location} from '../types';
import {action} from 'typesafe-actions';
import * as types from './actionTypes';

export const fetchLocationSuccess = (payload: Location) =>
  action(types.LOCATION.FETCH_SUCCESS, payload);

export const fetchLocationFailure = (payload: string) =>
  action(types.LOCATION.FETCH_FAILURE, payload);

export const fetchLocation = (payload: string) => action(types.LOCATION.FETCH, payload);

export const clearAllLocations = () => action(types.LOCATION.CLEAR_ALL);

export const removeLocation = (payload: number) => action(types.LOCATION.REMOVE, payload);
