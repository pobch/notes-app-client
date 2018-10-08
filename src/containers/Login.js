import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import LoaderButton from '../components/LoaderButton'
import './Login.css'

export default class Login extends Component {
  state = {
    isLoading: false,
    email: '',
    password: ''
  }

  handleSubmit = async event => {
    event.preventDefault()

    this.setState({ isLoading: true })

    try {
      await Auth.signIn(this.state.email, this.state.password)
      this.props.userHasAuthenticated(true)
      this.props.history.push('/')
    } catch (e) {
      alert(e.message)
      this.setState({ isLoading: false })
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  validateForm = () => {
    const { email, password } = this.state
    return email.length > 0 && password.length > 0
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>E-mail</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            disabled={!this.validateForm()}
            text="Log in"
            loadingText="Loading..."
            isLoading={this.state.isLoading}
          />
        </form>
      </div>
    )
  }
}
