import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Fade, Glyphicon, FieldGroup, FormGroup, ControlLabel } from 'react-bootstrap';
import FormControl from 'react-bootstrap/lib/FormControl';
import { LoginForm } from './loginform.jsx';

export class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  render() {
    const Nav = styled.nav`
      position: absolute;
      text-align: right;
      right: 10px;
      top: 10px;
    `;
    const DropDown = styled.div`
      width: 150px;
      min-height: 20px;
      padding: 19px;
      margin-bottom: 20px;
      background-color: #f5f5f5;
      border: 1px solid #e3e3e3;
      border-radius: 4px;
      -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
      box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
    `;
    return(
      <Nav>
        <Button bsStyle='default' onClick={()=> this.setState({ open: !this.state.open })}>
         <Glyphicon glyph='th-large'></Glyphicon>
       </Button>
       <Button bsStyle='default ml'>
         <Glyphicon glyph='user'></Glyphicon>
       </Button>
       <Fade in={this.state.open}>
         <DropDown>
           <LoginForm />
         </DropDown>
       </Fade>
      </Nav>
    );
  }
}
