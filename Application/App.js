import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./src/components/StackNavigator";
// import MapboxGL from "@react-native-mapbox-gl/maps";

// MapboxGL.setAccessToken(
//   "pk.eyJ1IjoiYWs5MDk0MTIiLCJhIjoiY2xtaXZqYmkxMGNjazNjazBhdzNna2M1aCJ9.vZ_eLr4LM2_mozmHufjuiw"
// );

const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;
