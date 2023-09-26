import auth from '@react-native-firebase/auth';
import {UserProfile} from '@src/constants/types/UserTypes';
import {readDb, writeDb} from '@src/utils/API';
import {Alert} from 'react-native';

export const userServices = {
  checkAuth,
  register,
  login,
  logout,
  sendResetEmail,
};

function checkAuth(uid: string) {
  return readDb(
    `/user/${uid}`,
    dict => {
      if (dict) {
        return Promise.resolve(dict);
      } else {
        return Promise.reject(undefined);
      }
    },
    error => {
      console.log('Checking User Profile failed: ', error);
      return Promise.reject(error);
    },
  );
}

function register(data: {email: string; username: string; password: string}) {
  return auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then(credential => {
      if (credential && credential.user) {
        const user: UserProfile = {
          uid: credential.user.uid,
          email: data.email,
          username: data.username,
        };

        writeDb(`/user/${user.uid}`, user, error => {
          if (error) {
            console.log(
              'Registering User Profile failed: ',
              error.code,
              error.message,
            );

            auth().signOut();
            return Promise.reject(error);
          } else {
            return Promise.resolve(user);
          }
        });
      } else {
        return Promise.reject(undefined);
      }
    })
    .catch(error => {
      console.log(
        'Registering User Profile failed: ',
        error.code,
        error.message,
      );
      Alert.alert('Registering User Profile failed: ' + error.message);
      return Promise.reject(error);
    });
}

function login(data: {email: string; password: string}) {
  return auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(credential => {
      if (credential && credential.user) {
        const uid = credential.user.uid;
        if (uid) {
          readDb(`/user/${uid}`, dict => {
            if (dict) {
              return Promise.resolve(dict);
            } else {
              return Promise.reject(undefined);
            }
          });
        } else {
          return Promise.reject(undefined);
        }
      }
    })
    .catch(error => {
      console.log(
        'Sign In as User Profile failed: ',
        error.code,
        error.message,
      );
      Alert.alert('Sign In as User Profile failed: ' + error.message);
      return Promise.reject(error);
    });
}

function sendResetEmail(data: {email: string}) {
  return auth()
    .sendPasswordResetEmail(data.email)
    .then(() => {
      return Promise.resolve();
    })
    .catch(error => {
      console.log('Sending Reset Email Failed: ', error.code, error.message);
      Alert.alert('Sending Reset Email Failed: ' + error.message);
      return Promise.reject(error);
    });
}

function logout() {
  auth().signOut();
  return Promise.resolve();
}
