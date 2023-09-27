import {StyleSheet} from 'react-native';
import {COLOR_CORAL} from '@src/constants/colors';

export const styles = StyleSheet.create({
  authContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appIcon: {
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
    marginBottom: 0,
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
  secButtonBg: {
    borderColor: COLOR_CORAL,
    borderWidth: 1,
    marginStart: 24,
    marginEnd: 24,
    marginTop: 20,
    marginBottom: 200,
    borderRadius: 20,
  },
  secButtonText: {
    color: COLOR_CORAL,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginStart: 12,
    marginEnd: 12,
    marginTop: 10,
    marginBottom: 10,
  },
});
