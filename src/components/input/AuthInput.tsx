import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  InputModeOptions,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLOR_EDIT_INPUT_BORDER_COLOR, COLOR_RED} from '@src/constants/colors';

export default function AuthInput({
  title,
  text,
  warningText,
  inputMode,
  hidePassword,
  onPressHide,
  onTextUpdate,
}: {
  title: string;
  text: string;
  warningText?: string;
  inputMode?: InputModeOptions;
  hidePassword?: boolean;
  onPressHide?: (event: GestureResponderEvent) => void;
  onTextUpdate: (text: string) => void;
}): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <View style={styles.sectionInputWtapper}>
        <TextInput
          value={text}
          inputMode={inputMode}
          secureTextEntry={hidePassword !== undefined ? hidePassword : false}
          style={[
            hidePassword === undefined
              ? styles.sectionInput
              : styles.sectionInputPassword,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}
          onChangeText={onTextUpdate}
        />
        {hidePassword !== undefined && (
          <TouchableOpacity
            style={styles.sectionInputAction}
            onPress={onPressHide}>
            <Entypo
              name={hidePassword ? 'eye-with-line' : 'eye'}
              size={18}
              style={styles.sectionInputAction}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
      {warningText !== undefined && (
        <Text style={styles.warningText}>{warningText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    marginBottom: 0,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  warningText: {
    fontSize: 12,
    color: COLOR_RED,
  },
  sectionInput: {
    width: '100%',
    marginTop: 8,
    paddingTop: 6,
    paddingBottom: 6,
    paddingStart: 8,
    paddingEnd: 8,
    fontSize: 18,
    fontWeight: '400',
    borderColor: COLOR_EDIT_INPUT_BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 4,
  },
  sectionInputPassword: {
    width: '100%',
    marginTop: 8,
    paddingTop: 6,
    paddingBottom: 6,
    paddingStart: 8,
    paddingEnd: 38,
    fontSize: 18,
    fontWeight: '400',
    borderColor: COLOR_EDIT_INPUT_BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 4,
  },
  sectionInputWtapper: {
    alignItems: 'center',
  },
  sectionInputAction: {
    position: 'absolute',
    right: 4,
    top: 4,
    padding: 6,
  },
});
