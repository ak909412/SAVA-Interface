import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
export const QuestionButton = ({
  style = {},
  textStyle = {},
  size = 100,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles(size).radius, style]}
      onPress={props.onPress}
    >
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) => ({
  radius: {
    borderRadius: size,
    width: 370,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
  },
  text: { color: "white", fontSize: size / 3 },
});
