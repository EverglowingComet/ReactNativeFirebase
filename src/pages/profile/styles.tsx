import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    flexDirection: 'column',
  },
  fillPlaceholder: {
    flex: 1,
  },
  iconContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbIcon: {
    width: 100,
    height: 100,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoLine: {
    flex: 0,
    marginStart: 24,
    marginEnd: 24,
    marginTop: 12,
    marginBottom: 12,
    flexDirection: 'row',
  },
  infoTitle: {
    flex: 0,
    width: 100,
    height: 24,
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    flex: 1,
    height: 24,
    fontSize: 16,
  },
});
