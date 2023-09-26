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

function register(data: {email: string; username: string; password: string}) {
  return (dispatch: Dispatch) => {
    dispatch(setLoggingIn(true));
    userServices
      .register(data)
      .then(user => {
        dispatch(setUser(user));
        dispatch(setLoggingIn(false));
      })
      .catch(() => {
        dispatch(setUser(undefined));
        dispatch(setLoggingIn(false));
      });
  };
}

function login(data: {email: string; password: string}) {
  return (dispatch: Dispatch) => {
    dispatch(setLoggingIn(true));
    userServices
      .login(data)
      .then(user => {
        dispatch(setUser(user));
        dispatch(setLoggingIn(false));
      })
      .catch(() => {
        dispatch(setUser(undefined));
        dispatch(setLoggingIn(false));
      });
  };
}

function sendResetEmail(data: {email: string}) {
  return (dispatch: Dispatch) => {
    dispatch(setLoggingIn(true));
    userServices
      .sendResetEmail(data)
      .then(() => {
        dispatch(setLoggingIn(false));
      })
      .catch(() => {
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
