import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RoundedButton } from "../components/RoundedButton";
import * as Speech from "expo-speech";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    marginTop: 30,
  },
  text: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    fontFamily: "sans-serif",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 50,
    flexDirection: "column",
  },
  button: {
    alignItems: "center",
    marginBottom: 20,
  },
});

const Choice = () => {
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

  const mapSpeech = () => {
    if (selectedVoice) {
      Speech.speak(
        "I got you...     i have a map, let me navigate you. where would you like to go",
        {
          language: "en-US",
          pitch: 1.0,
          voice: selectedVoice,
        }
      );
    }
  };

  const doubtSpeech = () => {
    if (selectedVoice) {
      Speech.speak("What do you want to know!", {
        language: "en-US",
        pitch: 1.0,
        voice: selectedVoice,
      });
    }
  };
  const stopSpeech = () => {
    Speech.stop();
  };

  const handleNavigationPress = () => {
    navigation.navigate("Direction");
    mapSpeech();
  };

  const handleDoubtPress = () => {
    navigation.navigate("Doubts");
    doubtSpeech();
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/background.png")}
    >
      <Text style={styles.text}>HOW CAN I ASSIST YOU?</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <RoundedButton
            style={styles.text}
            imageSource={require("../../assets/doubt-icon.png")}
            title=" I GOT SOME DOUBTS "
            onPress={handleDoubtPress}
            onLongPress={stopSpeech}
            textStyle={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}
          />
        </View>

        <View style={styles.button}>
          <RoundedButton
            imageSource={require("../../assets/na.png")}
            size={100}
            title="I'M LOST "
            onPress={handleNavigationPress}
            onLongPress={stopSpeech}
            textStyle={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Choice;
