import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapContainer from './components/map/map.jsx';
import { Navigation } from './components/navigation.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
    this.isLoggedInCallback = this.isLoggedInCallback.bind(this);
  }

  componentDidMount() {
    axios.get('/isLoggedIn')
      .then((response) => {
        this.state({
          isLoggedIn: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  isLoggedInCallback(bool) {
    this.setState({
      isLoggedIn: bool
    });
  }

  render () {
    return (
      <div>
        <Navigation
          isLoggedIn={this.state.isLoggedIn}
          isLoggedInCallback={this.isLoggedInCallback}
            />
        <MapContainer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
