// import React from "react";
// import { View, StyleSheet } from "react-native";
// import MapboxGL from "@react-native-mapbox-gl/maps";
// import { Text } from "react-native";
// import customStyle from "../map/style.json";
// import { ViewPropTypes } from "react-native"; // Import ViewPropTypes
// import PropTypes from "prop-types"; // Import PropTypes

// const MapComponent = ({
//   markerCoordinates,
//   selectedDestinationCoordinates,
// }) => {
//   return (
//     <View style={styles.container}>
//       <MapboxGL.MapView
//         styleURL={customStyle}
//         zoomLevel={14}
//         centerCoordinate={[12.843028174172377, 80.15449967326355]}
//         style={styles.map}
//       >
//         {markerCoordinates && (
//           <MapboxGL.MarkerView coordinate={markerCoordinates}>
//             <MapboxGL.Callout>
//               <View>
//                 <Text>{markerCoordinates.name}</Text>
//               </View>
//             </MapboxGL.Callout>
//           </MapboxGL.MarkerView>
//         )}

//         {selectedDestinationCoordinates && (
//           <MapboxGL.MarkerView coordinate={selectedDestinationCoordinates}>
//             <MapboxGL.Callout>
//               <View>
//                 <Text>{selectedDestinationCoordinates.name}</Text>
//               </View>
//             </MapboxGL.Callout>
//           </MapboxGL.MarkerView>
//         )}
//       </MapboxGL.MapView>
//     </View>
//   );
// };

// MapComponent.propTypes = {
//   markerCoordinates: PropTypes.object, // Replace with the appropriate prop type
//   selectedDestinationCoordinates: PropTypes.object, // Replace with the appropriate prop type
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default MapComponent;
