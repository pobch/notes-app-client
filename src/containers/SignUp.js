import React, { Component } from 'react'
import { HelpBlock, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import LoaderButton from '../components/LoaderButton'
import './SignUp.css'

class SignUp extends Component {
  state = {
    isLoading: false,
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
    newUser: null
  }

  validateForm = () => {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    )
  }

  validateConfirmationForm = () => {
    return this.state.confirmationCode.length > 0
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({ isLoading: true })
    this.setState({
      newUser: 'test user',
      isLoading: false
    })
  }

  handleConfirmationSubmit = event => {
    event.preventDefault()
    this.setState({ isLoading: true })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  renderForm = () => {
    return (
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
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          type="submit"
          disabled={!this.validateForm()}
          isLoading={this.state.isLoading}
          text="Sign Up"
          loadingText="Loading..."
        />
      </form>
    )
  }

  renderConfirmationForm = () => {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your e-mail for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          type="submit"
          disabled={!this.validateConfirmationForm()}
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Loading..."
        />
      </form>
    )
  }
  
  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null 
          ? this.renderForm()
          : this.renderConfirmationForm()
        }
      </div>
    )
  }
}

export default SignUp
