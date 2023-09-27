import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  useColorScheme,
  View,
  Text,
  Alert,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useTranslation} from 'react-i18next';
import {userActions} from '@src/store/actions';
import AuthInput from '@src/components/input/AuthInput';
import {COLOR_CORAL} from '@src/constants/colors';
import ActionButton from '@src/components/input/ActionButton';
const logoImage = require('@src/assets/image/logo/logo.png');

const styles = StyleSheet.create({
  splashContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashIcon: {
    width: 100,
    height: 100,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  loginButtonBg: {
    backgroundColor: COLOR_CORAL,
    marginStart: 24,
    marginEnd: 24,
    marginTop: 60,
    marginBottom: 200,
    borderRadius: 20,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginStart: 12,
    marginEnd: 12,
    marginTop: 10,
    marginBottom: 10,
  },
});

function Login(props: any): JSX.Element {
  const {login, loggingIn} = props;
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHide, setPasswordHide] = useState(true);
  const {t} = useTranslation();

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.splashContainer}>
            <Image source={logoImage} style={styles.splashIcon} />
          </View>
          <Text style={styles.titleText}>{t('app_name')}</Text>
          <AuthInput
            title={t('email')}
            inputMode="email"
            text={email}
            onTextUpdate={text => {
              setEmail(text);
            }}
          />
          <AuthInput
            title={t('password')}
            text={password}
            hidePassword={passwordHide}
            onPressHide={() => {
              setPasswordHide(!passwordHide);
            }}
            onTextUpdate={text => {
              setPassword(text);
            }}
          />
          <ActionButton
            title={t('login')}
            style={styles.loginButtonBg}
            textStyle={styles.loginButtonText}
            progress={loggingIn}
            onPress={() => {
              if (email.length <= 0) {
                Alert.alert(t('input_email_prompt'));
                return;
              }
              if (password.length <= 0) {
                Alert.alert(t('input_password_prompt'));
                return;
              }
              login({
                email: email,
                password: password,
                callback: (error?: any) => {
                  if (error) {
                    setPassword('4444');
                  }
                },
              });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function mapState(state: any) {
  const {user, loggingIn} = state.auth;

  return {user, loggingIn};
}

const actionCreators = {
  login: userActions.login,
};

const connected = connect(mapState, actionCreators)(Login);

export {connected as Login};
