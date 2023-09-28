import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {connect} from 'react-redux';
import {userActions} from '@src/store/actions';

function MyProfile(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        <Text>My Profile</Text>
      </View>
    </SafeAreaView>
  );
}

function mapToState(state: any) {
  const {user} = state.auth;

  return {user};
}

const actionCreators = {
  login: userActions.login,
};

const connected = connect(mapToState, actionCreators)(MyProfile);

export {connected as MyProfile};
