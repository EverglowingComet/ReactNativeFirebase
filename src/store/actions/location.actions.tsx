import {Dispatch} from 'redux';
import {locationServices} from '../services';

import {
  setCurrentLocation,
  setReference,
  initLocationArray,
  appendLocation,
  setAuthorized,
} from '../reducers/location';

export const locationActions = {
  configureFineTracking,
  requestAuthentication,
  startTracking,
  stopTracking,
};

function configureFineTracking() {
  return () => {
    locationServices.configureFineTracking();
  };
}

function requestAuthentication() {
  return (dispatch: Dispatch) => {
    locationServices
      .requestAuthentication()
      .then(() => {
        dispatch(setAuthorized(true));
      })
      .catch(() => {
        dispatch(setAuthorized(false));
      });
  };
}

function startTracking(distanceFilter: number = 10, interval: number = 5000) {
  return (dispatch: Dispatch) => {
    dispatch(initLocationArray());
    locationServices
      .startTracking(distanceFilter, interval, position => {
        dispatch(setCurrentLocation(position));
        dispatch(appendLocation(position));
      })
      .then((watchId: number) => {
        dispatch(setReference(watchId));
      })
      .catch(() => {
        dispatch(setReference(undefined));
      });
  };
}

function stopTracking(watchId: number) {
  return (dispatch: Dispatch) => {
    locationServices.stopTracking(watchId).then(() => {
      dispatch(setReference(undefined));
    });
  };
}
