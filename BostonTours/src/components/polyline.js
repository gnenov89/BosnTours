import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import MapView, { Polyline } from "react-native-maps";




class polyline extends Component{
    render() {
      return (
 <MapView>
 <Polyline
          coordinates={[
            { latitude: 42.35549, longitude: -71.063815 },
            { latitude: 42.35875, longitude: -71.063429 },
           
            
          ]}
          strokeColor="red"
          // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            "#7F0000",
            "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
            
          ]}
          strokeWidth={10}
          lineDashPhase={1}
        /> 

     </MapView>
);
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });