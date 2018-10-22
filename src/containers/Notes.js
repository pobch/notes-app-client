import React, { Component } from 'react'
import { API, Storage } from 'aws-amplify'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import config from '../config'
import LoaderButton from '../components/LoaderButton'

class Notes extends Component {
  state = {
    note: null,
    content: '',
    attachmentURL: null,
    isLoading: false,
    isDeleting: false
  }

  file = null

  async componentDidMount() {
    try {
      let attachmentURL
      const note = await this.getNote()
      const { content, attachment } = note
      if (attachment) {
        attachmentURL = await Storage.vault.get(attachment)
      }
      
      this.setState({
        note,
        content,
        attachmentURL
      })
    } catch(error) {
      alert(error)
    }
  }

  getNote = () => {
    return API.get('notes', `/notes/${this.props.match.params.id}`)
  }

  handleSubmit = async event => {
    event.preventDefault()

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`)
      return
    }

    this.setState({ isLoading: true })
    try {
      let attachment
      if (this.file) {
        // s3Upload
        const stored = await Storage.vault.put(`${Date.now()}-${this.file.name}`, this.file, {
          contentType: this.file.type
        })
        attachment = stored.key
        // end of s3Upload
      }

      await API.put('notes', `/notes/${this.props.match.params.id}`, {
        body: {
          content: this.state.content,
          attachment: attachment || this.state.note.attachment
        }
      })
      this.props.history.push('/')
    } catch(error) {
      alert(error)
      this.setState({ isLoading: false })
    }
  }

  handleChange = event => {
    // for 'content' form input
    this.setState({ [event.target.id]: event.target.value })
  }

  formatFilename = filename => {
    // trim timestamp out of filename
    return filename.replace(/^\w+-/, '')
  }

  handleFileChange = event => {
    this.file = event.target.files[0]
  }

  validateForm = () => {
    return this.state.content.length > 0
  }

  handleDelete = event => {
    const confirmed = window.confirm('Are you sure you want to delete this note?')
    if (!confirmed) {
      return
    }

    this.setState({ isDeleting: true })
  }

  render() {
    return (
      <div className="Notes">
        {this.state.note &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="content">
              <FormControl
                componentClass="textarea"
                onChange={this.handleChange}
                value={this.state.content}
              />
            </FormGroup>
            {this.state.note.attachment &&
              <FormGroup>
                <ControlLabel>Attachment</ControlLabel>
                <FormControl.Static>
                  <a target="_blank" rel="noopener noreferrer" href={this.state.attachmentURL}>
                    {this.formatFilename(this.state.note.attachment)}
                  </a>
                </FormControl.Static>
              </FormGroup>
            }
            <FormGroup controlId="file">
              {!this.state.note.attachment &&
                <ControlLabel>Attachment</ControlLabel>
              }
              <FormControl type="file" onChange={this.handleFileChange} />
            </FormGroup>
            <LoaderButton
              type="submit"
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              text="Save"
              loadingText="Saving..."
              isLoading={this.state.isLoading}
            />
            <LoaderButton
              type="button"
              block
              bsStyle="danger"
              bsSize="large"
              text="Delete"
              loadingText="Deleting..."
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
            />
          </form>
        }
      </div>
    )
  }
}

export default Notes
