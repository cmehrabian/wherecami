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
      isLoggedIn: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      user: Object.assign(this.state.user,  { [e.target.id]: e.target.value })
    });
    console.log(this.state);
  }
  handleSubmit() {
    axios.post('/register', this.state.user)
      .then((response) => {
        console.log('user saved');
        this.setState({
          isLoggedIn: true
        })
      })
      .catch((response) => {

      });
  }
  render() {
    const formInstance = (
      <FormGroup>
        <ControlLabel>Login</ControlLabel>
        <FormControl id='username' type='text' onChange={this.onChange} value={this.state.username} placeholder='Username' />
        <FormControl id='password' type='password' onChange={this.onChange} value={this.state.password} placeholder='Password' />
        <Button onClick={this.handleSubmit} type='submit'>Submit</Button>
      </FormGroup>
    );
    if(this.state.isLoggedIn) {
      return (
        <div>
          Hello user
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
