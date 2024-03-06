// Doubts.js
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
} from "react-native";
import axios from "axios";
import { Modal } from "react-native";
import { QuestionButton } from "../components/QuestionButton";
import CustomModal from "../components/AsnwerModal";
import * as Speech from "expo-speech";

const Doubts = () => {
  const [questions, setQuestions] = useState([
    {
      question: "Who was the founder of VIT Chennai?",
      answer:
        "V.I.T Chennai, also known as V.I.T University Chennai, was founded by Dr. G. Viswanathan",
      imageUrl:
        "https://images.shiksha.com/mediadata/images/articles/1584528545phpdljDz1.jpeg",
    },
    {
      question: "Tell me more about this institution?",
      answer:
        "V.I.T (Vellore Institute of Technology) University is a renowned educational institution in India with campuses in Vellore, Chennai, Andhra Pradesh, and Bhopal. It offers a wide range of academic programs, emphasizes research and innovation, has strong international collaborations, and boasts modern infrastructure. VIT is known for its placement record and vibrant campus life, and it consistently ranks among the top engineering institutions in India.",
      imageUrl:
        "https://images.shiksha.com/mediadata/images/articles/1584528545phpdljDz1.jpeg",
    },
    {
      question: "What is the ranking of VIT University?",
      answer: "According to N.I.R.F ,  V.I.T stands at number 10",
      imageUrl:
        "https://images.shiksha.com/mediadata/images/articles/1584528545phpdljDz1.jpeg",
    },
    {
      question: "Who was the founder of VIT Chennai?",
      answer:
        "V.I.T Chennai, also known as V.I.T University Chennai, was founded by Dr. G. Viswanathan",
      imageUrl:
        "https://images.shiksha.com/mediadata/images/articles/1584528545phpdljDz1.jpeg",
    },
    {
      question: "Tell me more about this institution?",
      answer:
        "V.I.T (Vellore Institute of Technology) University is a renowned educational institution in India with campuses in Vellore, Chennai, Andhra Pradesh, and Bhopal. It offers a wide range of academic programs, emphasizes research and innovation, has strong international collaborations, and boasts modern infrastructure. VIT is known for its placement record and vibrant campus life, and it consistently ranks among the top engineering institutions in India.",
      imageUrl:
        "https://images.shiksha.com/mediadata/images/articles/1584528545phpdljDz1.jpeg",
    },
    {
      question: "What is the ranking of VIT University?",
      answer: "According to N.I.R.F ,  V.I.T stands at number 10",
      imageUrl:
        "https://images.shiksha.com/mediadata/images/articles/1584528545phpdljDz1.jpeg",
    },
  ]);

  const [voiceList, setVoiceList] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    async function fetchVoices() {
      const availableVoices = await Speech.getAvailableVoicesAsync();

      setSelectedVoice(availableVoices[2].identifier);
    }
    fetchVoices();
  }, []);

  const performSpeech = (answer) => {
    if (selectedVoice) {
      Speech.speak(answer, {
        language: "US-en",
        pitch: 1.0,
        voice: selectedVoice,
      });
    }
  };
  const [modalContent, setModalContent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState(null);

  const handlePress = (question) => {
    const { answer, imageUrl } = question;
    performSpeech(answer);
    setModalContent(answer);
    setIsModalVisible(true);
    setModalImageUrl(imageUrl);
  };

  const stopSpeech = () => {
    Speech.stop();
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Questions</Text>
        {questions.map((question, index) => (
          <View style={styles.buttonContainer} key={index}>
            <QuestionButton
              size={50}
              style={styles.button}
              title={question.question}
              onPress={() => handlePress(question)}
            />
          </View>
        ))}
      </View>
      {modalContent !== null && (
        <CustomModal
          visible={isModalVisible}
          content={modalContent}
          onClose={closeModal}
          stopSpeech={stopSpeech}
          imageUrl={modalImageUrl}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    marginTop: 30,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    padding: 12,
  },
  buttonContainer: {
    paddingTop: 12,
  },
});

export default Doubts;
