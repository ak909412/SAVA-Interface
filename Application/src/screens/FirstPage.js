import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Speech from "expo-speech";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

const FirstPage = () => {
  const navigation = useNavigation();

  const [voiceList, setVoiceList] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const openSpeech = () => {
    Speech.speak("Welcome to v.i.t chennai , How can I help you??", {
      language: "en-US",
      pitch: 1.0,
      voice: "en-US-default",
    });
  };

  const handleBackgroundPress = () => {
    openSpeech();
    navigation.navigate("Welcome");
  };

  const stopSpeech = () => {
    Speech.stop();
  };

  return (
    <TouchableOpacity
      style={styles.background}
      onPress={handleBackgroundPress}
      onLongPress={stopSpeech}
    >
      <ImageBackground
        style={styles.background}
        source={require("../../assets/background.png")}
      ></ImageBackground>
    </TouchableOpacity>
  );
};

export default FirstPage;
