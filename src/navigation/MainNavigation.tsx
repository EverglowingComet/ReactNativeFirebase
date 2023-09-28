import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {connect} from 'react-redux';
import Splash from '@src/pages/auth/Splash';
import {Login} from '@src/pages/auth/Login';
import {SignUp} from '@src/pages/auth/SignUp';
import {userActions} from '@src/store/actions';
import {HomeNavigation} from './HomeNavigation';

const Stack = createNativeStackNavigator();

function MainNavigation(props: any) {
  const {checkAuth} = props;
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [initiated, setInitiated] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (initiated === undefined) {
      auth().onAuthStateChanged((user: any) => {
        if (user && user.uid) {
          setUserId(user.uid);
          setInitiated(true);
        } else {
          setUserId(undefined);
          setInitiated(false);
        }
      });
    }
  }, [initiated, userId]);

  useEffect(() => {
    if (userId) {
      checkAuth(userId);
      setUserId(userId);
    }
  }, [userId, checkAuth]);

  if (initiated === undefined) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="/auth/splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  } else if (initiated === true) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={HomeNavigation}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName="/auth/login">
        <Stack.Screen
          name="/auth/login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="/auth/sign_up"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}

function mapState(state: any) {
  const {user, loggingIn} = state.auth;

  return {user, loggingIn};
}

const actionCreators = {
  checkAuth: userActions.checkAuth,
};

const connected = connect(mapState, actionCreators)(MainNavigation);

export {connected as MainNavigation};
