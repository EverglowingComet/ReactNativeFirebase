import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {connect} from 'react-redux';
import {userActions} from '@src/store/actions';
import {styles} from './styles';
import ActionButton from '@src/components/input/ActionButton';
import {buttonStyles} from '@src/styles/buttons';
import {useTranslation} from 'react-i18next';
const userImageDefault = require('@src/assets/image/icon/player_photo_default.png');

function MyProfile(props: any): JSX.Element {
  const {t} = useTranslation();
  const {user, logout} = props;
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
      <View style={styles.mainContainer}>
        <View style={styles.iconContainer}>
          <Image source={userImageDefault} style={styles.thumbIcon} />
        </View>
        <View style={styles.infoLine}>
          <Text style={styles.infoTitle}>{t('username')}</Text>
          <Text style={styles.infoText}>
            {user ? user.username : t('unknown')}
          </Text>
        </View>
        <View style={styles.infoLine}>
          <Text style={styles.infoTitle}>{t('email')}</Text>
          <Text style={styles.infoText}>
            {user ? user.email : t('unknown')}
          </Text>
        </View>
        <View style={styles.fillPlaceholder} />
        <ActionButton
          title={t('logout')}
          style={buttonStyles.mainActionButtonBg}
          textStyle={buttonStyles.mainActionButtonText}
          onPress={() => {
            logout();
          }}
        />
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
  logout: userActions.logout,
};

const connected = connect(mapToState, actionCreators)(MyProfile);

export {connected as MyProfile};
