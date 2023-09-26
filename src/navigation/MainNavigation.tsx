import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '@src/pages/Home';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <Stack.Navigator initialRouteName="/auth/splash">
      <Stack.Screen
        name="/auth/splash"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="/auth/login"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
