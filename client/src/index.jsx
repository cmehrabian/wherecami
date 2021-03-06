import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapContainer from './components/map/map.jsx';
import { Navigation } from './components/navigation.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    }
    this.isLoggedInCallback = this.isLoggedInCallback.bind(this);
    this.setUser = this.setUser.bind(this);
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

  setUser(user) {
    this.setState({
      user: user
    });
  }

  render () {
    return (
      <div>
        <Navigation
          setUser={this.setUser}
          user={this.state.user}
          isLoggedIn={this.state.isLoggedIn}
          isLoggedInCallback={this.isLoggedInCallback}
            />
          <MapContainer user={this.state.user}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
