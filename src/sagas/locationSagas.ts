import * as types from '../actions/actionTypes';
import {fetchLocationFailure, fetchLocationSuccess} from '../actions/locationActions';
import OpenDataApi from '../lib/openDataApi';
import {call, put, takeEvery} from 'redux-saga/effects';
import {BaseAction} from '../types';

function* fetchLocation(action: BaseAction) {
  try {
    const response = yield call(OpenDataApi.fetchLocation, action.payload);
    const location = {
      formattedAddress: response.results[0].formatted,
      timestamp: response.timestamp.created_unix,
      lat: response.results[0].geometry.lat,
      lng: response.results[0].geometry.lng,
    };
    yield put(fetchLocationSuccess(location));
  } catch (e) {
    yield put(fetchLocationFailure(e.message));
  }
}

export default function* root() {
  yield takeEvery(types.LOCATION.FETCH, fetchLocation);
}
