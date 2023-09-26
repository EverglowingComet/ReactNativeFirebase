import {createSlice} from '@reduxjs/toolkit';

type CommonState = {
  commonDict: any;
  loading: boolean;
  progress: boolean;
};

const initialState: CommonState = {
  commonDict: {},
  loading: false,
  progress: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setUsers: (state, action) => {
      if (!state.commonDict.users) {
        state.commonDict.users = {};
      }

      const update = action.payload;
      if (update) {
        for (const [k, v] of Object.entries(update)) {
          state.commonDict.users[k] = v;
        }
      }
    },
  },
});

export const {setLoading, setProgress, setUsers} = commonSlice.actions;
export default commonSlice.reducer;
