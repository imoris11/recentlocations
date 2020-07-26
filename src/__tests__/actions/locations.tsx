import * as types from '../../actions/actionTypes';
import {
  fetchLocation,
  fetchLocationFailure,
  fetchLocationSuccess,
} from '../../actions/locationActions';
import {Location} from 'src/types';

test('should fetchLocation', () => {
  const payload = '32.1323,-123.2323';
  expect(fetchLocation(payload)).toMatchObject({
    type: types.LOCATION.FETCH,
    payload,
  });
});

test('should fetchLocationSuccess', () => {
  const payload = {} as Location;
  expect(fetchLocationSuccess(payload)).toMatchObject({
    type: types.LOCATION.FETCH_SUCCESS,
    payload,
  });
});

test('should fetchUserFailure', () => {
  const payload = 'error';
  expect(fetchLocationFailure(payload)).toMatchObject({
    type: types.LOCATION.FETCH_FAILURE,
    payload,
  });
});
