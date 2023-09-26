import {createSlice} from '@reduxjs/toolkit';

type UserState = {
  user?: any;
  ref?: number;
  loggingIn: boolean;
};

const initialState: UserState = {
  user: undefined,
  ref: undefined,
  loggingIn: false,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggingIn: (state, action) => {
      state.loggingIn = action.payload;
    },
    setUserRef: (state, action) => {
      state.ref = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {setUserRef, setLoggingIn, setUser} = userSlice.actions;
export default userSlice.reducer;
