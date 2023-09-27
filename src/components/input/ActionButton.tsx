import React from 'react';
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
      <View style={style}>
        <ActivityIndicator size="large" />
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
