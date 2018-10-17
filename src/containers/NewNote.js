import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import { API } from 'aws-amplify'
import LoaderButton from '../components/LoaderButton'
import config from '../config'
import { s3Upload } from '../libs/awsLib'
import './NewNote.css'

class NewNote extends Component {
  state = {
    content: '',
    isLoading: false
  }

  file = null

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleFileChange = event => {
    this.file = event.target.files[0]
  }

  handleSubmit = async event => {
    event.preventDefault()

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB`)
      return
    }
    
    this.setState({ isLoading: true })

    try {
      const attachment = this.file ? await s3Upload(this.file) : null

      await this.createNote({
        content: this.state.content,
        attachment
      })
      
      this.props.history.push('/')
    } catch(error) {
      alert(error) // In case of 'Network Error', the `error` will be an object!! 
      this.setState({ isLoading: false })
    }
  }

  createNote = note => {
    return API.post('notes', '/notes', {
      body: note
    })
  }

  validateForm = () => {
    return this.state.content.length > 0
  }

  render() {
    return (
      <div className="NewNote">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl
              type="file"
              onChange={this.handleFileChange}
            />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating..."
          />
        </form>
      </div>
    )
  }
}

export default NewNote
