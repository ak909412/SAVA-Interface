import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 100,
  imageSource,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles(size).radius, style]}
      onPress={props.onPress}
    >
      <Image source={imageSource} style={styles(size).image} />
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) => ({
  radius: {
    borderRadius: size / 2,
    width: 300,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "transparent",
    borderWidth: 1,
    backgroundColor: "rgba(128, 128, 128, 0.6)",
  },
  image: {
    width: size / 1.2,
    height: size / 1.2,
    resizeMode: "cover",
    marginBottom: 5,
  },
  text: {
    color: "white",
    fontSize: size / 3,
  },
});
