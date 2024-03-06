import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Speech from "expo-speech";
import * as Animatable from "react-native-animatable";
import MapView, { Marker, Callout, Circle } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Direction = () => {
  const [isFlatListVisible, setFlatListVisible] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [startLocation, setStartLocation] = useState("IN GATE");
  const [finalLocation, setFinalLocation] = useState(null);
  const [previousLocation, setPreviousLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 12.843028174172377,
    longitude: 80.15449967326355,
    latitudeDelta: 0.000051,
    longitudeDelta: 0.0041,
  });

  const defaultMarker = {
    name: "Initial Location",
    coordinates: initialRegion,
  };

  const [marker, setMarker] = useState(defaultMarker);

  const flatListData = [
    {
      key: "IN GATE",
      coordinates: {
        latitude: 12.840654,
        longitude: 80.153154,
      },
    },
    {
      key: "OUT GATE",
      coordinates: {
        latitude: 12.840635,
        longitude: 80.153175,
      },
    },
    {
      key: "LIBRARY",
      coordinates: {
        latitude: 12.840886,
        longitude: 80.153867,
      },
    },
    {
      key: "ADMINISTRATION BLOCK",
      coordinates: {
        latitude: 12.840828,
        longitude: 80.15411,
      },
    },
    {
      key: "GYM KHANA",
      coordinates: {
        latitude: 12.843539,
        longitude: 80.152724,
      },
    },
    {
      key: "GAZEBO",
      coordinates: {
        latitude: 12.841373,
        longitude: 80.154524,
      },
    },
    {
      key: "NORTH SQUARE",
      coordinates: {
        latitude: 12.844015,
        longitude: 80.153937,
      },
    },
    {
      key: "V-MART",
      coordinates: {
        latitude: 12.844523,
        longitude: 80.153617,
      },
    },
    {
      key: "ACADEMIC BLOCK 1",
      coordinates: {
        latitude: 12.843305,
        longitude: 80.153585,
      },
    },
    {
      key: "ACADEMIC BLOCK 2",
      coordinates: {
        latitude: 12.843053,
        longitude: 80.15623,
      },
    },
    {
      key: "ACADEMIC BLOCK 3",
      coordinates: {
        latitude: 12.843151,
        longitude: 80.154315,
      },
    },
    {
      key: "A BLOCK HOSTEL",
      coordinates: {
        latitude: 12.843876,
        longitude: 80.152829,
      },
    },
    {
      key: "B BLOCK HOSTEL",
      coordinates: {
        latitude: 12.842386,
        longitude: 80.156562,
      },
    },
    {
      key: "C BLOCK HOSTEL",
      coordinates: {
        latitude: 12.842598,
        longitude: 80.157087,
      },
    },
    {
      key: "D BLOCK HOSTEL",
      coordinates: {
        latitude: 12.84345,
        longitude: 80.152243,
      },
    },
    {
      key: "MG AUDITORIUM",
      coordinates: {
        latitude: 12.839996,
        longitude: 80.154747,
      },
    },
    {
      key: "HEALTH CENTER",
      coordinates: {
        latitude: 12.841731,
        longitude: 80.156621,
      },
    },
  ];

  const sendSignalToRpi = async (startCoordinates, finalCoordinates) => {
    try {
      if (
        startCoordinates &&
        startCoordinates.latitude !== undefined &&
        startCoordinates.longitude !== undefined &&
        finalCoordinates &&
        finalCoordinates.latitude !== undefined &&
        finalCoordinates.longitude !== undefined
      ) {
        await axios.post("http://192.168.1.24:5400/api/navigation", {
          start_latitude: startCoordinates.latitude,
          start_longitude: startCoordinates.longitude,
          final_latitude: finalCoordinates.latitude,
          final_longitude: finalCoordinates.longitude,
        });

        console.log(
          `Signal sent to RPi - Start: ${startCoordinates.latitude}, ${startCoordinates.longitude}, Final: ${finalCoordinates.latitude}, ${finalCoordinates.longitude}`
        );

        // Update startLocation here with the name of the location
        setStartLocation(startCoordinates.name);
      } else {
        console.error("Start or final coordinates are undefined.");
      }
    } catch (error) {
      console.error("Error sending signal:", error);
    }
  };

  const openFlatList = () => {
    setFlatListVisible(true);
    stopSpeech();
  };

  const closeFlatList = () => {
    setFlatListVisible(false);
    stopSpeech();
  };

  const destination = (item) => {
    return { name: item.key, coordinates: item.coordinates };
  };

  const handlePress = async (item) => {
    const selectedDestination = destination(item);
    closeFlatList();
    performSpeech(
      `Need not to worry i will lead you to ${item.key},.... Please follow my lead`
    );

    setSelectedDestination(selectedDestination.name);
    const coordinates = selectedDestination.coordinates;
    setPreviousLocation(selectedDestination);

    if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
      console.error(
        `Coordinates for ${selectedDestination.name} are invalid or undefined.`
      );
      return;
    }

    if (previousLocation && previousLocation.name !== "IN GATE") {
      // Send both start and final coordinates to RPi
      try {
        await sendSignalToRpi(previousLocation.coordinates, coordinates);
        console.log("       ");
        console.log(`We are at ${previousLocation.name}`);
        console.log(`Going to ${item.key}`);
        console.log(
          `Start Coordinates: Lat ${previousLocation.coordinates.latitude}, Lon ${previousLocation.coordinates.longitude}`
        );
        console.log(
          `Final Coordinates: Lat ${coordinates.latitude}, Lon ${coordinates.longitude}`
        );
        console.log("       ");
      } catch (error) {
        console.error("Error sending signal:", error);
      }
    } else {
      // If previousLocation is undefined or "IN GATE," send "IN GATE" as start location
      try {
        await sendSignalToRpi(flatListData[0].coordinates, coordinates);
        console.log("       ");
        console.log(`Start Location: IN GATE`);
        console.log(`Going to  ${item.key}`);
        console.log(
          `Start Coordinates: Lat ${flatListData[0].coordinates.latitude}, Lon ${flatListData[0].coordinates.longitude}`
        );
        console.log(
          `Final Coordinates: Lat ${coordinates.latitude}, Lon ${coordinates.longitude}`
        );
        console.log("       ");
      } catch (error) {
        console.error("Error sending signal:", error);
      }
      saveSelectedDestination(selectedDestination);
    }

    setMarker(selectedDestination);
    setFinalLocation(coordinates);
  };

  const [voiceList, setVoiceList] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    async function fetchVoices() {
      const availableVoices = await Speech.getAvailableVoicesAsync();

      setSelectedVoice(availableVoices[2].identifier);
    }
    fetchVoices();
  }, []);

  const performSpeech = (itemName) => {
    Speech.speak(itemName, {
      language: "en",
      pitch: 1.0,
      voice: "en-US-default",
    });
  };

  // Function to save the selected destination to AsyncStorage
  const saveSelectedDestination = async (destination) => {
    try {
      await AsyncStorage.setItem(
        "selectedDestination",
        JSON.stringify(destination)
      );
    } catch (error) {
      console.error("Error saving selected destination:", error);
    }
  };

  // Function to load the selected destination from AsyncStorage
  const loadSelectedDestination = async () => {
    try {
      const savedDestination = await AsyncStorage.getItem(
        "selectedDestination"
      );
      if (savedDestination !== null) {
        const parsedDestination = JSON.parse(savedDestination);
        setSelectedDestination(parsedDestination.name);
        setMarker(parsedDestination);

        // Set the initialRegion based on the saved destination
        const savedCoordinates = parsedDestination.coordinates;
        if (savedCoordinates) {
          setInitialRegion({
            latitude: savedCoordinates.latitude,
            longitude: savedCoordinates.longitude,
            latitudeDelta: 0.000051,
            longitudeDelta: 0.0041,
          });
        }
      }
    } catch (error) {
      console.error("Error loading selected destination:", error);
    }
  };

  const stopSpeech = () => {
    Speech.stop();
  };

  useEffect(() => {
    if (selectedDestination) {
      setSelectedDestination(null);
    }
  }, [selectedDestination]);
  useEffect(() => {
    // Load the selected destination from AsyncStorage
    const loadSavedDestination = async () => {
      const savedDestination = await loadSelectedDestination();
      if (savedDestination) {
        setSelectedDestination(savedDestination.name);
        setMarker(savedDestination);
      }
    };

    loadSelectedDestination();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          mapType="mutedStandard"
        >
          {marker?.coordinates && (
            <Marker coordinate={marker.coordinates}>
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{marker.name}</Text>
                </View>
              </Callout>
            </Marker>
          )}

          {selectedDestination?.coordinates && (
            <Marker coordinate={selectedDestination.coordinates}>
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>
                    {selectedDestination.name}
                  </Text>
                </View>
              </Callout>
            </Marker>
          )}
          <Circle
            center={{
              latitude: 12.843028174172377,
              longitude: 80.15449967326355,
            }}
            radius={380}
            strokeWidth={1}
            strokeColor="rgba(255,123,213,1)"
            fillColor="rgba(255,123,213,0.1)"
          />
        </MapView>

        <View style={styles.overlay}>
          <Text style={styles.title}>WHERE CAN I LEAD YOU?</Text>

          <Button title="Destinations" onPress={openFlatList} />
        </View>
      </ImageBackground>
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
              renderItem={({ item, index }) => (
                <Animatable.View
                  animation="fadeIn"
                  duration={500}
                  delay={index * 100}
                >
                  <TouchableOpacity
                    onPress={() => handlePress(item)}
                    style={styles.itemButton}
                  >
                    <View style={styles.itemContainer}>
                      <Text style={styles.itemText}>{item.key}</Text>
                      <FontAwesome5
                        name="arrow-right"
                        size={16}
                        color="#007AFF"
                      />
                    </View>
                  </TouchableOpacity>
                </Animatable.View>
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
    paddingTop: 35,
  },
  map: {
    flex: 8,
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
    color: "#004",
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
    height: "70%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  itemButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  item: {
    fontSize: 18,
  },
  calloutContainer: {
    width: 150,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
  },

  calloutText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Direction;
