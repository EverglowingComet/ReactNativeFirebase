import {configureStore} from '@reduxjs/toolkit';
import userReducer from '@src/store/reducers/user';
import commonReducer from '@src/store/reducers/common';
import locationReducer from '@src/store/reducers/location';

export default configureStore({
  reducer: {
    auth: userReducer,
    common: commonReducer,
    location: locationReducer,
  },
});
