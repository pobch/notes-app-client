import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import './Routes'
import './App.css';
import Routes from './Routes';

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true
  }

  async componentDidMount() {
    try {
      await Auth.currentSession()
      this.userHasAuthenticated(true)
    } catch(errorMsg) {
      if(errorMsg !== 'No current user') {
        alert(errorMsg)
      }
      this.userHasAuthenticated(false)
    }
  }

  userHasAuthenticated = authenticated => {
    this.setState({
      isAuthenticated: authenticated,
      isAuthenticating: false
    })
  }

  handleLogout = async () => {
    await Auth.signOut()
    this.userHasAuthenticated(false)
    this.props.history.push('/login')
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      isAuthenticating: this.state.isAuthenticating,
      userHasAuthenticated: this.userHasAuthenticated
    }

    return this.state.isAuthenticating || (
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

export default withRouter(App);
