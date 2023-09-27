import React from 'react';
import {COLOR_CORAL} from '../../constants/colors';
import {
  View,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

export default function ActionButton({
  title,
  style,
  textStyle,
  progress,
  onPress,
}: {
  title: string;
  style?: any;
  textStyle?: any;
  progress?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
}) {
  if (progress === true) {
    return (
      <View
        style={{
          marginStart: style.marginStart,
          marginEnd: style.marginEnd,
          marginTop: style.marginTop,
          marginBottom: style.marginBottom,
        }}>
        <ActivityIndicator size="large" color={COLOR_CORAL} />
      </View>
    );
  }
  return (
    <View style={style}>
      <TouchableOpacity onPress={onPress}>
        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
