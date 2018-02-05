import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { Title, Card } from "@shoutem/ui";
import MapViewDirections from "react-native-maps-directions";
// import polyline from "./polyline.js";

// This is Boston Location coordinates
let { height, width } = Dimensions.get("window");
const ASPECT_RATIO = height / width;
const LATITUDE = 42.3601;
const LONGITUDE = -71.0589;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



// MapBoston Component
export default class MapBoston extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },

      // Markers to be added on the map
      markers: [
        {
          latlng: { latitude: 42.35549, longitude: -71.063815 },
          title: "Boston Common Visitors Center",
          description: "Stop A:Info + free restrooms"
        },
        {
          latlng: { latitude: 42.35875, longitude: -71.063429 },
          title: "Massachusetts State House",
          description: "Stop B:State house mass"
        },
        {
          latlng: { latitude: 42.3575, longitude: -71.0635 },
          title: "Robert Gould Shaw Memorial",
          description: "Stop C:54th regiment"
        },
        {
          latlng: { latitude: 42.357081, longitude: -71.061726 },
          title: "Park Street Church",
          description: "Stop D:First Church in Boston"
        },
        {
          latlng: { latitude: 42.3575, longitude: -71.0617 },
          title: "Granary Burial Ground",
          description: "Stop E:Bostons oldest cemetery"
        },
        {
          latlng: { latitude: 42.3581, longitude: -71.0603 },
          title: "King’s Chapel",
          description: "Stop F:King’s Chapel"
        },
        {
          latlng: { latitude: 42.3581, longitude: -71.0593 },
          title: "Benjamin Franklin Statue",
          description: "Stop G:The oldest scholl in the US"
        },
        {
          latlng: { latitude: 42.3581, longitude: -71.0592 },
          title: "Old City Hall",
          description: "Stop H:Old City Hall"
        },
        {
          latlng: { latitude: 42.357, longitude: -71.0584 },
          title: "Old South Meeting House",
          description: "Stop I: Congregational church"
        },
        {
          latlng: { latitude: 42.3575975, longitude: -71.0583843 },
          title: "The Old Corner Bookstore",
          description: "Stop J: Oldes brick structure"
        },
        {
          latlng: { latitude: 42.3587, longitude: -71.0575 },
          title: "The Old State house",
          description: "Stop K:Center of civic life in old Boston"
        },
        {
          latlng: { latitude: 42.3588, longitude: -71.0572 },
          title: "Boston Massacre",
          description: "Stop L:Monument of the 5 victims killes on March 5,1770"
        },
        {
          latlng: { latitude: 42.3602, longitude: -71.0548 },
          title: "Faneuil Hall",
          description: 'Stop M :"The Cradle of Liberty"'
        },
        {
          latlng: { latitude: 42.3637, longitude: -71.0537 },
          title: " Paul Revere House",
          description: 'Stop N :"Paul Revere House museum"'
        },
        {
          latlng: { latitude: 42.3656, longitude: -71.0533 },
          title: " Paul Revere Statue",
          description: 'Stop O :"Heart of the North end"'
        },
        {
          latlng: { latitude: 42.3663, longitude: -71.0544 },
          title: "Old North Church",
          description: 'Stop P :"The Oldest church in Boston"'
        },
        {
          latlng: { latitude: 42.3673, longitude: -71.056 },
          title: "Copp’s Hill Burial Ground",
          description: 'Stop Q:" Copp’s Hill Burial Ground"'
        },
        {
          latlng: { latitude: 42.374, longitude: -71.0554 },
          title: "USS Constitution",
          description: 'Stop R :"Old Ironsides"'
        },
        {
          latlng: { latitude: 42.3764, longitude: -71.0608 },
          title: "Bunker Hill Monument",
          description: "Stop S:Bunker Hill Museum"
        }
      ]
    };
  }

  // Get the coordinates of the polyline via Google API tool 
  getDirections(opts) {
    var fromCoords = opts.fromCoords;
    var toCoords = opts.toCoords;
    var url = 'https://maps.googleapis.com/maps/api/directions/json?mode=walking&';
        url += 'origin=' + fromCoords.latitude + ',' + fromCoords.longitude;
        url += '&destination=' + toCoords.latitude + ',' + toCoords.longitude + '&key=' + constants.AIzaSyD5xGoQyLB5UBEYDvkuVspWgh1COPqXL7M;

    return new Promise((resolve, reject) => {;
      fetch(url)
      .then((response) => {
        return response.json();
      }).
      }).catch((err) => {
        reject(err);
      });
    });
  }

  _createRouteCoordinates(data) {
    if (data.status !== 'OK') {
      return [];
    }

    let points = data.routes[0].overview_polyline.points;
    let steps = Polyline.decode(points);
    let polylineCoords = [];

    for (let i=0; i < steps.length; i++) {
      let tempLocation = {
        latitude : steps[i][0],
        longitude : steps[i][1]
      }
      polylineCoords.push(tempLocation);
    }

    return polylineCoords;
  }

  render() {
    return (
      <MapView.Animated

        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={Styles.container}
        region={this.state.region}
      >
        <Title>WHAT ARE YOU LOOKING FOR?</Title>
        {this.state.markers.map((marker, i) => (
          <MapView.Marker
            key={i}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
            color={"red"}
          >

          </MapView.Marker>
        ))}

        <Polyline
          coordinates={this.state.polylineCoords}
          /* {[
            { latitude: 42.35549, longitude: -71.063815 },
            { latitude: 42.35875, longitude: -71.063429 }]} */

          strokeColor="red"
          // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            "#7F0000",
            "#00000000", // no color, creates a "long" gradient between the previous and next coordinate

          ]}
          strokeWidth={10}
          lineDashPhase={1}
        />
        <Polyline
          coordinates={[
            { latitude: 42.35549, longitude: -71.063815 },
            { latitude: 42.35875, longitude: -71.063429 }]}
          strokeColor="red"
          // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            "#7F0000",
            "#00000000", // no color, creates a "long" gradient between the previous and next coordinate

          ]}
          strokeWidth={10}
          lineDashPhase={1}
        />

      </MapView.Animated>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
  }
});

