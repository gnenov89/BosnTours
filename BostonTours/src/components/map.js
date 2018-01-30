import React, {Component} from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Title, Card } from '@shoutem/ui';

let {height, width} = Dimensions.get('window');


const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapBoston extends Component{
  constructor() {
    super();
    this.state = {
       region: {
         latitude: LATITUDE,
         longitude: LONGITUDE,
         latitudeDelta: LATITUDE_DELTA,
         longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [
        {
          latlng: {latitude: 42.355490, longitude: -71.063815},
          title: 'Boston Common Visitors Center',
          description: 'Stop A:Info + free restrooms'
          
        },
        {
          latlng:{latitude: 42.358750, longitude: -71.063429},
          title: 'Massachusetts State House',
          description: 'Stop B:State house mass'
          
        },
        {
          latlng: {latitude: 42.3575, longitude: -71.0635},
          title: 'Robert Gould Shaw Memorial',
          description: 'Stop C:54th regiment'
        },
        
        
      ]
    }
  }

  componentDidMount(){
    // navigator.geolocation.getCurrentPosition(
    //   position=>{
    //     this.setState({
    //       region: {
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //         latitudeDelta: LATITUDE_DELTA,
    //         longitudeDelta: LONGITUDE_DELTA
    //       }
    //     });
    //   },
    //   (error) => console.log(error.message),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    // );
    // this.watchID = navigator.geolocation.watchPosition(
    //   position => {
    //     this.setState({
    //       region: {
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //         latitudeDelta: LATITUDE_DELTA,
    //         longitudeDelta: LONGITUDE_DELTA,
    //       }
    //     });
    //   }
    // );
  }

  componentWillUnmount(){
    // navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <MapView.Animated
        provider = { PROVIDER_GOOGLE }
        showsUserLocation={ true }
        style = {Styles.container}
        region = { this.state.region }
      >
       <Title >WHAT ARE YOU LOOKING FOR?</Title>
       {this.state.markers.map((marker, i) => (
         <MapView.Marker key={i} coordinate={marker.latlng}
                        title     ={marker.title}
                        description={marker.description}
                        color={"red"}>
            {/* <MapView.Callout >
              <Card>
                <Text>Print Info About This Sightseeing.</Text>
              </Card>
            </MapView.Callout> */}
         </MapView.Marker>
                      ))}

                      <Polyline
		coordinates={[
			{ latitude: 42.355490, longitude: -71.063815 },
			{ latitude: 37.7896386, longitude: -122.421646 },
			{ latitude: 37.7665248, longitude: -122.4161628 },
			{ latitude: 37.7734153, longitude: -122.4577787 },
			{ latitude: 37.7948605, longitude: -122.4596065 },
			{ latitude: 37.8025259, longitude: -122.4351431 }
		]}
		strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
		strokeColors={[
			'#7F0000',
			'#00000000', // no color, creates a "long" gradient between the previous and next coordinate
			'#B24112',
			'#E5845C',
			'#238C23',
			'#7F0000'
		]}
		strokeWidth={6}
	/>
      </MapView.Animated>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});
