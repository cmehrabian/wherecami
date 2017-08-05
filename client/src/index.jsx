import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapContainer from './components/map/map.jsx';
import { Navigation } from './components/navigation.jsx';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        isLoggedIn: false
      }
  }

  componentDidMount() {
    
  }

  render () {
    return (
      <div>
        <Navigation />
        <MapContainer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
