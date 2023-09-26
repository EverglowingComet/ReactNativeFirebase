import {createSlice} from '@reduxjs/toolkit';

type LocationState = {
  currentLocation?: any;
  ref?: number;
  locationArray: any[];
  tracking: boolean;
};

const initialState: LocationState = {
  currentLocation: undefined,
  ref: undefined,
  locationArray: [],
  tracking: false,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setReference: (state, action) => {
      state.ref = action.payload;
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
  setTracking,
  setCurrentLocation,
  initLocationArray,
  appendLocation,
} = locationSlice.actions;
export default locationSlice.reducer;
