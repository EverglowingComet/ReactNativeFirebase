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
  return new Promise<any>((resolve, reject) => {
    readDb(
      `/user/${uid}`,
      dict => {
        if (dict) {
          resolve(dict);
        } else {
          reject(undefined);
        }
      },
      error => {
        console.log('Checking User Profile failed: ', error);
        reject(error);
      },
    );
  });
}

function register(data: {email: string; username: string; password: string}) {
  return new Promise<any>((resolve, reject) => {
    auth()
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
              reject(error);
            } else {
              resolve(user);
            }
          });
        } else {
          reject(undefined);
        }
      })
      .catch(error => {
        console.log(
          'Registering User Profile failed: ',
          error.code,
          error.message,
        );
        Alert.alert('Registering User Profile failed: ' + error.message);
        reject(error);
      });
  });
}

function login(data: {email: string; password: string}) {
  return new Promise<any>((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(credential => {
        if (credential && credential.user) {
          const uid = credential.user.uid;
          if (uid) {
            readDb(`/user/${uid}`, dict => {
              if (dict) {
                resolve(dict);
              } else {
                reject(undefined);
              }
            });
          } else {
            reject(undefined);
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
        reject(error);
      });
  });
}

function sendResetEmail(data: {email: string}) {
  return new Promise<any>((resolve, reject) => {
    auth()
      .sendPasswordResetEmail(data.email)
      .then(() => {
        resolve(true);
      })
      .catch(error => {
        console.log('Sending Reset Email Failed: ', error.code, error.message);
        Alert.alert('Sending Reset Email Failed: ' + error.message);
        reject(error);
      });
  });
}

function logout() {
  return new Promise<boolean>(resolve => {
    auth().signOut();
    resolve(true);
  });
}
