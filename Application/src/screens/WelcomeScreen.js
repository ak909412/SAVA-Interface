import React, { useEffect, useState } from "react";
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

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const [voiceList, setVoiceList] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    async function fetchVoices() {
      const availableVoices = await Speech.getAvailableVoicesAsync();

      if (availableVoices.length > 2) {
        setSelectedVoice(availableVoices[2].identifier);
      } else if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].identifier);
      }
    }
    fetchVoices();
  }, []);

  const performSpeech = () => {
    if (selectedVoice) {
      Speech.speak("How can I assist you?", {
        language: "en-US",
        pitch: 1.0,
        voice: selectedVoice,
      });
    }
  };

  const handleBackgroundPress = () => {
    performSpeech();
    navigation.navigate("Choice");
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
        source={require("../../assets/WelcomeBg.jpg")}
      ></ImageBackground>
    </TouchableOpacity>
  );
};

export default WelcomeScreen;
