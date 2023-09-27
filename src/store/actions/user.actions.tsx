import {Dispatch} from 'redux';
import {userServices} from '../services';
import {setUser, setLoggingIn} from '../reducers/user';

export const userActions = {
  checkAuth,
  register,
  login,
  logout,
  sendResetEmail,
};

function checkAuth(userId: string) {
  return (dispatch: Dispatch) => {
    userServices
      .checkAuth(userId)
      .then(user => {
        dispatch(setUser(user));
      })
      .catch(() => {
        dispatch(setUser(null));
      });
  };
}

function register(data: {
  email: string;
  username: string;
  password: string;
  callback: (error?: any) => void;
}) {
  return (dispatch: Dispatch) => {
    dispatch(setLoggingIn(true));
    userServices
      .register(data)
      .then(user => {
        dispatch(setUser(user));
        data.callback();
        dispatch(setLoggingIn(false));
      })
      .catch((error: any) => {
        data.callback(error);
        dispatch(setUser(undefined));
        dispatch(setLoggingIn(false));
      });
  };
}

function login(data: {
  email: string;
  password: string;
  callback: (error?: any) => void;
}) {
  return (dispatch: Dispatch) => {
    dispatch(setLoggingIn(true));
    userServices
      .login(data)
      .then(user => {
        dispatch(setUser(user));
        data.callback();
        dispatch(setLoggingIn(false));
      })
      .catch((error: any) => {
        data.callback(error);
        dispatch(setUser(undefined));
        dispatch(setLoggingIn(false));
      });
  };
}

function sendResetEmail(data: {
  email: string;
  callback: (error?: any) => void;
}) {
  return (dispatch: Dispatch) => {
    dispatch(setLoggingIn(true));
    userServices
      .sendResetEmail(data)
      .then(() => {
        data.callback();
        dispatch(setLoggingIn(false));
      })
      .catch((error: any) => {
        data.callback(error);
        dispatch(setLoggingIn(false));
      });
  };
}

function logout() {
  return (dispatch: Dispatch) => {
    userServices.logout();
    dispatch(setUser(undefined));
  };
}
