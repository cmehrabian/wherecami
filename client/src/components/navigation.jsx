import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Fade, Glyphicon } from 'react-bootstrap';


export class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
         <Glyphicon glyph="th-large"></Glyphicon>
       </Button>
       <Button  bsStyle='default ml'>
         <Glyphicon glyph="user"></Glyphicon>
       </Button>
       <Fade in={this.state.open}>
         <DropDown>
           Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
           Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
         </DropDown>
       </Fade>
      </Nav>
    );
  }
}
