import {StyleSheet} from 'react-native';
import {COLOR_CORAL} from '@src/constants/colors';

export const buttonStyles = StyleSheet.create({
  mainActionButtonBg: {
    backgroundColor: COLOR_CORAL,
    marginStart: 24,
    marginEnd: 24,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  mainActionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginStart: 12,
    marginEnd: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  secondaryActionButtonBg: {
    borderColor: COLOR_CORAL,
    borderWidth: 1,
    marginStart: 24,
    marginEnd: 24,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  secondaryActionButtonText: {
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
