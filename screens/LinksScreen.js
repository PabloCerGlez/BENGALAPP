import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Map from '../lib/Map.js';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  render() {
    const { location } = this.props;

    return (
      <View style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <Map />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
