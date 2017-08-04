import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapContainer from './components/map/map.jsx';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
    }
  }

  render () {
    return (
      <div>
        <MapContainer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
