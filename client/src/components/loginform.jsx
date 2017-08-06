import React, { Component } from 'react';
import { Button, Fade, Glyphicon, FieldGroup, FormGroup, ControlLabel } from 'react-bootstrap';
import FormControl from 'react-bootstrap/lib/FormControl';
import axios from 'axios';

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        password: ''
      },
      loggedInUser: {}
    };
    this.onChange = this.onChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  onChange(e) {
    this.setState({
      user: Object.assign(this.state.user,  { [e.target.id]: e.target.value })
    });
  }
  handleRegister() {
    axios.post('/register', this.state.user)
      .then((response) => {
        // let user = response.data.user;
        this.props.isLoggedInCallback(response.data.isLoggedin);
      })
      .catch((response) => {
        this.props.isLoggedInCallback(false);
      });
  }
  handleLogin() {
    console.log('logging in...');
    axios.post('/login', this.state.user)
      .then((response) => {
        // pass the user data as well back
        this.props.isLoggedInCallback(true);
        this.props.setUser(response.data.user);
      })
      .catch((response) => {
        // pass the user anom data
        this.props.isLoggedInCallback(false);
        // this.props.setUser({})
      });
  }
  render() {
    const formInstance = (
      <FormGroup>
        <ControlLabel>Login</ControlLabel>
        <FormControl id='username' type='text' onChange={this.onChange} value={this.state.username} placeholder='Username' />
        <FormControl id='password' type='password' onChange={this.onChange} value={this.state.password} placeholder='Password' />
        <Button onClick={this.handleLogin} type='submit'>Submit</Button>
      </FormGroup>
    );
    if(this.props.isLoggedIn) {
      return (
        <div>
          {`Hello ${this.props.user.username}`}
        </div>
      );
    } else {
      return (
        <div>
          {formInstance}
        </div>
      );
    }
  }
}
