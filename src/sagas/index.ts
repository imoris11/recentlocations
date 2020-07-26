import {all} from 'redux-saga/effects';
import users from './usersSagas';
import location from './locationSagas';

export default function* root() {
  yield all([users(), location()]);
}
