import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Button } from "react-native";

const AnimatedPage = () => {
  const navigation = useNavigation();
  const handlePress = (item) => {
    navigation.navigate("Direction");
  };
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/animation.json")}
        autoPlay
        loop
        style={styles.animation}
      />
      <Button onPress={handlePress} title="Reached" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  animation: {
    width: "100%",
    height: "90%",
  },
});

export default AnimatedPage;
