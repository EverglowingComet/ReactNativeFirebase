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

function SignUp(props: any): JSX.Element {
  const {register, loggingIn} = props;
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<string | undefined>(undefined);
  const [retype, setRetype] = useState('');
  const [retypeMsg, setRetypeMsg] = useState<string | undefined>(undefined);
  const [passwordHide, setPasswordHide] = useState(true);
  const [retypeHide, setRetypeHide] = useState(true);
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
            title={t('username')}
            text={username}
            onTextUpdate={text => {
              setUsername(text);
            }}
          />
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
            warningText={passwordMsg}
            hidePassword={passwordHide}
            onPressHide={() => {
              setPasswordHide(!passwordHide);
            }}
            onTextUpdate={text => {
              if (text.length > 0 && text.length < 8) {
                setPasswordMsg(t('password_length_matching'));
              } else {
                setPasswordMsg(undefined);
              }
              setPassword(text);
            }}
          />
          <AuthInput
            title={t('retype_password')}
            text={retype}
            warningText={retypeMsg}
            hidePassword={retypeHide}
            onPressHide={() => {
              setRetypeHide(!retypeHide);
            }}
            onTextUpdate={text => {
              if (password.length > 0 && text.length > 0 && password !== text) {
                setRetypeMsg(t('retype_password_non_matching'));
              } else {
                setRetypeMsg(undefined);
              }
              setRetype(text);
            }}
          />
          <ActionButton
            title={t('sign_up')}
            style={styles.loginButtonBg}
            textStyle={styles.loginButtonText}
            progress={loggingIn}
            onPress={() => {
              if (username.length <= 0) {
                Alert.alert(t('input_username_prompt'));
                return;
              }
              if (email.length <= 0) {
                Alert.alert(t('input_email_prompt'));
                return;
              }
              if (password.length <= 0) {
                Alert.alert(t('input_password_prompt'));
                return;
              }
              if (password.length > 0 && password.length < 8) {
                Alert.alert(t('password_length_matching'));
                return;
              }
              if (
                password.length > 0 &&
                retype.length > 0 &&
                password !== retype
              ) {
                Alert.alert(t('retype_password_non_matching'));
                return;
              }
              register({
                username: username,
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

function mapState(state: any) {
  const {user, loggingIn} = state.auth;

  return {user, loggingIn};
}

const actionCreators = {
  login: userActions.login,
};

const connected = connect(mapState, actionCreators)(SignUp);

export {connected as SignUp};
