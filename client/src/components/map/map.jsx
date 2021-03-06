import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polygon } from 'google-maps-react';
import { TOKEN } from './config.js';
import axios from 'axios';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: 35.8617,
        lng: 104.1954
      },
      selectedPlace: {},
      activeMarker: {},
      allPlaces: [],
      showingInfoWindow: false
    }

    // this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  // Update location when user logs in
  componentWillReceiveProps(nextProps) {
    if (this.props.user.username !== nextProps.user.username) {
      if( navigator && navigator.geolocation ) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;
          this.setState({
            currentLocation: { lat: latitude, lng: longitude }
          })
          console.log("saving location at...", latitude, longitude);
          this.saveLocation(latitude, longitude);
        });
      }
    }
  }

  // Pulls latest location
  componentDidMount() {
    this.fetchLatestLocation();
    // fetch latest location from Database
    // pass in callback that setsState given response

    // this.setState({
    //   currentLocation: { lat: latitude, lng: longitude }
    // })
  }
  // Save to Database
  saveLocation(lat, lng) {
    console.log('saving.....');
    axios.post('/location', { lat, lng })
      .then((response) => {
        console.log("saved");
      }).catch((error) => {
        console.log('not saved', error);
      });
  }
  // Grab all Users Location
  fetchAllLocations() {
    axios.get('/locations')
      .then((response) => {
        this.state({
          allPlaces: response.locations
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  fetchLatestLocation() {
    axios.get('/latestLocation')
      .then((response) => {
        let { lat, lng } = response.data;
        // console.log('state:', this.state);
        this.setState({
          currentLocation: {
            lat,
            lng
          }
        });
        // console.log('AFTER state:', this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Marker click
  // onMarkerClick(props, marker, e) {
  //   this.setState({
  //     selectedPlace: props,
  //     activeMarker: marker,
  //     showingInfoWindow: true
  //   });
  // }
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Map
          style={style}
          google={this.props.google}
          zoom={14}
          >

          <Marker
            position={this.state.currentLocation}
            icon={{
              url: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAgxAAAAJDg3N2UwOTkzLWM4MDAtNDQ3Yi04YjNjLWVmODQwYmM1NmUwZg.jpg",
              anchor: new google.maps.Point(0,45),
              scaledSize: new google.maps.Size(45,45)
            }}/>

          </Map>
      </div>
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
