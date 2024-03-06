import React from "react";
import { Modal, Text, View, Button, Image, StyleSheet } from "react-native";
import * as Speech from "expo-speech";
import { FlatList } from "react-native";

const CustomModal = ({ visible, onClose, content, stopSpeech, imageUrl }) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}> </Text>
          {imageUrl && (
            <Image source={{ uri: imageUrl }} style={styles.modalImage} />
          )}

          <Text style={styles.modalText}>{content}</Text>

          <Button
            title="Close"
            onPress={() => {
              onClose();
              stopSpeech();
            }}
            underlayColor="transparent"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "rgba(256, 256, 256, 1)",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10,
  },
  modalImage: {
    width: 300,
    height: 200,
    resizeMode: "contain",
    marginLeft: 18,
  },
});

export default CustomModal;
