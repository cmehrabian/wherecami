import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polygon } from 'google-maps-react';
import { TOKEN } from './config.js';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <Map
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
