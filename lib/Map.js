import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';

export default class Map extends React.Component {
  state = {
    userLocation: {
      coords: {
        latitude: 103.7241,
        longitude: 19.2452
      }
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {

      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let userLocation = await Location.getCurrentPositionAsync({});
    this.setState({ userLocation });
  }

  onMapDrag = (e) => {
    console.log(e)
  }

  errorMessage = () => {
    return(
      <View style={styles.container}>
        <Text style={styles.paragraph}>{errorMessage}</Text>
      </View>
    )
  }

  render() {
    const { userLocation, errorMessage } = this.state

    if (errorMessage) {
      this.errorMessage();
    } else if(userLocation) {
      return(
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          onRegionChangeComplete={this.onMapDrag}
        >
          <MapView.Marker
            coordinate={userLocation.coords}
            title="Ubicacion Actual"
            image={require('../assets/userLocationMarker.png')}
          />
        </MapView>
      )
    }

    return (
      <View style={styles.container}>
        <Text>Waiting...</Text>
      </View>
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  }
});
