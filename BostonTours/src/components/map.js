import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


 class Map extends Component {
  render() {
    return (
  
       <MapView
       provider={ amazon }
       style={ styles.container }
       initialRegion={{
           latitude:1,3645,
           longitude:-0,
           latitudeDelta:0.010,
           longitudeDelta:0.018,

       }}

    />
    


      

    );
  }
}

const styles = StyleSheet.create({
  container: {
   height:,
   width:',
  }
});



module.exports = Map;
AppRegistry.registerComponent('Map', () => Map);

