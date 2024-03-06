import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  FlatList,
  Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Destination = () => {
  const [isFlatListVisible, setFlatListVisible] = useState(false);

  // Sample data for the FlatList
  const flatListData = [
    { key: "IN GATE" },
    { key: "OUT GATE" },
    { key: "LIBRARY" },
    { key: "ADMINISTRATION BLOCK" },
    { key: "GYM KHANA" },
    { key: "GAZEBO" },
    { key: "ACAMEDIC BLOCK 1" },
    { key: "ACAMEDIC BLOCK 2" },
    { key: "ACAMEDIC BLOCK 3" },
    { key: "A BLOCK HOSTEL" },
    { key: "B BLOCK HOSTEL" },
    { key: "C BLOCK HOSTEL" },
    { key: "D BLOCK HOSTEL" },
  ];

  const openFlatList = () => {
    setFlatListVisible(true);
  };

  const closeFlatList = () => {
    setFlatListVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFlatListVisible}
        onRequestClose={closeFlatList}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={flatListData}
              renderItem={({ item }) => (
                <Text style={styles.item}>{item.key}</Text>
              )}
            />
            <Button title="Close" onPress={closeFlatList} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "sans-serif",
    textShadowColor: "#333",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    height: "60%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  item: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default Destination;
