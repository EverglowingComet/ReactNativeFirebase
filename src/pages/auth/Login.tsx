import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  useColorScheme,
  View,
  Text,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';
import {userActions} from '@src/store/actions';
import AuthInput from '@src/components/input/AuthInput';
import ActionButton from '@src/components/input/ActionButton';
const logoImage = require('@src/assets/image/logo/logo.png');

function Login(props: any): JSX.Element {
  const {login, loggingIn} = props;
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const navigation = useNavigation<any>();
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
          <View style={styles.authContainer}>
            <Image source={logoImage} style={styles.appIcon} />
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
          <ActionButton
            title={t('sign_up')}
            style={styles.secButtonBg}
            textStyle={styles.secButtonText}
            onPress={() => {
              navigation.navigate('/auth/sign_up', {item: ''});
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
