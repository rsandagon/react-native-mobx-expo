import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { MapView, Location, Permissions } from "expo";
import { Text } from "react-native"
import { observable,action } from 'mobx';

@inject('userStore', 'appStore')
@observer
export default class MapContainer extends Component {

  static LATITUDE_DELTA = 0.0922*1.5
  static LONGITUDE_DELTA = 0.0421*1.5

  @observable
  mapRegion = { latitude: 14.5545901, longitude: 120.9981703, 
    latitudeDelta: MapContainer.LATITUDE_DELTA, longitudeDelta: MapContainer.LONGITUDE_DELTA }

  @observable
  locationString = ''

  @action('sets mapRegion')
  setMapRegion(newRegion){
    this.mapRegion = newRegion
  }

  componentDidMount() {
    this._getLocationAsync()
  }

  _handleMapRegionChange = mapRegion => {
    this.setMapRegion(mapRegion)
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.locationString = 'Permission to access location was denied'
    }

    let location = await Location.getCurrentPositionAsync({})
    this.locationString = JSON.stringify(location)

    let currentRegion = { latitude: location.coords.latitude, longitude: location.coords.longitude, 
      latitudeDelta: MapContainer.LATITUDE_DELTA, longitudeDelta: MapContainer.LONGITUDE_DELTA}    

    //this.setMapRegion(currentRegion)
  }

  render() {
    return (
      <MapView
        style={styles.mapStyle}
        region={this.mapRegion}
        onRegionChange={this._handleMapRegionChange}
        showsUserLocation
        showsTraffic={false}
        showsIndoors={false}
      >
        <Text>
          Location: {this.locationString}
        </Text>

      </MapView>
    );
  }
}

const styles = {
  mapStyle: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
}
