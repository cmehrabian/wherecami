import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polygon } from 'google-maps-react';
import { TOKEN } from './config.js';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        latitude: 35.8617,
        longitude: 104.1954
      }
    }
  }
  componentDidMount() {
    if( navigator && navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        this.setState({
          currentLocation: { latitude, longitude }
        })
      });
    }
  }
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <Map
        style={style}
        google={this.props.google}
        zoom={14}>
      </Map>
    )
  }
}

MapContainer.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number
}

export default GoogleApiWrapper({
  apiKey: (TOKEN)
})(MapContainer)
