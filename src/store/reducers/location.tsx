import {createSlice} from '@reduxjs/toolkit';

type LocationState = {
  currentLocation?: any;
  ref?: number;
  locationArray: any[];
  tracking: boolean;
  authorized: boolean;
};

const initialState: LocationState = {
  currentLocation: undefined,
  ref: undefined,
  locationArray: [],
  tracking: false,
  authorized: false,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setReference: (state, action) => {
      state.ref = action.payload;
    },
    setAuthorized: (state, action) => {
      state.authorized = action.payload;
    },
    setTracking: (state, action) => {
      state.tracking = action.payload;
    },
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    initLocationArray: state => {
      state.locationArray = [];
    },
    appendLocation: (state, action) => {
      state.locationArray.push(action.payload);
    },
  },
});

export const {
  setReference,
  setAuthorized,
  setTracking,
  setCurrentLocation,
  initLocationArray,
  appendLocation,
} = locationSlice.actions;
export default locationSlice.reducer;
