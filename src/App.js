import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import './Routes'
import './App.css';
import Routes from './Routes';

class App extends Component {
  state = {
    isAuthenticated: false
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated })
  }

  handleLogout = () => {
    this.userHasAuthenticated(false)
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    }

    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Log out</NavItem>
                : <React.Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>Sign up</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Log in</NavItem>
                    </LinkContainer>
                  </React.Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default App;
