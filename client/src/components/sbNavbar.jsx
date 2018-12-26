import React from 'react';
import { Link } from "react-router-dom";
import {Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem	
} from 'reactstrap';

class SbNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    }
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }	

  render() {
    return (
      <Navbar className="navbar navbar-expand-md fixed-top navbar-dark bg-primary app-navbar">
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink>Home</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default SbNavbar;